'use server';
import Grid from '@mui/material/Grid2';
import {Paper, Typography} from '@mui/material';

export default async function About() {
  return (
    <Grid container spacing={3}>
      <Grid size={{xs: 0, md: 2}} />
      <Grid size={{xs: 12, md: 8}}>
        <Paper sx={{p: 2}}>
          <Typography variant="h2">About</Typography>
          <Typography>
            This is a project for the DHBW Mannheim. It is a web application
            that allows students to view their timetable and other information
            about their courses.
          </Typography>
          <br />
          <Typography>
            This project is open source and can be found on{' '}
            <a href="https://github.com/Herobone/DHBW-Stundenplan-Tool/">
              GitHub
            </a>
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{xs: 0, md: 2}} />
    </Grid>
  );
}
