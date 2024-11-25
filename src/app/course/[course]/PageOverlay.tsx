'use client';
import {Fab, Typography} from '@mui/material';
import {Delete as DeleteIcon, Add as AddIcon} from '@mui/icons-material';
import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import {setNextCookie} from '@/cookieManager';

export default function PageOverlay({course}: {course: string}) {
  const [cookies, setCookie] = useCookies<'courses', {courses: string[]}>([
    'courses',
  ]);
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    setIsSaved(cookies.courses?.includes(course));
    if (!cookies.courses) {
      setCookie('courses', []);
    }
  }, [cookies.courses, course, setCookie]);

  async function handleAddEvent() {
    const courses = cookies.courses;
    if (!isSaved) {
      courses.push(course);
    }
    setCookie('courses', courses);
  }

  async function handleRemoveEvent() {
    const newCourses = cookies.courses.filter(c => c !== course);
    setCookie('courses', newCourses);
  }

  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        aria-label={isSaved ? 'remove' : 'add'}
        sx={{position: 'fixed', bottom: 16, right: 16}}
        onClick={isSaved ? handleRemoveEvent : handleAddEvent}
      >
        {isSaved ? (
          <>
            <DeleteIcon />
            <Typography sx={{mr: 1}}>Remove Course</Typography>
          </>
        ) : (
          <>
            <AddIcon />
            <Typography sx={{mr: 1}}>Add Course</Typography>
          </>
        )}
      </Fab>
    </>
  );
}
