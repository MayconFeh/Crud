import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  admin: z.boolean(),
});

const createUserSchema = userSchema.omit({ id: true });
const returnUserSchema = userSchema.omit({ password: true });
const reatriveUserSchema = returnUserSchema.array();

export { userSchema, createUserSchema, returnUserSchema, reatriveUserSchema };
