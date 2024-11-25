'use server';

import {getEvents, hasSaturday} from '@/components/courseUtil';
import React, {cache} from 'react';
import PageOverlay from '@/app/course/[course]/PageOverlay';
import SingleCalendar from '@/components/SingleCalendar';

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

  return (
    <>
      <SingleCalendar
        events={calendarEvents}
        hasSaturday={await cachedSaturday(calendarEvents)}
      />
      <PageOverlay course={course} />
    </>
  );
}
