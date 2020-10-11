const cloud = require('wx-server-sdk')
cloud.init()

exports.main = (event,context)=>{
  var OPEN_ID = cloud.getWXContext().OPENID
  var merchatState = event.merchatState
  var merchatTime = event.merchatTime
    console.log("state:"+merchatState)
    try{
      const db = cloud.database()
      const _ =db.command
      db.collection('merchatState').where({
      }).update({
        data:{
          merchatState:merchatState,
          merchatTime:merchatTime
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