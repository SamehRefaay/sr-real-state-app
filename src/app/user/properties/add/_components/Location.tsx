import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { Button, Card, cn, Input, Textarea } from '@nextui-org/react';

interface Props {
	prev: () => void;
	next: () => void;
	className?: string;
}

const Location = (props: Props) => {
	return (
		<Card
			className={cn(
				'p-3 grid gap-3 grid-cols-1 md:grid-cols-2',
				props.className
			)}
		>
			<Input label="Street Address" />
			<Input label="Zip / Postal Code" />
			<Input label="City" />
			<Input label="State" />
			<Input label="Region / Neiborhood" className="col-span-2" />
			<Textarea label="Landmarks" className="col-span-2" />
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

export default Location;
