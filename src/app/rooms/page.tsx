import {
  CalendarEvent,
  CourseEvent,
  getSubjects,
  JSONEvents,
} from '@/components/courseUtil';
import {SubjectData, SubjectJson} from '@/app/course-selector/CourseTypes';
import {ReactElement} from 'react';
import {Paper, Typography} from '@mui/material';
import {isoToReadable} from '@/helpers';
import {Calendar} from '@/components/Calendar';

export default async function Rooms() {
  const data = await getSubjects();

  const allClasses: SubjectData[] = [];

  for (const value of Object.values(data)) {
    for (const [subCategoryKey, subCategory] of Object.entries(value)) {
      if (subCategoryKey === 'size') continue;
      const classes = subCategory as SubjectJson;
      allClasses.push(...classes);
    }
  }

  const allEvents: CourseEvent[] = [];

  for (const cls of allClasses) {
    const data = await fetch(
      `https://api.dhbw.app/rapla/lectures/${cls.name}/events`,
      {
        next: {revalidate: 3600},
      }
    );
    const json: JSONEvents = await data.json();

    allEvents.push(...Object.values(json));
  }
  const rooms: Record<string, CourseEvent[]> = {};
  for (const event of allEvents) {
    for (const room of event.rooms) {
      const roomName = room.match(/^[ABCDE]?\d{3}\.?\d?[ABCDE]?/g);
      if (roomName) {
        if (!rooms[roomName[0]]) {
          rooms[roomName[0]] = [];
        }
        rooms[roomName[0]].push(event);
      }
    }
  }
  const items: ReactElement[] = [];
  const calendarEvents: CalendarEvent[] = [];

  for (const [room, events] of Object.entries(rooms)) {
    const sortedEvents = events.sort((a, b) =>
      Date.parse(a.startTime) < Date.parse(b.startTime) ? -1 : 1
    );
    for (const evt of sortedEvents) {
      calendarEvents.push({
        id: evt.id,
        start: isoToReadable(evt.startTime),
        end: isoToReadable(evt.endTime),
        location: evt.rooms.join(', '),
        title: evt.name,
        calendarId: evt.course,
      });
    }
    items.push(
      <Paper sx={{p: 3}}>
        <Typography variant="h2">{room}</Typography>
        <ul>
          {sortedEvents.map(evt => (
            <li key={evt.id}>
              <Typography variant="h3">{evt.name}</Typography>
              <br />
              <Typography variant="h5">{evt.course}</Typography>
              <br />
              From: {isoToReadable(evt.startTime)}
              <br />
              To: {isoToReadable(evt.endTime)}
            </li>
          ))}
        </ul>{' '}
      </Paper>
    );
  }
  return (
    <>
      {items}

      <Calendar events={calendarEvents} hasSaturday />
    </>
  );
}
