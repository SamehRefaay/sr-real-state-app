import { Button, cn } from '@nextui-org/react';

interface Props {
	items: { label: string }[];
	activeItem: number;
	setActiveItem: (index: number) => void;
	className?: string;
}

const Stepper = (props: Props) => {
	return (
		<div className="flex items-center justify-around p-3">
			{props.items.map((item, index) => (
				<>
					<div
						key={item.label}
						className={cn(
							'flex flex-col items-center text-color-pallette-cafe-noir',
							props.className
						)}
					>
						<div
							className={cn(
								'w-8 h-8 rounded-full flex justify-center items-center',
								{
									'bg-color-pallette-aquamarine': props.activeItem > index,
									'bg-color-pallette-ecru': props.activeItem === index,
									'bg-color-pallette-lavander-web': props.activeItem < index,
									'cursor-pointer': props.activeItem >= index,
								}
							)}
							{...(props.activeItem >= index
								? { onClick: () => props.setActiveItem(index) }
								: {})}
						>
							{index + 1}
						</div>
						<div>{item.label}</div>
					</div>
					{index !== props.items.length - 1 && (
						<div
							className={cn(
								'border w-full h-0 -mt-3 relative after:absolute after:top-0 after:left-0 after:-translate-y-1/2 after:border after:transition-all after:duration-300 after:ease-in',
								{
									'after:w-full after:border-color-pallette-aquamarine':
										index < props.activeItem,
									'after:w-0': index >= props.activeItem,
								}
							)}
						></div>
					)}
				</>
			))}
		</div>
	);
};

export default Stepper;
