import { calculateBmi } from './bmiCalculator';

import express = require('express');
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
	let response = null;
	const errorResponse = {
		error: 'malformed parameters',
	};
	const weight = req.query.weight;
	const height = req.query.height;

	if (!weight || !height) {
		res.send(errorResponse);
	} else {
		try {
			response = {
				weight: weight,
				height: height,
				bmi: calculateBmi(Number(height), Number(weight)),
			};
			res.send(response);
		} catch (e) {
			console.log(e);
			res.send(errorResponse);
		}
	}
});

app.post('/exercises', (req, res) => {
	// {
	//   "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
	//   "target": 2.5
	// }
	
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
	let daily_exercises: Array<number> = req.body.daily_exercises;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
	let target: number = req.body.target;
	
	if (!target || !daily_exercises) {
		res.send({
			error: 'parameters missing',
		});
	} else {
		try {
			daily_exercises = daily_exercises.map(Number);
			target = Number(target);			
			if (isNaN(target)) {
				throw new Error('Malformed parameter');
			}
			const response = calculateExercises(daily_exercises, target);
			res.send(response);
		} catch (e) {
			console.log(e);
			res.send({
				error: 'malformed parameters',
			});
		}
	}
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
