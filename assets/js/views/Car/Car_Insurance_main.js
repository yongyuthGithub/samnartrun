$(function () {
    var form_carinsurance = $('#form_carinsurance');

    form_carinsurance.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
        UrlDataJson: mvcPatch('Car/findinsurancecar'),
        UrlDataSend: {key: $('#txtkey').val()},
//        DataJson: function () {
//            return new Array()
//        },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'Carkey', header: 'เลขทะเบียนรถ'},
            {data: 'InsuranceTypeKey', header: 'ชนิดของประกัน'},
            {data: 'SDate', header: 'วันเริ่มประกัน'},
            {data: 'EDate', header: 'วันหมดอายุประกัน'},
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
                url: mvcPatch('Car/editinsurancecar'),
                title: 'Add Insurance Type',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: Guid,
                                Carkey: $('#txtkey').val(),
                                InsuranceTypeKey: _f.find('#Insurancecar').val(),
                                SDate: _f.find('#SDate').val(),
                                EDate: _f.find('#EDate').val(),
                                Cash: _f.find('#Cash').val()
                            });
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('car/editinsurancecar'),
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
                url: mvcPatch('car/editinsurancecar'),
                title: 'Edit Insurance Type',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: d.key,
                                Carkey: $('#txtkey').val(),
                                InsuranceTypeKey: _f.find('#Insurancecar').val(),
                                SDate: _f.find('#SDate').val(),
                                EDate: _f.find('#EDate').val(),
                                Cash: _f.find('#Cash').val()
                            });
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('car/editinsurancecar'),
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
                        url: mvcPatch('car/removeinsurancecar'),
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
        }
    });
});

