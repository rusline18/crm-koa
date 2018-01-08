const Router = require('koa-router'),
    Order = require('../models/order'),
    fs = require('fs'),
    path = require('path'),
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

//order
router
    .get('/orders', async(ctx) => {
    auth(ctx);
    try {
            let orders = await Order.find({action: true}).lean().exec((err, doc) => {
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
            let order = await Order.findOne({orderId: ctx.params.id}).lean().exec((err, doc) => {
                doc.createdAt = moment(doc.createdAt).local('ru').format('DD MMMM YYYY H:mm');
                return doc;
            });
            console.log(order);
            await ctx.render('order_view', {order});
        } catch(err) {
            await console.log(err);
        }
    })
    .post('/create-order', async ctx => {
        let request = ctx.request.body;
        let file = request.files.image;
        let fields = request.fields;
        let parse = file.name.substr(file.name.lastIndexOf('.') + 1);
        let pathUpload = path.join(__dirname,'../public/upload/'+new Date().getTime()+'.'+parse);
        fs.rename(file.path, pathUpload, (err) => {
            console.log(err);
        });
        let arrTags = fields.tags;
        fields.file = pathUpload;
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

//helpdesk
router
    .get('/helpdesk', async(ctx) => {
    await ctx.render('helpdesk/index', {title: 'HelpDesk'})
});

function auth(ctx) {
    if(!ctx.isAuthenticated()){
        ctx.redirect('/');
    }
}

module.exports = router;