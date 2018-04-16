$(function () {
    var form_receipt = $('#form_receipt');
    var form_receiptlist = $('#form_receiptlist');
    var form_sumbit = $('#form_sumbit');

    form_receipt.find('#divSDate').datetimepicker({
        format: 'DD/MM/YYYY',
        maxDate: new Date(),
        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_receipt.find('#divEDate').data("DateTimePicker").minDate(ds.date);
        setFind();
    });

    form_receipt.find('#divEDate').datetimepicker({
        format: 'DD/MM/YYYY',
        minDate: new Date(),
        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_receipt.find('#divSDate').data("DateTimePicker").maxDate(ds.date);
        setFind();
    });

    setFind();
    function setFind() {
//        $.reqData({
//            url: mvcPatch('Bill/findbill'),
//            data: {vdata: JSON.stringify({
//                    SDate: setDateJson(form_receipt.find('#txtSDate').val()),
//                    EDate: setDateJson(form_receipt.find('#txtEDate').val())
//                })
//            },
//            loanding: false,
//            callback: function (vdata) {
//                form_bilelist.data('data', vdata).find('.xref').click();
//            }
//        });
    }

    form_receiptlist.data('data', new Array()).setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
//        UrlDataJson: mvcPatch('controllers/action'),
        DataJson: function () {
            return form_receiptlist.data('data');
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'DocID', header: 'เลขที่ใบเสร็จ'},
            {data: 'DocDate', header: 'วันที่ใบเสร็จ'},
            {data: 'PayType', header: 'ประเภทการชำระ'},
            {data: 'Amounts', header: 'จำนวนเงินที่ชำระ'},
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
        btnNewFun: function (f) {
            form_sumbit.SetDataPost({
                data: {
                    txtkey: Guid,
                    txtdisplay: 'ออกใบเสร็จใหม่'
                }
            }).prop('action', mvcPatch('Receipt/editPage')).submit();
        },
        btnEditFun: function (f, d) {
            form_sumbit.SetDataPost({
                data: {
                    txtkey: d.key,
                    txtdisplay: d.DocID
                }
            }).prop('action', mvcPatch('Receipt/editPage')).submit();
        },
        btnDeleteFun: function (f, d) {

        },
        btnPreviewFun: function (f, d) {
        }
    });
});

