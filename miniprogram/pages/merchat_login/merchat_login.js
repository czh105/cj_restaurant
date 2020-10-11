// miniprogram/pages/merchat_login/merchat_login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchatid:'',
    merchatPwd:"",
    islogin:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var merchatId = wx.getStorageSync('merchatid') || ""
    var merchatPwd = wx.getStorageSync('merchatPwd') || ""
    if(merchatId && merchatPwd){
      this.setData({
        merchatid:merchatId,
        merchatPwd:merchatPwd
      })
      this.login()
    }
  },
  login:function(){
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('merchat').where({
      merchatId:that.data.merchatid,
      merchatPwd:that.data.merchatPwd
    }).count({
      success:function(res){
        if(res.total==1){
          console.log("进入跳转")
          wx.setStorageSync('merchatid', that.data.merchatid)
          wx.setStorageSync('merchatPwd', that.data.merchatPwd)
          that.setData({
            islogin:true
          })
          
          that.onShow()
         }else{
           wx.showToast({
             title: '错误',
             duration:3000,
           })
         }
       }
     })

  },
  cancel:function(){

  },
  IdInput:function(e){
    var merchatId = e.detail.value;
    console.log(merchatId);
    this.setData({
      merchatid:merchatId
    })
  },
  pwdInput:function(e){
    var merchatPwd = e.detail.value
    this.setData({
      merchatPwd:merchatPwd
    })
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
    var merchatid = wx.getStorageSync('merchatid')
    var pwd = wx.getStorageSync('merchatPwd')
    console.log(merchatid)
    if(this.data.islogin && merchatid && pwd){
      wx.navigateTo({
        url: '../merchat/merchat',
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

  }
})