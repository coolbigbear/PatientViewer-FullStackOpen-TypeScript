
export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string
}

export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
export type NewPatientEntry = Omit<PatientEntry, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
    discharge: {
        date: string,
        criteria: string
    }
}
interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare',
    employerName: string,
	sickLeave?: {
		startDate: string;
        endDate: string;
	};
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;


export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries'>;