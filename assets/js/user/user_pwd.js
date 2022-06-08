$(function() {
    // 获取 form 和 layer 对象
    var form = layui.form;
    var layer = layui.layer;


    // 通过 form.verify() 函数自定义检验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function(value) {
            var oldPwd = $('[name="oldPwd"]').val();
            if (oldPwd === value) {
                return '新密码与旧密码不能相同！';
            }
        },
        rePwd: function(value) {
            var newPwd = $('[name="newPwd"]').val();
            if (newPwd !== value) {
                return '两次密码不一致！'
            }
        }
    })


    // 为表单绑定提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        // 发起 Ajax 请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败！');
                }

                layer.msg('更新密码成功！');
                // 更新成功后重置表单
                $('.layui-form').trigger('reset');
                // 将 jQuery 元素装换成 DOM 元素
                // $('.layui-form')[0].reset();
            }
        })
    })


})