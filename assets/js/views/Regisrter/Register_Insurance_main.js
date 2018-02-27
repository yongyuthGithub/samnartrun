$(function () {
    var form_register_insurance = $('#form_register_insurance');
    
    form_register_insurance.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
        UrlDataJson: mvcPatch('Register/findregister_insurance'),
        UrlDataSend: {key: $('#txtkey').val()},
//    DataJson: function () {
//        return new Array()
//    },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'TypeName', header: 'ประเภทประกัน'},
            {data: 'InsuranceName', header: 'บริษัทประกัน'},
            {data: 'SDate', header: 'วันที่จัดทำ'},
            {data: 'EDate', header: 'วันหมดอายุ'},
            {data: 'Cash', header: 'จำนวนเงิน'}
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