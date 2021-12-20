import React, {Fragment, useEffect, useState} from "react";
import "./category.less";
import SecTop from "../../../component/sec-top/sec-top";
import ProductCard from "../../../component/product-card/product-card";

/**
 * 专属推荐
 * @param {*} props
 * @returns
 */

function Category(props) {
    const [products, setProducts] = useState([]);
    // 头部标题
    const boxTitle = <Fragment>专属推荐</Fragment>;

    //
    useEffect(() => {
        // console.log(props)
        setProducts(props.data?.data)
    }, [props])


    return (
        <div className="category-sec">
            <div className="container">
                {/* 头部标题 */}
                <div className="top">
                    <SecTop boxTitle={boxTitle}></SecTop>
                </div>
                {/* container */}
                <div className="product-list">
                    {/* <ProductCard product={products}> </ProductCard> */}
                    {products?.map((product, index) => {
                        return (
                            <ProductCard product={product} bgColor={'#f8f8f8'} clName="pro-item-category"
                                         key={index}> </ProductCard>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Category;
