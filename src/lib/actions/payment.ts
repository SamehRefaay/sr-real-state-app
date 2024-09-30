'use server';
import Stripe from 'stripe';

export async function createPaymentIntent(amount: number, description: string) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
		typescript: true,
		apiVersion: '2024-06-20',
	});

	const paymentIntent = await stripe.paymentIntents.create({
		amount,
		description,
		currency: 'USD',
	});

	return paymentIntent;
}
