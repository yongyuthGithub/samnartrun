$(function () {
    var form_insurancetype = $('#form_insurancetype');

    form_insurancetype.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
        UrlDataJson: mvcPatch('insurance/findinsurancetype'),
        UrlDataSend: {key: $('#txtkey').val()},
//        DataJson: function () {
//            return new Array()
//        },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'TypeName', header: 'Insurance Type'},
            {data: 'TypeUse', header: 'Type Group'},
//            {data: 'Menu', header: 'Menu'},
//            {data: 'Icon', header: 'Icon'},
//            {data: 'Url', header: 'Url'}
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return parseInt(val2.TypeUse) === 1 ? 'บุคคล' : 'ยานพาหนะ';
                },
                orderable: true,
                targets: 1
            }
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

