import React, {Fragment, useEffect, useState} from "react";
import {main} from "../../api/";
import BannerNav from './banner-nav/banner-nav';
import Hero from './hero/hero'
import CrowdFounDing from './crowdfounding/crowdfounding'
import Seckill from './seckill/seckill'
import NewSec from './new-sec/new-sec'
import Category from './category/category'

/* 主页面 */
function Main(props) {

    const [mainData, setMainData] = useState()


    // 获取数据
    useEffect(() => {
        reqMainData()
        return () => {
            setMainData(null)
        }
    }, [])

    let reqMainData = async () => {
        const data = await main('pc')
        if (data.status) {
            setMainData(data.date)
        }

    }

    return (
        <Fragment>
            <BannerNav></BannerNav>
            <Hero></Hero>
            {/* 众筹 */}
            <CrowdFounDing data={mainData?.homePage?.floors[0] ? mainData?.homePage?.floors[0] : {}}></CrowdFounDing>
            {/* 有品秒杀 */}
            <Seckill reqMainData={reqMainData}
                     data={mainData?.homePage?.floors[1] ? mainData?.homePage?.floors[1] : {}}></Seckill>
            {/* 每日新品 */}
            <NewSec data={mainData?.homePage?.floors[2] ? mainData?.homePage?.floors[2] : {}}></NewSec>
            {/* 精品推荐 */}
            <Category data={mainData?.recommend?.floors[0] ? mainData?.recommend?.floors[0] : {}}></Category>
        </Fragment>
    );
}

export default Main;
