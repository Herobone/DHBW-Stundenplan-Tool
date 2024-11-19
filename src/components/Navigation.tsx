'use client';
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  Search as SearchIcon,
  SvgIconComponent,
} from '@mui/icons-material';
import React from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Defaults} from '@/appDefaults';
import Cookies from 'universal-cookie';

interface IPage {
  name: string;
  path: string;
  icon: SvgIconComponent;
}

const pages: IPage[] = [
  {
    name: 'Home',
    path: '/',
    icon: HomeIcon,
  },
  {
    name: 'About',
    path: '/about',
    icon: InfoIcon,
  },
  {
    name: 'Find Course',
    path: '/course-selector',
    icon: SearchIcon,
  },
];

export default function Navigation({isMobile = false}: {isMobile?: boolean}) {
  const pathname = usePathname();

  const cookies = new Cookies();

  const courses = cookies.get<string[]>('courses');

  return (
    <Box sx={{width: Defaults.drawerWidth - 1}}>
      {!isMobile ? <Toolbar /> : null}
      <List>
        {pages.map((page, index) => (
          <ListItemButton
            key={index}
            component={Link}
            href={page.path}
            selected={pathname === page.path}
          >
            <ListItemIcon>
              <page.icon />
            </ListItemIcon>

            <ListItemText primary={page.name} />
          </ListItemButton>
        ))}
        <Divider sx={{pt: 2, pb: 2}} />
        <br />
        {courses &&
          courses.map((course, index) => (
            <ListItemButton
              key={index}
              component={Link}
              href={`/course/${course}`}
              selected={pathname === `/course/${course}`}
            >
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary={course} />
            </ListItemButton>
          ))}
      </List>
    </Box>
  );
}
