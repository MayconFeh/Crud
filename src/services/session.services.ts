import format from "pg-format";
import { ReqLogin, ResLogin } from "../interfaces/login.interfaces";
import { client } from "../database";
import { User, UserResult } from "../interfaces/users.interfaces";
import { ErrorApp } from "../errors/errorApp";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

const create = async (payload: ReqLogin): Promise<ResLogin> => {
  const query: UserResult = await client.query(
    'SELECT * FROM "users" WHERE "email" = $1;',
    [payload.email]
  );

  if (!query.rowCount) {
    throw new ErrorApp("Wrong email/password", 401);
  }

  const user: User = query.rows[0];

  const password: boolean = await compare(payload.password, user.password);

  if (!password) {
    throw new ErrorApp("Wrong email/password", 401);
  }

  const token: string = sign(
    { email: user.email, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token };
};

export default { create };
