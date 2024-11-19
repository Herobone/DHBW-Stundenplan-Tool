export interface Subject {
  tag: string;
  de: string;
  en: string;
  faculty: Faculty;
  category: string;
}

// eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
export enum Faculty {
  Technik = 'Technik',
  Wirtschaft = 'Wirtschaft',
  Gesundheit = 'Gesundheit',
}
export type FacultySubjects = {[faculty in Faculty]: Subject[]};
export type SubjectJson = SubjectData[];
export type SubjectData = {
  name: string;
  faculty: string;
  degreeName: string;
};
