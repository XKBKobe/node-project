import React from "react";
import BaseComponent from './baseComponent';
import styles from "../styles/aboutStyle.js";
// import { hashHistory } from 'react-router';

export default class AboutScreen extends BaseComponent {

	hasDataRender () {
		return (
			<div style={styles.aboutView}>
				<div style={styles.about}>
					<img style = {styles.logo} src = "common/images/logo.jpg"  />
					<img style = {styles.code} src = "common/images/code.jpg" />
					<p style = {styles.concern} >扫描二维码 , 让你的</p>
					<p style = {styles.concern} >小伙伴也拥有源品吧</p>
				</div>
				<div style = {styles.phone} >
					<p style={styles.phone_text}>联系源品</p>
					<p style={styles.phone_text}>400-670-1118</p>
				</div>
			</div>
		)
	}

	render (){
		let headerParam = {
      isHeaderShow: true,
      headerName: '关于源品',
      isBackShow: true
    };
    let netRequestParam = {
      isRequesting: false,
      isDataRequestSucc: true,
      hasData: true
    };
    return (
      <div style = { styles.container }>
				{super.allSceneRender(headerParam, netRequestParam)}
      </div>
    )
  }
}
