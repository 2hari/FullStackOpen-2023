import { useState,useEffect } from "react";
import { useParams } from "react-router-dom" 
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from '@mui/icons-material/Transgender';
import axios from "axios";
import patientService from "../../services/patients";
import EntryDetails from "./Entries";
import { Patient,Gender,EntryWithoutId } from "../../types";
import AddEntryModal from "../AddEntryModal";

const SinglePatient = () => {
  const [patient, setPatient] = useState<Patient | undefined>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const {id:patientId} = useParams()

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if(patientId){
          const patient = await patientService.getPatientById(patientId);
          setPatient(patient);
      }
    };
    void fetchPatient();
  }, [patientId]);

  useEffect(() => {
    if(error && error.length > 0) setTimeout(() => setError(''),3000)
  },[error])

  if (!patientId || !patient ) {
    return <Alert severity="error" sx={{mt:4}}>Something went wrong, Patient not found !</Alert>
  }

  function renderGenderIcon(gender:Gender) {
    switch(gender) {
        case "female":
            return <FemaleIcon fontSize="large"/>;
        case "male":
            return <MaleIcon fontSize="large"/>;
        case "other":
            return <TransgenderIcon fontSize="large"/>;
        default:
            return null;
    }
  }

  const submitNewEntry = async (newEntryData:EntryWithoutId) => {
    try {
        if(patient) {
            const newEntry = await patientService.addEntry(patient.id, newEntryData);
            setPatient((prev) => ({...(prev as Patient),entries:[...((prev as Patient)?.entries ?? []),newEntry]}))
            setModalOpen(false);
        }
    } catch(error: unknown) {
        if(axios.isAxiosError(error)) {
            if(error?.response?.data && typeof error?.response?.data === 'string') {
                const errorMessage = error.response.data.replace('Something went wrong. Error: ', '');
                setError(errorMessage);
            } else {
                setError("Unrecognized Axios Error");
            }
        }
        else {
            setError("Unknown Error");
        }
    }    
  }

  return (
    <Box mt={4}>
        <Typography component="h4" variant="h4" sx={{mb:2}}>{patient?.name}<Box component={'span'} sx={{ml:1}}>{renderGenderIcon(patient?.gender)}</Box></Typography>
        <Typography>SSN: {patient?.ssn}</Typography>
        <Typography>Occupation: {patient?.occupation}</Typography>
        <Typography component="h5" variant="h5" sx={{mt:3}}>Entries</Typography>
        <Box>
          {
            patient?.entries.map(e => <EntryDetails key={e.id} entry={e}/>)
          }
        </Box>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" sx={{mt:6}} onClick={() => openModal()}>
          Add New Entry
        </Button>
    </Box>
  )
}

export default SinglePatient