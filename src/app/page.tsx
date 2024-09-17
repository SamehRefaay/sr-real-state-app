import { prisma } from '../lib/prisma';
import PropertiesContainer from './components/PropertiesContainer';

const PAGE_SIZE = 12;

interface Props {
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: Props) {
	const pagenum = searchParams.pagenum ?? 0;
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
		skip: +pagenum * PAGE_SIZE,
		take: PAGE_SIZE,
	});

	const totalPropertiesPromise = prisma.property.count();

	const [properties, propertiesCount] = await Promise.all([
		propertiesPromise,
		totalPropertiesPromise,
	]);

	const totalPages = Math.floor(propertiesCount / PAGE_SIZE);

	return (
		<main className="p-5">
			<PropertiesContainer
				properties={properties}
				totalPages={totalPages}
				currentPage={+pagenum}
			/>
		</main>
	);
}
