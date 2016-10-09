/**
 * Created by zhangheng on 2016/8/20.
 * 确认订单界面 选择优惠券
 */

import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BaseComponent from './baseComponent';
import * as couponExchangeActions from '../../common/actions/couponExchangeActions';
import { browserHistory,Link } from 'react-router';
import styles from "../styles/addressListStyles";
import footStyles from "../styles/couponListStyles";
import confirmStyles from "../styles/confirmOrderAddressStyles";
import conCouponStyles from "../styles/confirmOrderCouponStyles";
import STRING_RESOURCE from '../../common/StringResource';
import {imageUrls} from '../special/stringImage';
import stylesBase from '../styles/baseComponent';


 class ConfirmOrderCoupon extends BaseComponent{

    constructor(props){
        super(props);
        this.state={
            couponCode:"",
            isDefault: false,
        }
    }


    //接收参数
     componentWillMount(){
         this.props.couponListData.splice(0,1);
     }


    //render之前 获取props
    componentWillReceiveProps(nextProps) {
        if (nextProps.couponInfoState.couponCodeData){
            this.props.couponListData.push(nextProps.couponInfoState.couponCodeData.data);
        }
    }


    handleChange(event) {
        this.setState({couponCode: event.target.value});
    }


    //提交券码 兌換优惠券
     submitCouponCode(){
         if (this.state.couponCode){
             this.props.couponExchangeActions.couponExchangeData(this.state.couponCode);
         }else {
             alert("请输入优惠券码");
         }
     }


     //不使用优惠券
     unSelectCoupon(){
         browserHistory.goBack();
     }


     //选中一项
     singleSelect(couponId){
         this.props.couponExchangeActions.sendCouponData(couponId);
         browserHistory.goBack();
     }


     //格式时间
     formatDate(now) {

         var dataTime=new Date(now);
         var year=dataTime.getFullYear();
         var month= dataTime.getMonth()+1;
         var date=dataTime.getDate();
         if (month<10){
             month = "0"+month;
         }
         if (date<10){
             date = "0"+date;
         }
         return year+"."+month+"."+date;
     }


     //优惠券列表
     enableUseList(){

         var _this = this;
         if (this.props.couponListData){
             return (
                 this.props.couponListData.map((couponItem, index) =>  {

                     var star_time = this.formatDate(couponItem.star_time*1000);
                     var end_time = this.formatDate(couponItem.end_time*1000);

                     return <div style={conCouponStyles.couponItemOrderRow_D}
                                 key={index}
                                 onClick={()=>_this.singleSelect(couponItem.id)}>
                         <img src="common/images/orderCoupon_used.png" style={conCouponStyles.couponItemOrderImg_I}/>
                         <div style={conCouponStyles.couponValueStyleNew_D}>
                             <div style={conCouponStyles.couponValueStyle_D}>
                                 <p style={footStyles.couponItemRight_P}>
                                     {couponItem.coupon_award}
                                 </p>
                                 <p style={footStyles.couponValue_P}>元</p>
                             </div>
                             <p style={footStyles.couponValueNew_P}>满{couponItem.coupon_condition}元使用</p>
                         </div>

                         <div style={conCouponStyles.couponItemOrder_D}>
                             <p style={footStyles.couponItemFirstText_D}>{couponItem.activity_name}</p>
                             <p style={footStyles.couponItemSecond_D}>适用范围：{couponItem.good_type}</p>
                             <div style={footStyles.couponItemThird_D}>
                                 <p style={footStyles.couponItemSecond_D}>{STRING_RESOURCE.couponValueTime}</p>
                                 <p style={footStyles.couponItemSecond_D}>{star_time}-</p>
                                 <p style={footStyles.couponItemSecond_D}>{end_time}</p>
                             </div>
                         </div>

                         <div style={conCouponStyles.checkStyle_D}>
                             <img src={_this.state.isDefault ? imageUrls.addressDetail: imageUrls.addressDetailDown}
                                  style={conCouponStyles.checkImg_I}/>
                         </div>
                     </div>
                 })
             )
         }
     }

    //展示数据
    hasDataRender(){

        return (
            <div style={styles.bgColor}>

                <div style={conCouponStyles.line_D}/>
                <div style={conCouponStyles.tabLine}/>

                {this.isLoadingRenderState()}

                <div style={conCouponStyles.exchangeCoupon_D}>
                    {/*<p style={conCouponStyles.exchangeCouponText_P}>兑换优惠券</p>*/}
                    <input type="text" placeholder={STRING_RESOURCE.couponCodeHint}
                           style={conCouponStyles.exchangeCouponInput_I}
                           value={this.state.couponCode}
                           onChange={this.handleChange.bind(this)}
                    />
                    <p style={conCouponStyles.exchangeCou_P} onClick={()=> this.submitCouponCode()}>{STRING_RESOURCE.couponExchange}</p>
                </div>

                <scrollView style={styles.scrollView} >
                    <div style={conCouponStyles.couponList_D}>
                        {this.enableUseList()}
                    </div>
                    <p style={conCouponStyles.noUsedCoupon_P}
                       onClick={()=> this.unSelectCoupon()}>{STRING_RESOURCE.exchangeCouponCode}</p>
                </scrollView>
            </div>
        )
    }


     //加载中
     isLoadingRenderState() {

         if (this.props.couponInfoState.loadingData){
             return (
                 <div style = {stylesBase.contentView}>
                     <img
                         style = {stylesBase.loadingImage}
                         src = {imageUrls.loading}
                     />
                     <p style = {stylesBase.loadingText}>
                         {STRING_RESOURCE.isLoadingWaitMinute}
                     </p>
                 </div>
             );
         }
     }


    render() {

        const {couponInfoState} = this.props;

        var headerParam = {
            isHeaderShow: true,
            headerName: STRING_RESOURCE.couponListTitle,
            isBackShow: true
        };

        var netRequestParam = {
            isRequesting: false,
            isDataRequestSucc: true,
            hasData: true
        };
        return super.allSceneRender(headerParam, netRequestParam);
    }
}


function mapStateToPropsTe(state) {
    const {couponInfoState, makeSureOrderState} = state;
    return {
        couponInfoState,
        couponListData: makeSureOrderState.couponData
    }
}

function mapDispatchToPropsTe(dispatch) {
    return {
        couponExchangeActions: bindActionCreators(couponExchangeActions, dispatch)
    }
}
export default connect(mapStateToPropsTe, mapDispatchToPropsTe)(ConfirmOrderCoupon);
