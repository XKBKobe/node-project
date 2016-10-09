/**
 * Created by zhangheng on 2016/8/3.
 * 个人中心  优惠券列表
 */

import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BaseComponent from './baseComponent';
import * as couponListActions from '../../common/actions/couponListActions';
import { browserHistory, Link } from 'react-router';
import styles from "../styles/addressListStyles";
import TopTabView from "../components/topTabView";
import footStyles from "../styles/couponListStyles";
import STRING_RESOURCE from '../../common/StringResource';
import conCouponStyles from "../styles/confirmOrderCouponStyles";
import {imageUrls} from '../special/stringImage';
import stylesBase from '../styles/baseComponent';




var listText = ["未使用", "已使用", "已过期"];
var listItemState = [
    {textColor: "#FF6700", bgColor: "#FF6700"},
    {textColor: "#333333", bgColor: "#ffffff"},
    {textColor: "#333333", bgColor: "#ffffff"}
];


 class CouponList extends BaseComponent{


    constructor(props) {
        super(props);
        this.state = {
            isShow:false,
            couponCode:null,
            touchIndex:0
        };

        this.submitCouponCodeTouch = this.submitCouponCodeTouch.bind(this);
        this.couponListView = this.couponListView.bind(this);

        this.tabsBarRender = this.tabsBarRender.bind(this);
        this.chooseItem = this.chooseItem.bind(this);
        this.dialogCancel = this.dialogCancel.bind(this);
        this.dialogOk = this.dialogOk.bind(this);
    }


    //userId 待定
    //请求  status=1(可用) =2(已使用) =3(已过期)
     componentWillMount() {
         this.props.couponListActions.queryCouponListData(1);
     }

    //页面销毁
     componentWillUnmount(){

         listText = ["未使用", "已使用", "已过期"];
         listItemState = [
             {textColor: "#FF6700", bgColor: "#FF6700"},
             {textColor: "#333333", bgColor: "#ffffff"},
             {textColor: "#333333", bgColor: "#ffffff"}
         ];
     }


    submitCouponCodeTouch(){
        this.setState({
            isShow:true
        })
    }

    //券码  兌換优惠券
     handleChange(event) {
         this.setState({couponCode: event.target.value});
     }


    //弹框
    submitCouponCode() {
        if (this.state.isShow) {
            return(
                <div>
                    <div style={footStyles.exchangeBombBoxBg_D}/>

                    <div style={footStyles.exchangeBombBox_D}>
                        <p style={footStyles.exchangeCodeTitle}>请输入优惠券码</p>
                        <input type="text"
                               style={footStyles.couponCodeInput_In}
                               value={this.state.couponCode}
                               onChange={this.handleChange.bind(this)}
                        />
                        <div style={footStyles.bottomStyles_D}>
                            <button style={footStyles.buttonStyle_B}
                                    onClick={()=> this.dialogCancel()}>取消</button>
                            <div style={footStyles.columnLin_D}></div>
                            <button style={footStyles.buttonStyle_B}
                                    onClick={()=> this.dialogOk()}>确定</button>
                        </div>
                    </div>
                </div>
            )
        }
    }


     dialogCancel() {
         this.setState({
             isShow:false,
             couponCode:null
         });
     }

     dialogOk() {
         if (this.state.couponCode){
             this.props.couponListActions.exchangeCouponData(this.state.couponCode, this.state.touchIndex);
             this.setState({
                 isShow:false,
                 couponCode:null
             });
         }else {
             alert("请输入优惠券码");
         }
     }


    //选项栏 选中第几个tan
    chooseItem(index){
        this.setState({
            touchIndex:index
        });
        this.props.couponListActions.queryCouponListData(index+1);
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


    //导航栏 右边按钮
     headerRightRender() {
         return (
             <p
                 style={styles.addressDetailSave_P}
                 onClick={() => this.submitCouponCodeTouch()}
             >
                 {STRING_RESOURCE.couponExchange}
             </p>
         )
     }


     //有数据 优惠券列表
     couponListView() {
         return this.props.couponListState.couponListData.data.map((couponItem, index) => {

             var star_time = this.formatDate(couponItem.star_time*1000);
             var end_time = this.formatDate(couponItem.end_time*1000);
             var imgUrl = this.state.touchIndex==0 ? imageUrls.orderCoupon_used : imageUrls.orderCoupon_unUsed;
             return (
                 <div style={footStyles.couponItemRow_D}  key={index}>
                     <img
                         src={imgUrl}
                         style={footStyles.couponItemOrderImg_I}
                     />
                     <div style={footStyles.couponValueStyle_D}>
                         <p style={footStyles.couponItemRight_P}>
                             {couponItem.coupon_award}
                         </p>
                         <p style={footStyles.couponValue_P}>元</p>
                     </div>

                     <div style={footStyles.couponItemLeft_D}>
                         <p style={footStyles.couponItemFirstText_D}>满{couponItem.coupon_condition}元使用</p>
                         <p style={footStyles.couponItemSecond_D}>适用范围：{couponItem.good_type}</p>
                         <div style={footStyles.couponItemThird_D}>
                             <p style={footStyles.couponItemSecond_D}>{STRING_RESOURCE.couponValueTime}</p>
                             <p style={footStyles.couponItemSecond_D}>{star_time}-</p>
                             <p style={footStyles.couponItemSecond_D}>{end_time}</p>
                         </div>
                     </div>
                 </div>
             );
         })
     }

     //展示数据
     hasDataRender() {
         return (
             <div style={footStyles.couponList_D}>
                 {this.couponListView()}
             </div>
         );
     }

     tabsBarRender() {
         return (
             <div style={footStyles.wholeHintStyle}>
                 <div style={footStyles.line_D}></div>
                 <div style={footStyles.topTab_D}>
                     <div style={footStyles.tabLine}></div>
                     <TopTabView
                         listItem={listItemState}
                         list={listText}
                         updateItemChoosen={(index) => this.chooseItem(index)}
                     />
                 </div>
             </div>
         );
     }


     noDataRender() {
         return (
             <div style = {stylesBase.contentView}>
                 <img src="common/images/icon_coupon_null.png" style={footStyles.couponNull_Im}/>
                 <p style = {footStyles.loadingView}>您还没有优惠劵哦~~</p>
             </div>
         );
     }


     //加载中
     isLoadingRenderState() {

         if (this.props.couponListState.loadingData){
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


     headerRender(isHeaderShow, headerName, isBackShow) {
         return (
             <div>
                 {super.headerRender(true, headerName, isBackShow)}
                 {this.tabsBarRender()}
                 {this.submitCouponCode()}
                 {this.isLoadingRenderState()}
             </div>
         );
     }

    render() {
        const {couponListState} = this.props;
        var hasData = false;

        if (null != couponListState.couponListData && 0 != couponListState.couponListData.data.length) {
            hasData = true;
        }

        var headerParam = {
            isHeaderShow: true,
            headerName: STRING_RESOURCE.couponTitle,
            isBackShow: true
        };

        var netRequestParam = {
            isRequesting: couponListState.dataRequesting,
            isDataRequestSucc: couponListState.isDataRequestSucc,
            hasData: hasData
        };

        return super.allSceneRender(headerParam, netRequestParam);
    }
}


function mapStateToPropsTe(state) {
    const {couponListState} = state;
    return {
        couponListState
    }
}

function mapDispatchToPropsTe(dispatch) {
    return {
        couponListActions: bindActionCreators(couponListActions, dispatch)
    }
}
export default connect(mapStateToPropsTe, mapDispatchToPropsTe)(CouponList);