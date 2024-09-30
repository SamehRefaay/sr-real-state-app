import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
} from '@nextui-org/react';
import { PaymentElement } from '@stripe/react-stripe-js';
import React from 'react';

interface Props {
	show: boolean;
	setShow: (show: boolean) => void;
}

const CheckoutForm = (props: Props) => {
	return (
		<Modal isOpen={props.show}>
			<ModalContent>
				<ModalHeader>Complete your subscription purchase</ModalHeader>
				<ModalBody className="p-4">
					<form className="flex flex-col gap-4">
						<PaymentElement />
						<div className="flex gap-4 justify-center items-center">
							<Button
								className="bg-color-pallette-madder text-white"
								onClick={() => props.setShow(false)}
							>
								Cancel
							</Button>
							<Button className="bg-color-pallette-aquamarine" type="submit">
								Pay
							</Button>
						</div>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CheckoutForm;
