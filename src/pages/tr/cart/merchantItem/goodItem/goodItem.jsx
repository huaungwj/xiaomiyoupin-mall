import React, { useEffect, useState } from 'react';
import { Button, Input, message, Modal } from 'antd';
import { connect } from 'react-redux';
import {
  changeCartList,
  changeCartListGoodTotal,
  changeIsSelectCartGood,
} from '../../../../../redux/actions';
import { changeCartGoodEdit, delCartGood } from '../../../../../api';
import {
  linkProductDetail,
  reqChangeCartGoodSel,
} from '../../../../../tools/tools';
import './goodItem.less';
import { getCartList } from '../../../../../api';

function GoodItem(props) {
  const [good, setGood] = useState({});
  const [isSelect, setIsSelect] = useState(1);
  const [goodsNum, setGoodsNum] = useState(0);
  const [goodTotal, setGoodTotal] = useState(0);
  const [goodIndex, setGoodIndex] = useState(); //商品下标
  const [brandIndex, setBrandIndex] = useState(); // 商家下标
  const [visible, setVisible] = useState(false); // 显示隐藏
  // 是否对商品数量进行修改标识
  const [isChangeGoodNum, setIsChangeGoodNum] = useState(false);

  useEffect(() => {
    if (props.good.brandId) {
      const { good } = props;
      setGoodsNum(good.goods_num);
      setGood(good);
      setIsSelect(props.good.select_type);
      // console.log(props)
      // 当前商品下标设置
      setGoodIndex(props.goodIndex);
      // 当前商家下标设置
      setBrandIndex(props.brandIndex);
    } else {
      //   console.log('123213');
      setGood({});
    }
  }, [props]);

  // 商品数量修改
  const goodsNumEdit = async (goodsNum) => {
    const res = await changeCartGoodEdit(good.id, good.pid, goodsNum);
    // console.log(res);
  };

  useEffect(() => {
    // 设置商品单个价格
    setGoodTotal(goodsNum * (good.price / 100));

    if (!isChangeGoodNum) return;

    if (goodIndex != undefined) {
      props.changeCartListGoodTotal({ brandIndex, goodIndex, goodsNum });
    }

    // 同步到mysql
    goodsNumEdit(goodsNum);
    // 标识为没有修改状态
    setIsChangeGoodNum(false);
  }, [goodsNum]);

  useEffect(() => {
    // console.log(props.good.select_type)
  }, [props]);

  const _changeIsSelect = (status) => {
    setIsSelect(status);
    // 改变redux的数据
    props.changeIsSelectCartGood({
      brandIndex,
      goodIndex,
      status,
    });
    // 同步到mysql
    reqChangeCartGoodSel([{ id: good.id, pid: good.pid, select_type: status }]);
  };

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
      if (!goodsNum) return setGoodsNum(1);
      if (goodsNum >= props.good.buyLimit) {
      } else {
        setGoodsNum(parseInt(goodsNum) + 1);
      }
    } else if (type === 'reduce') {
      if (!goodsNum) setGoodsNum(1);
      //减少
      if (goodsNum <= 1) {
      } else {
        setGoodsNum(parseInt(goodsNum) - 1);
      }
    } else if (type === 'none') {
      // console.log(newValue);
      // 输入框输入
      if (newValue >= props.good.buyLimit) {
        // 商品限购数不能超过??
        // console.log(newValue);
        setGoodsNum(props.good.buyLimit);
        return;
      } else {
        // 正常输入
        // console.log(newValue);
        setGoodsNum(newValue);
        return;
      }
    }
    setIsChangeGoodNum(true);
  };

  // 显示隐藏删除商品对话框
  const isShowDeleteGoodModal = (status) => {
    setVisible(status);
  };

  // 删除购物车商品的回调函数
  const deleteCartGood = () => {
    const cartList = [...JSON.parse(JSON.stringify(props.cartList))];
    // console.log(props.cartList)

    // 1.判断购物车店铺商品子项是否只有一项 如果是 则把店铺一起删除
    if (cartList[brandIndex].goods.length === 1) {
      cartList.splice(brandIndex, 1);
    } else {
      // 2. 否则店铺有多项，则删除对应要删除的商品即可
      cartList[brandIndex].goods.splice(goodIndex, 1);
    }
    // 修改redux中的内容
    props.changeCartList(cartList);
    // 隐藏对话框
    setVisible(false);
    // 同步到数据库
    reqDelCartGood();
  };

  const reqDelCartGood = async () => {
    const res = await delCartGood(good.id, good.pid);

    // 是否删除成功
    if (res.status) {
      // 是 重新请求数据刷新列表
      reqCartList();
      message.success(res.text);
    } else {
      message.error('删除失败');
    }
  };

  // 获取购物车列表
  const reqCartList = async () => {
    const res = await getCartList();
    if (res.status) {
      // redux
      //   console.log('21312');
      props.changeCartList(res.data ? res.data : []);
    } else {
      message.error(res.message);
    }
  };

  // 7e6144
  return (
    <div className="good-item-container cart-goods-con">
      <div className="cart-good-items">
        {/*选中*/}
        <div className="select">
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
        </div>
        {/*图片*/}
        <div
          className="image"
          onClick={() => {
            linkProductDetail(props.domain, good.gid);
          }}
        >
          <img
            className=""
            src={good.img}
            data-src={good.img}
            alt={good.name}
          />
        </div>
        {/*商品名字*/}
        <div
          className="name"
          data-src="https://www.xiaomiyoupin.com/detail?gid=137&amp;pid=792"
          data-target="_blank"
          onClick={() => {
            linkProductDetail(props.domain, good.gid);
          }}
        >
          <div className="vertical-wrap">
            <p className="good-name brown-hover">{good.name}</p>
            <div></div>
          </div>
        </div>
        {/*商品价格*/}
        <div className="price">
          <span>￥ {good.price / 100}</span>
        </div>
        {/*商品数量*/}
        <div className="num">
          <div className="count-container">
            <span
              className={goodsNum <= 1 ? 'minus-btn' : 'minus-btn-active'}
              onClick={() => {
                addOrReduce('reduce');
              }}
            >
              <i className="iconfont iconminus"></i>
            </span>
            <Input
              type="type"
              className="count-input"
              defaultValue="1"
              value={goodsNum}
              onChange={(e) => {
                addOrReduce('none', e.target.value);
              }}
            />
            <span
              className={
                goodsNum >= props.good.buyLimit
                  ? 'minus-btn'
                  : 'minus-btn-active'
              }
              onClick={() => {
                addOrReduce('add');
              }}
            >
              <i className="iconfont iconadd"></i>
            </span>
          </div>
        </div>
        {/*总价格*/}
        <div className="subtotal">
          <span>￥ {goodTotal}</span>
        </div>
        {/*delete*/}
        <div className="del">
          <div className="icon">
            <div style={{ width: '13px', height: '13px' }}>
              <i
                className="iconfont icondel"
                onClick={() => {
                  isShowDeleteGoodModal(true);
                }}
              ></i>
              <Modal centered visible={visible} width={430} footer={null}>
                <div className="modal-inner">
                  <i
                    className="iconfont icondel"
                    onClick={() => {
                      isShowDeleteGoodModal(false);
                    }}
                  ></i>
                  <div className="modal-info">
                    <p className="info-tit">确定要删除吗？</p>
                  </div>
                  <div className="modal-control">
                    <Button
                      type="primary"
                      className="m-btn-default m-btns m-btn-brown"
                      onClick={() => {
                        deleteCartGood();
                      }}
                    >
                      确认
                    </Button>
                    <Button
                      className="m-btn-default m-btns m-btn-gray"
                      onClick={() => {
                        isShowDeleteGoodModal(false);
                      }}
                    >
                      取消
                    </Button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    cartList: state.cartList,
    domain: state.doMain,
  }),
  { changeIsSelectCartGood, changeCartListGoodTotal, changeCartList }
)(GoodItem);
