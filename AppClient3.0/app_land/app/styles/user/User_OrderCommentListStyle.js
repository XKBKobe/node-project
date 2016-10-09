var React = require('react-native');
var { StyleSheet } = React;
module.exports = StyleSheet.create({
    "scrollView": {
        "height": 579
    },
    "container": {
        "flexDirection": "column",
        "width": 375
    },
    "goodsListView": {
        "flexDirection": "column",
        "borderTopWidth": 10,
        "borderStyle": "solid",
        "borderTopColor": "#f3f3f3",
        "marginTop": 45
    },
    "list": {
        "flexDirection": "column",
        "borderBottomWidth": 0.5,
        "borderStyle": "solid",
        "borderBottomColor": "#f3f3f3"
    },
    "orderCommentCell": {
        "height": 76,
        "flexDirection": "row",
        "justifyContent": "space-between"
    },
    "orderCommentImg": {
        "marginLeft": 15,
        "marginTop": 15,
        "height": 60,
        "width": 60
    },
    "goodsTitle": {
        "flex": 1,
        "fontSize": 12,
        "color": "#333333",
        "textAlign": "left",
        "marginLeft": 15,
        "marginTop": 18
    },
    "goodsTotal": {
        "flexDirection": "column",
        "marginTop": 19,
        "marginLeft": 11,
        "marginRight": 14.000000000000002
    },
    "goodsCount": {
        "fontSize": 12,
        "color": "#333333"
    },
    "goodsNum": {
        "fontSize": 12,
        "color": "#333333",
        "marginTop": 3,
        "alignSelf": "flex-end"
    },
    "orderUncommentBtn": {
        "height": 28.000000000000004,
        "width": 78,
        "backgroundColor": "#ff6700",
        "borderRadius": 5,
        "marginRight": 15,
        "marginBottom": 15,
        "alignSelf": "flex-end",
        "justifyContent": "center",
        "alignItems": "center"
    },
    "commentBtnFont": {
        "color": "white",
        "fontSize": 12
    },
    "orderCommentBtn": {
        "height": 28.000000000000004,
        "width": 78,
        "backgroundColor": "#999999",
        "borderRadius": 5,
        "marginRight": 15,
        "marginBottom": 15,
        "alignSelf": "flex-end",
        "justifyContent": "center",
        "alignItems": "center"
    }
});