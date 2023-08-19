import { NextFunction, Request, Response } from "express";
import { ErrorApp } from "../errors/errorApp";
import { verify } from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction): void => {
  let authorization = req.headers.authorization;

  if (!authorization) throw new ErrorApp("Missing bearer token", 401);

  const token = authorization.split(" ")[1];
  const decoded = verify(token, process.env.SECRET_KEY!);

  res.locals = { ...res.locals, decoded };

  return next();
};

export default validateToken;