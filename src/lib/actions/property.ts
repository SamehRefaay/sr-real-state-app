'use server';
import { addPropertyInputType } from '@/app/user/properties/add/_components/AddPropertyForm';
import prisma from '../prisma';
import { Property } from '@prisma/client';

export async function saveProperty(
	propertyData: addPropertyInputType,
	imagesUrls: string[],
	userId: string
) {
	const basic: Omit<Property, 'id'> = {
		name: propertyData.name,
		description: propertyData.description,
		price: propertyData.price,
		typeId: propertyData.typeId,
		statusId: propertyData.statusId,
		userId,
	};

	const result = await prisma.property.create({
		data: {
			...basic,
			location: {
				create: propertyData.location,
			},
			feature: {
				create: propertyData.propertyFeature,
			},
			contact: {
				create: propertyData.contact,
			},
			images: {
				create: imagesUrls.map(imageUrl => ({ url: imageUrl })),
			},
		},
	});

	console.log({ result });
	return result;
}
