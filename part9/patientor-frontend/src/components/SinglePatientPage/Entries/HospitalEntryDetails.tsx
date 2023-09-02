import {useContext} from 'react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { DiagnosisContext } from '../../../contexts/diagnosisContext';
import { HospitalEntry } from "../../../types"

const HospitalEntryDetails = ({entry}:{entry:HospitalEntry}) => {
  const diagnosisList = useContext(DiagnosisContext)

  return (
    <Box sx={{ border: '1px solid black', borderRadius: 4, padding: 2,mt:2  }}>
        <Typography>{entry.date}<Box component={'span'} sx={{ml:1}}><LocalHospitalIcon/></Box></Typography>
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
        <Typography>{`Discharged on ${entry.discharge.date} for criteria ${entry.discharge.criteria}`}</Typography>
        <Typography>{`Diagnose by ${entry.specialist}`}</Typography>
    </Box>
  )
}

export default HospitalEntryDetails