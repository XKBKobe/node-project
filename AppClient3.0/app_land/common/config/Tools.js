export function add0(m){return m<10?'0'+m:m }
export function getLocalTime(nS) {
    var time = new Date(parseInt(nS) * 1000);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
  }
//1:已下单；2:已取消；3:已付款;4:付款失败;5:已清关;6:清关失败;7:已发货;8已收货;
export function getOrderStatus(statusId) {
  switch (statusId) {
    case 1:
      return '待付款'
      break;
    case 3:case 4:
      return '待发货'
      break;
    case 5:case 6:case 7:
      return '待收货'
      break;
    case 8:
      return '交易成功'
      break;
    default:
      return '交易取消'
  }
}
//排除数组中相同元素
export function unique(arr) {
  var result = [], isRepeated;
  var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
      // console.log(i);
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

/**
 * @Name: isObjectValueEqual
 * @Param: two object who need to compare
 * @Return: true-equal,false-not equal.
 * @Introduction: compare the value of two different object.
 */
export function isObjectValueEqual(a, b) {
  //a and b are null,return false.
  if (!a && !b) return false;
  else if (a && b) {
      if (typeof a !== "object" || typeof b !== "object") {
        console.log("a or b is not a object");
        return;
      }

      var aProps = Object.getOwnPropertyNames(a);
      var bProps = Object.getOwnPropertyNames(b);

      if(aProps.length !== bProps.length) return false;
      for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if(!b.hasOwnProperty(propName)) return false;
        if(typeof a[propName] === "object" || typeof b[propName] === "object")
            return isObjectValueEqual(a[propName], b[propName]);
        else {
            if(a[propName] !== b[propName]) return false;
        }
      }
      return true;
  }else {
    return false;
  }
}
