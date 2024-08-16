import validator from 'validator';
import { z } from 'zod';

export const addPropertyFormSchema = z.object({
	name: z.string().min(1, 'Please enter the name'),
	description: z.string().min(2, 'Enter the description'),
	typeId: z
		.string()
		.min(1, 'Select the type of the property')
		.transform((data: unknown) => Number(data)),
	statusId: z
		.string()
		.min(1, 'Select the status of the property')
		.transform((data: unknown) => Number(data)),
	price: z
		.string()
		.min(1, 'Enter the price')
		.regex(new RegExp('^[0-9]+$'), 'Enter Number')
		.transform((data: unknown) => Number(data)),
	location: z.object({
		streetAddress: z.string().min(1, 'Enter the street address'),
		zip: z
			.string()
			.refine(data => validator.isPostalCode(data, 'US'), 'Enter the zip code'),
		city: z.string().min(1, 'Enter the city'),
		state: z.string().min(1, 'Enter the state'),
		region: z.string().min(1, 'Enter the region'),
		landmark: z.string().min(2, 'Enter the landmarks'),
	}),
	propertyFeature: z.object({
		bedrooms: z
			.string()
			.regex(new RegExp('^[0-9]+$'), 'Enter number of the bedrooms.')
			.transform((data: unknown) => Number(data)),
		bathrooms: z
			.string()
			.regex(new RegExp('^[0-9]+$'), 'Enter number of the bathrooms.')
			.transform((data: unknown) => Number(data)),
		parkingSpots: z
			.string()
			.regex(new RegExp('^[0-9]+$'), 'Enter number of the parking spots.')
			.transform((data: unknown) => Number(data)),
		area: z
			.string()
			.regex(new RegExp('^[0-9]+$'), 'Enter number of the area.')
			.transform((data: unknown) => Number(data)),
		hasSwimmingPool: z.boolean(),
		hasGardenYard: z.boolean(),
		hasBalcony: z.boolean(),
	}),
	contact: z.object({
		name: z.string().min(1, 'Please enter the contact name'),
		phone: z
			.string()
			.refine(validator.isMobilePhone, 'Please enter a valid phone number'),
		email: z.string().email(),
	}),
});
