$(function () {
    var form_receiptedit = $('#form_receiptedit');
    var form_billlist = form_receiptedit.find('#form_billlist');
    var form_otherlist = form_receiptedit.find('#form_otherlist');

    if ($('#txtkey').val() !== Guid) {
        form_receiptedit.find('.cheque-type').css({'display': 'none'});
    } else {
        setDataCust(Guid, function () {});
        form_receiptedit.find('.cheque-type').css({'display': 'none'});
        setBank(function () {
            setBankBranch(function () {});
        });
    }

    form_receiptedit.find('#cmdCust').selectpicker({
    }).on({
        change: function () {
//            form_billlist.data('data', vdata);
//                    form_receiptedit.find('#cmdVatStatus').change();
            form_billlist.data('data', new Array()).find('.xref').click();
            setDataCustBranch(function (s) {
                form_receiptedit.formValidation('revalidateField', s);
            })
        }
    });

    function setDataCust(v, fun) {
        $.reqData({
            url: mvcPatch('Receipt/findCustomer'),
//            data: {key: $('#txtkey').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_receiptedit.find('#cmdCust').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-address-book" value="' + v.RowKey + '" data-display="' + v.Customer + '">&nbsp;&nbsp;(' + v.CusCode + ') ' + v.Customer + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
                setDataCustBranch(fun);
            }
        });
    }

    form_receiptedit.find('#cmdPayType').selectpicker({
    }).on({
        change: function () {
            if (parseInt($(this).val()) === 1) {
                form_receiptedit.find('.cheque-type').css({'display': 'none'});
            } else {
                form_receiptedit.find('.cheque-type').css({'display': 'block'});
            }
        }
    });

    form_receiptedit.find('#cmdCustBranch').selectpicker({
    }).on({
        change: function () {
//            setDueData();
        }
    });

    function setDataCustBranch(fun) {
        $.reqData({
            url: mvcPatch('Receipt/findCustomerBranch'),
            data: {key: form_receiptedit.find('#cmdCust').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_receiptedit.find('#cmdCustBranch').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-building" value="' + v.RowKey + '" data-duedate="' + v.DueDate + '">&nbsp;&nbsp;' + v.Branch + ' ' + v.Address + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                fun(_sel);
            }
        });
    }

    form_receiptedit.find('#cmdBank').selectpicker({
    }).on({
        change: function () {
            setBankBranch(function () {});
        },
        'loaded.bs.select': function (e) {
            $('#btn-BankNew').on({
                click: function () {
                    $.bPopup({
                        url: mvcPatch('Receipt/newBank'),
                        title: 'เพิ่มธนาคาร',
                        closable: false,
                        size: BootstrapDialog.SIZE_NORMAL,
                        onshow: function (k) {
                            k.getModal().data({
                                data: new Object({key: Guid}),
                                fun: function (_f) {
                                    var obj = new Object();
                                    obj.RowKey = Guid;
                                    obj.Bank = _f.find('#txtBank').val();
                                    obj.IsDefault = _f.find('#swDF').is(':checked');
                                    $.bConfirm({
                                        buttonOK: function (k) {
                                            k.close();
                                            $.reqData({
                                                url: mvcPatch('Receipt/editBank'),
                                                data: {data: JSON.stringify(obj)},
                                                loanding: false,
                                                callback: function (vdata) {
                                                    if (vdata.success) {
                                                        _f.find('#btn-close').click();
                                                        setBank(function (_t) {
                                                            _t.val(vdata.key).selectpicker('render').change();
                                                            setBankBranch(function () {});
                                                        });
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
                            });
                        },
                        buttons: [
                            {
                                id: 'btn-ok',
                                icon: 'fa fa-check',
                                label: '&nbsp;ตกลง',
                                action: function (k) {

                                }
                            }
                        ]
                    });
                }
            })
        }
    });

    function setBank(fun) {
        $.reqData({
            url: mvcPatch('Receipt/findBank'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_receiptedit.find('#cmdBank').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    var _s = v.IsDefault === '1' ? 'selected' : '';
                    _html += '<option data-icon="fa fa-building" value="' + v.RowKey + '" ' + _s + '>&nbsp;&nbsp;' + v.Bank + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                fun(_sel);
            }
        });
    }

    form_receiptedit.find('#cmdBankBranch').selectpicker({
    }).on({
        change: function () {
//            setDueData();
        },
        'loaded.bs.select': function (e) {
            $('#btn-BankBranchNew').on({
                click: function () {
                    $.bPopup({
                        url: mvcPatch('Receipt/newBankBranch'),
                        title: 'เพิ่มสาขาธนาคาร',
                        closable: false,
                        size: BootstrapDialog.SIZE_NORMAL,
                        onshow: function (k) {
                            k.getModal().data({
                                data: new Object({key: Guid}),
                                fun: function (_f) {
                                    var obj = new Object();
                                    obj.RowKey = Guid;
                                    obj.BankKey = form_receiptedit.find('#cmdBank').val();
                                    obj.Branch = _f.find('#txtBankBranch').val();
                                    obj.IsDefault = _f.find('#swDF').is(':checked');
                                    $.bConfirm({
                                        buttonOK: function (k) {
                                            k.close();
                                            $.reqData({
                                                url: mvcPatch('Receipt/editBankBranch'),
                                                data: {data: JSON.stringify(obj)},
                                                loanding: false,
                                                callback: function (vdata) {
                                                    if (vdata.success) {
                                                        _f.find('#btn-close').click();
                                                        setBankBranch(function (_t) {
                                                            _t.val(vdata.key).selectpicker('render').change();
                                                        });
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
                            });
                        },
                        buttons: [
                            {
                                id: 'btn-ok',
                                icon: 'fa fa-check',
                                label: '&nbsp;ตกลง',
                                action: function (k) {

                                }
                            }
                        ]
                    });
                }
            })
        }
    });

    function setBankBranch(fun) {
        $.reqData({
            url: mvcPatch('Receipt/findBankBranch'),
            data: {key: form_receiptedit.find('#cmdBank').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_receiptedit.find('#cmdBankBranch').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    var _s = v.IsDefault === '1' ? 'selected' : '';
                    _html += '<option data-icon="fa fa-building" value="' + v.RowKey + '" ' + _s + '>&nbsp;&nbsp;' + v.Branch + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                fun(_sel);
            }
        });
    }

    form_receiptedit.find('#divDate').datetimepicker({
        format: 'DD/MM/YYYY',
        locale: 'th',
        defaultDate: new Date()
    }).on('dp.change', function (ds) {
//        form_receiptedit.formValidation('revalidateField', form_billnew.find('#txtDocDate'));
//        form_billnew.find('#divDueDate').data("DateTimePicker").minDate(ds.date);
//        setDueData();
    });

    form_receiptedit.find('#divChequeDate').datetimepicker({
        format: 'DD/MM/YYYY',
        locale: 'th',
        defaultDate: new Date()
    }).on('dp.change', function (ds) {
//        form_receiptedit.formValidation('revalidateField', form_billnew.find('#txtDocDate'));
//        form_billnew.find('#divDueDate').data("DateTimePicker").minDate(ds.date);
//        setDueData();
    });

    function SumAmounts() {
        var TBill = $.ToLinq(form_billlist.data('data'))
                .Select(function (x) {
                    return x.InputAmounts;
                }).Sum();
        var TOther = $.ToLinq(form_otherlist.data('data'))
                .Select(function (x) {
                    return x.InputAmounts;
                }).Sum();
        var _sum = TBill + TOther;
        form_receiptedit.find('#txtPriceTotal').data('data', _sum).val(addCommas(_sum, 2));
    }

    form_billlist.on('focusout', '.txtInputAmounts', function () {
        var _key = $(this).data('key');
        var _v = ChkNumber($(this).val()).toFixed(2);
        var _thisD = $.ToLinq(form_billlist.data('data'))
                .Where(x => x.key === _key)
                .First();
        _thisD.InputAmounts = parseFloat(_thisD.Amounts) < parseFloat(_v) ? parseFloat(_thisD.Amounts) : parseFloat(_v);
        $(this).val(_thisD.InputAmounts);
        SumAmounts();
    });

    form_billlist.data('data', new Array()).setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: false,
        btnPreview: false,
        headerString: '',
//        UrlDataJson: mvcPatch('controllers/action'),
        DataJson: function () {
            return form_billlist.data('data');
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumnsOrder: [],
        AfterLoadData: function (f, d, t) {
            SumAmounts();
        },
        DataColumns: [
            {data: 'DocID', header: 'เลขที่บิล', orderable: false},
            {data: 'DocDate', header: 'วันที่บิล', orderable: false},
            {data: 'Amounts', header: 'จำนวนเงินชำระได้', orderable: false},
            {data: 'InputAmounts', header: 'จำนวนเงินที่ชำระ', orderable: false},
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return PHP_JSON_To_ShowDate(val2.DocDate);
                },
                orderable: false,
                targets: 1
            },
            {
                render: function (row, type, val2, meta) {
                    return addCommas(val2.Amounts, 2);
                },
                orderable: false,
                targets: 2
            },
            {
                render: function (row, type, val2, meta) {
                    return '<input type="text" class="form-control text-right txtInputAmounts" id="t' + val2.key + '" name="t' + val2.key + '" data-key="' + val2.key + '" data-max="' + val2.Amounts + '" placeholder="จำนวนที่ชำระ" value="' + val2.InputAmounts + '">';
                },
                orderable: false,
                targets: 3
            }
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Receipt/newBill'),
                title: 'เลือกบิล',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        key: form_receiptedit.find('#cmdCust').val(),
                        data: $.ToLinq(f.data('data')).Select(function (x) {
                            return x.key
                        }).ToArray(),
                        fun: function (_f) {
                            $.each(_f.find('#cmdNewBill').find('option:checked'), function (k, v) {
                                f.data('data').push({
                                    key: $(v).val(),
                                    DocID: $(v).data('docid'),
                                    DocDate: $(v).data('docdate'),
                                    Amounts: $(v).data('amounts'),
                                    InputAmounts: $(v).data('amounts')
                                });
                            });
                            f.find('.xref').click();
                            _f.find('#btn-close').click();
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

    form_otherlist.on('focusout', '.txtDetail_other', function () {
        var _key = $(this).data('key');
        var _thisD = $.ToLinq(form_otherlist.data('data'))
                .Where(x => x.key === _key)
                .First();
        _thisD.Detail = $(this).val();
    });

    form_otherlist.on('focusout', '.txtInputAmounts_other', function () {
        var _key = $(this).data('key');
        var _v = ChkNumber($(this).val()).toFixed(2);
        var _thisD = $.ToLinq(form_otherlist.data('data'))
                .Where(x => x.key === _key)
                .First();
        _thisD.InputAmounts = parseFloat(_v);
        $(this).val(_thisD.InputAmounts);
        SumAmounts();
    });

    form_otherlist.data('data', new Array()).setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: false,
        btnPreview: false,
        headerString: '',
//        UrlDataJson: mvcPatch('controllers/action'),
        DataJson: function () {
            return form_otherlist.data('data');
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumnsOrder: [],
        AfterLoadData: function (f, d, t) {
            SumAmounts();
        },
        DataColumns: [
            {data: 'Seq', header: '#', orderable: false},
            {data: 'Detail', header: 'รายละเอียด', orderable: false},
            {data: 'InputAmounts', header: 'จำนวนเงินที่ชำระ', orderable: false},
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return '<input type="text" class="form-control text-left txtDetail_other" id="td' + val2.key + '" name="td' + val2.key + '" data-key="' + val2.key + '" placeholder="รายละเอียด" value="' + val2.Detail + '">';
                },
                orderable: false,
                targets: 1
            },
            {
                render: function (row, type, val2, meta) {
                    return '<input type="text" class="form-control text-right txtInputAmounts_other" id="tt' + val2.key + '" name="tt' + val2.key + '" data-key="' + val2.key + '" placeholder="จำนวนที่ชำระ" value="' + val2.InputAmounts + '">';
                },
                orderable: false,
                targets: 2
            }
        ],
        btnNewFun: function (f) {
            f.data('data').push({
                key: newGuid(),
                Seq: f.data('data').length + 1,
                Detail: '',
                InputAmounts: 0
            });
            f.find('.xref').click();
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
            $.each(_u, function (k, v) {
                v.Seq = k + 1;
            });
            f.data('data', _u);
            f.find('.xref').click();
        },
        btnPreviewFun: function (f, d) {
        }
    });
});