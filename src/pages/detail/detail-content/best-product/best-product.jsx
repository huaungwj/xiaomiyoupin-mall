import React, {useEffect, useState} from "react";
import ProductCard from "../../../../component/product-card/product-card";
import "./best-product.less";

function BestProduct(props) {
    // 商品数据
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (props.similarGoods.length > 0) {
            setProducts(props.similarGoods)
        }
    }, [props])

    useEffect(() => {
        // console.log(products)
    }, [products])

    return (
        <div className="best-product">
            {products.map((product, index) => {
                return (
                    <ProductCard
                        key={index}
                        proInfoStyle={{
                            fontWeight: 400,
                            height: "30px",
                            lineHeight: "34px",
                            color: "#333",
                            overflow: "hidden",
                            padding: "0 15px",
                            textOverflow: "ellipsis",
                            fontSize: "16px",
                        }}
                        product={product}
                        bgColor="#f4f4f4"
                        clName="best-product"
                        smallItemImgStyle={{backgroundColor: "#fff"}}
                        blColor="#fff"
                        imgPx={{width: "154px", height: "154px"}}
                        imgContainerStyle={{
                            padding: "22px 53px",
                            width: "154px",
                            height: "auto",
                            boxSizing: "content-box",
                        }}
                    ></ProductCard>
                );
            })}
        </div>
    );
}

export default BestProduct;
