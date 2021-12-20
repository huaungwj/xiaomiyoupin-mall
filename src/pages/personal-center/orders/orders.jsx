import React, {useEffect, useState} from "react";
// 引入订单列表
import PersonalOrderItem from "./personal-order-item/personal-order-item";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'
import {setBreadCrumbArr} from "../../../redux/actions";
import "./orders.less";
import {Empty, Pagination, Tabs} from "antd";
import {getListCount, getOrderInfo} from "../../../api";

const {TabPane} = Tabs;

/**
 * 个人中心 我的订单
 * /personal-center/orders
 * @returns
 */
function Orders(props) {
    //存储待收货、待付款、已收货、退款订单、全部订单
    const [orders, setOrders] = useState({}); // 初始化要有数据的，需要配合ajax
    const [activeKey, setActivekey] = useState("3");
    const [currentPage, setCurrentPage] = useState(1) // 默认当前选择的页数
    const [pageSize, setPageSize] = useState(3) // 一页显示的条数

    const [noPayCount, setNoPayCount] = useState(0) // 未支付订单数量
    const [noReceivingCount, setNoReceivingCount] = useState(0) // 待发货的订单数据

    useEffect(() => {
        props.setBreadCrumbArr([{link: '/', name: '首页'}, {
            link: '/personal-center',
            name: '个人中心'
        }, {link: '/personal-center/orders', name: '我的订单'}])

        reqOrderInfo(currentPage, pageSize, props.match.params.key.toString())
        reqOrderNumber(3)
        reqOrderNumber(0)
    }, [])
    useEffect(() => {
        setActivekey(props.match.params.key)
    }, [props.match.params])
    useEffect(() => {
        reqOrderInfo(currentPage, pageSize, props.match.params.key.toString())

    }, [currentPage])

    // 请求订单数据
    const reqOrderInfo = async (pageIndex, pageSize, listType) => {
        const result = await getOrderInfo(pageIndex, pageSize, listType)
        // console.log(result)
        if (result.status) {
            setOrders({...JSON.parse(JSON.stringify(result))})
        } else {
            setOrders({})
        }
    }

    // 获取订单数量
    const reqOrderNumber = async (status) => {
        if (status === 0) { //noPay
            const res = await getListCount(status.toString())
            if (res.status) {
                setNoPayCount(res.count)
            }
        } else {
            const res = await getListCount(status.toString())
            if (res.status) { // noReceiving
                setNoReceivingCount(res.count)
            }
        }
    }

    // 当tab 发生切换的时候 isRecycle是否是回收站
    const callback = (key, isRecycle) => {
        // console.log(key);
        setActivekey(key);
        if (!isRecycle) {
            reqOrderInfo(currentPage, pageSize, key)
        } else {
            // 回收站
            // console.log("回收站");
            reqOrderInfo(currentPage, pageSize, 11)
            props.history.push(`/personal-center/orders/${key}`)
        }
    };

    const operations = (
        <div
            className="delete-tab-item"
            onClick={() => {
                callback("10", true);
            }}
        >
            {/* 状态是1 */}
            <i className="iconfont icontemplate_delete-copy"></i>
            <span>回收站</span>
        </div>
    );

    // 改变选中的tab
    const changeSelectKey = (key, e) => {
        // console.log(key, e);
        props.history.push(`/personal-center/orders/${key}`)
    }

    // 改变当前选中的页数
    const onChangeCurrentPage = (page) => {
        // console.log(page)
        setCurrentPage(page)
    }

    return (
        <div className="my-orders">
            <Tabs
                defaultActiveKey="1"
                onChange={callback}
                tabBarExtraContent={operations}
                activeKey={activeKey}
                onTabClick={(key, e) => {
                    changeSelectKey(key, e)
                }}
            >
                <TabPane tab={`待收货(${noReceivingCount})`} key="3">
                    {orders.data?.orderInfoList.length > 0 ? (
                        <div className="personal-main">
                            {orders?.data?.orderInfoList.map((order, index) => {
                                return <PersonalOrderItem order={order} key={index}/>;
                            })}
                        </div>
                    ) : (
                        <Empty
                            image="https://www.xiaomiyoupin.com/static3/media/no-order.0bcc8929.png"
                            description={<span className="e-info">没有相应的订单数据</span>}
                        ></Empty>
                    )}
                </TabPane>
                <TabPane tab={`待付款 (${noPayCount})`} key="0">
                    {orders.data?.orderInfoList.length > 0 ? (
                        <div className="personal-main">
                            {orders?.data?.orderInfoList.map((order, index) => {
                                return <PersonalOrderItem
                                    order={order} key={index}/>;
                            })}
                        </div>
                    ) : (
                        <Empty
                            image="https://www.xiaomiyoupin.com/static3/media/no-order.0bcc8929.png"
                            description={<span className="e-info">没有相应的订单数据</span>}
                        ></Empty>
                    )}
                </TabPane>
                <TabPane tab="已收货" key="5">
                    {orders.data?.orderInfoList.length > 0 ? (
                        <div className="personal-main">
                            {orders?.data?.orderInfoList.map((order, index) => {
                                return <PersonalOrderItem order={order} key={index}/>;
                            })}
                        </div>
                    ) : (
                        <Empty
                            image="https://www.xiaomiyoupin.com/static3/media/no-order.0bcc8929.png"
                            description={<span className="e-info">没有相应的订单数据</span>}
                        ></Empty>
                    )}
                </TabPane>
                <TabPane tab="退款订单" key="6">
                    {orders.data?.orderInfoList.length > 0 ? (
                        <div className="personal-main">
                            {orders?.data?.orderInfoList.map((order, index) => {
                                return <PersonalOrderItem order={order} key={index}/>;
                            })}
                        </div>
                    ) : (
                        <Empty
                            image="https://www.xiaomiyoupin.com/static3/media/no-order.0bcc8929.png"
                            description={<span className="e-info">没有相应的订单数据</span>}
                        ></Empty>
                    )}
                </TabPane>
                <TabPane tab="全部订单" key="10">
                    {orders.data?.orderInfoList.length > 0 ? (
                        /* 有数据渲染 */
                        <div className="personal-main">
                            {orders?.data?.orderInfoList.map((order, index) => {
                                return <PersonalOrderItem order={order} key={index}/>;
                            })}
                        </div>
                    ) : (
                        <Empty
                            image="https://www.xiaomiyoupin.com/static3/media/no-order.0bcc8929.png"
                            description={<span className="e-info">没有相应的订单数据</span>}
                        ></Empty>
                    )}
                </TabPane>
            </Tabs>
            {activeKey == "99" || orders.data ? (
                /* 有数据渲染 */
                <div
                    className="personal-main delete-personal-main"
                    style={activeKey !== "99" ? {display: "none"} : {display: "flex"}}
                >
                    {orders.data.orderInfoList.map((order, index) => {
                        return <PersonalOrderItem order={order} key={index}/>;
                    })}
                </div>
            ) : (
                <Empty
                    style={activeKey !== "99" ? {display: "none"} : {display: "flex"}}
                    image="https://www.xiaomiyoupin.com/static3/media/no-order.0bcc8929.png"
                    description={<span className="e-info">没有相应的订单数据</span>}
                ></Empty>
            )}
            <div className="order-pagination">

                <Pagination hideOnSinglePage={true} current={currentPage} pageSize={pageSize}
                            onChange={onChangeCurrentPage} total={orders.data?.totalCount}/>

            </div>
        </div>
    );
}


export default connect(
    state => ({domain: state.doMain, breadcrumbArr: state.breadcrumbArr}),
    {setBreadCrumbArr}
)(withRouter(Orders));
