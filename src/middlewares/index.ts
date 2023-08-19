import validateAdmin from "./validateAdmin.middlewares";
import validateBody from "./validateBody.middlewares";
import validateIdExists from "./validateIdExists.middlewares";
import validateEmailExists from "./validateEmailExists.middlewares";
import validateToken from "./validateToken.middlewares";
import validateUserPermission from "./validateUserPermission.middleware";
import validateCourseIdExists from "./validateCourseExists.middlewares";
import validateIdBodyExists from "./validateIdBody.middlewares";
import validateCourseUserIdExists from "./validateUserCourseIdExitsts.middlewares"

export default {
  validateAdmin,
  validateBody,
  validateCourseIdExists,
  validateEmailExists,
  validateIdBodyExists,
  validateToken,
  validateIdExists,
  validateUserPermission,
  validateCourseUserIdExists,
};
