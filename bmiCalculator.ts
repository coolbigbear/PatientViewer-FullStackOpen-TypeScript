
const calculateBmi = (height: number, weight: number): String => {

    let result = 'Error';
    const heightInCm = height / 100;    
    const bmi = weight / (Math.pow(heightInCm, 2))

    if (bmi < 16) {
        result = 'Underweight (Severe thinness)'
    } else if (bmi > 16 && bmi < 17) {
        result = 'Underweight (Moderate thinness)'
    } else if (bmi > 17 && bmi < 18.5) {
        result = 'Underweight (Mild thinness)'
    } else if (bmi > 18.5 && bmi < 25) {
        result = 'Normal range (Healthy)'
    } else if (bmi > 25 && bmi < 30) {
        result = 'Overweight (Pre-obese)'
    } else if (bmi > 30 && bmi < 35) {
        result = 'Obese (Class I)'
    } else if (bmi > 35 && bmi < 40) {
        result = 'Obese (Class II)'
    } else if (bmi >= 40) {
        result = 'Obese (Class III)'
    }

    return result;

}

// console.log(calculateBmi(180, 74))

try {
	// console.log(process.argv.length);

	if (process.argv.length < 4) throw new Error('Not enough arguments');
	if (process.argv.length > 4) throw new Error('Too many arguments');

	process.argv.shift(); // Remove first 2 arguments;
	process.argv.shift();
	process.argv.forEach((element, index) => {
		if (isNaN(Number(element))) {
			throw new Error(`Value: ${element}, at position: ${index + 1}, is not a number!`);
		}
    });
    
	console.log(calculateBmi(Number(process.argv[0]), Number(process.argv[1])));
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}

