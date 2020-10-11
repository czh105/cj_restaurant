var cloud = require('wx-server-sdk')
cloud.init()
exports.main = (event,context)=>{
    const db = cloud.database()
    console.log("删除订单")
    const _ = db.command
    db.collection('order').where({
        orderState:"送达"
    }).remove()
}