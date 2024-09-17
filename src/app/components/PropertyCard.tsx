import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { Prisma, Property } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
	property: Prisma.PropertyGetPayload<{
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
	}>;
}

const PropertyCard = (props: Props) => {
	return (
		<Card className="">
			<Image
				className="w-full h-[250px] object-cover"
				src={props?.property?.images[0]?.url}
				alt={`${props?.property?.name}-image`}
				width={300}
				height={300}
			/>

			<CardBody>
				<h4 className="font-bold text-color-pallette-cafe-noir">
					{props?.property?.name.length > 35
						? props?.property?.name.toLowerCase().substring(0, 35) + '...'
						: props?.property?.name.toLowerCase()}
				</h4>
				<p>
					<span className="text-sm font-medium text-slate-500">
						{props?.property?.location?.city}
					</span>{' '}
					<span className="text-sm font-medium text-slate-500">
						{props?.property?.location?.state}
					</span>
				</p>
			</CardBody>
			<CardFooter className="bg-color-pallette-ecru flex justify-between">
				<span>EGP {props?.property.price.toLocaleString()}</span>
				<span>
					<Link href={`/property/${props?.property?.id}`}>View Details</Link>
				</span>
			</CardFooter>
		</Card>
	);
};

export default PropertyCard;
