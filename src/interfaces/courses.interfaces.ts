import { z } from "zod";
import {
  courseSchema,
  createCourseSchema,
  reatriveCourseSchema,
} from "../schemas/course.schemas";
import { QueryResult } from "pg";

type Course = z.infer<typeof courseSchema>;
type CourseCreate = z.infer<typeof createCourseSchema>;
type CourseReatrieve = z.infer<typeof reatriveCourseSchema>;

type CourseResult = QueryResult<Course>;

export { Course, CourseCreate, CourseReatrieve, CourseResult };
