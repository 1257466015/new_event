$(function () {
    // 去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 去登录账号的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
})





layui.form.verify({
    pwd: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
        var pwds = $('.reg-box [name="password"]').val()
        if (pwds !== value) {
            return '两次输入的密码不一致'
        }
    }
})





// 监听注册表单的提交事件
$('#form_reg').on('submit', function (e) {
    // 阻止默认的提交行为
    e.preventDefault()
    //发起ajax请求
    $.post('http://ajax.frontend.itheima.net/api/reguser',
        {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        , function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            layui.layer.msg('恭喜注册成功');        //layer.msg 调用layer跳出的框框
        })
    $('#link_login').click()
})



//监听登录表单的提交事件
$('#form_login').submit(function (e) {
    //组织默认提交行为
    e.preventDefault()
    $.ajax({
        url: '/api/login',
        type: 'POST',
        data: $(this).serialize(),      //快速获取表单中的数据
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('登录失败')
            }
            layer.msg('登陆成功')
            // console.log(res.token);
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        }

    })
})