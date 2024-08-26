import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { Button, Card, cn, Input, Textarea } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';
import { addPropertyInputType } from './AddPropertyForm';

interface Props {
	prev: () => void;
	next: () => void;
	className?: string;
}

const Location = (props: Props) => {
	const {
		register,
		formState: { errors },
		trigger,
		getValues,
	} = useFormContext<addPropertyInputType>();

	const handleNext = async () => {
		if (
			await trigger([
				'location.streetAddress',
				'location.zip',
				'location.city',
				'location.state',
				'location.region',
				'location.landmark',
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
				{...register('location.streetAddress')}
				errorMessage={errors.location?.streetAddress?.message}
				isInvalid={!!errors.location?.streetAddress}
				label="Street Address"
				defaultValue={getValues().location?.streetAddress}
			/>
			<Input
				{...register('location.zip')}
				errorMessage={errors.location?.zip?.message}
				isInvalid={!!errors.location?.zip}
				label="Zip / Postal Code"
				defaultValue={getValues().location?.zip}
			/>
			<Input
				{...register('location.city')}
				errorMessage={errors.location?.city?.message}
				isInvalid={!!errors.location?.city}
				label="City"
				defaultValue={getValues().location?.city}
			/>
			<Input
				{...register('location.state')}
				errorMessage={errors.location?.state?.message}
				isInvalid={!!errors.location?.state}
				label="State"
				defaultValue={getValues().location?.state}
			/>
			<Input
				{...register('location.region')}
				errorMessage={errors.location?.region?.message}
				isInvalid={!!errors.location?.region}
				label="Region / Neiborhood"
				className="col-span-2"
				defaultValue={getValues().location?.region}
			/>
			<Textarea
				{...register('location.landmark')}
				errorMessage={errors.location?.landmark?.message}
				isInvalid={!!errors.location?.landmark}
				label="Landmarks"
				className="col-span-2"
				defaultValue={getValues().location?.landmark}
			/>
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

export default Location;
