$(function () {
    var form_Registeredit = $('#form_Registeredit');
    var form_Registeredit_C = $.modelDialog(form_Registeredit);

    form_Registeredit.find('#btn-addidcard').on({
        click: function () {
            form_Registeredit.find('#showidcard').findFile();
//            form_Registeredit.find('#xfile').remove();
//            form_Registeredit.append('<input type="file" id="xfile" name="xfile" style="display: none;" />').find('#xfile').click();
        }
    });
//    form_Registeredit.on('change', '#xfile', function (ev) {        
//        var _tool = form_Registeredit.find('#showidcard');
//        var reader = new FileReader();
//        reader.onload = function () {
//            var dataURL = reader.result;
//            _tool.prop("src", dataURL);
//        };
//        var _this = ev.target.files;
//        reader.readAsDataURL(_this[0]);
//    });

 form_Registeredit.find('#btn-01').on({
        click: function () {
            form_Registeredit.find('#show01').findFile();
//            form_Registeredit.find('#xfile1').remove();
//            form_Registeredit.append('<input type="file" id="xfile1" name="xfile1" style="display: none;" />').find('#xfile1').click();
        }
    });
//form_Registeredit.on('change', '#xfile1', function (ev) {        
//        var _tool = form_Registeredit.find('#show01');
//        var reader = new FileReader();
//        reader.onload = function () {
//            var dataURL = reader.result;
//            _tool.prop("src", dataURL);
//        };
//        var _this = ev.target.files;
//        reader.readAsDataURL(_this[0]);
//    });


form_Registeredit.find('#btn-02').on({
        click: function () {
            form_Registeredit.find('#show02').findFile();
//            form_Registeredit.find('#xfile2').remove();
//            form_Registeredit.append('<input type="file" id="xfile2" name="xfile2" style="display: none;" />').find('#xfile2').click();
        }
    });
//form_Registeredit.on('change', '#xfile2', function (ev) {        
//        var _tool = form_Registeredit.find('#show02');
//        var reader = new FileReader();
//        reader.onload = function () {
//            var dataURL = reader.result;
//            _tool.prop("src", dataURL);
//        };
//        var _this = ev.target.files;
//        reader.readAsDataURL(_this[0]);
//    });


    var _formdata = form_Registeredit_C.data('data');
    if (_formdata.key === Guid) {
        setTitle(Guid);
//        setProvince(Guid);
        //***Edit By Yongyuth
        setProvince(function (_p) {
            _p.val(Guid).selectpicker('render');
            setDistrict(function (_d) {
                _d.val(Guid).selectpicker('render');
                setSubDistrict(function (_sd) {
                    _sd.val(Guid).selectpicker('render');
                });
            });
        });
        //********************
    } else {
        form_Registeredit.find('#txtUser1').val(_formdata.IDCard);
        form_Registeredit.find('#txtUser2').val(_formdata.FName);
        form_Registeredit.find('#txtUser3').val(_formdata.Address);
        form_Registeredit.find('#cmdSubDistrict').val(_formdata.SubDistrict);
        form_Registeredit.find('#txtSDate').val(_formdata.SDate);
        form_Registeredit.find('#txtUser6').val(_formdata.LName);
        form_Registeredit.find('#txtUser7').val(_formdata.Tel);
        form_Registeredit.find('#txtUser1').val(_formdata.IDCard);
        form_Registeredit.find('#txtZipCode').val(_formdata.ZipCode);
        form_Registeredit.find('#txtUser5').val(PHP_JSON_To_ShowDate(_formdata.SDate));

        //***Edit By Yongyuth
        setProvince(function (_p) {
            _p.val(_formdata.ProvinceKey).selectpicker('render');
            setDistrict(function (_d) {
                _d.val(_formdata.DistrictKey).selectpicker('render');
                setSubDistrict(function (_sd) {
                    _sd.val(_formdata.SubDistrictKey).selectpicker('render');
                });
            });
        });
        //********************

        form_Registeredit.find('.showinadd').remove();

        setTitle(_formdata.TitleKey);
    }

    form_Registeredit.find('#txtSDate').dateTime().on('dp.change', function (e) {
        form_Registeredit.formValidation('revalidateField', form_Registeredit.find('#txtUser5'));
    });
    form_Registeredit.find('#txtSDate01').dateTime().on('dp.change', function (e) {
        form_Registeredit.formValidation('revalidateField', form_Registeredit.find('#txtUser01'));
    });
    form_Registeredit.find('#txtSDate02').dateTime().on('dp.change', function (e) {
        form_Registeredit.formValidation('revalidateField', form_Registeredit.find('#txtUser02'));
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
//            setDistrict(Guid);
            setDistrict(function (_d) {
                _d.val(Guid).selectpicker('render');
                setSubDistrict(function (_sd) {
                    _sd.val(Guid).selectpicker('render');
                })
            });
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
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

    form_Registeredit.find('#cmdDistrict').selectpicker().on({
        change: function () {
//            setSubDistrict(Guid);
            setSubDistrict(function (_sd) {
                _sd.val(Guid).selectpicker('render');
            })
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
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
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
                _sel.append(_html).selectpicker('refresh')
                v(_sel);
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
