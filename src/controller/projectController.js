import util from 'util'
import connection from '../connect'

const query = util.promisify(connection.query).bind(connection)
const projectController = {
  
    async getAll(req, res) {
      try{
        const sql = 'SELECT * FROM project'
        const rows = await query(sql)
        res.json(rows)
      }
      catch(err){
        console.log(err)
      }
    }
  
}

export default projectController
