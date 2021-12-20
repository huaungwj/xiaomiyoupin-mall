/**
 * reducer 函数模块：根据当前state和指定action返回一个新的state
 */
import {combineReducers} from "redux";
import {
    SET_ADDRESSMODALSTATUS,
    SET_BREADCRUMBARR,
    SET_CARTCOUNT,
    SET_CARTISALLSELECT,
    SET_CARTLIST,
    SET_CARTLISTGOODTOTALL,
    SET_CARTSELECTTOTAL,
    SET_CARTSUM,
    SET_CURRADDRESSMODALDATA,
    SET_DOMAIN,
    SET_ISLOGIN,
    SET_ISMODALVISIBLE,
    SET_ISSELECTCARTBRANDALLGOOD,
    SET_ISSELECTCARTGOOD,
    SET_ISSHOWMOREADDRESS,
    SET_ISSUBMITORDER,
    SET_SUBMITORDERADDRESSID,
    SET_SUBMITORDERDATA,
    SET_SUBMITORDERGOOD,
    SET_SUBMITORDERINVOICE,
    SET_SUBMITORDERREMARK,
    SET_SUBMITORDERSTATUS,
    SET_SUBMITORDERTOTAL
} from "./action-types";

// 管理domain数据的reducer
const initDoMain = "";

function doMain(state = initDoMain, action) {
    switch (action.type) {
        case SET_DOMAIN:
            return action.domain;

        default:
            return state;
    }
}

// 管理面包屑导航 Breadcrumb 的数据
const iniBreadcrumbArr = [{link: '/', name: '首页'}]

function breadcrumbArr(state = iniBreadcrumbArr, action) {
    switch (action.type) {
        case SET_BREADCRUMBARR:
            return action.data;
        default:
            return state;
    }
}

// 是否登陆
const isLoginStatus = false

function isLogin(state = isLoginStatus, action) {
    switch (action.type) {
        case SET_ISLOGIN:
            return action.status;
        default:
            return state

    }
}

/**
 * 模态框 状态
 */
const ModalStatus = false

function isModalStatus(state = ModalStatus, action) {
    switch (action.type) {
        case SET_ISMODALVISIBLE:
            return action.status;
        default:
            return state
    }
}

/**
 * 购物车数量
 */
function cartCount(state = 0, action) {
    switch (action.type) {
        case SET_CARTCOUNT:
            return action.count;
        default:
            return state

    }
}

/**
 *  购物车数据
 */

function cartList(state = [], action) {

    const items = [...JSON.parse(JSON.stringify(state))]

    switch (action.type) {
        case SET_CARTLIST: // 设置cartlist
            return action.data;
        case SET_ISSELECTCARTBRANDALLGOOD: // 店铺里面的内容是否被选中，是否全选或者全不选，影响子项商品
            // console.log(action.data)

            const {brandIndex, status} = action.data
            // console.log(state)
            items[brandIndex]?.goods.map((good, index) => {
                good.select_type = status
                return good
            })
            return items
        case SET_ISSELECTCARTGOOD: // 购物车单个商品
            // console.log(action.data)
        {
            const {brandIndex, goodIndex, status} = action.data
            items[brandIndex].goods[goodIndex].select_type = status
            return items


        }
        case SET_CARTLISTGOODTOTALL: // 修改购物车单个商品中的条数
        {
            // console.log(action)
            const {brandIndex, goodIndex, goodsNum} = action.data
            items[brandIndex].goods[goodIndex].goods_num = goodsNum
            return items
        }

        default:
            return state;
    }
}


/**
 * 购物车已选中的件数
 */

function cartSelectTotal(state = 0, action) {
    switch (action.type) {
        case SET_CARTSELECTTOTAL: {
            return action.total
        }
        default:
            return state
    }
}

/**
 * 购物车选中总价格
 */
function cartSum(state = 0, action) {
    switch (action.type) {
        case SET_CARTSUM: {
            return action.sum
        }
        default:
            return state
    }
}

/**
 * 购物车状态是否全选
 */
function allCartSelect(state = 1, action) {
    // console.log(cartLists)
    switch (action.type) {
        case SET_CARTISALLSELECT: {
            return action.status
        }
        default: {
            return state
        }
    }
}

/**
 * 购物车确认页是否显示更多地址状态 true为隐藏状态 false为显示状态
 */
function isShowMoreAddress(state = true, action) {
    // console.log(action.status)
    switch (action.type) {
        case SET_ISSHOWMOREADDRESS: {
            return action.status
        }
        default: {
            return state
        }
    }
}

/**
 * 地址模拟框状态
 */
function addressModalStatus(state = false, action) {
    // console.log(action.status)
    switch (action.type) {
        case SET_ADDRESSMODALSTATUS : {
            return action.status
        }
        default: {
            return state
        }
    }
}

/**
 * 地址模拟框数据
 */
function currAddressModalData(state = {}, action) {
    switch (action.type) {
        case SET_CURRADDRESSMODALDATA : {
            return action.data
        }
        default : {
            return state
        }
    }
}

/**
 * 订单提交的数据
 */
function submitOrderData(state = {
    addressId: "",
    bank: "nopay",
    order_state: 0,
    checkoutPrice: 0,
    invoiceDescrs: [],
    good: [],
    remarks: []
}, action) {
    switch (action.type) {
        case SET_SUBMITORDERDATA: {
            return action.data
        }
        case SET_SUBMITORDERREMARK: {
            state.remarks.push(action.data)
            return state
        }
        case SET_SUBMITORDERINVOICE: {
            state.invoiceDescrs.push(action.data)
            return state
        }
        case SET_SUBMITORDERGOOD: {
            state.good.push(action.data)
            return state
        }
        case SET_SUBMITORDERADDRESSID: {
            state.addressId = action.id
            return state
        }
        case SET_SUBMITORDERTOTAL: {
            state.checkoutPrice = action.total
            return state
        }
        case SET_SUBMITORDERSTATUS : {
            state.order_state = action.status
            return state
        }
        default: {
            return state
        }
    }
}

/**
 * 是否提交订单 false 还没开始验证的状态 true开始验证 验证不通过返回false 验证通过返回3
 */
function isSubmitOrder(state = false, action) {
    switch (action.type) {
        case SET_ISSUBMITORDER: {
            return action.status
        }
        default: {
            return state
        }
    }
}

export default combineReducers({
    doMain,
    breadcrumbArr,
    isLogin,
    isModalStatus,
    cartCount,
    cartList,
    cartSelectTotal,
    cartSum,
    allCartSelect,
    isShowMoreAddress,
    addressModalStatus,
    currAddressModalData,
    submitOrderData,
    isSubmitOrder


});
