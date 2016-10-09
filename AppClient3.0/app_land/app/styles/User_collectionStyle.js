var React = require('react-native');
var { StyleSheet } = React;
module.exports = StyleSheet.create({
    "scrollView": {
        "height": 572
    },
    "container": {
        "flexDirection": "column",
        "width": 375,
        "marginTop": 44,
        "backgroundColor": "#f3f3f3"
    },
    "listView": {
        "flexDirection": "row",
        "marginTop": 10,
        "flexWrap": "wrap"
    },
    "goodsItem": {
        "flexDirection": "column",
        "width": 180,
        "height": 243.00000000000003,
        "alignItems": "center",
        "backgroundColor": "white",
        "marginLeft": 5,
        "marginBottom": 5
    },
    "goodsImg": {
        "height": 106,
        "width": 120,
        "marginTop": 30,
        "marginBottom": 44
    },
    "overflowView": {
        "left": 45,
        "height": 90,
        "width": 90,
        "borderRadius": 45,
        "justifyContent": "center",
        "alignItems": "center",
        "backgroundColor": "black"
    },
    "goodsState": {
        "fontSize": 14.000000000000002,
        "color": "white"
    },
    "goodsName": {
        "fontSize": 10,
        "color": "#333333",
        "marginLeft": 10,
        "marginRight": 10,
        "alignSelf": "flex-start"
    },
    "speView": {
        "flex": 1
    },
    "priceView": {
        "flexDirection": "row",
        "marginTop": 6,
        "marginBottom": 6,
        "alignSelf": "flex-start"
    },
    "price": {
        "fontSize": 12,
        "color": "#ff6700",
        "marginLeft": 10
    },
    "delPrice": {
        "textDecorationLine": "line-through",
        "fontSize": 10,
        "transform": [
            {
                "scale": 0.9
            }
        ],
        "marginLeft": 10,
        "color": "#999999"
    },
    "noDataContainer": {
        "flexDirection": "column",
        "width": 375,
        "alignItems": "center",
        "backgroundColor": "#f3f3f3"
    },
    "noDataImgView": {
        "marginTop": 105,
        "height": 120,
        "width": 120,
        "justifyContent": "center",
        "alignItems": "center"
    },
    "noDataTipFont": {
        "fontSize": 14.000000000000002,
        "color": "#999999",
        "marginTop": 16
    },
    "noDataBtn": {
        "height": 28.000000000000004,
        "width": 78,
        "color": "#333333",
        "fontSize": 12,
        "backgroundColor": "white",
        "borderRadius": 5,
        "marginTop": 16,
        "borderWidth": 0.5,
        "borderStyle": "solid",
        "borderColor": "#cccccc"
    }
});