var mongoose=require('mongoose')
var schema=mongoose.Schema
const {Schema} = require("mongoose");


var order=new schema({

    orderNumber:Number

})

var Order=mongoose.model('order',order)
module.exports=Order