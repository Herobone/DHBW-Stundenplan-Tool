import Grid from '@mui/material/Grid2';
import {List, Paper, Typography} from '@mui/material';
import {Defaults} from '@/appDefaults';
import {CalendarType, Calendar} from '@/components/Calendar';
import {CalendarEvent, getEvents, hasSaturday} from '@/components/courseUtil';
import CourseListController from '@/components/CourseListController';
import CalendarLegend from '@/components/CalendarLegend';
import {readNextCookie} from '@/cookieManager';

export default async function Home() {
  const courses = await readNextCookie<string[]>('courses');
  const events: CalendarEvent[] = [];
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
      courseIndex++;
    }
  }

  return (
    <Grid container spacing={3}>
      <CourseListController initialCourses={courses}>
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
            <Calendar
              events={events}
              calendars={calendars}
              hasSaturday={await hasSaturday(events)}
            />{' '}
          </Paper>
        </Grid>
        <Grid size={{xs: 12, md: 2}}>
          <Paper>
            <List>
              <CalendarLegend courses={courses} />
            </List>
          </Paper>
        </Grid>
      </CourseListController>
    </Grid>
  );
}
