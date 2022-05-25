export function randomExtend(minNum, maxNum) {
  if (arguments.length === 1) {
    return parseInt(Math.random() * minNum + 1, 10)
  } else {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
  }
}

export function debounce(delay, callback) {
  let lastTime

  return function () {
    clearTimeout(lastTime)

    const [that, args] = [this, arguments]

    lastTime = setTimeout(() => {
      callback.apply(that, args)
    }, delay)
  }
}

export function observerDomResize(dom, callback) {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

  const observer = new MutationObserver(callback)

  observer.observe(dom, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })

  return observer
}

export function getPointDistance(pointOne, pointTwo) {
  const minusX = Math.abs(pointOne[0] - pointTwo[0])

  const minusY = Math.abs(pointOne[1] - pointTwo[1])

  return Math.sqrt(minusX * minusX + minusY * minusY)
}

export function uuid(hasHyphen) {
  return (hasHyphen ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx').replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function getNowDate(type) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var week = date.getDay();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  let dayCycleArray = ["日", "一", "二", "三", "四", "五", "六"];
  let weekText = dayCycleArray[week];
  let nowDate = '';
  switch (type) {
    case 'date':
      nowDate = year + "-" + month + "-" + day;
      break;
    case 'monthFirst':
      nowDate = year + "-" + month + "-" + '01';
      break;
    case 'yearFirst':
      nowDate = year + "-" + '01' + "-" + '01';
      break;
    case 'time':
      nowDate = hours + ":" + minutes + ":" + seconds;
      break;
    case 'MDHM':
      nowDate = month + "/" + day + " " + hours + ":" + minutes;
      break;
    case 'YMDHM':
      nowDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes;
      break;
    case 'YMDHMSW':
      nowDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ':' + seconds + '  星期' + weekText;
      break;
    default:
      nowDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ':' + seconds;
      break;
  }
  return nowDate
}
// 获取当前周第一天日期
export function getWeekDay() {
  var date = new Date();
  var week = date.getDay(); //获取时间的星期数
  var minus = week ? week - 1 : 6;
  date.setDate(date.getDate() - minus); //获取minus天前的日期
  var year = date.getFullYear();
  var month = date.getMonth() + 1; //获取月份
  var day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
}

// 获取地址栏字段值
export function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}