/**
 * Created by zhangheng on 2016/8/2.
 */

var styles = {
    
    addressDetail_D : {
        display : "flex",
        flexDirection:"column",
        background : "#fff"
    },
    addressDetailOrder_D : {
        display : "flex",
        flexDirection:"column",
        background : "#fff",
        marginTop : "0.9rem"
    },
    addressDetailColumn_D : {
        display : "flex",
        background : "#fff",
        height : "0.9rem",
        alignItems : "center",
        justifyContent : "space-between",
        flexDirection : "row",
        paddingLeft : "0.3rem",
        position : "fixed",
        width : "7.5rem"
    },
    addressDetailSave_S : {
        display : "flex",
        marginRight : "0.2rem",
        fontSize : "0.4rem",
        alignItems : 'flex-end'
    },
    addressDetailLine_D : {
        background : "#DBDBDB",
        height : 1
    },
    addressDetailDefault_D : {
        display : "flex",
        textAlign : "left",
        height : "0.6rem",
        paddingLeft : "0.3rem",
        paddingTop : "0.32rem",
        alignItems : "flex-start"
    },
    addressDetailDefault_P : {
        display : "flex",
        fontSize : "0.28rem",
        alignItems : "center",
        color : "#333333"
    },
    addressDetailDeta_I : {
        width : "0.38rem",
        height : "0.38rem",
        float : "right",
        marginRight : "0.2rem",
        marginLeft : "4.5rem"
    },
    addressDetailItem_D : {
        display : "flex",
        paddingLeft : "0.3rem",
        height : "0.88rem",
        flexDirection : "row",
        alignItems : "center"
    },
    addressDetailInfo_D : {
        display : "flex",
        paddingLeft : "0.3rem",
        height : "1.28rem",
        flexDirection : "row",
        alignItems : "flex-start",
        paddingTop : "0.24rem"
    },
    addressDetailCheck_I : {
        width : "0.16rem",
        height : "0.16rem",
        marginRight : "0.1rem",
        color : "#FF6700",
        marginBottom : "0.14rem"
    },
    addressDetailCheckNew_I : {
        width : "0.16rem",
        height : "0.16rem",
        marginRight : "0.1rem",
        marginTop : "0.14rem"
    },
    addressDetailInput_In : {
        border : "none",
        fontSize : "0.32rem",
        marginLeft : "0.16rem",
        deleteNext: "true",
        outline : "none",
        textAlign : "left",
        height : "0.8rem",
        width : "5rem"
    },
    addressDetailInputName_In : {
        border : "none",
        fontSize : "0.32rem",
        deleteNext: "true",
        outline : "none",
        textAlign : "left",
        height : "0.8rem",
        width : "5rem",
        marginLeft : "0.45rem"
    },
    addressDetailLongInput_In : {
        border : "none",
        fontSize : "0.32rem",
        marginLeft : "0.16rem",
        deleteNext: "true",
        outline : "none",
        textAlign : "left",
        height : "1.2rem",
        width : "5rem"
    },
    addressDetailIdCardInput_In : {
        border : "none",
        fontSize : "0.32rem",
        deleteNext: "true",
        outline : "none",
        textAlign : "left",
        height : "0.8rem",
        width : "5.5rem",
        marginLeft : "0.6rem"
    },
    areaProCityCounty_P : {
        display : "flex",
        color : "#999999",
        fontSize : "0.28rem",
        height : "0.8rem",
        width : "5rem",
        alignItems : "center",
        justifyContent : "flex-end"
    },
    areaProCityCountyImg_I : {
        width : "0.2rem",
        height : "0.3rem",
        marginLeft : "0.12rem"
    },
    back_I : {
        width : "0.24rem",
        height : "0.44rem"
    },
    textFont_P : {
        display : "flex",
        fontSize : "0.4rem",
        color : "#333333"
    },
    addressDetail_S : {
        fontSize : "0.22rem",
        color : "#595056",
        width : "6.9rem"
    },
    saveAddress_B : {
        fontSize : "0.32rem",
        color : "#666666",
        background : "#DDDDDD",
        height : "0.88rem",
        justifyContent : "center",
        alignItems : "center",
        marginTop : "5rem"
    },
    saveAddressTrue_B : {
        fontSize : "0.32rem",
        color : "#ffffff",
        background : "#FF6700",
        height : "0.88rem",
        justifyContent : "center",
        alignItems : "center",
        marginTop : "5rem"
    },
    saveAddressOrder_B : {
        fontSize : "0.32rem",
        color : "#666666",
        background : "#DDDDDD",
        height : "0.88rem",
        justifyContent : "center",
        alignItems : "center",
        marginTop : "6.2rem"
    },
    saveAddressOrderTrue_B : {
        fontSize : "0.32rem",
        color : "#ffffff",
        background : "#FF6700",
        height : "0.88rem",
        justifyContent : "center",
        alignItems : "center",
        marginTop : "6.2rem"
    },
    addressDetailTitle_D : {
        display : "flex",
        flexDirection : "column"
    },
    areaDetailContentView: {
        //省市县弹框
        display : 'flex',
        flexDirection : 'column',
        deleteNext : "true",
        position : 'fixed',
        width : '7.5rem',
        height: "7rem",
        backgroundColor : '#ffffff',
        zIndex : 10001,
        opacity : "1",
        marginTop : "6rem",
        bottom : 0
    },
    areaDetailShadow: {
        display : "flex",
        width : "7.5rem",
        height: "13.5rem",
        opacity: "0.5",
        deleteNext : "true",
        position: "fixed",
        backgroundColor : "#000000",
        zIndex : "10001",
        top : 0
    },
    cancelImg_Im : {
        width : "0.3rem",
        height : "0.3rem",
        display : "flex",
        alignItems : "center",
        marginRight : "0.2rem"

    },
    cancelTitle_P : {
        fontSize : "0.32rem",
        color : "#333333"
    },
    cancelStyle_D : {
        display : "flex",
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        height : "0.9rem",
        background : "#ffffff"
    },
    selectAddress_D : {
        display : "flex",
        alignItems : "center",
        height : "0.6rem"
    },
    selectAddressText_P : {
        display : "flex",
        alignItems : "center",
        fontSize : "0.3rem",
        color : "#FF6700",
        marginLeft : "0.1rem",
        marginRight : "0.1rem",
        // height : "0.6rem"
        // borderBottomWidth : 3,
        // borderBottomColor : "#FF0000",
        // borderBottomStyle : "solid",

    },
    unSelectAddressText_P : {
        display : "flex",
        alignItems : "center",
        fontSize : "0.3rem",
        color : "#333333",
        marginLeft : "0.1rem",
        marginRight : "0.1rem",
    },
    areaList_D : {
        display : "flex",
        alignItems : "center",
        height : "0.6rem",
        width : "7.5rem"
    },
    areaItemText_P : {
        fontSize : "0.32rem",
        color : "#333333",
        marginLeft : "0.3rem"
    },
    scrollViewTwo: {
        height : "5.22rem",
        width : "7.5rem",
        background : "#ffffff"
    },

    maskFloor_D : {
        display : "flex",
        flexDirection : "column",
    },

    chooseItem_D : {
        display : "flex",
        flexDirection : "row",
        height : "0.88rem",
        background : "#F0F0F0",
        paddingLeft : "0.22rem"
    },
    topTabButton : {
        //省市县 选中
        display : "flex",
        flexDirection : "column",
        width : "2.5rem",
        alignItems : "center",
        justifyContent : "center",
        height : "0.9rem",
        borderBottomWidth : 2,
        borderBottomColor : "#FF0000",
        borderBottomStyle : "solid"
    },
    selectTopTabButton : {
        display : "flex",
        flexDirection : "column",
        width : "2.5rem",
        alignItems : "center",
        justifyContent : "center",
        height : "0.88rem",
        borderBottomWidth : 3,
        borderBottomColor : "#FF6700",
        borderBottomStyle : "solid"
    },
    tabTopButton : {
        fontSize : "0.3rem",
        color : "#9A8994",
        marginTop : "0.2rem"
    },
    unSelectTabTopButton : {
        fontSize : "0.3rem",
        color : "#9A8994",
        marginTop : "0.2rem"
    },
    topTabView_D : {
        //三个tab导航栏
        display : "flex",
        height : "0.89rem",
        background : "#ffffff",
        flexDirection : "row",
        deleteNext: "true",
        position : "fixed",
        deleteNext: "true",
        top : "1.23rem"
    },
    topLine_D : {
        deleteNext : "true",
        position : "fixed",
        deleteNext: "true",
        top : "2.19rem",
        background : "#DBDBDB",
        height : "0.02rem",
        width : "7.5rem"
    },

    contentView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: "5.1rem",
        width : "7.5rem",
        zIndex : 10014,
        background : "#ffffff",
        deleteNext : "true",
        position : "fixed",
        bottom : "0"
    },
    //height: window.innerHeight,

};

module.exports = styles;