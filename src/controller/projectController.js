import dbObj  from "../connect"

const projectController = {
  async list(req, res) {
    
      const rows = await dbObj.executeQuery('SELECT * FROM projectsdđk')
      //const result = Object.values(JSON.parse(JSON.stringify(rows)))
      return res.json(rows)
    
  },
}

export default projectController
