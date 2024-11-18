'use client';
import {MenuItem, Select, SelectChangeEvent} from '@mui/material';
import React, {useEffect} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {Faculty} from '@/app/course-selector/CourseTypes';

export default function YearSelector({
  faculty,
  years,
}: {
  faculty: Faculty;
  years: number[];
}) {
  const params = useParams<{course?: string[]}>();
  const [year, setYear] = React.useState('');
  const router = useRouter();

  useEffect(() => {
    const yearFromRoute = params.course?.[2];
    if (year.length === 0 && yearFromRoute) {
      setYear(yearFromRoute);
    }
  }, [params.course, year]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setYear(event.target.value);
    router.push(
      `/course-selector/${faculty}/${params.course?.[1]}/${event.target.value}`
    );
  };

  return (
    <Select
      label="Studiengang"
      value={year}
      onChange={handleChange}
      variant="outlined"
      disabled={years.length === 0}
    >
      {years.map(year => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  );
}
