import Validator from 'validatorjs'
import db from '../models'

const Project = db.projects
const projects2Controller = {
  async index(req, res) {
    const rows = await Project.findAll({
      attributes: ['id','name', 'userId'],
    })
    return res.json(rows)
  },

  async showbyUserId(req, res) {
    const validation = new Validator(req.params, { id: 'required' })
    if (validation.fails()) {
      return res.status(400).send(validation.errors.all())
    }
    const { id } = req.params
    const rows = await Project.findAll({
      where: {
        UserId: id,
      },
    })
    return res.json(rows)
  },
}

export default projects2Controller
