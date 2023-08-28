interface BmiArgs {
    heightInCm: number;
    weightInKg: number;
}

export const parseBmiArguments = (args: string[]): BmiArgs => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            heightInCm: Number(args[2]),
            weightInKg: Number(args[3])
        };
    } else {
        throw new Error('height and weight must be valid numbers');
    }
};

export const calculateBmi = (heightInCm: number, weightInKg: number): string => {
    const bmi = (weightInKg / (heightInCm*heightInCm)) * 10000;

    if (bmi <= 18.5) {
        return 'Underweight';
    } else if (bmi > 18.5 && bmi <= 25) {
        return 'Normal (healthy weight)';
    } else if (bmi > 25 && bmi <= 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
};

if(process.argv.length === 4 && !isNaN(Number(process.argv[2])) && !isNaN(Number(process.argv[3]))){
    console.log(`COMMAND-LINE RESULT: BMI of ${Number(process.argv[2])} tall and ${Number(process.argv[3])} heavy is catogarised as:`)
    console.log(calculateBmi(parseBmiArguments(process.argv).heightInCm,parseBmiArguments(process.argv).weightInKg))
    console.log('\n')
}
console.log("HARDCODED VALUES: BMI of 180CM tall and 74KG heavy is catogarised as:")
console.log(calculateBmi(180, 74))
console.log('\n')


