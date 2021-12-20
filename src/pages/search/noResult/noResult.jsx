import React from 'react'

import './noResult.less'

/**
 * 没有数据
 * @returns {JSX.Element}
 * @constructor
 */
function NoResult() {
    return (
        <div className="no-result">
            <div className="m-exception  m-no-result">
                <div className="e-img"></div>
                <p className="e-info">抱歉，暂无任何商品</p></div>

            <div style={{marginTop: "21px"}}><a className="m-btn-sm m-btns" href="/" style={{width: "109px"}}>继续逛</a>
            </div>
        </div>
    )
}

export default NoResult
