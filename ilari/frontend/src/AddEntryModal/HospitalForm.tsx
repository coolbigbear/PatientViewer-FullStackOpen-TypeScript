import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { EntryTypes } from '../types';
import { SubFormProps } from './AddEntryForm';
import { DiagnosisSelection, TextField } from './FormField';
import { isCorrectDateFormat } from '../utils/util';


export const HospitalForm = ({ onSubmit, onCancel, diagnoses }: SubFormProps) => {
	return (
		<Formik
			initialValues={{
				description: '',
				date: '',
				specialist: '',
				type: EntryTypes.HOSPITAL,
				diagnosisCodes: [''],
				discharge: {
					date: '',
					criteria: '',
				},
			}}
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = 'Field is required';
				const invalidDateError = 'Invalid date';
				const errors: { [field: string]: any } = {};
				console.log(errors);
				errors.discharge = {};
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
				if (!isCorrectDateFormat(values.discharge.date)) {
					errors.discharge.date = invalidDateError;
				}
				if (!values.discharge.date) {
					errors.discharge.date = requiredError;
				}
				if (!values.discharge.criteria) {
					errors.discharge.criteria = requiredError;
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
						<h4>Discharge:</h4>
						<Field label="Date" placeholder="YYYY-MM-DD" name="discharge.date" component={TextField} />
						<Field
							label="Criteria"
							placeholder="Criteria for discharge"
							name="discharge.criteria"
							component={TextField}
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

