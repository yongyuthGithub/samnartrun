$(function () {
    var form_insurance = $('#form_insurance');

    form_insurance.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: true,
        headerString: '',
        UrlDataJson: mvcPatch('insurance/findInsurance'),
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
            {data: 'InsuranceName', header: 'บริษัท'}
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('insurance/edit'),
                title: 'เพิ่มบริษัทประกัน',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = Guid;
                            obj.InsuranceName = _f.find('#txtinsurance').val();
                            obj.TitleKey = _f.find('#cmdTitle').val();
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('insurance/editinsurance'),
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
                        label: '&nbsp;ok',
                        action: function (k) {

                        }
                    }
                ]
            });
        },
         btnEditFun: function (f, d) {
            $.bPopup({
                url: mvcPatch('insurance/edit'),
                title: 'แก้ไขชื่อบริษัทประกัน',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = d.key;
                            obj.InsuranceName = _f.find('#txtinsurance').val();                    
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('insurance/editinsurance'),
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
                        url: mvcPatch('insurance/removeinsurance'),
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

