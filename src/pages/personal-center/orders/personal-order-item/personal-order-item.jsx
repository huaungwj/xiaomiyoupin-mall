import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import moment from 'moment';
import './personal-order-item.less';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

function PersonalOrderItem(props) {
  const [order, setOrder] = useState({}); // 订单
  const [orderCreateTime, setOrderCreateTime] = useState(); // 订单创建时间
  const [orderTtlTime, setOrderTtlTime] = useState(); // 订单结束时间
  const [timeNow, setTimeNow] = useState(); // 当前时间戳
  const [product, setProduct] = useState([]); // 当前订单的商品
  let orderTotal = 0; // 订单总额

  useEffect(() => {
    // console.log(props);
    setOrder(props.order);
    setOrderCreateTime(
      moment(props.order?.create_time).format('YYYY/MM/DD HH:mm:ss')
    );
    setOrderTtlTime(moment(props.order?.create_time).add(10, 'm'));
    setTimeNow(moment());
  }, [props]);

  useEffect(() => {
    let product = [];
    // console.log(order)
    order.orderItemInfo?.map((brand) => {
      // console.log(brand)
      brand.goods.map((good, index) => {
        product.push(good);
      });
    });
    setProduct(product);
  }, [order]);

  return (
    <div
      className="personal-order-item"
      onClick={() => {
        // console.log(props)
        props.history.push(`/personal-center/detail/${props.order?.order_id}`);
      }}
    >
      <section className="personal-item-header">
        <div className="personal-left">
          {/* 数据返回的时间戳是十位数的 所以要 *1000*/}
          <span>订单日期：{orderCreateTime}</span>
          {/* 当前时间大于订单结束的时间则隐藏 */}
          {moment(orderTtlTime).diff(moment(timeNow), 'minutes') < 0 &&
          order.statusInfo?.status !== 0 ? null : (
            <span className="personal-sub-font personal-sub-title">
              {orderTtlTime?.diff(timeNow, 'minute')}分钟后订单关闭
            </span>
          )}
        </div>
        <span className="personal-active-font personal-right">
          {order.statusInfo?.statusName}
        </span>
      </section>

      <section>
        {/* 每一个商品列表 */}
        {product?.map((product, index) => {
          orderTotal = orderTotal + Number(product.price);
          return (
            <div className="personal-products-box personal-block" key={index}>
              <div className="personal-product-item will-click">
                {/* 左边商品信息、图片 */}
                <div className="personal-product-item-left">
                  {/* 商品图片 */}
                  <div className="personal-product-item-image">
                    <img
                      className=""
                      src={product.img}
                      data-src={product.img}
                      alt=""
                    />
                  </div>
                  {/* 商品信息描述 */}
                  <span className="personal-product-text-box">
                    <p className="personal-product-name-box">
                      {product.productName}
                    </p>
                    <p className="personal-product-price">
                      ￥{product.price / 100}
                    </p>
                  </span>
                </div>
                {/* 商品右边 */}
                <div className="personal-product-count personal-product-item-right">
                  X&nbsp;{product.goods_num}{' '}
                </div>
              </div>
            </div>
          );
        })}
      </section>
      {/* 商品件数 订单总额 */}
      <section className="personal-products-total">
        <span className="personal-price-box">
          共{order?.productNum}件商品,&nbsp;订单总金额:&nbsp;
        </span>
        <span className="personal-price">
          {order.qr_price ? order.qr_price : order.orderPrice}元
        </span>
      </section>
      {/* 操作订单 */}
      <section className="personal-products-action">
        {(() => {
          switch (order.statusInfo?.status) {
            case 0: {
              return (
                <Link
                  target="_blank"
                  to={{ pathname: `/tr/pay/${order.order_id}` }}
                  data-target="_blank"
                  data-src={`/tr/pay/${order.order_id}`}
                >
                  <Button type="primary" style={{ color: '#fff' }}>
                    去支付
                  </Button>
                </Link>
              );
            }
            case 8: {
              return <Button>删除订单</Button>;
            }
            default: {
              return <Button>订单详情</Button>;
            }
          }
        })()}
      </section>
    </div>
  );
}

export default connect((state) => ({ domain: state.doMain }))(
  withRouter(PersonalOrderItem)
);
