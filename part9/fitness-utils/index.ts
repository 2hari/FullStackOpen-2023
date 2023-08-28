import express from 'express';
import { calculateBmi } from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator'

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (!height || !weight || isNaN(weight) || isNaN(height)) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    const bmi = calculateBmi(height, weight);

    return res.status(200).send({
        weight,
        height,
        bmi
    });
});

app.post('/exercises', (req, res) => {
    const { daily_exercises: dailylogs, target } = req.body;

    if (!target || !dailylogs) {
        return res.status(400).send({ error: 'parameters missing' });
    }

    if (isNaN(target) || dailylogs.some(isNaN)) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    const result = calculateExercises(target, dailylogs);

    return res.status(200).json(result);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
