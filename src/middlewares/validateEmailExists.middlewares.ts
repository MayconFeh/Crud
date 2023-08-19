import { NextFunction, Request, Response } from "express";
import { UserResult } from "../interfaces/users.interfaces";
import { client } from "../database";
import { ErrorApp } from "../errors/errorApp"; 

const validateEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  if (!email) return next();

  const query: UserResult = await client.query(
    'SELECT * FROM "users" WHERE "email" = $1',
    [email]
  );

  if (query.rowCount !== 0) {
    throw new ErrorApp ("Email already registered", 409);
  }

  return next();
};

export default validateEmailExists;