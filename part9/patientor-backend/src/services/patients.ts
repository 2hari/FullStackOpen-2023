import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NoSsnPatient, NewPatient, } from '../types';


const getNoSsnPatients = (): NoSsnPatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, entries, occupation }) => ({
        id, 
        name, 
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};

const addNewPatient = (newPatientData: NewPatient): Patient => {
    const id = uuid();
    const newPatient = { id, ...newPatientData };
    patientData.push(newPatient);
    return newPatient;
};


export default { getNoSsnPatients, addNewPatient };