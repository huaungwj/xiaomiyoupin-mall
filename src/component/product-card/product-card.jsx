import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './product-card.less';
import { connect } from 'react-redux';
import qs from 'qs';

/**
 * 参数需要三个
 * product: 商品信息
 * clName: 类名 最外层， 便于设置宽度高度等样式
 * imgPx: 图片的宽高 有则用，没有则用默认的
 * imgContainerStyle: img-container 的样式对象
 * smallItemImgStyle: small-item-style 的样式对象
 * proInfoStyle: pro-info 的样式对象
 * blColor: 商品信息背景颜色
 *
 * @param {*} props
 * @returns
 */
function ProductCard(props) {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    setProduct(props.product);
  }, [props]);

  // 对商品价格进行格式化处理
  const formatPrice = (price) => {
    let newPrice = price / 100;
    return newPrice + '';
  };

  return (
    <Link
      target="_blank"
      to={{ pathname: `detail`, search: qs.stringify({ gid: product.gid }) }}
    >
      <div
        className={`goods-item-container margin-left-0 ` + props.clName}
        style={{
          marginRight: props.clName === 'pro-item-category' ? '5px' : '',
        }}
      >
        {/* 图片 */}

        <div
          className="img-container"
          style={props.imgContainerStyle ? props.imgContainerStyle : {}}
        >
          <div
            className="small-item-img"
            style={props.smallItemImgStyle ? props.smallItemImgStyle : {}}
          >
            <div
              className="product-image-container"
              style={{ width: '100%', height: '100%' }}
            >
              <img
                src={
                  product.img
                    ? product.img
                    : product.pic_url ||
                      'https://www.xiaomiyoupin.com/static3/media/placeHolder.ca091fbe.png'
                }
                style={
                  props.imgPx
                    ? props.imgPx
                    : { width: '266px', height: '266px' }
                }
                alt=""
              />
            </div>
            {props.clName === 'pro-item-category' ||
            props.clName === 'best-product' ? (
              <p className="pro-desc">{product.summary}</p>
            ) : null}
          </div>
        </div>
        {/* 三色可选 */}
        {product.color_num && product.color_num > 1 ? (
          <div className="goods-pro-tag-con">
            {product.color_num > 4 ? '多' : product.color_num}色可选
          </div>
        ) : null}

        {/* 描述 */}
        <div className="productDesc" style={{ backgroundColor: props.bgColor }}>
          {/* 宣章 */}
          {props.clName === 'pro-item-category' ? (
            <div className="m-goods-common-tag-con">
              {product?.tags?.map((tag, index) => {
                return (
                  <span
                    className="common-tag common-tag-text"
                    style={{ backgroundColor: tag.color }}
                    key={index}
                  >
                    {tag.name}
                  </span>
                );
              })}
            </div>
          ) : null}
          <p
            className="pro-info"
            title={product.name}
            style={props.proInfoStyle ? props.proInfoStyle : {}}
          >
            {product.name}
          </p>
          {product.summary &&
          props.clName !== 'pro-item-category' &&
          props.clName !== 'best-product' ? (
            <p className="pro-desc" title={product.summary}>
              {product.summary}
            </p>
          ) : null}
          <p className="pro-price">
            <span className="pro-unit">¥</span>
            <span className="m-num">
              {formatPrice(product.flash_price || product.price_min)}
            </span>
            {props.clName !== 'search-item' ? (
              <span className="pro-flag">起</span>
            ) : null}
            {(product.price_min &&
              product.price_min === product.market_price) ||
            props.clName === 'search-item' ? null : (
              <span className="market-price">
                <span className="pro-unit">¥</span>
                <span className="m-num">
                  {formatPrice(product.market_price)}
                </span>
              </span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default connect((state) => ({ domain: state.doMain }))(
  withRouter(ProductCard)
);
