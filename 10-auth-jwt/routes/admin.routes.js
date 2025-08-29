import express from "express";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { ensureAuthenticated, restrictToRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

const adminRestrictmiddleware = restrictToRole('ADMIN');

router.use(ensureAuthenticated)
router.use(adminRestrictmiddleware)

router.get("/users", async (req, res) => {
  const users = await db.select({ id: usersTable.id, name: usersTable.name, email: usersTable.email }).from(usersTable)

  res.json({
    status: true,
    data: users,
    message: "Here is your users!"
  })
})

export default router;