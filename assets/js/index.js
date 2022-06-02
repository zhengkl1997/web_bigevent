// 入口函数
$(function() {
    // 调用 getUserInfo，获取用户基本信息
    getUserInfo();


    var layer = layui.layer;


    // 退出功能
    $('#btnLogout').on('click', function() {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            // 清除本地存储中的 token
            localStorage.removeItem('token');
            // 退回到登录界面
            location.href = '/login.html';


            // 关闭 confirm 询问框
            layer.close(index);
        });
    })
})




// 获取用户基本信息的方法
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }

            // 调用 renderAvatar 渲染用户的头像,res.data 是一个对象
            // console.log(res);
            renderAvatar(res.data);
        },
        // 不论成功还是失败，最终都会调用 complete 函数
        // complete: function(res) {
        //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空 token
        //         localStorage.removeItem('token');
        //         // 强制跳转到登录页
        //         location.href = '/login.html';
        //     }
        // }
    })
}


// 渲染用户头像
function renderAvatar(user) {
    // 1、获取用户名称
    // 逻辑或短路运算：表达式一结果为真，返回表达式一，表达式一结果为假，返回表达式二
    var name = user.nickname || user.username;
    // 2、设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);

    // 3、按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}