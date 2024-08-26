import SubmitButton from '@/app/components/SubmitButton';
import { deleteProperty } from '@/lib/actions/property';
import prisma from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

interface Props {
	params: {
		id: string;
	};
}

const DeletePropertyPage = async ({ params }: Props) => {
	const { getUser } = getKindeServerSession();
	const propertyPromise = prisma.property.findUnique({
		where: {
			id: +params.id,
		},
	});

	const [property, user] = await Promise.all([propertyPromise, getUser()]);

	const deleteAction = async () => {
		'use server';
		try {
			await deleteProperty(+params?.id);
			redirect('/user/properties');
		} catch (error) {
			throw error;
		}
	};

	if (!property) return notFound();
	if (!user || property.userId !== user.id) redirect('/unauthorized');

	return (
		<div>
			<form
				action={deleteAction}
				className="mt-10 flex flex-col gap-4 justify-center items-center"
			>
				<p>Are you sure you want to delete this property?</p>
				<p>
					<span className="text-slate-400">Name: </span>
					<span className="text-slate-600">{property?.name}</span>
				</p>
				<div className="flex gap-3 justify-center items-center">
					<Link href="/user/properties">
						<Button className="bg-slate-400">Cancel</Button>
					</Link>
					<SubmitButton
						className="bg-color-pallette-madder text-slate-200"
						type="submit"
					>
						Delete
					</SubmitButton>
				</div>
			</form>
		</div>
	);
};

export default DeletePropertyPage;
