import Validator from 'validatorjs'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dbObj from '../config/database'
import rules from '../validatorrules'
import createToken from '../createToken'

const secretKey = process.env.SCRETKEY
const usersController = {
  home(req, res) {
    return res.send('<a href="/auth/google"> sign in with google account </a> </br> <a href="/auth/facebook"> sign in with facebook account </a>')
  },
  async index(req, res) {
    const rows = await dbObj.executeQuery('SELECT * FROM userinfor')
    return res.json(rows)
  },

  async show(req, res) {
    const {id} = req.params

    const rows = await dbObj.executeQuery(
      `SELECT * FROM userinfor WHERE id = "${id}"`
    )
    return res.json(rows)
  },

  async store(req, res) {
    const { id, name, age, password } = req.body
    const validation = new Validator(req.body, rules.UserValidate)
    if (validation.fails()) {
      const errormessagge = JSON.stringify(validation.errors.all())
      throw createError(400, `${errormessagge}`)
    }
    await dbObj.executeQuery(
      `INSERT INTO userinfor(id, name, age, password) VALUES ("${id}", "${name}", ${age}, "${password}")`
    )
    return res.send('add user succesfully')
  },

  async delete(req, res) {
    const {id} = req.params
    await dbObj.executeQuery(`DELETE FROM userinfor WHERE id = "${id}"`)
    res.send('remove user successfully')
  },

  async update(req, res) {
    const oldID = req.params.id
    const { name, age } = req.body
    const validation = new Validator(req.body, rules.UpdateValidate)
    if (validation.fails()) {
      const errormessagge = JSON.stringify(validation.errors.all())
      throw createError(400, `${errormessagge}`)
    }
    await dbObj.executeQuery(
      `UPDATE userinfor SET name = "${name}", age = ${age} WHERE id = "${oldID}"`
    )
    return res.send('update data successfully')
  },

  async register(req, res) {
    const { id, name, age, password } = req.body
    const validation = new Validator(req.body, rules.UserValidate)
    if (validation.fails()) {
      const errormessagge = JSON.stringify(validation.errors.all())
      throw createError(400, `${errormessagge}`)
    }

    const oldUser = await dbObj.executeQuery(
      `SELECT * FROM userinfor WHERE name = "${name}"`
    )
    if (oldUser.length !== 0)
      throw createError(409, 'user already exist, please login')

    const encryptPassword = await bcrypt.hash(password, 10)
    await dbObj.executeQuery(
      `INSERT INTO userinfor(id, name, age, password) VALUES ("${id}", "${name}", ${age}, "${encryptPassword}")`
    )
    const result = await dbObj.executeQuery(`SELECT * FROM userinfor WHERE id = "${id}" LIMIT 1`)
    const user = result[0]
    //create token
    const token = jwt.sign({ data: null }, secretKey, {
      algorithm: 'HS256',
      expiresIn: '2h',
    })
    user.token = token
    return res.status(201).json(
      {
        name: user.name,
        token: user.token
      }
    )
  },

  async signIn(req, res) {
    const { name, password } = req.body
    const validation = new Validator(req.body, rules.loginValidate)
    if (validation.fails()) {
      const errormessagge = JSON.stringify(validation.errors.all())
      throw createError(400, `${errormessagge}`)
    }
    const result = await dbObj.executeQuery(
      `SELECT * FROM userinfor WHERE name = "${name}" LIMIT 1 `
    )
    const user = result[0] || null 
    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {
      const token = jwt.sign({ data: null }, secretKey, {
        algorithm: 'HS256',
        expiresIn: '2h',
      })
      user.token = token
      return res.status(200).json(
        {
          name: user.name,
          token: user.token
        }
      )
    }
    return res.status(400).send('Invalid password')
  },

  //return token when login with facebook, google
  async authenticate(req, res ) {
    console.log(req.user)
    const result = await dbObj.executeQuery(`SELECT * FROM userinfor WHERE name = "${req.user.displayName}" LIMIT 1`)
    const user = result[0]
    if(user){
      return res.json(
        {
          token : createToken(process.env.SCRETKEY)
        }
      )
    }
    return res.status(401).send('user is not exist, please register')
  }
}

export default usersController
