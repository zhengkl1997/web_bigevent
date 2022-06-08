$(function() {
    var layer = layui.layer;



    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
            // 纵横比(裁剪框的长宽比:4/3)
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }
        // 1.3 创建裁剪区域
    $image.cropper(options);


    // 为上传按钮绑定点击事件
    $('#btnChoseImage').on('click', function() {
        // 模拟文件选择框的点击事件
        $('#file').click();
    })


    // 为文件选择框绑定 change 事件
    $('#file').on('change', function(e) {
        // console.log(e);
        // e.target.files 可以获取用户选择的文件，以伪数组的形式存在
        var fileList = e.target.files;
        if (fileList.length === 0) {
            return layer.msg('请选择照片！')
        }

        // 1、拿到用户选择的文件
        var file = e.target.files[0];
        // 2、根据选择的文件，创建一个对应的 URL 地址
        var imgURL = URL.createObjectURL(file);
        // 3、先销毁旧的裁剪区域，再重新设置图片路径,之后再创建新的裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })


    // 将裁减后的头像上传到服务器
    // 为确定按钮绑定点击事件
    $('#btnUpload').on('click', function() {
        // 1、拿到用户裁减之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串


        // 2、调用接口，发起 Ajax 请求
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新头像失败！')
                }

                layer.msg('更新头像成功！');
                window.parent.getUserInfo();
            }
        })
    })
})