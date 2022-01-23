interface exerciseCalculatorResult {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: ratingDescription;
	target: number;
	average: number;
}

type ratingDescription =
	| "If I\'m honest it needs work"
	| 'Not too bad but could be better'
	| "You're doing great!";

const calculateExercises = (dailyExerciseHours: Array<number>, targetHours: number): exerciseCalculatorResult | any => {
    let rating = 1;
    let sum = 0;
    let success = false;
    let ratingDescription = 'If I\'m honest it needs work'
	for (let i = 0; i < dailyExerciseHours.length; i++) {
		sum += dailyExerciseHours[i];
    }
    
    const average = sum / dailyExerciseHours.length;
    if (average > targetHours) success = true; 
    
    if (average > targetHours) {
        rating = 3;
        ratingDescription = 'You\'re doing great!';
    } else if (average > targetHours * 0.9) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better';
    }

	return {
		periodLength: dailyExerciseHours.length,
		trainingDays: dailyExerciseHours.filter((item) => item != 0).length,
		target: targetHours,
		rating,
		average,
		ratingDescription,
		success,
	};
};

console.log(calculateExercises([0, 0, 2, 4.5, 0, 3, 1], 2));
