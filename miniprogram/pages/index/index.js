//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    height:0,
    toView:"",
    curId:"friedRice",
    scrollTop:40,
    messageList:[{
      id:"friedRice",
      name:"炒饭类",
      foods:[{
        id:'1001',
        price: '2.00',
        desc: '金针菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      },{
        id:'1002',
        price: '4.00',
        desc: '金菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      },{
        id:'1005',
        price: '2.00',
        desc: '金针菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      },{
        id:'1006',
        price: '4.00',
        desc: '金菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      },{
        id:'1007',
        price: '2.00',
        desc: '金针菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      },{
        id:'1008',
        price: '4.00',
        desc: '金菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      }]
    },{
      id:"powderSurface",
      name:"粉面类",
      foods:[{
        id:'1003',
        price: '2.00',
        desc: '金针菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      },{
        id:'1004',
        price: '4.00',
        desc: '金菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      },{
        id:'1009',
        price: '2.00',
        desc: '金针菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      },{
        id:'1010',
        price: '4.00',
        desc: '金菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      },{
        id:'1011',
        price: '2.00',
        desc: '金针菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      },{
        id:'1012',
        price: '4.00',
        desc: '金菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      },{
        id:'1013',
        price: '2.00',
        desc: '金针菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      },{
        id:'1014',
        price: '4.00',
        desc: '金菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      }
    ]
    },{
      id:"other",
      name:"其他",
      foods:[{
        id:'1001',
        price: '2.00',
        desc: '金针菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      },{
        id:'1002',
        price: '4.00',
        desc: '金菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      },{
        id:'1005',
        price: '2.00',
        desc: '金针菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      },{
        id:'1006',
        price: '4.00',
        desc: '金菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      },{
        id:'1007',
        price: '2.00',
        desc: '金针菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      },{
        id:'1008',
        price: '4.00',
        desc: '金菇',
        title: '袋装金针菇120-150g',
        thumb: '/assets/images/11.png',
        count:0
      }]
    }],
    isWork:false
  },
  onLoad: function() {
    const db = wx.cloud.database()
    const _ = db.command
    var that = this
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
    db.collection("merchatState").where({}).get({
      success:function(res){
        for(var item in res.data){
          wx.setNavigationBarTitle({
            title: '陈记餐馆('+res.data[item].merchatTime+")",
          })
          wx.setNavigationBarColor({
            backgroundColor: '#1BC3B8', // 必写项 
          })
        }
      },
      fail:function(res){

      }
    })
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return;
    }else{
      const db = wx.cloud.database()
      wx.cloud.callFunction({
        name:"login",
        success:function(res){
          wx.setStorageSync('openid', res.result.openid);
        }
      })
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    });
  },
  ClickMenu:function(e){
    var id = e.currentTarget.dataset.id;
    this.setData({
      toView:id,
      curId:id
    })
  },
  scroll:function(e){
    var scrollTop = e.detail.scrollTop//滚动的Y
    var height = 40
    var selectedId
    this.data.messageList.forEach(function(item,i){
      var _height = 10 + item.foods.length * 90//获取每一菜品种类的高度
      if(scrollTop >= height){
        selectedId = item.id
      }
      height = _height
    });
    this.setData({
      curId:selectedId,
    })
  },
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  dishCountAdd:function(e){
    this.setData({
      toastHidden:false
    });  
    //遍历列表
    for(var i in this.data.messageList){
      //列表中一项item的id==点击事件传输的id
      for(var j in this.data.messageList[i].foods){
        if(this.data.messageList[i].foods[j].id == e.target.id.substring(3)){//获取点击的id
          this.data.messageList[i].foods[j].count += Number(1);  
          this.setData({
            messageList :this.data.messageList
          });
          var arr = wx.getStorageSync('cart') || [];
          if(arr.length>0){
            for(var z in arr){
              if(arr[z].id == e.target.id.substring(3)){
                arr[z].count += Number(1);
                try{
                  wx.setStorageSync('cart', arr);
                }catch(e){
                  console.log(e);
                }
                return;
              }
            }
            arr.push(this.data.messageList[i].foods[j]);
          }
          else if(arr.length==0){
            arr.push(this.data.messageList[i].foods[j]);
          }
          try{
            wx.setStorageSync('cart', arr);
          }catch(e){
            console.log(e);
          }
          return;
        }
      }
    }
},
dishCountSub:function(e){
  this.setData({
    toastHidden:false
  });
  //遍历列表
  for(var i in this.data.messageList){
    //列表中一项item的id==点击事件传输的id
    for(var j in this.data.messageList[i].foods){
      if(this.data.messageList[i].foods[j].id == e.target.id.substring(3)){
        //获得该id对应的数量
        var count = this.data.messageList[i].foods[j].count;
        if(count>=1){
          this.data.messageList[i].foods[j].count -= Number(1);
        }else{
          this.data.messageList[i].foods[j].count = 0
        }
        this.setData({
          messageList :this.data.messageList
        });
        var arr = wx.getStorageSync('cart')||[]
        if(arr.length>0){
          console.log("qi");
          for(var z in arr){
            if(arr[z].id == e.target.id.substring(3)){
              arr[z].count -= Number(1);
              if(arr[z].count <=0){
                if(arr.length > 1){
                  for(var w=z;w<arr.lenght;w++){
                    arr[w] = arr[w+1];
                  }
                  arr.pop();//删除最后一个
                }
                else{
                  arr = [];
                }
              }
              try{
                wx.setStorageSync('cart', arr);
              }catch(e){
                console.log(e);
              }
              return; 
            }
          }
        }
        else{
          wx.setStorageSync('cart', [])
        }

      }
    }
  }
},
onShow:function(e){
  console.log("index.page");
  var arr = wx.getStorageSync('cart') || [];//本地缓存
  var curMessageList = this.data.messageList;
  for(var i in curMessageList){
    for(var j in curMessageList[i].foods)
    {
      curMessageList[i].foods[j].count = Number(0);
    }
  }
  if(arr.length >0){    
    for(var i in arr){
      for(var j in curMessageList){
        for(var z in curMessageList[j].foods){
          if(arr[i].id == curMessageList[j].foods[z].id){
              curMessageList[j].foods[z].count = arr[i].count;
          }
        }
      }
    } 
  }
  this.setData({
    messageList:curMessageList
  });
  const db = wx.cloud.database()
  const _ = db.command
  var that = this
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
},
})
