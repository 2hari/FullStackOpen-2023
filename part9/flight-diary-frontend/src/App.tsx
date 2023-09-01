import React, { useState, useEffect } from "react";
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import '@fontsource/inter';
import Typography from '@mui/joy/Typography';
import Box from "@mui/joy/Box";
import Grid from '@mui/joy/Grid';
import { DiaryEntry, NewDiaryEntry,Visibility, Weather } from "./types";
import { getAll, createNewDiary } from "./services/diary";
import SingleEntry from "./components/singleEntry";
import AddDiaryForm from "./components/AddDiaryForm";
import axios from "axios";


function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [formData, setFormData] = useState<NewDiaryEntry>({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment:''
  })
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData () {
      const data = await getAll()
      setDiaryEntries(data)
    }

    fetchData()
  }, []);

  async function postData(e: React.SyntheticEvent) {
    e.preventDefault()
    try{
      const newEntry = await createNewDiary(formData)
      setDiaryEntries((existingEntries) => [...existingEntries,newEntry])
      setFormData(prev => ({ ...prev, date: '', comment: '' }))
      setError('')
    } catch(e) {
      if(axios.isAxiosError(e)){
        if(e.response) setError(e.response.data)
      }
    }
  }

  useEffect(() => {
    if(error.length > 0) setTimeout(() => setError(''),3000)
  },[error])

  return (
    <CssVarsProvider>
      <CssBaseline />
      <Typography color="primary" level="h1" variant="solid" sx={{textAlign:'center'}}>
        Flight Diaries
      </Typography>
      <Box sx={{px:4}}>
        <Box sx={{maxWidth:'1200px',mx:'auto', py:8}}> 
          <Typography
            color="neutral"
            level="h3"
            noWrap={false}
            variant="plain"
            mb={2}
          >
            Add new Entry
          </Typography>
          { error &&
            <Typography
              variant="soft"
              color="danger"
              startDecorator="🚨"
              fontSize="sm"
              sx={{ '--Typography-gap': '0.5rem', p: 1, maxWidth:'600px', mb:2 }}
            >
              {error}
            </Typography>
          }
          <AddDiaryForm formInputs={formData} formInputHandler={setFormData} formSubmit={postData} />
          <Typography 
            color="neutral"
            level="h3"
            noWrap={false}
            variant="plain"
            mt={8}
          >
            All Entries
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ flexGrow: 1, mt:2 }}
          >
            {diaryEntries.map(entry =>
              <Grid xs={4} sm={4} md={4} key={entry.date}>
                <SingleEntry entry={entry}/>
              </Grid>  
            )}
          </Grid>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export default App;
