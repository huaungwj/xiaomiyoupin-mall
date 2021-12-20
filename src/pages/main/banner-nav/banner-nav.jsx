import React, { Fragment, useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './banner-nav.less';
import { connect } from 'react-redux';
import { reqcateDetail, reqCateList } from '../../../api';
import { Link } from 'react-router-dom';
import qs from 'qs';

/**
 * banner 轮播部分
 */
function BannerNav(props) {
  const [dotPosition, setDotPosition] = useState('bottom');
  const [imgs, setImgs] = useState([
    '/assets/media/banner/banner1.png',
    '/assets/media/banner/banner2.jpeg',
    '/assets/media/banner/banner3.jpeg',
    '/assets/media/banner/banner4.jpeg',
    '/assets/media/banner/banner5.png',
    '/assets/media/banner/banner6.jpeg',
  ]);
  // 当前轮播下标
  const [currIndex, setCurrIndex] = useState(0);
  let slider = '';
  const [cateGoryLengthArr, SetCateGoryLengthArr] = useState([]); // 新长度数组
  const [isShowNavList, setIsShowNavList] = useState(false); // 鼠标是否正在 navlist 里
  const [showNavItemIndex, setShowNavItemIndex] = useState(); // 当前选中得 navList 中得第几个itme
  // 首屏category
  const [cateGoryList, setCateGoryList] = useState({});
  // category 具体的分类
  const [cateGoryContainer, setCateGoryContainer] = useState([]);

  // 发送请求的useEffEct
  useEffect(() => {
    reqCateGory();

    return () => {
      BannerNav = null;
      setImgs(null);
      setCurrIndex(null);
      SetCateGoryLengthArr(null);
      setIsShowNavList(null);
      setShowNavItemIndex(null);
      setCateGoryList(null);
      setCateGoryContainer(null);
    };
  }, []);
  // 首次进行第一项子分类加载
  useEffect(() => {
    if (cateGoryList.data) {
      reqcateGoryDetail(0);
    }
  }, [cateGoryList]);

  // 获取分类首屏
  const reqCateGory = async () => {
    // 请求
    const res = await reqCateList();
    // console.log(res);
    setCateGoryList(res);
  };

  // 获取子类category
  const reqcateGoryDetail = async (index) => {
    // console.log(index);
    const res1 = await reqcateDetail(cateGoryList.data[index + index]?.id);
    let res2;
    if (index !== 9) {
      res2 = await reqcateDetail(cateGoryList.data[index + index + 1]?.id);
    }

    const currArr = [];
    currArr.push(res1, res2);
    // console.log(currArr);
    setCateGoryContainer(currArr);
  };

  useEffect(() => {
    // console.log(slider);
    const cateGoryListLength = cateGoryList.data?.length / 2;
    // console.log(cateGoryListLength);
    let cateGoryLengthArrs = [];
    for (let index = 0; index < cateGoryListLength; index++) {
      cateGoryLengthArrs.push(index);
    }
    SetCateGoryLengthArr(cateGoryLengthArrs);
  }, [cateGoryList]);

  const contentStyle = {
    height: '358px',
    color: '#fff',
    lineHeight: '358px',
    textAlign: 'center',
    background: '#364d79',
  };

  // 轮播图向左切换
  const prev = () => {
    slider.prev(3);
  };
  // 轮播图向右切换
  const next = () => {
    slider.next();
  };

  // 点击轮播指示点切换图片
  const changeDots = (index) => {
    slider.goTo(index);
  };

  // 自定义 指示点
  const customDots = () => {
    return (
      <ul className="slick-dots slick-dots-bottom" style={{ display: 'block' }}>
        {imgs.map((items, index) => {
          return (
            <li
              className={currIndex === index ? 'slick-active' : ''}
              key={index}
              onClick={() => {
                changeDots(index);
              }}
            >
              <button className={currIndex === index ? 'slick-active' : ''}>
                index
              </button>
            </li>
          );
        })}
      </ul>
    );
  };
  // 切换面板触发
  const afterChange = (current) => {
    // console.log(current);
    setCurrIndex(current);
  };

  // 鼠标移入显示navItem
  const showNavItem = (e, index, pid) => {
    setCateGoryContainer([]);
    setIsShowNavList(true);
    setShowNavItemIndex(index);

    // 获取当前的要显示的子分类
    reqcateGoryDetail(index);
  };
  // 鼠标移出隐藏navItem
  const hiddenNavItem = () => {
    setIsShowNavList(false);
    setShowNavItemIndex();
  };

  return (
    <div className="banner-nav">
      <div className="nav-container" onMouseLeave={hiddenNavItem}>
        <ul className={!isShowNavList ? 'nav-list' : 'nav-list show-all'}>
          {cateGoryLengthArr.map((item, index) => {
            let newArr = [...JSON.parse(JSON.stringify(cateGoryList.data))];
            newArr = newArr.slice(index + index, index + index + 2);

            return (
              <li
                className={
                  showNavItemIndex === index
                    ? 'nav-item is-selected'
                    : 'nav-item'
                }
                key={index}
                onMouseEnter={(e) => {
                  showNavItem(e, index, item.id);
                }}
              >
                {newArr.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      {index % 2 === 1 &&
                      item.id !== '5fe309e396ee9288ed504dd3' ? (
                        <span className="nav-item-span">{item.name}</span>
                      ) : null}
                      {index % 2 === 0 &&
                      item.id !== '5fe309e396ee9288ed504dd3' ? (
                        <Fragment>
                          <span className="nav-item-span">{item.name}</span>
                          <span className="nav-item-span">
                            <span> &nbsp; / &nbsp; </span>
                          </span>
                        </Fragment>
                      ) : null}
                    </Fragment>
                  );
                })}
              </li>
            );
          })}
        </ul>
        <div className={isShowNavList ? 'nav-detail show' : 'nav-detail'}>
          {cateGoryContainer.map((detail, index) => {
            return (
              <div key={index}>
                <div className="sub-cate-arae">
                  <div className="cate-name">{detail?.data.name}</div>
                  <div className="sub-nav-row">
                    {detail?.data.children?.map((item, index) => {
                      return (
                        <div className="sub-nav-item-row" key={index}>
                          <span className="category-2-item">
                            <span className="name" title={item.name}>
                              {item.name}
                            </span>
                            <i className="iconfont iconhtbArrowright02"></i>
                          </span>
                          <span className="category-3-list">
                            {item.children.map((item, index) => {
                              return (
                                <Fragment key={index + item.name}>
                                  <Link
                                    target="_blank"
                                    to={{
                                      pathname: `/search`,
                                      search: qs.stringify({
                                        queryId: item.id,
                                        categoryName: item.name,
                                        pageFrom: 'category',
                                      }),
                                    }}
                                    data-src={`${props.domain}/search?queryId=${item.id}&categoryName=${item.name}&pageFrom=category`}
                                    className="category-3-item"
                                  >
                                    {item.name}
                                  </Link>
                                </Fragment>
                              );
                            })}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="banner-box">
        <Carousel
          dotPosition={dotPosition}
          afterChange={afterChange}
          dots
          lazyLoad
          autoplay
          ref={(el) => (slider = el)}
          autoplaySpeed={3000}
          appendDots={customDots}
        >
          {imgs.map((items, index) => {
            return (
              <div key={items}>
                <h3 style={contentStyle}>
                  <img src={items} />
                </h3>
              </div>
            );
          })}
        </Carousel>

        <span className="prev">
          <LeftOutlined
            style={{ color: 'white', fontSize: '20px' }}
            onClick={prev}
          />
        </span>
        <span className="next">
          <RightOutlined
            style={{ color: 'white', fontSize: '20px' }}
            onClick={next}
          />
        </span>
      </div>
    </div>
  );
}

export default connect((state) => ({ domain: state.doMain }))(BannerNav);
