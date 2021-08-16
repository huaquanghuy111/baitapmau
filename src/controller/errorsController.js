const errorsController = {
  failGoogle(req, res) {
    return res.status(401).send('Fail to sign in with Google, please try again')
  },

  failFacebook(req, res) {
    return res
      .status(401)
      .send('Fail to sign in with Facebook, please try again')
  },
}

export default errorsController
