function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function querystring(obj) {
  var str = "";
  for (var arr in obj) {
    //对传递的参数进行字符串拼接
      str += (arr + "=" + obj[arr] + "&");
  }
  //最后一位不取
  return str.substring(0, str.length - 1);
}


function $ajax({
  method = "get",
  url,
  data,
  success,
  error,
}) {
  var xhr = null;
  try {
      xhr = new XMLHttpRequest();
  } catch (error) {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  if (method == "get" && data != null) {
      url += "?" + querystring(data);
  }
  xhr.open(method, url, true);

  if (method == "get") {
      xhr.send();
  } else {
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
      xhr.send(querystring(data));
  }

  xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
          if (xhr.status == 200) {
              if (success) {
                  success(xhr.responseText);
              }
          } else {
              if (error) {
                  error("error" + xhr.status);
              }
          }
      }
  }
}
