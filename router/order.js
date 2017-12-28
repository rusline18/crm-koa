    const Router = require('koa-router'),
        Order = require('../models/order'),
        moment = require('moment'),
        router = new Router();

moment.updateLocale('ru', {
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
});
class Clietn {
    constructor(name, phone, email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
}

router
    .get('/user', async(ctx) => {
    auth(ctx);
    try {
            let orders = await Order.find().lean().exec((err, doc) => {
                doc.map((order) => {
                    if (order.status === 0){
                        order.status = 'Дизайнера';
                    } else if (order.status === 1){
                        order.status = 'Мастера';
                    } else if (order.status === 2){
                        order.status = 'Аутсорс';
                    }
                    order.time = moment(order.time).local('ru').format('DD MMMM YYYY H:mm');
                    return order;
                });
        });
        await ctx.render('user', {
            title: 'Главнвя страница',
            username: ctx.state.user,
            order: orders
        });
    }catch(err){
            await console.log(err);
        }
    })
    .get('/order/:id', async(ctx) => {
        try {
            let order = await Order.findOne({orderId: ctx.params.id}).exec((err, id) => {
                if (err) return err;
                return id;
            });
            await ctx.render('order_view', {order})
        } catch(err) {
            await console.log(err);
        }
    })
    .post('/create-order', async ctx => {
        let request = ctx.request.body;
        let file = request.files;
        let fields = request.fields;
        let pathUpload = file.image.path;
        let arrTags = fields.tags;
        let parse = pathUpload.split(/\\/);
        fields.file = `${parse[4]}/${parse[5]}/${parse[6]}`;
        Array.isArray(fields.tags) === false ? fields.tags = arrTags.split(',') : false;
        fields.client = new Clietn(fields.name, fields.phone, fields.email);
        fields.user = ctx.state.user;
        try {
            let order = new Order(fields);
            order.save();
            ctx.body = await order;
        } catch (err) {
            ctx.body = await false
        }
    });

function auth(ctx) {
    if(!ctx.isAuthenticated()){
        ctx.redirect('/');
    }
}

module.exports = router;