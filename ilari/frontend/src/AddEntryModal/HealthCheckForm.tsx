import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { EntryTypes } from '../types';
import { isCorrectDateFormat } from '../utils/util';
import { SubFormProps } from './AddEntryForm';
import { DiagnosisSelection, NumberField, TextField } from './FormField';

export const HealthCheckForm = ({ onSubmit, onCancel, diagnoses }: SubFormProps) => {
	return (
		<Formik
			initialValues={{
				description: '',
				date: '',
				specialist: '',
				type: EntryTypes.HEALTH_CHECK,
				healthCheckRating: 1,
				diagnosisCodes: [''],
			}}
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = 'Field is required';
				const invalidDateError = 'Invalid date';
				const errors: { [field: string]: string } = {};
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!isCorrectDateFormat(values.date)) {
					errors.date = invalidDateError;
				}
				if (!values.date) {
					errors.date = requiredError;
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				if (!values.healthCheckRating) {
					errors.healthCheckRating = 'Health check rating must be a whole number between 0 and 3';
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
						<Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField} />
						<Field
							label="Health check rating"
							name="healthCheckRating"
							type="number"
							min={0}
							max={3}
							component={NumberField}
						/>
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
