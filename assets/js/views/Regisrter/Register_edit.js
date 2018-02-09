$(function () {
    var form_Registeredit = $('#form_Registeredit');
    var form_Registeredit_C = $.modelDialog(form_Registeredit);

//    var _formdata = form_fule_C.data('data');
//    if (_formdata.key === Guid) {
//        setTitle(Guid);
//    } else {
//
//    }
var _formdata = form_Registeredit_C.data('data');
    if (_formdata.key === Guid) {
//        setTitle(Guid);
    } else {
        form_Registeredit.find('#txtUser').val(_formdata.Customer);
       
        
        form_Registeredit.find('.showinadd').remove();
        
//        setTitle(_formdata.TitleKey);
    }
    form_Registeredit.find('#cmdTitle').selectpicker().on({
        change: function () {
        }
    });



   form_Registeredit_C.find('#btn-ok').on({
        click: function () {
            form_Registeredit.submit();
        }
    });

    form_Registeredit.myValidation({
        funsuccess: function () {
            form_Registeredit_C.data('fun')(form_Registeredit_C);
        },
        btnactive: [
            form_Registeredit_C.find('#btn-ok')
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
