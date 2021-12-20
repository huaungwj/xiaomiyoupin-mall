import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setBreadCrumbArr } from "../../../redux/actions";
import {Empty} from 'antd'
import CollectionProductItem from './collection-product-item/collection-product-item'
import "./collections.less";
/**
 * 个人中心 我的收藏
 * /personal-center/collections
 * @returns
 */
function Collections(props) {

  const [collectionProducts, setCollectionProducts] = useState({}) // 需要初始化数据

  useEffect(() => {
    // console.log(props);
    props.setBreadCrumbArr([
      { link: "/", name: "首页" },
      { link: "/personal-center", name: "个人中心" },
      { link: "/personal-center/collections", name: "我的收藏" },
    ]);
    // 模拟数据 正常需要发送ajax请求
    setCollectionProducts({
      "traceId": "3b40f5b670e2de42bcf80e4600ab1893",
      "code": 0,
      "attachments": {
        "timestamp": "1620481189829"
      },
      "data": {
        "total": 2,
        "list": [
          {
            "favoriteInfo": {
              "priceOnCreate": 89900
            },
            "label": {
              "normal": [
                {
                  "labelId": 124,
                  "name": "有品秒杀",
                  "businessId": 0,
                  "text": "有品秒杀",
                  "type": "mind",
                  "attrs": {
                    "bgColor": "#d96b6c",
                    "width": 108,
                    "displayStatus": 1,
                    "priority": 1001,
                    "jumpUrl": "",
                    "font": "default",
                    "height": 42
                  },
                  "status": 1
                },
                {
                  "labelId": 86,
                  "name": "新品",
                  "businessId": 0,
                  "text": "新品",
                  "type": "mind",
                  "attrs": {
                    "bgColor": "#8dba6d",
                    "width": 108,
                    "displayStatus": 1,
                    "priority": 1002,
                    "jumpUrl": "",
                    "font": "default",
                    "height": 42
                  },
                  "status": 1
                }
              ]
            },
            "goodsInfo": {
              "priceMin": 89900,
              "marketPrice": 219900,
              "gid": 141483,
              "name": "AQUIMIA 小户型折叠茶几餐桌椅电视柜组合",
              "img800s": "https://img.youpin.mi-img.com/shopmain/f0daac86f018f29b63919130936649e1.png?w=800&h=800",
              "status": 1
            }
          },
          {
            "favoriteInfo": {
              "priceOnCreate": 4900
            },
            "label": {
              "normal": [
                {
                  "labelId": 124,
                  "name": "有品秒杀",
                  "businessId": 0,
                  "text": "有品秒杀",
                  "type": "mind",
                  "attrs": {
                    "bgColor": "#d96b6c",
                    "width": 108,
                    "displayStatus": 1,
                    "priority": 1001,
                    "jumpUrl": "",
                    "font": "default",
                    "height": 42
                  },
                  "status": 1
                },
                {
                  "labelId": 745,
                  "name": "有品海购",
                  "businessId": 0,
                  "text": "有品海购",
                  "type": "sale_mode",
                  "attrs": {
                    "bgColor": "#8B4BE2",
                    "imageUrl": "",
                    "width": 108,
                    "displayStatus": 1,
                    "priority": 5003,
                    "jumpUrl": "",
                    "font": "default",
                    "height": 42
                  },
                  "status": 1
                }
              ]
            },
            "goodsInfo": {
              "priceMin": 4900,
              "marketPrice": 12800,
              "gid": 124584,
              "name": "澳乐家儿童防蚊驱蚊喷雾Aerogard户外防蚊花露水走珠",
              "img800s": "https://img.youpin.mi-img.com/shopmain/4fdae073f7db213ab467b0d6185f7ceb.png?w=800&h=800",
              "status": 1
            }
          }
        ]
      },
      "message": "ok"
    }) 
  }, []);


  return (
    <div className="personal-collection personal-sub-box">
      {/* 头部section */}
      <section>
        <div className="person-tit">
          <p>我的收藏</p>
        </div>
      </section>
      {/* 中间内容section */}
      <section>
        <div className="personal-main">
          { collectionProducts.data?.list ? (
            collectionProducts.data?.list?.map((product, index) => {
              return (
                <CollectionProductItem product={product} key={index}  />
              )
              
            })) : (
              <Empty
              image="https://www.xiaomiyoupin.com/static3/media/no-collection.47f32cec.png"
              description={<span className="e-info">您还没有收藏任何产品</span>}
            ></Empty>
            )
          }
         
        </div>
      </section>
      {/* 底部section */}
      <section></section>
    </div>
  );
}

export default connect(
  (state) => ({ domain: state.doMain, breadcrumbArr: state.breadcrumbArr }),
  { setBreadCrumbArr }
)(Collections);
