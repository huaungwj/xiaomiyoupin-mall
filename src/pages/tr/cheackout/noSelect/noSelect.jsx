import React, {Component} from 'react';
import './noSelect.less'

function NoSelect () {
    return (
        <div className="m-page-ready">
            <div className="m-exception  m-no-default">
                <div className="e-img"></div>
                <p className="e-info">未勾选商品，无法进行结算</p></div>
        </div>
    )
}
export default NoSelect;
