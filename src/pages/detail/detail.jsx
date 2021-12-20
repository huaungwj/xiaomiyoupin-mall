import React, { useEffect, useState } from 'react';

import { withRouter } from 'react-router-dom';
import './detail.less';
import Header from './header/header.jsx';
import DetailContent from './detail-content/detail-content.jsx';
import { goodsDetail } from '../../api';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

/**
 * 商品详情页
 * @param {*} props
 * @returns
 */

function Detail(props) {
  // debugger;
  // 商品基本信息
  const [goodsInfo, setGoodsInfo] = useState({});
  // 商品服务信息
  const [services, setServices] = useState({});
  //商家信息
  const [brandsInfo, setBrandInfo] = useState({});
  // 商品规格
  const [goodsSku, setGoodsSku] = useState([]);
  // 相似商品
  const [similarGoods, setSimilarGoods] = useState([]);
  //loading
  const [loading, setLoading] = useState(true);
  // 规格组合
  const [productInfo, setProductInfo] = useState([]);

  useEffect(() => {
    if (props.location.search) {
      getGoodsInfo(requestParams(props.location.search).gid);
    }
  }, []);

  useEffect(() => {
    // console.log(goodsInfo)
  }, [goodsInfo]);

  // 获取商品详情
  const getGoodsInfo = async (gid) => {
    // 发送请求获取数据
    const res = await goodsDetail(gid);
    // console.log(res);
    const { goodsInfo, services, brandInfo, skus, similarGoods, productInfo } =
      res.data.goods;
    setLoading(false);
    setGoodsInfo(goodsInfo); // save 商品信息
    setServices(Object.values(JSON.parse(services?.services))); // save 服务
    setBrandInfo(brandInfo); // save brandInfo
    setGoodsSku(skus);
    setSimilarGoods(similarGoods);
    setProductInfo(productInfo);
  };
  // search参数转换
  const requestParams = (url) => {
    const params = url.split('?')[1].split('&');
    const obj = {};
    params.map((v) => (obj[v.split('=')[0]] = v.split('=')[1]));
    return obj;
  };

  return (
    <Spin
      spinning={loading}
      indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
    >
      <div className="detail">
        <div className="container">
          {goodsInfo?.gid ? (
            <div className="detail-wrapper">
              <Header
                goodsInfo={goodsInfo}
                services={services}
                brandInfo={brandsInfo}
                skus={goodsSku}
                productInfo={productInfo}
              />
              <DetailContent
                goodsInfo={goodsInfo}
                brandInfo={brandsInfo}
                similarGoods={similarGoods}
              />
            </div>
          ) : (
            <div className="m-exception detail-exception m-no-network">
              <div className="e-img"></div>
              <p className="e-info">网络异常,请检查您的网络。</p>
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
}

export default withRouter(Detail);
