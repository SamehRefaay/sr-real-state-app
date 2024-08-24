import { NoSymbolIcon } from '@heroicons/react/16/solid';
import React from 'react';

const UnauthorizedPage = () => {
	return (
		<div className="h-screen flex flex-col gap-10 justify-center items-center bg-color-pallette-ecru">
			<NoSymbolIcon className="w-40 h-40 text-color-pallette-madder" />
			<p className="text-2xl font-medium text-color-pallette-cafe-noir">
				Your are not authorized to do this action.
			</p>
		</div>
	);
};

export default UnauthorizedPage;
