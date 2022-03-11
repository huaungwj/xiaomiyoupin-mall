import React from 'react';
import { BackTop, Popover } from 'antd';
import './fixed-bar.less';

function FixedBar() {
  // 气泡提醒框 联系客服
  const serviceContent = (
    <div className="fixed-pop fixed-service-pop ">
      <div className="pop-inner">
        <p className="info-title">
          小米有品平台问题，建议反馈，商户和物流问题投诉等请拨打
          小米有品客服热线
        </p>
        <p className="info-phone">400-100-1199</p>
        <p className="info-day">(周一至周日 8：00-18：00)</p>
        <p className="info-des">
          小米/米家自营品牌，手机电视智能硬件商品或订单发货/退款售后问题
          请拨打小米自营客服热线
        </p>
        <p className="info-phone">400-100-5678</p>
        <p className="info-day">(周一至周日 8：00-18：00)</p>
      </div>
      <a className="m-icons m-icons-arrow-right " data-src="" href="#"></a>
    </div>
  );

  /* 下载app 气泡框 */
  const dlAppContent = (
    <div className="fixed-pop fixed-down-pop">
      <div className="pop-inner">
        <img
          className="qr-code"
          src="/public/assets/media/code.8d037abc.png"
          alt="qr-code"
          style={{ width: '88px', height: '88px' }}
        />
        <p className="site-info">
          下载小米有品APP
          <br />
          得新人礼包
        </p>
      </div>
      <a className="m-icons m-icons-arrow-right " data-src="" href="#!"></a>
    </div>
  );
  /* 新人有礼 */
  const newPersonContent = (
    <div className="fixed-pop fixed-gift-pop ">
      <div className="pop-inner">
        <div className="gift-bg"></div>
        <img
          className="qr-code"
          src="/public/assets/media/code.8d037abc.png"
          alt="qr-code"
          style={{ width: '88px', height: '88px' }}
        />
        <p className="site-info">立即扫码下载·小米有品 APP</p>
      </div>
      <a className="m-icons m-icons-arrow-right " data-src="" href="#!"></a>
    </div>
  );

  // 关注微信
  const followWeChat = (
    <div className="fixed-pop fixed-wx-pop ">
      <div className="pop-inner">
        <img
          className="qr-code"
          src="/public/assets/media/wx_code.08890cf0.png"
          alt="qr-code"
        />
        <p className="site-info">
          扫码关注「小米有品」微信服务号，签到积分赢大奖
        </p>
      </div>
      <a className="m-icons m-icons-arrow-right " data-src="" href="#!"></a>
    </div>
  );

  const backTopStyle = {
    color: '#555',
  };

  return (
    <div className="fixedBar">
      <ul className="fixed-nav">
        {/* 联系客服 */}
        <Popover content={serviceContent} placement="leftTop">
          <li>
            <a
              className="m-icons m-icons- m-icons-service-fixed"
              data-src=""
              href="#!"
            >
              <i className="iconfont iconlianxikefu"></i>
            </a>
            <p className="text">联系客服</p>
          </li>
        </Popover>
        {/* 下载App */}
        <Popover content={dlAppContent} placement="leftTop">
          <li>
            <a
              className="m-icons m-icons- m-icons-download"
              data-src=""
              href="#!"
            >
              <i className="iconfont iconsaoma"></i>
            </a>
            <p className="text">下载 APP</p>
          </li>
        </Popover>
        {/* 新人有礼 */}
        <Popover content={newPersonContent} placement="leftTop">
          <li>
            <a className="m-icons m-icons- m-icons-gift" data-src="" href="#!">
              <i className="iconfont iconliwu"></i>
            </a>
            <p className="text">新人有礼</p>
          </li>
        </Popover>
        <Popover content={followWeChat} placement="leftTop">
          <li>
            <a
              className="m-icons m-icons- m-icons-wx-chat"
              data-src=""
              href="#!"
            >
              <i className="iconfont iconweixin"></i>
            </a>
            <p className="text">关注微信</p>
          </li>
        </Popover>
        <BackTop visibilityHeight={1}>
          <li>
            <a className="m-icons m-icons- m-icons-top" data-src="" href="#!">
              <i style={backTopStyle} className="iconfont iconhuojian"></i>
            </a>
          </li>
        </BackTop>
      </ul>
    </div>
  );
}

export default FixedBar;
