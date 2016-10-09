import React , { Component } from 'react';
import BaseComponent from '../../baseComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import styles from '../../../styles/user/orderStyle';
import { queryUserOrderData } from '../../../../common/actions/User_orderActions';
import {browserHistory, Link} from 'react-router';

class SuccessfulTrade extends BaseComponent {
  constructor(props) {
    super(props);

  }

  render () {
    let headerParam = {
      isHeaderShow: true,
      headerName: '交易成功',
      isBackShow: true
    };
    let netRequestParam = {
      isRequesting: userOrderReducer.dataRequesting,
      isDataRequestSucc: userOrderReducer.isDataRequestSucc,
      hasData: true,
    };
    return (
      <div style = { styles.container }>
				{super.allSceneRender(headerParam, netRequestParam)}
      </div>
    )
  }
}
