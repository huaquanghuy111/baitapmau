import express from 'express'
import passport from 'passport'
import {} from '../config/passport-setup'

const oauthRouter = express.Router()
oauthRouter.use(passport.initialize())
oauthRouter.use(passport.session())
oauthRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['openid', 'email', 'profile'] })
)
oauthRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/fail?from=google',
  })
)

oauthRouter.get('/auth/facebook', passport.authenticate('facebook'))
oauthRouter.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/fail?from=facebook',
  })
)

oauthRouter.get('/logout', (req, res) => {
  req.logOut()
  res.send('goodbye')
})

export default oauthRouter
