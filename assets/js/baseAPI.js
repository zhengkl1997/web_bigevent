// 每次调用$.post()或者 $.get()或者$.ajax()时，会先调用这个函数$.ajaxPrefilter()
// options 就是调用 Ajax 时传递的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://big-event-api-t.itheima.net' + options.url;
    console.log(options.url);
})