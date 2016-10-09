//个人设置界面  lxf

import React, { Component } from 'react';
import BaseComponent from './baseComponent';
import NavigatorBar from '../components/navigatorBar_noRightBtn';
import { Link, hashHistory } from 'react-router';
import styles from '../styles/User_settingStyle';
import request from '../../common/config/request';
import { COOKIE_KEY_LOGINSTATUS , getCookie } from '../../common/config/cookieOperate';

export default class UserSetting extends BaseComponent{
  constructor (props) {
    super (props);

    // this.state = {
    //   is_showLogOutView : true,
    // }

    // this.renderLogOutView = this.renderLogOutView.bind(this);
  }

  // renderLogOutView() {
  //   return (
  //     <div style = { styles.logOutView }>
  //       <div style = { styles.alertVeiw }>
  //         <p style = { styles.tipFont }>退出后不会删除任何数据，下次登录依然可以使用本账号</p>
  //         <div style = { styles.speLine }></div>
  //         <p style = { styles.alertRedFont }>退出登录</p>
  //       </div>
  //     </div>
  //   )
  // }

  hasDataRender () {
    return (
      <div  >
        <Link to = '/aboutScreen' style = { styles.cell }>
          <p style = { styles.funFont }>关于源品</p>
          {/*<p style = { styles.contentFont }>V3.0.0</p>*/}
          <img style = { styles.goRightImg } src = 'common/images/icon_right_arrow.png'/>
        </Link>
        <div onClick = { () => this.loginout() } style = { styles.exitCell }>
          <p style = { styles.exitCellFont }>退出当前账号</p>
        </div>
      </div>
    )
  }

  render () {
    let headerParam = {
      isHeaderShow: true,
      headerName: '设置',
      isBackShow: true
    };
    let netRequestParam = {
      isRequesting: false,
      isDataRequestSucc: true,
      hasData: true,
    };
    return (
      <div style = { styles.container }>
				{super.allSceneRender(headerParam, netRequestParam)}
      </div>
    )
  }

  loginout (){
    if (2 == getCookie(COOKIE_KEY_LOGINSTATUS)) {
      request("http://api3.bestinfoods.com/user/deleteec/logout","POST")
      .then( data => {
        if (data.errorcode == 0) {
          hashHistory.goBack();
        }else{
          alert(data.message)
        }
      })
		} else {
			alert('当前用户未登录！');
		}
  }

}
