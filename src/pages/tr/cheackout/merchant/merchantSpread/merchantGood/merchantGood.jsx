import React, {useEffect, useState} from 'react';
import './merchantGood.less'
import {connect} from "react-redux";
import {changeSubmitOrderGood} from "../../../../../../redux/actions";

function MerchantGood(props) {

    const [good, setGood] = useState() // 商品信息


    useEffect(() => {
        if (props.good.gid) {
            setGood(props.good)
            props.changeSubmitOrderGood(props.good?.name)
        }
    }, [props.good])


    return (
        <div className="good-container">
            <div className="left">
            <span className="img">
                <img alt="" style={{width: "50px", height: "50px"}}
                     src={good?.img}
                />
            </span>
                <span className="name">
                <span className="product-name">{good?.name}</span>
                <p className="pro-support"><i className="iconfont icondui"></i>支持7天无理由退货</p>

            </span>
            </div>
            <span className="price">{good?.price / 100}元× {good?.goods_num}</span>
            <span className="total"><span className="">￥</span><span className="txt">{good?.sum}元</span></span>
        </div>
    )
}

export default connect((state) => ({
    submitOrderData: state.submitOrderData
}), {changeSubmitOrderGood})(MerchantGood)
