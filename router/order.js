const Router = require('koa-router'),
    Order = require('../models/order'),
    router = new Router();

router
    .get('/user', async(ctx) => {
    auth(ctx);
    try {
        Order.find().lean()
            .then(orders => {
                orders = orders.map((order) => {
                    if (order.status === 0){
                        order.status = 'Новый';
                    } else if (order.status === 1){
                        order.status = 'Дизайнера';
                    } else if (order.status === 2){
                        order.status = 'Мастера';
                    }
                    order.time = moment(order.time).local('ru').format('DD MMMM YYYY H:mm');
                    return order;
                });
                await ctx.render('user', {
                    title: 'Главнвя страница',
                    username: ctx.state.user,
                    order: orders
                })
            })
        } catch(err){
            console.log(err);
        }
    });

function auth(ctx) {
    if(!ctx.isAuthenticated()){
        ctx.redirect('/');
    }
}

module.exports = router;