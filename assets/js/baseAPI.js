// 注意：每次调用 $.get() 或 $.post() 或 $.ajax()的时候，
// 会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象，拦截每一次ajax请求
$.ajaxPrefilter(function (optins) {
    //z 在准备发起真正的Ajax请求之前，统一拼接请求的根路径
    optins.url = 'http://ajax.frontend.itheima.net' + optins.url;
    // console.log(optins.url);

    // optins.headers = {
    //     Authorization: localStorage.getItem('token') || ''
    // }

    if (optins.url.indexOf('/my/') !== -1) {
        optins.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete函数
    optins.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空 token
            localStorage.removeItem('token')
            //强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})