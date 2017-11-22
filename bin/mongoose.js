let mongoose = require('mongoose'),
    config = require('./config');

mongoose.Promise = require('bluebird');

mongoose.connect(config.mongoose.connection, {
    useMongoClient: true,
}).then(() => console.info('Успешно подключена MongoDb'))
    .catch((err) => {
        console.error('Ошибка подключение к базе данных '+err);
        console.error('Не запущен сервер MongoDb');
        process.exit(2);
    });

mongoose.set('debug', true);

module.exports = mongoose;