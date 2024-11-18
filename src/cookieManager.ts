'use server';
import {cookies} from 'next/headers';

export async function setCookie<T>(name: string, data: T) {
  const cookieStore = await cookies();

  cookieStore.set(name, JSON.stringify(data), {
    secure: true,
    sameSite: 'strict',
  });
}

export async function readCookie<T>(name: string): Promise<T | undefined> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);

  if (cookie) {
    return JSON.parse(cookie.value);
  }

  return undefined;
}
