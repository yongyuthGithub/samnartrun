$(function () {
    var form_fuletype = $('#form_fuletype');

    form_fuletype.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
        UrlDataJson: mvcPatch('FuleType/findPump'),
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
            {data: 'Fuel', header: 'เชื้อเพลิง'},
            {data: 'FuelType', header: 'ประเภทเชื้อเพลิง'},
//            {data: 'Menu', header: 'Menu'},
//            {data: 'Icon', header: 'Icon'},
//            {data: 'Url', header: 'Url'}
        ],
        DataColumnsDefs: [{
                render: function (row, type, val2, meta) {
                    var _val = val2.FuelType === 1 ? 'น้ำมัน' : 'แก๊ซ';
                    return _val;
                },
                orderable: true,
                targets: 1
            }],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('FuleType/edit'),
                title: 'New PumpType',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = Guid;
                            obj.Fuel = _f.find('#txtUser').val();
                            obj.FuelType = _f.find('#cmdTitle').val();

                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('FuleType/editPump'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                _f.find('#btn-close').click();
                                                f.find('.xref').click();
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
                        label: '&nbsp;ตกลง',
                        action: function (k) {

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

