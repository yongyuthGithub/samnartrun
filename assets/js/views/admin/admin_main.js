$(function () {
    var form_adminlist = $('#form_adminlist');

    form_adminlist.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
//        UrlDataJson: mvcPatch('Sales/FindProduct'),
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
            {data: 'User', header: 'User'},
            {data: 'Name', header: 'Name'},
            {data: 'RowStatus', header: 'Active'}
        ],
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

