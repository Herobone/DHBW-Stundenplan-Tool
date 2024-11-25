'use client';

import {CalendarEvent} from '@/components/courseUtil';
import {ScheduleXCalendar, useNextCalendarApp} from '@schedule-x/react';
import {createViewDay, createViewWeek} from '@schedule-x/calendar';
import {createCurrentTimePlugin} from '@schedule-x/current-time';
import {createEventModalPlugin} from '@schedule-x/event-modal';
import {isoToReadable} from '@/helpers';
import {CalendarType} from '@/components/Calendar';
import {Defaults} from '@/appDefaults';

export default function SingleCalendar({
  events,
  hasSaturday,
}: {
  events: CalendarEvent[];
  hasSaturday?: boolean;
}) {
  const calendars: Record<string, CalendarType> = {};

  calendars[events[0].calendarId!] = {
    colorName: events[0].calendarId!,
    darkColors: {
      main: Defaults.mainColor[0],
      container: Defaults.containerColor[0],
      onContainer: Defaults.textColor[0],
    },
  };

  const calendar = useNextCalendarApp({
    views: [createViewDay(), createViewWeek()],
    dayBoundaries: {
      start: '07:00',
      end: '20:00',
    },
    weekOptions: {
      nDays: hasSaturday ? 6 : 5,
    },
    isDark: true,
    locale: 'de-DE',
    firstDayOfWeek: 1,
    selectedDate: isoToReadable(new Date().toISOString()),
    events: events,
    plugins: [
      createCurrentTimePlugin({
        fullWeekWidth: true,
      }),
      createEventModalPlugin(),
    ],
    calendars: calendars,
  });

  return <ScheduleXCalendar calendarApp={calendar} />;
}
