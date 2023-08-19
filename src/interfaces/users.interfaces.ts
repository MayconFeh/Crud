import { z } from "zod";
import {
  userSchema,
  createUserSchema,
  reatriveUserSchema,
  returnUserSchema,
} from "../schemas/users.schemas";
import { QueryResult } from "pg";

type User = z.infer<typeof userSchema>;

type UserCreate = z.infer<typeof createUserSchema>;
type UserReatrieve = z.infer<typeof reatriveUserSchema>

type UserReturn = z.infer<typeof returnUserSchema>
type UserResult = QueryResult<User>;

export { User, UserCreate, UserReatrieve, UserResult,UserReturn };
