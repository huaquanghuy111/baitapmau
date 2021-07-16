import util from 'util'
import connection from '../connect'

const query = util.promisify(connection.query).bind(connection)
const userController = {
  async getAll(req, res) {
    try{
      const sql = 'SELECT * FROM userinfor'
      const rows = await query(sql)
      res.json(rows)
    }
    catch(err){
      console.log(err)
    }
  },
}

export default userController
