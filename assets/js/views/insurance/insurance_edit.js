$(function () {
    var form_insuranceedit = $('#form_insuranceedit');
    var form_insuranceedit_C = $.modelDialog(form_insuranceedit);

    var _formdata = form_insuranceedit_C.data('data');
    if (_formdata.key === Guid) {
        setTitle(Guid);
    } else {
        form_insuranceedit.find('#txtinsurance').val(_formdata.InsuranceName);
        form_insuranceedit.find('.showinadd').remove();
        setTitle(_formdata.TitleKey);

    }

    form_insuranceedit.find('#cmdTitle').selectpicker({
    }).on({
        change: function () {
        }
    });

    function setTitle(v) {
        $.reqData({
            url: mvcPatch('insurance/findTitle'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_insuranceedit.find('#cmdTitle').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.Title + '">&nbsp;&nbsp;' + v.Title + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }

    form_insuranceedit_C.find('#btn-ok').on({
        click: function () {
            form_insuranceedit.submit();
        }
    })

    form_insuranceedit.myValidation({
        funsuccess: function () {
            form_insuranceedit_C.data('fun')(form_insuranceedit_C);
        },
        btnactive: [
            form_insuranceedit_C.find('#btn-ok')
        ],
        fields: {
            txtUser: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ บริษัท.'
                    }
                }
            }
        }
    });
});
