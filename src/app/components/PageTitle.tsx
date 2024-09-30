import Link from 'next/link';
import React from 'react';

interface Props {
	title?: string;
	href?: string;
	linkCaption?: string;
}

const PageTitle = (props: Props) => {
	return (
		<div className="my-4 p-4 flex justify-between bg-gradient-to-br from-color-pallette-ecru to-color-pallette-cafe-noir">
			<h1 className="text-xl text-white font-medium">{props?.title}</h1>
			{props.href!! && (
				<Link
					className="p-2 rounded-lg text-color-pallette-lavander-web bg-color-pallette-madder text-sm font-medium"
					href={props?.href}
				>
					{props?.linkCaption}
				</Link>
			)}
		</div>
	);
};

export default PageTitle;
