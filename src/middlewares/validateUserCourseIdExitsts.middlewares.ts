import { NextFunction, Request, Response } from "express";
import { ErrorApp } from "../errors/errorApp";
import { CourseResult } from "../interfaces/courses.interfaces";
import { client } from "../database";

const validateCourseUserIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { courseId } =  req.params

  const query: CourseResult = await client.query(
    'SELECT * FROM "courses" WHERE "id" = $1',
    [courseId]
  );

  if (query.rowCount === 0) {
    throw new ErrorApp("User/course not found", 404);
  }

  

  return next();
};

export default validateCourseUserIdExists