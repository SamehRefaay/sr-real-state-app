import FileInput from '@/app/components/FileUpload';
import { Button, Card, cn } from '@nextui-org/react';
import { ImageCard } from './ImageCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { PropertyImage } from '@prisma/client';

interface Props {
	prev: () => void;
	next: () => void;
	images: File[];
	setImages: (images: File[]) => void;
	className?: string;
	savedImages?: PropertyImage[];
	setSavedImages?: (images: PropertyImage[]) => void;
}

const Pictures = (props: Props) => {
	const handleDeleteImage = (index: number) => {
		props.setImages([
			...props.images.slice(0, index),
			...props.images.slice(index + 1),
		]);
	};

	return (
		<Card className={cn('p-3', props.className)}>
			<FileInput
				onSelect={e =>
					props.setImages([(e as any).target.files[0], ...props.images])
				}
			/>

			<div className="mt-3 flex flex-wrap gap-3">
				{/* show fetched images from database for edit property page */}
				{props.savedImages &&
					props.setSavedImages!! &&
					props.savedImages?.map((item, index) => {
						return (
							<ImageCard
								key={item?.id}
								src={item?.url}
								index={index}
								onDelete={i =>
									props.setSavedImages!([
										...props.savedImages!.slice(0, i),
										...props.savedImages!.slice(i + 1),
									])
								}
							/>
						);
					})}
				{/* /* show images selected for add new property */}
				{props.images?.map((item, index) => {
					const srcUrl = URL.createObjectURL(item);
					return (
						<ImageCard
							key={srcUrl}
							src={srcUrl}
							index={index}
							onDelete={() => handleDeleteImage(index)}
						/>
					);
				})}
			</div>

			{/* prev button - next button */}
			<div className="flex gap-3 justify-center items-center">
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

export default Pictures;
