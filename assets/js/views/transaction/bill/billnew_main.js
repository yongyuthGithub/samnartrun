$(function () {
    var form_billnew = $('#form_billnew');
    var form_bilelist = $('#form_bilelist');
    var form_sumbit=$('#form_sumbit');

    form_billnew.find('#cmdCust').selectpicker({
    }).on({
        change: function () {
            var _key = $(this).val();
            $.reqData({
                url: mvcPatch('Bill/findRecordNotIsBill'),
                data: {key: _key},
                loanding: false,
                callback: function (vdata) {
                    form_bilelist.data('data', vdata).find('.xref').click();
                    setDataCustBranch(function (s) {
                        form_billnew.formValidation('revalidateField', s);
                    });
                }
            });
        }
    });

    form_billnew.find('#cmdVatStatus').selectpicker({
    }).on({
        change: function () {
            sumTotal();
        }
    });

    setDataCust(Guid, function () {});
    function setDataCust(v, fun) {
        $.reqData({
            url: mvcPatch('Bill/findCustomerIsRecord'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_billnew.find('#cmdCust').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-address-book" value="' + v.RowKey + '" data-display="' + v.Customer + '">&nbsp;&nbsp;(' + v.CusCode + ') ' + v.Customer + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
                setDataCustBranch(fun);
            }
        });
    }

    form_billnew.find('#cmdCustBranch').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });

    function setDataCustBranch(fun) {
        $.reqData({
            url: mvcPatch('Bill/findCustomerBranch'),
            data: {key: form_billnew.find('#cmdCust').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_billnew.find('#cmdCustBranch').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-building" value="' + v.RowKey + '">&nbsp;&nbsp;' + v.Branch + ' ' + v.Address + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                fun(_sel);
            }
        });
    }

    form_billnew.find('#divDate').datetimepicker({
        format: 'DD/MM/YYYY',
        locale: 'th',
        defaultDate: new Date()
    }).on('dp.change', function (ds) {
        form_billnew.formValidation('revalidateField', form_billnew.find('#txtDocDate'));
    });

    function sumTotal() {
        var _pricetotal = $.ToLinq(form_bilelist.data('data'))
                .Select(function (x) {
                    return x.PriceTotal - x.Discount;
                }).Sum();
        form_billnew.find('#txtPriceTotal').data('data', _pricetotal).val(addCommas(_pricetotal, 2));
        var _afDis = _pricetotal - form_billnew.find('#txtDiscountTotal').val();

        var _vStatus = parseInt(form_billnew.find('#cmdVatStatus').val());
        if (_vStatus === 1) {
            form_billnew.find('#txtVatTotal').data('data', 0).val(addCommas(0, 2));
            form_billnew.find('#txtNetPrice').data('data', _afDis).val(addCommas(_afDis, 2));
        } else if (_vStatus === 2) {
            var _vat = parseFloat(((_afDis * 7) / 100).toFixed(2));
            _afDis = _afDis + _vat;
            form_billnew.find('#txtVatTotal').data('data', _vat).val(addCommas(_vat, 2));
            form_billnew.find('#txtNetPrice').data('data', _afDis).val(addCommas(_afDis, 2));
//            form_billnew.find('#txtNetPrice').data('data', _afDis).val(addCommas(_afDis, 2));
//            var _vat = parseFloat(((_afDis * 7) / 100).toFixed(2));
//            form_billnew.find('#txtVatTotal').data('data', _vat).val(addCommas(_vat, 2));
//            _afDis = (_pricetotal - parseFloat(form_billnew.find('#txtDiscountTotal').val()) - _vat);
//            var _ptotal = _afDis + parseFloat(form_billnew.find('#txtDiscountTotal').val());
//            form_billnew.find('#txtPriceTotal').data('data', _ptotal).val(addCommas(_ptotal, 2));
        }
//        else if (_vStatus === 3) {
//
//        }
    }

    form_billnew.find('#txtDiscountTotal').on({
        focusout: function () {
            var _v = ChkNumber($(this).val()).toFixed(2);
            $(this).val(_v);
            sumTotal();
        }
    });

    form_bilelist.on('focusout', '.txtDis', function () {
        var _key = $(this).data('key');
        var _v = ChkNumber($(this).val()).toFixed(2);
        var _thisD = $.ToLinq(form_bilelist.data('data'))
                .Where(x => x.key === _key)
                .First();
        _thisD.Discount = _v;
        _thisD.NetPrice = (_thisD.PriceTotal - _thisD.Discount).toFixed(2);
        $(this).parents('tr').find('.tTotal').text(addCommas(_thisD.NetPrice, 2));
        $(this).val(_v);
        sumTotal();
    });

    form_bilelist.data('data', new Array()).setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: false,
        btnPreview: false,
        headerString: '',
//        UrlDataJson: mvcPatch('controllers/action'),
        DataJson: function () {
            return form_bilelist.data('data');
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
        AfterLoadData: function (f, d, t) {
            sumTotal();
        },
        DataColumns: [
            {data: 'DocID', header: 'เลขที่ใบงาน'},
            {data: 'DocDate', header: 'วันที่ใบงาน'},
            {data: 'Product', header: 'สินค้า'},
            {data: 'PriceTotal', header: 'ค่าบริการ'},
            {data: 'Discount', header: 'ส่วนลด'},
            {data: 'NetPrice', header: 'เงินรวม'}
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return PHP_JSON_To_ShowDate(val2.DocDate);
                },
                orderable: true,
                targets: 1
            },
            {
                render: function (row, type, val2, meta) {
                    return addCommas(val2.PriceTotal, 2)
                },
                orderable: true,
                targets: 3
            },
            {
                render: function (row, type, val2, meta) {
                    return '<input type="text" class="form-control text-right txtDis" id="t' + val2.key + '" name="t' + val2.key + '" data-key="' + val2.key + '" placeholder="ส่วนลด" value="' + val2.Discount + '">';
                },
                orderable: true,
                targets: 4
            },
            {
                render: function (row, type, val2, meta) {
                    return '<div class="tTotal">' + addCommas(val2.NetPrice, 2) + '</div>';
                },
                orderable: true,
                targets: 5
            }
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Bill/newRecord'),
                title: 'เลือกใบงานเพิ่ม',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        key: form_billnew.find('#cmdCust').val(),
                        data: $.ToLinq(f.data('data')).Select(function (x) {
                            return x.key
                        }).ToArray(),
                        fun: function (_f) {
                            $.reqData({
                                url: mvcPatch('Bill/findRecordByKey'),
                                data: {data: JSON.stringify(_f.find('#cmdNewRecord').val())},
                                loanding: false,
                                callback: function (vdata) {
                                    $.each(vdata, function (k2, v2) {
                                        f.data('data').push(v2);
                                    });
                                    f.find('.xref').click();
                                    _f.find('#btn-close').click();
                                }
                            });
                        }
                    });
                },
                buttons: [
                    {
                        id: 'btn-ok',
                        icon: 'fa fa-check',
                        label: '&nbsp;Save',
                        action: function (k) {
                            //javascript code
                        }
                    }
                ]
            });
        },
        btnEditFun: function (f, d) {
        },
        btnDeleteFun: function (f, d) {
            var _d = $.ToLinq(d)
                    .Select(function (x) {
                        return x.key;
                    });
            var _u = $.ToLinq(f.data('data'))
                    .Where(x => !_d.Contains(x.key))
                    .ToArray();
            f.data('data', _u);
            f.find('.xref').click();
        },
        btnPreviewFun: function (f, d) {
        }
    });

    form_billnew.find('#btn-print').on({
        click: function () {
            form_billnew.submit();
        }
    });

    form_billnew.myValidation({
        funsuccess: function () {
            if (form_bilelist.data('data').length === 0) {
                $.bAlert({
                    message: 'ต้องมีใบงานอย่างน้อย 1 รายการเพื่อใช้ในการออกบิล'
                });
            } else {
                var obj = new Object({
                    RowKey: $('#txtkey').val(),
                    DocDate: setDateJson(form_billnew.find('#txtDocDate').val()),
                    CustomerBranchKey: form_billnew.find('#cmdCustBranch').val(),
                    Vat: parseFloat(form_billnew.find('#txtVatTotal').data('data')),
                    VatStatus: parseInt(form_billnew.find('#cmdVatStatus').val()),
                    Discount: parseFloat(form_billnew.find('#txtDiscountTotal').val()),
                    PrintCount: parseInt(0),
                    TRNBillLD: $.ToLinq(form_bilelist.data('data'))
                            .Select(function (x) {
                                return new Object({
                                    WrokSheetHDKey: x.key,
                                    Discount: parseFloat(x.Discount)
                                });
                            }).ToArray()
                });
                $.bConfirm({
                    buttonOK: function (k) {
                        k.close();
                        $.reqData({
                            url: mvcPatch('Bill/editBill'),
                            data: {data: JSON.stringify(obj)},
                            loanding: false,
                            callback: function (vdata) {
                                if (vdata.success) {
                                    form_sumbit.prop('action',mvcPatch('Bill/index')).submit();
                                } else {
                                    $.bAlert({
                                        message: vdata.message
                                    });
                                }
                            }
                        });
                    }
                });
            }
        },
        btnactive: [
            form_billnew.find('#btn-print')
        ],
        fields: {
            cmdCust: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* เลือกรายชื่อลูกค้าเพื่อทำการออกบิล'
                    }
                }
            },
            cmdCustBranch: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* เลือกที่อยู่ลูกค้าเพื่อใช้ในการออกบิล'
                    }
                }
            },
            txtDocDate: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุวันที่ออกบิล'
                    }
                }
            }
        }
    });
});
