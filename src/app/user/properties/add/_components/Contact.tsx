import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/16/solid';
import { Button, Card, cn, Input } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';
import { addPropertyInputType } from './AddPropertyForm';

interface Props {
	prev: () => void;
	className?: string;
}

const Contact = (props: Props) => {
	const {
		register,
		formState: { errors },
	} = useFormContext<addPropertyInputType>();

	return (
		<Card
			className={cn(
				'p-3 grid gap-3 grid-cols-1 md:grid-cols-3',
				props.className
			)}
		>
			<Input
				{...register('contact.name')}
				errorMessage={errors.contact?.name?.message}
				isInvalid={!!errors.contact?.name}
				label="Contact Name"
			/>
			<Input
				{...register('contact.phone')}
				errorMessage={errors.contact?.phone?.message}
				isInvalid={!!errors.contact?.phone}
				label="Phone"
			/>
			<Input
				{...register('contact.email')}
				errorMessage={errors.contact?.email?.message}
				isInvalid={!!errors.contact?.email}
				label="Email"
			/>
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
