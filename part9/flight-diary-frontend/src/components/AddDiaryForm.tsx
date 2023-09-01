import { NewDiaryEntry,Visibility, Weather } from "../types";
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Box from "@mui/joy/Box";

interface AddDiaryFormProps {
  formInputs:NewDiaryEntry
  formInputHandler: React.Dispatch<React.SetStateAction<NewDiaryEntry>>
  formSubmit: (e:React.SyntheticEvent) => Promise<void>
}

interface VisibilityOption {
  value: Visibility;
  label: string;
}

interface WeatherOption {
  value: Weather;
  label: string;
}

const AddDiaryForm = ({formInputs,formInputHandler,formSubmit}:AddDiaryFormProps) => {

  const visibilityOptions: VisibilityOption[] = Object.keys(Visibility).map(k => ({
     value: Visibility[k as keyof typeof Visibility],label: k as Visibility,
  }));

  const onVisibilityChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if(typeof e.target.value === "string") {
      const value = e.target.value;
      const visibility = Object.values(Visibility).find(v => v === value);
      if (visibility) {
        formInputHandler((prev) => ({...prev,visibility:visibility}))
      }
    }
  };

  const weatherOptions: WeatherOption[] = Object.keys(Weather).map(k => ({
     value: Weather[k as keyof typeof Weather],label: k as Weather,
  }));

  const onWeatherChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if(typeof e.target.value === "string") {
      const value = e.target.value;
      const weather = Object.values(Weather).find(v => v === value);
      if (weather) {
        formInputHandler((prev) => ({...prev,weather:weather}))
      }
    }
  };

  return (
    <Box sx={{maxWidth:'600px'}}>
      <form onSubmit={formSubmit}>
        <Box sx={{display:'flex', flexDirection: {xs:'column',md:'row'}, gap:6}}>
          <Box sx={{flex:1}}>
            <Input type="date" value={formInputs.date} onChange={(e) => formInputHandler((prev) => ({...prev,date:e.target.value}))}/>
            <Textarea minRows={5} placeholder="Comment here" variant="outlined" value={formInputs.comment} onChange={(e) => formInputHandler((prev) => ({...prev,comment:e.target.value}))} sx={{mt:2}}/>
          </Box>
          <Box sx={{display:'flex', gap:6}}>
            <Box>
              <FormControl>
                <FormLabel id="visibility-radio-group">Visibility</FormLabel>
                <RadioGroup name="Visibility" value={formInputs.visibility} onChange={onVisibilityChange}>
                  {visibilityOptions.map(option => <Radio key={option.label} value={option.value} label={option.label}   color="neutral"/>)}
                </RadioGroup>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel id="weather-radio-group">Weather</FormLabel>
                <RadioGroup name="Weather" value={formInputs.weather} onChange={onWeatherChange}>
                  {weatherOptions.map(option => <Radio key={option.label} value={option.value} label={option.label} variant="outlined"  color="neutral"/>)}
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Button sx={{ mt: 2, width:'100%' }} type='submit'>Submit</Button>
      </form>
    </Box>
  )
}

export default AddDiaryForm