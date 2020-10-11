// pages/merchat/merchat.js
const audio = wx.createInnerAudioContext();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    merchat:'开店',
    orderList:[],
    isExit:false,
    isPlay:false,
    showIndex:-1,
    address:"",
    phone:"",
    orderid:"",//需要修改的订单号
    isWork:false
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var merchatid = wx.getStorageSync('merchatid')
    var that = this
    if(!merchatid){
      console.log("index"+merchatid)
      wx.navigateBack({
        delta:2
      })
    }else{
      const db = wx.cloud.database()
      const _ = db.command
      db.collection("order").where({
        orderState:"进行中"
      }).get({
        success:(res)=>{
          console.log(res.data)
          if(res.data.length>0){
            var originalFinalOrderId = wx.getStorageSync('order')
            wx.setStorageSync('order', res.data[res.data.length -1].orderid)
            console.log(originalFinalOrderId+","+wx.getStorageSync('order'));
            if(originalFinalOrderId != res.data[res.data.length -1].orderid){
              audio.play()
              console.log("播放音乐")
            }
            that.setData({
              orderList:res.data,
              isExit:true
            })
          }else
          {
            that.setData({
              orderList:[],
              isExit:false,
              isPlay:false,
              showIndex:-1,
              address:"",
              phone:"",
              orderid:"",//需要修改的订单号
            })
          }
        },fail:(res)=>{
          console.log("错误");
        }
      })
    }
  },
  menuFinish:function(e){
    console.log("跳转完成页面")
    wx.reLaunch({//测试
      url: '../merchatFinish/merchatFinish'
    })
  },
  menuTabbarTakeOut:function(e){
    console.log("跳转")
    wx.reLaunch({//测试
      url: '../merchatTakeOut/merchatTakeOut'
    })
  },
  menuTabbarStore:function(){
    console.log("跳转")
    wx.reLaunch({//测试
      url: '../merchat_total/merchat_total'
    })
  },
  text:function(){
    console.log("cs");
  },
  //暂停音乐
  pause:function(){
    audio.pause()
    this.setData({
      isPlay:false
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
    var that = this
    audio.src = '../../assets/sounds/newMessage.mp3'
    audio.loop = true
    const db = wx.cloud.database()
    const _ =db.command
    setInterval(function(){
      db.collection("order").where({
      orderState:"进行中"
    }).get({
      success:(res)=>{
        console.log(res.data)
        if(res.data.length>0){
          var originalFinalOrderId = wx.getStorageSync('order')
          wx.setStorageSync('order', res.data[res.data.length -1].orderid)
          console.log(originalFinalOrderId+","+wx.getStorageSync('order'));
          if(originalFinalOrderId != res.data[res.data.length -1].orderid){
            audio.play()
            console.log("播放音乐")
          }
          that.setData({
            orderList:res.data,
            isExit:true
          })
        }else
        {
          that.setData({
            orderList:[],
            isExit:false,
            isPlay:false,
            showIndex:-1,
            address:"",
            phone:"",
            orderid:"",//需要修改的订单号
          })
        }
      },fail:(res)=>{
        console.log("错误");
      }
    })
    },60000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this
    audio.src = '../../assets/sounds/newMessage.mp3'
    audio.loop = true
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('merchatState').where({
      merchatState:"营业中"
    }).count({
      success:function(res){
        console.log(res.total)
        if(res.total == 1){
          that.setData({
            isWork:true
          })
        }
      },
      fail:function(res){
      }
    })
    if(!that.data.isWork){
      return
    }else{
      setInterval(function(){
        db.collection("merchatState").where({
          merchatState:'营业中'
        }).count({
          success:function(res){
            if(res.total==1){
              db.collection("order").where({
                orderState:"进行中"
              }).get({
                success:(res)=>{
                  console.log(res.data)
                  if(res.data.length>0){
                    var originalFinalOrderId = wx.getStorageSync('order')
                    wx.setStorageSync('order', res.data[res.data.length -1].orderid)
                    console.log(originalFinalOrderId+","+wx.getStorageSync('order'));
                    if(originalFinalOrderId != res.data[res.data.length -1].orderid){
                      audio.play()
                      console.log("播放音乐")
                    }
                    that.setData({
                      orderList:res.data,
                      isExit:true
                    })
                  }else
                  {
                    that.setData({
                      orderList:[],
                      isExit:false,
                      isPlay:false,
                      showIndex:-1,
                      address:"",
                      phone:"",
                      orderid:"",//需要修改的订单号
                    })
                  }
                },fail:(res)=>{
                  console.log("错误");
                }
              })
            }else{
              return;
            }
          }
        }) 
      },60000)
    }
    
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
    var that = this
    audio.src = '../../assets/sounds/newMessage.mp3'
    audio.loop = true
    const db = wx.cloud.database()
    const _ =db.command
    db.collection("order").where({
      orderState:"进行中"
    }).get({
      success:(res)=>{
        if(res.data){
          var originalFinalOrderId = wx.getStorageSync('order')
          if(originalFinalOrderId != res.data[res.data.length -1].orderid){
            audio.play()
          }
          that.setData({
            orderList:res.data,
            isExit:true
          })
        }
      },fail:(res)=>{
        console.log("错误");
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
updateOrderMessage:function(e){
  var orderid = e.target.id.substring(2)
  console.log(orderid)
  var that = this
  wx.cloud.callFunction({
    name:"merchatUpdate",
    data:{
      orderid:orderid,
      orderState:"完成"
    },
    success:function(res){
      console.log(res.result.return_code);
      wx.showToast({
        title: '操作成功',
        duration:2000,
        icon:'success'
      })
      that.onLoad()
    },
    fail:function(res){
      wx.showToast({
        title: '操作失误',
        duration:2000,
        icon:'none'
      })
    }
  })
},
})