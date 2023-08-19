import { Router } from "express";
import { courseControllers } from "../controllers";
import middlewares from "../middlewares";
import { createCourseSchema } from "../schemas/course.schemas";

const courseRouter :Router = Router()

courseRouter.post("" ,middlewares.validateToken,middlewares.validateUserPermission, middlewares.validateBody(createCourseSchema),courseControllers.create )
courseRouter.post("/:courseId/users/:userId",middlewares.validateToken,middlewares.validateUserPermission,middlewares.validateCourseUserIdExists,middlewares.validateCourseIdExists, courseControllers.addToCourse )
courseRouter.get("", courseControllers.reatriveAllCourses)
courseRouter.get("/courses/:courseId/users" , middlewares.validateToken,middlewares.validateUserPermission,middlewares.validateCourseIdExists,courseControllers.reatriveAllUserEnrolledCourse)
courseRouter.delete("/:courseId/users/:userId",middlewares.validateToken,middlewares.validateUserPermission,middlewares.validateCourseUserIdExists, courseControllers.destroy)

export default courseRouter