'use server';
import {cookies} from 'next/headers';

export async function setNextCookie<T>(name: string, data: T) {
  const cookieStore = await cookies();

  cookieStore.set(name, JSON.stringify(data), {
    secure: true,
    sameSite: 'strict',
  });
}

export async function readNextCookie<T>(name: string): Promise<T | undefined> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);

  if (cookie) {
    return JSON.parse(cookie.value);
  }

  return undefined;
}
