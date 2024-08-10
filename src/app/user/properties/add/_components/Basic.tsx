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

interface Props {
	types: PropertyType[];
	statuses: PropertyStatus[];
	className?: string;
	next: () => void;
}

const Basic = (props: Props) => {
	const handleNext = () => {
		props.next();
	};
	return (
		<Card
			className={cn(
				'p-3 grid gap-3 grid-cols-1 md:grid-cols-3',
				props.className
			)}
		>
			<Input label="Name" className="col-span-3" />
			<Textarea label="Description" className="col-span-3" />
			<Select label="Type" selectionMode="single">
				{props.types?.map(item => (
					<SelectItem key={item.id} value={item.id}>
						{item.value}
					</SelectItem>
				))}
			</Select>
			<Select label="Status" selectionMode="single">
				{props.statuses?.map(item => (
					<SelectItem key={item.id} value={item.id}>
						{item.value}
					</SelectItem>
				))}
			</Select>
			<Input label="Price" />
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
