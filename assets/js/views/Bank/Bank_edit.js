$(function () {
    var form_Bankedit = $('#form_Bankedit');
    var form_Bankedit_C = $.modelDialog(form_Bankedit);

//    var _formdata = form_fule_C.data('data');
//    if (_formdata.key === Guid) {
//        setTitle(Guid);
//    } else {
//
//    }
var _formdata = form_Bankedit_C.data('data');
    if (_formdata.key === Guid) {
//        setTitle(Guid);
    } else {
        form_Bankedit.find('#txtCusCode').val(_formdata.CusCode);
        form_Bankedit.find('#txtUser').val(_formdata.Customer);
    }



   form_Bankedit_C.find('#btn-ok').on({
        click: function () {
            form_Bankedit.submit();
        }
    });

    form_Bankedit.myValidation({
        funsuccess: function () {
            form_Bankedit_C.data('fun')(form_Bankedit_C);
        },
        btnactive: [
            form_Bankedit_C.find('#btn-ok')
        ],
        fields: {
            txtUser: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุชื่อลูกค้า'
                    }
                }
            }
        }
    });
});
