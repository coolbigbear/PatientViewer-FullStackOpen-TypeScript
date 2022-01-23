
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

console.log(calculateBmi(180, 74))


