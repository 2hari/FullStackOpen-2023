import express from 'express';
import patientService from '../services/patients';
import parseNewPatientData from "../utils/parsePatients";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNoSsnPatients());
});

router.post('/', (req, res) => {
    try {
        const parsedNewPatientData = parseNewPatientData(req.body);
        const newPatient = patientService.addNewPatient(parsedNewPatientData);
        res.json(newPatient);
    }
    catch (error: unknown) {
        let errorMessage = 'Unable to add a new patient';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});


export default router;