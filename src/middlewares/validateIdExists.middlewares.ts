import { Request,Response,NextFunction } from "express";
import { client } from "../database";
import { ErrorApp } from "../errors/errorApp";
import { UserResult } from "../interfaces/users.interfaces";

const validateIdExists =async (req:Request,res:Response, next:NextFunction):Promise<void> => {
  
  const { userId } =req.params

  const query:UserResult = await client.query(
    'SELECT * FROM "users" WHERE "id" = $1',[userId]
  )

  if(query.rowCount) {
    throw new ErrorApp("User not found", 404)
  }

  res.locals = { ...res.locals, foundUser: query.rows[0] }

  return next()
}

export default validateIdExists