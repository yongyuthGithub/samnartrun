$(function () {
    var form_recordedit = $('#form_recordedit');
    var form_recordedit_C = $.modelDialog(form_recordedit);
    var form_incomein = $('#form_incomein');
    var form_incomeout = $('#form_incomeout');
    var form_fule = $('#form_fule');

    var _formdata = form_recordedit_C.data('data');
    if (_formdata.key === Guid) {
        setCarF(Guid);
        setCarS(Guid);
        form_incomein.data('data', new Array());
        form_incomeout.data('data', new Array());
        setCustomerF(function (_p) {
            _p.val(Guid).selectpicker('render');
            setCustomerBranchF(function (_b) {
                _b.val(Guid).selectpicker('render');
            });
        });
        setCustomerS(function (_p) {
            _p.val(Guid).selectpicker('render');
            setCustomerBranchS(function (_b) {
                _b.val(Guid).selectpicker('render');
            });
        });
    } else {

    }

    form_recordedit.find('#divDate').dateTime();
    form_recordedit.find('#cmdCarF').selectpicker({
    }).on({
        change: function () {

        }
    });
    function setCarF(v) {
        $.reqData({
            url: mvcPatch('Record/findCarFirst'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordedit.find('#cmdCarF').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    var _p = parseInt(v.CarType) === 1 ? '2 เพลา' : '3 เพลา';
                    _html += '<option data-icon="fa fa-truck" value="' + v.RowKey + '" data-display="' + v.CarNumber + '">&nbsp;&nbsp;(' + _p + ') ' + v.CarNumber + ' -> ' + v.Province + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }
    form_recordedit.find('#cmdCarS').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });
    function setCarS(v) {
        $.reqData({
            url: mvcPatch('Record/findCarSecond'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordedit.find('#cmdCarS').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    var _p = parseInt(v.CarType) === 1 ? '2 เพลา' : '3 เพลา';
                    _html += '<option data-icon="fa fa-truck" value="' + v.RowKey + '" data-display="' + v.CarNumber + '">&nbsp;&nbsp;(' + _p + ') ' + v.CarNumber + ' -> ' + v.Province + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }

    form_recordedit.find('#cmdCustomerF').selectpicker({
    }).on({
        change: function () {
            setCustomerBranchF(function (_b) {
                _b.val(Guid).selectpicker('render');
                form_recordedit.formValidation('revalidateField', form_recordedit.find('#cmdBranchF'));
            });
        }
    });
    function setCustomerF(v) {
        $.reqData({
            url: mvcPatch('Record/findCustomer'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordedit.find('#cmdCustomerF').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    var _c = $.trim(v.CusCode).length === 0 ? v.Customer : v.CusCode + ' -> ' + v.Customer;
                    _html += '<option data-icon="fa fa-building" value="' + v.RowKey + '" data-display="' + _c + '">&nbsp;&nbsp;' + _c + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

    form_recordedit.find('#cmdBranchF').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });
    function setCustomerBranchF(v) {
        $.reqData({
            url: mvcPatch('Record/findCustomerBranch'),
            data: {key: form_recordedit.find('#cmdCustomerF').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordedit.find('#cmdBranchF').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-building-o" value="' + v.RowKey + '" data-display="' + v.Branch + '">&nbsp;&nbsp;' + v.Branch + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

    form_recordedit.find('#cmdCustomerS').selectpicker({
    }).on({
        change: function () {
            setCustomerBranchS(function (_b) {
                _b.val(Guid).selectpicker('render');
                form_recordedit.formValidation('revalidateField', form_recordedit.find('#cmdBranchS'));
            });
        }
    });
    function setCustomerS(v) {
        $.reqData({
            url: mvcPatch('Record/findCustomer'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordedit.find('#cmdCustomerS').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    var _c = $.trim(v.CusCode).length === 0 ? v.Customer : v.CusCode + ' -> ' + v.Customer;
                    _html += '<option data-icon="fa fa-building" value="' + v.RowKey + '" data-display="' + _c + '">&nbsp;&nbsp;' + _c + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

    form_recordedit.find('#cmdBranchS').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });
    function setCustomerBranchS(v) {
        $.reqData({
            url: mvcPatch('Record/findCustomerBranch'),
            data: {key: form_recordedit.find('#cmdCustomerS').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordedit.find('#cmdBranchS').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-building-o" value="' + v.RowKey + '" data-display="' + v.Branch + '">&nbsp;&nbsp;' + v.Branch + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

    form_incomein.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
//        UrlDataJson: mvcPatch('controllers/action'),
        DataJson: function () {
            return form_incomein.data('data');
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'Detial', header: 'รายละเอียด', orderable: false},
            {data: 'Amount', header: 'จำนวนเงิน', orderable: false},
//            {data: 'Menu', header: 'Menu'},
//            {data: 'Icon', header: 'Icon'},
//            {data: 'Url', header: 'Url'}
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return addCommas(val2.Amount, 2);
                },
                orderable: true,
                targets: 1
            }
        ],
        DataColumnsOrder: new Array(),
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Record/incomeinEdit'),
                title: 'เพิ่มรายการรับ',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object({
                                key: newGuid(),
                                Detial: _f.find('#txtDetail').val(),
                                Amount: _f.find('#txtAmount').val()
                            });
                            var _chk = $.ToLinq(f.data('data'))
                                    .Where(x => $.trim(x.Detial).toLocaleLowerCase() === $.trim(obj.Detial).toLocaleLowerCase())
                                    .ToArray();
                            if (_chk.length > 0) {
                                $.bAlert({
                                    message: 'This item already exists.'
                                });
                            } else {
                                f.data('data').push(obj);
                                f.find('.xref').click();
                                _f.find('#btn-close').click();
                            }
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
            $.bPopup({
                url: mvcPatch('Record/incomeinEdit'),
                title: 'แก้ไขรายการรับ',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object({
                                key: d.key,
                                Detial: _f.find('#txtDetail').val(),
                                Amount: _f.find('#txtAmount').val()
                            });
                            var _chk = $.ToLinq(f.data('data'))
                                    .Where(x => $.trim(x.Detial).toLocaleLowerCase() === $.trim(obj.Detial).toLocaleLowerCase() && x.key !== obj.key)
                                    .ToArray();
                            if (_chk.length > 0) {
                                $.bAlert({
                                    message: 'This item already exists.'
                                });
                            } else {
                                var _up = $.ToLinq(f.data('data'))
                                        .Where(x => x.key === obj.key)
                                        .First();
                                _up.Detial = obj.Detial;
                                _up.Amount = obj.Amount;
                                f.find('.xref').click();
                                _f.find('#btn-close').click();
                            }
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

    form_incomeout.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
//        UrlDataJson: mvcPatch('controllers/action'),
        DataJson: function () {
            return form_incomeout.data('data');
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'Detial', header: 'รายละเอียด', orderable: false},
            {data: 'Amount', header: 'จำนวนเงิน', orderable: false},
//            {data: 'Menu', header: 'Menu'},
//            {data: 'Icon', header: 'Icon'},
//            {data: 'Url', header: 'Url'}
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return addCommas(val2.Amount, 2);
                },
                orderable: true,
                targets: 1
            }
        ],
        DataColumnsOrder: new Array(),
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Record/incomeinEdit'),
                title: 'เพิ่มรายการจ่าย',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object({
                                key: newGuid(),
                                Detial: _f.find('#txtDetail').val(),
                                Amount: _f.find('#txtAmount').val()
                            });
                            var _chk = $.ToLinq(f.data('data'))
                                    .Where(x => $.trim(x.Detial).toLocaleLowerCase() === $.trim(obj.Detial).toLocaleLowerCase())
                                    .ToArray();
                            if (_chk.length > 0) {
                                $.bAlert({
                                    message: 'This item already exists.'
                                });
                            } else {
                                f.data('data').push(obj);
                                f.find('.xref').click();
                                _f.find('#btn-close').click();
                            }
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
            $.bPopup({
                url: mvcPatch('Record/incomeinEdit'),
                title: 'แก้ไขรายการจ่าย',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object({
                                key: d.key,
                                Detial: _f.find('#txtDetail').val(),
                                Amount: _f.find('#txtAmount').val()
                            });
                            var _chk = $.ToLinq(f.data('data'))
                                    .Where(x => $.trim(x.Detial).toLocaleLowerCase() === $.trim(obj.Detial).toLocaleLowerCase() && x.key !== obj.key)
                                    .ToArray();
                            if (_chk.length > 0) {
                                $.bAlert({
                                    message: 'This item already exists.'
                                });
                            } else {
                                var _up = $.ToLinq(f.data('data'))
                                        .Where(x => x.key === obj.key)
                                        .First();
                                _up.Detial = obj.Detial;
                                _up.Amount = obj.Amount;
                                f.find('.xref').click();
                                _f.find('#btn-close').click();
                            }
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

    form_fule.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
//        UrlDataJson: mvcPatch('controllers/action'),
        DataJson: function () {
            return new Array()
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'SubMenu', header: 'ปั้ม', orderable: false},
            {data: 'Description', header: 'สาขา', orderable: false},
            {data: 'Menu', header: 'เลขไมล์ก่อนเติม', orderable: false},
            {data: 'Icon', header: 'จำนวนเงิน', orderable: false},
//            {data: 'Url', header: 'Url'}
        ],
//        DataColumnsDefs: [
//            {
//                render: function (row, type, val2, meta) {
//                    return '<i class="' + val2.Icon + '"></i>';
//                },
//                orderable: true,
//                targets: 3
//            }
//        ],
        DataColumnsOrder: new Array(),
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Record/fuleEdit'),
                title: 'เพิ่มรายการเติมน้ำมัน',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            
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
        },
        btnPreviewFun: function (f, d) {
        }
    });

    form_recordedit_C.find('#btn-ok').on({
        click: function () {
            form_recordedit.submit();
        }
    });

    form_recordedit.myValidation({
        funsuccess: function () {
            form_recordedit_C.data('fun')(form_recordedit_C);
        },
        btnactive: [
            form_recordedit_C.find('#btn-ok')
        ],
        fields: {
            txtDocID: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุเลขที่เอกสาร'
                    }
                }
            },
            txtDocDate: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุวันที่เอกสาร'
                    }
                }
            },
            cmdCarF: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุรถขนส่งส่วนหัว'
                    }
                }
            },
            cmdCarS: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุรถขนส่งส่วนหาง'
                    }
                }
            },
            cmdCustomerF: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุลูกค้าต้นทาง'
                    }
                }
            },
            cmdBranchF: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุสาขาลูกค้าต้นทาง'
                    }
                }
            },
            cmdCustomerS: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุลูกค้าปลายทาง'
                    }
                }
            },
            cmdBranchS: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุสาขาลูกค้าปลายทาง'
                    }
                }
            },
            txtMileageF: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุเลขไมล์ต้นทาง'
                    },
                    regexp: {//***Custom Patter
                        regexp: regexpDecimal,
                        message: '* ระบุเป็นจำนวนตัวเลขเท่านั้น.'
                    }
                }
            },
            txtMileageS: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุเลขไมล์ปลายทาง'
                    },
                    regexp: {//***Custom Patter
                        regexp: regexpDecimal,
                        message: '* ระบุเป็นจำนวนตัวเลขเท่านั้น.'
                    }
                }
            },
            txtTotal: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุค่าบริการในการขนส่ง'
                    },
                    regexp: {//***Custom Patter
                        regexp: regexpDecimal,
                        message: '* ระบุเป็นจำนวนตัวเลขเท่านั้น.'
                    }
                }
            }
        }
    });
});

