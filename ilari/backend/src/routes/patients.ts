import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {	
	const id: string = req.params.id;
	res.send(patientService.getEntryById(id));
});

router.post('/', (req, res) => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const newPatientEntry = toNewPatientEntry(req.body);
		console.log('Converted to type');
		
		const addedEntry = patientService.addEntry(newPatientEntry);
		res.json(addedEntry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;
