$(function () {
    var form_mysystem = $('#form_mysystem');

    $.reqData({
        url: mvcPatch('MySystem/findMySystem'),
        data: {},
        loanding: true,
        callback: function (vdata) {
            if (vdata.length > 0) {
                var _vdata = $.ToLinq(vdata).First();
                form_mysystem.find('#txtIDCard').val(_vdata.IDCard);
                form_mysystem.find('#txtName').val(_vdata.Customer);
                form_mysystem.find('#txtAddress').val(_vdata.Address);
                form_mysystem.find('#txtZipCode').val(_vdata.ZipCode);
                form_mysystem.find('#txtTel').val(_vdata.Tel);
                form_mysystem.find('#txtFax').val(_vdata.Fax);
                form_mysystem.find('#txtAccountCode').val(_vdata.AccountCode);
                form_mysystem.find('#txtAccountName').val(_vdata.AccountName);

                setProvince(function (_p) {
                    _p.val(_vdata.ProvinceKey).selectpicker('render');
                    setDistrict(function (_d) {
                        _d.val(_vdata.DistrictKey).selectpicker('render');
                        setSubDistrict(function (_sd) {
                            _sd.val(_vdata.SubDistrictKey).selectpicker('render');
                        });
                    });
                });

                setBank(function (_b) {
                    _b.val(_vdata.BankKey).selectpicker('render');
                    setBankBranch(function (_bc) {
                        _bc.val(_vdata.BankBranchKey).selectpicker('render');
                    })
                });
            } else {
                setProvince(function (_p) {
                    _p.val(Guid).selectpicker('render');
                    setDistrict(function (_d) {
                        _d.val(Guid).selectpicker('render');
                        setSubDistrict(function (_sd) {
                            _sd.val(Guid).selectpicker('render');
                        });
                    });
                });

                setBank(function (_b) {
                    _b.val(Guid).selectpicker('render');
                    setBankBranch(function (_bc) {
//                        _bc.val(Guid).selectpicker('render');
                    })
                });
            }
        }
    });

    form_mysystem.find('#cmdProvince').selectpicker().on({
        change: function () {
//            setDistrict(Guid);
            setDistrict(function (_d) {
                _d.val(Guid).selectpicker('render');
                form_mysystem.formValidation('revalidateField', form_mysystem.find('#cmdDistrict'));
                setSubDistrict(function (_sd) {
                    _sd.val(Guid).selectpicker('render');
                    form_mysystem.formValidation('revalidateField', form_mysystem.find('#cmdSubDistrict'));
                })
            });
        }
    });
    function setProvince(v) {
        $.reqData({
            url: mvcPatch('Province/findProvince'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_mysystem.find('#cmdProvince').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.Province + '">&nbsp;&nbsp;' + v.Province + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

    form_mysystem.find('#cmdDistrict').selectpicker().on({
        change: function () {
//            setSubDistrict(Guid);
            setSubDistrict(function (_sd) {
                _sd.val(Guid).selectpicker('render');
                form_mysystem.formValidation('revalidateField', form_mysystem.find('#cmdSubDistrict'));
            })
        }
    });
    function setDistrict(v) {
        $.reqData({
            url: mvcPatch('Province/findDistrict'),
            data: {key: form_mysystem.find('#cmdProvince').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_mysystem.find('#cmdDistrict').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.District + '">&nbsp;&nbsp;' + v.District + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

    form_mysystem.find('#cmdSubDistrict').selectpicker().on({
        change: function () {
            var _v = $(this).find('option[value="' + $(this).val() + '"]').data('zipcode');
            form_mysystem.find('#txtZipCode').val(_v);
            form_mysystem.formValidation('revalidateField', form_mysystem.find('#txtZipCode'));
        }
    });
    function setSubDistrict(v) {
        $.reqData({
            url: mvcPatch('Province/findSubDistrict'),
            data: {key: form_mysystem.find('#cmdDistrict').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_mysystem.find('#cmdSubDistrict').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.SubDistrict + '"  data-zipcode="' + v.ZipCode + '">&nbsp;&nbsp;' + v.SubDistrict + '</option>';
                });
                _sel.append(_html).selectpicker('refresh')
                v(_sel);
            }
        });
    }

    form_mysystem.find('#cmdBank').selectpicker().on({
        change: function () {
            setBankBranch(function (_bc) {
//                _bc.val(Guid).selectpicker('render');
                form_mysystem.formValidation('revalidateField', form_mysystem.find('#cmdBankBranch'));
            });
        }
    });
    function setBank(v) {
        $.reqData({
            url: mvcPatch('MySystem/findBank'),
//            data: {key: form_mysystem.find('#cmdDistrict').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_mysystem.find('#cmdBank').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-bank" value="' + v.RowKey + '" data-display="' + v.Bank + '">&nbsp;&nbsp;' + v.Bank + '</option>';
                });
                _sel.append(_html).selectpicker('refresh')
                v(_sel);
            }
        });
    }

    form_mysystem.find('#cmdBankBranch').selectpicker().on({
        change: function () {
        }
    });
    function setBankBranch(v) {
        $.reqData({
            url: mvcPatch('MySystem/findBankBranch'),
            data: {key: form_mysystem.find('#cmdBank').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_mysystem.find('#cmdBankBranch').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-bank" value="' + v.RowKey + '" data-display="' + v.Branch + '">&nbsp;&nbsp;' + v.Branch + '</option>';
                });
                _sel.append(_html).selectpicker('refresh')
                v(_sel);
            }
        });
    }

    form_mysystem.find('#btn-save').on({
        click: function () {
            form_mysystem.submit();
        }
    });

    form_mysystem.myValidation({
        funsuccess: function () {
            var obj = new Object({
                IDCard: form_mysystem.find('#txtIDCard').val(),
                Customer: form_mysystem.find('#txtName').val(),
                Address: form_mysystem.find('#txtAddress').val(),
                SubDistrict: form_mysystem.find('#cmdSubDistrict').val(),
                ZipCode: form_mysystem.find('#txtZipCode').val(),
                Tel: form_mysystem.find('#txtTel').val(),
                Fax: form_mysystem.find('#txtFax').val(),
                AccountCode: form_mysystem.find('#txtAccountCode').val(),
                AccountName: form_mysystem.find('#txtAccountName').val(),
                BankBranchKey: form_mysystem.find('#cmdBankBranch').val(),
            });
            $.bConfirm({
                buttonOK: function (k) {
                    k.close();
                    $.reqData({
                        url: mvcPatch('MySystem/editMySystem'),
                        data: {data: JSON.stringify(obj)},
                        loanding: false,
                        callback: function (vdata) {
                            if (vdata.success) {
                                //javascript code
                            } else {
                                $.bAlert({
                                    message: vdata.message
                                });
                            }
                        }
                    });
                }
            });
        },
        btnactive: [
            form_mysystem.find('#btn-save')
        ],
        fields: {
            txtIDCard: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุเลขประจำตัวผู้เสียภาษี'
                    },
                    stringLength: {
                        max: 13,
                        min: 13,
                        message: '* กรุณาระบุจำนวนตัวเลย 13 หลักเท่านั้น'
                    },
                    regexp: {
                        regexp: regexpIDCard,
                        message: '* กรุณาระบุรูปแบบเลขประจำตัวผู้เสียภาษีเท่านั้น'
                    }
                }
            },
            txtName: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุชื่อบริษัท'
                    }
                }
            },
            txtAddress: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุที่อยู่บริษัท'
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
            txtAccountCode: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุหมายเลขบัญชี'
                    }
                }
            },
            cmdBank: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุธนาคาร'
                    }
                }
            },
            cmdBankBranch: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุสาขาธนาคาร'
                    }
                }
            },
            txtAccountName: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุชื่อบัญชี'
                    }
                }
            },
        }
    });
});