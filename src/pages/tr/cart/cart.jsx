import React, { Fragment, useEffect, useState } from 'react';
import './cart.less';
import MerchantItem from './merchantItem/merchantItem';
import CartTotals from './cartTotal/cartTotals';
import { message } from 'antd';
import { connect } from 'react-redux';
import {
  changeCartALlSelect,
  changeCartList,
  changeCartSelectTotal,
  changeCartSUM,
  setBreadCrumbArr,
} from '../../../redux/actions';
import { getCartList } from '../../../api';
import { reqChangeCartGoodSel } from '../../../tools/tools';
import NoLogin from '../../../component/noLogin/noLogin';
import NoGood from './noGood/noGood';
import { set } from 'lodash';

/**
 * selectType 为1代表选中 0代表不是
 * @param {*} props
 * @returns
 */
function Cart(props) {
  const [isAllSelect, setIsAllSelect] = useState(1); //是否默认全选 1-选中 0-不选中
  const [goodsNum, setGoodsNum] = useState(0); // 购物车商品数量
  const [selectGoodNum, setSelectGoodNum] = useState(0); // 购物车已经选中的商品数量
  const [cartList, setCartList] = useState([]); // 购物车列表

  // 改变是否全选
  const _changeAllSelect = () => {
    const state = isAllSelect === 1 ? 0 : 1;
    setIsAllSelect(state);
    // console.log(state)
    // change redux 改变cartList
    let selectAllItems = []; // 需要向数据库传的数据：全选的商品
    const newList = cartList.map((shop) => {
      shop.goods.map((good, index) => {
        shop.goods[index].select_type = state;
        selectAllItems.push({
          id: good.id,
          pid: good.pid,
          select_type: good.select_type,
        });
      });
      return shop;
    });

    // console.log(selectAllItems);
    props.changeCartList(newList);
    reqChangeCartGoodSel(selectAllItems);
  };
  useEffect(() => {
    // 发送ajax请求获取购物车列表
    reqCartList();
    props.setBreadCrumbArr([
      { link: '/', name: '首页' },
      { link: '/tr/cart', name: '购物车' },
    ]);
  }, []);

  useEffect(() => {
    // 如果state里的cartlist没有数据则进行赋值操作，否则会报错undefined
    if (props.cartList.length > 0) {
      setCartList(props.cartList);
    } else {
      // 没有数据
      setCartList(props.cartList);
    }
  }, [props.cartList]);

  useEffect(() => {
    let goodsTotal = 0; // 商品数量
    let selectGoodTotal = 0; // 当前被选中的商品

    let selectAllGoodsTotal = 0; // 当前选中的商品购买的总数量
    // 选中商品总价格
    let productSum = 0;

    //
    cartList.forEach((item, index) => {
      const selectNum = item.goods.filter((good, number) => {
        // console.log(good)
        // goods_num
        goodsTotal++;
        //  筛选出选中的商品
        return good.select_type === 1;
      });
      // 选中的商品
      selectNum.forEach((item, index) => {
        // console.log(item.goods_num)
        // 全部选中的商品条数
        selectAllGoodsTotal = selectAllGoodsTotal + item.goods_num;
        // console.log(item.price / 100 * item.goods_num)
        // 商品价格
        productSum = productSum + (item.price / 100) * item.goods_num;
      });

      selectGoodTotal = selectGoodTotal + selectNum.length;
    });
    setGoodsNum(goodsTotal);
    props.changeCartSelectTotal(selectAllGoodsTotal);
    props.changeCartSUM(productSum);
    setSelectGoodNum(selectGoodTotal);
    // console.log(productSum)
  }, [cartList]);

  useEffect(() => {
    if (goodsNum === selectGoodNum) {
      setIsAllSelect(1);
    } else {
      setIsAllSelect(0);
    }
  }, [goodsNum, selectGoodNum]);

  // 获取购物车列表
  const reqCartList = async () => {
    const res = await getCartList();
    if (res.data) {
      // redux
      props.changeCartList(res.data);
    } else {
      message.error(res.message);
    }
  };

  return (
    <div className="has-good-container container">
      {props.isLogin ? (
        <Fragment>
          {props.cartList.length === 0 ? (
            <NoGood />
          ) : (
            <div>
              {/* 头部展示栏 */}
              <div className="title" id="good-title">
                {/*全选按钮 */}
                <div className="select-icon">
                  <i
                    className={
                      isAllSelect === 1
                        ? 'iconfont iconwanchenggouzi'
                        : 'iconfont iconquanquan'
                    }
                    onClick={_changeAllSelect}
                  ></i>
                </div>
                {/* 全选文字 */}
                <div className="all-txt">全选</div>
                <div className="product">商品信息</div>
                <div className="price">单价</div>
                <div className="num">数量</div>
                <div className="total">金额</div>
                <div className="edit">操作</div>
              </div>
              {/* 中间商品信息 */}
              <div className="cart-merchant-list" id="merchantList">
                {cartList.map((item, index) => {
                  // console.log(item)
                  // 店铺
                  return (
                    <MerchantItem goods={item} key={index} brandIndex={index} />
                  );
                })}
              </div>
              <CartTotals />
            </div>
          )}
        </Fragment>
      ) : (
        <NoLogin text={'登录后才能看到购物车商品哦'} />
      )}
    </div>
  );
}

export default connect(
  (state) => ({
    cartList: state.cartList,
    isLogin: state.isLogin,
    cartCount: state.cartCount,
  }),
  {
    changeCartSelectTotal,
    changeCartList,
    changeCartSUM,
    changeCartALlSelect,
    setBreadCrumbArr,
  }
)(Cart);
