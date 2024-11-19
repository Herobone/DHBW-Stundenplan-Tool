'use server';

import Grid from '@mui/material/Grid2';
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  Paper,
  Typography,
} from '@mui/material';
import FacultySelector from '@/app/course-selector/FacultySelector';
import React, {cache} from 'react';
import {
  Faculty,
  FacultySubjects,
  Subject,
  SubjectData,
  SubjectJson,
} from '../CourseTypes';
import SubjectSelector from '../SubjectSelector';
import YearSelector from '@/app/course-selector/YearSelector';
import Link from 'next/link';
import {ExtendedDataFormat, getSubjects} from '@/components/courseUtil';

const cachedProcessSubjects = cache(processSubjects);
const cachedGetYears = cache(getYears);
const cachedGetClasses = cache(getClasses);

function processSubjects(data: ExtendedDataFormat, faculty: Faculty) {
  const subjects: Subject[] = [];
  for (const value of Object.values(data)) {
    for (const [subCategoryKey, subCategory] of Object.entries(value)) {
      if (subCategoryKey === 'size') continue;
      const classes = subCategory as SubjectJson;
      if (classes[0].faculty !== faculty) continue;

      subjects.push({
        tag: classes[0].name.replace(/MA-/g, '').replace(/\d{2}.*/g, ''),
        de: classes[0].degreeName,
        en: classes[0].degreeName,
        faculty: classes[0].faculty as Faculty,
        category: classes[0].faculty,
      });
    }
  }

  const technik = subjects.filter(
    subject => subject.faculty === Faculty.Technik
  );
  const economy = subjects.filter(
    subject => subject.faculty === Faculty.Wirtschaft
  );
  const health = subjects.filter(
    subject => subject.faculty === Faculty.Gesundheit
  );
  return {Gesundheit: health, Technik: technik, Wirtschaft: economy};
}

function getYears(data: ExtendedDataFormat, faculty: Faculty, subject: string) {
  const years: number[] = [];
  for (const value of Object.values(data)) {
    for (const [subCategoryKey, subCategory] of Object.entries(value)) {
      if (subCategoryKey === 'size') continue;
      const classes = subCategory as SubjectJson;
      if (classes[0].faculty !== faculty) continue;

      classes.forEach(cls => {
        if (cls.name.replace(/MA-/g, '').replace(/\d{2}.*/g, '') !== subject)
          return;
        const yearString = cls.name.match(/\d{2}/g);
        if (!yearString) return;
        const year = Number.parseInt(yearString[0]);
        if (!years.includes(year)) {
          years.push(year);
        }
      });
    }
  }
  return years.sort();
}

function getClasses(
  data: ExtendedDataFormat,
  faculty: Faculty,
  subject: string,
  year: string
) {
  const classes: SubjectData[] = [];
  for (const value of Object.values(data)) {
    for (const [subCategoryKey, subCategory] of Object.entries(value)) {
      if (subCategoryKey === 'size') continue;
      const subCategories = subCategory as SubjectJson;
      if (subCategories[0].faculty !== faculty) continue;

      subCategories.forEach(cls => {
        const yearString = cls.name.match(/\d{2}/g);
        if (!yearString) return;
        const yearComp = yearString[0];
        if (
          cls.name.replace(/MA-/g, '').replace(/\d{2}.*/g, '') === subject &&
          yearComp === year
        ) {
          classes.push(cls);
        }
      });
    }
  }
  return classes;
}

export default async function CourseSelector({
  params,
}: {
  params: Promise<{course?: string[]}>;
}) {
  const waitedParams = await params;
  const faculty: Faculty | undefined = waitedParams.course?.[0] as Faculty;
  const subject: string | undefined = waitedParams.course?.[1];
  const year: string | undefined = waitedParams.course?.[2];

  let years: number[] = [];
  let subjects: FacultySubjects | undefined;
  let classes: SubjectData[] = [];

  if (faculty) {
    const data = await getSubjects();
    subjects = cachedProcessSubjects(data, faculty);
    if (subject) {
      years = cachedGetYears(data, faculty, subject);
      if (year) {
        classes = cachedGetClasses(data, faculty, subject, year);
      }
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid size={{xs: 0, sm: 3}} />
      <Grid size={{xs: 12, sm: 6}}>
        <Paper sx={{p: 2}}>
          <Typography variant="h3" gutterBottom>
            Wähle deinen Studiengang
          </Typography>
          <br />
          <FormControl fullWidth>
            <InputLabel>Fakultät</InputLabel>
            <FacultySelector />
          </FormControl>
          <br />
          <Divider />
          <FormControl fullWidth>
            <InputLabel>Studiengang</InputLabel>
            <SubjectSelector subjects={subjects} faculty={faculty} />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Jahrgang</InputLabel>
            <YearSelector faculty={faculty} years={years} />
          </FormControl>
        </Paper>
      </Grid>
      <Grid size={{xs: 0, sm: 3}} />
      {classes.length > 0 ? (
        <>
          <Grid size={{xs: 0, sm: 2}} />
          <Grid size={{xs: 12, sm: 8}}>
            <Paper sx={{p: 2}}>
              {classes.map(cls => (
                <Button
                  key={cls.name}
                  component={Link}
                  href={`/course/${cls.name}`}
                >
                  {cls.name.replace(/MA-/g, '')}
                </Button>
              ))}
            </Paper>
          </Grid>
          <Grid size={{xs: 0, sm: 2}} />
        </>
      ) : null}
    </Grid>
  );
}
