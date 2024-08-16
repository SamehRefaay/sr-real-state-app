'use client';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import {
	Button,
	Card,
	cn,
	Input,
	Select,
	SelectItem,
	Textarea,
} from '@nextui-org/react';
import { PropertyStatus, PropertyType } from '@prisma/client';
import { useFormContext } from 'react-hook-form';
import { addPropertyInputType } from './AddPropertyForm';
import { error } from 'console';

interface Props {
	types: PropertyType[];
	statuses: PropertyStatus[];
	className?: string;
	next: () => void;
}

const Basic = (props: Props) => {
	const {
		register,
		trigger,
		formState: { errors },
	} = useFormContext<addPropertyInputType>();

	const handleNext = async () => {
		if (await trigger(['name', 'description', 'typeId', 'statusId', 'price']))
			props.next();
	};
	return (
		<Card
			className={cn(
				'p-3 grid gap-3 grid-cols-1 md:grid-cols-3',
				props.className
			)}
		>
			<Input
				{...register('name')}
				errorMessage={errors?.name?.message}
				isInvalid={!!errors?.name}
				label="Name"
				className="col-span-3"
			/>
			<Textarea
				{...register('description')}
				errorMessage={errors.description?.message}
				isInvalid={!!errors.description}
				label="Description"
				className="col-span-3"
			/>

			{/* Property Type Id */}
			<Select
				{...register('typeId')}
				errorMessage={errors.typeId?.message}
				isInvalid={!!errors.typeId}
				label="Type"
				selectionMode="single"
			>
				{props.types?.map(item => (
					<SelectItem key={item.id} value={item.id}>
						{item.value}
					</SelectItem>
				))}
			</Select>

			{/* Property Status Id */}
			<Select
				{...register('statusId')}
				errorMessage={errors.statusId?.message}
				isInvalid={!!errors.statusId}
				label="Status"
				selectionMode="single"
			>
				{props.statuses?.map(item => (
					<SelectItem key={item.id} value={item.id}>
						{item.value}
					</SelectItem>
				))}
			</Select>
			<Input
				{...register('price')}
				errorMessage={errors.price?.message}
				isInvalid={!!errors.price}
				label="Price"
			/>
			{/* prev button - next button */}
			<div className="col-span-3 flex gap-3 justify-center items-center">
				<Button
					isDisabled
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

export default Basic;
