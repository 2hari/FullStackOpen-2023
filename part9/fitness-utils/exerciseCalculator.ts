interface ExerciseArgs {
    target: number;
    dailyLogs: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseArgs => {
    if (args.length < 4) {
        throw new Error('Not enough arguments');
    }

    const dailyLogs: number[] = [];

    for (let i = 3; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error('Provided values were not numbers');
        } else {
            dailyLogs.push(Number(args[i]));
        }
    }

    return {
        target: Number(args[2]),
        dailyLogs: dailyLogs,
    };
};

interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (target: number, dailyLogs: number[]): ExerciseResult => {
    const periodLength = dailyLogs.length;
    const trainingDays = dailyLogs.filter(day => day !== 0).length;
    const average = dailyLogs.reduce((total, dayTime) => total + dayTime, 0) / periodLength;
    const success = average >= target;

    const calculateRating = (average: number, target: number): number => {
        if (average >= target) return 3;
        else if (average >= target * 0.85) return 2;
        else return 1;
    };

    const getDescription = (rating: number): string => {
        if (rating === 1) return 'Try harder next time';
        else if (rating === 2) return 'Not too bad but could be better';
        else return 'Target achieved';
    };

    const rating = calculateRating(average, target);
    const ratingDescription = getDescription(rating);

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

if(process.argv.length >= 4 && !isNaN(Number(process.argv[2])) && [...process.argv].every(item => typeof item === 'number')){
    console.log(`COMMAND-LINE RESULT: RESULT of training record ${[...process.argv.slice(3)]} agaisnt target ${Number(process.argv[2])} is:`)
    console.log(calculateExercises(parseExerciseArguments(process.argv).target,parseExerciseArguments(process.argv).dailyLogs))
    console.log('\n')
}
console.log(`HARDCODED VALUES: RESULT of training record ${[3, 0, 2, 4.5, 0, 3, 1]} agaisnt target ${2} is:`)
console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]))
console.log('\n')
