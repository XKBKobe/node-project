/*
 * 订单状态组件
 */

import React , { Component } from 'react';
import styles from '../styles/settingStyle';
import { Link } from 'react-router';

export default class Order extends Component {
	render () {
		const { actions } = this.props;
		return (
			<div onClick = {() =>actions() } >
				<div style = { styles.orderItems }>
					<img style = { styles.orderItemImg } src = { this.props.src } resizeMode="contain"/>
					<p style = { styles.orderInfo } > { this.props.tip } </p>
				</div>
			</div>
		)
	}
}
