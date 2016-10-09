var React = require('react-native');
var { StyleSheet } = React;
module.exports = StyleSheet.create({
    "scrollView": {
        "height": 575
    },
    "container": {
        "alignItems": "center",
        "justifyContent": "center",
        "flexDirection": "column",
        "webkitFlexDirection": "row",
        "mozFlexDirection": "row",
        "backgroundColor": "white"
    },
    "brands": {
        "alignItems": "center",
        "justifyContent": "center",
        "flexDirection": "row",
        "webkitFlexDirection": "row",
        "mozFlexDirection": "row",
        "height": 65,
        "paddingLeft": 15,
        "paddingRight": 15,
        "borderTopWidth": 0.5,
        "borderStyle": "solid",
        "borderTopColor": "#f3f3f3"
    },
    "goodsImg": {
        "width": 50,
        "height": 50
    },
    "goodsInfo": {
        "flexDirection": "column",
        "marginLeft": 15,
        "flex": 1
    },
    "name": {
        "marginBottom": 5,
        "fontSize": 15
    },
    "detail": {
        "fontSize": 15
    },
    "concern": {
        "backgroundColor": "#d4d4d4",
        "color": "white",
        "textAlign": "center",
        "width": 50,
        "height": 25,
        "fontSize": 13,
        "lineHeight": 25,
        "borderRadius": 5
    },
    "unconcern": {
        "backgroundColor": "#d4d4d4",
        "color": "#494949",
        "textAlign": "center",
        "width": 50,
        "height": 25,
        "fontSize": 13,
        "lineHeight": 25,
        "borderRadius": 5
    }
});