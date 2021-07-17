import dbObj from '../connect'

const userController = {
  async list(req, res) {
    const rows = await dbObj.executeQuery('SELECT * FROM userinfor')

    return res.json(rows)
  },
}

export default userController
