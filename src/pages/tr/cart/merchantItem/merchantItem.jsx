import React, { useEffect, useState } from 'react';
import '../merchantItem/merchantItem.less';
import GoodItem from './goodItem/goodItem';
import { connect } from 'react-redux';
import { changeIsSelectCartBrand } from '../../../../redux/actions';
import { reqChangeCartGoodSel } from '../../../../tools/tools';

/**
 * 每一个商家信息 和商品
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

function MerchantItem(props) {
  const [isSelect, setIsSelect] = useState(1);
  const [goodsNum, setGoodsNum] = useState(0);
  const [goods, setGoods] = useState({});
  // 店铺 index
  const [brandIndex, setBrandIndex] = useState();
  // 标识是否点击了select
  const [isClickSelect, setIsClickSelect] = useState(false);

  useEffect(() => {
    // console.log(props);
    if (props.goods.brandId) {
      setGoods(props.goods);
      // console.log(props.goods)
      // 设置店铺index
      setBrandIndex(props.brandIndex);
      // setIsSelect(goods.goods[0].select_type)
      const isSelectArr = props.goods.goods?.filter((good, index) => {
        return good.select_type === 1;
      });
      // 判断里面选中的数量是否等于该店铺数组，如果是全选
      if (isSelectArr?.length === props.goods.goods?.length) {
        // console.log(isSelectArr)
        setIsSelect(1);
      } else {
        setIsSelect(0);
      }
    } else {
      //   console.log('213123');
      setGoods(null);
    }
  }, [props]);

  const _changeIsSelect = (status) => {
    // console.log(brandIndex)
    setIsSelect(status);
    // 修改redux的数据
    props.changeIsSelectCartBrand({
      brandIndex,
      status,
    });
    // 点击
    setIsClickSelect(true);
  };

  useEffect(() => {
    if (!isClickSelect) return;
    const newGoods = goods?.goods?.map((item, index) => {
      return { id: item.id, pid: item.pid, select_type: item.select_type };
    });
    // console.log(newGoods);
    reqChangeCartGoodSel(newGoods);
    setIsClickSelect(false);
  }, [goods]);

  // 格式化输入框的数字
  const formatNum = (value) => {
    let newValue = value.replace(/^(0+)|[^\d]+/g, '');
    if (value === '0') {
      // 最小值不能小于1
      newValue = 1;
    } else if (newValue != '') {
      newValue = parseInt(newValue);
    }
    return newValue;
  };

  // 商品数量添加或者减少
  const addOrReduce = (type, value) => {
    const newValue = formatNum(value ? value : '');
    // console.log(value, newValue);

    if (type === 'add') {
      // 增加
      if (goodsNum >= 50) {
      } else {
        setGoodsNum(parseInt(goodsNum) + 1);
      }
    } else if (type === 'reduce') {
      //减少
      if (goodsNum <= 1) {
      } else {
        setGoodsNum(parseInt(goodsNum) - 1);
      }
    } else if (type === 'none') {
      // console.log(newValue);
      // 输入框输入
      if (newValue >= 50) {
        // 商品限购数不能超过??
        // console.log(newValue);
        setGoodsNum(50);
      } else {
        // 正常输入
        // console.log(newValue);
        setGoodsNum(newValue);
      }
    }
  };

  return (
    <div className="merchant-item-container">
      {/* 头部选择信息 */}
      <div className="merchant-info">
        {/* 全选按钮 */}
        <div className="select-icon">
          <i
            className={
              isSelect === 1
                ? 'iconfont iconwanchenggouzi'
                : 'iconfont iconquanquan'
            }
            onClick={() => {
              _changeIsSelect(isSelect === 1 ? 0 : 1);
            }}
          ></i>
        </div>
        <span className="name">{goods.name}</span>
        <div className="postmarginright mijiapost">
          <span>
            <span className="postimg">!</span>已免运费
          </span>
          <span className="layer hide">
            有品海购商品，由第三方商家进行配送，单笔订单满99元免运费，不满99元收10元运费。*包邮订单拆单后若部分订单退款使得剩余订单不满足包邮条件时将补扣10元运费。
          </span>
        </div>
      </div>
      {/* 商品信息部分 */}
      <div>
        {goods.goods?.map((good, index) => {
          return (
            <GoodItem
              good={good}
              key={index}
              goodIndex={index}
              brandIndex={brandIndex}
            />
          );
        })}
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    cartList: state.cartList,
  }),
  { changeIsSelectCartBrand }
)(MerchantItem);
