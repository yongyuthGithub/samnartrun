$(function () {
    var form_CarTypeedit = $('#form_CarTypeedit');
    var form_CarTypeedit_C = $.modelDialog(form_CarTypeedit);

    var _formdata = form_CarTypeedit_C.data('data');
    if (_formdata.key !== Guid) {
        form_CarTypeedit.find('#txtTypeName').val(_formdata.TypeName);
        form_CarTypeedit.find('#cmdTypeUse').val(_formdata.TypeUse).selectpicker('render');
    }

    form_CarTypeedit.find('#cmdTypeUse').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });

    form_CarTypeedit_C.find('#btn-ok').on({
        click: function () {
            form_CarTypeedit.submit();
        }
    });

    form_CarTypeedit.myValidation({
        funsuccess: function () {
            form_CarTypeedit_C.data('fun')(form_CarTypeedit_C);
        },
        btnactive: [
            form_CarTypeedit_C.find('#btn-ok')
        ],
        fields: {
            cmdTypeUse: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุกลุ่มประกัน'
                    }
                }
            },
            txtTypeName: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุชื่อประกัน'
                    }
                }
            }
        }
    });
});

