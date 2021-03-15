// $.ajaxPrefilter() 可以在调用 $.get() $.post() $.ajax() 方法之后，立即触发;
//   接收到 ajax 响应以后，也会触动这个方法;
// 开发环境服务器路径地址
let baseURL = "http://api-breakingnews-web.itheima.net";
// // 测试环境服务器路径地址
// let baseURL = 'http://api-breakingnews-web.itheima.net';
// // 生产环境服务器路径地址
// let baseURL = 'http://api-breakingnews-web.itheima.net';

$.ajaxPrefilter(function (options) {
    // console.log(options);
    // 如果是index.html页面，不需要添加前缀 写死的
    if (options.url === 'http://127.0.0.1:5500/index.html') {
        return;
    }
    options.url = baseURL + options.url;
    // 对需要权限的接口配置头信息
    // 必须以my开头才行
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    options.complete = function (res) {
        // console.log(res.responseJSON);
        let obj = res.responseJSON;
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            // 清空本地token
            localStorage.removeItem("token")
            location.href = "/login.html";
        }
    }
})