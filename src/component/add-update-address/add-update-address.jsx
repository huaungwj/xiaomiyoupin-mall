import React, {Fragment} from "react";
import {Input} from "antd";
import {connect} from "react-redux";
import {changeAddressModalStatus} from "../../redux/actions";
import "./add-update-address.less";
// 引入选择城市的组件

const {TextArea} = Input;

/**
 * 新增 or 更新 地址
 * @param {*} props
 * @returns
 */
function AddUpdateAddress(props) {

    // showModal
    return (
        <Fragment>
            <div className="address-item" onClick={() => {
                props.changeAddressModalStatus(true)
            }}>
                {/* 添加图标 */}
                <div className="addIcon">
                    <i className="iconfont iconadd1"></i>
                </div>
                {/* 文字 */}
                <div className="addAds">添加新地址</div>
            </div>

        </Fragment>
    );
}

export default connect((state) => ({
    addressModalStatus: state.addressModalStatus
}), {changeAddressModalStatus})(AddUpdateAddress)
