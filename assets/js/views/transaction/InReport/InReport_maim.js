$(function () {
    var form_InReport = $('#form_InReport');
    var form_Incometime = $('#form_Incometime');

    form_Incometime.find('#divSDate').datetimepicker({
        format: 'DD/MM/YYYY',
        maxDate: new Date(),
        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_Incometime.find('#divEDate').data("DateTimePicker").minDate(ds.date);
        setFind();
    });

    form_Incometime.find('#divEDate').datetimepicker({
        format: 'DD/MM/YYYY',
        minDate: new Date(),
        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_Incometime.find('#divSDate').data("DateTimePicker").maxDate(ds.date);
        setFind();
    });
    setFind();
    function setFind() {
//        var _edate = new Date(form_record.find('#divEDate').data("DateTimePicker").date()).setHours(23, 59, 59, 0);
//        form_record.find('#divEDate').data("DateTimePicker").date(new Date(_edate));
        $.reqData({
            url: mvcPatch('InReport/findInReport'),
            data: {vdata: JSON.stringify({
//                    SDate: PHP_DateTimeShow_To_JSON(form_record.find('#divSDate')),
//                    EDate: PHP_DateTimeShow_To_JSON(form_record.find('#divEDate'), true)
                    SDate: setDateJson(form_Incometime.find('#txtSDate').val()),
                    EDate: setDateJson(form_Incometime.find('#txtEDate').val())
                })
            },
            loanding: false,
            callback: function (vdata) {
                form_InReport.data('data', vdata).find('.xref').click();
            }
        });
    }

    form_InReport.data('data', new Array()).setMainPage({
        btnNew: true,
        btnNewText: 'พิมพ์รายงาน',
        btnNewIcon: 'glyphicon glyphicon-print',
        btnNewStyle: 'btn-success',
        btnDeleteAll: false,
        btnDelete: false,
        btnEdit: false,
        btnPreview: false,
        headerString: '',
        DataJson: function () {
            return form_InReport.data('data');
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
            {data: 'DocID', header: 'เอกสาร'},
            {data: 'Detial', header: 'รายละเอียด'},
            {data: 'IncomeType', header: 'ประเภท'},
            {data: 'DocDate', header: 'วันที่'},
            {data: 'Amount', header: 'จำนวนเงิน'},
            {data: 'Amount', header: 'ภาษี'},
            {data: 'Amount', header: 'เงินสุทธิ'},
//           {data: 'Url', header: 'Url'}
        ],
        AfterLoadData: function (form, data, table) {
            var _v = $.ToLinq(data)
                    .Select(function (x) {
                        return new Object({
                            IncomeType: parseInt(x.IncomeType),
                            Amount: parseInt(x.IsVat) === 0 ? parseFloat(x.Amount) : parseFloat(x.Amount) + ((parseFloat(x.Amount) * 7) / 100)
                        });
                    });
            var _revenue = _v.Where(x => x.IncomeType === 1).Sum(x => x.Amount);
            var _expenditure = _v.Where(x => x.IncomeType === 0).Sum(x => x.Amount);
            form_Incometime.find('#txtRevenue').val(addCommas(_revenue, 2));
            form_Incometime.find('#txtExpenditure').val(addCommas(_expenditure, 2));
            form_Incometime.find('#txtTotal').val(addCommas(_revenue - _expenditure, 2));
        },
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    var _val = parseInt(val2.IncomeType) === 1 ? 'รายรับ' : 'รายจ่าย';
                    return _val;
                },
                orderable: true,
                targets: 2
            },
            {
                render: function (row, type, val2, meta) {
                    return '<div class="tdNoneBtn">' + PHP_JSON_To_ShowDate(val2.DocDate) + '</div>';
                },
                orderable: true,
                targets: 3
            },
            {
                render: function (row, type, val2, meta) {
                    return addCommas(val2.Amount, 2);
                },
                orderable: true,
                targets: 4
            },
            {
                render: function (row, type, val2, meta) {
                    return parseInt(val2.IsVat) === 1 ? addCommas((parseFloat(val2.Amount) * 7) / 100, 2) : '-';
                },
                orderable: true,
                targets: 5
            },
            {
                render: function (row, type, val2, meta) {
                    return parseInt(val2.IsVat) === 1 ? addCommas(parseFloat(val2.Amount) + ((parseFloat(val2.Amount) * 7) / 100), 2) : addCommas(parseFloat(val2.Amount), 2);
                },
                orderable: true,
                targets: 6
            }
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('InReport/displayPrint'),
                title: 'พิมพ์ข้อมูลรายรับ/รายจ่าย ทั้งหมด',
                closable: true,
                btnCancel: false,
                size: BootstrapDialog.SIZE_WIDE,
                onshow: function (k) {
                    k.getModal().data({
                        data: f.data('data'),
                        fun: function (_f) {

                        }
                    });
                },
                buttons: [
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

