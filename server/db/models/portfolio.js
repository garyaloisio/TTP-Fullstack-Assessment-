const Sequelize = require('sequelize')
const db = require('../db')

const Portfolio = db.define('portfolio', {
  stock: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
})

module.exports = Portfolio
