import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import './collection-product-item.less';

/* 收藏的商品列表 复用 */

function CollectionProductItem(props) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    // console.log(props);
    setProduct(props.product);
  }, []);

  return (
    <div className="collection-product-item">
      {/* 商品部分 */}
      <div className="personal-product">
        <div className="personal-product-image">
          {/* 图片部分 */}
          <img
            className=""
            src={product.goodsInfo?.img800s}
            data-src={product.goodsInfo?.img800s}
            alt={product.goodsInfo?.name}
          />
        </div>
        {/* 商品名称 */}
        <span className="personal-product-text-box">
          <div className="personal-has-price personal-product-name-box">
            <div>
              <p>{product.goodsInfo?.name}</p>
              <div style={{ dispflay: 'flex' }}>
                {/* {product.label?.normal?.map((item, index) => {
                  return (
                    <p className="m-sale-tag" key={index}>
                      {item.name}
                    </p>
                  );
                })} */}
              </div>
            </div>
          </div>
          <p className="personal-price personal-product-price">
            ¥{product.goodsInfo?.priceMin / 100}
          </p>
        </span>
      </div>
      {/* 操作商品部分 取消收藏 查看商品 */}
      <section className="personal-item-footer">
        <Button>取消收藏</Button>
        <Button>查看商品</Button>
      </section>
    </div>
  );
}

export default CollectionProductItem;
