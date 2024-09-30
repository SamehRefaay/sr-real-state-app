'use client';
import { Pagination } from '@nextui-org/react';
import PropertyCard from './PropertyCard';
import { Prisma, Property } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface Props {
	properties: Prisma.PropertyGetPayload<{
		select: {
			id: true;
			name: true;
			price: true;
			images: {
				select: {
					url: true;
				};
			};
			location: {
				select: {
					city: true;
					state: true;
				};
			};
		};
	}>[];
	totalPages: number;
	currentPage: number;
}

const PropertiesContainer = (props: Props) => {
	const router = useRouter();
	return (
		<div className="flex flex-col gap-4 justify-center items-center">
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{props.properties.map(propertyItem => (
					<PropertyCard key={propertyItem.id} property={propertyItem} />
				))}
			</div>

			{props.totalPages > 1 && (
				<Pagination
					total={props.totalPages}
					initialPage={1}
					page={props.currentPage}
					onChange={page => router.push(`/?pagenum=${page}`)}
				/>
			)}
		</div>
	);
};

export default PropertiesContainer;
