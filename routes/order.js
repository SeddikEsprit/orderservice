var express=require('express');
var router=express.Router();
var Order=require('../models/order');



router.get('/:id', getOrder, (req, res) => {
    res.json(res.order)
})


async function getOrder(req, res, next) {
    let order
    try {
        order = await Order.findById(req.params.id)
        if (order == null) {
            return res.status(404).json({ message: 'Cannot find order' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.order = order
    next()
}
module.exports = router;