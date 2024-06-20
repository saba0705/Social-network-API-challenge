const {connect, connection} = require('mongoose');

const connectionString = 'mongodb://localhost:27017/your-database-name';

connect(connectionString);

module.exports = connection;