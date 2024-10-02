'use server';
import prisma from '../prisma';

export async function saveSubscription({
	paymentId,
	planId,
	userId,
}: {
	paymentId: string;
	planId: number;
	userId: string;
}) {
	try {
		await prisma.subscription.create({
			data: {
				paymentId: paymentId,
				user: {
					connect: {
						id: userId,
					},
				},
				plan: {
					connect: {
						id: planId,
					},
				},
			},
		});
		return {
			message: 'Subscription Saved Successfully',
		};
	} catch (error: any) {
		return {
			message: error.message,
		};
	}
}
