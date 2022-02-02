import patientData from '../../../data/patients.json';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { v4 as uuid } from 'uuid';


const patients: Array<PatientEntry> = patientData as Array<PatientEntry>;

const getEntries = (): Array<PatientEntry> => {
	return patients;
};

const getEntryById = (id: string): PatientEntry | undefined => {
	return patients.find(patient => patient.id == id);
};

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
		entries: []
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
	getEntryById,
	getNonSensitiveEntries,
};
