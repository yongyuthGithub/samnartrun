$(function () {
    var form_record = $('#form_record');
    var form_recordlist = $('#form_recordlist');
    form_record.find('#divSDate').dateTime().on('dp.change', function (e) {
//        form_record.find('#divEDate').data("DateTimePicker").minDate(e.date.add(1,'days'));
        form_record.find('#divEDate').data("DateTimePicker").minDate(e.date);
    });
    form_record.find('#divEDate').dateTime().on('dp.change', function (e) {
//        form_record.find('#divSDate').data("DateTimePicker").maxDate(e.date.add(-1,'days'));

        form_record.find('#divSDate').data("DateTimePicker").maxDate(e.date);
    });

    form_record.find('#divSDate').datetimepicker({
        format: 'DD/MM/YYYY',
        maxDate: new Date(),
        defaultDate: new Date().addDays(-1)
    }).on('dp.change', function (ds) {
        form_record.find('#divEDate').data("DateTimePicker").minDate(ds.date);
        setFind();
    });

    form_record.find('#divEDate').datetimepicker({
        format: 'DD/MM/YYYY',
        minDate: new Date().addDays(-1),
        defaultDate: new Date().addDays(1)
    }).on('dp.change', function (ds) {
        form_record.find('#divSDate').data("DateTimePicker").maxDate(ds.date);
        setFind();
    });

//    form_record.find('#divSDate, #divEDate').on('dp.hide', function (e) {
////        setFind();
//        var _edate = new Date(form_record.find('#divEDate').data("DateTimePicker").date()).setHours(23, 59, 59, 0);
//        form_record.find('#divEDate').data("DateTimePicker").date(new Date(_edate));
//        form_recordlist.find('.xref').click();
//    });
//    form_record.find('#divSDate, #divEDate').dateTime().data("DateTimePicker").date(new Date());
//    setFind();
    function setFind() {
//        var _edate = new Date(form_record.find('#divEDate').data("DateTimePicker").date()).setHours(23, 59, 59, 0);
//        form_record.find('#divEDate').data("DateTimePicker").date(new Date(_edate));
        $.reqData({
            url: mvcPatch('Record/findRecord'),
            data: {vdata: JSON.stringify({
//                    SDate: PHP_DateTimeShow_To_JSON(form_record.find('#divSDate')),
//                    EDate: PHP_DateTimeShow_To_JSON(form_record.find('#divEDate'), true)
                    SDate: setDateJsonTime(form_record.find('#txtSDate').val()),
                    EDate: setDateJsonTime(form_record.find('#txtEDate').val())
                })
            },
            loanding: false,
            callback: function (vdata) {
                form_recordlist.data('data', vdata).find('.xref').click();
            }
        });
    }

    form_recordlist.data('data', new Array()).setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
        UrlLoanding: false,
        UrlLoandingclose: false,
        DataJson: function () {
            return form_recordlist.data('data');
        },
//        UrlDataJson: mvcPatch('Record/findRecord'),
//        UrlDataSend: {vdata: JSON.stringify({
//                SDate: PHP_DateTime_To_JSON(form_record.find('#txtSDate').val()),
//                EDate: PHP_DateTime_To_JSON(form_record.find('#txtEDate').val())
//            })
//        },
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'DocID', header: 'เลขที่เอกสาร'},
            {data: 'DocDate', header: 'วันที่เอกสาร'},
            {data: 'Product', header: 'สินค้า'},
            {data: 'PriceTotal', header: 'ค่าบริการ'},
            {data: 'CNumberF', header: 'รถขนส่ง'},
            {data: 'CusCodeF', header: 'จากบริษัท'},
            {data: 'CusCodeS', header: 'ถึงบริษัท'}
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
                    return addCommas(val2.PriceTotal, 2);
                },
                orderable: true,
                targets: 3
            }
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Record/recordEdit'),
                title: 'บันทึกรายการประจำวัน',
                closable: false,
                size: BootstrapDialog.SIZE_WIDE,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: Guid,
                                DocID: _f.find('#txtDocID').val(),
                                DocDate: PHP_DateTimeShow_To_JSON(_f.find('#divDate'), true),
                                CarFirstKey: _f.find('#cmdCarF').val(),
                                CarSecondKey: _f.find('#cmdCarS').val(),
                                Product: _f.find('#txtProduct').val(),
                                CutsomerForm: _f.find('#cmdBranchF').val(),
                                CustomerTo: _f.find('#cmdBranchS').val(),
                                PriceTotal: parseFloat(_f.find('#txtTotal').val()),
//                                Smile: parseFloat(_f.find('#txtMileageF').val()),
//                                Emile: parseFloat(_f.find('#txtMileageS').val()),
                                TRNFule: $.ToLinq(_f.find('#form_fule').data('data'))
                                        .Select(function (x) {
                                            return new Object({
                                                RowKey: x.key,
                                                PumpFuleKey: x.PumpKey,
                                                Price: x.Price,
                                                Smile: x.Smile
                                            });
                                        }).ToArray(),
                                TRNIncome: $.ToLinq(_f.find('#form_incomein').data('data'))
                                        .Select(function (x) {
                                            return new Object({
                                                RowKey: x.key,
                                                Detial: x.Detial,
                                                Amount: x.Amount,
                                                IncomeType: 1
                                            });
                                        }).Union($.ToLinq(_f.find('#form_incomeout').data('data'))
                                        .Select(function (x) {
                                            return new Object({
                                                RowKey: x.key,
                                                Detial: x.Detial,
                                                Amount: x.Amount,
                                                IncomeType: 2
                                            });
                                        })).ToArray()
                            });
//                            alert(JSON.stringify(obj));
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('Record/editRecord'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                _f.find('#btn-close').click();
                                                setFind();
//                                                f.find('.xref').click();
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
});

