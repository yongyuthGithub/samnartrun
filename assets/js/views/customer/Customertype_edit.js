$(function () {
    var form_customerbranchedit = $('#form_customerbranchedit');
    var form_customerbranchedit_C = $.modelDialog(form_customerbranchedit);

    var _formdata = form_customerbranchedit_C.data('data');
    if (_formdata.key !== Guid) {
        form_customerbranchedit.find('#txtTypeName').val(_formdata.TypeName);
        form_customerbranchedit.find('#cmdTypeUse').val(_formdata.TypeUse).selectpicker('render');
    }

    form_customerbranchedit.find('#cmdTypeUse').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });

    form_customerbranchedit_C.find('#btn-ok').on({
        click: function () {
            form_customerbranchedit.submit();
        }
    });

    form_customerbranchedit.myValidation({
        funsuccess: function () {
            form_customerbranchedit_C.data('fun')(form_customerbranchedit_C);
        },
        btnactive: [
            form_customerbranchedit_C.find('#btn-ok')
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

