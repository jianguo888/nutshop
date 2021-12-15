Page({
  data: {
    isShowAddressSetting: false,
    //店铺经纬度
    latitude: 37.948493,
    longitude:    102.64434,
    //标记点
    markers: [{
      id: 0,
      name: "坚果前端",
      address: "浙江省宁波市",
      latitude: 37.948493,
      longitude:     102.64434,
      width: 50,
      height: 50
    }]
,
  },
  //拨打电话
  Call() {
    wx.makePhoneCall({
      phoneNumber: '17752170152' //仅为示例，这个号码也是我的微信号
    })
  },
  //复制微信
  Copy() {
    wx.setClipboardData({
      data: '17752170152',
    })
  },
  //导航
  navRoad(event) {
    console.log(event)
    wx.getLocation({ //获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，
      success: res => {
        console.log('授权成功', res)
        wx.openLocation({ //​使用微信内置地图查看位置。
          latitude: event.currentTarget.dataset.marker.latitude, //要去的纬度-地址
          longitude: event.currentTarget.dataset.marker.longitude, //要去的经度-地址
          name: event.currentTarget.dataset.marker.name,
          address: event.currentTarget.dataset.marker.address
        })
      },
      fail: res => {
        console.log('授权失败', res)
        this.setData({
          isShowAddressSetting: true
        })
      }
    })
  },
  //关闭未授权弹窗
  closeSettingView() {
    this.setData({
      isShowAddressSetting: false
    })
  }
})