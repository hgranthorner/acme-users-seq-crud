const { getAllUsers, User } = require('./db')
const { homePage, updatePage } = require('./views')
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')

const app = express()

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res, next) => {
  res.redirect('/users')
})

app.use('/users', (req, res, next) => {
  getAllUsers()
    .then(users => {
      req.users = users
      next()
    })
    .catch(next)
})

app.post('/users', (req, res, next) => {
  User.create({ firstName: req.body.firstName, lastName: req.body.lastName })
    .then(res.redirect('/users'))
    .catch(next)
})

app.get('/users', (req, res, next) => {
  req.users.forEach(user => {
    console.log(user.firstName)
  })
  res.send(homePage(req.users))
})

app.get('/users/:id', (req, res, next) => {
  res.send(updatePage(req.users, req.params.id))
})

app.put('/users/:id', (req, res, next) => {
  console.log(req.body.firstName, req.body.lastName)
  User.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName
    },
    {
      where: {
        id: Number(req.params.id)
      },
      returning: true,
      plain: true
    }
  )
    .then(() => res.redirect('/user'))
    .catch(next)
})

app.delete('/users/:id', (req, res, next) => {
  User.destroy({
    where: {
      id: Number(req.params.id)
    }
  })
    .then(() => {
      res.redirect('/users')
    })
    .catch(next)
})

module.exports = app
