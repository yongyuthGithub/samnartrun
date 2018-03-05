$(function () {
    var form_carinsuranceedit = $('#form_carinsuranceedit');
    var form_carinsuranceedit_C = $.modelDialog(form_carinsuranceedit);

    var _formdata = form_carinsuranceedit_C.data('data');
    if (_formdata.key !== Guid) {
        form_carinsuranceedit.find('#txtTypeName').val(_formdata.TypeName);
        form_carinsuranceedit.find('#cmdTypeUse').val(_formdata.TypeUse).selectpicker('render');
    }

    form_carinsuranceedit.find('#cmdTypeUse').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });

    form_carinsuranceedit_C.find('#btn-ok').on({
        click: function () {
            form_carinsuranceedit.submit();
        }
    });

    form_carinsuranceedit.myValidation({
        funsuccess: function () {
            form_carinsuranceedit_C.data('fun')(form_carinsuranceedit_C);
        },
        btnactive: [
            form_carinsuranceedit_C.find('#btn-ok')
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

