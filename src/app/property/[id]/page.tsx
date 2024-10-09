import { ImagesSlider } from '@/app/components/ImageSlider';
import PageTitle from '@/app/components/PageTitle';
import prisma from '@/lib/prisma';
import { Card } from '@nextui-org/react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
	params: {
		id: string;
	};
}

export const generateMetadata = async ({
	params,
}: Props): Promise<Metadata> => {
	const property = await prisma.property.findUnique({
		where: {
			id: +params.id,
		},
	});
	return {
		title: `${property?.name}`,
		description: `${property?.description}`,
	};
};

const PropertyDetails = async ({ params }: Props) => {
	const property = await prisma.property.findUnique({
		where: {
			id: +params.id,
		},
		include: {
			type: true,
			status: true,
			feature: true,
			location: true,
			images: true,
			contact: true,
		},
	});

	if (!property) return notFound();

	return (
		<div>
			<PageTitle
				title="Property Page"
				linkCaption="Back to properties"
				href="/"
			/>
			<div className="p-4">
				<h2 className="text-2xl font-bold text-color-pallette-ecru">
					{property.name}
				</h2>
			</div>
			<div className="p-4 grid gap-10 grid-cols-1 lg:grid-cols-3">
				{/* image slider */}

				<div className="col-span-2 flex flex-col gap-4">
					<ImagesSlider images={property.images.map(item => item.url)} />
					<h2 className="text-2xl font-bold text-color-pallette-cafe-noir">{`${property.price} EGP / ${property?.status?.value}`}</h2>
				</div>
				{/* property description */}
				<Card className="p-4 col-span-1 flex flex-col gap-1">
					{/*  //////////// Features /////////// */}
					<Title title="Features" />
					<Attribute label="Bedrooms" value={property.feature?.bedrooms} />
					<Attribute label="Bathrooms" value={property.feature?.bathrooms} />
					<Attribute label="Parking" value={property.feature?.parkingSpots} />
					<Attribute label="Area" value={property.feature?.area} />

					{/*  //////////// Address /////////// */}
					<Title className="mt-7" title="Address" />
					<Attribute label="City" value={property.location?.city} />
					<Attribute
						label="Landmark"
						value={property.location?.landmark.substring(12, 35)}
					/>
					<Attribute label="Zip Code" value={property.location?.zip} />
					<Attribute label="Address" value={property.location?.streetAddress} />

					{/*  //////////// Owner Details /////////// */}
					<Title className="mt-7" title="Owner Details" />
					<Attribute label="Owner Name" value={property.contact?.name} />
					<Attribute label="Email" value={property.contact?.email} />
					<Attribute label="Phone" value={property.contact?.phone} />
				</Card>
			</div>
		</div>
	);
};

export default PropertyDetails;

const Title = ({ title, className }: { title: string; className?: string }) => {
	return (
		<div className={className}>
			<h2 className="text-xl text-slate-600">{title}</h2>
			<hr className="border border-solid border-slate-300" />
		</div>
	);
};

const Attribute = ({
	label,
	value,
}: {
	label: string;
	value: string | number | undefined;
}) => {
	return (
		<div className="flex justify-between items-center">
			<span className="text-slate-600 text-sm">{label}</span>
			<span className="text-slate-600 text-sm">{value}</span>
		</div>
	);
};
