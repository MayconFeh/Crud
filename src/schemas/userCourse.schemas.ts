import { z } from "zod";

const userCoursesSchema = z.object({
  id:z.number().positive(),
  active:z.boolean(),
  userId:z.number(),
  courseId:z.number()
})

const userAddToCourseSchema = userCoursesSchema.omit({id:true})