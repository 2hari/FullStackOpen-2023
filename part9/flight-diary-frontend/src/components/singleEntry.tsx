import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import { DiaryEntry } from "../types";


const singleEntry = ({entry}:{entry:DiaryEntry}) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 400 }}>
      <Box sx={{display:'flex',justifyContent:'space-between'}}>
        <Typography level="title-lg">{entry.date}</Typography>
        <Stack direction="row" spacing={2}>
          <Typography>{entry.weather}</Typography>
          <Typography>{entry.visibility}</Typography>
        </Stack>
      </Box>
    </Card>
  )
}

export default singleEntry