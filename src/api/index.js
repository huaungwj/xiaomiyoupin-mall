/**
 * @author [黄伟绩]
 * @email [1835773652@qq.com]
 * @create date 2021-12-20 16:34:25
 * @modify date 2021-12-20 16:34:25
 * @desc [description]
 */
/**
 * 包含整个项目中所有的请求接口函数： 接口请求函数
 * 函数的返回值是promise对象
 */

import ajax from './ajax';

// 请求的url
// const domain = 'http://127.0.0.1:7001';
const domain = 'https://mall.weikill.club';

/**
 * 根据key获取国内的地址， 在 application 中应用在添加地址中
 * @param {*} key
 */
export const reqAddress = (key) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/address/get`,
    data: {
      key: key ? key : '',
    },
  });
};

/**
 * 登录
 * @param {*} username 用户名
 * @param {*} password 密码
 * @returns promise
 */
export const validateLogin = (username, password) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/user/login`,
    data: { username, password },
    // 跨域cookie必须携带
  });
};

/**
 * 验证是否登录
 * @returns promise
 */
export const isloggedin = () => {
  return ajax({
    method: 'post',
    url: `${domain}/default/user/isloggedin`,
    data: {},
  });
};

/**
 * 退出登录
 * @returns
 */
export const Logout = () => {
  return ajax({
    method: 'post',
    url: `${domain}/default/user/logout`,
    data: {},
  });
};

/**
 * 用户信息等
 * @returns
 */
export const usercenterDetail = () => {
  return ajax({
    method: 'post',
    url: `${domain}/default/user/usercenterDetail`,
    data: {},
  });
};

/**
 * 获取主页分类列表 catelist
 * @returns
 */
export const reqCateList = () => {
  return ajax({
    method: 'post',
    url: `${domain}/default/cat/list`,
    data: {},
  });
};

/**
 * 获取详细分类列表 子分类
 * @param {*} catId
 * @returns
 */
export const reqcateDetail = (catId) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/cat/detail`,
    data: { catId },
  });
};

/**
 * 主页数据接口
 * @param {*} platform
 * @returns
 */
export const main = (platform) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/main/v1002`,
    data: { platform },
    withCredentialsL: true,
  });
};

/**
 * 商品详情
 * @param {*} groupParams
 * @returns
 */
export const goodsDetail = (groupParams) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/goods/detail`,
    data: { groupParams: Number(groupParams) },
  });
};

/**
 * 搜索检索提示
 * @param {*} key
 * @returns
 */
export const getSearchKey = (key) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/goods/getSearchKey`,
    data: { key: key },
  });
};

/**
 * 根据 keyword 进行搜索
 * @param {*} keyWord
 * @param {*} pageNum
 * @param {*} pageSize
 * @returns
 */
export const doSearch = (keyWord, pageNum, pageSize) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/goods/doSearch`,
    data: { queryName: keyWord, pageNum, pageSize },
  });
};

/**
 * 搜索参数数据， 返回推荐数据
 * @param {*} count
 * @returns
 */
export const metisCart = (count) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/goods/metisCart`,
    data: { count },
  });
};

/**
 * 主页分类 根据queryId 进行搜索
 * @param {*} queryId
 * @param {*} queryString
 * @param {*} pageNum
 * @param {*} pageSize
 * @returns
 */
export const queryIdSearch = (queryId, queryString, pageNum, pageSize) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/goods/queryIdSearch`,
    data: {
      queryId,
      queryString,
      pageNum,
      pageSize,
    },
  });
};

/**
 *  添加购物车
 * @param {*} gid
 * @param {*} pid
 * @param {*} total
 * @param {*} cart_type
 * @returns
 */
export const orderAddCart = (gid, pid, total, cart_type = 0) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/order/cart/add`,
    data: {
      gid,
      pid,
      total,
      cart_type,
    },
  });
};

/**
 * 购物车总条数
 * @returns
 */
export const getCartCount = () => {
  return ajax({
    method: 'post',
    url: `${domain}/default/order/cart/count`,
    data: {},
  });
};

/**
 * 购物车列表
 * @returns
 */
export const getCartList = () => {
  return ajax({
    method: 'post',
    url: `${domain}/default/order/cart/list`,
    data: {},
  });
};

/**
 * 购物车单个商品数量增加或者减少接口
 * @param {*} id
 * @param {*} pid
 * @param {*} goods_num
 * @returns
 */
export const changeCartGoodEdit = (id, pid, goods_num) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/order/cart/cartEdit`,
    data: { id, pid, goods_num },
  });
};

/**
 * 购物车修改选中状态
 * @param {*} data
 * @returns
 */
export const changeCartGoodSel = (data) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/order/cart/sel`,
    data: { data: JSON.stringify(data) },
  });
};

/**
 * 购物车商品删
 * @param {*} id
 * @param {*} pid
 * @returns
 */
export const delCartGood = (id, pid) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/order/cart/del`,
    data: { id, pid },
  });
};

/**
 * 获取用户收货地址列表
 * @returns
 */
export const getAddressList = () => {
  return ajax({
    method: 'post',
    url: `${domain}/default/order/address/getList`,
    data: {},
  });
};

/**
 * 修改默认地址选择
 * @param {*} id
 * @param {*} uid
 * @returns
 */
export const getSetDefault = (id, uid) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/order/address/setDefault`,
    data: { id, uid },
  });
};

/**
 *  获取要显示模拟框的数据
 * @param {*} id
 * @param {*} uid
 * @returns
 */
export const getView = (id, uid) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/order/address/getView`,
    data: { id, uid },
  });
};

/**
 * 修改当前地址的信息
 * @param {*} id
 * @param {*} uid
 * @param {*} consigne
 * @param {*} tel
 * @param {*} province
 * @param {*} city
 * @param {*} area
 * @param {*} street
 * @param {*} detailAddress
 * @param {*} zipcode
 * @param {*} isDefault
 * @returns
 */
export const getUpdateAddress = (
  id,
  uid,
  consigne,
  tel,
  province,
  city,
  area,
  street,
  detailAddress,
  zipcode,
  isDefault
) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/order/address/update`,
    data: {
      id,
      uid,
      consigne,
      tel,
      province,
      city,
      area,
      street,
      detailAddress,
      zipcode,
      isDefault,
    },
  });
};

/**
 * 添加地址
 * @param {*} consigne
 * @param {*} tel
 * @param {*} province
 * @param {*} city
 * @param {*} area
 * @param {*} street
 * @param {*} detailAddress
 * @param {*} zipcode
 * @param {*} isDefault
 * @returns
 */
export const getAddAddress = (
  consigne,
  tel,
  province,
  city,
  area,
  street,
  detailAddress,
  zipcode,
  isDefault
) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/order/address/add`,
    data: {
      consigne,
      tel,
      province,
      city,
      area,
      street,
      detailAddress,
      zipcode,
      isDefault,
    },
  });
};

/**
 * 删除地址
 * @param {*} id
 * @param {*} uid
 * @returns
 */
export const getDelAddress = (id, uid) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/order/address/del`,
    data: { id, uid },
  });
};
/**
 * checkout 商品确认页接口
 * @param {*} cart_type  购物车
 * @returns
 */
export const getCheckoutData = (cart_type = 0) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/order/cart/checkout`,
    data: { cart_type },
  });
};

/**
 * submit 商品提交
 * @param {*} data
 * @param {*} cart_type
 * @returns
 */
export const getSubmitOrder = (data, cart_type = 0) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/order/cart/submit`,
    data: {
      ...data,
      cart_type,
    },
  });
};

/**
 * 通过订单号查询订单信息接口
 * /default/order/orderinfo/orderDetail
 * @param {*} orderId
 * @returns
 */
export const getOrderDetail = (orderId) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/order/orderinfo/detail`,
    data: { orderId },
  });
};

/**
 * 获取支付二维码信息
 * http://49.233.14.172:8888/api/order
 * @param {*} order_id
 * @param {*} order_type
 * @param {*} order_price
 * @param {*} order_name
 * @param {*} sign
 * @param {*} redirect_url
 * @param {*} extension
 * @returns
 */
export const getPayCode = (
  order_id,
  order_type,
  order_price,
  order_name,
  sign,
  redirect_url,
  extension
) => {
  return ajax({
    method: 'post',
    url: `${domain}/api/order`,
    data: {
      order_id,
      order_type,
      order_price,
      order_name: order_name,
      sign,
      redirect_url,
      extension,
    },
    //
  });
};

/**
 * app 根组件调用 用于检测是否有过期的商品等
 * /default/main/pip
 * @returns
 */
export const pip = () => {
  return ajax({
    method: 'post',
    url: `${domain}/default/main/pip`,
    data: {},
  });
};

/**
 * 个人中心订单数据接口
 * /default/order/orderinfo/list
 *
 * @apiParam {pageIndex}  当前页
 * @apiParam {pageSize} 一页需要显示的条数
 * @apiParam {listType} 订单类型 待收货：3， 待付款： 0，已收货：5， 退款订单： 6，全部订单：10，回收站：11
 */

export const getOrderInfo = (pageIndex, pageSize, listType) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/order/orderinfo/list`,
    data: {
      pageIndex,
      pageSize,
      listType,
    },
  });
};

/**
 * 获取订单条数
 *
 * /default/order/getListCount
 *
 * @apiParam {status}  订单状态码
 */
export const getListCount = (status) => {
  return ajax({
    method: 'post',
    url: `${domain}/default/order/getListCount `,
    data: {
      status,
    },
  });
};
