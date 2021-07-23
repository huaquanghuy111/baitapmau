import createError from 'http-errors'

const Errors = {
    validate (errmes) {
        throw createError(400,`${errmes}` )
    }
}

export default Errors