//var db = require('wx-server-sdk');
//db.init();//初始化
function CleanCart(){
  wx.setStorageInfoSync('cart',null); 
}
function createOrderId(){
  var str = new Date().getTime().toString();
  return str;
}
function updateOrderMessage(userData){
  var tip = userData.tip;
  if(tip==null){
    tip='';
  }
  var db = wx.cloud.database();
  const _ = db.command;
  db.collection("order").where({
    orderid:orderid,
    orderState :"进行中"
  }).update({
    data:{
       phone:userData.phone,
      address:userData.address,
      tip:tip
    },success:function(){
      result = true;
    },fail:function(){
      result = false;
    }
  }
  );
}
function showOrderMessage(userid){
  const db = wx.cloud.database();
  const _ = db.command();
  
}
function getCurTime(){
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDay();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return year+"/"+month+"/"+day+" "+ hour+":"+minute+":"+second;
}
module.exports={
  createOrderId,
  getCurTime,
  CleanCart
}

