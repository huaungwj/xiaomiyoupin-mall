import React, { Fragment, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { setBreadCrumbArr } from '../../redux/actions';
import Orders from './orders/orders';
import Assets from './assets/assets';
import Collections from './collections/collections';
import Address from './address/address';
import './personal-center.less';
import BreadcrumbNav from '../../component/breadcrumb-nav/breadcrumb-nav';
import OrderDetail from './orders/orderDetail/orderDetail';
import { usercenterDetail } from '../../api';
import NoLogin from '../../component/noLogin/noLogin';

function PersonalCenter(props) {
  const [selectKey, setSelectKey] = useState('/personal-center/orders');
  const [userInfo, setUserInfo] = useState({}); // 用户信息
  useEffect(() => {
    // console.log(props.breadcrumbArr);
    // console.log(props);

    props.setBreadCrumbArr([
      { link: '/', name: '首页' },
      { link: '/personal-center', name: '个人中心' },
      { link: '/personal-center/orders', name: '我的订单' },
    ]);
    reqUserInfo();
  }, []);

  // 发送请求获取用户信息
  const reqUserInfo = async () => {
    const userInfos = await usercenterDetail();
    setUserInfo(userInfos.data);
    //   console.log(userInfos);
  };

  useEffect(() => {
    props.location.pathname.indexOf('/personal-center/orders') !== -1
      ? setSelectKey('/personal-center/orders')
      : setSelectKey(props.location.pathname);
  }, [props.location.pathname]);

  const handleClick = (e) => {
    // console.log('click ', e);
  };

  // 导航到个人中心的子路由
  const linkPersonalCenter = (chilrenRoute) => {
    props.history.push('/personal-center/' + chilrenRoute);
  };

  return (
    <Fragment>
      {props.isLogin ? (
        <div className="personal-center">
          <div className="container">
            {/* 头部辅助导航部分 */}
            <BreadcrumbNav />
            {/* 个人中心内容部分 */}
            <div className="personal-center-content">
              {/* 左边导航条部分 */}
              <Menu
                onClick={handleClick}
                style={{ width: 173 }}
                defaultSelectedKeys={selectKey}
                selectedKeys={selectKey}
                mode="inline"
              >
                <div className="personal-profile">
                  <div
                    className="m-icons m-icons-per-user mijia-personal-profile-photo"
                    style={{
                      backgroundImage: `url(${userInfo.avatar})`,
                      backgroundPosition: 'center center',
                      backgroundSize: '100%',
                    }}
                  ></div>
                  <div className="personal-profile-username">
                    {userInfo.nickname}
                  </div>
                </div>

                <Menu.Item
                  key="/personal-center/orders"
                  onClick={() => {
                    linkPersonalCenter('orders');
                  }}
                >
                  我的订单
                </Menu.Item>
                <Menu.Item
                  key="/personal-center/assets"
                  onClick={() => {
                    linkPersonalCenter('assets');
                  }}
                >
                  我的资产
                </Menu.Item>
                <Menu.Item
                  key="/personal-center/collections"
                  onClick={() => {
                    linkPersonalCenter('collections');
                  }}
                >
                  我的收藏
                </Menu.Item>
                <Menu.Item
                  key="/personal-center/address"
                  onClick={() => {
                    linkPersonalCenter('address');
                  }}
                >
                  地址管理
                </Menu.Item>
              </Menu>
              {/* 右边路由内容部分 */}
              <div className="personal-container-box">
                <div className="personal-main-box">
                  {/* 路由 */}
                  <Switch>
                    <Route
                      path={'/personal-center/orders/:key'}
                      component={Orders}
                    ></Route>
                    <Route
                      path={'/personal-center/assets'}
                      exact
                      component={Assets}
                    ></Route>
                    <Route
                      path={'/personal-center/collections'}
                      exact
                      component={Collections}
                    ></Route>
                    <Route
                      path={'/personal-center/address'}
                      exact
                      component={Address}
                    ></Route>
                    <Route
                      path={'/personal-center/detail/:order_id'}
                      exact
                      component={OrderDetail}
                    ></Route>
                    <Redirect to="/personal-center/orders/3" />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoLogin text={'登录后才能看到个人中心'} />
      )}
    </Fragment>
  );
}

export default connect(
  (state) => ({
    domain: state.doMain,
    breadcrumbArr: state.breadcrumbArr,
    isLogin: state.isLogin,
  }),
  { setBreadCrumbArr }
)(PersonalCenter);
