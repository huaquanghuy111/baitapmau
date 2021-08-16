import jwt from 'jsonwebtoken'

const createToken = (secret) => {
  const token = jwt.sign({ data: null }, secret, {
    expiresIn: '2h',
    algorithm: 'HS256',
  })
  return token
}

export default createToken
