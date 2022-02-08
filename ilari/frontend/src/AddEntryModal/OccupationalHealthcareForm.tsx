import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { DiagnosisSelection } from './FormField';
import { EntryTypes } from '../types';
import { SubFormProps } from './AddEntryForm';
import { TextField } from './FormField';
import { isCorrectDateFormat } from '../utils/util';

export const OccupationalHealthcareForm = ({ onSubmit, onCancel, diagnoses }: SubFormProps) => {
	return (
		<Formik
			initialValues={{
				description: '',
				date: '',
				specialist: '',
				type: EntryTypes.OCCUPATIONAL_HEALTHCARE,
				diagnosisCodes: [''],
				employerName: '',
				sick_leave: {
					start_date: '',
					end_date: '',
				},
			}}
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = 'Field is required';
				const invalidDateError = 'Invalid date';
				const errors: { [field: string]: any } = {};
				errors.sick_leave = {};
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!values.date) {
					errors.date = requiredError;
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				if (!values.employerName) {
					errors.employer = requiredError;
				}
				if (!isCorrectDateFormat(values.sick_leave.start_date)) {
					errors.sick_leave.start_date = invalidDateError;
				}
				if (!isCorrectDateFormat(values.sick_leave.end_date)) {
					errors.sick_leave.end_date = invalidDateError;
				}
				return errors;
			}}>
			{({ isValid, dirty, setFieldValue, setFieldTouched }) => {
				return (
					<Form className="form ui">
						<Field label="Description" placeholder="Description" name="description" component={TextField} />
						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagnoses)}
						/>{' '}
						<Field label="Specialist" placeholder="Specialist" name="specialist" component={TextField} />
						<Field label="Employer" placeholder="Employer" name="employerName" component={TextField} />
						<Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField} />
						<h4>Sick leave:</h4>
						<Field label="Start date" placeholder="YYYY-MM-DD" name="sick_leave.start_date" component={TextField} />
						<Field label="End date" placeholder="YYYY-MM-DD" name="sick_leave.end_date" component={TextField} />
						<Grid>
							<Grid.Column floated="left" width={5}>
								<Button type="button" onClick={onCancel} color="red">
									Cancel
								</Button>
							</Grid.Column>
							<Grid.Column floated="right" width={5}>
								<Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
									Add
								</Button>
							</Grid.Column>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};
