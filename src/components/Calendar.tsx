'use client';
import {ScheduleXCalendar, useNextCalendarApp} from '@schedule-x/react';
import '@schedule-x/theme-default/dist/index.css';
import {createViewDay, createViewWeek} from '@schedule-x/calendar';
import {createCurrentTimePlugin} from '@schedule-x/current-time';
import {createEventModalPlugin} from '@schedule-x/event-modal';
import {CalenderEvent} from '@/components/courseUtil';

type ColorDefinition = {
  main: string;
  container: string;
  onContainer: string;
};

export type CalendarType = {
  colorName: string;
  label?: string;
  darkColors?: ColorDefinition;
};

function CalendarApp({
  events,
  calendars,
  hasSaturday,
}: {
  events: CalenderEvent[];
  calendars?: Record<string, CalendarType>;
  hasSaturday?: boolean;
}) {
  const calendar = useNextCalendarApp({
    views: [createViewDay(), createViewWeek()],
    events: events,
    dayBoundaries: {
      start: '07:00',
      end: '20:00',
    },
    isDark: true,
    locale: 'de-DE',
    firstDayOfWeek: 1,
    weekOptions: {
      nDays: hasSaturday ? 6 : 5,
    },
    calendars: calendars,
    plugins: [
      createCurrentTimePlugin({
        fullWeekWidth: true,
      }),
      createEventModalPlugin(),
    ],
  });

  return (
    <>
      <ScheduleXCalendar calendarApp={calendar} />
    </>
  );
}

export default CalendarApp;
