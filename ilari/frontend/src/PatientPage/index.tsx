import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PatientPageEntries } from '../components/PatientPageEntries';
import { PatientPageInfo } from '../components/PatientPageInfo';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient } from '../types';

export const PatientPage = () => {
	const [{ patient }, dispatch] = useStateValue();

	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const fetchPatient = async () => {
			const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
			dispatch({ type: 'SET_PATIENT', payload: patient });
		};

		if (patient && patient['id'] == id) return;

		void fetchPatient();
	}, [id]);
	
	return (
		<div>
			<PatientPageInfo patient={patient} />
			<PatientPageEntries entries={patient.entries}/>
		</div>
	);
};
