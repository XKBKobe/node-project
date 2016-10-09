/**
 * author : bianlongting
 * email : 1137060420@qq.com
 * date : 2016-08-16 16:13
 * description : 忘记密码
 */

import React , { Component } from 'react';
import { Link , hashHistory} from 'react-router';
import styles from '../styles/loginStyle';
import request from '../../common/config/request';
import "babel-polyfill";

export default class forgerPwd extends Component {
	constructor(props) {
	  	super(props);
	  	this.state = {
	  		phone : "",
	  		verify : "",
	  		imgverify : "",
	  		pwd : "",
	  		repwd : "",
	  		checked : false,
	  		iClose : false,
	  		verifyValue : "获取验证码",
	  		verifyFlag : true,
	  		flag : false,
	  		imgSrc : "http://api3.bestinfoods.com/user/post/piccertcode"
	  	};
	}
	render () {
		const { img , protocolClick }  = this.props;
		const reyesImg = this.state.reflag ? "common/images/ic_show_pw@3x.png" : "common/images/ic_hide_pw@3x.png" ;
		const logined = !this.state.checked ? styles.logined : Object.assign({},styles.logined,styles.logineded);
		const close = this.state.iClose ? styles.clearInput : Object.assign({},styles.clearInput,{ visibility : "hidden"});
		const eyesImg = this.state.flag ? "common/images/ic_show_pw@3x.png" : "common/images/ic_hide_pw@3x.png" ;
		return (
			<div style = { styles.login } >
				<div style = { styles.header } >
					<p style = { styles.headerTip } >找回密码</p>
				</div>
				<div style = { styles.loginIn } >
					<input style = { styles.loginInput } value = { this.state.phone } autoFocus = { true } ref = "phone" onChange={ () => this.phoneChange()} type = "number" placeholder = "请输入您的手机号" />
					<img style = { close } onClick = { () => this.clearInput() } src = "common/images/ic_clear_input@3x.png" />
					<p style = { styles.verify } onClick = { () => this.getVerify() } >{this.state.verifyValue}</p>
				</div>
				<div style = { styles.loginIn } >
					<input style = { styles.loginInput } value = { this.state.verify } ref = "verify" onChange = { () => this.verifyChange() } type = "number" placeholder = "请输入短信验证码" />
				</div>
				{/*<div style = { styles.loginIn } >
					<input style = { styles.loginInput } value = { this.state.imgverify } ref = "imgverify" onChange = { () => this.imgverify() } type = "number" placeholder = "请输入图片验证码" />
					<img style = { styles.imgverify } src= { this.state.imgSrc } onClick = { () => this.imgChange() } />
				</div>*/}
				<div style = { styles.loginIn } >
					<input style = { styles.loginInput } value = { this.state.pwd } ref = "pwd" onChange = { () => this.pwdChange(this.refs.pwd,1) } type = "password" placeholder = "请输入(6-20)位密码" />
					<img onClick ={ () => this.showPwd() } ref = "eyes" style = { styles.eyes } src = { eyesImg } />
				</div>
				<div style = { styles.loginIn } >
					<input style = { styles.loginInput } value = { this.state.repwd } ref = "repwd" onChange = { () => this.pwdChange(this.refs.repwd,2) } type = "password" placeholder = "请确认密码" />
					<img onClick ={ () => this.reshowPwd() } ref = "eyes" style = { styles.eyes } src = { reyesImg } />
				</div>
				<button onClick = { () => this.loginHandle() } style = { logined } >提交</button>
			</div>
		)
	}
	phoneChange (){			//手机号
		const refs = this.refs;
		var val = refs.phone.value;
		if(val.length > 11){
			return false;
		}
		this.setState({
			iClose : val.length == 0 ? false : true,
			phone: val,
			checked : (val.length == 11 && refs.verify.value.length == 6 && (refs.pwd.value.length >=6 && refs.pwd.value.length <= 20) && (refs.repwd.value.length >=6 && refs.repwd.value.length <= 20) )
		})
	}
	verifyChange (){		//验证码
		const refs = this.refs;
		const val = refs.verify.value;
		if(val.length > 6){
			return false;
		}
		this.setState({
			verify: val,
			checked : (refs.phone.value.length == 11 && val.length == 6 && (refs.pwd.value.length >=6 && refs.pwd.value.length <= 20) && (refs.repwd.value.length >=6 && refs.repwd.value.length <= 20) )
		})
	}
	pwdChange (param,index){
		var refs = this.refs;
		var pwd = param.value;
		if (/[@#$%^&*]+/g.test(pwd)) {
			alert("不要输入非法字符");
			return false;
		}else if (pwd.length > 20) {
			return false
		}

		if (index == 1) {
			this.setState({
				pwd : pwd,
				checked : (refs.phone.value.length == 11 && refs.verify.value.length == 6 && (pwd.length >=6 && pwd.length <= 20) && (refs.repwd.value.length >=6 && refs.repwd.value.length <= 20) )
			})
		}else{
			this.setState({
				repwd: pwd,
				checked : (refs.phone.value.length == 11 && refs.verify.value.length == 6 && (pwd.length >=6 && pwd.length <= 20) && (refs.pwd.value.length >=6 && refs.pwd.value.length <= 20) )
			})
		}

	}
	clearInput (){			//清空手机号
		const refs = this.refs;
		this.setState({
			iClose : false,
			phone : ""
		})
	}
	getVerify (){			//获取验证码
		var self = this;
		if (self.state.verifyFlag) {
			var phoneVal = self.refs.phone.value.replace(/\s/g,"");
			if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phoneVal)) {
				alert("请输入正确的手机号");
				return false;
			}else{
				var obj = {
					mobile : phoneVal
				}
				request("http://api3.bestinfoods.com/user/message/pwd_code", "POST", obj)
				.then(data => {
					if (data.errorcode == 0) {
						var leftTime = 60;
						var timer  = setInterval(function(){
							if (leftTime == 0) {
								self.setState({
									verifyValue : "重新发送"
								});
								clearInterval(timer);
								self.setState({
									verifyFlag : true
								})
								return false;
							}else{
								self.setState({
									verifyValue : leftTime -- + "(s)",
									verifyFlag : false
								})
							}
						},1000);
					}else{
						alert(data.message);
					};
				})
			}
		};
	}
	imgverify (){
	}
	imgChange (){
		this.setState({
			imgSrc : "http://api3.bestinfoods.com/user/post/piccertcode?" + Math.random()
		})
	}
	loginHandle (){		//登录
		const checked = this.state.checked;
		const ref = this.refs;
		const pwd = ref.pwd.value;
		const repwd = ref.repwd.value;
		const phone = ref.phone.value;
		if (!checked) {
			return false;
		}else if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phone)) {
			alert("请输入正确的手机号");
			return false;
		}else if (pwd != repwd ) {
			alert("密码不一致");
			return false;
		}else{
			var obj = {
				mobile : ref.phone.value,
				code : ref.verify.value,
				password : pwd,
				passwordRepeat : repwd
			};
			request("http://api3.bestinfoods.com/user/password/find_pwd","POST",obj)
			.then(data => {
				if (data.errorcode == 0) {
					hashHistory.push('/loginIn');
				}else{
					alert(data.message)
				}
			})

		}
	}
	showPwd () {
		const ref = this.refs;
		this.setState({
			flag : !this.state.flag
		})
		ref.pwd.type = this.state.flag ? "password" : "text";
	}
	reshowPwd () {
		const ref = this.refs;
		this.setState({
			reflag : !this.state.reflag
		})
		ref.repwd.type = this.state.reflag ? "password" : "text";
	}

};