// pages/merchat_total/merchat_total.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIndex:-1,
    orderList:[],
    ordertotal:0,
    ordercount:0,
    merchatState:"",
    merchatTime:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //点击才加载
    const db = wx.cloud.database()
    const _ = db.command
    var that = this
    db.collection('order').where({
      orderState:'送达'
    }).get({
      success:function(res){
        var total = 0
        for(var item in res.data){
          total += Number(res.data[item].total)
        }
        that.setData({
          orderList:res.data,
          ordertotal:total,
          ordercount:res.data.length
        })
      },
      fail:function(res){
          wx.showToast({
            title: '错误,请重新刷新一下',
            duration:3000,
            icon:'none'
          })
      },complete:function(res){
        wx.showToast({
          title: '数据加载中',
          icon:'loading',
          mask:true
        })
      }
    })
    console.log("jion merchat state")
    db.collection('merchatState').get({
      success:function(res){
        for(var item in res.data){
          that.setData({
            merchatState:res.data[item].merchatState,
            merchatTime:res.data[item].merchatTime
          })
        }
      },
      fail:function(res){
        wx.showToast({
          title: '错误，请刷新一下',
          duration:3000
        })
      },
      complete:function(res){
      }
    })
  },
  loginOut:function(e){
    wx.setStorageSync('merchatid',"")
    wx.setStorageSync('merchatPwd', "")
    /*wx.navigateBack({
      delta:2
    })*/
    wx.reLaunch({
      url: '../merchat_login/merchat_login',
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
    //点击才加载
    const db = wx.cloud.database()
    const _ = db.command
    var that = this
    db.collection('order').where({
      orderState:'送达'
    }).get({
      success:function(res){
        var total = 0
        for(var item in res.data){
          total += Number(res.data[item].total)
        }
        that.setData({
          orderList:res.data,
          ordertotal:total,
          ordercount:res.data.length
        })
      },
      fail:function(res){
          wx.showToast({
            title: '错误,请重新刷新一下',
            duration:3000,
            icon:'none'
          })
      },complete:function(res){
        wx.showToast({
          title: '数据加载中',
          icon:'loading',
          mask:true
        })
      }
    })
    console.log("jion merchat state")
    db.collection('merchatState').get({
      success:function(res){
        for(var item in res.data){
          that.setData({
            merchatState:res.data[item].merchatState,
            merchatTime:res.data[item].merchatTime
          })
        }
      },
      fail:function(res){
        wx.showToast({
          title: '错误，请刷新一下',
          duration:3000
        })
      },
      complete:function(res){
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
  merchatTimeInput:function(e){
    var time = e.detail.value
    this.setData({
      merchatTime:time
    })
  },
  updateMerchatTime:function(){
    var that = this
    wx.cloud.callFunction({
      name:"merchatState",
      data:{
        merchatState:that.data.merchatState,
        merchatTime:that.data.merchatTime
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //点击才加载
    const db = wx.cloud.database()
    const _ = db.command
    var that = this
    db.collection('order').where({
      orderSate:'送餐完成'
    }).get({
      success:function(res){
        var total = 0
        for(var item in res.data){
          total += Number(res.data.total)
        }
        that.setData({
          orderList:res.data,
          ordertotal:total,
          ordercount:res.data.length
        })
      },
      fail:function(res){
          wx.showToast({
            title: '错误,请重新刷新一下',
            duration:3000,
            icon:'none'
          })
      },complete:function(res){
        wx.showToast({
          title: '数据加载中',
          icon:'loading',
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
  updateMerchatState:function(e){
    var that = this
    var curMerchatState = e.target.id
    console.log(that.data.merchatTime)
    if(curMerchatState == '营业中'){
      wx.cloud.callFunction({
        name:"merchatState",
        data:{
          merchatState:"休息中",
          merchatTime:that.data.merchatTime
        },
        success:function(res){
          console.log(res.result.return_code);
          wx.showToast({
            title: '操作成功',
            duration:2000,
            icon:'success'
          })
          that.setData({
            merchatState:"休息中"
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
    }else{
      wx.cloud.callFunction({
        name:"merchatState",
        data:{
          merchatState:"营业中",
          merchatTime:that.data.merchatTime
        },
        success:function(res){
          console.log(res.result.return_code);
          wx.showToast({
            title: '操作成功',
            duration:2000,
            icon:'success'
          })
          that.setData({
            merchatState:"营业中"
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
    }
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
  menuTabbarMerchatActive:function(){
    wx.reLaunch({
      url: '../merchat/merchat',
    })
  },
  menuTabbarFinish:function(){
    wx.reLaunch({
      url: '../merchatFinish/merchatFinish',
    })
  },
  menuTabbarTakeOutActive:function(){
    wx.reLaunch({
      url: '../merchatTakeOut/merchatTakeOut',
    })
  }
})