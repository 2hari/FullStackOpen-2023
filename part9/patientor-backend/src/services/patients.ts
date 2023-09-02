import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NoSsnPatient, NewPatient,Entry, EntryWithoutId } from '../types';


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

const getSinglePatient = (id: string): Patient | undefined => {
    return patientData.find(p => p.id === id);
};

const addNewPatient = (newPatientData: NewPatient): Patient => {
    const id = uuid();
    const newPatient = { id, ...newPatientData };
    patientData.push(newPatient);
    return newPatient;
};

const addNewEntry = (patient: Patient, entryData: EntryWithoutId): Entry => {
    const id = uuid();
    console.log(entryData);
    const newEntry = { id, ...entryData };
    patient.entries.push(newEntry);
    return newEntry;
};


export default { getNoSsnPatients, addNewPatient, getSinglePatient,addNewEntry };