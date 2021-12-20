import React, { Fragment } from 'react';
import { Breadcrumb, Menu } from 'antd';
import { connect } from 'react-redux';
import { setBreadCrumbArr } from '../../redux/actions';
import './breadcrumb-nav.less';
import { Link } from 'react-router-dom';

function BreadcrumbNav(props) {
  return (
    <div className="secondary-navigator">
      <Breadcrumb separator=">">
        {props.breadcrumbArr.map((item, index) => {
          return (
            <Breadcrumb.Item key={index}>
              <Link
                target="_blank"
                to={{ pathname: item.link }}
                data-target="_blank"
                data-host={props.domain}
                data-src={item.name}
              >
                {item.name}
              </Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
}

export default connect(
  (state) => ({ domain: state.doMain, breadcrumbArr: state.breadcrumbArr }),
  { setBreadCrumbArr }
)(BreadcrumbNav);
