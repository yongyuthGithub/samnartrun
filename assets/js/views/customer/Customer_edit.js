$(function () {
    var form_Customeredit = $('#form_Customeredit');
    var form_Customeredit_C = $.modelDialog(form_Customeredit);

//    var _formdata = form_fule_C.data('data');
//    if (_formdata.key === Guid) {
//        setTitle(Guid);
//    } else {
//
//    }
var _formdata = form_Customeredit_C.data('data');
    if (_formdata.key === Guid) {
//        setTitle(Guid);
    } else {
        form_Customeredit.find('#txtUser').val(_formdata.Pump);
        form_Customeredit.find('#cmdTitle').val(_formdata.PumpType).selectpicker('render');
        
        form_Customeredit.find('.showinadd').remove();
        
//        setTitle(_formdata.TitleKey);
    }
    form_Customeredit.find('#cmdTitle').selectpicker().on({
        change: function () {
        }
    });



    form_Customeredit_C.find('#btn-ok').on({
        click: function () {
            form_Customeredit.submit();
        }
    });

    form_Customeredit.myValidation({
        funsuccess: function () {
            form_Customeredit_C.data('fun')(form_Customeredit_C);
        },
        btnactive: [
            form_Customeredit_C.find('#btn-ok')
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
