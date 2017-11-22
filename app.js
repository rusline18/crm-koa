const Koa = require('koa'),
    router = require('./router/auth'),
    logger = require('koa-logger'),
    views = require('koa-views'),
    bodyParser = require('koa-bodyparser'),
    serve = require('koa-static'),
    session = require('koa.session'),
    passport = require('./bin/passport'),
    app = new Koa();

app.keys = ['Secret CRM Key'];
app.use(session());
app.use(logger());
app.use(bodyParser());
app.use(serve(__dirname + '/public'));
app.use(views(__dirname + '/views', {extension: 'pug'}));

app.use(passport.initialize());
app.use(passport.session());
app.use(router.routes());
module.exports = app;