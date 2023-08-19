import { Router } from "express";
import middlewares from "../middlewares";
import { userControllers } from "../controllers";
import { createUserSchema } from "../schemas/users.schemas";

const userRouter:Router= Router()

userRouter.use("/:userId", middlewares.validateToken,middlewares.validateUserPermission, middlewares.validateCourseIdExists )

userRouter.post("", middlewares.validateBody(createUserSchema),middlewares.validateEmailExists,userControllers.create )
userRouter.get("", middlewares.validateToken, userControllers.reatrive)
userRouter.get("/:userId/courses",userControllers.reatriveCourse )

export default userRouter