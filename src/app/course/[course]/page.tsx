'use server';

import {Calendar} from '@/components/Calendar';
import {getEvents, hasSaturday} from '@/components/courseUtil';
import React, {cache} from 'react';
import PageOverlay from '@/app/course/[course]/PageOverlay';

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
      <Calendar
        events={calendarEvents}
        hasSaturday={await cachedSaturday(calendarEvents)}
      />
      <PageOverlay course={course} />
    </>
  );
}
