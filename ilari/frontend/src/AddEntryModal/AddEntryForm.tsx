import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { useStateValue } from '../state';

import { Diagnosis, Entry, EntryTypes } from '../types';
import { HealthCheckForm } from './HealthCheckForm';
import { HospitalForm } from './HospitalForm';
import { OccupationalHealthcareForm } from './OccupationalHealthcareForm';

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<Entry, 'id'>;

export interface Props {
	onSubmit: (values: EntryFormValues) => void;
	onCancel: () => void;
}

export interface SubFormProps extends Props{
	diagnoses: Diagnosis[]
}

const entryTypeOptions = [
	{ value: EntryTypes.HEALTH_CHECK, key: EntryTypes.HEALTH_CHECK, text: EntryTypes.HEALTH_CHECK },
	{ value: EntryTypes.HOSPITAL, key: EntryTypes.HOSPITAL, text: EntryTypes.HOSPITAL },
	{
		value: EntryTypes.OCCUPATIONAL_HEALTHCARE,
		key: EntryTypes.OCCUPATIONAL_HEALTHCARE,
		text: EntryTypes.OCCUPATIONAL_HEALTHCARE,
	},
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    
	const [{ diagnoses }] = useStateValue();
	const [selectedEvent, setselectedEvent] = useState('HealthCheck');

	const showCorrectForm = () => {
		if (selectedEvent == EntryTypes.HEALTH_CHECK) {
			return <HealthCheckForm onSubmit={onSubmit} onCancel={onCancel} diagnoses={diagnoses} />;
		} else if (selectedEvent == EntryTypes.OCCUPATIONAL_HEALTHCARE) {
			return <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onCancel} diagnoses={diagnoses}/>;
		} else if (selectedEvent == EntryTypes.HOSPITAL) {
			return <HospitalForm onSubmit={onSubmit} onCancel={onCancel} diagnoses={diagnoses} />;
        } else {
            <p>Please select an appropriate entry type</p>;
        }
	};

	return (
        <div>
            <h4>Entry type:</h4>
			<Dropdown
				placeholder="Select event type"
				fluid
				selection
				options={entryTypeOptions}
				value={selectedEvent}
				onChange={(e, { value }) => setselectedEvent(value as string)}
			/>
			{showCorrectForm()}
		</div>
	);
};

export default AddEntryForm;
