$(function () {
    // 校验规则定义
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length < 1 || value.length > 6) {
                return "昵称长度为1-6之间！"
            }
        }
    })



    let layer = layui.layer;
    // 用户渲染
    initUserInfo();
    // 导出layer
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.messages)
                }

                form.val("formUserInfo", res.data)
            }
        })
    }

    // 重置   reset
    // 阻止表单的提交
    // $("#form").on("reset", function (e) { }
    // 阻止按钮的提交
    $("#btnReset").on("click", function (e) {
        e.preventDefault();
        initUserInfo();
    })

    // 修改用户信息
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("用户信息修改失败！")
                }
                layer.msg("恭喜您，用户信息修改成功！")
                window.parent.getUserInfo();
            }
        })




    })
})//jq末端