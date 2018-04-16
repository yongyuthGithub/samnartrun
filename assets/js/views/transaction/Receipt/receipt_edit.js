$(function () {
    var form_receiptedit = $('#form_receiptedit');
    var form_billlist = form_receiptedit.find('#form_billlist');
    var form_otherlist = form_receiptedit.find('#form_otherlist');

    if ($('#txtkey').val() !== Guid) {

    } else {
        setDataCust(Guid, function () {});
    }

    form_receiptedit.find('#cmdCust').selectpicker({
    }).on({
        change: function () {
//            form_billlist.data('data', vdata);
//                    form_receiptedit.find('#cmdVatStatus').change();
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
    
    form_receiptedit.find('#divDate').datetimepicker({
        format: 'DD/MM/YYYY',
        locale: 'th',
        defaultDate: new Date()
    }).on('dp.change', function (ds) {
//        form_receiptedit.formValidation('revalidateField', form_billnew.find('#txtDocDate'));
//        form_billnew.find('#divDueDate').data("DateTimePicker").minDate(ds.date);
        setDueData();
    });

    form_billlist.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: false,
        btnPreview: false,
        headerString: '',
//        UrlDataJson: mvcPatch('controllers/action'),
        DataJson: function () {
            return new Array()
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumnsOrder: [],
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'DocID', header: 'เลขที่บิล', orderable: false},
            {data: 'DocDate', header: 'วันที่บิล', orderable: false},
            {data: 'Amounts', header: 'จำนวนเงิน', orderable: false},
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

    form_otherlist.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: false,
        btnPreview: false,
        headerString: '',
//        UrlDataJson: mvcPatch('controllers/action'),
        DataJson: function () {
            return new Array()
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumnsOrder: [],
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'Seq', header: '#', orderable: false},
            {data: 'Detail', header: 'รายละเอียด', orderable: false},
            {data: 'Amounts', header: 'จำนวนเงิน', orderable: false},
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