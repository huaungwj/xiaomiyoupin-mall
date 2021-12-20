import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import BreadcrumbNav from '../../component/breadcrumb-nav/breadcrumb-nav';
import { connect } from 'react-redux';
import { setBreadCrumbArr } from '../../redux/actions';
import Cart from './cart/cart';
import CheckOut from './cheackout/checkout';
import Pay from './pay/pay';

/**
 * 购物车/确认订单 结算/支付 路由控制组件
 * @param {*} props
 */
function Tr(props) {
  //判断是否登录
  return (
    <div className="express-append">
      <div className="container">
        <BreadcrumbNav />
        <Switch>
          <Route path={'/tr/cart'} component={Cart} />
          <Route path={'/tr/checkout'} component={CheckOut} />
          <Route path={'/tr/pay/:id'} component={Pay} />
          <Redirect to="/tr/cart" />
        </Switch>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    domain: state.doMain,
    breadcrumbArr: state.breadcrumbArr,
    isLogin: state.isLogin,
  }),
  { setBreadCrumbArr }
)(Tr);
