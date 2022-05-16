const {Board} = require('./Board')
const {Cheese} = require('./Cheese')
const {User} = require('./User')

//one-to-many relationship
Band.hasMany(Musician)
Musician.belongsTo(Band,{
    foreignKey: 'bandId'
  });
//many-to-many relationship
Band.belongsToMany(Song,{through: "band_songs"});
Song.belongsToMany(Band,{through: "band_songs"});

module.exports = {
    Board,
    Cheese,
    User
};