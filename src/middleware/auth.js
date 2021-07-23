import jwt from 'jsonwebtoken'
import creatError from 'http-errors'

const secretKey = process.env.SCRETKEY
console.log(secretKey)
const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"]
  if(!token) throw creatError(403, "a token is required to authentication")
  try{
    const decoded = jwt.verify(token, secretKey)
    req.user = decoded
  }
  catch(err) {
    throw creatError(401, 'invalid token')
  }
  return next()
}
export default verifyToken