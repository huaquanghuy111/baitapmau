import Validator from 'validatorjs'
import creatError from 'http-errors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dbObj from '../connect'
import rules from '../validatorrules'

const secretKey = process.env.SCRETKEY
const usersController = {
  async index(req, res) {
    const rows = await dbObj.executeQuery('SELECT * FROM userinfor')
    return res.json(rows)
  },

  async show(req, res) {
    const name = req.params.id

    const rows = await dbObj.executeQuery(
      `SELECT * FROM userinfor WHERE name = "${name}"`
    )
    return res.json(rows)
  },

  async store(req, res) {
    const { name, age, password } = req.body
    const validation = new Validator(req.body, rules.UserValidate)
    if (validation.fails()) {
      const errormess = JSON.stringify(validation.errors.all())
      throw creatError(400, `${errormess}`)
    }
    await dbObj.executeQuery(
      `INSERT INTO userinfor(name, age, password) VALUES ("${name}", ${age}, "${password}")`
    )
    return res.send('add user succesfully')
  },

  async delete(req, res) {
    const name = req.params.id
    await dbObj.executeQuery(`DELETE FROM userinfor WHERE name = "${name}"`)
    res.send('remove user successfully')
  },

  async update(req, res) {
    const oldname = req.params.id
    console.log(oldname)
    const { name, age } = req.body
    const validation = new Validator(req.body, rules.UserValidate)
    if (validation.fails()) {
      const errormess = JSON.stringify(validation.errors.all())
      throw creatError(400, `${errormess}`)
    }
    await dbObj.executeQuery(
      `UPDATE userinfor SET name = "${name}", age = ${age} WHERE name = "${oldname}"`
    )
    return res.send('update data successfully')
  },

  async register(req, res) {
    const { name, age, password } = req.body
    const validation = new Validator(req.body, rules.UserValidate)
    if (validation.fails()) {
      const errormess = JSON.stringify(validation.errors.all())
      throw creatError(400, `${errormess}`)
    }

    const oldUser = await dbObj.executeQuery(
      `SELECT * FROM userinfor WHERE name = "${name}"`
    )
    if (oldUser.length !== 0)
      throw creatError(409, 'user already exist, please login')

    const encryptPassword = await bcrypt.hash(password, 10)
    await dbObj.executeQuery(
      `INSERT INTO userinfor(name, age, password) VALUES ("${name}", ${age}, "${encryptPassword}")`
    )
    const result = await dbObj.executeQuery(`SELECT * FROM userinfor WHERE name = "${name}"`)
    const user = result.find(element => true)
    //create token
    const token = jwt.sign({ data: user }, secretKey, {
      algorithm: 'HS256',
      expiresIn: '2h',
    })
    user.token = token
    return res.status(201).json(user)
  },

  async sign_in(req, res) {
    const { name, password } = req.body
    const validation = new Validator(req.body, rules.loginValidate)
    if (validation.fails()) {
      const errormess = JSON.stringify(validation.errors.all())
      throw creatError(400, `${errormess}`)
    }
    const result = await dbObj.executeQuery(
      `SELECT * FROM userinfor WHERE name = "${name}"`
    )
    const user = result.find(element => true)
    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {
      const token = jwt.sign({ data: user }, secretKey, {
        algorithm: 'HS256',
        expiresIn: '2h',
      })
      user.token = token
      return res.status(200).json(user)
    }
    return res.status(400).send('Invalid password')
  },
}

export default usersController
