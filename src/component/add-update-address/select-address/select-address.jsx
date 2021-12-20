import React, { useEffect, useState } from 'react';
import './select-address.less';
import { reqAddress } from '../../../api';

function SelectAddress(props) {
  // 是否显示当前选择城市的内容部分
  const [isShowSelect, setIsShowSelect] = useState(false);
  // 保存当前需要显示的城市列表
  const [citysData, setCitysDada] = useState([]);
  // 当前选中的省城市
  const [currSelectNow, setCurrSelectNow] = useState([]);
  // key 获取城市列表的key
  // key 获取城市列表的key
  const [getCityKey, setGetCityKey] = useState('major');
  // 输入框要显示的数据
  const [completedCity, setCompletedCity] = useState('');
  // 存储zipcode
  const [zipcode, setZipcode] = useState('');

  // getCityKey发生变化重新发请求
  useEffect(() => {
    getAddress();
  }, [getCityKey, currSelectNow]);

  //props
  useEffect(() => {
    setCompletedCity(props.address);
  }, [props.address]);

  // 隐藏时候销毁数据
  useEffect(() => {
    // 当 false 的时候触发
    if (!isShowSelect) {
      let value = '';
      let data = {};
      currSelectNow.forEach((item, index) => {
        value = value + `/${item.regionName}`;
        if (index === 0) {
          data.province = item.regionName;
        } else if (index === 1) {
          data.city = item.regionName;
        } else if (index === 2) {
          setZipcode(item.zipcode);
          data.area = item.regionName;
        } else if (index === 3) {
          data.street = item.regionName;
        }
      });
      // console.log(value)

      // 把数据传回给父元素
      // console.log(Object.keys(data).length === 4)
      if (Object.keys(data).length === 4) {
        // 必须全部选择才能返回
        props.onChange(data);
        /* 设置输入框的数据 */
        setCompletedCity(value.replace('/', ''));
      }

      // 初始化数据
      setGetCityKey('major');
      setCurrSelectNow([]);
    }
  }, [isShowSelect]);

  //邮编发生变化返回
  useEffect(() => {
    props.zipCodeChange(zipcode);
  }, [zipcode]);

  // 显示选择城市列表
  const showSelect = () => {
    setIsShowSelect(true);
    if (isShowSelect) {
      return;
    } else {
      getAddress('');
    }
  };

  // 隐藏选择城市列表部分
  const hiddenSelect = () => {
    setIsShowSelect(false);
  };

  // 封装获取地址的函数
  const getAddress = async (key) => {
    const res = await reqAddress(key === '' ? key : getCityKey);
    if (res?.data) {
      setCitysDada(res.data);
    }
    // console.log(res);
  };

  return (
    <div className="selectAddress">
      {/* 头部输入框展示区域 */}
      <div className="select-city-value">
        <input
          type="text"
          placeholder="选择省／市／区／街道"
          className="m-input default"
          readOnly={true}
          value={completedCity}
          onClick={showSelect}
        />
      </div>
      {/* 选择城市部分 */}
      {isShowSelect ? (
        <div className="select-city">
          {/* 头部选择城市展示区域 */}
          <div className="selectTitle">
            <div className="left">
              {currSelectNow?.map((item, index) => {
                return (
                  <span className="sd-span" key={index}>
                    {item.regionName}
                  </span>
                );
              })}
              {currSelectNow.length === 0 ? (
                <span className="ts-span">选择省/自治区</span>
              ) : null}
              {currSelectNow.length === 1 ? (
                <span className="ts-span">选择城市/地区</span>
              ) : null}
              {currSelectNow.length === 2 ? (
                <span className="ts-span">选择区县</span>
              ) : null}
              {currSelectNow.length === 3 ? (
                <span className="ts-span">选择配送区域</span>
              ) : null}
            </div>
            <div className="closeIcon" onClick={hiddenSelect}>
              <i className="iconfont iconsearchclose"></i>
            </div>
          </div>
          {/* 分隔线 */}
          <div className="line"></div>
          {/* 内容展示区并且选择的区域 */}
          <div className="address-content">
            {citysData.map((city, index) => {
              return (
                <span
                  key={index}
                  onClick={() => {
                    // console.log(currSelectNow);
                    const data = JSON.parse(JSON.stringify(currSelectNow));
                    if (data.length === 3) {
                      data.push(city);
                      setCurrSelectNow(data);
                      hiddenSelect();
                    } else if (data.length < 4) {
                      data.push(city);
                      setCurrSelectNow(data);
                      setGetCityKey(getCityKey + `/${city.regionId}`);
                    }
                  }}
                >
                  {city.regionName}
                </span>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SelectAddress;
