'use client';
import { useState } from 'react';
import Stepper from './Stepper';
import Basic from './Basic';
import { PropertyStatus, PropertyType } from '@prisma/client';

const steps = [
	{ label: 'Basic' },
	{ label: 'Location' },
	{ label: 'Features' },
	{ label: 'Pictures' },
	{ label: 'Contact' },
];

interface Props {
	propertyTypes: PropertyType[];
	propertyStatuses: PropertyStatus[];
}

const AddPropertyForm = (props: Props) => {
	const [step, setStep] = useState(0);

	return (
		<div>
			<Stepper
				items={steps}
				activeItem={step}
				setActiveItem={setStep}
				className="mt-4"
			/>
			<form className="mt-3 p-2">
				<Basic
					className={step !== 0 ? 'hidden' : ''}
					next={() => setStep(prev => prev + 1)}
					types={props.propertyTypes}
					statuses={props.propertyStatuses}
				/>
			</form>
		</div>
	);
};

export default AddPropertyForm;