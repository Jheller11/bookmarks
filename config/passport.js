const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  // local signup strategy with error/warning flash
  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        process.nextTick(() => {
          User.findOne({ 'local.email': email }, (err, user) => {
            if (err) return done(err)
            if (user) {
              return done(
                null,
                false,
                req.flash('signupMessage', 'That email is already taken.')
              )
            }
            if (!email || !req.body.displayName || !password) {
              return done(
                null,
                false,
                req.flash(
                  'signupMessage',
                  'All fields are required. Please try again.'
                )
              )
            } else {
              var newUser = new User()
              newUser.local.email = email
              newUser.local.password = newUser.generateHash(password)
              newUser.local.displayName = req.body.displayName
              newUser.save(err => {
                if (err) throw err
                return done(null, newUser)
              })
            }
          })
        })
      }
    )
  )
  // local login with error/warning flash
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        User.findOne({ 'local.email': email }, (err, user) => {
          if (err) {
            console.log(err)
            return done(err)
          }
          if (!user) {
            console.log('user not found')
            return done(
              null,
              false,
              req.flash('loginMessage', 'User not found.')
            )
          }
          if (!user.validPassword(password, user)) {
            console.log('invalid password')
            return done(
              null,
              false,
              req.flash('loginMessage', 'Password is not correct.')
            )
          }
          if (user) {
            user.count += 1
            user.save()
          }
          return done(null, user)
        })
      }
    )
  )
}
