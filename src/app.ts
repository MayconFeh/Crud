import "express-async-errors"
import express, { Application, json } from 'express'
import userRouter from "./routers/users.routes"
import { handleError } from "./errors/hadleError"
import sessionRouter from "./routers/login.routes"
import courseRouter from "./routers/course.routes"

const app: Application = express()
app.use(json())

app.use("/users", userRouter)
app.use("/login", sessionRouter)
app.use("/courses", courseRouter)

app.use(handleError)
export default app
