//物流界面
import React , { Component } from 'react';
import BaseComponent from '../../baseComponent';
import { bindActionCreators } from 'redux';
import styles from '../../../styles/user/User_OrderLogisticsStyle';

var arr = [
  '您的货品已从杭州仓发出',
  '货品已到达【杭州转运中心】',
  '货品已到达【杭州转运中心】',
  '货品已到达【杭州转运中心】',
  '【杭州转运中心】已发出 下一站【杭州市余杭区】'
];

export default class LogisticsView extends BaseComponent {
  constructor(props) {
    super(props);

    this.renderLogisticsBaseInfoView = this.renderLogisticsBaseInfoView.bind(this);
    this.renderLogisticsListView = this.renderLogisticsListView.bind(this);
    this.renderLogisticsList = this.renderLogisticsList.bind(this);
  }

  renderLogisticsBaseInfoView () {
    return (
      <div style = { styles.baseInfoView }>
        <div style = { styles.baseInfoCell }>
          <p style = { styles.functionFont }>配送方式：</p>
          <p style = { styles.contentFont }>EMS</p>
        </div>
        <div style = { styles.baseInfoCell }>
          <p style = { styles.functionFont }>物流单号：</p>
          <p style = { styles.contentFont }>2341234124141241</p>
        </div>
        <div style = { styles.baseInfoCell }>
          <p style = { styles.functionFont }>物流状态：</p>
          <p style = { styles.contentFont }>在途中</p>
        </div>
      </div>
    )
  }

  renderLogisticsListView () {
    return (
      arr.map((data,index) => {
        return (
          <div key = {index}>
            {this.renderLogisticsList(data,index)}
          </div>
        )
      })
    )
  }

  renderLogisticsList (data,index) {
    if (0 == index) {
      return (
        <div style = { styles.logisticsListView }>
          <div style = { styles.flagImgView }>
            <img style = { styles.flagStartImg } src = 'common/images/logistics_startFlag.png'/>
            <div style = { styles.endVerticalLine }/>
          </div>
          <div style = { styles.logisticsTopMessageView }>
            <p style = { styles.startContentFont }>{data}</p>
            <div style = { styles.horizontalLine }/>
          </div>
        </div>
      )
    }else if (arr.length-1 == index) {
      return (
        <div style = { styles.logisticsListView }>
          <div style = { styles.flagImgView }>
            <div style = { styles.topVerticalLine }/>
            <img style = { styles.flagImg } src = 'common/images/logistics_middleFlag.png'/>
          </div>
          <div style = { styles.logisticsMessageView }>
            <p style = { styles.functionFont }>{data}</p>
            <div style = { styles.horizontalLine }/>
          </div>
        </div>
      )
    }else {
      return (
        <div style = { styles.logisticsListView }>
          <div style = { styles.flagImgView }>
            <div style = { styles.topVerticalLine }/>
            <img style = { styles.flagImg } src = 'common/images/logistics_middleFlag.png'/>
            <div style = { styles.endVerticalLine }/>
          </div>
          <div style = { styles.logisticsMessageView }>
            <p style = { styles.functionFont }>{data}</p>
            <div style = { styles.horizontalLine }/>
          </div>
        </div>
      )
    }
  }

  hasDataRender() {
    return (
      <div style = { styles.logisticsInfoView }>
        <p style = { styles.orderFollowFont }>订单跟踪</p>
        {this.renderLogisticsListView()}
      </div>
    )
  }

  render () {
    let headerParam = {
      isHeaderShow: true,
      headerName: '物流详情',
      isBackShow: true
    };
    let netRequestParam = {
      isRequesting: false,
      isDataRequestSucc: true,
      hasData: true,
    };
    return (
      <div style = { styles.container }>
        {this.renderLogisticsBaseInfoView()}
				{super.allSceneRender(headerParam, netRequestParam)}
      </div>
    )
  }
}
