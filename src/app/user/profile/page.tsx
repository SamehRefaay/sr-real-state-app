import PageTitle from '@/app/components/PageTitle';
import { Avatar, Card } from '@nextui-org/react';
import React, { ReactNode } from 'react';
import SectionTitle from './_components/SectionTitle';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { getUserById } from '@/lib/actions/user';
import UploadAvatar from './_components/UploadAvatar';

const ProfilePage = async () => {
	const { getUser } = await getKindeServerSession();
	const user = await getUser();
	const dbUser = await getUserById(user ? user.id : '');

	return (
		<div>
			<PageTitle title="My Profile" href="/" linkCaption="Back to Home Page" />
			<Card className="m-4 p-4">
				<SectionTitle title="Basic Information" />
				<div className="flex">
					<div className="my-4 flex flex-col items-center">
						<Avatar
							className="w-40 h-40"
							src={dbUser?.avatarUrl ?? '/profile.svg'}
						/>
						<UploadAvatar userId={user?.id!} />
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<Attribute
						title="Name"
						value={`${dbUser?.firstName} ${dbUser?.lastName}`}
					/>
					<Attribute title="Email" value={dbUser?.email} />
					<Attribute
						title="Registered on"
						value={dbUser?.createdAt.toLocaleDateString()}
					/>
					<Attribute title="Properties Posted" value={1} />
				</div>
			</Card>
		</div>
	);
};

export default ProfilePage;

const Attribute = ({ title, value }: { title: string; value: ReactNode }) => {
	return (
		<div className="flex flex-col text-sm">
			<span className="text-slate-800 font-semibold">{title}</span>
			<span className="text-slate-600">{value}</span>
		</div>
	);
};
