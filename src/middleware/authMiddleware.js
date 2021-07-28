import jwt from 'jsonwebtoken'
import createError from 'http-errors'

const secretKey = process.env.SCRETKEY
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) throw createError(401, 'a token is required to authentication')
  try {
    jwt.verify(token, secretKey)
  } catch (err) {
    throw createError(401, 'invalid token')
  }
  return next()
}
export default verifyToken
