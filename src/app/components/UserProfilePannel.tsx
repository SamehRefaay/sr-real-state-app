'use client';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	User,
} from '@nextui-org/react';
import { User as PrismaUser } from '@prisma/client';
import Link from 'next/link';

interface Props {
	user: PrismaUser;
}

const UserProfilePannel = ({ user }: Props) => {
	return (
		<Dropdown placement="bottom-start">
			<DropdownTrigger>
				<User
					as="button"
					avatarProps={{
						isBordered: true,
						src: user.avatarUrl || '/profile.svg',
					}}
					className="transition-transform"
					description={`@${user?.firstName.toLowerCase()}${user?.lastName.toLowerCase()}`}
					name={`${user?.firstName} ${user?.lastName}`}
				/>
			</DropdownTrigger>
			<DropdownMenu aria-label="Profile Actions" variant="flat">
				<DropdownItem key="profile">
					<Link href="/user/profile">Profile</Link>
				</DropdownItem>
				<DropdownItem key="logout" color="danger">
					<LogoutLink>Log Out</LogoutLink>
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default UserProfilePannel;
