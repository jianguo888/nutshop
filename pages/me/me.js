/**
 * 作者：编程小石头
 * 微信：2501902696
 */
const app = getApp();
Page({
  // 页面的初始数据
  data: {
    isShowUserName: false,
    userInfo: null,
  },
   //获取用户信息
   getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log("获取用户信息成功", res)
        let user = res.userInfo
        this.setData({
          isShowUserName: true,
          userInfo: user,
        })
        user.openid = app.globalData.openid;
        app._saveUserInfo(user);
      },
      fail: res => {
        console.log("获取用户信息失败", res)
      }
    })
  },

  //退出登录
  tuichu() {
    this.setData({
      isShowUserName: false,
      userInfo: null,
    })
    app._saveUserInfo(null);
  },
  // 去我的订单页
  goToMyOrder: function () {
    wx.navigateTo({
      url: '/pages/myOrder/myOrder',
    })
  },
  // 去我的评论页
  goToMyComment: function () {
    wx.navigateTo({
      url: '/pages/myComment/myComment',
    })
  },
  onShow() {
    var user = app.globalData.userInfo;
    if (user && user.nickName) {
      this.setData({
        isShowUserName: true,
        userInfo: user,
      })
    }
  },
})