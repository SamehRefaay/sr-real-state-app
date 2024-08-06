import prisma from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
	const { getUser } = await getKindeServerSession();

	const user = await getUser();

	// if there is no user
	if (!user || user === null || !user.id) {
		throw new Error('Something went wrong with the authenticaiton' + user);
	}

	//check if the user existed in the database
	const dbUser = await prisma.user.findUnique({
		where: {
			id: user.id,
		},
	});

	//save data to database
	if (!dbUser) {
		await prisma.user.create({
			data: {
				id: user.id,
				firstName: user.given_name ?? '',
				lastName: user.family_name ?? '',
				email: user.email ?? '',
			},
		});
	}

	//redirect to homepage
	return NextResponse.redirect('http://localhost:3000');
}
