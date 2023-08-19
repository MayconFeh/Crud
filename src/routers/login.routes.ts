import { Router } from "express";
import middlewares from "../middlewares";
import { reqLoginSchema } from "../schemas/login.schemas";
import { sessionControllers } from "../controllers";

const sessionRouter: Router = Router();

sessionRouter.post("", middlewares.validateBody(reqLoginSchema), sessionControllers.create)

export default sessionRouter