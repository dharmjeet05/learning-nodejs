import express from "express";
import { eq } from "drizzle-orm";
import userRouter from "./routes/user.routes.js"
import { userSessions, usersTable } from "./db/schema.js";
import db from "./db/index.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json())
app.use(async function (req, res, next) {
  const sessionId = req.headers['session-id']
  if (!sessionId) {
    return next()
  }

  const [data] = await db
    .select({
      id: usersTable.id,
      sessionId: userSessions.id,
      userId: userSessions.userId,
      name: usersTable.name,
      email: usersTable.email
    })
    .from(userSessions)
    .rightJoin(usersTable, eq(usersTable.id, userSessions.userId))
    .where(eq(userSessions.id, sessionId))

  if (!data) {
    return next();
  }

  req.user = data;
  next()
})

app.get("/", (req, res) => {
  return res.json({ status: 'Okay' })
})

app.use("/user", userRouter)

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))