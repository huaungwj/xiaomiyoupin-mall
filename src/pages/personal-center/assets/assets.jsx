import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Tabs, Empty } from 'antd';
import { setBreadCrumbArr } from '../../../redux/actions';
import './assets.less';
import CouponItem from './coupon-item/coupon-item';

const { TabPane } = Tabs;

/**
 * 个人中心 我的资产
 * /personal-center/assets
 * @returns
 */

function Assets(props) {
  const [coupons, setCoupons] = useState({}); // 页面渲染需要发送请求获取

  useEffect(() => {
    // console.log(props.breadcrumbArr);
    props.setBreadCrumbArr([
      { link: '/', name: '首页' },
      { link: '/personal-center', name: '个人中心' },
      { link: '/personal-center/assets', name: '我的资产' },
    ]);
    // 初始化应该请求可使用的数据
    setCoupons({
      traceId: '89407ecfd68ce868d27a76766fe90931',
      code: 0,
      attachments: {
        timestamp: '1620471345574',
      },
      data: {
        count: 3,
        couponInfos: [
          [
            {
              bottomPrice: 99900,
              takeTime: 1620464556,
              oid: 0,
              couponId: 311186135580673,
              target: '',
              maxDiscountPrice: 0,
              provider: 0,
              configId: 105737,
              price: 0,
              shareTime: 0,
              couponDesc: {
                nameDesc: '居家120元新人券',
                scopeDesc:
                  '120元居家优惠券，满999元可用。限时购众筹等指定商品不可用，具体以结算页为准。',
                valueDesc: '120元',
              },
              startTime: 1620464556,
              discountType: 2,
              tag: 1,
              endTime: 1621069356,
              present: 0,
              discountValue: 0,
              value: 12000,
              status: 1,
            },
          ],
          [
            {
              bottomPrice: 12900,
              takeTime: 1620464555,
              oid: 0,
              couponId: 311186131386381,
              target: '',
              maxDiscountPrice: 0,
              provider: 0,
              configId: 107877,
              price: 0,
              shareTime: 0,
              couponDesc: {
                nameDesc: '食品30元新人券',
                scopeDesc:
                  '30元食品优惠券，满129元可用。限时购众筹等指定商品不可用，具体以结算页为准。',
                valueDesc: '30元',
              },
              startTime: 1620464555,
              discountType: 2,
              tag: 1,
              endTime: 1621069355,
              present: 0,
              discountValue: 0,
              value: 3000,
              status: 1,
            },
          ],
          [
            {
              bottomPrice: 259900,
              takeTime: 1620375847,
              oid: 0,
              couponId: 310814063067861,
              target: '',
              maxDiscountPrice: 0,
              provider: 0,
              configId: 119286,
              price: 0,
              shareTime: 0,
              couponDesc: {
                nameDesc: '【限时】满2599减100元',
                scopeDesc: '不包含新人专享，有品秒杀，限量抢和其他特殊商品',
                valueDesc: '100元',
              },
              startTime: 1620375847,
              discountType: 2,
              tag: 0,
              endTime: 1620835199,
              present: 0,
              discountValue: 0,
              value: 10000,
              status: 1,
            },
          ],
        ],
      },
      message: 'ok',
    });
  }, []);

  const callback = (key) => {
    // console.log(key);
    if (key === 'use') {
      // 可使用
      setCoupons({
        traceId: '89407ecfd68ce868d27a76766fe90931',
        code: 0,
        attachments: {
          timestamp: '1620471345574',
        },
        data: {
          count: 3,
          couponInfos: [
            [
              {
                bottomPrice: 99900,
                takeTime: 1620464556,
                oid: 0,
                couponId: 311186135580673,
                target: '',
                maxDiscountPrice: 0,
                provider: 0,
                configId: 105737,
                price: 0,
                shareTime: 0,
                couponDesc: {
                  nameDesc: '居家120元新人券',
                  scopeDesc:
                    '120元居家优惠券，满999元可用。限时购众筹等指定商品不可用，具体以结算页为准。',
                  valueDesc: '120元',
                },
                startTime: 1620464556,
                discountType: 2,
                tag: 1,
                endTime: 1621069356,
                present: 0,
                discountValue: 0,
                value: 12000,
                status: 1,
              },
            ],
            [
              {
                bottomPrice: 12900,
                takeTime: 1620464555,
                oid: 0,
                couponId: 311186131386381,
                target: '',
                maxDiscountPrice: 0,
                provider: 0,
                configId: 107877,
                price: 0,
                shareTime: 0,
                couponDesc: {
                  nameDesc: '食品30元新人券',
                  scopeDesc:
                    '30元食品优惠券，满129元可用。限时购众筹等指定商品不可用，具体以结算页为准。',
                  valueDesc: '30元',
                },
                startTime: 1620464555,
                discountType: 2,
                tag: 1,
                endTime: 1621069355,
                present: 0,
                discountValue: 0,
                value: 3000,
                status: 1,
              },
            ],
            [
              {
                bottomPrice: 259900,
                takeTime: 1620375847,
                oid: 0,
                couponId: 310814063067861,
                target: '',
                maxDiscountPrice: 0,
                provider: 0,
                configId: 119286,
                price: 0,
                shareTime: 0,
                couponDesc: {
                  nameDesc: '【限时】满2599减100元',
                  scopeDesc: '不包含新人专享，有品秒杀，限量抢和其他特殊商品',
                  valueDesc: '100元',
                },
                startTime: 1620375847,
                discountType: 2,
                tag: 0,
                endTime: 1620835199,
                present: 0,
                discountValue: 0,
                value: 10000,
                status: 1,
              },
            ],
          ],
        },
        message: 'ok',
      });
    } else if (key === 'used') {
      // 已使用
      setCoupons({});
    } else if (key === 'expired') {
      // 已过期
      setCoupons({
        traceId: 'a783e21422dcbca3403500246cf73bdb',
        code: 0,
        attachments: {
          timestamp: '1620472217104',
        },
        data: {
          count: 6,
          couponInfos: [
            {
              bottomPrice: 0,
              takeTime: 1620464556,
              oid: 0,
              couponId: 311186135580679,
              target: '',
              maxDiscountPrice: 0,
              provider: 0,
              configId: 109591,
              price: 0,
              shareTime: 0,
              couponDesc: {
                nameDesc: '网易云音乐 喜马拉雅会员5元首单补贴券',
                scopeDesc:
                  '网易云音乐 喜马拉雅会员二选一，不包含新人专享，有品秒杀，限量抢和其他特殊商品',
                valueDesc: '5元',
              },
              startTime: 1620464556,
              discountType: 0,
              tag: 0,
              endTime: 1621069356,
              present: 0,
              discountValue: 0,
              value: 500,
              status: 4,
            },
            {
              bottomPrice: 19900,
              takeTime: 1620464556,
              oid: 0,
              couponId: 311186135580675,
              target: '',
              maxDiscountPrice: 0,
              provider: 0,
              configId: 119327,
              price: 0,
              shareTime: 0,
              couponDesc: {
                nameDesc: '美妆洗护5月199减80优惠券',
                scopeDesc: '不包含新人专享，有品秒杀，限量抢和其他特殊商品',
                valueDesc: '80元',
              },
              startTime: 1620464556,
              discountType: 2,
              tag: 0,
              endTime: 1621069356,
              present: 0,
              discountValue: 0,
              value: 8000,
              status: 4,
            },
            {
              bottomPrice: 0,
              takeTime: 1620464555,
              oid: 0,
              couponId: 311186131386379,
              target: '',
              maxDiscountPrice: 0,
              provider: 0,
              configId: 109590,
              price: 0,
              shareTime: 0,
              couponDesc: {
                nameDesc: '腾讯 爱奇艺会员卡 5元首单补贴券',
                scopeDesc:
                  '腾讯、爱奇艺视频会员卡二选一，不包含新人专享，有品秒杀，限量抢和其他特殊商品',
                valueDesc: '5元',
              },
              startTime: 1620464555,
              discountType: 0,
              tag: 0,
              endTime: 1621069355,
              present: 0,
              discountValue: 0,
              value: 500,
              status: 4,
            },
            {
              bottomPrice: 0,
              takeTime: 1620464555,
              oid: 0,
              couponId: 311186131386377,
              target: '',
              maxDiscountPrice: 0,
              provider: 0,
              configId: 109049,
              price: 0,
              shareTime: 0,
              couponDesc: {
                nameDesc: '5元新人首单包邮券',
                scopeDesc: '不包含新人专享，有品秒杀，限量抢和其他特殊商品',
                valueDesc: '5元',
              },
              startTime: 1620464555,
              discountType: 0,
              tag: 0,
              endTime: 1621069355,
              present: 0,
              discountValue: 0,
              value: 500,
              status: 4,
            },
            {
              bottomPrice: 5900,
              takeTime: 1620464555,
              oid: 0,
              couponId: 311186131386375,
              target: '',
              maxDiscountPrice: 0,
              provider: 0,
              configId: 106617,
              price: 0,
              shareTime: 0,
              couponDesc: {
                nameDesc: '满59元减20元新人首单券',
                scopeDesc:
                  '限首单使用，不包含新人专享，有品秒杀，限量抢和其他特殊商品，具体以结算页为准',
                valueDesc: '20元',
              },
              startTime: 1620464555,
              discountType: 2,
              tag: 0,
              endTime: 1621069355,
              present: 0,
              discountValue: 0,
              value: 2000,
              status: 4,
            },
            {
              bottomPrice: 12900,
              takeTime: 1620464555,
              oid: 0,
              couponId: 311186131386372,
              target: '',
              maxDiscountPrice: 0,
              provider: 0,
              configId: 108730,
              price: 0,
              shareTime: 0,
              couponDesc: {
                nameDesc: '30元新人首单券',
                scopeDesc:
                  '限首单使用，不包含新人专享，有品秒杀，限量抢和其他特殊商品，具体以结算页为准',
                valueDesc: '30元',
              },
              startTime: 1620464555,
              discountType: 2,
              tag: 0,
              endTime: 1621069355,
              present: 0,
              discountValue: 0,
              value: 3000,
              status: 4,
            },
          ],
        },
        message: 'ok',
      });
    }
  };

  return (
    <div className="coupon-wrap">
      {/* 头部 */}
      <h2 className="person-tit">优惠券</h2>
      {/* 输入框 */}
      <div className="coupon-input">
        <Input
          placeholder="请输入优惠码"
          maxLength={30}
          style={{ width: '312px' }}
        />
        <Button type="primary">确认兑换</Button>
      </div>
      {/* tabs 和 content */}
      <div className="coupon-content">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="可使用" key="use" forceRender={true}>
            {coupons.data?.couponInfos ? (
              <div className="panel">
                <ul className="coupon-list coupon-valid">
                  {/* 遍历数据 */}
                  {coupons.data?.couponInfos.map((coupon, index) => {
                    return <CouponItem coupon={coupon} key={index} />;
                  })}
                </ul>
              </div>
            ) : (
              <Empty
                image="https://www.xiaomiyoupin.com/static3/media/no-coupon.c3198472.png"
                description={<span>您还没有任何优惠券</span>}
              />
            )}
          </TabPane>
          <TabPane tab="已使用" key="used" forceRender={true}>
            {coupons.data?.couponInfos ? (
              <div className="panel">
                <ul className="coupon-list coupon-valid">
                  {/* 遍历数据 */}
                  {coupons.data?.couponInfos.map((coupon, index) => {
                    return <CouponItem coupon={coupon} key={index} />;
                  })}
                </ul>
              </div>
            ) : (
              <Empty
                image="https://www.xiaomiyoupin.com/static3/media/no-coupon.c3198472.png"
                description={<span>您还没有任何优惠券</span>}
              />
            )}
          </TabPane>
          <TabPane tab="已过期/已失效" key="expired" forceRender={true}>
            {coupons.data?.couponInfos ? (
              <div className="panel">
                <ul className="coupon-list coupon-valid">
                  {/* 遍历数据 */}
                  {coupons.data?.couponInfos.map((coupon, index) => {
                    return <CouponItem coupon={coupon} key={index} />;
                  })}
                </ul>
              </div>
            ) : (
              <Empty
                image="https://www.xiaomiyoupin.com/static3/media/no-coupon.c3198472.png"
                description={<span>您还没有任何优惠券</span>}
              />
            )}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({ domain: state.doMain, breadcrumbArr: state.breadcrumbArr }),
  { setBreadCrumbArr }
)(Assets);
