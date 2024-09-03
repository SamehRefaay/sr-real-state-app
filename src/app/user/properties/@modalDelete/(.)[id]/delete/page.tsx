'use client';
import { deleteProperty } from '@/lib/actions/property';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Props {
	params: {
		id: string;
	};
}

const DeleteModalPage = ({ params }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setIsOpen(true);
	}, []);

	const handleCancel = () => {
		router.push('/user/properties');
		setIsOpen(false);
	};

	const handleDelete = async () => {
		try {
			await deleteProperty(+params.id);
			router.push('/user/properties');
			setIsOpen(false);
		} catch (error) {
			throw error;
		}
	};
	return (
		<Modal isOpen={isOpen} onOpenChange={handleCancel}>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">
					Delete Property
				</ModalHeader>
				<ModalBody>Are you sure you want to delete this property?</ModalBody>
				<ModalFooter>
					<Button onClick={handleCancel}>Cancel</Button>
					<Button onClick={handleDelete} variant="light" color="danger">
						Delete
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default DeleteModalPage;
