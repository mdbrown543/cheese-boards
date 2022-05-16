const {Sequelize, sequelize} = require('./db');


let Cheese = sequelize.define('cheese', {
    type: Sequelize.STRING,
    description: Sequelize.STRING,
  });
  

module.exports = {
    Cheese
};