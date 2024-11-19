'use server';

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

type JSONEvents = {[key: string]: CourseEvent};
export type ExtendedDataFormat = {[key: string]: {[subj: string]: unknown}};

function fix(num: number): string {
  return num.toString().padStart(2, '0');
}

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
    const startTime = new Date(Date.parse(event.startTime));
    const endTime = new Date(Date.parse(event.endTime));
    calendarEvents.push({
      id: event.id,
      start: `${startTime.getFullYear()}-${fix(startTime.getMonth() + 1)}-${fix(startTime.getDate())} ${fix(startTime.getHours())}:${fix(startTime.getMinutes())}`,
      end: `${endTime.getFullYear()}-${fix(endTime.getMonth() + 1)}-${fix(endTime.getDate())} ${fix(endTime.getHours())}:${fix(endTime.getMinutes())}`,
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
