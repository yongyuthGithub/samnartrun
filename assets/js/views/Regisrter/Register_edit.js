$(function () {
    var form_Registeredit = $('#form_Registeredit');
    var form_Registeredit_C = $.modelDialog(form_Registeredit);

    var _formdata = form_Registeredit_C.data('data');
    if (_formdata.key === Guid) {
        setTitle(Guid);
        setProvince(Guid);
    } else {
        form_Registeredit.find('#txtUser1').val(_formdata.IDCard);
        form_Registeredit.find('#txtUser2').val(_formdata.FName);
        form_Registeredit.find('#txtUser3').val(_formdata.Address);
        form_Registeredit.find('#cmdSubDistrict').val(_formdata.SubDistrict);
        form_Registeredit.find('#txtSDate').val(_formdata.SDate);
        form_Registeredit.find('#txtUser6').val(_formdata.LName);
        form_Registeredit.find('#txtUser7').val(_formdata.Tel);
        form_Registeredit.find('#txtUser1').val(_formdata.IDCard);
        form_Registeredit.find('#txtUser1').val(_formdata.IDCard);
        


        form_Registeredit.find('.showinadd').remove();

        setTitle(_formdata.TitleKey);
    }

    form_Registeredit.find('#txtSDate').dateTime().on('dp.change', function (e) {
        form_Registeredit.formValidation('revalidateField', form_Registeredit.find('#txtUser5'));
    });

//    funDateTime(form_Registeredit.find('#txtSDate')).date('14/02/2018');
//    alert(PHP_DateTimeShow_To_JSON(form_Registeredit.find('#txtSDate')));

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
            setSubDistrict(Guid);
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
            var _v = $(this).find('option[value="' + $(this).val() + '"]').data('zipcode');
            form_Registeredit.find('#txtZipCode').val(_v);
            form_Registeredit.formValidation('revalidateField', form_Registeredit.find('#txtZipCode'));
        }
    });
    function setSubDistrict(v) {
        $.reqData({
            url: mvcPatch('Province/findSubDistrict'),
            data: {key: form_Registeredit.find('#cmdDistrict').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_Registeredit.find('#cmdSubDistrict').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.SubDistrict + '"  data-zipcode="' + v.ZipCode + '">&nbsp;&nbsp;' + v.SubDistrict + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }

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
            txtUser1: {
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
            txtUser6: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify First Name.'
                    }
                }
            },
            txtUser2: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Last Name.'
                    }
                }
            },
            txtUser3: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Password.'
                    }
                }
            },
            cmdProvince: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Password.'
                    }
                }
            },
            cmdDistrict: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Password.'
                    }
                }
            },
            cmdSubDistrict: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Password.'
                    }
                }
            },
            txtZipCode: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Password.'
                    }
                }
            },
            txtUser7: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Password.'
                    }
                }
            },
            txtUser5: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Password.'
                    }
                }
            },

        }


    });
});
