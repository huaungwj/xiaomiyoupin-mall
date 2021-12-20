import React, { Fragment, useEffect, useState } from 'react';
import {
  changeIsShowMoreAddress,
  changeSubmitOrderStatus,
  setBreadCrumbArr,
} from '../../../redux/actions';
import './pay.less';
import { connect } from 'react-redux';
import { getOrderDetail, getPayCode } from '../../../api';
import { Drawer, message } from 'antd';
import NoLogin from '../../../component/noLogin/noLogin';
import md5 from 'md5';
import QrCode from '../../../component/qrCode/qrCode';

function Pay(props) {
  const [orderId, setOrderId] = useState(); //订单号
  const [orderInfo, setOrderInfo] = useState({
    order_state: {
      statusName: '等待买家付款',
    },
  }); //订单信息
  const [visible, setVisible] = useState(false);
  const [payType, setPayType] = useState('alipay'); // 支付类型
  const [payDate, setPayDate] = useState({}); // 服务器返回的支付信息

  useEffect(() => {
    props.setBreadCrumbArr([
      { link: '/', name: '首页' },
      { link: '/personal-center/orders/', name: '个人中心' },
      { link: '/tr/pay', name: '支付页' },
    ]);
    // console.log(md5(md5("3423476387938304" + "0.01") + "yio"))
  }, []);

  useEffect(() => {
    setOrderId(props.match.params.id);
    if (props.submitOrderData.addressId) {
      // 有就用
      setOrderInfo(props.submitOrderData);
    } else {
      // 没有请求
      reqOrderDetail();
    }
  }, []);
  const reqOrderDetail = async () => {
    const res = await getOrderDetail(props.match.params.id);
    if (res.status) {
      //成功
      const { orderInfo } = res.data;
      props.changeSubmitOrderStatus(orderInfo?.statusInfo.status);

      setOrderInfo({
        addressId: orderInfo.addressInfo,
        order_state: orderInfo.statusInfo,
        checkoutPrice: orderInfo.orderPrice,
        qr_price: orderInfo.qr_price,
        invoiceDescrs: orderInfo.invoiceInfo,
        good: orderInfo.orderItemInfo.map((brand, index) => {
          return brand?.goods?.map((good) => {
            return good.name;
          });
        }),
      });
    } else {
      message.error(res.message);
    }
  };

  // 获取收款二维码
  const reqPayCode = async (payType) => {
    const code = await getPayCode(
      orderId,
      payType,
      orderInfo.checkoutPrice,
      `'${orderInfo.good[0]}'`,
      md5(
        md5(orderId.toString() + orderInfo.checkoutPrice.toString()) + 'xiaohai'
      ),
      'https://49.233.14.172:28888/default/order/orderpay',
      'hhh'
    );
    // console.log(code);
    if (code.data) {
      // 有
      setPayDate(code.data);
      message.success(code.message);
    } else {
      setPayDate({});
      message.error('失败');
    }
  };

  const changeVisible = (payType) => {
    setVisible(true);
    // 获取二维码
    reqPayCode(payType);
    setPayType(payType);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="pay-con">
      {props.isLogin ? (
        <Fragment>
          {orderInfo.checkoutPrice ? (
            <Fragment>
              {/*订单信息*/}
              <div className="order-con">
                <div className="container">
                  <div className="order-info">
                    <h2 className="tit">
                      订单提交成功！{orderInfo.order_state.statusName}
                    </h2>
                    {props.submitOrderData?.order_state < 3 ? (
                      <div className="order-warm">
                        请在10分钟内完成支付, 超时后将取消订单
                      </div>
                    ) : (
                      <div></div>
                    )}

                    <ul className="order-detail">
                      <li>
                        <span className="item-label">订单编号：</span>
                        {orderId}
                      </li>
                      <li className="price">
                        <span className="item-label">订单价格：</span>
                        {orderInfo.checkoutPrice}元
                      </li>
                      {orderInfo.order_state.status > 2 &&
                      orderInfo.order_state.status < 8 ? (
                        <li className="price">
                          <span className="item-label">实际付款金额：</span>
                          {orderInfo.qr_price}元
                        </li>
                      ) : (
                        <div></div>
                      )}

                      <li>
                        <span className="item-label">收货信息：</span>
                        <span className="item">
                          {orderInfo?.addressId?.consigne}
                        </span>
                        <span className="item">{orderInfo.addressId?.tel}</span>
                        <span className="item">
                          {orderInfo.addressId?.province}
                        </span>
                        <span className="item">
                          {orderInfo.addressId?.city}
                        </span>
                        <span className="item">
                          {orderInfo.addressId?.area}
                        </span>
                        <span className="item">
                          {orderInfo.addressId?.street}
                        </span>
                        <span className="item">
                          {orderInfo.addressId?.detailAddress}
                        </span>
                      </li>
                      <li>
                        <span className="item-label">商品名称：</span>
                        {orderInfo?.good?.map((good, index) => {
                          return (
                            <Fragment key={index}>
                              {index == 0 ? (
                                <span key={index + good}>{good} </span>
                              ) : (
                                <div className="pro-name" key={index + good}>
                                  {good}
                                </div>
                              )}
                            </Fragment>
                          );
                        })}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/*支付渠道*/}
              {props?.submitOrderData?.order_state < 3 ? (
                <div className="pay-method">
                  <h2 className="tit">选择以下支付方式付款</h2>
                  <h3 className="sub-tit">支付平台</h3>
                  <ul className="payment-list clearfix">
                    <li
                      onClick={() => {
                        changeVisible('alipay');
                      }}
                    >
                      <img
                        src="https://trade.xiaomiyoupin.com/static3/media/alipay.00389021.png"
                        alt="alipay"
                      />
                    </li>
                    <li
                      onClick={() => {
                        changeVisible('wechat');
                      }}
                    >
                      <img
                        src="https://trade.xiaomiyoupin.com/static3/media/weixin.57f20083.png"
                        alt="weixin"
                      />
                    </li>
                  </ul>

                  <Drawer
                    title={
                      payType === 'alipay' ? (
                        <img
                          style={{ width: '103px', height: '36px' }}
                          src={
                            'data:image/png;base64,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'
                          }
                        />
                      ) : (
                        '微信支付'
                      )
                    }
                    placement="right"
                    size="large"
                    style={{ width: '100%' }}
                    onClose={onClose}
                    visible={visible}
                    destroyOnClose={true}
                  >
                    {payDate?.qr_price ? (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '20px',
                            marginBottom: '15px',
                          }}
                        >
                          {payDate.payment}元 ｜{' '}
                          <span style={{ color: 'red' }}>
                            注意：付款的时候备注订单号：{orderId}
                          </span>
                        </div>
                        <QrCode
                          value={payDate?.qr_url ? payDate?.qr_url : ''}
                          size={250}
                          logo={'https://z3.ax1x.com/2021/09/27/42c9cq.jpg'}
                          logoWidth={40}
                        />
                      </div>
                    ) : (
                      <div>还在开发中...</div>
                    )}
                  </Drawer>
                </div>
              ) : (
                <div></div>
              )}
            </Fragment>
          ) : (
            <div style={{ color: 'red', fontSize: '18px' }}> 没有订单信息 </div>
          )}
        </Fragment>
      ) : (
        <NoLogin text={'登录后才能看到订单'} />
      )}
    </div>
  );
}

export default connect(
  (state) => ({
    breadcrumbArr: state.breadcrumbArr,
    isShowMoreAddress: state.isShowMoreAddress,
    isLogin: state.isLogin,
    submitOrderData: state.submitOrderData,
  }),
  { setBreadCrumbArr, changeIsShowMoreAddress, changeSubmitOrderStatus }
)(Pay);
