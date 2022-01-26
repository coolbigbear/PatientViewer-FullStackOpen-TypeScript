import { calculateBmi } from './bmiCalculator';
import express = require('express');
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
