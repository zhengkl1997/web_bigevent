// 入口函数
$(function() {
    // 从 LayUI 中获取 form 对象和 layer 对象
    var form = layui.form;
    var layer = layui.layer;


    // 通过 form.verify() 函数自定义检验规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！';
            }
        }
    })


    // 调用 initUserInfo() 函数
    initUserInfo();


    // 初始化用户基本信息
    function initUserInfo() {
        // 获取用户基本信息
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户基本信息失败！');
                }

                // 调用 LayUI 提供的 form.val()方法，给表单快速赋值
                // console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }


    // 重置表单的数据:为重置按钮绑定点击事件
    $('#btnReset').on('click', function(e) {
        // 阻止表单默认的重置行为：默认重置行为会将表单中的所有数据清空
        e.preventDefault();
        // 重新给表单初始化一次就可以
        initUserInfo();
    })


    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发起 Ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败！')
                }
                layer.msg('修改用户信息成功！')

                // 调用父页面中的方法，重新渲染用户的头像和信息
                window.parent.getUserInfo();
            }
        })
    })

})