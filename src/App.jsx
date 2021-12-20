import React, { useEffect, Suspense } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import qs from 'qs';
// import Home from './pages/home/Home.jsx';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { changeLogin, changeModalVisible, setDomain } from './redux/actions';
import { isloggedin, pip } from './api';
import { Button, Modal, notification } from 'antd';
import AddressModal from './component/addressModal/addressModal';
const Home = React.lazy(() => import('./pages/home/Home'));

function App(props) {
  useEffect(() => {
    // console.log(props)
    openNotification();
    const domain = window.location.origin;
    props.setDomain(domain);
    getIsLogin();
    // console.log(window.location)

    // 每次打开页面 用于检测用户的订单是否有过期的订单
    pip();
  }, []);

  const getIsLogin = async () => {
    const res = await isloggedin();
    props.changeLogin(res?.status ? res.status : false);
  };

  // 刚进网站提示内容
  const openNotification = () => {
    const args = {
      type: 'warning',
      message: '站主提示：',
      description:
        '本网站是由React + Egg.js 进行构建的，复刻小米有品官网，本项目只做学习用途，不做任何商业用途，侵权请联系：1835773652@qq.com',
      duration: 20,
    };
    notification.open(args);
  };

  // 同意
  const handleOk = () => {
    const { href: search } = window.location;
    // console.log(window.location);
    // console.log(search);
    // window.location.href = `${props.domain}/login?callback=${search}`;
    props.history.push({
      pathname: '/login',
      search: qs.stringify({ callback: search }), // search: 'id=1&name=chris',
    });
    props.changeModalVisible(false);
    return (
      <Link
        target="_blank"
        to={{
          pathname: `/detail`,
          search: qs.stringify({ gid: '12' }),
        }}
      ></Link>
    );
  };
  // 不同意
  const handleCancel = () => {
    props.changeModalVisible(false);
  };

  return (
    <div className="home-wrap">
      <Suspense fallback={<div>loading...</div>}>
        <Route path={'/'} component={Home}></Route>
      </Suspense>
      {/* 服务协议是否同意 */}
      <Modal
        visible={props.isModalStatus}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="agreement-container">
          <p className="title">声明与政策</p>
          <div className="content">
            <p>欢迎您来到小米有品！</p>
            <p>
              我们依据最新法律法规要求，制定并更新了
              <a
                target="_blank"
                href="https://daren.xiaomiyoupin.com/ewen/pageFromId?id=cxsew05x0x0ch53v"
                rel="noopener noreferrer"
              >
                《隐私政策》
              </a>
              <span className="color-gold">、</span>
              <a
                target="_blank"
                href="https://m.xiaomiyoupin.com/mr/60013c77c9e77c0001f35060"
                rel="noopener noreferrer"
              >
                《小米有品用户协议》
              </a>
              以及
              <a
                target="_blank"
                href="https://m.xiaomiyoupin.com/mr/60014809cff47e0001f66ad6"
                rel="noopener noreferrer"
              >
                《小米帐号使用协议》
              </a>
              。
            </p>
            <p>您需阅读并同意相关政策条款方可进行登录。</p>
          </div>
          <div className="buttonlist">
            <Button type="primary" onClick={handleOk}>
              同意并继续
            </Button>
            <Button onClick={handleCancel}>不同意</Button>
          </div>
        </div>
      </Modal>
      <AddressModal />
    </div>
  );
}

export default withRouter(
  connect(
    (state) => ({ domain: state.doMain, isModalStatus: state.isModalStatus }),
    { setDomain, changeLogin, changeModalVisible }
  )(App)
);
