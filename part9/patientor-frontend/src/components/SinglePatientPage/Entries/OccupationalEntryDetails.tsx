import {useContext} from 'react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WorkIcon from '@mui/icons-material/Work';
import { DiagnosisContext } from '../../../contexts/diagnosisContext';
import { OccupationalHealthcareEntry } from "../../../types"

const OccupationalEntryDetails = ({entry}:{entry:OccupationalHealthcareEntry}) => {
  const diagnosisList = useContext(DiagnosisContext)

  return (
    <Box sx={{ border: '1px solid black', borderRadius: 4, padding: 2,mt:2  }}>
        <Typography>{entry.date}<Box component={'span'} sx={{ml:1}}><WorkIcon sx={{mr:2}}/>{entry.employerName}</Box></Typography>
        <Typography>{entry.description}</Typography>
        {
            entry.diagnosisCodes && (
                <Box>
                    <ul>
                        {entry.diagnosisCodes?.map(dc => <li key={dc}>{`${dc}: ${diagnosisList.find(d => d.code === dc)?.name}`}</li>)}
                    </ul>
                </Box>
            )
        }
        <Typography>{`Diagnose by ${entry.specialist}`}</Typography>
    </Box>
  )
}

export default OccupationalEntryDetails