import Link from 'next/link';
import React from 'react';

interface Props {
	title?: string;
	href?: string;
	linkCaption?: string;
}

const PageTitle = (props: Props) => {
	return (
		<div className="m-4 p-4 flex justify-between bg-gradient-to-br from-yellow-400 to-yellow-700">
			<h1 className="text-xl text-white font-medium">{props?.title}</h1>
			{props.href!! && (
				<Link className="text-white text-sm font-medium" href={props?.href}>
					{props?.linkCaption}
				</Link>
			)}
		</div>
	);
};

export default PageTitle;
