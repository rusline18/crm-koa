const Koa = require('koa'),
    logger = require('koa-logger'),
    views = require('koa-views'),
    bodyParser = require('koa-body'),
    serve = require('koa-static'),
    session = require('koa-session'),
    passport = require('./bin/passport'),
    path = require('path'),
    app = new Koa();


const router = require('./router/auth'),
    order = require('./router/order');

app.keys = ['Secret CRM Key'];
app.use(session({}, app));
app.use(logger());
app.use(bodyParser({
    // formidable:{
    //     uploadDir: path.join(__dirname + '/public/upload/'),
    //     keepExtensions: true},
    multipart: true,
    // urlencoded: true
}));
app.use(serve(__dirname + '/public'));
app.use(views(__dirname + '/views', {extension: 'pug'}));

app.use(passport.initialize());
app.use(passport.session());
app.use(router.routes());
app.use(order.routes());
module.exports = app;