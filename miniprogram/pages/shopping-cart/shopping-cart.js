// pages/shopping-cart/shopping-cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iscart:false,
    cart:[],//菜单
    count:0,
    total:0,//总金额
    goodsCount:0,//数量
    userMessage:{
      userid:"",
      phone:"",//手机号
      address:"",//地址
      isok:false
    },
    openid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getOpenIdTap();//初始化获取openid
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.popup = this.selectComponent("#popup");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const db =wx.cloud.database()
    const _ = db.command
    db.collection("merchatState").where({
      merchatState:"休息中"
    }).count({
      success:function(res){
        if(res.total==1){
          wx.setStorageSync('cart', [])
        }
      },fail:function(res){
        console.log("数据库错误")
      }
    })
    var arr = wx.getStorageSync('cart') || [];
    this.data.total = 0;
    this.data.goodsCount = 0;
    if(arr.length>0){
      for(var i in arr){
        this.data.total += Number(arr[i].price)*Number(arr[i].count);
        this.data.goodsCount += Number(arr[i].count);
      }
      //更新数据
      this.setData({
        iscart:true,
        cart:arr,
        total:this.data.total,
        goodsCount:this.data.goodsCount
      });
    }else{
      this.setData({
        iscart:false,
        cart:[],
        total:0,
        goodsCount:0
      })
    }
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
  delGoods:function(e){
    var arr = wx.getStorageSync('cart') || [];
    console.log(e.target);
    for(var i in arr){
      if(arr[i].id == e.target.id.substring(3)){
        console.log(arr[i].id);
        var curGoodCount = Number(this.data.goodsCount) - Number(arr[i].count);
        var curTotal = Number(this.data.total) - Number(Number(arr[i].count)*Number(arr[i].price));
        var iscart = true;
        this.data.cart.splice(i,1);
        if(this.data.cart.length == 0){
          iscart = false;
        }
        console.log(this.data.cart);
        this.setData({
          cart:this.data.cart,
          iscart:iscart,
          total:curTotal,
          goodsCount:curGoodCount
        });
        try{
          wx.setStorageSync('cart', this.data.cart);
        }catch(e){
          console.log(e);
        }
      }
    }
  },
  //结账功能
  invoicing:function(e){
    //console.log(this.data.total);
    //地址弹出框
    this.popup.showPopup();
  },
  //取消事件
  _cancel(){
    this.popup.hidePopup();
  },
  _success(){
    var that = this;
    var message = this.popup.getMessage();
    if(message.flag){
      //订单地址填写成功
      var customerClient = require("../../js/customer")
      var userid = wx.getStorageSync('openid')
      var orderid = customerClient.createOrderId()//生成订单号
      var db = wx.cloud.database()
      const _ = db.command
      var tip = message.tip
      if(tip==null){
        tip="";
      }
     db.collection('order').add({
        data:{
          orderid:orderid,
          userid:userid,
          orderState:"进行中",
          phone:message.phone,
          address:message.address,
          dish:this.data.cart,//所有的菜单
          tip:tip,
          total:this.data.total,
          orderTime:customerClient.getCurTime(),
          finishTime:""
        },
        /*success:(res)=>{
          console.log("成功添加数据"+res.data._openid);
          
          console.log("下单成功"+wx.getStorageSync('cart'))
          //跳转到我的界面
          
         
        },fail:(res)=>{
          //失败提示框
         
        },*/
        complete:function(res){
          console.log(res.errMsg);
          if(res.errMsg == 'collection.add:ok'){
            wx.setStorageSync('cart', []);
            that.setData({
              iscart:false,
              cart:[],//菜单
              count:0,
              total:0,//总金额
              goodsCount:0,//数量
              userMessage:{
              userid:"",
              phone:"",//手机号
              address:"",//地址
              isok:false
               },
              openid:""
            })
             //成功弹出框
            wx.showToast({
              title: '下单成功',
              icon:"success",
              duration:3000,
              mask:true
            })
            that.onLoad();
          }else{
            wx.showToast({
              title: '下单失败',
              icon:'none',
              duration:3000,
              mask:false
            });
          }
        }
      })
    };
    
  },
})