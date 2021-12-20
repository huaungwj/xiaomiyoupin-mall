import React from 'react';
import './noGood.less';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function NoGood(props) {
  return (
    <div className="no-good-container">
      <div className="m-exception  m-no-cart">
        <div className="e-img"></div>
        <p className="e-info">购物车还是空的</p>
      </div>
      <div className="btn-wrap">
        <Link
          target="_blank"
          className="m-btn-default m-btns m-btn-gray"
          to={{ pathname: '/' }}
        >
          继续逛
        </Link>
      </div>
    </div>
  );
}

export default connect((state) => ({
  domain: state.doMain,
}))(NoGood);
