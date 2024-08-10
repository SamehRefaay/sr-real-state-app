import prisma from '@/lib/prisma';
import AddPropertyForm from './_components/AddPropertyForm';

const AddPropertyPage = async () => {
	const [propertyTypes, propertyStatuses] = await Promise.all([
		prisma.propertyType.findMany(),
		prisma.propertyStatus.findMany(),
	]);
	return (
		<div>
			<AddPropertyForm
				propertyTypes={propertyTypes}
				propertyStatuses={propertyStatuses}
			/>
		</div>
	);
};

export default AddPropertyPage;
