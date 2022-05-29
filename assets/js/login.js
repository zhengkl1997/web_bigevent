// 入口函数
$(function() {
    // 为 “去注册账号” 链接绑定点击事件
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })


    // 为 “去登录” 链接绑定点击事件
    $('#link_login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    })


    // 从 layui 中获取 form 对象
    var form = layui.form;
    // 从 layui 中获取 layer 对象
    var layer = layui.layer;
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd 的校验规则，用来校验密码
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //  校验两次密码是否一致的校验规则：value 是表单的值
        repwd: function(value) {
            // 拿到密码框中的内容
            var pwd = $('.reg-box [name="password"]').val();
            if (value !== pwd) {
                return '两次密码不一致！'
            }
        }
    })


    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发起 ajax 的 post 请求
        var data = {
            username: $('#form_reg [name="username"]').val(),
            password: $('#form_reg [name="password"]').val()
        };
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                // 注意：layer 对象要先从 layui 身上获取才能使用
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录！');
            // 模拟人的点击行为
            $('#link_login').click();
        })
    })


    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发起 Ajax 的 post 请求
        /* var data = {
            username: $('#form_login [name="username"]').val(),
            password: $('#form_login [name="password"]').val()
        } */
        $.post('/api/login', $(this).serialize(), function(res) {
            if (res.status !== 0) {
                layer.msg('登录失败！')
            }
            layer.msg('登录成功！');
            // 将登录成功后得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token);
            // 登录成功后跳转到后台主页
            location.href = '/index.html';
        })
    })





})