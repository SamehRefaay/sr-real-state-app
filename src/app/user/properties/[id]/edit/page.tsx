import prisma from '@/lib/prisma';
import AddPropertyForm from '../../add/_components/AddPropertyForm';
import { notFound, redirect } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

interface Props {
	params: {
		id: string;
	};
}

const EditPropertyPage = async ({ params }: Props) => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

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
	if (!user || property.userId !== user.id) redirect('/unauthorized');
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
