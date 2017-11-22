const Koa = require('koa'),
    logger = require('koa-logger'),
    views = require('koa-views'),
    bodyParser = require('koa-bodyparser'),
    serve = require('koa-static'),
    session = require('koa-session'),
    passport = require('./bin/passport'),
    app = new Koa();


const router = require('./router/auth'),
    order = require('./router/order');

app.keys = ['Secret CRM Key'];
app.use(session({}, app));
app.use(logger());
app.use(bodyParser());
app.use(serve(__dirname + '/public'));
app.use(views(__dirname + '/views', {extension: 'pug'}));

app.use(passport.initialize());
app.use(passport.session());
app.use(router.routes());
app.use(order.routes());
module.exports = app;