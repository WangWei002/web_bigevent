$(function () {
    // 点击去注册链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide().siblings('.reg-box').show();
    });
    // 点击去登录链接
    $('#link_login').on('click', function () {
        $('.login-box').show().siblings('.reg-box').hide();
    });
    // 从layui中获取对象
    let form = layui.form;
    let layer = layui.layer;
    //通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义一个pass的校验规则
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repass: function (value) {
            // 参数里面的value 是input框的值
            let pwd = $('.reg-box [name=userpwd]').val();
            if (pwd !== value) {
                return '两次密码输入不一致!';
            }
        },
    });

    // 发起注册Ajax请求

    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        let data_reg = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=userpwd]').val(),
        };
        $.post('/api/reguser', data_reg, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message); // 提示消息
            }
            layer.msg('注册成功!'); // 提示消息
            $('#link_login').click();
        });
    });

    // 发起登录Ajax请求
    $('#form-login').submit(function (e) {
        e.preventDefault();
        // console.log($(this).serialize());
        let data_reg = {
            username: $('#form-login [name=username]').val(),
            password: $('#form-login [name=userpwd]').val(),
        };
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: data_reg,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            },
        });
    });
});
