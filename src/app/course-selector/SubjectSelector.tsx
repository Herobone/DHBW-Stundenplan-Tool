'use client';
import {MenuItem, Select, SelectChangeEvent} from '@mui/material';
import React, {ReactElement, useEffect} from 'react';
import {Faculty, FacultySubjects} from '@/app/course-selector/CourseTypes';
import {useParams, useRouter} from 'next/navigation';

interface FacultySelectorProps {
  subjects?: FacultySubjects;
  faculty?: Faculty;
}

export default function SubjectSelector({
  subjects,
  faculty,
}: FacultySelectorProps) {
  const params = useParams<{course?: string[]}>();
  const [subject, setSubject] = React.useState('');
  const router = useRouter();

  useEffect(() => {
    const subjectFromRoute = params.course?.[1];
    if (subject.length === 0 && subjectFromRoute) {
      setSubject(subjectFromRoute);
    }
  }, [params.course, subject]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSubject(event.target.value);
    router.push(`/course-selector/${faculty}/${event.target.value}`);
  };

  const items: ReactElement[] = [];
  if (faculty && subjects) {
    subjects[faculty].forEach(subject => {
      items.push(
        <MenuItem key={subject.tag} value={subject.tag}>
          {subject.de}
        </MenuItem>
      );
    });
  }

  return (
    <Select
      label="Studiengang"
      value={subject}
      onChange={handleChange}
      variant="outlined"
      disabled={!subjects}
    >
      {items}
    </Select>
  );
}
