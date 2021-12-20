/**
 * 封装能发ajax请求的函数 json格式转换为urlencode
 * 1. 解决了post请求携带参数的问题：默认是json格式，需要转换成urlencode格式。(使用请求拦截器进行操作)
 * 2. 让请求成功的结果不再是response，而是response.data 的数据
 * 3. 统一处理所有请求的异常错误
 */
import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
import { localStore } from '../tools/tools';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;

// 添加请求拦截器：让post请求的请求体格式为urlencoded格式  a=1&b=2
// 发请求前进行拦截
axios.interceptors.request.use(function (config) {
  // 得到请求方式和请求体数据
  const { method, data } = config;
  // 处理post请求，将data对象转换为query参数格式的字符串
  if (method.toLowerCase() === 'post' && typeof data === 'object') {
    config.data = qs.stringify(data);
  }

  const token = localStore.get('token');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Accept'] = 'application/json';
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    // store.dispatch('logined', localStorage.token)
  }

  return config;
});

// 添加响应拦截器：让响应过来的数据进行处理
// 让请求成功的结果不再是response，而是response.data的数-据
// 在我们请求数据响应数据的回调函数之前
axios.interceptors.response.use(
  function (response) {
    return response.data; // 这个返回的数据结果就会返回到我们请求响应的回调函数的结果
  },
  function (error) {
    // 处理401 未登录
    if (!error.response) return;

    if (error.response.status === 401) {
      // 未登录
      message.error('请登录');
      return new Promise(() => {});
    }
    // 统一处理所有请求异常错误
    message.error('请求出错' + error.message); // 默认会阻止错误的事件往下执行

    return new Promise(() => {});
  }
);

export default axios;
