'use server';

import Calendar from '@/components/Calendar';
import {Fab, Typography} from '@mui/material';
import {Add as AddIcon, Delete as DeleteIcon} from '@mui/icons-material';
import {readCookie, setCookie} from '@/cookieManager';
import {revalidatePath} from 'next/cache';
import {getEvents, hasSaturday} from '@/components/courseUtil';

export default async function Course({
  params,
}: {
  params: Promise<{course: string}>;
}) {
  const {course} = await params;
  if (!course) {
    return {notFound: true};
  }
  const coursesFromCookie = await readCookie<string[]>('courses');
  const courses: string[] = [];
  if (coursesFromCookie) {
    courses.push(...coursesFromCookie);
  }
  const isSaved = courses.includes(course);

  async function handleAddEvent() {
    'use server';
    if (!isSaved) {
      courses.push(course);
    }
    await setCookie('courses', courses);
    revalidatePath('/course/' + course);
  }

  async function handleRemoveEvent() {
    'use server';
    const newCourses = courses.filter(c => c !== course);
    await setCookie('courses', newCourses);
    revalidatePath('/course/' + course);
  }

  const calendarEvents = await getEvents(course);

  return (
    <>
      <Calendar
        events={calendarEvents}
        hasSaturday={hasSaturday(calendarEvents)}
      />
      {isSaved ? (
        <Fab
          color="secondary"
          variant="extended"
          aria-label="remove"
          sx={{position: 'fixed', bottom: 16, right: 16}}
          onClick={handleRemoveEvent}
        >
          <DeleteIcon />
          <Typography sx={{mr: 1}}>Remove Course</Typography>
        </Fab>
      ) : (
        <Fab
          color="secondary"
          variant="extended"
          aria-label="add"
          sx={{position: 'fixed', bottom: 16, right: 16}}
          onClick={handleAddEvent}
        >
          <AddIcon />
          <Typography sx={{mr: 1}}>Add Course</Typography>
        </Fab>
      )}
    </>
  );
}
