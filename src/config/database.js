import Database from 'mysql-sync-query'

const dbObj = new Database(process.env.DATABASE)
dbObj.connectLocal(
  process.env.HOST,
  process.env.DBPORT,
  process.env.USER,
  process.env.PASSWORD
)

export default dbObj
