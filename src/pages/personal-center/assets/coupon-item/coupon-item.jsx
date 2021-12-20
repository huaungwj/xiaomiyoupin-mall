import React, {useState, useEffect} from 'react'
import moment from 'moment'
import './coupon-item.less'

/**
 * 优惠券 
 * @returns 
 */

function CouponItem (props) {

  const [coupon, setCoupon] = useState({})

  useEffect(() => {
    // console.log(props.coupon || props.coupon[0]);
    setCoupon(props.coupon[0] || props.coupon)
  },[props.coupon])

  return (
    <li className="coupon-item">
      {/* 优惠券头部 */}
      <div className="coupon-top" style={ coupon.status ===  4 || coupon.status === 2  ? {backgroundColor: '#cecece'} : {} }>
        <p className="price"><span className="m-num">{coupon.couponDesc?.valueDesc ? coupon.couponDesc.valueDesc.replace('元', '') : ''}</span>元</p>
        <div className="coupon-top-right"><p className="tr-desc">{coupon.couponDesc?.nameDesc ? coupon.couponDesc.nameDesc : ''}</p></div>
      </div>
      {/* 中间分割背景 */}
      <div className="coupon-m-bg" style={ coupon.status ===  4 || coupon.status === 2  ? {backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAxgAAAAYCAYAAAB5lVv5AAAEK0lEQVR4Ae3XNZBsRRTG8cHJQ0IiJA+wBCfBHWKcEFLcLSLC3d1CQpJ1d3d33x3Od6t2qudO3b6vZ/vp/Lvq92TP1pm53ed29yk0NDQUAQAAAMQANRj3mmfN32YnMAEAAAAAaLxmHlKD4brIfGEOchIAAAAAgMZVpnBIf0jaLWY5IwkAAAAAvGfONgVvg+G40mymkgAAAADAC1l9hP7wedRJAgAAAAB/mrOqbTDOMv8ZJhIAAADArrnYFKptMOQ2w2QCAAAA+MgUjtpgnGvman4yAQAAAFwTo8GQH2p6IgEAAACsmXNjNRjP1/RkAgAAAKg3hVgNxhObm5tFdywvL5c+bHp6uiy2t7dXbG1tTWLd3d3Fg4ODUkz/HhoaSmKNjY3F7e3tojsWFhZKeWdnZ8tiu7u7xebm5iTW19dXkbe/vz+JNTU1Jb/rDuVSTPQZ7tjZ2Um+i2KDg4MVeXt7e5NYS0tL8mzu0LMrJpoTZ+jZSnn1zO5QXs2NYm1tbRV5JycnS3lXV1fLYlqLw9jo6GhZbH9/v9jZ2ZnEOjo6kv+7Y2xsLInJ2tqaG9L/S7GJiYmKvPqeinV1dVXkHR4eTmKSrpWVlRVvrWheFevp6UnPvdYjs1YWFxe9taI6UEx1kc47MDCQWStzc3NurXjXNFatuGs6MjKSrhXNealW0nOvtVJMNNfu2NjYOIxp7TNrpb293Vsr6+vrbkg16a0V5VNM+X21srW1VRZbWloqxaampjL3lbxa0TsdaV/RzxTT73hqJXhf0TMopmcKqhXNmVsrAWuqtcp6/7XGvlpRvsx9ZXx8PF0rwftK+qzQ0PNl1YrmJX9fcfOG14rWN7Wm2jNCayV9BmnvythXgmtF70nm++/Uit67oFrRmobXSv77rzMr/6zIP4NStaLnO1zTqmtF+7fnrPDWiucMUo7MsyLovhJwr8g7gzTX4feK/DMo9F6h/SS8VvLX1Lev+O6gOoPyayX8DJqfn8/cV/z3Ff++MjMz491XPPcVzU3mvqI7qOduuxazwXgy/cKqOMMbDP/i+jf3eA2GuwgxGwzNyYloMLQW8RsM99DwXRrdzZ0GQyNCg+FdU7dWtAane4ORf2k8MxsMDRqME99ghNeK/ww6HRuM8Frxr2msBsN3r/DsK6oVb4Oh+TyxDYa/VpQjq1ZC7yvxGwz/GRS6r6g24jcY/lo5GQ2GauV0azA0TsUG4yVTrFkAAAAAGmM2GL8woTUNAAAA2DDnx2gwlGSRCa15AAAAwHUxGox7mUgAAAAA5pujNhhnm2YmEgAAAIDZN5cepcF4xkkGAAAAAP+ac6ppMG42e6lkAAAAAPC+OSukwXjYbGYkAwAAAIDPzYV5Dcbl5p9jSAYAAAAAveYOc47bYDxm3jRNVSQEAAAAgCnzoXm6ECspAAAAAPwPMkU4IhhECMYAAAAASUVORK5CYII=)'} : {} }></div>
      {/* 是否使用 */}
      {
        coupon.status ===  4 || coupon.status === 2 ? (
          <div className="coupon-tip">{coupon.status ===  4 ? '已失效' : '已使用'}</div>
        ) : null
      }
      
      {/* 底部详细描述内容部分 */}
      <div className="coupon-desc" style={ coupon.status ===  4 || coupon.status === 2  ? {backgroundColor: '#cecece'} : {} }>
        {/* 有效期限 */}
        <div className="coupon-time">
        <span>有效期限：</span>
        {moment(Number(coupon.startTime) * 1000).format('YYYY/MM/DD HH:mm:ss')} - {moment(Number(coupon.endTime) * 1000).format('YYYY/MM/DD HH:mm:ss')}
        </div>
        {/* 适用范围 */}
        <p className="coupon-area">
        <span>使用范围：</span>
        {coupon.couponDesc?.scopeDesc}</p>
      </div>
      {/* 底下背景 */}
      <div className="coupon-b-bg" style={ coupon.status ===  4 || coupon.status === 2  ? {backgroundImage: 'url(/static3/media/gray-b-bg.5f2255b6.png)'} : {} }></div>
    </li>
  )
}

export default CouponItem;