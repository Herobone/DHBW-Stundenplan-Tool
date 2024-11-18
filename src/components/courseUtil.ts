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

export interface CalenderEvent {
  id: number;
  start: string;
  end: string;
  title?: string;
  people?: string[];
  location?: string;
  description?: string;
  calendarId?: string;
}

function fix(num: number): string {
  return num.toString().padStart(2, '0');
}

type JSONEvents = {[key: string]: CourseEvent};

export async function getEvents(course: string) {
  const data = await fetch(
    `https://api.dhbw.app/rapla/lectures/${course}/events`
  );
  const json: JSONEvents = await data.json();

  const calendarEvents: CalenderEvent[] = [];
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

export function hasSaturday(events: CalenderEvent[]): boolean {
  for (const event of events) {
    const start = new Date(event.start);
    if (start.getDay() === 6) {
      return true;
    }
  }
  return false;
}
