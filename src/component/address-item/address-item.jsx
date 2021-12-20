import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import './address-item.less';
import { connect } from 'react-redux';
import {
  changeAddressModalStatus,
  changeCurrAddressModalData,
} from '../../redux/actions';
import {
  getAddressList,
  getDelAddress,
  getSetDefault,
  getView,
} from '../../api';
import emitter from '../../tools/events';

/**
 * 每一个address卡片
 * @param {*} props
 * @returns
 */

function AddressItem(props) {
  // 地址
  const [address, setAddress] = useState({});
  const [isShowAddressAction, setIsShowAddressAction] = useState(false); // 是否显示每个地址下的操作栏

  useEffect(() => {
    // console.log(props.address);
    setAddress(props.address);
  }, [props.isShowMoreAddress]);

  // 显示地址操作
  const onMouseEnterShowAction = () => {
    setIsShowAddressAction(true);
  };
  // 隐藏地址操作
  const onMouseLeaveIsHiddenAction = () => {
    setIsShowAddressAction(false);
  };

  // 修改是否默认地址
  const changeIsDefault = async () => {
    // 数据库修改
    const res = await getSetDefault(address.id, address.uid);
    // console.log(res)
    if (res.status) {
      reqAddressList();
    }
  };
  // 获取要显示在地址模拟框的数据
  const reqGetView = async () => {
    const res = await getView(address.id, address.uid);
    // console.log(res)
    props.changeCurrAddressModalData(res.data);
  };

  // 删除地址
  const reqDelAddress = async () => {
    const res = await getDelAddress(address.id, address.uid);
    if (res.status) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }

    // 更新列表
    reqAddressList();
  };

  // 获取收货列表
  const reqAddressList = async () => {
    const res = await getAddressList();
    // console.log(r(es)
    // 收货列表发生变化的时候回传到checkout.jsx
    emitter.emit('pushAddressList', res.data);
  };

  return (
    <div
      className={`address-item ${
        props.isShowMoreAddress && props.index > 2 ? 'isHidden' : 'notHidden'
      } ${props.currSelectAddress === props.index ? 'selected' : ''}`}
      onMouseEnter={onMouseEnterShowAction}
      onMouseLeave={onMouseLeaveIsHiddenAction}
      onClick={() => {
        if (typeof props.obtainSelectAddress === 'string') return;
        props.obtainSelectAddress(props.index);
      }}
    >
      {/* 地址头部信息 */}
      <div className="address-item-content">
        {address.isDefault == 0 ? (
          <div className="mask addr-visible">默认</div>
        ) : (
          <div className="mask addr-unvisible">默认</div>
        )}

        <div className="content">
          <div className="name">{address.consigne}</div>
          <div className="tel">{address.tel}</div>
          <div className="city">{`${address?.province}（${address?.city}）${address?.area}${address?.street}`}</div>
          <div className="address">{address?.detailAddress}</div>
          <div className="city">{address?.code}</div>
        </div>
      </div>
      {/* 地址下部分更新操作 */}
      <div
        className="update-address"
        style={isShowAddressAction ? { display: 'block' } : { display: 'none' }}
      >
        {props.index === 0 ? (
          <span></span>
        ) : (
          <span onClick={changeIsDefault}>设为默认地址</span>
        )}
        <span
          onClick={() => {
            props.changeAddressModalStatus(true);
            reqGetView();
          }}
        >
          修改
        </span>
        <span
          onClick={() => {
            reqDelAddress();
          }}
        >
          删除
        </span>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    isShowMoreAddress: state.isShowMoreAddress,
  }),
  { changeAddressModalStatus, changeCurrAddressModalData }
)(AddressItem);
