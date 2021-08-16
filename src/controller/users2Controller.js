import { Op } from 'sequelize'
import Validator from 'validatorjs'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import db from '../models'

const sequelize = db.sequelize
const User = db.users
const Project = db.projects
const secretKey = process.env.SCRETKEY

const User2Controller = {
  async index(req, res) {
    const rows = await User.findAll({
      attributes: ['id', 'email', 'name', 'password'],
    })
    return res.json(rows)
  },

  async show(req, res) {
    const validation = new Validator(req.params, {
      id: ['required', 'integer'],
    })
    if (validation.fails()) {
      return res.status(400).send(validation.errors.all())
    }
    const { id } = req.params
    console.log(User)
    console.log(Project)
    const rows = await User.findOne({
      attributes: ['email', 'name'],
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    })
    return res.json(rows)
  },

  async update(req, res) {
    const validation = new Validator(req.params, { id: 'required' })
    if (validation.fails()) {
      return res.status(400).send(validation.errors.all())
    }
    const { id } = req.params
    const validation2 = new Validator(req.body, {
      email: 'required',
      name: 'required',
      password: 'required',
    })
    if (validation2.fails()) {
      return res.status(400).send(validation2.errors.all())
    }
    const { email, name, password } = req.body
    await User.update(
      {
        email: email,
        name: name,
        password: password,
      },
      {
        where: {
          id: id,
        },
      }
    )
    const rows = await User.findOne({
      attributes: ['email', 'name'],
      where: { id: id },
    })
    return res.json(rows)
  },

  async delete(req, res) {
    const validation = new Validator(req.params, { id: 'required' })
    if (validation.fails()) {
      return res.status(400).send(validation.errors.all())
    }
    const { id } = req.params
    await User.destroy({
      where: {
        id: id,
      },
    })
    return res.send('Deleted')
  },

  async register(req, res) {
    const validation = new Validator(req.body, {
      email: 'required',
      name: 'required',
      password: 'required',
    })
    if (validation.fails()) {
      return res.status(400).send(validation.errors.all())
    }
    const { email, name, password } = req.body
    const checkExist = await User.findOne({
      where: {
        email: email,
      },
    })
    if (checkExist)
      return res.status(409).send('email is already, please login')

    const encryptPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      email: email,
      name: name,
      password: encryptPassword,
    })
    const token = jwt.sign({ data: null }, secretKey, {
      algorithm: 'HS256',
      expiresIn: '2h',
    })
    user.token = token
    return res.status(201).json({
      email: user.email,
      token: user.token,
    })
  },

  async logIn(req, res) {
    const validation = new Validator(req.body, {
      email: 'required',
      password: 'required',
    })
    if (validation.fails()) {
      return res.status(400).send(validation.errors.all())
    }
    const { email, password } = req.body
    const checkExist = await User.findOne({
      where: {
        email: email,
      },
    })
    if (!checkExist)
      return res.status(401).send('this email is not exist, please register')
    const checkPassword = await bcrypt.compare(password, checkExist.password)
    if (!checkPassword)
      return res.status(401).send('invalid password, please try again')
    const token = jwt.sign({ data: null }, secretKey, {
      algorithm: 'HS256',
      expiresIn: '2h',
    })
    checkExist.token = token
    return res.status(200).json({
      email: checkExist.email,
      name: checkExist.name,
      token: checkExist.token,
    })
  },

  async showAllProjectbyUserId(req, res) {
    // N+1 queries problem
    /*  const rows = await User.findAll({
      attributes: ['id', 'name']
    })
    const result = await Promise.all(rows.map(async (row) => {
      const projects = await Project.findAll({
        attributes: ['name'],
        where: {
          UserId: row.id
        }
      })
      return {
        userId: row.id,
        userName: row.name,
        projects: projects
      }
    
    }))
    return res.json(result) */

    // solve N + 1 queries by select in (không dùng được trong trường hợp có đk ở projects)
    /* const rows = await User.findAll({
      attributes: ['id', 'name'],
    })
    const idArray = rows.map((row) => row.id)
    const projects = await Project.findAll({
      attributes: ['name', 'UserId'],
      where: {
        Userid: { [Op.in]: idArray },
      },
    })
    const result = rows.map((row) => {
      const filtProject = projects.filter(
        (project) => project.UserId === row.id
      )
      const projectName = filtProject.map((element) => element.name)
      return {
        UserId: row.id,
        UserName: row.name,
        projects: projectName,
      }
    })
    return res.json(result) */

    //solve N + 1 queries by joins table

    /* const result = await User.findAll({
      attributes:['id', 'name'],
      include: {
        model:Project,
        attributes: ['name'],
        as: 'project'
      },
      order:[ ['id', 'DESC']]
    })
    return res.json(result) */

    const result = await sequelize.query(
      `SELECT users.id , 
    users.name AS userName, projects.name AS projectName, 
    projects.UserId AS userId 
    FROM users LEFT JOIN projects 
    ON users.id = projects.UserId`,
      { type: sequelize.QueryTypes.SELECT }
    )
    return res.json(result)
  },
}

export default User2Controller
