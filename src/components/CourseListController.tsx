'use client';
import {createContext, Dispatch, useReducer} from 'react';

export const CourseListContext = createContext<string[]>([]);
export const CourseListDispatchContext = createContext<
  Dispatch<CourseListAction> | undefined
>(undefined);

type Action = 'add' | 'remove';
export type CourseListAction = {type: Action; course: string};

function reducer(state: string[], action: CourseListAction) {
  switch (action.type) {
    case 'add':
      return [...state, action.course];
    case 'remove':
      return state.filter(course => course !== action.course);
    default:
      return state;
  }
}

export default function CourseListController({
  children,
  initialCourses,
}: {
  children: React.ReactNode;
  initialCourses?: string[];
}) {
  const [courses, setCourses] = useReducer(reducer, initialCourses ?? []);
  return (
    <CourseListContext.Provider value={courses}>
      <CourseListDispatchContext.Provider value={setCourses}>
        {children}
      </CourseListDispatchContext.Provider>
    </CourseListContext.Provider>
  );
}
