'use client';

import {ReactElement, useContext, useEffect, useState} from 'react';
import {
  CourseListContext,
  CourseListDispatchContext,
} from '@/components/CourseListController';
import {Checkbox, ListItem, ListItemButton, Typography} from '@mui/material';
import {Defaults} from '@/appDefaults';

export default function CalendarLegend({courses}: {courses?: string[]}) {
  const activeCourses = useContext(CourseListContext);
  const dispatch = useContext(CourseListDispatchContext);
  const [calendarLegend, setCalendarLegend] = useState<ReactElement[]>();

  useEffect(() => {
    if (!courses) {
      return;
    }

    const calendarLegendTemp: ReactElement[] = [];
    let courseIndex = 0;

    const handleCourseClick = (course: string) => () => {
      if (activeCourses.includes(course)) {
        if (dispatch) {
          dispatch({type: 'remove', course});
        }
      } else {
        if (dispatch) {
          dispatch({type: 'add', course});
        }
      }
    };

    for (const course of courses) {
      calendarLegendTemp.push(
        <ListItem key={course}>
          <ListItemButton onClick={handleCourseClick(course)}>
            <Checkbox
              edge="start"
              tabIndex={-1}
              checked={activeCourses.includes(course)}
              disableRipple
              inputProps={{'aria-labelledby': course}}
            />
            <Typography
              key={course}
              style={{
                color:
                  Defaults.mainColor[courseIndex % Defaults.mainColor.length],
              }}
            >
              {course.replace(/MA-/g, '')}
            </Typography>
          </ListItemButton>
        </ListItem>
      );
      courseIndex++;
    }

    setCalendarLegend(calendarLegendTemp);
  }, [activeCourses, courses, dispatch]);

  return <>{calendarLegend}</>;
}
