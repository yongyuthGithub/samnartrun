$(function () {
    var form_fule = $('#form_Register');
    var form_sumbit = $('#form_sumbit');

    form_fule.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: true,
        headerString: '',
        UrlDataJson: mvcPatch('Register/findRegister'),
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
            {data: 'key', header: 'key'},
            {data: 'IDCard', header: 'Customer'},
           
        ],
//        DataColumnsDefs: [{
//                render: function (row, type, val2, meta) {
//                    var _val = val2.PumpType === 1 ? 'ปั้มใน' : 'ปั้นนอก';
//                    return _val;
//                },
//                orderable: true,
//                targets: 1
//            }],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Register/edit'),
                title: 'New Register',
                closable: false,
                size: BootstrapDialog.SIZE_WIDE,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = Guid;
                            obj.IDCard = _f.find('#txtUser').val();
                            
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Register/editRegister'),
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
            $.bPopup({
                url: mvcPatch('Customer/edit'),
                title: 'Edit Customer',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = d.key;
                            obj.Customer = _f.find('#txtUser').val();
                             
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Customer/editCustomer'),
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
                        label: '&nbsp;Save',
                        action: function (k) {

                        }
                    }
                ]
            });
        },

        btnDeleteFun: function (f, d) {
            $.bConfirm({
                message: 'Do you want to delete the data?',
                type: BootstrapDialog.TYPE_DANGER,
                buttonOK: function (k) {
                    k.close();
                    var vdata = $.ToLinq(d)
                            .Select(function (x) {
                                return x.key;
                            }).ToArray();
                    $.reqData({
                        url: mvcPatch('Customer/removeAccount'),
                        data: {data: JSON.stringify(vdata)},
                        callback: function (vdata) {
                            if (vdata.success) {
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
        },

        btnPreviewFun: function (f, d) {
            alert(JSON.stringify(d));
            form_sumbit.SetDataPost({
                data: {textId: d.key}
            }).prop('action', mvcPatch('Customer/branchMain')).submit();
        }
    });
});

