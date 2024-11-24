import Grid from '@mui/material/Grid2';
import {Paper, Typography} from '@mui/material';
import {Defaults} from '@/appDefaults';
import CalendarApp, {CalendarType} from '@/components/Calendar';
import {readCookie} from '@/cookieManager';
import {CalendarEvent, getEvents, hasSaturday} from '@/components/courseUtil';
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
  const courses = await readCookie<string[]>('courses');
  const events: CalendarEvent[] = [];
  const calendarLegend: ReactElement[] = [];
  const calendars: Record<string, CalendarType> = {};

  if (courses) {
    for (const course of courses) {
      const courseEvents = await getEvents(course);
      events.push(...courseEvents);
    }

    let courseIndex = 0;
    for (const course of courses) {
      calendars[course] = {
        colorName: course,
        darkColors: {
          main: Defaults.mainColor[courseIndex % Defaults.mainColor.length],
          container:
            Defaults.containerColor[
              courseIndex % Defaults.containerColor.length
            ],
          onContainer:
            Defaults.textColor[courseIndex % Defaults.textColor.length],
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
          <Typography>
            Zuerst unter &quot;Find Course&quot; einen Kurs auswählen!
            <br />
            Wenn du dort den Kurs speicherst, siehst du ihn hier auf der
            Homepage!
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{xs: 12, md: 10}}>
        <Paper sx={{p: 2}}>
          <CalendarApp
            events={events}
            calendars={calendars}
            hasSaturday={await hasSaturday(events)}
          />{' '}
        </Paper>
      </Grid>
      <Grid size={{xs: 12, md: 2}}>
        <Paper sx={{p: 2}}>{calendarLegend}</Paper>
      </Grid>
    </Grid>
  );
}
