const Sequelize = require('sequelize')

const db = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  dialect: 'postgres',
  operatorsAliases: false
})

const User = db.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
})

db.authenticate().then(() => {
  db.sync({ force: false })
})

const getAllUsers = () => {
  return User.findAll() //.then(users => users.map(user => user.dataValues))
}

module.exports = {
  db,
  User,
  getAllUsers
}
