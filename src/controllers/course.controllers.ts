import { Request, Response } from "express";
import { courseServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const course = await courseServices.create(req.body);

  return res.status(201).json(course);
};

const addToCourse = async (req: Request, res: Response): Promise<Response> => {
  const { courseId, userId } = req.params;

  const addToCourse = await courseServices.addUserToCourse(courseId, userId);

  return res.status(201).json("User successfully vinculed to course");
};

const reatriveAllCourses = async (req: Request, res: Response): Promise<Response> => {
  const courses = await courseServices.reatriveAllCourses();

  return res.status(200).json(courses);
};

const reatriveAllUserEnrolledCourse = async (req: Request, res: Response): Promise<Response> => {
  const userEnrolled = await courseServices.reatriveAllUserEnrolledCourse(
    req.params.id
  );

  return res.status(200).json(userEnrolled);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  
  const { courseId,  userId }= req.params
  
  await courseServices.destroy(courseId,userId);
  return res.status(204).json();

}

export default { create, addToCourse, reatriveAllCourses,reatriveAllUserEnrolledCourse,destroy}