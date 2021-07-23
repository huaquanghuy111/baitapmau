import Validator from 'validatorjs'
import creatError from 'http-errors'
import dbObj from '../connect'
import rules from '../validatorrules'

const projectsController = {
  async index(req, res) {
    const rows = await dbObj.executeQuery('SELECT * FROM project')
    //const result = Object.values(JSON.parse(JSON.stringify(rows)))
    return res.json(rows)
  },
  async show(req, res) {
    const name = req.params.id
    const rows = await dbObj.executeQuery(
      `SELECT * FROM project WHERE name = "${name}"`
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
    const name = req.params.id
    const validation = new Validator(req.params, 'string')
    if (validation.fails()) {
      const errormess = JSON.stringify(validation.errors.all())
      throw creatError(400, `${errormess}`)
    }
    await dbObj.executeQuery(`DELETE FROM project WHERE name = "${name}"`)
    return res.send('remove successfully')
  },

  async update(req, res) {
    const oldname = req.params.id
    const { name, author } = req.body
    const validation = new Validator(req.body, 'string')
    if (validation.fails()) {
      const errormess = JSON.stringify(validation.errors.all())
      throw creatError(400, `${errormess}`)
    }
    await dbObj.executeQuery(
      `UPDATE project SET name = "${name}", author = "${author}" WHERE name = "${oldname}"`
    )
   return res.send('update successfully')
  },
}

export default projectsController
