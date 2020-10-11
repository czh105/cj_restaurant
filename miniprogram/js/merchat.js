/**
 * 商家查看订单
 */
var order = {};
var result = false;
function showOrderMessage(){
  const db = wx.cloud.database();
  const _ = db.command();
  db.collection("order").where({
    orderState:"进行中",
  }).get({
    success:function(res){
      order= res.data;
      this.result = true;
    },
    fail:function(res){
      this.result = false;
    }
  });
}
function showfinishOrderMessage(){
  const db = wx.cloud.database();
  const _ = db.command();
  db.collection("order").where({
    orderState:"完成",
  }).get({
    success:function(res){
      order= res.data;
      this.result = true;
    },
    fail:function(res){
      this.result = false;
    }
  });
}
function updateOrderState(orderid){
  const db = wx.cloud.database();
  const _ = db.command();
  db.collection("order").where({
    orderid:orderid
  }).update({
    data:{
      orderState:'完成'
    },
    success:function(res){
      this.result = true;
    },
    fail:function(res){
      this.result = false;
    }
  });
}
//关店或开店操作
function updateMerchatState(merchat_state){
  const db = wx.cloud.database();
  const _ = db.command();
  db.collection('merchat').where({  
  }).update({
    data:{
      merchatState:merchat_state
    },success:function(res){
      this.result = true;
    },fail:function(res){
      this.result = false;
    }
  });
}
module.exports = {
  order:this.order,
  result:this.result,
  showOrderMessage,
  updateOrderState,
  deleteOrderState,
  updateMerchatState
}