$(function () {
    var form_RegistereditInsurance = $('#form_RegistereditInsurance');
    var form_RegistereditInsurance_C = $.modelDialog(form_RegistereditInsurance);

    form_RegistereditInsurance.find('.btn-addimage').on({
        click: function () {
            $(this).parents('.divImage').find('.imageShow').findFile({
//                custom_html: '<img class="xcard img-responsive" />',
//                custom_this_image: '.xcard',
//                multiple:true,
//                empty:true
            });
        }
    });
    form_RegistereditInsurance.find('.btn-deleteimage').on({
        click: function () {
            $(this).parents('.divImage').find('.imageShow').removeAttr('src');
        }
    });

    form_RegistereditInsurance.find('.btn-viewimage').on({
        click: function () {
            var _this = $(this).parents('.divImage').find('.imageShow');
            if (!checkUndefined(_this.attr('src'))) {
                $.bPopup({
                    url: mvcPatch('Popup/index'),
                    title: 'Show Picture',
                    closable: true,
                    btnCancel: false,
                    size: BootstrapDialog.SIZE_WIDE,
                    onshow: function (k) {
                        k.getModal().data({
                            data: _this.attr('src')
                        });
                    },
                    buttons: [
                    ]
                });
            }
        }
    });

    var _formdata = form_RegistereditInsurance_C.data('data');
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
        form_RegistereditInsurance.find('#txtUser1').val(_formdata.IDCard);
        form_RegistereditInsurance.find('#txtUser2').val(_formdata.FName);
        form_RegistereditInsurance.find('#txtUser3').val(_formdata.Address);
        form_RegistereditInsurance.find('#cmdSubDistrict').val(_formdata.SubDistrict);
        form_RegistereditInsurance.find('#txtSDate').val(_formdata.SDate);
        form_RegistereditInsurance.find('#txtUser6').val(_formdata.LName);
        form_RegistereditInsurance.find('#txtUser7').val(_formdata.Tel);
        form_RegistereditInsurance.find('#txtUser1').val(_formdata.IDCard);
        form_RegistereditInsurance.find('#txtZipCode').val(_formdata.ZipCode);
        form_RegistereditInsurance.find('#txtUser5').val(PHP_JSON_To_ShowDate(_formdata.SDate));

        $.each(_formdata.TRNEmployeeFiles, function (k, v) {
            var _image = form_RegistereditInsurance.find('.tab-image[data-type="' + v.FileType + '"]');
            if (!checkNull(v.EDate))
                _image.find('.txtDate').val(PHP_JSON_To_ShowDate(v.EDate));

            $.reqData({
                url: mvcPatch('Register/findImage'),
                data: {key: v.RowKey},
                loanding: false,
                callback: function (vdata) {
                    _image.find('.imageShow').prop('src', vdata.ImageBase64);
                }
            });
        });

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

        form_RegistereditInsurance.find('.showinadd').remove();

        setTitle(_formdata.TitleKey);
    }

    form_RegistereditInsurance.find('#txtSDate').dateTime().on('dp.change', function (e) {
        form_RegistereditInsurance.formValidation('revalidateField', form_RegistereditInsurance.find('#txtUser5'));
    });
    form_RegistereditInsurance.find('#divEDate_Card').dateTime().on('dp.change', function (e) {
//        form_RegistereditInsurance.formValidation('revalidateField', form_RegistereditInsurance.find('#txtUser01'));
    });
    form_RegistereditInsurance.find('#divEDate_driver').dateTime().on('dp.change', function (e) {
//        form_RegistereditInsurance.formValidation('revalidateField', form_RegistereditInsurance.find('#txtUser02'));
    });
    form_RegistereditInsurance.find('#txtSDate1').dateTime().on('dp.change', function (e) {
        form_RegistereditInsurance.formValidation('revalidateField', form_RegistereditInsurance.find('#txtUser11'));
    });
    form_RegistereditInsurance.find('#divEDate_Card').dateTime().on('dp.change', function (e) {
//        form_RegistereditInsurance.formValidation('revalidateField', form_RegistereditInsurance.find('#txtUser01'));
    });
    form_RegistereditInsurance.find('#divEDate_driver').dateTime().on('dp.change', function (e) {
//        form_RegistereditInsurance.formValidation('revalidateField', form_RegistereditInsurance.find('#txtUser02'));
    });

//    funDateTime(form_RegistereditInsurance.find('#txtSDate')).date('14/02/2018');
//    alert(PHP_DateTimeShow_To_JSON(form_RegistereditInsurance.find('#txtSDate')));

    form_RegistereditInsurance.find('#cmdTitle').selectpicker().on({
        change: function () {
        }
    });
    function setTitle(v) {
        $.reqData({
            url: mvcPatch('admin/findTitle'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_RegistereditInsurance.find('#cmdTitle').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.Title + '">&nbsp;&nbsp;' + v.Title + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }



    form_RegistereditInsurance.find('#cmdProvince').selectpicker().on({
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
            url: mvcPatch('Province/Insurancetype'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_RegistereditInsurance.find('#cmdProvince').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.TypeName + '">&nbsp;&nbsp;' + v.TypeName + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

    form_RegistereditInsurance.find('#cmdDistrict').selectpicker().on({
        change: function () {
//            setSubDistrict(Guid);
            setSubDistrict(function (_sd) {
                _sd.val(Guid).selectpicker('render');
            })
        }
    });
    function setDistrict(v) {
        $.reqData({
            url: mvcPatch('Province/Insurance'),
            data: {key: form_RegistereditInsurance.find('#cmdProvince').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_RegistereditInsurance.find('#cmdDistrict').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.InsuranceName + '">&nbsp;&nbsp;' + v.InsuranceName + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

    form_RegistereditInsurance.find('#cmdSubDistrict').selectpicker().on({
        change: function () {
            var _v = $(this).find('option[value="' + $(this).val() + '"]').data('zipcode');
            form_RegistereditInsurance.find('#txtZipCode').val(_v);
            form_RegistereditInsurance.formValidation('revalidateField', form_RegistereditInsurance.find('#txtZipCode'));
        }
    });
    function setSubDistrict(v) {
        $.reqData({
            url: mvcPatch('Province/findSubDistrict'),
            data: {key: form_RegistereditInsurance.find('#cmdDistrict').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_RegistereditInsurance.find('#cmdSubDistrict').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.SubDistrict + '"  data-zipcode="' + v.ZipCode + '">&nbsp;&nbsp;' + v.SubDistrict + '</option>';
                });
                _sel.append(_html).selectpicker('refresh')
                v(_sel);
            }
        });
    }

    form_RegistereditInsurance_C.find('#btn-ok').on({
        click: function () {
            form_RegistereditInsurance.submit();
        }
    });

    form_RegistereditInsurance.myValidation({
        funsuccess: function () {
            form_RegistereditInsurance_C.data('fun')(form_RegistereditInsurance_C);
        },
        btnactive: [
            form_RegistereditInsurance_C.find('#btn-ok')
        ],
        fields: {
            txtUser1: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุรหัสบัตรประชาชน'
                    },
                    stringLength: {
                        max: 13,
                        min: 13,
                        message: '* กรุณาระบุจำนวนตัวเลย 13 หลักเท่านั้น'
                    },
                    regexp: {
                        regexp: regexpIDCard,
                        message: '* กรุณาระบุรูปแบบบัตรประชาชนเท่านั้น'
                    }
                }
            },
            cmdTitle: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุคำนาม'
                    }
                }
            },
            txtUser6: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุชื่อ'
                    }
                }
            },
            txtUser2: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุนามสกุล'
                    }
                }
            },
            txtUser3: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุที่อยู่'
                    }
                }
            },
            cmdProvince: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุจังหวัด'
                    }
                }
            },
            cmdDistrict: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุอำเภอ'
                    }
                }
            },
            cmdSubDistrict: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุตำบล'
                    }
                }
            },
            txtZipCode: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุรหัสไปรษณีย์'
                    }
                }
            },
            txtUser7: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุเบอร์โทรศัพท์'
                    }
                }
            },
            txtUser5: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุวันที่เริ่มงาน'
                    }
                }
            },

        }


    });
});
