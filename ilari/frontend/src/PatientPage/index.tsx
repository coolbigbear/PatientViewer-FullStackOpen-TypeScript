import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { PatientPageEntries } from '../components/PatientPageEntries';
import { PatientPageInfo } from '../components/PatientPageInfo';
import { apiBaseUrl } from '../constants';
import { addEntryToPatient, setPatient, useStateValue } from '../state';
import { Patient } from '../types';

export const PatientPage = () => {
	const [{ patient }, dispatch] = useStateValue();
	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | undefined>();
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const fetchPatient = async () => {
			const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
			dispatch(setPatient(patient));
		};

		if (patient && patient['id'] == id) return;

		void fetchPatient();
	}, [id]);

	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};

	const submitNewPatientEntry = async (values: EntryFormValues) => {
		console.log(values);		
		try {
			const { data: changedPatient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${patient.id}/entries`, values);
			dispatch(addEntryToPatient(changedPatient));
			closeModal();
		} catch (e) {
			console.error(e.response?.data || 'Unknown Error');
			setError(e.response?.data?.error || 'Unknown error');
		}
	};

	return (
		<div>
			<PatientPageInfo patient={patient} />
			<AddEntryModal modalOpen={modalOpen} onSubmit={submitNewPatientEntry} error={error} onClose={closeModal} />
			<Button onClick={() => openModal()}>Add new patient entry</Button>
			<PatientPageEntries entries={patient.entries} />
		</div>
	);
};
