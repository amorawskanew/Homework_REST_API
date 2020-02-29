const Sequelize = require('../node_modules/sequelize');

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:password@localhost:5432/postgres";
const db = new Sequelize(databaseUrl);

const Movie = db.define('movie', {
  id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
  },
  title: {
      type: Sequelize.STRING
  },
  yearOfRelease: {
      type: Sequelize.INTEGER
  },
  synopsis: {
    type: Sequelize.TEXT
  },
})

db.sync()
  .then(() => Movie.truncate())
  .then(() => Promise.all([
    Movie.create({
      id: 1,
      title: 'The Remains of the Day',
      yearOfRelease: 1993,
      synopsis: 'A butler who sacrificed body and soul to service in the years leading up to World War II realizes too late how misguided his loyalty was to his lordly employer.'
    }),
    Movie.create({
      id: 2,
      title: 'Gone with the Wind',
      yearOfRelease: 1939,
      synopsis: 'A manipulative woman and a roguish man conduct a turbulent romance during the American Civil War and Reconstruction periods.'
    }),
    Movie.create({
      id: 3,
      title: 'Lawrence of Arabia',
      yearOfRelease: 1962,
      synopsis: 'The story of T.E. Lawrence, the English officer who successfully united and led the diverse, often warring, Arab tribes during World War I in order to fight the Turks.'
    }),
  ]))
  .catch(console.error);

module.exports = { Movie }
