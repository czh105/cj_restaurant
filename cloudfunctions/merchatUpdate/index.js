const cloud = require('wx-server-sdk')
cloud.init()

exports.main = (event,context)=>{
  var OPEN_ID = cloud.getWXContext().OPENID

  
    var orderid = event.orderid
    var orderState = event.orderState
    console.log("order id:"+orderid)
    console.log("state:"+orderState)
    try{
      const db = cloud.database()
      const _ =db.command
      db.collection('order').where({
        orderid:orderid
      }).update({
        data:{
          orderState:orderState
        },
        success:(res)=>{

        },faile:(res)=>{
          console.log("修改订单状态错误")
        }
      })
    }catch(e){
      console.log(e)
    }
    return {
      return_code:"权限正确"
    }
}