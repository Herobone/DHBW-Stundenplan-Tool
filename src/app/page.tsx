import Grid from '@mui/material/Grid2';
import {Paper, Typography} from '@mui/material';
import {Defaults} from '@/appDefaults';
import CalendarApp, {CalendarType} from '@/components/Calendar';
import {readCookie} from '@/cookieManager';
import {CalenderEvent, getEvents, hasSaturday} from '@/components/courseUtil';
import {Color} from '@bluefirex/color-ts';
import {ReactElement} from 'react'; // Adjust the path as necessary

const mainColor = [
  '#9dff00',
  '#a16211',
  '#d6107d',
  '#d19a3a',
  '#3f51b5',
  '#2196f3',
];

export default async function Home() {
  const courses = (await readCookie<string[]>('courses')) ?? [];
  const events: CalenderEvent[] = [];
  for (const course of courses) {
    const courseEvents = await getEvents(course);
    events.push(...courseEvents);
  }

  const calendarLegend: ReactElement[] = [];

  const calendars: Record<string, CalendarType> = {};
  let courseIndex = 0;
  for (const course of courses) {
    calendars[course] = {
      colorName: course,
      darkColors: {
        main: mainColor[courseIndex % mainColor.length],
        container:
          '#' +
          Color.fromHex(mainColor[courseIndex % mainColor.length]).darken(10)
            .hex,
        onContainer: '#000000',
      },
    };
    calendarLegend.push(
      <Typography
        key={courseIndex}
        style={{color: mainColor[courseIndex % mainColor.length]}}
      >
        {course}
      </Typography>
    );
    courseIndex++;
  }

  return (
    <Grid container spacing={3}>
      <Grid size={{xs: 12}}>
        <Paper
          sx={{
            p: 2,
          }}
        >
          <Typography variant="h3" gutterBottom>
            Willkommen bei der {Defaults.appName} App
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{xs: 12, md: 10}}>
        <Paper sx={{p: 2}}>
          <CalendarApp
            events={events}
            calendars={calendars}
            hasSaturday={hasSaturday(events)}
          />{' '}
        </Paper>
      </Grid>
      <Grid size={{xs: 12, md: 2}}>
        <Paper sx={{p: 2}}>{calendarLegend}</Paper>
      </Grid>
    </Grid>
  );
}
