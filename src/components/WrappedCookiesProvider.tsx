'use client';
import {CookiesProvider} from 'react-cookie';
import {CookieSetOptions} from 'universal-cookie';

export default function WrappedCookiesProvider({
  children,
  defaultSetOptions,
}: {
  children: React.ReactNode;
  defaultSetOptions: CookieSetOptions;
}) {
  return (
    <CookiesProvider defaultSetOptions={defaultSetOptions}>
      {children}
    </CookiesProvider>
  );
}
