import prisma from '@/lib/prisma';
import AddPropertyForm from '../../add/_components/AddPropertyForm';
import { notFound } from 'next/navigation';

interface Props {
	params: {
		id: string;
	};
}

const EditPropertyPage = async ({ params }: Props) => {
	const [property, propertyTypes, propertyStatus] = await Promise.all([
		prisma.property.findUnique({
			where: { id: +params?.id },
			include: {
				feature: true,
				location: true,
				contact: true,
				images: true,
			},
		}),
		prisma.propertyType.findMany(),
		prisma.propertyStatus.findMany(),
	]);

	if (!property) return notFound();
	return (
		<div>
			<AddPropertyForm
				propertyTypes={propertyTypes}
				propertyStatuses={propertyStatus}
				property={property}
				isEdit={true}
			/>
		</div>
	);
};

export default EditPropertyPage;
