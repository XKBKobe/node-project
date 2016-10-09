/**关注的品牌**/

var styles = {
  scrollView: {
        height: "11.5rem",
    },
	container : {
		display: "flex", display : "-webkit-flex", display : "-moz-flex", alignItems: "center", WebkitAlignItems : "center", MozAlignItems : "center", justifyContent: "center", flexDirection : "row", WebkitFlexDirection : "row", MozFlexDirection : "row",,
		flexDirection : "column",
    backgroundColor : 'white',
    deleteNext: "true",
		marginTop : '0.88rem',
	},
  brands : {
		display: "flex", display : "-webkit-flex", display : "-moz-flex", alignItems: "center", WebkitAlignItems : "center", MozAlignItems : "center", justifyContent: "center", flexDirection : "row", WebkitFlexDirection : "row", MozFlexDirection : "row",,
		flexDirection : "row",
    height : "1.3rem",
    alignItems : 'center',
    paddingLeft : '0.3rem',
    paddingRight : '0.3rem',
    borderTop : '1px solid #f3f3f3',
  },
	goodsImg : {
  width : "1rem",
  height : "1rem",
	},
  goodsInfo : {
    flexDirection : "column",
    marginLeft : "0.3rem",
    flex : 1,
  },
	name : {
    marginBottom : "0.1rem",
    fontSize : "0.3rem",
	},
	detail : {
    fontSize : "0.3rem",
    // whiteSpace:'nowrap';
	},
	concern : {
    backgroundColor : "#d4d4d4",
    color : "white",
		textAlign : "center",
    width : "1rem",
    height : "0.5rem",
		fontSize : "0.26rem",
		lineHeight : "0.5rem",
    borderRadius : '1px',
	},
  unconcern : {
    backgroundColor : "#d4d4d4",
    color : "#494949",
		textAlign : "center",
    width : "1rem",
    height : "0.5rem",
		fontSize : "0.26rem",
		lineHeight : "0.5rem",
    borderRadius : '1px',
	},
}

module.exports = styles;
