
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
    entries: Array<Entry>
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
export type NewPatientEntry = Omit<PatientEntry, 'id'>;
export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries'>;

export enum EntryTypes {
	HEALTH_CHECK = 'HealthCheck',
	OCCUPATIONAL_HEALTHCARE = 'OccupationalHealthcare',
	HOSPITAL = 'Hospital',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface BaseEntry {
	id: string;
	description: string;
	date: string;
    specialist: string;
    type: string,
	diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface Discharge {
    date: string;
    criteria: string;
}

interface HealthCheckEntry extends BaseEntry {
    type: EntryTypes.HEALTH_CHECK;
	healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: EntryTypes.HOSPITAL;
    discharge: Discharge;
}
interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryTypes.OCCUPATIONAL_HEALTHCARE;
    employerName: string;
    sickLeave?: SickLeave;
	
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
export type NewBaseEntry = Omit<BaseEntry, "id">;
export type NewEntry = UnionOmit<Entry, "id">;
