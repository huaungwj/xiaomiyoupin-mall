/**
 * 包含n个用来创建action的工厂函数(action creator)
 */
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
} from './action-types'

/* 设置domain */
export const setDomain = (domain) => {
    return {
        type: SET_DOMAIN,
        domain
    }
}

/* 设置breadcrumbArr */
export const setBreadCrumbArr = (data) => {
    // console.log(data);
    return {
        type: SET_BREADCRUMBARR,
        data
    }
}

/**
 * 改变登陆状态
 */

export const changeLogin = (status) => {
    // console.log(status)
    return {
        type: SET_ISLOGIN,
        status
    }
}

/**
 * 登陆模态框状态
 */

export const changeModalVisible = (status) => {
    // console.log(status)
    return {
        type: SET_ISMODALVISIBLE,
        status
    }
}

// 购物车

/**
 * 购物车数量
 */
export const changeCartCount = (count) => {
    // console.log(count)
    return {
        type: SET_CARTCOUNT,
        count
    }
}

/**
 * 改变购物车列表内容
 */
export const changeCartList = (data) => {
    // console.log(data)
    return {
        type: SET_CARTLIST,
        data: data
    }
}

/**
 * 店铺里的内容是否被全选 cartList
 */
export const changeIsSelectCartBrand = (data) => {
    // console.log(data)
    return {
        type: SET_ISSELECTCARTBRANDALLGOOD,
        data
    }
}

/**
 * 商品的选中状态 cartList
 */
export const changeIsSelectCartGood = (data) => {
    // console.log(data)
    return {
        type: SET_ISSELECTCARTGOOD,
        data
    }
}
/**
 * 购物车单个商品条数的修改 cartList
 */
export const changeCartListGoodTotal = (data) => {
    // console.log(data)
    return {
        type: SET_CARTLISTGOODTOTALL,
        data
        // 下一步reducer.js
    }
}


/**
 * 购物车商品件数
 */
export const changeCartSelectTotal = (total) => {
    // console.log(total)
    return {
        type: SET_CARTSELECTTOTAL,
        total
    }
}


/**
 * 购物车商品价格
 */
export const changeCartSUM = (sum) => {
    // console.log(sum)
    return {
        type: SET_CARTSUM,
        sum
    }
}

/**
 * 购物车是否全选
 * status: 状态 1 表示
 */
export const changeCartALlSelect = (status) => {
    // console.log(state)
    return {
        type: SET_CARTISALLSELECT,
        status
    }
}
/**
 * 购物车确认页是否显示更多状态
 */
export const changeIsShowMoreAddress = (status) => {
    return {
        type: SET_ISSHOWMOREADDRESS,
        status
    }
}

/**
 * 地址模拟框状态
 */
export const changeAddressModalStatus = (status) => {
    return {
        type: SET_ADDRESSMODALSTATUS,
        status
    }
}

/**
 * 修改模拟框的数据
 */
export const changeCurrAddressModalData = (data) => {
    return {
        type: SET_CURRADDRESSMODALDATA,
        data
    }
}

/**
 * 修改提交订单的数据
 *
 */
export const changeSubmitOrderData = (data) => {
    return {
        type: SET_SUBMITORDERDATA,
        data
    }
}


/**
 * 修改订单数据中的备注信息
 *
 */
export const changeSubmitOrderRemark = (data) => {
    return {
        type: SET_SUBMITORDERREMARK,
        data
    }
}

/**
 * 修改订单数据中的发票信息
 */
export const changeSubmitOrderInvoice = (data) => {
    return {
        type: SET_SUBMITORDERINVOICE,
        data
    }
}
/**
 * 修改订单数据中的提交商品信息
 *
 */
export const changeSubmitOrderGood = (data) => {
    return {
        type: SET_SUBMITORDERGOOD,
        data
    }
}

/**
 * 修改提交订单中的地址id
 */
export const changeSubmitOrderAddressId = (id) => {
    return {
        type: SET_SUBMITORDERADDRESSID,
        id
    }
}

/**
 * 修改订单中的订单状态
 */
export const changeSubmitOrderStatus = (status) => {
    return {
        type: SET_SUBMITORDERSTATUS,
        status
    }

}

/**
 * 修改提交订单中的商品价格
 */
export const changeSubmitOrderTotal = (total) => {
    return {
        type: SET_SUBMITORDERTOTAL,
        total
    }
}

/**
 * 修改提交订单状态
 */
export const changeIsSubmitOrder = (status) => {
    return {
        type: SET_ISSUBMITORDER,
        status
    }
}
