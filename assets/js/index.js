$(function () {     //借口函数
    getUserInfo()



})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'GET',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败')
            }
            // 成功的话，调用renderAvata函数渲染用户头像
            renderAvatar(res.data)  //res.data 接收用户信息
        },
        // 不论成功还是失败，最终都会调用complete回调函数


        // complete: function (res) {
        //     // console.log(res);
        //     // 在complete 回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空 token
        //         localStorage.removeItem('token')
        //         //强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染用户的头像
function renderAvatar(user) {       //user接收res.data的参数
    var name = user.nickname || user.username;  //如果有昵称就用昵称，如果没有就用用户名
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 按需渲染用户的头像   
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}


// 退出按钮
var layer = layui.layer
$('#btnLogout').on('click', function () {
    layer.confirm('确定要退出吗？', { icon: 3, title: '提示' }, function (index) {
        //do something
        // 先清空本地存储
        localStorage.removeItem('token')
        // 再跳转登录页面
        location.href = '/login.html'
        // 关闭询问框
        layer.close(index);
    });
})

