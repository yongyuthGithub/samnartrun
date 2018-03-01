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
    
    form_record.find('#divSDate, #divEDate').on('dp.hide',function(e){
        setFind();
    });

    form_record.find('#divSDate, #divEDate').dateTime().data("DateTimePicker").date(new Date());

    setFind();
    function setFind() {
        var _edate = new Date(form_record.find('#divEDate').data("DateTimePicker").date()).setHours(23, 59, 59,0);
        form_record.find('#divEDate').data("DateTimePicker").date(new Date(_edate));
        $.reqData({
            url: mvcPatch('Record/findRecord'),
            data: {vdata: JSON.stringify({
                    SDate: PHP_DateTimeShow_To_JSON(form_record.find('#divSDate')),
                    EDate: PHP_DateTimeShow_To_JSON(form_record.find('#divEDate'), true)
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
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'DocID', header: 'DocID'},
            {data: 'DocDate', header: 'DocDate'},
            {data: 'Product', header: 'Product'},
            {data: 'PriceTotal', header: 'PriceTotal'}
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
        },
        btnEditFun: function (f, d) {
        },
        btnDeleteFun: function (f, d) {
        },
        btnPreviewFun: function (f, d) {
        }
    });
});

