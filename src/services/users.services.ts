import format from "pg-format";
import {
  UserCreate,
  UserResult,
  UserReatrieve,
  UserReturn,
} from "../interfaces/users.interfaces";
import { client } from "../database";
import { hashSync } from "bcryptjs";
import { reatriveUserSchema, returnUserSchema } from "../schemas/users.schemas";
import { ErrorApp } from "../errors/errorApp";

const create = async (payload: UserCreate): Promise<UserReturn> => {
  payload.password = hashSync(payload.password, 10);

  const query: string = format(
    'INSERT INTO "users"(%I) VALUES (%L) RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const result: UserResult = await client.query(query);

  const userNew = result.rows[0];

  return returnUserSchema.parse(userNew);
};

const retrieve = async (admin: boolean): Promise<UserReatrieve> => {
  if (!admin) {
    throw new ErrorApp("Insufficient permission", 403);
  }

  const query: UserResult = await client.query('SELECT * FROM "users";');

  const result = query.rows;

  const UserReturn = reatriveUserSchema.parse(result);

  return UserReturn;
};

const reatriveCourseUser = async (userId: string) => {
  const query: string = 
  `c.id "courseId",
  c."name"  "courseName",
  c.description  "courseDescription",
  uc.active "userActiveInCourse"
  u.id "userId",
  c.name "userName",
  FROM "users" u 
  JOIN "userCourses" uc
  ON u.id = uc."userId" 
  JOIN "courses" c 
  ON c.id = uc."courseId" 
  WHERE u.id = $1;`;

  const result = await client.query(query, [userId]);

  if(!result.rowCount) {
    throw new ErrorApp("No course found", 404)
  }
};
export default { create, retrieve , reatriveCourseUser };
