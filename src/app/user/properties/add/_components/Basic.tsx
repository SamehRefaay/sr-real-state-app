import { cn, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { PropertyStatus, PropertyType } from '@prisma/client';
import React from 'react';

interface Props {
	types: PropertyType[];
	statuses: PropertyStatus[];
	className?: string;
}

const Basic = (props: Props) => {
	return (
		<div
			className={cn(
				'p-3 grid gap-3 grid-cols-1 md:grid-cols-3',
				props.className
			)}
		>
			<Input label="Name" className="col-span-3" />
			<Textarea label="Description" className="col-span-3" />
			<Select label="Type" selectionMode="single">
				{props.types?.map(item => (
					<SelectItem key={item.id} value={item.id}>
						{item.value}
					</SelectItem>
				))}
			</Select>
			<Select label="Status" selectionMode="single">
				{props.statuses?.map(item => (
					<SelectItem key={item.id} value={item.id}>
						{item.value}
					</SelectItem>
				))}
			</Select>
			<Input label="Price" />
		</div>
	);
};

export default Basic;
