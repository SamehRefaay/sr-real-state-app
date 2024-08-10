'use client';
import { useState } from 'react';
import Stepper from './Stepper';
import { Button } from '@nextui-org/react';

const steps = [
	{ label: 'Basic' },
	{ label: 'Location' },
	{ label: 'Features' },
	{ label: 'Pictures' },
	{ label: 'Contact' },
];

const AddPropertyForm = () => {
	const [step, setStep] = useState(0);

	return (
		<div>
			<Stepper
				items={steps}
				activeItem={step}
				setActiveItem={setStep}
				className="mt-4"
			/>
			<Button onClick={() => setStep(prev => prev + 1)}>Next</Button>
		</div>
	);
};

export default AddPropertyForm;
