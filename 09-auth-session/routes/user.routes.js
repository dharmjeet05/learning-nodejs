import { Router } from "express";
import { createHmac, randomBytes } from "node:crypto";
import db from "../db/index.js";
import { usersTable, userSessions } from "../db/schema.js"
import { eq } from "drizzle-orm";

const router = Router();

router.patch("/", async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: "you are not logged in!" })
  }

  const { name } = req.body;
  await db.update(usersTable).set({ name }).where(eq(usersTable.id, user.id))

  return res.json({ status: "Success" })
}) // Returns current loggedin user

router.get("/", (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: "you are not logged in!" })
  }

  res.json({
    status: "success", 
    data: user
  })
}) // Returns current loggedin user

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const [existingUser] = await db.select({ email: usersTable.email }).from(usersTable).where(eq(usersTable.email, email))

  if (existingUser) {
    return res.status(400).json({
      error: `User with email ${email} already exist`
    })
  }

  const salt = randomBytes(256).toString('hex')
  const hashedPassword = createHmac('sha256', salt).update(password).digest('hex')

  const [user] = await db.insert(usersTable).values({
    name,
    email,
    password: hashedPassword,
    salt
  }).returning({ id: usersTable.id })

  return res.status(201).json({ status: 'success', data: { userId: user.id } })
}) // Signup

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [existingUser] = await db.select({ id: usersTable.id, email: usersTable.email, salt: usersTable.salt, password: usersTable.password }).from(usersTable).where(eq(usersTable.email, email))

  if (!existingUser) {
    return res.status(404).json({ error: `User with email ${email} does not exists`})
  }

  const salt = existingUser.salt
  const existingHash = existingUser.password

  const newhash = createHmac('sha256', salt).update(password).digest('hex')

  if (newhash !== existingHash) {
    return res.status(400).json({ error: "Incorrect Password!" })
  }

  // Generate a session for user
  const [session] = await db.insert(userSessions).values({
    userId: existingUser.id
  }).returning({ id: userSessions.id })

  return res.json({
    status: "success",
    sessionId: session.id
  })
}) // Login

export default router;