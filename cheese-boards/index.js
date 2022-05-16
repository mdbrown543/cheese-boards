const {Board} = require('./Board')
const {Cheese} = require('./Cheese')
const {User} = require('./User')

//one-to-many relationship
User.hasMany(Board)
Board.belongsTo(User,{
    foreignKey: 'boardId'
  });
//many-to-many relationship
Board.belongsToMany(Cheese,{through: "cheese_board"});
Cheese.belongsToMany(Board,{through: "cheese_board"});

module.exports = {
    Board,
    Cheese,
    User
};