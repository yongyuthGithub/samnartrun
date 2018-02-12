$(function () {
    var form_Registeredit = $('#form_Registeredit');
    var form_Registeredit_C = $.modelDialog(form_Registeredit);

    var _formdata = form_Registeredit_C.data('data');
    if (_formdata.key === Guid) {
        setTitle(Guid);
        setProvince(Guid);
    } else {
        form_Registeredit.find('#txtUser').val(_formdata.Customer);


        form_Registeredit.find('.showinadd').remove();

        setTitle(_formdata.TitleKey);
    }
    form_Registeredit.find('#cmdTitle').selectpicker().on({
        change: function () {
        }
    });
    function setTitle(v) {
        $.reqData({
            url: mvcPatch('admin/findTitle'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_Registeredit.find('#cmdTitle').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.Title + '">&nbsp;&nbsp;' + v.Title + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }



    form_Registeredit.find('#cmdProvince').selectpicker().on({
        change: function () {
            setDistrict(Guid);
        }
    });
    function setProvince(v) {
        $.reqData({
            url: mvcPatch('Province/findProvince'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_Registeredit.find('#cmdProvince').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.Province + '">&nbsp;&nbsp;' + v.Province + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }

    form_Registeredit.find('#cmdDistrict').selectpicker().on({
        change: function () {
        }
    });
    function setDistrict(v) {
        $.reqData({
            url: mvcPatch('Province/findDistrict'),
            data: {key: form_Registeredit.find('#cmdProvince').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_Registeredit.find('#cmdDistrict').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.District + '">&nbsp;&nbsp;' + v.District + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }

    form_Registeredit.find('#cmdSubDistrict').selectpicker().on({
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
