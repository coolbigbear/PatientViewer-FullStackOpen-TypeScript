import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient } from '../types';

export const PatientPage = () => {
	const [{ patient }, dispatch] = useStateValue();

	const { id } = useParams<{ id: string }>();
	console.log('Patient is: ', patient);
	console.log('ID is: ', id);

	useEffect(() => {
		const fetchPatient = async () => {
			const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
			dispatch({ type: 'SET_PATIENT', payload: patient });
		};

		if (patient && patient['id'] == id) return;

		void fetchPatient();
    }, [id]);
    
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
			<p>SSN: {patient.ssn}</p>
			<p>Occupation: {patient.occupation}</p>
			<p>Date of birth: {patient.dateOfBirth}</p>
		</div>
	);
};
