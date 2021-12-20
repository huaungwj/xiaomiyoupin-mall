import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import ProductCard from '../product-card/product-card';
import 'swiper/swiper.less';
import 'swiper/components/navigation/navigation.less';
import './goods-item.less';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
/* 
  商品滑动
  必须传三个值
  product 商品
  clName 类名 便于修改样式
  bgColor 背景颜色值
*/
function GoodsItem(props) {
  // 商品信息
  const [products, setProducts] = useState([]);

  /* Swiper对象 */
  const onSwiper = (swiper) => {
    // console.log(swiper)
  };
  // swiper 改变的时候触发
  const onSlideChange = () => {
    // console.log("slide change")
  };

  useEffect(() => {
    setProducts(props.products);
  }, [props]);

  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={onSlideChange}
      onSwiper={onSwiper}
    >
      {/* 内容部分 */}

      {products.map((product, index) => {
        // console.log(item);
        return (
          <SwiperSlide
            className="swiper-slide"
            key={product.name + index}
            style={{ width: '266px' }}
          >
            <ProductCard
              product={product}
              bgColor={props.bgColor}
              clName={props.clName}
            ></ProductCard>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default GoodsItem;
