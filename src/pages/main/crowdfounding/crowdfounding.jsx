import React, { useState, useEffect } from 'react';
import SecTop from '../../../component/sec-top/sec-top';
import './crowdfounding.less';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'qs';

/**
 *  小米有品众筹
 * @param {*} props
 * @returns
 */

function CrowdFounDing(props) {
  const [boxTitle, setBoxTitle] = useState('小米有品众筹');
  const [boxDesc, setBoxDesc] = useState(<span>永远好奇 永远年轻</span>);
  // 众筹数据
  const [crowData, setCrowData] = useState({});

  useEffect(() => {
    // console.log(props.data.data)
    // 保存数据
    setCrowData(props.data.data);
  }, [props]);

  useEffect(() => {
    // 设置头部标题
    setBoxTitle(crowData?.title);
  }, [crowData]);

  // 跳转到商品详情页面
  // const linkGoodsDetail = (gid) => {
  //   // console.log(gid)
  //   window.open(`${props.domain}/detail?gid=${gid}`);
  // };

  return (
    <div className="crowdfounding">
      <div className="container">
        <div className="crow-top">
          <SecTop boxTitle={boxTitle} boxDesc={boxDesc}></SecTop>
        </div>
        <div className="crow-main">
          {crowData?.item?.map((crow, index) => {
            return (
              <Link
                target="_blank"
                to={{
                  pathname: `/detail`,
                  search: qs.stringify({ gid: crow.gid }),
                }}
                key={index}
              >
                <div
                  className={
                    index === 0
                      ? 'home-good-item home-good-item-big'
                      : 'home-good-item'
                  }
                >
                  <div className="item-inner">
                    <div className="pro-text">
                      <p className="pro-info" title={crow.name}>
                        {crow.name}
                      </p>
                      {index === 0 ? (
                        <p className="pro-desc" title={crow.summary}>
                          {crow.summary}
                        </p>
                      ) : null}

                      <p className="pro-price">
                        <span className="tag">¥</span>
                        <span>{crow.price_min / 100}</span>
                      </p>
                    </div>
                    <div className="pro-img">
                      <img src={crow.pic_url} />
                    </div>
                  </div>
                  <div className="m-progress-wrap-con">
                    <div className="m-bar-con">
                      <div
                        className="m-bar"
                        style={{ width: crow.progress + '%' }}
                      ></div>
                    </div>
                    <div className="m-progress-info">
                      <div className="suppory">
                        <span className="sup-num">{crow.saled_count}</span>
                        <span>人支持</span>
                        {crow.progress >= 100 && crow.progress <= 300 ? (
                          <span
                            className="common-tag common-tag-text"
                            style={{ backgroundColor: 'rgb(249, 135, 0)' }}
                          >
                            热
                          </span>
                        ) : null}
                        {crow.progress >= 300 && crow.progress <= 500 ? (
                          <span
                            className="common-tag common-tag-text"
                            style={{ backgroundColor: 'rgb(249, 135, 0)' }}
                          >
                            火
                          </span>
                        ) : null}
                        {crow.progress > 500 ? (
                          <span
                            className="common-tag common-tag-text"
                            style={{ backgroundColor: 'rgb(246, 39, 0)' }}
                          >
                            爆
                          </span>
                        ) : null}
                      </div>
                      <div className="persent">
                        <span className="num">{crow.progress}</span>
                        <span className="num-flag">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({ domain: state.doMain }))(CrowdFounDing);
