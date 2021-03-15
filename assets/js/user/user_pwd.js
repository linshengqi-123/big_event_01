$(function () {
    // 定义校验规则
    var form = layui.form;
    form.verify({

        // 密码
        pwd: [
            /^[\S]{6,12}$/,
            "密码必须6-12位，且不能输入空格"
        ],
        samePwd: function (value) {
            if (value == $("[name=oldPwd]").val()) {
                return "原密码和新密码不能相同！"
            }
        },
        rePwd: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return "两次新密码不一致!"
            }

        }
    })
    // 表单提交
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg("修改密码成功");
                $(".layui-form")[0].reset();
            }
        })

    })

  

})