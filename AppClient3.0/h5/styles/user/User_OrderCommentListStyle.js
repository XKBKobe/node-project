var styles = {
  scrollView : {
		height : '11.58rem',
	},
  container : {
		display : "flex",
		flexDirection : "column",
    width : '7.5rem',
    deleteNext: "true",
    backgroundColor : 'white',
	},
  goodsListView : {
    flexDirection : 'column',
    borderTop : '10px solid #f3f3f3',
    marginTop : '0.9rem',
  },
  list : {
    display : 'flex',
    flexDirection : 'column',
    borderBottom : '1px solid #f3f3f3',
  },
	orderCommentCell : {
		display : 'flex',
    height : '1.52rem',
    flexDirection : 'row',
		justifyContent : 'space-between',
	},
	orderCommentImg : {
		marginLeft : '0.3rem',
		marginTop : '0.3rem',
    height : '1.2rem',
    width : '1.2rem',
	},
  goodsTitle : {
		flex : 1,
    fontSize : '0.24rem',
    color : '#333333',
		textAlign : 'left',
		marginLeft : '0.3rem',
		marginTop : '0.36rem',
  },
	goodsTotal : {
    display : 'flex',
    flexDirection : 'column',
		marginTop : '0.38rem',
		marginLeft : '0.22rem',
		marginRight : '0.28rem',
	},
  goodsCount : {
    fontSize : '0.24rem',
    color : '#333333',
  },
	goodsNum : {
    fontSize : '0.24rem',
    color : '#333333',
		marginTop : '0.06rem',
		alignSelf : 'flex-end',
	},
	orderUncommentBtn : {
    display : 'flex',
		height : '0.56rem',
		width : '1.56rem',
		backgroundColor : '#ff6700',
		borderRadius : '5px',
		marginRight : '0.3rem',
		marginBottom : '0.3rem',
		alignSelf : 'flex-end',
    justifyContent : 'center',
    alignItems : 'center',
	},
  orderCommentBtn : {
    display : 'flex',
		height : '0.56rem',
		width : '1.56rem',
		backgroundColor : '#999999',
		borderRadius : '5px',
		marginRight : '0.3rem',
		marginBottom : '0.3rem',
		alignSelf : 'flex-end',
    justifyContent : 'center',
    alignItems : 'center',
	},
  blackBtnFont : {
    fontSize : '0.24rem',
		color : '#333333',
  },
  redBtnFont : {
    fontSize : '0.24rem',
		color : 'white',
  },
}

module.exports = styles;
