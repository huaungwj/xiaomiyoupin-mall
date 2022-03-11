import React, { useEffect, useRef, useState } from 'react';
import './header.less';
import { Affix, Badge } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { getCartCount, getSearchKey } from '../../api';
import { parseSearchParams } from '../../tools/tools';
import { changeCartCount } from '../../redux/actions';
import qs from 'qs';

/**
 * banner 上头部组件
 **/
function Header(props) {
  const [keyWord, setKeyWord] = useState('');

  // 搜索提示数据
  const [tipsData, setTipsData] = useState([]);
  // 是否显示搜索提提示框
  const [isShowTipsBox, setIsShowTipsBox] = useState(false);
  // 边框颜色
  const [borderColor, setBorderColor] = useState(false);
  // 搜索列表
  const Lis = useRef(null);
  // 搜索列表索引
  const [liIndex, setLiIndex] = useState();

  useEffect(() => {
    setKeyWord(parseSearchParams(props.location.search).keyword || '');
    // console.log(props)
    if (props.isLogin) {
      // 登陆状态
      reqCount();
    }
  }, [props]);

  useEffect(() => {
    Lis.current.childNodes.forEach((li, index) => {
      li.style.backgroundColor = '#fff';
      li.style.color = '#000';
    });
    setLiIndex(tipsData.length);
  }, [tipsData]);

  // 获取商品条数
  const reqCount = async () => {
    const res = await getCartCount();
    // console.log(res)
    if (res.count > 0) {
      props.changeCartCount(res.count);
    }
  };

  // 跳转主页面
  const linkHome = () => {
    props.history.push('/');
  };
  // 上下按键改变样式
  const changeLiStyle = (index) => {
    setKeyWord(Lis.current.childNodes[index].innerHTML);
    Lis.current.childNodes.forEach((li, index) => {
      li.style.backgroundColor = '#fff';
      li.style.color = '#000';
    });
    Lis.current.childNodes[index].style.backgroundColor = '#845f3f';
    Lis.current.childNodes[index].style.color = 'white';
  };

  // 输入框发生变化的时候
  const keyWordOnchange = async (e) => {
    setKeyWord(e.target.value);
    if (e.target.value.trim()) {
      // 发送请求
      const tipsRes = await getSearchKey(e.target.value.trim());
      // console.log(tipsRes)
      if (tipsRes.data?.keyWordRes?.length > 0) {
        // 返回检索数据
        setTipsData(tipsRes?.data?.keyWordRes ? tipsRes?.data?.keyWordRes : []);
        // 显示提示搜索内容
        setIsShowTipsBox(true);
      }
    } else {
      setIsShowTipsBox(false);
    }
  };

  // 跳转搜索页面
  const linkSearchMain = (key) => {
    if (key.trim()) {
      // window.open(props.domain.concat(`/search?keyword=${key}`));
      props.history.push({
        pathname: '/search',
        search: qs.stringify({ keyword: key }), // search: 'id=1&name=chris',
      });
    }
  };

  // 跳转到购物车
  // const linkToCart = () => {
  //   window.open(props.domain.concat(`/tr/cart`));
  // };

  return (
    <Affix offsetTop={0}>
      <div className="header">
        <div className="container header-warpper">
          {/* logo */}
          <a className="logo" onClick={linkHome}>
            <img
              src="/public/assets/media/logo@2x.30cd8c00.png"
              width="50%"
              style={{ height: '47px' }}
            />
          </a>
          <ul className="tab-list" style={{ margin: 0 }}>
            <li
              className="tab-item"
              data-src="https://m.xiaomiyoupin.com/w/secbuy?_rt=weex&activity_id=5"
            >
              限时抢购
            </li>
            <li
              className="tab-item"
              data-src="https://m.xiaomiyoupin.com/w/secbuy?_rt=weex&activity_id=5"
            >
              企业采购
            </li>
          </ul>
          <div className="search">
            <div
              className="search-form"
              style={
                borderColor
                  ? { borderBottom: '1px solid #845f3f' }
                  : { borderBottom: '1px solid #e7e7e7' }
              }
            >
              <i
                className="iconfont iconsearch"
                onClick={() => {
                  linkSearchMain();
                }}
              ></i>
              <div className="search-input-con">
                <input
                  type="text"
                  placeholder="搜一搜"
                  defaultValue={keyWord}
                  onChange={debounce(keyWordOnchange, 100)}
                  onKeyDown={(e) => {
                    const keyCode = e.keyCode;
                    // console.log(keyCode)

                    switch (keyCode) {
                      case 13:
                        linkSearchMain(keyWord);
                        break;
                      case 38:
                        // 减
                        if (liIndex > 0) {
                          setLiIndex(liIndex - 1);
                          changeLiStyle(liIndex - 1);
                        } else {
                          setLiIndex(tipsData.length - 1);
                          changeLiStyle(tipsData.length - 1);
                        }
                        break;
                      case 40:
                        if (liIndex < tipsData.length - 1) {
                          setLiIndex(liIndex + 1);
                          changeLiStyle(liIndex + 1);
                        } else {
                          setLiIndex(0);
                          changeLiStyle(0);
                        }
                        break;
                    }
                  }}
                  onBlur={() => {
                    setBorderColor(false);
                    setIsShowTipsBox(false);
                  }}
                  onFocus={() => {
                    if (tipsData.length > 0) {
                      setIsShowTipsBox(true);
                    }
                    setBorderColor(true);
                  }}
                />
                <div
                  className="m-auto-list"
                  style={
                    isShowTipsBox ? { display: 'block' } : { display: 'none' }
                  }
                >
                  <ul
                    ref={Lis}
                    onMouseDown={(e) => {
                      linkSearchMain(e.target.innerHTML);
                    }}
                  >
                    {tipsData.map((tips, index) => {
                      return (
                        <li className="" key={index + tips}>
                          {tips.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Badge count={props.count}>
            <Link
              target="_blank"
              to={{
                pathname: `/tr/cart`,
              }}
            >
              <i className="iconfont iconcart"></i>
            </Link>
          </Badge>
        </div>
      </div>
    </Affix>
  );
}

export default connect(
  (state) => ({
    domain: state.doMain,
    count: state.cartCount,
    isLogin: state.isLogin,
  }),
  { changeCartCount }
)(withRouter(Header));
