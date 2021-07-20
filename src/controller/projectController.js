import Validator from 'validatorjs'
import dbObj from '../connect'
import rules from '../validatorrules'

const projectController = {
  async list(req, res) {
    const rows = await dbObj.executeQuery('SELECT * FROM project')
    //const result = Object.values(JSON.parse(JSON.stringify(rows)))
    return res.json(rows)
  },
  async findbyName(req, res) {
    const { name } = req.body
    console.log(name)
    const rows = await dbObj.executeQuery(
      `SELECT * FROM project WHERE name = "${name}"`
    )
    return res.json(rows)
  },

  async addProject(req, res) {
    const { name, author } = req.body
    const validation = new Validator(req.body, rules.projectValidate)
    if (validation.passes()) {
      await dbObj.executeQuery(
        `INSERT INTO project(name, author) VALUES ("${name}", "${author}")`
      )
      return res.send('add project successfully')
    }
    return res.send(validation.errors.first('name'))
  },
  async removeProjects(req, res) {
    const { name } = req.body
    const validation = new Validator(req.body, 'string')
    if (validation.passes()) {
      await dbObj.executeQuery(`DELETE FROM project WHERE name = "${name}"`)
      return res.send('remove successfully')
    }
    return res.send(validation.errors.first())
  },

  async updateProject(req, res) {
    const {name, author} = req.body
    const validation = new Validator(req.body, rules.projectValidate)
    if(validation.passes()){
      await dbObj.executeQuery(`UPDATE project SET author = "${author}" WHERE name = "${name}"`)
      res.send('update successfully')
    }
    return res.send(validation.errors.first('name','author'))

  }
}

export default projectController
