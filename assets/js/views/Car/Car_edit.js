$(function () {
    var form_Caredit = $('#form_Caredit');
    var form_Caredit_C = $.modelDialog(form_Caredit);

    var _formdata = form_Caredit_C.data('data');
    if (_formdata.key === Guid) {
        setBrand(function (_b) {
            _b.val(Guid).selectpicker('render');
            setProvince(function (_p) {
                _p.val(Guid).selectpicker('render');
            });
        });
    } else {
        form_Caredit.find('#cmdBrand').val(_formdata.BrandKey);
        form_Caredit.find('#txtCarNumber').val(_formdata.CarNumber);
        form_Caredit.find('#cmdProvince').val(_formdata.ProvinceKey);
        form_Caredit.find('#txtCarType').val(_formdata.CarType);
        form_Caredit.find('.showinadd').remove();
        //***Edit By Yongyuth
         setBrand(function (_b) {
            _b.val(Guid).selectpicker('render');
            setProvince(function (_p) {
                _p.val(Guid).selectpicker('render');
            });
        });
        //********************
    }


    form_Caredit.find('#cmdBrand').selectpicker().on({
        change: function () {
//            setDistrict(Guid);
            setBrand(function (_b) {
                _b.val(Guid).selectpicker('render');
                setProvince(function (_p) {
                    _p.val(Guid).selectpicker('render');
                })
            });
        }
    });
    function setBrand(v) {
        $.reqData({
            url: mvcPatch('Brand/findBrand'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_Caredit.find('#cmdBrand').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.Brand + '">&nbsp;&nbsp;' + v.Brand + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }
    form_Caredit.find('#cmdBrand').selectpicker().on({
        change: function () {
//            setSubDistrict(Guid);
            setBrand(function (_b) {
                _b.val(Guid).selectpicker('render');
            })
        }
    });
    function setProvice(v) {
//       alert(form_Caredit.find('#cmdProvince').val());
        $.reqData({
            url: mvcPatch('Province/findProvice'),
            data: {key: form_Caredit.find('#cmdProvince').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_Caredit.find('#cmdBrand').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.Provice + '">&nbsp;&nbsp;' + v.Provice + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }


    form_Caredit_C.find('#btn-ok').on({
        click: function () {
            form_Caredit.submit();
        }
    })

    form_Caredit.myValidation({
        funsuccess: function () {
            form_Caredit_C.data('fun')(form_Caredit_C);
        },
        btnactive: [
            form_Caredit_C.find('#btn-ok')
        ],
        fields: {
            cmdBrand: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาเลือก แบน .'
                    }
                }
            },
            txtCarNumber: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ เลขทะเบียนรถ.'
                    }
                }
            },
            cmdProvince: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ จังหวัด.'
                    }
                }
            },
            txtCarType: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ ประเภทเพลา.'
                    }
                }
            },

        }
    });
});
