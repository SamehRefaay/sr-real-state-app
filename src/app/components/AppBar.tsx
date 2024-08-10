'use client';
import {
	Navbar,
	NavbarContent,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
} from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
	children: React.ReactNode;
}

const AppBar = ({ children }: Props) => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const menuItems = [
		'Profile',
		'Dashboard',
		'Activity',
		'Analytics',
		'System',
		'Deployments',
		'My Settings',
		'Team Settings',
		'Help & Feedback',
		'Log Out',
	];
	return (
		<Navbar className="shadow-md" onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className="sm:hidden"
				/>
				<NavbarBrand className="">
					<Link className="flex items-center justify-center" href="/">
						<Image src="/logo.svg" alt="logo" width={70} height={70} />
						<div className="flex flex-col gap-1 justify-center items-center text-color-pallette-ecru">
							<h1 className="text-2xl font-medium leading-3 tracking-[6px]">
								SRG
							</h1>
							<h6 className="text-[10px] uppercase leading-3 tracking-wider">
								Real State
							</h6>
						</div>
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem>
					<Link color="foreground" href="#">
						Features
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link href="#" aria-current="page">
						Customers
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="#">
						Integrations
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">{children}</NavbarContent>
			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							color={
								index === 2
									? 'primary'
									: index === menuItems.length - 1
									? 'danger'
									: 'foreground'
							}
							className="w-full"
							href="#"
						>
							{item}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
};

export default AppBar;
