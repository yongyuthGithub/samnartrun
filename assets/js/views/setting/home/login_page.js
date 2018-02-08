$(function () {
    var form_login = $('#form_login');
    var form_login_C = $.modelDialog(form_login);
    
    form_login_C.find('#btn-login').on({
        click: function () {
            form_login.submit();
        }
    });
    
    form_login.myValidation({
        funsuccess: function () {
            $.reqData({
                url: mvcPatch('home/chkLogin'),
                data: {
                    user: form_login.find('#txtUser').val(),
                    pass: form_login.find('#txtPass').val()
                },
                loanding: false,
                callback: function (vdata) {
                    if (vdata.success) {
                        //javascript code
                    } else {
                        $.bAlert({
                            message: vdata.message
                        });
                    }
                }
            });
        },
        btnactive: [
            form_login_C.find('#btn-login')
        ],
        fields: {
            txtUser: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify email'
                    },
                    regexp: {//***Custom Patter
                        regexp: regexpMail,
                        message: '* Please specify as email only.'
                    }
                }
            },
            txtPass: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify password'
                    }
                }
            }
        }
    });
});


