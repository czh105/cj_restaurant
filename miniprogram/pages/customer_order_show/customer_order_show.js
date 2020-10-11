// pages/customer_order_show/customer_order_show.js
var merchat = require("../../js/config")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    isExit:false,
    showIndex:-1,
    address:"",
    phone:"",
    orderid:"",//需要修改的订单号
    isModify:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  showAndColse:function(e){
    console.log("show");
    if(e.currentTarget.dataset.index != this.data.showIndex){
      this.setData({
        showIndex:e.currentTarget.dataset.index
      })
    }else{
      this.setData({
        showIndex:-1
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    //查询
    var userid = wx.getStorageSync('openid')
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection("order").where({
      userid:userid,
      orderState:_.neq("送达")
    }).get({
      success:function(res){
        if(res.data){
          //console.log(res.data);
          var showList = []
          for(var i=0;i<res.data.length;i++){
            showList[i]='true'
          }
          that.setData({
            orderList:res.data,
            isExit:true,
            showList:showList
          })
        }
      },
      fail:function(res){
        wx.showToast({
          title: '重新刷新一下',
            icon:"none",
            duration:1000,
            mask:true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //var userid = wx.getStorageInfoSync('userid') || [];
    var userid = wx.getStorageSync('openid')
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection("order").where({
      userid:userid,
      orderState:_.neq('送达')
    }).get({
      success:function(res){
        if(res.data){
          this.setData({
            orderList:res.data,
            isExit:true
          })
        }
      },
      fail:function(res){
        wx.showToast({
          title: '重新刷新一下',
            icon:"none",
            duration:1000,
            mask:true
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  callPhone:function(){
    merchat.callPhone()
  },
  addressInput:function(e){
    if(e.detail.value){
      this.setData({
          address:e.detail.value
      })
    }
  },
  phoneInput:function(e){
    if(e.detail.value){
      this.setData({
          phone:e.detail.value
      })
    }
  },
  updateUserMessage:function(e){
    var orderid = e.target.id.substring(2)
    var address = ""
    var phone = ""
    var that = this
    for(var i =0;i<this.data.orderList.length;i++){
      if(this.data.orderList[i].orderid == orderid){
        address = this.data.orderList[i].address
        phone = this.data.orderList[i].phone
        break
      }
    }
    that.setData({
      address:address,
      phone:phone,
      orderid:orderid,//需要修改的订单号
      isModify:false
    })

  },
  updateMessage:function(e){
    var orderid = e.target.id.substring(6);
    var that = this
    console.log(that.data.address);
    wx.cloud.callFunction({
      name:'updateOrder',
      data:{
        orderid:orderid,
        address:that.data.address,
        phone:that.data.phone
      },
      success:(res)=>{
        console.log("res:"+res.result.result);
        //if(res.result.result){
          that.setData({
            address:"",
            phone:"",
            orderid:"",//需要修改的订单号
            isModify:true
          })
          that.onLoad()//重新加载一下
        //}
      },fail:(res)=>{
        console.log("错误")
      }

    })
  },
  closeDialog:function(e){
    this.setData({
      address:"",
      phone:"",
      orderid:"",//需要修改的订单号
      isModify:true
    })
  },
  showAndColse:function(e){
    console.log("show");
    if(e.currentTarget.dataset.index != this.data.showIndex){
      this.setData({
        showIndex:e.currentTarget.dataset.index
      })
    }else{
      this.setData({
        showIndex:-1
      })
    }
  },
})