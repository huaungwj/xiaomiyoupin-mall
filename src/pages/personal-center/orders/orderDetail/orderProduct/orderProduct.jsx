import React, { useEffect, useState } from 'react';
import './orderProduct.less';

/**
 *  订单详情中的商品
 * @returns {JSX.Element}
 * @constructor
 */

function OrderProduct(props) {
  const [product, setProduct] = useState({}); // 商品数据
  useEffect(() => {
    console.log(props);
    if (props.orderItemInfo.brandId) {
      // 有添加
      setProduct(props.orderItemInfo);
    }
  }, []);
  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <div className="mijia-personal-product has-price no-border tiny">
      <div className="mijia-personal-product-image mijia-personal-left">
        <img className="" src={product.img} data-src={product.img} alt="" />
      </div>
      <span className="mijia-personal-product-text-box mijia-personal-left">
        <div className="mijia-personal-has-price mijia-personal-product-name-box">
          <p>{product.name}</p>
          <p className="mijia-personal-price mijia-personal-product-price">
            ￥{product.price / 100}
          </p>
        </div>
      </span>
      <span className="mijia-personal-product-count mijia-personal-right">
        X&nbsp;{product.goods_num}
      </span>
      <span className="mijia-personal-product-refound mijia-personal-right">
        <a style={{ marginLeft: '5px' }}>联系客服</a>
      </span>
    </div>
  );
}

export default OrderProduct;
