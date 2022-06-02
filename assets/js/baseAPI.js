// 每次调用$.post()或者 $.get()或者$.ajax()时，会先调用这个函数$.ajaxPrefilter()
// options 就是调用 Ajax 时传递的配置对象
$.ajaxPrefilter(function(options) {

    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://big-event-api-t.itheima.net' + options.url;


    // 统一为有权限的接口，设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 全局统一挂载 complete 回调函数
    options.complete = function(res) {
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空 token
            localStorage.removeItem('token');
            // 强制跳转到登录页
            location.href = '/login.html';
        }
    }
})