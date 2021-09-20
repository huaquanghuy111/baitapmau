import passport from 'passport'

const GoogleStrategy = require('passport-google-oauth2').Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSCRET,
      callbackURL: 'http://localhost:3002/auth/google/callback',
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => done(null, profile)
  )
)

const FacebookStrategy = require('passport-facebook').Strategy

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.CLIENTID_FB,
      clientSecret: process.env.CLIENTSCRET_FB,
      callbackURL: 'http://localhost:3002/auth/facebook/callback',
    },
    (accessToken, refreshToken, profile, done) => done(null, profile)
  )
)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))
