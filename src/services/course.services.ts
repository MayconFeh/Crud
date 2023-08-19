import format from "pg-format";
import {
  Course,
  CourseCreate,
  CourseReatrieve,
  CourseResult,
} from "../interfaces/courses.interfaces";
import { client } from "../database";

const create = async (payload: CourseCreate): Promise<Course> => {
  const query: string = format(
    'INSERT INTO "courses" (%I)VALUES (%L)RETURNING *',
    Object.keys(payload),
    Object.values(payload)
  );

  const result: CourseResult = await client.query(query);

  const course = result.rows[0];

  return course;
};

const addUserToCourse = async (
  idUser: string,
  idCourse: string
): Promise<void> => {
  const query: string = `INSERT INTO "userCourses" ("userId","courseId") VALUES ($1 , $2) RETURNING *`;

  await client.query(query, [idUser, idCourse]);
};

const reatriveAllCourses = async (): Promise<CourseReatrieve> => {

  const query: CourseResult = await client.query('SELECT * FROM "courses";');

  const result = query.rows;

  return result;
};

const reatriveAllUserEnrolledCourse = async (idCourse: string) => {
  const query: string = ` 
  SELECT 
  u.id "userId",
  u.name "userName",
  c.id "courseId",
  c."name"  "courseName",
  c.description  "courseDescription",
  uc.active "userActiveInCourse"
  FROM "users" u 
  JOIN "userCourses" uc
  ON u.id = uc."userId" 
  JOIN "courses" c 
  ON c.id = uc."courseId" 
  WHERE c.id = $1;
  AND uc.active  = true; `;

  const result = await client.query(query, [idCourse]);

  return result.rows

};

const destroy = async (idUser: string, idCourse: string) => {
  const query: string =
    'UPDATE "userCourses" SET "active" = false WHERE "courseId" = $1 AND "userId" = $2';

  const result = await client.query(query, [idCourse, idUser]);

  return result;
};

export default {
  create,
  addUserToCourse,
  reatriveAllCourses,
  reatriveAllUserEnrolledCourse,
  destroy,
};
