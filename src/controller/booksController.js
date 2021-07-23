import Validator from 'validatorjs'
import rules from '../validatorrules'
import books from '../data'

const bookController = {
  detail(req, res) {
    res.json(books)
  },
  addBook(req, res) {
    const currentbook = req.body
    const validation = new Validator(currentbook, rules,{require: 'You can not type id as string'} )
    console.log(validation.passes())
    if(validation.passes()){
      books.push(currentbook)
      return res.json({
        id: currentbook.id,
        name: currentbook.name,
      })
    }
    res.send(validation.errors.first('name'))
  },
}

export default bookController
