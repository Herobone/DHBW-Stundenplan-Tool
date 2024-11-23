'use server';

import {isoToReadable} from '@/helpers';

export interface CourseEvent {
  entityType: string;
  date: string;
  site: string;
  startTime: string;
  endTime: string;
  name: string;
  type: string;
  lecturer: string;
  rooms: string[];
  course: string;
  id: number;
}

export interface CalendarEvent {
  id: number;
  start: string;
  end: string;
  title?: string;
  people?: string[];
  location?: string;
  description?: string;
  calendarId?: string;
}

export type JSONEvents = {[key: string]: CourseEvent};
export type ExtendedDataFormat = {[key: string]: {[subj: string]: unknown}};

export async function getEvents(course: string) {
  const data = await fetch(
    `https://api.dhbw.app/rapla/lectures/${course}/events`,
    {
      next: {revalidate: 3600},
    }
  );
  const json: JSONEvents = await data.json();

  const calendarEvents: CalendarEvent[] = [];
  for (const event of Object.values(json)) {
    calendarEvents.push({
      id: event.id,
      start: isoToReadable(event.startTime),
      end: isoToReadable(event.endTime),
      location: event.rooms.join(', '),
      title: event.name,
      calendarId: course,
    });
  }
  return calendarEvents;
}

export async function getSubjects(): Promise<ExtendedDataFormat> {
  const response = await fetch(
    'https://api.dhbw.app/courses/MA/mapped/extended',
    {
      next: {revalidate: 60 * 60 * 24}, // Revalidate every 24 hours
      cache: 'force-cache',
    }
  );
  return response.json();
}

export async function hasSaturday(events: CalendarEvent[]): Promise<boolean> {
  for (const event of events) {
    const start = new Date(event.start);
    if (start.getDay() === 6) {
      return true;
    }
  }
  return false;
}
