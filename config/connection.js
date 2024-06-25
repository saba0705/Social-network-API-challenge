const {connect, connection} = require('mongoose');

const connectionString = 'mongodb+srv://sabahjunaid:PWgK9xeiINGiu7Wn@cluster0.vjyqz6j.mongodb.net/social-network-db';

connect(connectionString);

module.exports = connection;