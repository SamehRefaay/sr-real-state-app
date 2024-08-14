import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/16/solid';
import { Button, Card, cn, Input } from '@nextui-org/react';

interface Props {
	prev: () => void;
	className?: string;
}

const Contact = (props: Props) => {
	return (
		<Card
			className={cn(
				'p-3 grid gap-3 grid-cols-1 md:grid-cols-3',
				props.className
			)}
		>
			<Input label="Contact Name" />
			<Input label="Phone" />
			<Input label="Email" />
			{/* prev button - next button */}
			<div className="md:col-span-3 flex gap-3 justify-center items-center">
				<Button
					onClick={props.prev}
					className="w-36 bg-color-pallette-madder text-white"
					startContent={<ChevronLeftIcon className="w-6" />}
				>
					Previous
				</Button>
				<Button
					className="w-36 bg-color-pallette-aquamarine text-color-pallette-cafe-noir"
					endContent={<PlusIcon className="w-6" />}
				>
					Save
				</Button>
			</div>
		</Card>
	);
};

export default Contact;
