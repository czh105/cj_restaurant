var config = {
  data:{
    phone:"13750742916"
  },
  callPhone:function(){
    wx.makePhoneCall({
      phoneNumber:this.data.phone 
    })
  }
}
module.exports = config