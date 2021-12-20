import React, { useEffect, Fragment, useState } from "react";
import './sec-top.less'

function SecTop(props) {
  const [boxTiTle, setBoxTitle] = useState('')
  const [flashSaleHours, setFlaseSaleHours ] = useState('') // 小时
  const [flaseSaleMinutes, setFlaseSaleMinutes ] = useState('') // 分钟
  const [flaseSaleSeconds, setFlaseSaleSeconds ] = useState('') // 秒
  const [descFlag, setDescFlag] = useState(false)
  useEffect(() => {
    // console.log(props);
    setBoxTitle(props.boxTitle)
    setFlaseSaleHours(props.flashSaleHours)
    setFlaseSaleMinutes(props.flaseSaleMinutes)
    setFlaseSaleSeconds(props.flaseSaleSeconds)
    setDescFlag(props.descFlag)
  },[props])
  return (
    <Fragment>
      <h2 className="subTit">
        {boxTiTle ? boxTiTle : null}
        {/* 秒杀倒计时 */}
        {
          descFlag? ( <div className="countdown">
          <div className="h-countdown-wrap">
            <span className="time-item-home hour">{flashSaleHours}</span>
            <span className="m-countdown-dot-home">:</span>
            <span className="time-item-home minute">{flaseSaleMinutes}</span>
            <span className="m-countdown-dot-home">:</span>
            <span className="time-item-home second">{flaseSaleSeconds}</span>
          </div>  </div>) : null
        }
       
     
      </h2>
      <span className="more">
        <span>更多</span>
        <i className="iconfont iconright"></i>
      </span>
    </Fragment>
  );
}

export default SecTop;
