import { TrashIcon } from '@heroicons/react/16/solid';
import { Button, Card } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

interface Props {
	src: string;
	index: number;
	onDelete: (i: number) => void;
}

export const ImageCard = (props: Props) => {
	return (
		<Card className="w-[150px] h-[150px] flex flex-col-reverse justify-between">
			<Image
				src={props.src}
				alt={props.src}
				className="object-cover w-[150px] h-[150px]"
				fill
			/>
			<Button
				className="rounded-none bg-color-pallette-ecru"
				onClick={() => props.onDelete(props.index)}
			>
				<TrashIcon className="w-5 h-full text-color-pallette-madder" />
			</Button>
		</Card>
	);
};
