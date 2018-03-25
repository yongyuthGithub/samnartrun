$(function () {
    var form_bill = $('#form_bill');
    var form_bilelist = $('#form_bilelist');
    var form_sumbit = $('#form_sumbit');

    form_bill.find('#divSDate').datetimepicker({
        format: 'DD/MM/YYYY',
        maxDate: new Date(),
        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_bill.find('#divEDate').data("DateTimePicker").minDate(ds.date);
//        setFind();
    });

    form_bill.find('#divEDate').datetimepicker({
        format: 'DD/MM/YYYY',
        minDate: new Date(),
        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_bill.find('#divSDate').data("DateTimePicker").maxDate(ds.date);
//        setFind();
    });

    form_bilelist.setMainPage({
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
            {data: 'DocID', header: 'เลขที่บิล'},
            {data: 'DocDate', header: 'วันที่บิล'},
            {data: 'CustomerKey', header: 'ลูกค้า'},
            {data: 'TotalPrice', header: 'ราคารวม'},
            {data: 'Discount', header: 'ส่วนลด'},
            {data: 'Vat', header: 'ภาษี'},
            {data: 'NetPrice', header: 'ราคาสุทธิ'}
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
                    txtdisplay: 'ออกบิลใหม่'
                }
            }).prop('action', mvcPatch('Bill/indexNew')).submit();
        },
        btnEditFun: function (f, d) {
        },
        btnDeleteFun: function (f, d) {
        },
        btnPreviewFun: function (f, d) {
        }
    });
});

