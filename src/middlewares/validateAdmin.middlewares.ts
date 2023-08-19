import { NextFunction, Request, Response } from "express";
import { ErrorApp } from "../errors/errorApp";

const validateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { admin } = res.locals.decoded;
  if (!admin) throw new ErrorApp("Insufficient permission", 403);

  return next();
};

export default validateAdmin;