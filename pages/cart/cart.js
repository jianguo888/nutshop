const app = getApp()
Page({
  data: {
    cartList: [],
    totalPrice: 0, // 总价，初始为0
    totalNum: 0, //总数，初始为0
  },
  onShow() {
    let cartList = wx.getStorageSync('cart') || [];
    this.setData({
      cartList
    })
    this.getTotalPrice();
  },
  //去商品详情页
  goDetail(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?goodid=' + e.currentTarget.dataset.id
    })
  },
  // 获取购物车总价、总数
  getTotalPrice() {
    var cartList = this.data.cartList; // 获取购物车列表
    var totalP = 0;
    var totalN = 0
    for (var i in cartList) { // 循环列表得到每个数据
      totalP += cartList[i].quantity * cartList[i].price; // 所有价格加起来     
      totalN += cartList[i].quantity
    }
    this.setData({ // 最后赋值到data中渲染到页面
      cartList: cartList,
      totalNum: totalN,
      totalPrice: totalP.toFixed(2)
    });
  },
  // 购物车增加数量
  addCount(e) {
    let item = e.currentTarget.dataset.item;
    let arr = wx.getStorageSync('cart') || [];
    let f = false;
    if (arr.length > 0) {
      for (let j in arr) { // 遍历购物车找到被点击的商品，数量加1
        if (arr[j]._id == item._id) {
          arr[j].quantity += 1;
          f = true;
          try {
            wx.setStorageSync('cart', arr)
          } catch (e) {
            console.log(e)
          }
          break;
        }
      }
      if (!f) {
        arr.push(item);
      }
    } else {
      arr.push(item);
    }
    try {
      wx.setStorageSync('cart', arr)
    } catch (e) {
      console.log(e)
    }
    this.setData({
      cartList: arr,
    }, success => {
      this.getTotalPrice();
    })

  },
  //购物车减少数量
  minusCount(e) {
    let item = e.currentTarget.dataset.item;
    let cartList = wx.getStorageSync('cart') || [];
    if (cartList.length > 0) {
      for (let j in cartList) {
        if (cartList[j]._id == item._id) {
          cartList[j].quantity ? cartList[j].quantity -= 1 : 0
          if (cartList[j].quantity <= 0) {
            //购买数里为0就从购物车里删除
            this.removeByValue(cartList, item._id)
          }
          if (cartList.length <= 0) {
            this.setData({
              cartList: [],
              totalNum: 0,
              totalPrice: 0
            })
          }
          try {
            wx.setStorageSync('cart', cartList)
          } catch (e) {
            console.log(e)
          }
        }
      }
    }
    this.setData({
      cartList: cartList
    }, success => {
      this.getTotalPrice();
    })
  },
  // 定义根据id删除数组的方法
  removeByValue(array, id) {
    for (var i = 0; i < array.length; i++) {
      if (array[i]._id == id) {
        array.splice(i, 1);
        break;
      }
    }
  },
  //删除购物车单项
  deleteOne(e) {
    var index = e.currentTarget.dataset.index;
    var arr = wx.getStorageSync('cart')
    arr.splice(index, 1);
    if (arr.length <= 0) {
      this.setData({
        cartList: [],
        totalNum: 0,
        totalPrice: 0
      })
    }
    try {
      wx.setStorageSync('cart', arr)
    } catch (e) {
      console.log(e)
    }
    this.setData({
      cartList: arr
    }, success => {
      this.getTotalPrice();
    })
  },
  goMall() {
    wx.switchTab({
      url: '/pages/mall/mall',
    })
  },
  //去支付
  gotoOrder: function () {
    let userInfo = app.globalData.userInfo;
    if (!userInfo || !userInfo.nickName) {
      wx.showToast({
        icon: 'none',
        title: '请去个人中心先登录',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    })
  },


})