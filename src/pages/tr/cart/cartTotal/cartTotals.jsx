import React, { useEffect, useState } from 'react';
import { Affix } from 'antd';
import './cartTotal.less';
import { connect } from 'react-redux';
import qs from 'qs';
import { withRouter } from 'react-router';

function CartTotals(props) {
  const [isSelect, setIsSelect] = useState(1);
  const [bottom, setBottom] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(props.cartSelectTotal);
  }, [props.cartSelectTotal]);

  const linkCheckout = () => {
    if (props.cartSelectTotal > 0) {
      // 跳转确认页
      props.history.push({
        pathname: '/tr/checkout',
        search: qs.stringify({ checkType: 1, sourceType: 1, cart_type: 0 }), // search:
      });
    }
  };

  return (
    <Affix offsetBottom={bottom}>
      <div className="cart-total bottom-total ">
        <div className="ico fl">
          全选
          <span className="already-select">已选{count}件</span>
        </div>
        <div className="cartRight">
          <div className="total-price-con ">
            <span className="total-after-prefer">
              <span>合计：</span>
              {props.cartSum}
            </span>
            <div className="total-info">
              总额：￥{props.cartSum}
              <span>{/*立减￥4528.90*/}</span>
            </div>
          </div>
          <span
            onClick={linkCheckout}
            className={`checkout  fr ${
              props.cartSelectTotal < 1 ? 'disable' : ''
            }`}
          >
            去结算
          </span>
        </div>
      </div>
    </Affix>
  );
}

export default withRouter(
  connect((state) => ({
    cartSelectTotal: state.cartSelectTotal,
    cartSum: state.cartSum,
    domain: state.doMain,
  }))(CartTotals)
);
