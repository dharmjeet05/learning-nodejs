require("dotenv/config")
const db = require("./db")
const { usersTable } = require("./drizzle/schema")

async function getAllUsers() {
  const users = await db.select().from(usersTable)
  console.log('users in DB', users)
  return users
}

async function createuser({ id, name, email }) {
  await db.insert(usersTable).values({
    id,
    name,
    email
  })
}

getAllUsers()