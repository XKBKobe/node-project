var React = require('react-native');
var { StyleSheet } = React;
module.exports = StyleSheet.create({
    "backgroundColorView": {
        "zIndex": 10001,
        "width": 375,
        "height": 608,
        "backgroundColor": "#333333",
        "opacity": 0.3
    },
    "standardDialogView": {
        "flexDirection": "column",
        "zIndex": 10002,
        "width": 250,
        "height": 150,
        "backgroundColor": "#ffffff",
        "left": 62.5,
        "borderRadius": 4,
        "alignItems": "center",
        "justifyContent": "space-between"
    },
    "standardDialogTitleText": {
        "fontSize": 16,
        "color": "#333333",
        "marginTop": 45
    },
    "standardDialogButtonView": {
        "flexDirection": "row",
        "height": 44,
        "width": 250,
        "borderTopWidth": 1,
        "borderStyle": "solid",
        "borderTopColor": "#dddddd"
    },
    "standardDialogLeftButton": {
        "height": 44,
        "width": "608/3",
        "borderRightWidth": 1,
        "borderStyle": "solid",
        "borderRightColor": "#dddddd",
        "fontSize": 16,
        "color": "#008cff"
    },
    "standardDialogRightButton": {
        "height": 44,
        "width": "608/3",
        "fontSize": 16,
        "color": "#008cff"
    },
    "standardDialogLeftLink": {
        "flexDirection": "row",
        "alignItems": "center",
        "justifyContent": "center",
        "height": 44,
        "width": "608/3",
        "borderRightWidth": 1,
        "borderStyle": "solid",
        "borderRightColor": "#dddddd"
    },
    "buttonText": {
        "fontSize": 16,
        "color": "#008cff"
    }
});