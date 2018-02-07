$(function () {
    var form_pemission = $('#form_pemission');

    form_pemission.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
        UrlDataJson: mvcPatch('pemission/findPemission'),
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
            {data: 'UserGroup', header: 'Group'},
            {data: 'Description', header: 'Description'},
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
            $.bPopup({
                url: mvcPatch('pemission/editPemission'),
                title: 'Add Group Pemission',
                closable: false,
                size: BootstrapDialog.SIZE_WIDE,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var _obj = new Object();
                            _obj.RowKey = Guid;
                            _obj.UserGroup = _f.find('#txtDetail').val();
                            _obj.Description = _f.find('#txtDescription').val();
                            _obj.USRGroupAccount = $.ToLinq(_f.find('#form_Account').data('data'))
                                    .Select(function (x) {
                                        return new Object({
                                            AccountKey: x.key
                                        });
                                    }).ToArray();
                            _obj.USRGroupSubMenu = $.ToLinq(_f.find('#form_Function').data('data'))
                                    .Select(function (x) {
                                        return new Object({
                                            SubMenuKey: x.key
                                        });
                                    }).ToArray();

                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('pemission/updatePemission'),
                                        data: {data: JSON.stringify(_obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                f.find('.xref').click();
                                                _f.find('#btn-close').click();
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

