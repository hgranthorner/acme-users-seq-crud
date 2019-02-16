const { getAllUsers, User } = require('./db')
const { homePage, updatePage, failedPage } = require('./views')
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
  console.log(req.params.id)
  res.send(updatePage(req.users, req.params.id))
})

app.put('/users/:id', (req, res, next) => {
  if (!req.body.firstName || !req.body.lastName) {
    const emptyArray = []
    if (!req.body.firstName) emptyArray.push('firstName')
    if (!req.body.lastName) emptyArray.push('lastName')
    res.send(failedPage(emptyArray))
  }
  User.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName
    },
    {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    }
  )
    .then(() => res.redirect('/users'))
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
