import React from 'react';
import './hero.less';

/**
 * banner 下部分
 * @returns
 */

const Hero = () => {
  return (
    <div className="hero-warp section">
      <div
        className="container"
        style={{ borderBottom: '1px solid rgb(231, 231, 231)' }}
      >
        <ul className="hreo-nav">
          <li className="hreo-item">
            <div className="img-container">
              <img
                src="/public/assets/media/hero/hero1.png"
                data-src="/public/assets/media/hero/hero1.png"
                alt="上新精选"
                style={{ width: '80px', height: '80px' }}
              />
            </div>
            <p className="title" style={{ color: 'rgb(102, 102, 102)' }}>
              上新精选
            </p>
          </li>
          <li className="hreo-item">
            <div className="img-container">
              <img
                src="/public/assets/media/hero/hero2.png"
                data-src="/public/assets/media/hero/hero2.png"
                alt="上新精选"
                style={{ width: '80px', height: '80px' }}
              />
            </div>
            <p className="title" style={{ color: 'rgb(102, 102, 102)' }}>
              小米众筹
            </p>
          </li>
          <li className="hreo-item">
            <div className="img-container">
              <img
                src="/public/assets/media/hero/hero3.png"
                data-src="/public/assets/media/hero/hero3.png"
                alt="上新精选"
                style={{ width: '80px', height: '80px' }}
              />
            </div>
            <p className="title" style={{ color: 'rgb(102, 102, 102)' }}>
              有品秒杀
            </p>
          </li>
          <li className="hreo-item">
            <div className="img-container">
              <img
                src="/public/assets/media/hero/hero4.png"
                data-src="/public/assets/media/hero/hero4.png"
                alt="上新精选"
                style={{ width: '80px', height: '80px' }}
              />
            </div>
            <p className="title" style={{ color: 'rgb(102, 102, 102)' }}>
              热销榜单
            </p>
          </li>
          <li className="hreo-item">
            <div className="img-container">
              <img
                src="/public/assets/media/hero/hero5.png"
                data-src="/public/assets/media/hero/hero5.png"
                alt="上新精选"
                style={{ width: '80px', height: '80px' }}
              />
            </div>
            <p className="title" style={{ color: 'rgb(102, 102, 102)' }}>
              小米自营
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Hero;
