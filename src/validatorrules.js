const rules = {
  bookValidate: {
    id: 'integer',
    name: 'string',
  },
  projectValidate: {
    name: 'required',
    author: 'required',
  },
  UpdateValidate: {
    name: 'required',
    age: ['integer', 'required'],
  },

  UserValidate: {
    id: 'required',
    name: 'required',
    age: ['integer', 'between: 0,100', 'required'],
    password: 'required',
  },
  loginValidate: {
    name: 'required',
    password: 'required',
  },

  tutorialValidate: {
    title: ['string', 'required'],
    description: ['string', 'required'],
    published: 'required',
  },
}
export default rules
