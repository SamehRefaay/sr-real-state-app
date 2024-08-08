'use client';
import FileUpload from '@/app/components/FileUpload';
import { updateUserAvatar } from '@/lib/actions/user';
import { uploadUserAvatar } from '@/lib/upload';
import { PencilIcon } from '@heroicons/react/16/solid';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const UploadAvatar = ({ userId }: { userId: string }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [image, setImage] = useState<File>();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const handleUploadUserAvatar = async (onClose: () => void) => {
		setIsSubmitting(true);
		if (!image) {
			onClose();
			return;
		}
		const avatarUrl = await uploadUserAvatar(image);
		const result = await updateUserAvatar(avatarUrl, userId);
		router.refresh();
		setIsSubmitting(false);
		onClose();
	};
	return (
		<div>
			<button onClick={onOpen}>
				<PencilIcon className="w-6 text-slate-400 hover:text-primary-500 transition-colors" />
			</button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Upload Avatar
							</ModalHeader>
							<ModalBody>
								<FileUpload
									onChange={e => setImage((e as any).target.files[0])}
								/>
								{image && (
									<Image
										src={URL.createObjectURL(image)}
										alt="avatar-image"
										width={300}
										height={300}
									/>
								)}
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Cancel
								</Button>
								<Button
									isLoading={isSubmitting}
									color="primary"
									onPress={() => handleUploadUserAvatar(onClose)}
								>
									Change Avatar
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
};

export default UploadAvatar;
