import React, { useEffect, useState } from 'react';
import MerchantSpread from './merchantSpread/merchantSpread';
import './merchant.less';
import MerchantGood from './merchantSpread/merchantGood/merchantGood';

function Merchant(props) {
  const [brandData, setBrandData] = useState(); //  品牌信息和商品

  useEffect(() => {
    if (props.brandData?.brandId) {
      setBrandData(props.brandData);
      // console.log(props.brandData)
    }
  }, [props.brandData]);

  return (
    <div>
      <div className="merchant">
        <div className="merchant-info">
          <div className="icon">
            <img src={brandData?.icon} />
          </div>
          <span className="name">{brandData?.name}</span>
        </div>
        <div className="merchant-spread">
          {brandData?.goods.map((good, index) => {
            return <MerchantGood good={good} key={index} index={index} />;
          })}
          <MerchantSpread brandId={props.brandData?.brandId} />
        </div>
      </div>
    </div>
  );
}

export default Merchant;
