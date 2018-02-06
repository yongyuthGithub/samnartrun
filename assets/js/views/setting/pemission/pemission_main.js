$(function () {
    var form_pemission = $('#form_pemission');

    form_pemission.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
//        UrlDataJson: mvcPatch('controllers/action'),
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
            {data: 'Group User', header: 'Group'},
            {data: 'CountFunction', header: 'Function'},
            {data: 'CountAccount', header: 'Account'},
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

