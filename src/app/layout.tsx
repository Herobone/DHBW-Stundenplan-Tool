import type {Metadata} from 'next';
import localFont from 'next/font/local';
import React from 'react';
import AppHeader from '@/app/AppHeader';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import {
  Box,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  Toolbar,
} from '@mui/material';
import theme from '@/theme';
import {Roboto} from 'next/font/google';
import {Defaults} from '@/appDefaults';
import {CookiesProvider} from 'react-cookie';
import WrappedCookiesProvider from '@/components/WrappedCookiesProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'DHBW Stundenplan',
  description: 'Show your DHBW schedule',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
      >
        <AppRouterCacheProvider options={{enableCssLayer: true}}>
          <StyledEngineProvider>
            <ThemeProvider theme={theme}>
              <WrappedCookiesProvider
                defaultSetOptions={{secure: true, sameSite: 'lax', path: '/'}}
              >
                <Box sx={{display: 'flex'}}>
                  <CssBaseline />
                  <AppHeader />
                  <Box
                    component="main"
                    sx={{
                      flexGrow: 1,
                      p: 3,
                      width: {sm: `calc(100% - ${Defaults.drawerWidth}px)`},
                    }}
                  >
                    <Toolbar />
                    {children}
                  </Box>
                </Box>
              </WrappedCookiesProvider>
            </ThemeProvider>
          </StyledEngineProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
