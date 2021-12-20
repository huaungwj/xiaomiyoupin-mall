import React, { useEffect, useState } from 'react';
import './formItem.less';
import { connect } from 'react-redux';
import {
  changeIsSubmitOrder,
  changeSubmitOrderRemark,
} from '../../../../../../redux/actions';

function FormItem(props) {
  const [remark, setRemark] = useState(''); // 备注

  const changeRemark = (e) => {
    setRemark(e.target.value);
  };

  useEffect(() => {
    if (props.isSubmitOrder === 3 && remark.trim()) {
      const obj = {
        brand_id: props.brandId,
        message: remark,
      };
      props.changeSubmitOrderRemark(obj);
      // console.log(obj)
    }
  }, [props.isSubmitOrder]);

  return (
    <div>
      <div className="form-item no-border">
        <span className="left-label">
          售后免邮
          <a>
            <i className="iconfont iconzhuyi"></i>
          </a>
        </span>
        <span
          style={{
            marginLeft: '51px',
            lineHeight: '50px',
            color: 'rgb(51, 51, 51)',
          }}
        >
          部分商家赠送
        </span>
      </div>
      <div className="form-item">
        <span className="left-label">买家留言</span>
        <span className="select">
          <textarea
            type="text"
            value={remark}
            onChange={changeRemark}
            className="userMessage marginBottom"
            placeholder="填写内容需与商家协商并确认，45字以内"
            maxLength="45"
          ></textarea>
        </span>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    submitOrderData: state.submitOrderData,
    isSubmitOrder: state.isSubmitOrder,
  }),
  { changeSubmitOrderRemark, changeIsSubmitOrder }
)(FormItem);
