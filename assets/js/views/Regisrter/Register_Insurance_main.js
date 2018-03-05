$(function () {
    var form_register_insurance = $('#form_register_insurance');
    
    form_register_insurance.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
        UrlDataJson: mvcPatch('Register/findeditRegister'),
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
             $.bPopup({
                url: mvcPatch('Register/typeedit'),
                title: 'เพิ่มสาขาลูกค้า',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object({});
                            obj.RowKey = Guid;
                            
                            obj.EmpKey = $('#cmdProvince').val();
                            obj.InsuranceTypeKey = _f.find('#cmdDistrict').val();
                            obj.Cash = _f.find('#txtUser3').val();
                            obj.EDate = _f.find('#txtUser5').val();
                            obj.SDate = _f.find('#txtUser11').val();
                            

                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('Register/typeedit'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                f.find('.xref').click();
                                                k.close();
                                            } else {
                                                $.bAlert({
                                                    message: vdata.message
                                                });
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                },
                buttons: [
                    {
                        id: 'btn-ok',
                        icon: 'fa fa-check',
                        label: '&nbsp;Save',
                        action: function (k) {
                            //javascript code
                        }
                    }
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