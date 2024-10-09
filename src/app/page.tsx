import { Metadata } from 'next';
import { prisma } from '../lib/prisma';
import PropertiesContainer from './components/PropertiesContainer';
import Search from './components/Search';

const PAGE_SIZE = 12;

interface Props {
	searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
	title: 'Home',
};

export default async function Home({ searchParams }: Props) {
	const pagenum = searchParams.pagenum ?? 0;
	const query = searchParams.query ?? '';
	const propertiesPromise = prisma.property.findMany({
		select: {
			id: true,
			name: true,
			price: true,
			images: {
				select: {
					url: true,
				},
			},
			location: {
				select: {
					city: true,
					state: true,
				},
			},
		},
		...(!!query && {
			where: {
				name: {
					contains: String(query),
				},
			},
		}),
		skip: +pagenum * PAGE_SIZE,
		take: PAGE_SIZE,
	});

	const totalPropertiesPromise = prisma.property.count({
		...(!!query && {
			where: {
				name: {
					contains: String(query),
				},
			},
		}),
	});

	const [properties, propertiesCount] = await Promise.all([
		propertiesPromise,
		totalPropertiesPromise,
	]);

	const totalPages = Math.floor(propertiesCount / PAGE_SIZE);

	return (
		<main className="flex flex-col gap-10 mt-4 p-4">
			{/* search bar */}
			<Search />

			{/* show properties */}
			<PropertiesContainer
				properties={properties}
				totalPages={totalPages}
				currentPage={+pagenum}
			/>
		</main>
	);
}
