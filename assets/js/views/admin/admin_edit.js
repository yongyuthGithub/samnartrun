$(function () {
    var form_adminedit = $('#form_adminedit');
    var form_adminedit_C = $.modelDialog(form_adminedit);

    form_adminedit.find('#cmdTitle').selectpicker({
    }).on({
        change: function () {
        }
    });

    form_adminedit_C.find('#btn-ok').on({
        click: function () {
            form_adminedit.submit();
        }
    })

    form_adminedit.myValidation({
        funsuccess: function () {

        },
        btnactive: [
            form_adminedit_C.find('#btn-ok')
        ],
        fields: {
            txtUser: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify User Name.'
                    }
                }
            },
            cmdTitle: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Title.'
                    }
                }
            },
            txtFirstName: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify First Name.'
                    }
                }
            },
            txtLastName: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Last Name.'
                    }
                }
            },
            txtPassword: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Password.'
                    }
                }
            }
        }
    });
});
