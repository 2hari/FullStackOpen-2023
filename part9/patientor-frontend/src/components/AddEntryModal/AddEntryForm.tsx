import { useState, useContext } from "react";
import { Theme, useTheme } from '@mui/material/styles';
import {  Box,Typography, Radio, FormControl, FormLabel, FormControlLabel, RadioGroup, TextField, InputLabel, MenuItem, Select, Chip, OutlinedInput, Button, SelectChangeEvent } from '@mui/material';
import { DiagnosisContext } from '../../contexts/diagnosisContext';
import { NewBaseEntry,HealthCheckRating, Diagnosis, EntryWithoutId } from "../../types";
import { isStringArray, isSubset} from '../../utils'

interface Props {
  onCancel: () => void;
  onSubmit: (newEntryData: EntryWithoutId) => void;
}

const entryTypeMapping = {
  Hospital: 'Hospital',
  OccupationalHealthcare: 'OccupationalHealthcare',
  HealthCheck: 'HealthCheck',
} as const;

type EntryType = typeof entryTypeMapping[keyof typeof entryTypeMapping];
const HealthRatingArr = Object.keys(HealthCheckRating).filter(keys => !isNaN(Number(keys))).map(keys => Number(keys))
type HealthRating = typeof HealthRatingArr[number]


const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>();
  const [newBase,setNewBase] = useState<NewBaseEntry>({
    description:'',
    date:'',
    specialist:'',
    diagnosisCodes: [],
  })
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0)
  const [dischargeDate, setDischargeDate] = useState('')
  const [dischargeCriteria, setDischargeCriteria] = useState('')
  const [employerName, setEmployerName] = useState('')
  const [sickLeaveStart, setSickLeaveStart] = useState('')
  const [sickLeaveEnd, setSickLeaveEnd] = useState('')
  const diagnosisList = useContext(DiagnosisContext)
  const theme = useTheme();  

  const entryTypeKeys = Object.keys(entryTypeMapping) as Array<keyof typeof entryTypeMapping>;
  const handleEntryTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntryType(event.target.value as EntryType);
  };

  const handleDiagnosisCodeChange = (e: SelectChangeEvent<Array<Diagnosis['code']>>) => {
    if(isStringArray(e.target.value)){
        if(isSubset(e.target.value,diagnosisList.map(d => d.code))){
            setNewBase(prev => ({...prev, diagnosisCodes:e.target.value as string[]}))
        }
    }
  };
  function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
        personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
  }
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
  };

  function resetForm() {
    setEntryType(undefined)
    setNewBase({
        description:'',
        date:'',
        specialist:'',
        diagnosisCodes: [],
    })
    setHealthCheckRating(0)
    setDischargeDate('')
    setDischargeCriteria('')
    setEmployerName('')
    setSickLeaveStart('')
    setSickLeaveEnd('')
  }

  const forwardForm = () => {
        switch (entryType) {
            case "Hospital":
                onSubmit({ ...newBase, type: "Hospital", discharge: {date: dischargeDate, criteria: dischargeCriteria} });
                break;
            case "OccupationalHealthcare":
                onSubmit({ ...newBase, type: "OccupationalHealthcare", employerName: employerName, sickLeave: sickLeaveStart && sickLeaveEnd ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }: undefined });
                break;
            case "HealthCheck":
                onSubmit({ ...newBase, type: "HealthCheck", healthCheckRating });
                break;
        }
    };

  return (
    <Box>
      {
        entryType
         ? (
            <Box>
                <Typography component="h6" variant="h6" sx={{mb:2}}>{`New ${entryType} Entry`}</Typography>
                {/* BASE FORM ROW 1 */}
                <Box sx={{display:'flex','& > *': { flex: 1, mb:2,mr:2 }}}>
                    <Box>
                        <TextField sx={{width:'100%'}}  label="Description" variant="outlined" value={newBase.description} onChange={(e) => setNewBase(prev => ({...prev,description: e.target.value}))} />
                    </Box>
                    <Box>
                        <TextField sx={{width:'100%'}} type="date" label="Entry Date"  variant="outlined" value={newBase.date} onChange={(e) => setNewBase(prev => ({...prev,date: e.target.value}))} InputLabelProps={{shrink:true}}/>
                    </Box>
                </Box>
                {/* BASE FORM ROW 2 */}
                <Box sx={{display:'flex','& > *': { flex: 1, mb:2,mr:2 }}}>
                    <Box >
                        <TextField sx={{width:'100%'}} label="Specialist" variant="outlined" value={newBase.specialist} onChange={(e) => setNewBase(prev => ({...prev,specialist: e.target.value}))} />
                    </Box>
                    <Box>
                        <FormControl sx={{width:'100%'}}>
                            <InputLabel>Diagnosis Codes</InputLabel>
                            <Select
                                multiple
                                value={newBase.diagnosisCodes}
                                onChange={handleDiagnosisCodeChange}
                                input={<OutlinedInput label="Diagnosis Codes" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                            {diagnosisList.map((d) => (
                                <MenuItem
                                    key={d.code}
                                    value={d.code}
                                    style={getStyles(d.code, diagnosisList.map(d => d.code), theme)}
                                >
                                {d.code}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                {/* HOSPITAL ENTRY FIELDS */}
                {
                    entryType === 'Hospital' && (
                    <Box sx={{display:'flex','& > *': { flex: 1, mb:2,mr:2 }}}>
                        <Box>
                            <TextField sx={{width:'100%'}} type="date" label="Discharge Date" variant="outlined" value={dischargeDate} onChange={(e) => setDischargeDate(e.target.value)} InputLabelProps={{shrink:true}}/>
                        </Box>
                        <Box>
                            <TextField sx={{width:'100%'}} variant="outlined" label="Discharge Criteria" value={dischargeCriteria} onChange={(e) => setDischargeCriteria(e.target.value)} />
                        </Box>                        
                    </Box>                        
                    )
                }
                {/* HEALTHCHECKUP ENTRY FIELDS */}
                {
                    entryType === 'HealthCheck' && (
                      <TextField sx={{width:'100%'}} select variant="outlined" label="Select Health Check Rating" value={healthCheckRating} onChange={(e) => setHealthCheckRating(Number(e.target.value) as HealthRating)}>
                        {Object.keys(HealthCheckRating).filter(keys => !isNaN(Number(keys))).map((ratingKey) => (
                            <MenuItem key={ratingKey} value={ratingKey}>
                                {`${HealthCheckRating[ratingKey as keyof typeof HealthCheckRating]} : ${ratingKey}`}
                            </MenuItem>
                        ))}
                      </TextField>  
                    )
                }
                {/* Occupation HEALTHCHECKUP ENTRY FIELDS */}
                {
                    entryType === 'OccupationalHealthcare' && (
                        <Box>
                            <Box sx={{display:'flex','& > *': { flex: 1, mb:2,mr:2 }}}>
                                <Box>
                                    <TextField sx={{width:'100%'}} type="date" label="Sick leave start Date" variant="outlined" value={sickLeaveStart} onChange={(e) => setSickLeaveStart(e.target.value)} InputLabelProps={{shrink:true}}/>
                                </Box>
                                <Box>
                                    <TextField sx={{width:'100%'}} type="date" label="Sick leave end Date" variant="outlined" value={sickLeaveEnd} onChange={(e) => setSickLeaveEnd(e.target.value)} InputLabelProps={{shrink:true}}/>
                                </Box>    
                            </Box>
                            <TextField sx={{width:'100%'}} variant="outlined" label="Employer name" value={employerName} onChange={(e) => setEmployerName(e.target.value)} />
                        </Box>
                    )
                }
                <Box sx={{mt:3,display:'flex','& > *': { flex: 1, mb:2,mr:2 }}}>
                    <Box>
                        <Button sx={{width:'100%', height:'50px'}} onClick={() => resetForm()} variant="outlined" >Reselect Entry type</Button>
                    </Box>
                    <Box>
                         <Button sx={{width:'100%', height:'50px'}} variant="contained" onClick={() => forwardForm()}>Submit</Button>
                    </Box>
                </Box>       
            </Box>
         )
         : (
            <Box>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Select Entry Type</FormLabel>
                    <RadioGroup
                        row
                        value={entryType}
                        onChange={handleEntryTypeChange}
                        name="entry-type"
                    >
                        {entryTypeKeys.map((key) => (
                            <FormControlLabel
                                key={key}
                                value={entryTypeMapping[key]}
                                control={<Radio />}
                                label={key}
                            />
                        ))}
                    </RadioGroup>                    
                </FormControl>
                <Button sx={{width:'100%', height:'50px', mt:4}} variant="outlined" color="error" onClick={() => onCancel()}>Cancel</Button>
            </Box>
         )
      }
    </Box>
  )
}

export default AddEntryForm 