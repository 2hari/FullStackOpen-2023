import {useContext} from 'react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { green,yellow,orange,red } from '@mui/material/colors';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { DiagnosisContext } from '../../../contexts/diagnosisContext';
import { HealthCheckEntry,HealthCheckRating } from "../../../types"

const HealthCheckEntryDetails = ({entry}:{entry:HealthCheckEntry}) => {
  const diagnosisList = useContext(DiagnosisContext)

  function renderHealthIndicator(rating:HealthCheckRating) {
    switch(rating) {
        case 0:
            return <FavoriteIcon fontSize="large" sx={{ color: green[500] }}/>;
        case 1:
            return <FavoriteIcon fontSize="large" sx={{ color: yellow[500] }}/>;
        case 2:
            return <FavoriteIcon fontSize="large" sx={{ color: orange[500] }}/>;
        case 3:
            return <FavoriteIcon fontSize="large" sx={{ color: red[500] }}/>;
        default:
            return null;
    }
  }

  return (
    <Box sx={{ border: '1px solid black', borderRadius: 4, padding: 2,mt:2  }}>
        <Typography>{entry.date}<Box component={'span'} sx={{ml:1}}><MedicalServicesIcon/></Box></Typography>
        <Typography>{entry.description}</Typography>
        {renderHealthIndicator(entry.healthCheckRating)}
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

export default HealthCheckEntryDetails