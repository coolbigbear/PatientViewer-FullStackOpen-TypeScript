import patientData from '../../../data/patients.json';
import { v4 as uuid } from 'uuid';

import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';

const patients: Array<PatientEntry> = patientData as Array<PatientEntry>;

const getEntries = (): Array<PatientEntry> => {
	return patients;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
	const newPatientEntry = {
		id: uuid(),
		...entry,
	};

	patients.push(newPatientEntry);
	return newPatientEntry;
};

export default {
	getEntries,
	addEntry,
	getNonSensitiveEntries,
};
