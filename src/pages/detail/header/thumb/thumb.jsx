import React, { useEffect, useState } from 'react';
import './thumb.less';
import MyImg from '../../../../component/myImg/myImg';

/**
 * 商品详细页主图切换组件
 * @returns
 */

function Thumb(props) {
  const [thumbImgs, setThumbImgs] = useState([]); // 缩略图的图片数组地址
  const [mainImgUrl, setMainImgUrl] = useState(); // 当前大图需要显示的img 地址连接
  const [currThumbImg, setCurrThumbImg] = useState(0); // 当前大图显示的下标
  const [thumbContainerTop, setThumbContainerTop] = useState(0); // thumbContainer 整体的偏移量

  useEffect(() => {
    if (props.mainImg) {
      // console.log(props)
      initData();
      initData();
      // console.log(props.mainImg)
    }
  }, [props.mainImg]);

  const initData = () => {
    //设置数据
    if (props?.mainImg && props?.thumbs) {
      setMainImgUrl(props?.mainImg);
      setThumbImgs(JSON.parse(props?.thumbs));
    } else {
      setThumbImgs([
        require('../../../../assets/images/error/img_error.png').default,
      ]);
    }
  };

  /**
   * 改变主图的img链接
   * img: 显示的图片地址
   * index: 当前图片的下标
   * type: '修改的类型'
   */
  const changeMainImg = (img, index) => {
    // console.log(img)
    let currImg = img;
    if (img.indexOf('.mp4') === -1) {
      currImg = currImg.split('@')[0];
      setMainImgUrl(
        currImg + '@base@tag=imgScale&F=webp&h=1080&w=1080?w=1080&h=1080'
      );
    }

    setCurrThumbImg(index);
    // console.log(index);
    if (index === 3) {
      //
      setThumbContainerTop(96);
    } else if (index > 3 && index < thumbImgs.length - 1) {
      const top = thumbContainerTop;
      const preIndex = top / 96 + 1;
      const nextIndex = preIndex + 2;
      if (index === nextIndex) {
        setThumbContainerTop(top + 96);
      } else if (preIndex - 1 === index) {
        setThumbContainerTop(top - 96);
      }
    } else if (index <= 1) {
      setThumbContainerTop(0);
    }
  };

  return (
    <div className="banner">
      <div className="main">
        <MyImg
          src={mainImgUrl}
          defaultImg={require('../../../../assets/images/error/img_error.png')}
        />
      </div>
      <div className="thumb">
        <div
          className="thumb-container"
          style={{ top: `-${thumbContainerTop}px` }}
        >
          {thumbImgs?.map((img, index) => {
            if (img.indexOf('.mp4') != -1) {
              return;
            }
            return (
              <div
                className="thumb-pic"
                style={
                  currThumbImg === index
                    ? { borderColor: 'rgb(132, 95, 63)' }
                    : {}
                }
                onClick={() => {
                  changeMainImg(img, index);
                }}
                key={index}
              >
                <MyImg
                  src={img}
                  defaultImg={require('../../../../assets/images/error/img_error.png')}
                />
              </div>
            );
          })}
        </div>
        <div
          className="thumb-arrow-up"
          onClick={() => {
            let index = currThumbImg;
            let img;
            if (currThumbImg > 0) {
              img = thumbImgs[index - 1];
              index = currThumbImg - 1;
              changeMainImg(img, index);
            }
          }}
        >
          <i className="iconfont iconup"></i>
        </div>
        <div
          className="thumb-arrow-down"
          onClick={() => {
            let index = currThumbImg;
            let img;
            if (currThumbImg < thumbImgs.length - 1) {
              img = thumbImgs[index + 1];
              index = currThumbImg + 1;
              changeMainImg(img, index);
            }
          }}
        >
          <i className="iconfont icondown1"></i>
        </div>
      </div>
    </div>
  );
}

export default Thumb;
