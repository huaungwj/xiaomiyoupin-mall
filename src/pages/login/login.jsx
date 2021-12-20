import React, { useEffect, useState } from 'react';
import './login.less';
import { Form, message, Spin } from 'antd';
import { Redirect } from 'react-router-dom';
import { validateLogin } from '../../api';
import { connect } from 'react-redux';
import { changeLogin } from '../../redux/actions';
import { parseSearchParams } from '../../tools/tools';
import { localStore } from '../../tools/tools';
import md5 from 'md5';

function Login(props) {
  const [username, setUserName] = useState('leijun@xiaomi.com');
  const [password, setPassWord] = useState('18200975370');
  const [callbacks, setCallback] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(props);
    setCallback(parseSearchParams(props.location.search));

    return () => {
      Login = null;
      setUserName('');
      setPassWord('');
      setCallback('');
    };
  }, []);

  useEffect(() => {
    // console.log(props.domain);
    // console.log(callbacks.callback?.split(props.domain));
    if (callbacks.callback) {
      if (props.isLogin && callbacks.callback) {
        // 当前登录状态重定向
        props.changeLogin(props.isLogin);
        message.success('登录成功~');
      } else if (!callbacks.callback) {
        props.history.replace('/');
      }
    }
  }, [callbacks]);

  // 验证通过登录
  const onFinish = async (values) => {
    setLoading(true);
    if (username.trim() && password.trim()) {
      //   console.log(md5(md5(password) + 'xiaohai'));
      const res = await validateLogin(username, md5(md5(password) + 'xiaohai'));
      //   console.log(res);

      if (res.status) {
        message.success('登录成功...');
        // 保存 token
        localStore.set('token', res.data.token);
        props.changeLogin(true);
        setLoading(false);
        // props.history.replace(callbacks.callback.slice(props.domain));
        // props.history.go(-1);
      } else {
        message.error(res.message);
        setLoading(false);
        setUserName('');
        setPassWord('');
      }
    } else {
      setLoading(false);
      message.error('请输入用户名密码');
    }
    // console.log(values);
  };
  // 验证不通过
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };
  // username改变
  const userNameChange = (e) => {
    // console.log(e.target.value);
    setUserName(e.target.value);
  };
  // password改变
  const passWordChange = (e) => {
    // console.log(e.target.value);
    setPassWord(e.target.value);
  };
  const messageInfo = (info) => {
    message.success(info);
  };

  return (
    <div>
      {props.isLogin ? (
        <Redirect to={callbacks} />
      ) : (
        <div className="login-wrapper">
          {/* lodding... */}
          <Spin spinning={loading} tip="正在检测你的账号信息">
            {/* 登录部分 */}
            <div className="wrap">
              <div className="layout_panel">
                <div className="layout" id="layout">
                  <div className="main-content">
                    {/* 表单输入登录 */}
                    <div className="mainbox form-panel" id="login-main">
                      {/* 扫码登录 */}
                      <div id="custom_display_2">
                        <a className="ercode" id="qrcode-trigger"></a>
                      </div>
                      {/* header */}
                      <div className="lgnheader">
                        <em id="custom_display_1" className="milogo">
                          {' '}
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {' '}
                            <g id="48*48">
                              {' '}
                              <mask
                                id="mask0"
                                mask-type="alpha"
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="48"
                                height="48"
                              >
                                {' '}
                                <path
                                  id="Clip 2"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0 3.05176e-05H48V47.9998H0V3.05176e-05Z"
                                  fill="white"
                                ></path>{' '}
                              </mask>{' '}
                              <g mask="url(#mask0)">
                                {' '}
                                <path
                                  id="Fill 1"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M42.9972 5.015C38.4683 0.503953 31.9571 0 24.0001 0C16.0329 0 9.51214 0.509889 4.98532 5.03265C0.459587 9.55464 0 16.0649 0 24.0234C0 31.9816 0.459587 38.4954 4.98719 43.018C9.51418 47.5421 16.0334 47.9998 24.0001 47.9998C31.9665 47.9998 38.4858 47.5421 43.013 43.018C47.5398 38.4939 48 31.9816 48 24.0234C48 16.0548 47.5343 9.53698 42.9972 5.015Z"
                                  fill="#FF6900"
                                ></path>{' '}
                                <path
                                  id="Fill 3"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M22.2335 32.8946C22.2335 33.0556 22.0979 33.1892 21.9328 33.1892H17.8394C17.6715 33.1892 17.5353 33.0556 17.5353 32.8946V22.19C17.5353 22.0276 17.6715 21.8946 17.8394 21.8946H21.9328C22.0979 21.8946 22.2335 22.0276 22.2335 22.19V32.8946Z"
                                  fill="white"
                                ></path>{' '}
                                <path
                                  id="Fill 5"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M30.248 32.8946C30.248 33.0556 30.1118 33.1892 29.9461 33.1892H26.0497C25.8826 33.1892 25.7464 33.0556 25.7464 32.8946V32.8546V23.6589C25.7423 22.0465 25.6501 20.3892 24.8177 19.5562C24.1019 18.8383 22.7672 18.6738 21.3787 18.6393H14.3157C14.149 18.6393 14.0144 18.7733 14.0144 18.9345V31.9287V32.8946C14.0144 33.0556 13.8769 33.1892 13.7102 33.1892H9.81124C9.64471 33.1892 9.51068 33.0556 9.51068 32.8946V15.1074C9.51068 14.9441 9.64471 14.8113 9.81124 14.8113H21.0604C24.0003 14.8113 27.0737 14.9454 28.5895 16.4632C30.1118 17.9877 30.248 21.0556 30.248 23.9989V32.8946Z"
                                  fill="white"
                                ></path>{' '}
                                <path
                                  id="Fill 7"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M38.2749 32.8946C38.2749 33.0556 38.1372 33.1892 37.9721 33.1892H34.0738C33.9072 33.1892 33.7718 33.0556 33.7718 32.8946V15.1074C33.7718 14.9441 33.9072 14.8113 34.0738 14.8113H37.9721C38.1372 14.8113 38.2749 14.9441 38.2749 15.1074V32.8946Z"
                                  fill="white"
                                ></path>{' '}
                              </g>{' '}
                            </g>{' '}
                          </svg>{' '}
                        </em>
                        <h4 className="header_tit_txt" id="login-title">
                          小米帐号登录
                        </h4>
                        <div className="site_info"></div>
                      </div>
                      {/* tabs form表单输入 */}
                      <div className="tabs-con tabs_con now ">
                        <div className="login-area" id="login-main-form">
                          <div className="loginbox c_b">
                            {/* 表单 */}
                            <Form
                              name="basic"
                              onFinish={onFinish}
                              onFinishFailed={onFinishFailed}
                            >
                              <Form.Item>
                                <input
                                  readOnly={true}
                                  onChange={userNameChange}
                                  value={username}
                                  className="item_account"
                                  type="text"
                                  name="user"
                                  id="username"
                                  placeholder="邮箱/手机号码/小米ID"
                                />
                              </Form.Item>

                              <Form.Item>
                                <input
                                  readOnly={true}
                                  type="password"
                                  onChange={passWordChange}
                                  value={password}
                                  className="item_account"
                                  placeholder="密码"
                                  id="pwd"
                                  name="password"
                                />
                              </Form.Item>

                              <Form.Item>
                                <button
                                  className="btnadpt"
                                  id="login-button"
                                  htmltype="submit"
                                >
                                  登录
                                </button>
                              </Form.Item>
                            </Form>

                            {/* 其他方式登录 */}
                            <div className="other_panel">
                              {/* 手机短信登陆/注册 */}
                              <a
                                className="btnadpt btn_gray login_type_link"
                                id="ChangeLoginType"
                                onClick={() => {
                                  messageInfo('手机短信登录暂未开放');
                                }}
                              >
                                手机短信登录/注册
                              </a>
                              {/* 立即注册 | 忘记密码 */}
                              <div className="reverse">
                                <div className="n_links_area reg_forget_links reg-forget-links">
                                  <a
                                    className="outer-link"
                                    onClick={() => {
                                      messageInfo('注册功能暂未开放！');
                                    }}
                                  >
                                    立即注册
                                  </a>
                                  <span>|</span>
                                  <a
                                    className="outer-link"
                                    href="https://account.xiaomi.com/pass/forgetPassword?sid=miotstore&amp;_bannerBiz=miotstore&amp;callback=https%3A%2F%2Fshopapi.io.mi.com%2Fapp%2Fshop%2Fauth%3Fsid%3Dmiotstore%26logid%3D1621854824.634443104%26sign%3D63e57f3072eb2c992882cf5e2d655dc2%26followup%3Dhttps%253A%252F%252Fwww.xiaomiyoupin.com%252Fsearch%253Fkeyword%253D%2525E5%2525B0%25258F%2525E7%2525B1%2525B3"
                                  >
                                    忘记密码？
                                  </a>
                                </div>
                              </div>
                              {/* 其他方式登录 */}
                              <div className="other_login_type sns-login-container">
                                <fieldset className="oth_type_tit">
                                  <legend
                                    align="center"
                                    className="oth_type_txt"
                                  >
                                    其他方式登录
                                  </legend>
                                </fieldset>
                                <div
                                  id="sns-login-links"
                                  className="oth_type_links"
                                >
                                  <a
                                    className="icon_type btn_qq sns-login-link"
                                    data-type="qq"
                                    href="/pass/sns/login/auth?appid=100284651&amp;&amp;callback=https%3A%2F%2Fshopapi.io.mi.com%2Fapp%2Fshop%2Fauth%3Fsid%3Dmiotstore%26logid%3D1621854824.634443104%26sign%3D63e57f3072eb2c992882cf5e2d655dc2%26followup%3Dhttps%253A%252F%252Fwww.xiaomiyoupin.com%252Fsearch%253Fkeyword%253D%2525E5%2525B0%25258F%2525E7%2525B1%2525B3&amp;sid=miotstore"
                                    title="QQ登录"
                                    target="_blank"
                                  >
                                    <i className="btn_sns_icontype icon_default_qq"></i>
                                  </a>
                                  <a
                                    className="icon_type btn_weibo sns-login-link"
                                    data-type="weibo"
                                    href="/pass/sns/login/auth?appid=2996826273&amp;&amp;callback=https%3A%2F%2Fshopapi.io.mi.com%2Fapp%2Fshop%2Fauth%3Fsid%3Dmiotstore%26logid%3D1621854824.634443104%26sign%3D63e57f3072eb2c992882cf5e2d655dc2%26followup%3Dhttps%253A%252F%252Fwww.xiaomiyoupin.com%252Fsearch%253Fkeyword%253D%2525E5%2525B0%25258F%2525E7%2525B1%2525B3&amp;sid=miotstore"
                                    title="微博登录"
                                    target="_blank"
                                  >
                                    <i className="btn_sns_icontype icon_default_weibo"></i>
                                  </a>
                                  <a
                                    className="icon_type btn_alipay sns-login-link"
                                    data-type="alipay"
                                    href="/pass/sns/login/auth?appid=2088011127562160&amp;&amp;callback=https%3A%2F%2Fshopapi.io.mi.com%2Fapp%2Fshop%2Fauth%3Fsid%3Dmiotstore%26logid%3D1621854824.634443104%26sign%3D63e57f3072eb2c992882cf5e2d655dc2%26followup%3Dhttps%253A%252F%252Fwww.xiaomiyoupin.com%252Fsearch%253Fkeyword%253D%2525E5%2525B0%25258F%2525E7%2525B1%2525B3&amp;sid=miotstore"
                                    title="支付宝登录"
                                    target="_blank"
                                  >
                                    <i className="btn_sns_icontype icon_default_alipay"></i>
                                  </a>
                                  <a
                                    className="icon_type btn_weixin sns-login-link"
                                    data-type="weixin"
                                    href="/pass/sns/login/auth?appid=wxxmzh&amp;scope=snsapi_login&amp;callback=https%3A%2F%2Fshopapi.io.mi.com%2Fapp%2Fshop%2Fauth%3Fsid%3Dmiotstore%26logid%3D1621854824.634443104%26sign%3D63e57f3072eb2c992882cf5e2d655dc2%26followup%3Dhttps%253A%252F%252Fwww.xiaomiyoupin.com%252Fsearch%253Fkeyword%253D%2525E5%2525B0%25258F%2525E7%2525B1%2525B3&amp;sid=miotstore"
                                    title="微信登录"
                                    target="_blank"
                                  >
                                    <i className="btn_sns_icontype icon_default_weixin"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="n-footer" id="custom_display_4">
              <div className="nf-link-area ">
                {/* 语言选择 */}
                <ul className="lang-select-list">
                  <li>
                    <a data-lang="zh_CN" className="lang-select-li current">
                      简体
                    </a>
                    |
                  </li>{' '}
                  <li>
                    <a
                      href="?sid=miotstore&amp;_bannerBiz=miotstore&amp;callback=https%3A%2F%2Fshopapi.io.mi.com%2Fapp%2Fshop%2Fauth%3Fsid%3Dmiotstore%26logid%3D1621854824.634443104%26sign%3D63e57f3072eb2c992882cf5e2d655dc2%26followup%3Dhttps%253A%252F%252Fwww.xiaomiyoupin.com%252Fsearch%253Fkeyword%253D%2525E5%2525B0%25258F%2525E7%2525B1%2525B3&amp;_locale=zh_TW"
                      data-lang="zh_TW"
                      className="lang-select-li"
                    >
                      繁体
                    </a>
                    |
                  </li>{' '}
                  <li>
                    <a
                      href="?sid=miotstore&amp;_bannerBiz=miotstore&amp;callback=https%3A%2F%2Fshopapi.io.mi.com%2Fapp%2Fshop%2Fauth%3Fsid%3Dmiotstore%26logid%3D1621854824.634443104%26sign%3D63e57f3072eb2c992882cf5e2d655dc2%26followup%3Dhttps%253A%252F%252Fwww.xiaomiyoupin.com%252Fsearch%253Fkeyword%253D%2525E5%2525B0%25258F%2525E7%2525B1%2525B3&amp;_locale=en"
                      data-lang="en"
                      className="lang-select-li"
                    >
                      English
                    </a>
                    |
                  </li>{' '}
                  <li>
                    <a
                      href="https://account.xiaomi.com/helpcenter/faq"
                      target="_blank"
                    >
                      常见问题
                    </a>
                    |
                  </li>{' '}
                  <li>
                    <a
                      id="msg-privacy"
                      href="/about/protocol/privacy"
                      target="_blank"
                    >
                      隐私政策
                    </a>
                  </li>
                </ul>

                <p className="nf-intro">
                  小米公司版权所有-京ICP备10046444-
                  <a
                    className="beian-record-link"
                    target="_blank"
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020134"
                  />
                  <span>
                    <img src="https://account.xiaomi.com/static/res/9204d06/account-static/respassport/acc-2014/img/ghs.png" />
                  </span>
                  京公网安备11010802020134号-京ICP证110507号
                </p>
              </div>
            </div>
          </Spin>
        </div>
      )}
    </div>
  );
}

export default connect(
  (state) => ({ domain: state.doMain, isLogin: state.isLogin }),
  { changeLogin }
)(Login);
