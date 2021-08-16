import Validator from 'validatorjs'
import creatError from 'http-errors'
import dbObj from '../config/database'
import rules from '../validatorrules'

const projectsController = {
  async index(req, res) {
    const rows = await dbObj.executeQuery('SELECT * FROM project')
    //const result = Object.values(JSON.parse(JSON.stringify(rows)))
    return res.json(rows)
  },
  async show(req, res) {
    const {id} = req.params
    const rows = await dbObj.executeQuery(
      `SELECT * FROM project WHERE id = "${id}"`
    )
    return res.json(rows)
  },

  async store(req, res) {
    const { name, author } = req.body
    const validation = new Validator(req.body, rules.projectValidate)
    if (validation.fails()) {
      const errormess = JSON.stringify(validation.errors.all())
      throw creatError(400, `${errormess}`)
    }
    await dbObj.executeQuery(
      `INSERT INTO project(name, author) VALUES ("${name}", "${author}")`
    )
    return res.send('add project successfully')
  },
  async delete(req, res) {
    const {id} = req.params
    const validation = new Validator(req.params, 'string')
    if (validation.fails()) {
      const errormess = JSON.stringify(validation.errors.all())
      throw creatError(400, `${errormess}`)
    }
    await dbObj.executeQuery(`DELETE FROM project WHERE id = "${id}"`)
    return res.send('remove successfully')
  },

  async update(req, res) {
    const {id} = req.params
    const { name, author } = req.body
    const validation = new Validator(req.body, 'string')
    if (validation.fails()) {
      const errormess = JSON.stringify(validation.errors.all())
      throw creatError(400, `${errormess}`)
    }
    await dbObj.executeQuery(
      `UPDATE project SET name = "${name}", author = "${author}" WHERE id = "${id}"`
    )
    return res.send('update successfully')
  },
}

export default projectsController
