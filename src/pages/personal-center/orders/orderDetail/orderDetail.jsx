import React, { useEffect, useState } from 'react';
import OrderProduct from './orderProduct/orderProduct';
import './orderDetail.less';
import { getOrderDetail } from '../../../../api';
import moment from 'moment';
/**
 * 订单详情
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

function OrderDetail(props) {
  const [order, setOrder] = useState(); // 订单详情数据
  const [productNum, setProductNum] = useState(0); // 商品数量

  useEffect(() => {
    reqOrderDetail();
  }, []);

  const reqOrderDetail = async () => {
    const result = await getOrderDetail(props.match.params.order_id.toString());
    if (result.status) {
      // console.log(result)
      setOrder(result.data.orderInfo);
    }
  };
  useEffect(() => {
    let num = 0;
    if (order?.orderItemInfo) {
      // 遍历获取商品数量
      order?.orderItemInfo?.map((item) => {
        return item.goods.map((product, index2) => {
          num = num + product.goods_num;
          // console.log(num);
          setProductNum(num);
          return <OrderProduct orderItemInfo={product} key={index2} />;
        });
      });
    }
  }, [order]);

  return (
    <div className="mijia-personal-detail">
      {/*头部*/}
      <section className="mijia-personal-detail-header">
        <p className="mijia-personal-active-font">订单详情</p>
      </section>
      {/*订单状态*/}
      <section className="mijia-personal-detail-status-box no-border">
        <div className="mijia-personal-block mijia-personal-detail-status">
          <span className="mijia-personal-left mijia-personal-detail-status-left">
            订单状态：
          </span>
          <span className="mijia-personal-left mijia-personal-active-font">
            {order?.statusInfo?.statusName}
          </span>
        </div>
        {/*步骤进度条*/}
        {order?.statusInfo?.status === 8 ? (
          <div></div>
        ) : (
          <div className="mijia-personal-progress mijia-personal-block">
            <ul>
              <li
                className={
                  order?.statusInfo?.status >= 0 &&
                  order?.statusInfo?.status < 8
                    ? 'active end'
                    : ''
                }
                style={{ width: '20%' }}
              >
                下单
              </li>
              <li
                className={
                  order?.statusInfo?.status >= 3 &&
                  order?.statusInfo?.status < 8
                    ? 'active start end'
                    : ''
                }
                style={{ width: '20%' }}
              >
                付款
              </li>
              <li
                className={
                  order?.statusInfo?.status >= 3 &&
                  order?.statusInfo?.status < 8
                    ? 'active start end'
                    : ''
                }
                style={{ width: '20%' }}
              >
                配货
              </li>
              <li
                className={
                  order?.statusInfo?.status >= 4 &&
                  order?.statusInfo?.status < 8
                    ? 'active start end'
                    : ''
                }
                style={{ width: '20%' }}
                style={{ width: '20%' }}
              >
                发货
              </li>
              <li
                className={
                  order?.statusInfo?.status >= 5 &&
                  order?.statusInfo?.status < 8
                    ? 'active start end'
                    : ''
                }
                style={{ width: '20%' }}
              >
                完成
              </li>
            </ul>
          </div>
        )}
      </section>
      {/*订单号，订单金额等信息*/}
      <section className="mijia-personal-detail-item">
        <div className="mijia-personal-block mijia-personal-detail-message">
          <p>订单编号：{order?.order_id}</p>
          <p>
            订单日期：{moment(order?.create_time).format('YYYY/MM/DD hh:mm:ss')}
          </p>
          <p>
            订单金额：
            <span className="mijia-personal-price">￥{order?.orderPrice}</span>
          </p>
        </div>
      </section>
      {/*收货人信息*/}
      <section className="mijia-personal-detail-item">
        <div className="mijia-personal-block mijia-personal-detail-consignee">
          <p>
            <span>收货人： {order?.addressInfo?.consigne}</span>
            <span style={{ marginLeft: '14px' }}>
              联系电话： {order?.addressInfo?.tel}
            </span>
          </p>
          <p>
            <span>
              收货地址：
              {'中国' +
                order?.addressInfo?.province +
                order?.addressInfo?.city +
                order?.addressInfo?.area +
                order?.addressInfo?.street +
                order?.addressInfo?.detailAddress}
            </span>
          </p>
        </div>
      </section>
      {/*商品信息*/}
      <div className="order-item">
        <div
          className="mijia-personal-products-box mijia-personal-block"
          style={{ marginTop: '0px' }}
        >
          {order?.orderItemInfo?.map((item) => {
            return item.goods.map((product, index2) => {
              return <OrderProduct orderItemInfo={product} key={index2} />;
            });
          })}

          <div className="order-total-info">
            共{productNum}件商品,&nbsp;订单总金额为:&nbsp;
            <span className="mijia-personal-price">{order?.orderPrice}元</span>
          </div>
        </div>
      </div>
      {/*发票信息*/}
      <div className="mijia-personal-block mijia-personal-detail-invoice">
        <p className="invoice-item">运费：0元</p>
        <div className="invoice">
          发票
          <div className="invoice-introduce">
            <p className="iconfont iconzhuyi"></p>
            <div className="content"></div>
          </div>
          &nbsp;&nbsp;&nbsp;：&nbsp;
          <div className="invoice-inline min84">不开发票</div>
        </div>
      </div>

      <section className="mijia-personal-detail-footer no-border">
        <span className="mijia-personal-sub-font"></span>
        <div className="mijia-personal-button-box mijia-personal-right"></div>
      </section>
    </div>
  );
}

export default OrderDetail;
