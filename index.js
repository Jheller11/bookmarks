// import packages
const express = require('express')
const app = express()
const override = require('method-override')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const helmet = require('helmet')
const compression = require('compression')
const favicon = require('serve-favicon')
const path = require('path')

// import controllers
const articleController = require('./controllers/articles')
const userController = require('./controllers/users')
const adminController = require('./controllers/admin')

// config app
app.use(bodyParser.urlencoded({ extended: true }))
app.use(override('_method'))
app.use(cookieParser())
app.use(compression())
app.use(helmet())
app.use(express.static('public'))
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))

// passport
app.use(session({ secret: 'liverpool' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// config views
app.set('views', './views')
app.set('view engine', 'pug')

// pass title and user to all views
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.title = 'Code Bookmarks'
  next()
})

// set controllers
app.use('/articles', articleController)
app.use('/users', userController)
app.use('/admin', adminController)

// render info page
app.get('/about', (req, res) => {
  res.render('about')
})

// render home page
app.get('/', (req, res) => {
  res.redirect('/articles')
})

// 404
app.get('/*', (req, res) => {
  res.render('404', {
    message: 'The page you requested does not exist. Please try again.'
  })
})

app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () =>
  console.log('server running on ' + app.get('port'))
)
