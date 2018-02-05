$(function () {
    var form_adminedit = $('#form_adminedit');
    var form_adminedit_C = $.modelDialog(form_adminedit);

    var _formdata = form_adminedit_C.data('data');
    if (_formdata.key === Guid) {
        setTitle(Guid);
    } else {
        form_adminedit.find('#txtUser').val(_formdata.User);
        form_adminedit.find('#txtFirstName').val(_formdata.FName);
        form_adminedit.find('#txtLastName').val(_formdata.LName);
        form_adminedit.find('.showinadd').remove();
        setTitle(_formdata.TitleKey);
    }

    form_adminedit.find('#cmdTitle').selectpicker({
    }).on({
        change: function () {
        }
    });

    function setTitle(v) {
        $.reqData({
            url: mvcPatch('admin/findTitle'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_adminedit.find('#cmdTitle').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.Title + '">&nbsp;&nbsp;' + v.Title + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }

    form_adminedit_C.find('#btn-ok').on({
        click: function () {
            form_adminedit.submit();
        }
    });

    form_adminedit.myValidation({
        funsuccess: function () {
            form_adminedit_C.data('fun')(form_adminedit_C);
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
                    },
                    regexp: {
                        regexp: regexpMail,
                        message: '* Please specify as email only.'
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
