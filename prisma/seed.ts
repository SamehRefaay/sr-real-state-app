const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

const propertyTypes = [
	{
		id: 100,
		value: 'villa',
		area: { min: 260, max: 1500 },
		bedrooms: { min: 3, max: 6 },
		images: [
			'https://www.propertyfinder.eg/property/a93ca28e1865c19eeb55220d39d9c2ba/416/272/MODE/0067e9/5971869-8acaao.webp?ctr=eg',
			'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTh8MjcyNzExNDR8fGVufDB8fHx8fA%3D%3D',
			'https://media.istockphoto.com/id/1192057231/photo/luxury-villa-with-terrace-and-infinity-pool-with-ocean-views.jpg?s=1024x1024&w=is&k=20&c=-mXhU6_iTqDjLztsk4crdmJ3eaM2cSsa8rRo_aF0D_o=',
			'https://media.istockphoto.com/id/1155070862/photo/provencal-farmhouse.webp?a=1&b=1&s=612x612&w=0&k=20&c=aJgJlhVGEZ6YUK8clTkc74sM2Yljtv9SyXDHkgl9R2g=',
			'https://plus.unsplash.com/premium_photo-1682377521697-bc598b52b08a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGF8ZW58MHx8MHx8fDA%3D',
			'https://plus.unsplash.com/premium_photo-1682377521625-c656fc1ff3e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmlsbGF8ZW58MHx8MHx8fDA%3D',
			'https://plus.unsplash.com/premium_photo-1687960117069-567a456fe5f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb3BlcnR5fGVufDB8fDB8fHww',
			'https://media.istockphoto.com/id/1667208187/photo/male-real-estate-agent-talking-with-couple.webp?a=1&b=1&s=612x612&w=0&k=20&c=4ieZzeYfSpi4-UITzhqvNh1M8IzOKfUKqeF8Hyu_V5w=',
		],
	},
	{
		id: 101,
		value: 'apartment',
		area: { min: 80, max: 250 },
		bedrooms: { min: 1, max: 3 },
		images: [
			'https://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBhcnRtZW50fGVufDB8fDB8fHww',
			'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fHww',
			'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nnw1MjM1MDIwNnx8ZW58MHx8fHx8',
			'https://www.propertyfinder.eg/property/0df70ec11398f957fbbf76df0965b080/416/272/MODE/0faaef/5981598-37b8bo.webp?ctr=eg',
			'https://www.propertyfinder.eg/property/d8b00014780a36b10da88c88687fbb8a/416/272/MODE/fad6db/5932745-e10e4o.webp?ctr=eg',
			'https://www.propertyfinder.eg/property/efc65633d6877f3672ca45555aa6eddf/416/272/MODE/cf8f61/5981323-cda81o.webp?ctr=eg',
			'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2t5c2NyYXBlcnxlbnwwfHwwfHx8MA%3D%3D',
			'https://plus.unsplash.com/premium_photo-1679759526816-8d79212839ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNreXNjcmFwZXJ8ZW58MHx8MHx8fDA%3D',
		],
	},
	{
		id: 102,
		value: 'townhouse',
		area: { min: 280, max: 500 },
		bedrooms: { min: 3, max: 4 },
		images: [
			'https://media.istockphoto.com/id/1516938158/photo/3d-render-of-forest-house-with-large-windows-at-night.webp?s=1024x1024&w=is&k=20&c=5PDIlJWllBu4cM0EGckn6exbw1FLdqXstecQbSSdzJg=',
			'https://www.propertyfinder.eg/property/c9260cc4cb903e3a14c2992f3db7de17/416/272/MODE/c87e2f/5934134-86f58o.webp?ctr=eg',
			'https://www.propertyfinder.eg/property/c5f84f01bb19abb4182b80627e3a71eb/416/272/MODE/ebade2/5969738-69b02o.webp?ctr=eg',
			'https://www.propertyfinder.eg/property/0f41d4919c3afa3965b747a81352b01d/416/272/MODE/a1305c/5981462-a76aco.webp?ctr=eg',
			'https://www.propertyfinder.eg/property/d4ba9c616a28de619be5bb409ccd3aab/416/272/MODE/73c682/5980921-2ea80o.webp?ctr=eg',
			'https://www.propertyfinder.eg/property/3fba08bce33a99b114cd472d3416592d/416/272/MODE/4e3ed5/5972978-265a8o.webp?ctr=eg',
			'https://www.propertyfinder.eg/property/83a6b66bdff199a3ab08a92c7be15b93/416/272/MODE/73f462/5978493-57fbfo.webp?ctr=eg',
			'https://images.unsplash.com/photo-1522050212171-61b01dd24579?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D',
			'https://images.unsplash.com/photo-1483097365279-e8acd3bf9f18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb3BlcnR5fGVufDB8fDB8fHww',
			'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb3BlcnR5fGVufDB8fDB8fHww',
		],
	},
	{
		id: 103,
		value: 'penthouse',
		area: { min: 100, max: 225 },
		bedrooms: { min: 2, max: 4 },
		images: [
			'https://www.propertyfinder.eg/property/9e936b1394a18e9ec07c7e30ae7cfd36/416/272/MODE/6d74f2/5931079-4ab12o.webp?ctr=eg',
			'https://www.propertyfinder.eg/property/f0d33b92034e54d401ebb0470ed2ce29/416/272/MODE/758664/5977132-88b2fo.webp?ctr=eg',
			'https://www.propertyfinder.eg/property/83c53971041f0324e279e7b822e6c906/416/272/MODE/8a7007/5969333-b8e2co.webp?ctr=eg',
			'https://www.propertyfinder.eg/property/4bb50242f49d330bde478b4e3002e056/416/272/MODE/a44bb2/5969245-28ab4o.webp?ctr=eg',
		],
	},
	{
		id: 104,
		value: 'twinhouse',
		area: { min: 225, max: 1100 },
		bedrooms: { min: 3, max: 5 },
		images: [
			'https://www.propertyfinder.eg/property/a8da4ff31c7a4897765da3e062d9379b/416/272/MODE/439676/5903970-02f12o.webp?ctr=eg',
			'https://www.propertyfinder.eg/property/24b69c85a0c02cb147ac6434c9341cdd/416/272/MODE/707783/5974747-6fefbo.webp?ctr=eg',
			'https://www.propertyfinder.eg/property/ded922798a0344d23dc85bbd2588ae3d/416/272/MODE/371409/5972078-4b066o.webp?ctr=eg',
		],
	},
	{
		id: 105,
		value: 'duplex',
		area: { min: 150, max: 725 },
		bedrooms: { min: 2, max: 4 },
		images: [
			'https://images.unsplash.com/photo-1534240724593-cfacb25cf6ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNreXNjcmFwZXJ8ZW58MHx8MHx8fDA%3D',
			'https://www.propertyfinder.eg/property/02ff170344298a885daaf0434ba80c8f/416/272/MODE/a15e27/5577989-6279eo.webp?ctr=eg',
			'https://www.propertyfinder.eg/property/38ded58877e142c955d48761c62cffa1/416/272/MODE/c22a57/5974594-cd43bo.webp?ctr=eg',
		],
	},
	{
		id: 106,
		value: 'chalet',
		area: { min: 70, max: 480 },
		bedrooms: { min: 1, max: 3 },
		images: [
			'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D',
			'https://media.istockphoto.com/id/1412643214/photo/sunset-view-luxury-tropical-pool-villa.webp?a=1&b=1&s=612x612&w=0&k=20&c=PDs1waHrsGX0iZ6FIDKeYQqvrxASZzeJR-0hf_YSBJ8=',
			'https://www.propertyfinder.eg/property/6acae65281e14c2f5d174aa97b102f05/416/272/MODE/67f584/5977308-b3262o.webp?ctr=eg',
			'https://www.propertyfinder.eg/property/53e8c0f03003290edffd2603ee3e3a67/416/272/MODE/6ab06f/5562008-ac377o.webp?ctr=eg',
			'https://www.propertyfinder.eg/property/aa6f8022faa610182e00628baf9e3169/416/272/MODE/75cc82/5953969-69099o.webp?ctr=eg',
			'https://www.propertyfinder.eg/property/f7429801eae2769c2fb8f5b273b0ea99/416/272/MODE/4114f0/5400539-ab129o.webp?ctr=eg',
		],
	},
];

const propertyStatus = [
	{ id: 100, value: 'Buy' },
	{ id: 101, value: 'Rent' },
	{ id: 102, value: 'Sold' },
];

const usersData = Array.from({ length: 10 }).map(() => ({
	id: faker.string.uuid(),
	firstName: faker.person.firstName(),
	lastName: faker.person.lastName(),
	email: faker.internet.email(),
	avatarUrl: faker.image.avatar(),
}));

const subscriptionPlansData = [
	{
		id: 1001,
		name: 'Basic',
		price: 0,
		propertyLimit: 3,
		imagesPerPropertyLimit: 3,
		features:
			'Free for Lifetime, Property Listing, Property Details, 3 Images per Property, 3 Property Limit, Property Search',
	},
	{
		id: 1002,
		name: 'Standard',
		price: 10,
		propertyLimit: 10,
		imagesPerPropertyLimit: 5,
		features:
			'Property Listing, Property Details, 5 Images per Property, 10 Property Limit, Property Search, AI Support, 24/7 Support on Email',
	},
	{
		id: 1003,
		name: 'Premium',
		price: 25,
		propertyLimit: 100,
		imagesPerPropertyLimit: 15,
		features:
			'Property Listing, Property Details, 15 Images per Property, 100 Property Limit, Property Search, AI Support, 24/7 Support on Email, 24/7 Support on Phone, Personal Account Manger',
	},
];

const fakeUserProperties = Array.from({ length: 50 }).map(() => {
	const fakeType = faker.helpers.arrayElement(propertyTypes);
	const fakeStatus = faker.helpers.arrayElement(propertyStatus);
	const addThisForTitle = fakeStatus.value === 'Rent' ? 'rent' : 'sale';
	const fakeLocation = faker.location;
	const fakePropertyName = `${
		fakeType.value
	} for ${addThisForTitle} in ${fakeLocation.city()}.`;
	const fakeBedrooms = faker.number.int({
		min: fakeType.bedrooms.min,
		max: fakeType.bedrooms.max,
	});

	return {
		name: fakePropertyName,
		description: faker.lorem.lines({ min: 1, max: 3 }),
		price: faker.number.int({ min: 10000, max: 128000000 }),
		type: {
			create: {
				value: fakeType.value,
			},
		},
		status: {
			create: {
				value: fakeStatus.value,
			},
		},
		location: {
			create: {
				city: fakeLocation.city(),
				state: fakeLocation.state(),
				region: fakeLocation.country(),
				landmark: fakeLocation.street(),
				streetAddress: fakeLocation.streetAddress(),
				zip: fakeLocation.zipCode(),
			},
		},
		images: {
			create: [
				{
					url: faker.helpers.arrayElement(fakeType.images),
				},
			],
		},
		feature: {
			create: {
				area: faker.number.int({
					min: fakeType.area.min,
					max: fakeType.area.max,
				}),
				bedrooms: fakeBedrooms,
				bathrooms:
					fakeBedrooms > 1
						? faker.number.int({ min: fakeBedrooms - 1, max: fakeBedrooms + 1 })
						: 1,
				parkingSpots: faker.number.int({ min: 1, max: 2 }),
				hasBalcony: faker.datatype.boolean(),
				hasGardenYard: faker.datatype.boolean(),
				hasSwimmingPool: faker.datatype.boolean(),
			},
		},
		contact: {
			create: {
				email: faker.internet.email(),
				name: faker.person.fullName(),
				phone: faker.phone.number(),
			},
		},
	};
});

async function main() {
	// await prisma.user.createMany({
	// 	data: usersData,
	// });
	// await prisma.property.createMany({
	// 	data: propertiesData,

	// });

	await prisma.subscriptionPlan.createMany({
		data: subscriptionPlansData,
	});

	// const fakeId = faker.string.uuid();

	// const fakeUser = await prisma.user.upsert({
	// 	where: {
	// 		id: fakeId,
	// 	},
	// 	update: {},
	// 	create: {
	// 		id: fakeId,
	// 		firstName: faker.person.firstName(),
	// 		lastName: faker.person.lastName(),
	// 		email: faker.internet.email(),
	// 		avatarUrl: faker.image.avatar(),
	// 		property: {
	// 			create: fakeUserProperties,
	// 		},
	// 	},
	// });
}

main()
	.catch(e => {
		console.log(e);
		process.exit(1);
	})
	.finally(() => {
		prisma.$disconnect();
	});
