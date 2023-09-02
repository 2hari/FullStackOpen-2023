import express from 'express';
import patientService from '../services/patients';
import parseNewPatientData from "../utils/parsePatients";
import parseNewEntryData from '../utils/parseEntries';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNoSsnPatients());
});

router.get('/:id', (req, res) => {
    res.send(patientService.getSinglePatient(req.params.id));
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

router.post('/:id/entries', (req, res) => {
    try {
        const patient = patientService.getSinglePatient(req.params.id);
        if(patient === undefined) {
            res.status(404).send('Patient not found');
            return;
        }
        const parsedNewEntryData = parseNewEntryData(req.body);
        const newEntry = patientService.addNewEntry(patient, parsedNewEntryData);
        res.json(newEntry);
    }
    catch (error: unknown) {
        let errorMessage = 'Unable to add new entry.';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});


export default router;