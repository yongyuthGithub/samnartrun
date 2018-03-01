$(function () {
    var form_recordedit = $('#form_recordedit');
    var form_recordedit_C = $.modelDialog(form_recordedit);
    var form_income = $('#form_income');
    var form_fule = $('#form_fule');

//    var _formdata = form_recordedit_C.data('data');
//    if (_formdata.key !== Guid) {
//        
//    } else {
//        
//    } 
    form_recordedit.find('#divDate').dateTime();
    form_recordedit.find('#cmdCarF').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });
    form_recordedit.find('#cmdCarS').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });
    form_recordedit.find('#cmdCustomerF').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });
    form_recordedit.find('#cmdBranchF').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });

    form_recordedit.find('#cmdCustomerS').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });
    form_recordedit.find('#cmdBranchS').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });

    form_income.setMainPage({
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
            {data: 'SubMenu', header: 'รายละเอียด', orderable: false},
            {data: 'Description', header: 'จำนวนเงิน', orderable: false},
//            {data: 'Menu', header: 'Menu'},
//            {data: 'Icon', header: 'Icon'},
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
        },
        btnEditFun: function (f, d) {
        },
        btnDeleteFun: function (f, d) {
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
        },
        btnEditFun: function (f, d) {
        },
        btnDeleteFun: function (f, d) {
        },
        btnPreviewFun: function (f, d) {
        }
    });
});

