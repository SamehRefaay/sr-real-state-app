'use client';
import { ShoppingBagIcon } from '@heroicons/react/16/solid';
import { Button } from '@nextui-org/react';
import { SubscriptionPlan } from '@prisma/client';
import CheckoutForm from './CheckoutForm';
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntent } from '@/lib/actions/payment';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const SubscriptionButton = ({ plan }: { plan: SubscriptionPlan }) => {
	const [showCheckout, setShowCheckout] = useState(false);
	const [clientSecret, setClientSecret] = useState<string | null>('');
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useKindeBrowserClient();

	const intiatePayment = async () => {
		setIsLoading(true);
		const paymentIntent = await createPaymentIntent(
			plan.price * 100,
			`Payment of user ${user?.given_name} ${user?.family_name} for buying plan ${plan.name}.`
		);
		setClientSecret(paymentIntent.client_secret);
		setShowCheckout(true);
		setIsLoading(false);
	};

	if (plan.price === 0) return <Button>Try it for free!</Button>;
	return (
		<>
			<Button
				className="bg-color-pallette-aquamarine"
				endContent={<ShoppingBagIcon className="w-4" />}
				onClick={intiatePayment}
				isLoading={isLoading}
			>
				Purchase Subscription
			</Button>
			{clientSecret!! && (
				<Elements
					stripe={stripePromise}
					options={{ clientSecret: clientSecret }}
				>
					<CheckoutForm
						show={showCheckout}
						setShow={setShowCheckout}
						plan={plan}
					/>
				</Elements>
			)}
		</>
	);
};

export default SubscriptionButton;
