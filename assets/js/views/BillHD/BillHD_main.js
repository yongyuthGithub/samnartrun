$(function () {
    var form_BillHD = $('#form_BillHD');
    var form_recordlist1 = $('#form_recordlist1');
//    form_record.find('#divSDate').dateTime().on('dp.change', function (e) {
////        form_record.find('#divEDate').data("DateTimePicker").minDate(e.date.add(1,'days'));
//        form_record.find('#divEDate').data("DateTimePicker").minDate(e.date);
//    });
//    form_record.find('#divEDate').dateTime().on('dp.change', function (e) {
////        form_record.find('#divSDate').data("DateTimePicker").maxDate(e.date.add(-1,'days'));
//
//        form_record.find('#divSDate').data("DateTimePicker").maxDate(e.date);
//    });

    form_BillHD.find('#divSDate').datetimepicker({
        format: 'DD/MM/YYYY',
        maxDate: new Date(),
        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_BillHD.find('#divEDate').data("DateTimePicker").minDate(ds.date);
        setFind();
    });

    form_BillHD.find('#divEDate').datetimepicker({
        format: 'DD/MM/YYYY',
        minDate: new Date(),
        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_BillHD.find('#divSDate').data("DateTimePicker").maxDate(ds.date);
        setFind();
    });

//    form_record.find('#divSDate, #divEDate').on('dp.hide', function (e) {
////        setFind();
//        var _edate = new Date(form_record.find('#divEDate').data("DateTimePicker").date()).setHours(23, 59, 59, 0);
//        form_record.find('#divEDate').data("DateTimePicker").date(new Date(_edate));
//        form_recordlist.find('.xref').click();
//    });
//    form_record.find('#divSDate, #divEDate').dateTime().data("DateTimePicker").date(new Date());
    setFind();
    function setFind() {
//        var _edate = new Date(form_record.find('#divEDate').data("DateTimePicker").date()).setHours(23, 59, 59, 0);
//        form_record.find('#divEDate').data("DateTimePicker").date(new Date(_edate));
        $.reqData({
            url: mvcPatch('BillHD/findBillHD'),
            data: {vdata: JSON.stringify({
//                    SDate: PHP_DateTimeShow_To_JSON(form_record.find('#divSDate')),
//                    EDate: PHP_DateTimeShow_To_JSON(form_record.find('#divEDate'), true)
                    SDate: setDateJson(form_BillHD.find('#txtSDate').val()),
                    EDate: setDateJson(form_BillHD.find('#txtEDate').val())
                })
            },
            loanding: false,
            callback: function (vdata) {
                form_recordlist1.data('data', vdata).find('.xref').click();
            }
        });
    }

    form_recordlist1.data('data', new Array()).setMainPage({
        btnNew: true,
        btnDeleteAll: false,
        btnDelete: false,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
        UrlLoanding: false,
        UrlLoandingclose: false,
        DataJson: function () {
            return form_recordlist1.data('data');
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
            {data: 'CusCodeF', header: 'บริษัท'},
            {data: 'CusCodeS', header: 'สถานที่ รับ-ส่ง'}
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return '<div class="tdNoneBtn">' + PHP_JSON_To_ShowDate(val2.DocDate) + '</div>';
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
            },
            {
                render: function (row, type, val2, meta) {
                    return val2.CNumberF + ' / ' + val2.CNumberS;
                },
                orderable: true,
                targets: 4
            },
            {
                render: function (row, type, val2, meta) {
                    return ($.trim(val2.CusCodeF).length > 0 ? '(' + val2.CusCodeF + ') ' : '') + val2.CustomerF;
                },
                orderable: true,
                targets: 5
            },
            {
                render: function (row, type, val2, meta) {
                    return  val2.LocationNameB + ' -> ' + val2.LocationNameE;
                },
                orderable: true,
                targets: 6
            }
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('BillHD/edit'),
                title: 'รายการบิล',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = Guid;
                            obj.CusCode=_f.find('#txtCusCode').val();
                            obj.Customer = _f.find('#txtUser').val();
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Customer/editCustomer'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                _f.find('#btn-close').click();
                                                f.find('.xref').click();
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
        },

        btnEditFun: function (f, d) {
           
        },
        btnDeleteFun: function (f, d) {
         
        },
        btnPreviewFun: function (f, d) {
        }
    });
});

