const Router = require('koa-router'),
    passport = require('../bin/passport'),
    router = new Router();

router.get('/', async (ctx) => {
    await ctx.render('login', {title: 'Авторизация'});
});

router.get('/registration', async (ctx) => {
    await ctx.render('registration', {title: 'Регистрация'});
});

router.post('/registration', async (ctx) => {
    try {
        ctx.body = await User.create(ctx.request.body);
        ctx.redirect('/');
    }
    catch (err) {
        ctx.status = 400;
        await ctx.render('registration', {title: 'Регистрация', message: 'Такой пользователь зарегестрирован'})
    }
});

router.post('/', async (ctx) => {
    await passport.authenticate('local', async(err, user) => {
        if(user === false){
            await ctx.render('login', {title: 'Авторизация', message: 'Неверный логин или пароль'});
        } else {
            ctx.redirect('/user');
        }
    })(ctx)
});

router.get('/user', async(ctx) => {
    console.log(ctx.passport.user);
    ctx.body = await ctx.passport.user;
});

router.get('/logout', async ctx => {
    ctx.isAuthenticated();
    ctx.isUnauthenticated();
    await ctx.login();
    ctx.logout();
    ctx.redirect('/');
});

module.exports = router;