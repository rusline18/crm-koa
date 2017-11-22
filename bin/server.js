const app = require('../app'),
    config = require('./config');

const PORT = process.env.PORT || config.port;

app.listen(PORT, err => {
    err ? console.error(err) : console.log(`Слушает порт ${PORT}`);
});