'use server';

import {ReactElement} from 'react';

interface Event {
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

type JSONEvents = {[key: string]: Event};

export default async function Course({
  params,
}: {
  params: Promise<{course: string}>;
}) {
  const {course} = await params;
  const data = await fetch(
    `https://api.dhbw.app/rapla/lectures/${course}/events`
  );
  const json: JSONEvents = await data.json();

  const items: ReactElement[] = [];

  for (const event of Object.values(json)) {
    items.push(
      <div key={event.id}>
        <h2>{event.name}</h2>
        <p>{event.lecturer}</p>
        <p>
          {event.startTime} - {event.endTime}
        </p>
        <p>{event.rooms.join(', ')}</p>
      </div>
    );
  }

  return <div>{items}</div>;
}
