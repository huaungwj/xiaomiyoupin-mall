import React, { useEffect, useState } from 'react';
import './site-top.less';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeLogin, changeModalVisible } from '../../redux/actions';
import { Dropdown, Menu, Space } from 'antd';
import { Logout, usercenterDetail } from '../../api';
import { localStore } from '../../tools/tools';
import { Link } from 'react-router-dom';

/**
 * 网站头部
 */
function SiteTop(props) {
  const [isLogin, setIsLogin] = useState(false); // 是否是登录的状态
  const [userInfo, setUserInfo] = useState(); //用户信息

  useEffect(() => {
    setIsLogin(props.isLogin);
    if (props.isLogin) {
      reqUserInfo();
    }
    // console.log(props)
  }, [props.isLogin]);

  // 发送请求获取用户信息
  const reqUserInfo = async () => {
    if (props.isLogin) {
      const userInfos = await usercenterDetail();
      setUserInfo(userInfos.data);
      //   console.log(userInfos);
    }
  };

  // 服务声明与政策 弹出模拟框
  const showServiceModal = () => {
    props.changeModalVisible(true);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          rel="nofollow"
          data-target="_blank"
          target="_blank"
          data-src="资质证照"
          href="https://daren.xiaomiyoupin.com/ewen/pageFromId?id=gurkg3d4bh7bbe6q"
        >
          资质证照
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          rel="nofollow"
          data-target="_blank"
          target="_blank"
          data-src="协议规则"
          href="https://daren.xiaomiyoupin.com/ewen/pageFromId?id=ytf4mzipem9cr7fj"
        >
          协议规则
        </a>
      </Menu.Item>
    </Menu>
  );

  // 退出登录
  const currLogout = async () => {
    const res = await Logout();
    if (res.status) {
      // 退出登录
      localStore.clear('token');
      props.changeLogin(false);
    }
  };

  // 个人中心菜单
  const PersonalCenterMenu = (
    <Menu>
      <Menu.Item>
        <Link
          target="_blank"
          className="m-btn-default m-btns m-btn-gray"
          to={{ pathname: '/personal-center/orders/3' }}
          rel="nofollow"
          data-target="_blank"
          data-host={props.domain}
          data-src="/personal-center/orders"
          className="m-safe-anchor"
        >
          我的订单
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          target="_blank"
          className="m-btn-default m-btns m-btn-gray"
          to={{ pathname: '/personal-center/orders/6' }}
          rel="nofollow"
          data-target="_blank"
          data-host={props.domain}
          data-src="/personal-center/orders/6"
          className="m-safe-anchor"
        >
          退款/售后
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          target="_blank"
          className="m-btn-default m-btns m-btn-gray"
          to={{ pathname: '/personal-center/assets' }}
          rel="nofollow"
          data-target="_blank"
          data-host={props.domain}
          data-src="/personal-center/assets"
          className="m-safe-anchor"
        >
          我的资产
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          target="_blank"
          className="m-btn-default m-btns m-btn-gray"
          to={{ pathname: '/personal-center/collections' }}
          rel="nofollow"
          data-target="_blank"
          data-host={props.domain}
          data-src="/personal-center/collections"
          className="m-safe-anchor"
        >
          我的收藏
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          target="_blank"
          className="m-btn-default m-btns m-btn-gray"
          to={{ pathname: '/personal-center/address' }}
          rel="nofollow"
          data-target="_blank"
          data-host={props.domain}
          data-src="/personal-center/address"
          className="m-safe-anchor"
        >
          地址管理
        </Link>
      </Menu.Item>
      <Menu.Item>
        <a rel="nofollow" href="#!" onClick={currLogout}>
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="site-top">
      <div className="container">
        <ul className="nav">
          <li className="nav_item login">
            {isLogin ? (
              <Dropdown overlay={PersonalCenterMenu} placement="bottomCenter">
                <div className="site-item m-user-con">
                  <div className="login-info">
                    <a
                      className="m-safe-anchor m-user"
                      data-src="/personal-center/orders"
                      data-host={props.domain}
                    >
                      <span
                        className="m-icons m-icons-user-active h-icons h-user-icon"
                        style={{
                          background: `url(${userInfo?.avatar}) center center / 100% no-repeat`,
                          borderRadius: '50%',
                        }}
                      ></span>
                      <span className="m-username">{userInfo?.nickname}</span>
                      <i className="iconfont icondown"></i>
                    </a>
                  </div>
                </div>
              </Dropdown>
            ) : (
              <Space>
                <a onClick={showServiceModal}>登录</a>
                <a>注册</a>
              </Space>
            )}
          </li>
          <span className="m-line"></span>
          <li className="nav_item help">
            <a>帮助中心</a>
          </li>
          <span className="m-line"></span>
          <li className="nav_item help">
            <i className="iconfont iconmoblie"></i>
            <a>下载App</a>
          </li>
          <span className="m-line"></span>
          <Dropdown overlay={menu} placement="bottomLeft">
            <li className="nav_item clauses">
              <div>
                <a>资质证照 / 协议规则</a>
                <i className="iconfont icondown"></i>
              </div>
            </li>
          </Dropdown>
        </ul>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    domain: state.doMain,
    isLogin: state.isLogin,
    isModalStatus: state.isModalStatus,
  }),
  { changeLogin, changeModalVisible }
)(withRouter(SiteTop));
