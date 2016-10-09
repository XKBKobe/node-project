/*
*订单评价
*/
import React , { Component } from 'react';
import BaseComponent from '../../baseComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../../../styles/user/User_orderCommentStyle';
import { querySubmitCommentMessage } from '../../../../common/actions/User_orderActions';
import {browserHistory, Link} from 'react-router';

class CommentView extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      starts : [1,1,1,1,1],
      goodsImgs : [],
      mark : 5,
      message: '',
      isAddImg : true,
    }
    this.renderStartView = this.renderStartView.bind(this);
    this.changeComponent = this.changeComponent.bind(this);
    this.renderGoodsImgView = this.renderGoodsImgView.bind(this);
    this.addGoodsImg = this.addGoodsImg.bind(this);
    this.delGoodsImg = this.delGoodsImg.bind(this);
    this.getGoodsImg = this.getGoodsImg.bind(this);
    this.renderGoodsImg = this.renderGoodsImg.bind(this);
    this.submitCommentInfo = this.submitCommentInfo.bind(this);
  }
  //星星界面
  renderStartView() {
    for (var i = 5; i > this.state.mark; i--) {
      this.state.starts[i-1] = 0
    }
    return (
      this.state.starts.map((select,index)=>{
        let url = select ? 'common/images/star_select.png' : 'common/images/star_unSelect.png';
        let start = index+1;
        return (
          <div key = { index } style = { styles.starView } onClick = {()=>this.setState({mark:start,starts : [1,1,1,1,1]})}>
            <img style = { styles.startImg } src = {url}/>
          </div>
        )
      })
    )
  }
  //渲染nav右侧按钮
  headerRightRender() {
      return (
        <div style={ styles.navRightView } onClick = {() => this.submitCommentInfo() }>
          <p style = { styles.submitFont }>提交</p>
        </div>
      )
  }
  submitCommentInfo() {
    let orderId = this.props.location.query.orderId;
    let goodsId = this.props.location.query.goodsId;
    let content = this.state.message;
    let score = this.state.mark;
    let imgs = this.state.goodsImgs;
    this.props.querySubmitCommentMessage(orderId,goodsId,content,score,imgs);
  }
  //评论内容
  changeComponent(change) {
    this.state.message = change.target.value
  }
  //添加图片
  addGoodsImg() {
    if(typeof FileReader==='undefined'){
      console.log('抱歉，你的浏览器不支持 FileReader');
    }else{
     console.log('支持监听');
     let input = this.refs.file_input;
     input.addEventListener('change',this.getGoodsImg,false); //如果支持就监听改变事件，一旦改变了就运行readFile函数。
    }
  }
  //预览图片
  getGoodsImg(info) {
    let self = this;
    let files = info.target.files;
    let f = files[0];
    let length = self.state.goodsImgs.length;
    var reader = new FileReader();
    reader.onload = (function(theFile){
      return function(e){
        self.state.goodsImgs[length-1] = e.target.result;
        self.setState({
          goodsImgs : self.state.goodsImgs,
          isAddImg : true,
        })
      }
    })(f);
    reader.readAsDataURL(f);
  }
  //删除图片
  delGoodsImg(index) {
    this.state.goodsImgs.splice(index,1);
    this.setState({
      goodsImgs : this.state.goodsImgs,
    })
  }
  //渲染评价图片界面
  renderGoodsImg(img,index) {
    console.log(index+1,'==',this.state.goodsImgs.length);
    if (index+1==this.state.goodsImgs.length&&index<5&&!this.state.isAddImg) {
      return (
        <div style = { styles.goodsImgView }>
          <img style = { styles.goodsImg } src = {img}/>
          <input type="file" ref="file_input" accept="image/*" style = { styles.inputView } onClick = { ()=>this.addGoodsImg()}/>
        </div>
      )
    }else {
      return (
        <div key = { index } style = { styles.goodsImgView }>
          <img style = { styles.goodsImg } src = {img}/>
          <div onClick = { ()=>this.delGoodsImg(index) }>
            <img style = { styles.delImg } src = 'common/images/delGoodsImg.png'/>
          </div>
        </div>
      )
    }
  }
  //渲染商品图片
  renderGoodsImgView() {
    if (this.state.goodsImgs.length<5&&this.state.isAddImg) {
      this.state.goodsImgs.push('common/images/addGoodsImg.png');
      this.state.isAddImg = false;
    }

    return (
      this.state.goodsImgs.map((img,index)=>{
        return (
          <div key = { index }>
            {this.renderGoodsImg(img,index)}
          </div>
        )
      })
    )
  }
  //
  hasDataRender() {
    // const { userOrderCommentlistReducer } = this.props;
    let url = this.props.location.query.goodsImg;
    return (
      <div style = { styles.commentView }>
        <div style = { styles.markView }>
          <img style = { styles.goodsImg } src = {url}/>
          <p style = { styles.markFont }>评分：</p>
          {this.renderStartView()}
        </div>
        <div style = { styles.ideaView }>
          <textarea
            style = { styles.ideaInput }
            onChange = {(e)=>this.changeComponent(e)}
            placeholder = ' 写下购买体会和使用感受来帮助其他小伙伴~'
            />
        </div>
        <p style = { styles.brefs }>有图有真相，给小伙伴们晒一晒~</p>
        <div style = { styles.goodsImgsView }>
          {this.renderGoodsImgView()}
        </div>
      </div>
    )
  }

  render () {
    // const { userOrderDetailReducer } = this.props;
		// let orderDetailData = userOrderDetailReducer.orderDetailData;

		let headerParam = {
      isHeaderShow: true,
      headerName: '评价晒单',
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



function mapStateToProps(state){
	const { userOrderCommentlistReducer } = state;
  return {
		userOrderCommentlistReducer
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
    querySubmitCommentMessage
	},dispatch)
}

//将state和dispatch映射在props上
export default connect(mapStateToProps,mapDispatchToProps)(CommentView)
