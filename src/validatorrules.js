const rules = {
    bookValidate : {
        id: 'integer',
        name: 'string',
    },
    projectValidate: {
        name: 'required',
        author: 'required'
    },

    UserValidate: {
        name: 'required',
        age: ['integer', 'between: 0,100', 'required'],
        password: 'required'
        
    },
    loginValidate: {
        name: 'required',
        password: 'required'
    }
}
export default rules