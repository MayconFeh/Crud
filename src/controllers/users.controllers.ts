import { Request, Response } from "express";
import { UserReturn, UserReatrieve } from "../interfaces/users.interfaces";
import { userSevices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await userSevices.create(req.body);
  return res.status(201).json(user);
};

const reatrive = async (req: Request, res: Response): Promise<Response> => {
  const { admin } = res.locals.decoded;

  const users: UserReatrieve = await userSevices.retrieve(admin);

  return res.status(200).json(users);
};

const reatriveCourse = async (req: Request, res: Response): Promise<Response> => {
  const reatriveCourse = await userSevices.reatriveCourseUser(req.params.id);

  return res.status(200).json(reatriveCourse);
};

export default { create, reatrive, reatriveCourse };
