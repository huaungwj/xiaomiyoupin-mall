import { changeCartGoodSel } from '../api';

/**
 * 封装工具函数
 */

export const parseSearchParams = (searchParamsString) => {
  const theRequest = new Object();
  searchParamsString = decodeURIComponent(searchParamsString);
  if (searchParamsString.indexOf('?') != -1) {
    let str = searchParamsString.substr(1);
    let strs = str.split('&');
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
  }
  return theRequest;
};

// 判断手机号的正则
export const phoneFun = (phones) => {
  const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
  if (!myreg.test(phones)) {
    // console.log("手机号格式不正确");
    return false;
  } else {
    // console.log("手机号格式正确");
    return true;
  }
};

// 判断邮箱的正则
export const emailFun = (email) => {
  const emailPattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  if (!emailPattern.test(email)) {
    return false;
  } else {
    return true;
  }
};

// 判断纳税人识别号的正则
export const invoiceCompanyCodeFun = (code) => {
  const companyCode =
    /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;

  if (!companyCode.test(code)) {
    return false;
  } else {
    return true;
  }
};

// 判断银行卡号码正则
export const bankCodeFun = (code) => {
  const bankCodeReg = /^([1-9]{1})(\d{14}|\d{18})$/;
  if (!bankCodeReg.test(code)) {
    return false;
  } else {
    return true;
  }
};

// 判断企业电话号码正则
export const checkEnterPrisePhone = (strPhone) => {
  const phoneRegWithArea =
    /0\d{2,3}-\d{7,8}|\(?0\d{2,3}[)-]?\d{7,8}|\(?0\d{2,3}[)-]*\d{7,8}/;
  // const phoneRegWithArea = /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/;

  if (phoneRegWithArea.test(strPhone)) {
    return true;
  } else {
    return false;
  }
};
// 取消请求操作
const allPendingRequestsRecord = [];
const pending = {};
const removeAllPendingRequestsRecord = () => {
  allPendingRequestsRecord &&
    allPendingRequestsRecord.forEach((func) => {
      // 取消请求（调用函数就是取消该请求）
      func('路由跳转了取消所有请求');
    });
  // 移除所有记录
  allPendingRequestsRecord.splice(0);
};

// 取消同一个重复的ajax请求
const removePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]('取消重复请求');
  }
  delete pending[key];
};

// 取消所有请求的函数
export const getConfirmation = (mes = '', callback = () => {}) => {
  removeAllPendingRequestsRecord();
  callback();
};

// 请求修改购物车商品选中状态
export const reqChangeCartGoodSel = async (items) => {
  const res = await changeCartGoodSel(items);
  //   console.log(res);
};

export const linkProductDetail = (domain, gid) => {
  // console.log("1123");
  window.open(domain.concat(`/detail?gid=${gid}`));
};

export const linkTo = (domain, url) => {
  window.open(domain.concat(url));
};

//localStorage 本地存储
export const localStore = {
  // 本地存储
  set: function (name, value, day) {
    // 设置
    let d = new Date();
    let time = 0;
    day = typeof day === 'undefined' || !day ? 1 : day; // 时间,默认存储1天
    time = d.setHours(d.getHours() + 24 * day); // 毫秒
    localStorage.setItem(
      name,
      JSON.stringify({
        data: value,
        time: time,
      })
    );
  },
  get: function (name) {
    // 获取
    let data = localStorage.getItem(name);
    if (!data) {
      return null;
    }
    let obj = JSON.parse(data);
    if (new Date().getTime() > obj.time) {
      // 过期
      localStorage.removeItem(name);
      return null;
    } else {
      return obj.data;
    }
  },
  clear: function (name) {
    // 清空
    if (name) {
      // 删除键为name的缓存
      localStorage.removeItem(name);
    } else {
      // 清空全部
      localStorage.clear();
    }
  },
};
