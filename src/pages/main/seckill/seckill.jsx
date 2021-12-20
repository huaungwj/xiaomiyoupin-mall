import React, { Fragment, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import './seckill.less';
import SecTop from '../../../component/sec-top/sec-top';
import GoodsItem from '../../../component/goods-item/goods-item';

/**
 * 有品秒杀
 * @param {*} props
 * @returns
 */
function Seckill(props) {
  // 秒杀商品列表
  const [seckillProducts, setSeckillProducts] = useState([]);
  // 秒杀数据
  const [flashsaleData, setFlashsaleData] = useState({});
  // 该模块的头部标题
  const [boxTitle, setBoxTitle] = useState();

  const [dateNow, setDateNow] = useState(['00', '00']);

  const [flashSaleEndTime, setFlashSaleEndTime] = useState({}); // 距离秒杀结束时间

  const [flashSaleHours, setFlaseSaleHours] = useState(); // 距离秒杀结束小时

  const [flaseSaleMinutes, setFlaseSaleMinutes] = useState(); // 距离秒杀结束分钟

  const [flaseSaleSeconds, setFlaseSaleSeconds] = useState(); // 距离秒杀结束秒

  const [endFlag, setEndFlag] = useState(false);

  let timer = useRef();

  useEffect(() => {
    return () => {
      timer.current = null;
      // 初始化
      setFlashSaleEndTime({});
      setFlaseSaleHours('');
      setFlaseSaleMinutes('');
      setFlaseSaleSeconds('');
      Seckill = null;
    };
  }, []);

  useEffect(() => {
    // 有值
    if (props.data.data) {
      // 初始化
      timer.current = null;
      // 初始化

      setDateNow(props.data?.data?.start_time?.split(' ')[1].split(':'));
      setFlashsaleData(props.data?.data);
      setSeckillProducts(
        props?.data?.data?.goods ? props?.data?.data?.goods : []
      );
      // 定时器
      timer.current = setInterval(() => {
        // 秒杀数据
        setFlashSaleEndTime(
          moment.duration(
            moment(
              moment(props.data?.data?.end_time).format('YYYY-MM-DD HH:mm:ss')
            ).diff(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
          )._data
        );
        // 秒杀 秒值
        setFlaseSaleSeconds(
          moment.duration(
            moment(
              moment(props.data?.data?.end_time).format('YYYY-MM-DD HH:mm:ss')
            ).diff(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
          )._data.seconds
        );
      }, 1000);
    }
  }, [props.data]);

  useEffect(() => {
    if (dateNow) {
      setBoxTitle(
        <Fragment>
          {props.data?.data?.title}
          <span className="timestr">
            <i className="iconfont icontimer"></i>
            <span>{dateNow ? `${dateNow[0]}:${dateNow[1]}` : ''}场</span>
          </span>
        </Fragment>
      );
    }
  }, [dateNow]);

  useEffect(() => {
    // console.log(flashSaleEndTime);
    flashSaleEndTimeChange();

    if (
      flashSaleEndTime?.hours <= 0 &&
      flashSaleEndTime?.minutes <= 0 &&
      flashSaleEndTime?.seconds <= 0 &&
      !endFlag
    ) {
      setFlashSaleEndTime({});
      setFlaseSaleHours('');
      setFlaseSaleMinutes('');
      setFlaseSaleSeconds('');

      setEndFlag(true);
    }
  }, [flashSaleEndTime]);

  // 秒杀时间处理
  const flashSaleEndTimeChange = () => {
    // 保存新值
    setFlaseSaleHours(flashSaleEndTime?.hours);
    setFlaseSaleMinutes(flashSaleEndTime?.minutes);
  };

  useEffect(() => {
    // console.log("发送请求，获取下一波秒杀");
    // 秒杀结束，获取下一波
    props.reqMainData();
  }, [endFlag === true]);

  return (
    <div
      className="trap-wrap"
      style={{ display: seckillProducts.length > 0 ? 'blcok' : 'none' }}
    >
      <div className="container">
        <div className="trap-top">
          <div className="trap-top-main">
            <SecTop
              boxTitle={boxTitle}
              flashSaleHours={flashSaleHours}
              flaseSaleMinutes={flaseSaleMinutes}
              flaseSaleSeconds={flaseSaleSeconds}
              descFlag={true}
            ></SecTop>
          </div>
          {/* 内容部分 */}
          <GoodsItem products={seckillProducts} clName="" bgColor={'#faf6ef'} />
        </div>
      </div>
    </div>
  );
}

export default Seckill;
