import {getEvents, hasSaturday} from '@/components/courseUtil';
import React, {cache} from 'react';
import PageOverlay from '@/app/course/[course]/PageOverlay';
import {Calendar, CalendarType} from '@/components/Calendar';
import {Defaults} from '@/appDefaults';
import CourseListController from '@/components/CourseListController';

const cachedSaturday = cache(hasSaturday);

export default async function Course({
  params,
}: {
  params: Promise<{course: string}>;
}) {
  const {course} = await params;
  if (!course) {
    return {notFound: true};
  }

  const calendarEvents = await getEvents(course);

  const calendars: Record<string, CalendarType> = {};

  calendars[calendarEvents[0].calendarId!] = {
    colorName: calendarEvents[0].calendarId!,
    darkColors: {
      main: Defaults.mainColor[0],
      container: Defaults.containerColor[0],
      onContainer: Defaults.textColor[0],
    },
  };

  return (
    <>
      <CourseListController initialCourses={[course]}>
        <Calendar
          events={calendarEvents}
          hasSaturday={await cachedSaturday(calendarEvents)}
          calendars={calendars}
        />
        <PageOverlay course={course} />
      </CourseListController>
    </>
  );
}
