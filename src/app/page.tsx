import Grid from '@mui/material/Grid2';
import {Paper, Typography} from '@mui/material';
import {Defaults} from '@/appDefaults';

export default function Home() {
  return (
    <Grid container spacing={3}>
      <Grid size={{xs: 0, sm: 3}} />
      <Grid size={{xs: 12, sm: 6}}>
        <Paper sx={{p: 2}}>
          <Typography variant="h3" gutterBottom>
            Willkommen bei der {Defaults.appName} App
          </Typography>
          <br />
          Lorem ipsum odor amet, consectetuer adipiscing elit. Eu finibus ante
          consequat per vehicula nulla. Nullam nullam primis tempus, leo gravida
          curabitur dictum. Aptent auctor accumsan est est, imperdiet sapien
          dapibus.
        </Paper>
      </Grid>
      <Grid size={{xs: 0, sm: 3}} />
    </Grid>
  );
}
