import jwt from 'jsonwebtoken'

const secretKey = process.env.SCRETKEY
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).send('a token is required')
  try {
    jwt.verify(token, secretKey)
  } catch (err) {
    return res.status(401).send('invalid token')
  }
  return next()
}
export default verifyToken
