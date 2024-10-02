import { saveSubscription } from '@/lib/actions/subscription';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
} from '@nextui-org/react';
import { SubscriptionPlan } from '@prisma/client';
import {
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
	show: boolean;
	setShow: (show: boolean) => void;
	plan: SubscriptionPlan;
}

const CheckoutForm = (props: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const stripe = useStripe();
	const elements = useElements();
	const router = useRouter();
	const { user } = useKindeBrowserClient();

	if (!user) return;
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			setIsLoading(true);
			//confirm payment
			if (!stripe || !elements) return;
			const result = await stripe?.confirmPayment({
				elements,
				confirmParams: { return_url: 'http://localhost:3000/user/profile' },
				redirect: 'if_required',
			});

			if (result.error) {
				toast.error(result.error.message);
			} else {
				const subscription = await saveSubscription({
					paymentId: result.paymentIntent.id,
					planId: props.plan.id,
					userId: user?.id,
				});
				console.log(subscription);
				toast.success('Payment Successful');
				router.push('/user/profile');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal isOpen={props.show}>
			<ModalContent>
				<ModalHeader>Complete your subscription purchase</ModalHeader>
				<ModalBody className="p-4">
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<PaymentElement />
						<div className="flex gap-4 justify-center items-center">
							<Button
								className="bg-color-pallette-madder text-white disabled:bg-slate-500"
								isDisabled={isLoading}
								onClick={() => props.setShow(false)}
							>
								Cancel
							</Button>
							<Button
								className="bg-color-pallette-aquamarine"
								type="submit"
								isLoading={isLoading}
							>
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
