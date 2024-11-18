'use client';
import {MenuItem, Select, SelectChangeEvent} from '@mui/material';
import React, {ReactElement, useEffect} from 'react';
import {Faculty} from '@/app/course-selector/CourseTypes';
import {useParams, useRouter} from 'next/navigation';

export default function FacultySelector() {
  const params = useParams<{course?: string[]}>();
  const [faculty, setFaculty] = React.useState('');

  const router = useRouter();

  useEffect(() => {
    const facultyFromRoute = params.course?.[0] as Faculty;
    if (facultyFromRoute) {
      setFaculty(facultyFromRoute);
    }
  }, [params.course]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setFaculty(event.target.value);
    router.push(`/course-selector/${event.target.value}`);
  };

  const items: ReactElement[] = [];
  for (const facultyName in Faculty) {
    items.push(
      <MenuItem key={facultyName} value={facultyName}>
        {facultyName}
      </MenuItem>
    );
  }

  return (
    <Select
      label="Studiengang"
      value={faculty}
      onChange={handleChange}
      variant="outlined"
    >
      {items}
    </Select>
  );
}
