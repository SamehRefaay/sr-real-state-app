import prisma from '@/lib/prisma';
import { Button, Card, MenuItem } from '@nextui-org/react';
import { SubscriptionPlan } from '@prisma/client';
import SubscriptionButton from './_components/SubscriptionButton';
import PageTitle from '@/app/components/PageTitle';

const SubscriptionPage = async () => {
	const subscriptionPlansPromise = prisma.subscriptionPlan.findMany({});

	const [subsciptionPlans] = await Promise.all([subscriptionPlansPromise]);

	return (
		<div>
			<PageTitle title="Subscription Plans" />
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-4">
				{subsciptionPlans.map(item => (
					<Plan key={item?.id} plan={item} />
				))}
			</div>
		</div>
	);
};

export default SubscriptionPage;

const Plan = ({ plan }: { plan: SubscriptionPlan }) => {
	return (
		<Card className="flex flex-col gap-4 justify-between p-4">
			<div className="w-full flex flex-col gap-3 text-center">
				<h3 className="text-2xl text-color-pallette-ecru">{plan.name}</h3>
				<h2 className="text-4xl font-bold text-color-pallette-madder">
					${plan.price.toString()}
				</h2>
				<hr />
				{plan.features.split(',').map((feature, index) => (
					<p key={`${feature}${index}`} className="text-sm text-slate-600">
						{feature.trim()}
					</p>
				))}
			</div>
			<SubscriptionButton plan={plan} />
		</Card>
	);
};
