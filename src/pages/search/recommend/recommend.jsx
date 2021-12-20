import React, {useEffect, useState} from 'react';
import './recommend.less'
import ProductCard from "../../../component/product-card/product-card";
import {metisCart} from "../../../api";

/**
 * 为你推荐
 * @returns {JSX.Element}
 * @constructor
 */
function Recommend(props) {

    const [goods, setGoods] = useState([])

    useEffect(() => {
        if (props.commendData?.length > 0) {
            setGoods(props.commendData)
            props.changeLoading(false)
        } else {
            // 父元素没有数据
            getCommendGoods()

        }

        return () => {
            setGoods([])
            Recommend = null
        }
    }, [props.commendData])

    const getCommendGoods = async () => {
        const res = await metisCart(20)
        const {recommendResponseList} = res.data
        if (recommendResponseList.length > 0) {
            setGoods(recommendResponseList)
            props.changeLoading(false)
        }

    }

    return (
        <div className="recommend-con">
            <div className="recommend-title">为您推荐</div>
            <div className="product-list">
                {/*<ProductCard />*/}
                {goods.map((product, index) => {
                    return (
                        <ProductCard
                            product={product}
                            bgColor={"#fff"}
                            key={index}
                            clName="search-item"
                            imgPx={{width: "150px", height: "150px"}}
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default Recommend
