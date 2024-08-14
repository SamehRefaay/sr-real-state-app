import { Card, cn } from '@nextui-org/react';
import React from 'react';

interface Props {
	className?: string;
}

const Contact = (props: Props) => {
	return (
		<Card
			className={cn('p-3 grid grid-cols-1 md:grid-cols-3', props.className)}
		></Card>
	);
};

export default Contact;
