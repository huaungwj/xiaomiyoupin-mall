import React from 'react';
import './noLogin.less'
import {connect} from "react-redux";
import {changeModalVisible} from "../../redux/actions";

function NoLogin(props) {

    const showServiceModal = () => {
        props.changeModalVisible(true)
    };
    return (
        <div className="no-good-container">
            <div className="m-exception  m-no-login">
                <div className="e-img"></div>
                <p className="e-info">{props?.text}~</p></div>
            <div className="btn-wrap"><a className="m-btn-default m-btns m-btn-gray" onClick={showServiceModal}>去登录</a>
            </div>
        </div>
    )
}

export default connect((state) => ({
    isModalStatus: state.isModalStatus
}), {changeModalVisible})(NoLogin)
