import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { Button, Card, Checkbox, cn, Input } from '@nextui-org/react';

interface Props {
	prev: () => void;
	next: () => void;
	className?: string;
}

const Features = (props: Props) => {
	return (
		<Card
			className={cn(
				'p-3 grid gap-3 grid-cols-1 md:grid-cols-2',
				props.className
			)}
		>
			<Input label="Bedrooms" />
			<Input label="Bathrooms" />
			<Input label="Parking Spots" />
			<Input label="Area" />
			<div className="flex items-center justify-between">
				<Checkbox>Has Swimming Pool</Checkbox>
				<Checkbox>Has Garden Yard</Checkbox>
				<Checkbox>Has Balcony</Checkbox>
			</div>
			<div className="col-span-2 flex gap-3 justify-center items-center">
				<Button
					onClick={props.prev}
					className="w-36 bg-color-pallette-madder text-white"
					startContent={<ChevronLeftIcon className="w-6" />}
				>
					Previous
				</Button>
				<Button
					onClick={props.next}
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
