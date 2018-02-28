$(function () {
    var form_CarType = $('#form_CarType');

    form_CarType.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
        UrlDataJson: mvcPatch('Car/CarType'),
        UrlDataSend: {key: $('#txtkey').val()},
//        DataJson: function () {
//            return new Array()
//        },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'TypeName', header: 'ชื่อประเภท'},
            {data: 'TypeUse', header: 'กลุ่มประกัน'},
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
            $.bPopup({
                url: mvcPatch('Car/typeedit'),
                title: 'เพิ่มประภทประกันของรถ',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: Guid,
                                InsuranceKey: $('#txtkey').val(),
                                TypeName: _f.find('#txtTypeName').val(),
                                TypeUse: _f.find('#cmdTypeUse').val()
                            });
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('Car/editicartype'),
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
            $.bPopup({
                url: mvcPatch('car/typeedit'),
                title: 'Edit Insurance Type',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: d.key,
                                InsuranceKey: $('#txtkey').val(),
                                TypeName: _f.find('#txtTypeName').val(),
                                TypeUse: _f.find('#cmdTypeUse').val()
                            });
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('car/editcartype'),
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
        btnDeleteFun: function (f, d) {
            if (d.length === 0)
                return false;
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
                        url: mvcPatch('car/removecartype'),
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
            form_sumbit.SetDataPost({
                data: {
                    txtkey: d.key,
                    txtdisplay:d.InsuranceName
                }
            }).prop('action', mvcPatch('car/typeindex')).submit()
        }
    });
});

