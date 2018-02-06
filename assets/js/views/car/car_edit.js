$(function () {
    var form_carbrand = $('#form_carbrand');
    var form_carbrand_C = $.modelDialog(form_carbrand);

    var _formdata = form_carbrand_C.data('data');
    if (_formdata.key === Guid) {
        setTitle(Guid);
    } else {
        form_carbrand.find('#txtbrandcar').val(_formdata.Brand);
        form_carbrand.find('.showinadd').remove();
        setTitle(_formdata.TitleKey);

    }

    form_carbrand.find('#cmdTitle').selectpicker({
    }).on({
        change: function () {
        }
    });

    function setTitle(v) {
        $.reqData({
            url: mvcPatch('car/findcar'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_carbrand.find('#cmdTitle').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.Title + '">&nbsp;&nbsp;' + v.Title + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }

    form_carbrand_C.find('#btn-ok').on({
        click: function () {
            form_carbrand.submit();
        }
    })

    form_carbrand.myValidation({
        funsuccess: function () {
            form_carbrand_C.data('fun')(form_carbrand_C);
        },
        btnactive: [
            form_carbrand_C.find('#btn-ok')
        ],
        fields: {
            txtbrandcar: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ ยี่ห้อรถ.'
                    }
                }
            }
        }
    });
});
