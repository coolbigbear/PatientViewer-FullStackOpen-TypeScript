import { DiagnoseEntry, Discharge, EntryTypes, Gender, HealthCheckRating, NewBaseEntry, NewEntry, NewPatientEntry, SickLeave } from "./types";

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: unknown, variable: string): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error(`Incorrect or missing ${variable}`);
	}
	return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(HealthCheckRating).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseString = (description: unknown, variable: string): string => {
	if (!description || !isString(description)) {
		throw new Error(`Incorrect or missing ${variable}`);
	}
	return description;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseType = (type: any, variable: string): EntryTypes => {

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument	
	if (!type || !Object.values(EntryTypes).includes(type)) {
		throw new Error(`Incorrect or missing ${variable}`);
	}
	return type as EntryTypes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDiagnosisCodes = (diagnosisCodes: any, variable: string): Array<DiagnoseEntry['code']> => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	if (!diagnosisCodes || !(diagnosisCodes instanceof Array) || !diagnosisCodes.some(isNaN)) {
		throw new Error(`Incorrect or missing ${variable}`);
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return diagnosisCodes;
};

const parseHealthCheckRating = (healthCheckRating: unknown, variable: string): HealthCheckRating => {
	if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
		throw new Error(`Incorrect or missing ${variable}`);
	}
	return healthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (object: any, variable: string): SickLeave => {
	if (!object) throw new Error(`Incorrect or missing ${variable}`);

	return {
		startDate: parseDate(object.startDate, 'sick leave start date'),
		endDate: parseDate(object.endDate, 'sick leave end date'),
	};
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (object: any, variable: string): Discharge => {
	if (!object) throw new Error(`Incorrect or missing ${variable}`);

	return {
		date: parseDate(object.date, 'discharge date'),
		criteria: parseString(object.criteria, 'discharge criteria'),
	};
};

type NewPatientFields = { name: unknown; dateOfBirth: unknown; ssn: unknown; gender: unknown; occupation: unknown };

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: NewPatientFields): NewPatientEntry => {
	const newEntry: NewPatientEntry = {
		name: parseString(name, 'name'),
		dateOfBirth: parseDate(dateOfBirth, 'date of birth'),
		ssn: parseString(ssn, 'ssn'),
		gender: parseGender(gender),
		occupation: parseString(occupation, 'occupation'),
		entries: []
	};
	
	return newEntry;
};

type NewBaseEntryFields = { description: unknown; date: unknown; specialist: unknown; diagnosisCodes?: unknown; type: unknown };

const toNewBaseEntry = ({type, description, date, specialist, diagnosisCodes}: NewBaseEntryFields): NewBaseEntryFields => {
	const newBaseEntry: NewBaseEntry = {
		type: parseType(type, 'type'),
		description: parseString(description, 'description'),
		date: parseDate(date, 'date'),
		specialist: parseString(specialist, 'specialist'),
	};

	if (diagnosisCodes) {
		newBaseEntry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes, 'diagnosis codes');
	}

	return newBaseEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const newBaseEntry = toNewBaseEntry(object) as NewEntry;

	switch (newBaseEntry.type) {
		case EntryTypes.HEALTH_CHECK:
			return {
				...newBaseEntry,
				healthCheckRating: parseHealthCheckRating(object.healthCheckRating, "health check rating"),
			};
		case EntryTypes.OCCUPATIONAL_HEALTHCARE:
			const newEntry = {
				...newBaseEntry,
				employerName: parseString(object.employerName, 'employer name'),
			};

			if (object.sickLeave) {
				newEntry.sickLeave = parseSickLeave(object.sickLeave, 'sick leave');
			}

			return newEntry;
		case EntryTypes.HOSPITAL:
			return { ...newBaseEntry, discharge: parseDischarge(object.discharge, 'discharge') };
		default:
			return assertNever(newBaseEntry);
	}
};