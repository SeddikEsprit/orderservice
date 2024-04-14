var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose')
var cors=require('cors');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/orderDb', {useNewUrlParser: true, useUnifiedTopology: true})

//import Eureka from 'eureka-js-client';

const Eureka = require('eureka-js-client').Eureka;
const client = new Eureka({
    instance: {
        app: 'orderservice',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        statusPageUrl: 'http://localhost:3000/order',
        port: {
            '$': 3000,
            '@enabled': 'true',
        },
        vipAddress: 'orderservice',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
        registerWithEureka: true,
        fetchRegistry: true
    },
    eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps'
    },
});

client.logger.level('debug');
client.start((error) => {
    console.log(error || 'complete');
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var orderRouter = require('./routes/order');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/order', orderRouter);

module.exports = app;
