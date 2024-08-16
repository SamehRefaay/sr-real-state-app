import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { Button, Card, Checkbox, cn, Input } from '@nextui-org/react';
import { Controller, useFormContext } from 'react-hook-form';
import { addPropertyInputType } from './AddPropertyForm';

interface Props {
	prev: () => void;
	next: () => void;
	className?: string;
}

const Features = (props: Props) => {
	const {
		register,
		control,
		formState: { errors },
		trigger,
	} = useFormContext<addPropertyInputType>();

	const handleNext = async () => {
		if (
			await trigger([
				'propertyFeature.bedrooms',
				'propertyFeature.bathrooms',
				'propertyFeature.area',
				'propertyFeature.parkingSpots',
			])
		)
			props.next();
	};

	return (
		<Card
			className={cn(
				'p-3 grid gap-3 grid-cols-1 md:grid-cols-2',
				props.className
			)}
		>
			<Input
				{...register('propertyFeature.bedrooms')}
				errorMessage={errors.propertyFeature?.bedrooms?.message}
				isInvalid={!!errors.propertyFeature?.bedrooms}
				label="Bedrooms"
			/>
			<Input
				{...register('propertyFeature.bathrooms')}
				errorMessage={errors.propertyFeature?.bathrooms?.message}
				isInvalid={!!errors.propertyFeature?.bathrooms}
				label="Bathrooms"
			/>
			<Input
				{...register('propertyFeature.parkingSpots')}
				errorMessage={errors.propertyFeature?.parkingSpots?.message}
				isInvalid={!!errors.propertyFeature?.parkingSpots}
				label="Parking Spots"
			/>
			<Input
				{...register('propertyFeature.area')}
				errorMessage={errors.propertyFeature?.area?.message}
				isInvalid={!!errors.propertyFeature?.area}
				label="Area"
			/>
			<div className="flex items-center justify-between">
				<Controller
					control={control}
					name="propertyFeature.hasSwimmingPool"
					render={({ field }) => (
						<Checkbox onChange={field.onChange} onBlur={field.onBlur}>
							Has Swimming Pool
						</Checkbox>
					)}
				/>
				<Controller
					control={control}
					name="propertyFeature.hasGardenYard"
					render={({ field }) => (
						<Checkbox onChange={field.onChange} onBlur={field.onBlur}>
							Has Garden Yard
						</Checkbox>
					)}
				/>
				<Controller
					control={control}
					name="propertyFeature.hasBalcony"
					render={({ field }) => (
						<Checkbox onChange={field.onChange} onBlur={field.onBlur}>
							Has Balcony
						</Checkbox>
					)}
				/>
			</div>
			{/* prev button - next button */}
			<div className="col-span-2 flex gap-3 justify-center items-center">
				<Button
					onClick={props.prev}
					className="w-36 bg-color-pallette-madder text-white"
					startContent={<ChevronLeftIcon className="w-6" />}
				>
					Previous
				</Button>
				<Button
					onClick={handleNext}
					className="w-36 bg-color-pallette-madder text-white"
					endContent={<ChevronRightIcon className="w-6" />}
				>
					Next
				</Button>
			</div>
		</Card>
	);
};

export default Features;
