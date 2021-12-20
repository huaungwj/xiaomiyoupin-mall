import React, { Fragment, useEffect, useState } from 'react';
import './new-sec.less';
import SecTop from '../../../component/sec-top/sec-top';
import GoodsItem from '../../../component/goods-item/goods-item';

/**
 * 每日新品
 * @param {*} props
 * @returns
 */

function NewSec(props) {
  // 商品数据
  const [product, setProduct] = useState([]);
  useEffect(() => {
    if (props.data) {
      // console.log(props.data)
      setProduct(props.data?.data?.item ? props.data?.data?.item : []);
    }
  }, [props]);
  // 标题
  const boxTitle = (
    <Fragment>
      每日新品
      <span>
        <span>每天10点 惊喜不断</span>
      </span>
    </Fragment>
  );

  return (
    <div
      className="new-sec"
      style={{ display: product.length > 0 ? 'blcok' : 'none' }}
    >
      <div className="container">
        <div className="top">
          <SecTop boxTitle={boxTitle}></SecTop>
        </div>
        <GoodsItem products={product} clName="" bgColor={'#fff'}>
          {' '}
        </GoodsItem>
      </div>
    </div>
  );
}

export default NewSec;
