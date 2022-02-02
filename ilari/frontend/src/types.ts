export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export interface Patient {
	id: string;
	name: string;
	occupation: string;
	gender: Gender;
	ssn?: string;
	dateOfBirth?: string;
	entries: Entry[];
}

export interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

export enum EntryTypes {
	HEALTH_CHECK = 'HealthCheck',
	OCCUPATIONAL_HEALTHCARE = 'OccupationalHealthcare',
	HOSPITAL = 'Hospital',
}

export interface HealthCheckEntry extends BaseEntry {
	type: EntryTypes.HEALTH_CHECK;
	healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
	type: EntryTypes.HOSPITAL;
	discharge: {
		date: string;
		criteria: string;
	};
}
export interface OccupationalHealthcareEntry extends BaseEntry {
	type: EntryTypes.OCCUPATIONAL_HEALTHCARE;
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
