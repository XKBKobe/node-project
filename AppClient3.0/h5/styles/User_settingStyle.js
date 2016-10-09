var styles = {
  container : {
    display : 'flex',
    flexDirection  : 'column',
    width : '7.5rem',
    marginTop : '0.88rem',
    backgroundColor : '#f3f3f3',
  },
  cell : {
    display : 'flex',
    height : '0.88rem',
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    backgroundColor : 'white',
    borderBottom : '1px solid #f3f3f3',
    marginTop : '0.2rem',
  },
  funFont : {
    fontSize : '0.28rem',
    color : '#333333',
    marginLeft : '0.3rem',
  },
  contentFont : {
    flex : 1,
    fontSize : '0.28rem',
    color : '#999999',
    marginRight : '0.16rem',
    textAlign : 'right',
  },
  goRightImg : {
    width : '0.14rem',
    height : '0.28rem',
    marginRight : '0.3rem',
  },
  exitCell : {
    display : 'flex',
    backgroundColor : 'white',
    marginTop : '0.2rem',
    justifyContent : 'center',
    alignItems : 'center',
  },
  exitCellFont : {
    lineHeight : '0.88rem',
    fontSize : '0.28rem',
    color : '#333333',
    textAlign : 'center',
  },
  logOutView : {
    display : 'flex',
    left : 0,
    top : 0,
    width : '7.5rem',
    height : '13.34rem',
    position : 'fixed',
    flexDirection : 'column',
    backgroundColor : 'rgba(0,0,0,0.3)',
    justifyContent : 'flex-end',
    zIndex : 11111,
  },
  alertVeiw : {
    display : 'flex',
    flexDirection : 'column',
    backgroundColor : 'white',
    height : '3rem',
    alignItems : 'center',
    marginLeft : '0.2rem',
    marginRight : '0.2rem',
    marginBottom : '0.18rem',
    borderRadius : '18px'
  },
  tipFont : {
    fontSize : '0.24rem',
    color : '#999999',
    marginTop : '0.62rem',
  },
  speLine : {
    height : '1px',
    backgroundColor : '#e5e5e5',
    marginTop : '0.6rem',
  },
  alertRedFont : {
    fontSize : '0.4rem',
    color : '#fe3842',
    marginTop : '0.46rem',
  },

}
module.exports = styles;
