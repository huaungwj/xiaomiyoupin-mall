import React, { useEffect, useState } from 'react';
import { Pagination, Spin } from 'antd';
import './search.less';
import ProductCard from '../../component/product-card/product-card';
import NoResult from './noResult/noResult';
import Recommend from './recommend/recommend';
import { parseSearchParams } from '../../tools/tools';
import { doSearch, queryIdSearch } from '../../api';
import { LoadingOutlined } from '@ant-design/icons';

/**
 * 搜索页面 (需要通过路由进行query传参)
 * 1.queryId 通过主页面banner点击进入传参
 * 2.keyword 搜索关键词
 * @returns
 */

function Search(props) {
  // 搜索返回的商品数据
  const [products, setProducts] = useState([]);
  // 请求参数
  const [queryParams, setQueryParams] = useState({});
  // 商品总条数
  const [productTotal, setProductTotal] = useState();
  // 当前页数
  const [currentPage, setCurrentPage] = useState(1);
  // 推荐数据
  const [commendData, setCommentData] = useState([]);
  // loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.location.search) {
      //   console.log(props);
      setQueryParams(parseSearchParams(props.location.search));
    }
  }, [props.location.search]);

  useEffect(() => {
    if (queryParams.keyword && queryParams.keyword != 'undefined') {
      _initData(1);
    } else if (queryParams.queryId) {
      //   console.log(queryParams);
      _initData(1);
    }
  }, [queryParams]);

  // 初始化数据
  const _initData = async (pageNum) => {
    setLoading(true);
    if (queryParams.keyword) {
      // 通过关键词进行搜索
      const res = await doSearch(queryParams.keyword, pageNum, 20);
      const { goods, total } = res.data;
      // 大于 0 代表搜索到数据了
      if (total > 0) {
        // console.log(res);
        setProducts(goods);
        // total
        setProductTotal(total);
        // loading
        setLoading(false);
      } else {
        //没有数据
        setCommentData(goods);
        // loading
        setLoading(false);
      }
    } else if (queryParams.queryId) {
      // 分类进行搜索
      const getQueryData = await queryIdSearch(
        queryParams.queryId,
        queryParams.categoryName,
        pageNum,
        20
      );
      //   console.log(getQueryData);

      if (getQueryData.data?.goods.length > 0) {
        // 有数据
        const { goods, total } = getQueryData.data;
        // console.log(getQueryData);
        setProducts(goods);
        // total
        setProductTotal(total);
        // loading
        setLoading(false);
      } else {
        // 没有数据
      }
    }
  };

  const changeLoading = (status) => {
    setLoading(status);
  };

  // 自定义上一页和下一页按钮
  const itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return (
        <a
          className="m-safe-anchor"
          style={{
            borderRight: 'none',
            borderBottomLeftRadius: '.25em',
            borderTopLeftRadius: '.25em',
          }}
        >
          <span>上一页</span>
        </a>
      );
    }
    if (type === 'next') {
      return (
        <a
          className="m-safe-anchor"
          style={{
            borderLeft: 'none',
            borderBottomRightRadius: '.25em',
            borderTopRightRadius: '.25em',
          }}
        >
          <span>下一页</span>
        </a>
      );
    }
    return originalElement;
  };

  // 分页发生改变
  const pageChange = (pageNum, pageSize) => {
    // 异步分页 发送请求
    _initData(pageNum);
    setCurrentPage(pageNum);
  };

  return (
    <Spin
      spinning={loading}
      indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
    >
      <div className="p-search-result">
        <div className="container">
          {productTotal > 0 ? (
            <div className="search-container">
              <div className="search-tit">
                为您找到<span className="num">{productTotal}</span>条结果
              </div>
              <div className="product-list">
                {products.map((product, index) => {
                  return (
                    <ProductCard
                      product={product}
                      bgColor={'#fff'}
                      key={index}
                      clName="search-item"
                      imgPx={{ width: '195px', height: '195px' }}
                    />
                  );
                })}
              </div>

              <div className="search-pagination">
                <Pagination
                  hideOnSinglePage={true}
                  current={currentPage}
                  total={productTotal}
                  pageSize={20}
                  itemRender={itemRender}
                  onChange={pageChange}
                />
              </div>
            </div>
          ) : (
            <div>
              <NoResult />
              <Recommend
                commendData={commendData}
                changeLoading={changeLoading}
              ></Recommend>
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
}

export default Search;
