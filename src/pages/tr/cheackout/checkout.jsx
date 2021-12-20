import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  changeIsShowMoreAddress,
  changeIsSubmitOrder,
  changeSubmitOrderAddressId,
  changeSubmitOrderTotal,
  setBreadCrumbArr,
} from '../../../redux/actions';
import { useHistory } from 'react-router';
import './checkout.less';
import AddressItem from '../../../component/address-item/address-item';
import AddUpdateAddress from '../../../component/add-update-address/add-update-address';
import Merchant from './merchant/merchant'; // 店铺和商品
import { getAddressList, getCheckoutData, getSubmitOrder } from '../../../api';
import emitter from '../../../tools/events';
import NoGood from '../../../component/noLogin/noLogin';
import NoSelect from './noSelect/noSelect';
import { parseSearchParams } from '../../../tools/tools';

/**
 *  确认页
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

function CheckOut(props) {
  const [addressList, setAddressList] = useState([]); // 存储地址 初始化需要发送ajax请求
  const [currSelectAddress, setCurrSelectAddress] = useState(0); // 当前选择地址的选项 下标
  const [checkoutData, setCheckoutData] = useState({}); // 商品数据等
  const [isSubmitIng, setIsSubmitIng] = useState(false); // 是否提交中
  const [isSelectGood, setIsSelectGood] = useState(true); // 是否有勾选商品 true 是有
  const [queryParams, setQueryParams] = useState({}); // 当前页面 浏览器地址栏 query参数
  const history = useHistory();
  useEffect(() => {
    props.setBreadCrumbArr([
      { link: '/', name: '首页' },
      { link: '/tr/cart', name: '购物车' },
      { link: '/tr/checkout', name: '确认页' },
    ]);
    // query 信息赋值
    setQueryParams(parseSearchParams(history.location.search));

    // 获取地址信息
    reqAddressList();
    // 请求商品信息
    reqCheckoutData();
  }, []);

  const changeAddressList = useCallback((data) => {
    setAddressList([]);
    if (data) {
      setAddressList(data);
    }
  });

  // 跨组件通信
  useEffect(() => {
    emitter.addListener('pushAddressList', changeAddressList);
    return () => {
      emitter.removeListener('pushAddressList', changeAddressList);
    };
  }, [changeAddressList]);

  useEffect(() => {
    // 如果改变则是提交状态
    if (props.isSubmitOrder === 3) {
      // 数据收集完成 并通过验证
      // 当前地址信息
      //   console.log(addressList);
      if (addressList.length < 1) {
        // 没有地址信息
        return message.error('请添加收货地址！');
      }
      const currAddress = addressList[currSelectAddress];

      props.changeSubmitOrderAddressId(currAddress);
      props.changeSubmitOrderTotal(checkoutData?.totalPrice);
      reqSubmitOrder();
      props.changeIsSubmitOrder(false);
    }
  }, [props.isSubmitOrder]);

  // 商品提交
  const reqSubmitOrder = async () => {
    setIsSubmitIng(true);
    const { addressId, bank, checkoutPrice, invoiceDescrs, remarks } =
      props.submitOrderData;
    // console.log(addressId, bank, checkoutPrice, invoiceDescrs, remarks);

    const res = await getSubmitOrder(
      {
        addressId: addressId.id,
        bank,
        checkoutPrice,
        invoiceDescrs: JSON.stringify(invoiceDescrs),
        remarks: JSON.stringify(remarks),
      },
      parseSearchParams(history.location.search).cart_type
    );
    // console.log(res)
    // 如果订单提交成功
    if (res.status) {
      // setIsSubmitIng(false)
      // 跳转
      props.history.replace(`/tr/pay/${res.data?.order_id}`);
    }
  };

  // 获取收货地址列表
  const reqAddressList = async () => {
    setAddressList([]);
    const res = await getAddressList();
    // console.log(r(es)
    if (res.data) {
      setAddressList(res.data);
    } else {
      message.error(res.message);
    }
  };

  // 获取确认页商品数据
  const reqCheckoutData = async () => {
    // console.log(queryParams);
    const res = await getCheckoutData(
      parseSearchParams(history.location.search).cart_type
    );
    // console.log(res);
    if (res.status) {
      setCheckoutData(res);
    } else {
      //未勾选商品
      setIsSelectGood(false);
      message.error(res.message);
    }
  };

  // 改变是否显示更多 状态
  const changeShowMoreAddress = (status) => {
    props.changeIsShowMoreAddress(status ? false : true);
  };

  // 获取当前选择的地址信息
  const obtainSelectAddress = (index) => {
    setCurrSelectAddress(index);
  };
  // 提交订单
  const submitOrder = () => {
    if (isSubmitIng) return;
    props.changeIsSubmitOrder(true);
  };

  return (
    <div>
      {props.isLogin ? (
        <Fragment>
          {isSelectGood ? (
            <Fragment>
              {' '}
              {/*收货地址*/}
              <div className="address">
                <div className="title">收货地址</div>
                {/* 包裹着整个盒子 */}
                <div className="address-list">
                  {/* 每一个地址 */}
                  {addressList?.map((address, index) => {
                    return (
                      <AddressItem
                        currSelectAddress={currSelectAddress}
                        reqAddressList={reqAddressList}
                        obtainSelectAddress={obtainSelectAddress}
                        address={address}
                        key={index}
                        index={index}
                      />
                    );
                  })}

                  <AddUpdateAddress />
                </div>
                <div
                  className="moreAddress"
                  onClick={() => {
                    changeShowMoreAddress(props.isShowMoreAddress);
                  }}
                >
                  <span className="txt">
                    {props.isShowMoreAddress ? '显示' : '收起'}更多收货地址
                  </span>
                  <i
                    className={`iconfont ${
                      props.isShowMoreAddress ? 'icondown' : 'iconup1'
                    }`}
                  ></i>
                </div>
              </div>
              {checkoutData.data?.map((brand, index) => {
                return <Merchant brandData={brand} key={brand.brandId} />;
              })}
              {/*商品价格等信息*/}
              <a href=""></a>
              <div className="checkout-summary">
                <div className="check-freeInfo">
                  <div className="freeInfo-item">
                    <span className="freeInfo-key">商品总价：</span>
                    <span className="freeInfo-value">
                      {checkoutData.totalPrice}元
                    </span>
                  </div>
                  <div className="freeInfo-item">
                    <span className="freeInfo-key">运费：</span>
                    <span className="freeInfo-value">0元</span>
                  </div>
                  <div className="total">
                    <span className="freeInfo-key">合计：</span>
                    <div className="freeInfo-value">
                      ￥{checkoutData.totalPrice}元
                    </div>
                  </div>
                </div>
              </div>
              {/*下单按钮*/}
              <div className="bottom-pay">
                <Button
                  type="primary"
                  className={`m-btn-middle ${isSubmitIng ? 'disable' : ''}`}
                  onClick={submitOrder}
                >
                  去下单
                </Button>
              </div>
            </Fragment>
          ) : (
            <NoSelect />
          )}
        </Fragment>
      ) : (
        <NoGood text={'登录后才能结算哦'} />
      )}
    </div>
  );
}

export default connect(
  (state) => ({
    breadcrumbArr: state.breadcrumbArr,
    isShowMoreAddress: state.isShowMoreAddress,
    isLogin: state.isLogin,
    isSubmitOrder: state.isSubmitOrder,
    submitOrderData: state.submitOrderData,
  }),
  {
    setBreadCrumbArr,
    changeIsShowMoreAddress,
    changeIsSubmitOrder,
    changeSubmitOrderAddressId,
    changeSubmitOrderTotal,
  }
)(withRouter(CheckOut));
