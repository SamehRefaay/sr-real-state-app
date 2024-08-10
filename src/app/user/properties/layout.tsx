import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { ReactNode } from 'react';

const PropertiesLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<div className="bg-color-pallette-ecru flex justify-between items-center p-2">
				<h1 className="text-xl font-medium text-color-pallette-lavander-web">
					User Properties
				</h1>
				<Button className="bg-color-pallette-aquamarine">
					<Link href="/user/properties/add">Add Property</Link>
				</Button>
			</div>
			<div>{children}</div>
		</>
	);
};

export default PropertiesLayout;
