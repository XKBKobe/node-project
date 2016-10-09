/*
*订单商品评价列表
*/
import React , { Component } from 'react';
import BaseComponent from '../../baseComponent';
import styles from '../../../styles/user/User_OrderCommentListStyle';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { queryUserOrderCommentList } from '../../../../common/actions/User_orderActions';

class CommentList extends BaseComponent{
  constructor(props) {
    super(props);

    this.renderCommentGoodsList = this.renderCommentGoodsList.bind(this);
    this.renderCommentBtn = this.renderCommentBtn.bind(this);
  }

  componentDidMount() {
    let orderId = this.props.location.query.orderId;
    this.props.queryUserOrderCommentList(orderId);
  }
  //评价按钮
  renderCommentBtn(isCommented,index,good_img,goodsId) {
    if (isCommented) {
      return (
        <div style = { styles.orderCommentBtn }>
          <p style = { styles.blackBtnFont }>已评价</p>
        </div>
      )
    }else {
      let orderId = this.props.location.query.orderId;
      return (
        <Link to = {{ pathname:'/UserOrderCommment',query:{goodsImg: good_img.url,orderId: orderId, goodsId: goodsId} }} style = { styles.orderUncommentBtn }>
          <p style = { styles.redBtnFont }>评价晒单</p>
        </Link>
      )
    }
  }
  //待评价商品列表
  renderCommentGoodsList(listData) {
    let self = this;
    return (
      listData.map(function(data,index){
        let url = data.good_img?data.good_img.url:'';
        let isCommented = data.commented?true:false;
        return (
          <div key = { index } style = { styles.list }>
            <div style = {styles.orderCommentCell} >
      				<img style = { styles.orderCommentImg } src = {url}/>
              <p style = { styles.goodsTitle }>{data.goods_name}</p>
              <div style = { styles.goodsTotal }>
                <p style = { styles.goodsCount }>{data.goods_saleprice}</p>
                <p style = { styles.goodsNum }>x{data.goods_num}</p>
              </div>
            </div>
            {self.renderCommentBtn(isCommented,index,data.good_img,data.goods_id)}
          </div>
        )
      })
    )
  }
  hasDataRender() {
    let orderCommentData = this.props.userOrderCommentlistReducer.orderCommentListData.data.goodList;
    console.log(this.props.userOrderCommentlistReducer.orderCommentListData);
    return (
      <div style = { styles.goodsListView }>
        {this.renderCommentGoodsList(orderCommentData)}
      </div>
    )
  }

  render () {
    const { userOrderCommentlistReducer } = this.props;
    let orderCommentData = userOrderCommentlistReducer.orderCommentListData?userOrderCommentlistReducer.orderCommentListData.data.goodList.length:null;

    let headerParam = {
      isHeaderShow: true,
      headerName: '评价晒单',
      isBackShow: true
    };
    let netRequestParam = {
      isRequesting: false,
      isDataRequestSucc: true,
      hasData: orderCommentData
    };
    return (
      <div style = { styles.container }>
				{super.allSceneRender(headerParam, netRequestParam)}
      </div>
    )
  }
}


function mapStateToProps(state){
	const { userOrderCommentlistReducer } = state;
  return {
		userOrderCommentlistReducer
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
    queryUserOrderCommentList
	},dispatch)
}

//将state和dispatch映射在props上
export default connect(mapStateToProps,mapDispatchToProps)(CommentList)
