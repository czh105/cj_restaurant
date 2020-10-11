// tabbar/popup.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots:true// 在组件定义时的选项中启用多slot支持
  },
  properties: {
    title:{
      type:String,
      value:"标题"
    },
    //弹窗内容
    content:{
      type:String,
      value:'地址'
    },
    //取消
    btn_no:{
      type:String,
      value:'取消'
    },
    btn_ok:{
      type:String,
      value:"确定"
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    flag:true,
    address:"",//地址
    phone:"",//电话
    tip:""//备注
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //隐藏弹出
    hidePopup:function(){
      this.setData({
        flag:!this.data.flag
      })
    },
    showPopup:function(){
      this.setData({
        flag:!this.data.flag
      })
    },
    getMessage:function(){
      var isPhone = false;
      var str = /^1\d{10}$/
      if(str.test(this.data.phone)){
        isPhone = true;
      }
      if(this.data.phone.length === 11 && this.data.address && isPhone){
        this.setData({
          flag:true
        });
        return this.data;
      }else{
        this.setData({
          flag:false
        });
        return this.data;
      }
    },
    _success(){
      this.triggerEvent("sucess");
      //返回数据
      var isPhone = false;
      var str = /^1\d{10}$/
      if(str.test(this.data.phone)){
        isPhone = true;
      }
      if(this.data.address && this.data.phone.length === 11 && isPhone){
        this.setData({
          flag:true
        });
      }else{
        this.setData({
          flag:false
        });
        wx.showToast({
          title: '输入格式错误',
          duration:3000,
          mask:false
        })
      }
    },
    _userAddressInput(e){
      if(e.detail.value != null){
        this.setData({
          address:e.detail.value
        });
      }
    },
    _userPhoneInput(e){
      if(e.detail.value != null){
        var index= e.detail.value.length -1        
        var num = parseInt(e.detail.value[index]);
        console.log(num);
        if(num==NaN){
          e.detail.value = this.data.phone
          this.setData({
            phone:this.data.phone
          })
        }
        else if(num >=0 && num<=9){
          this.setData({
            phone:e.detail.value
          });
        }
      }
    },
    _userTipInput(e){
      if(e.detail.value != null){
        this.setData({
          tip:e.detail.value
        });
      }
    }, 
    _cancel(){
      this.triggerEvent("cancel");
      console.log("cancel");
      this.setData({
        flag:true
      });
    },
  }//展示窗口 
})
