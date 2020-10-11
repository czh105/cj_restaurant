const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const _ = db.command
exports.main = (event, context) =>
{
  var that = this
  var OPEN_ID = cloud.getWXContext().OPENID//获取用户唯一标识
  console.log(OPEN_ID);
  var orderid = event.orderid;
  var address = event.address;
  var phone = event.phone;
  console.log("cloud:"+address)
  try{
    db.collection('order').where({
      orderid:orderid
    }).update({
      data:{
        address:address,
        phone:phone
      },
      success:function(res){
        that.result = true
      },
      faile:function(res){
        that.result = false
      }
    })
  }catch(e){
    console.log(e);
  }
}