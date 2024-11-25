'use client';
import '@schedule-x/theme-default/dist/index.css';
import {
  CalendarApp,
  CalendarConfig,
  createCalendar,
  createViewDay,
  createViewWeek,
} from '@schedule-x/calendar';
import {createCurrentTimePlugin} from '@schedule-x/current-time';
import {createEventModalPlugin} from '@schedule-x/event-modal';
import {CalendarEvent} from '@/components/courseUtil';
import {Reducer, useContext, useEffect, useReducer, useState} from 'react';
import {CourseListContext} from '@/components/CourseListController';
import {ScheduleXCalendar} from '@schedule-x/react';

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
const reducer: Reducer<CalendarConfig, Partial<CalendarConfig>> = (
  state,
  newState
) => {
  return {...state, ...newState};
};
const defaultCalendarConfig: CalendarConfig = {
  views: [createViewDay(), createViewWeek()],
  dayBoundaries: {
    start: '07:00',
    end: '20:00',
  },
  isDark: true,
  locale: 'de-DE',
  firstDayOfWeek: 1,
  plugins: [
    createCurrentTimePlugin({
      fullWeekWidth: true,
    }),
    createEventModalPlugin(),
  ],
};

export function Calendar({
  events,
  calendars,
  hasSaturday,
}: {
  events: CalendarEvent[];
  calendars?: Record<string, CalendarType>;
  hasSaturday?: boolean;
}) {
  const activeCourses = useContext(CourseListContext);

  const [calendarConfig, dispatchCalendarConfig] = useReducer<
    Reducer<CalendarConfig, Partial<CalendarConfig>>,
    CalendarConfig
  >(reducer, defaultCalendarConfig, arg => {
    return {...arg, events, calendars};
  });

  const [calendar, setCalendar] = useState<CalendarApp | undefined>(undefined);

  useEffect(() => {
    const calendarsNew: Record<string, CalendarType> = {};
    if (calendars) {
      for (const course of activeCourses) {
        calendarsNew[course] = calendars[course];
      }
    }

    dispatchCalendarConfig({
      weekOptions: {
        nDays: hasSaturday ? 6 : 5,
      },
      calendars: calendars,
      events: events.filter(
        evt => evt.calendarId && activeCourses.includes(evt.calendarId)
      ),
    });
    setCalendar(undefined);
  }, [activeCourses, calendars, events, hasSaturday]);

  useEffect(() => {
    setCalendar(createCalendar(calendarConfig));
  }, [calendarConfig]);

  return <>{calendar && <ScheduleXCalendar calendarApp={calendar} />}</>;
}

export default CalendarApp;
