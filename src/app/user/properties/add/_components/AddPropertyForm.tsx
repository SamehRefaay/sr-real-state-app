'use client';
import { useState } from 'react';
import Stepper from './Stepper';
import Basic from './Basic';
import {
	Prisma,
	Property,
	PropertyImage,
	PropertyStatus,
	PropertyType,
} from '@prisma/client';
import Location from './Location';
import { cn } from '@nextui-org/react';
import Features from './Features';
import Pictures from './Pictures';
import Contact from './Contact';
import { addPropertyFormSchema } from '@/lib/zodSchema';
import { z } from 'zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadPropertyImages } from '@/lib/upload';
import { editProperty, saveProperty } from '@/lib/actions/property';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const steps = [
	{ label: 'Basic' },
	{ label: 'Location' },
	{ label: 'Features' },
	{ label: 'Pictures' },
	{ label: 'Contact' },
];

interface Props {
	propertyTypes: PropertyType[];
	propertyStatuses: PropertyStatus[];
	property?: Prisma.PropertyGetPayload<{
		include: {
			feature: true;
			location: true;
			contact: true;
			images: true;
		};
	}>;
	isEdit?: boolean;
}

export type addPropertyInputType = z.infer<typeof addPropertyFormSchema>;

const AddPropertyForm = ({ isEdit = false, ...props }: Props) => {
	const [step, setStep] = useState(0);
	const [images, setImages] = useState<File[]>([]);
	const [savedImages, setSavedImages] = useState<PropertyImage[]>(
		props.property?.images ?? []
	);
	const { user } = useKindeBrowserClient();
	const router = useRouter();

	const methods = useForm<addPropertyInputType>({
		resolver: zodResolver(addPropertyFormSchema),
		defaultValues: {
			name: props.property?.name ?? undefined,
			description: props.property?.description ?? undefined,
			typeId: props.property?.typeId ?? undefined,
			statusId: props.property?.statusId ?? undefined,
			price: props.property?.price ?? undefined,
			propertyFeature: props.property?.feature ?? undefined,
			location: props.property?.location ?? undefined,
			contact: props.property?.contact ?? undefined,
		},
	});

	const onSubmit: SubmitHandler<addPropertyInputType> = async data => {
		const urls = await uploadPropertyImages(images);
		try {
			if (isEdit && props.property) {
				const deletedImagesIds = props.property?.images
					.filter(item => !savedImages.includes(item))
					.map(item => item.id);

				await editProperty(props.property?.id, data, urls, deletedImagesIds);
				toast.success('Property updated successfully!');
			} else {
				await saveProperty(data, urls, user?.id!);
				toast.success('Property added successfully!');
			}
		} catch (error) {
			console.error({ 'some thing went wrong': error });
		} finally {
			router.push('/user/properties');
		}
	};

	return (
		<div>
			<Stepper
				items={steps}
				activeItem={step}
				setActiveItem={setStep}
				className="mt-4"
			/>
			<FormProvider {...methods}>
				<form
					className="mt-3 p-2"
					onSubmit={methods.handleSubmit(onSubmit, errors =>
						console.log(errors)
					)}
				>
					<Basic
						next={() => setStep(prev => prev + 1)}
						className={cn({ hidden: step !== 0 })}
						types={props.propertyTypes}
						statuses={props.propertyStatuses}
					/>
					<Location
						prev={() => setStep(prev => prev - 1)}
						next={() => setStep(prev => prev + 1)}
						className={cn({ hidden: step !== 1 })}
					/>
					<Features
						prev={() => setStep(prev => prev - 1)}
						next={() => setStep(prev => prev + 1)}
						className={cn({ hidden: step !== 2 })}
					/>
					<Pictures
						prev={() => setStep(prev => prev - 1)}
						next={() => setStep(prev => prev + 1)}
						className={cn({ hidden: step !== 3 })}
						images={images}
						setImages={setImages}
						{...(props.property!! && {
							savedImages,
							setSavedImages,
						})}
					/>
					<Contact
						prev={() => setStep(prev => prev - 1)}
						className={cn({ hidden: step !== 4 })}
					/>
				</form>
			</FormProvider>
		</div>
	);
};

export default AddPropertyForm;
