import { NextFunction, Request, Response } from "express";
import { ErrorApp } from "../errors/errorApp";

const validateUserPermission = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { userId } = req.params;
  const { sub, admin } = res.locals.decoded;

  if (admin) return next();

  if (userId !== sub) {
    throw new ErrorApp("Insufficient permission", 403);
  }

  return next();
};

export default validateUserPermission