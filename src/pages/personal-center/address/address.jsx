import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { setBreadCrumbArr } from '../../../redux/actions';
import AddressItem from '../../../component/address-item/address-item';
import AddUpdateAddress from '../../../component/add-update-address/add-update-address';
import './address.less';
import { getAddressList } from '../../../api';
import { message } from 'antd';
import emitter from '../../../tools/events';
/**
 * 个人中心/地址管理
 * personal-center/address
 * @returns
 */
function Address(props) {
  const [addressList, setAddressList] = useState([]); // 存储地址 初始化需要发送ajax请求
  useEffect(() => {
    // console.log(props.breadcrumbArr);
    props.setBreadCrumbArr([
      { link: '/', name: '首页' },
      { link: '/personal-center', name: '个人中心' },
      { link: '/personal-center/address', name: '地址管理' },
    ]);
    reqAddressList();
  }, []);

  const changeAddressList = useCallback((data) => {
    setAddressList([]);
    setAddressList(data);
  });

  // 跨组件通信
  useEffect(() => {
    emitter.addListener('pushAddressList', changeAddressList);
    return () => {
      emitter.removeListener('pushAddressList', changeAddressList);
    };
  }, [changeAddressList]);

  // 获取地址列表
  const reqAddressList = async () => {
    const res = await getAddressList();
    if (res.status) {
      setAddressList(res.data);
    } else {
      message.error(res.message);
    }
  };

  return (
    <div className="personal-address">
      {/* 头部i标题  */}
      <section>
        <div className="person-tit">
          <p>地址管理</p>
        </div>
      </section>
      {/* 地址内容部分 */}
      <div className="personal-main personal-address-box">
        {/* 包裹着整个盒子 */}
        <div className="address-list">
          {/* 每一个地址 */}
          {addressList?.map((address, index) => {
            return (
              <AddressItem
                address={address}
                key={index}
                currSelectAddress="none"
                obtainSelectAddress="none"
              />
            );
          })}

          <AddUpdateAddress />
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({ domain: state.doMain, breadcrumbArr: state.breadcrumbArr }),
  { setBreadCrumbArr }
)(Address);
