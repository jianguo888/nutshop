// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
const dbGood = db.collection('goods')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.action == 'search' && event.searchKey) { //搜索商品
    return await dbGood.where({
        name: db.RegExp({
          regexp: event.searchKey,
          options: 'i'
        }),
        status: '上架',
        num: _.gt(0) //剩余数量需要大于0
      })
      .orderBy('_createTime', 'desc').get()
  } else if (event.action == 'getNew') { //获取最新的商品
    return await dbGood.where({
        status: '上架',
        num: _.gt(0) //剩余数量需要大于0
      })
      .orderBy('_createTime', 'desc')
      .get()
  } else if (event.action == 'getHot') { //获取首页推荐位热门商品
    return await dbGood.where({
        status: '上架',
        tuijian: true,
        num: _.gt(0) //剩余数量需要大于0
      })
      .orderBy('_createTime', 'desc')
      .get()
  } else if (event.action == 'seller') { //获取我发布的商品
    return await dbGood.where({
        _openid: wxContext.OPENID
      })
      .get()
  } else { //获取100条菜品
    return await dbGood.where({
      status: '上架',
      num: _.gt(0) //剩余数量需要大于0
    }).get()
  }
}