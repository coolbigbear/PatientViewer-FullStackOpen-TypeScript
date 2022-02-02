import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { Patient } from '../types';

export const PatientPageInfo = ({ patient }: { patient: Patient | Record<string, never> }) => {
	const genderIcon = () => {
		if (patient.gender == 'male') return <Icon name="mars" />;
		else if (patient.gender == 'female') return <Icon name="venus" />;
		else if (patient.gender == 'other') return <Icon name="other gender" />;
	};

	return (
		<div>
			<div>
				<Header as="h2">
					{patient.name}
					{genderIcon()}
				</Header>
			</div>
			<p>
				SSN: {patient.ssn}
				<br />
				Occupation: {patient.occupation}
				<br />
				Date of birth: {patient.dateOfBirth}
			</p>
			<br/>
		</div>
	);
};
