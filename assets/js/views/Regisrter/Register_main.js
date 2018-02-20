$(function () {
    var form_Register = $('#form_Register');
    var form_sumbit = $('#form_sumbit');

    form_Register.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
        UrlDataJson: mvcPatch('Register/findRegister'),
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [

            {data: 'IDCard', header: 'รหัสบัตรประชาชน'},
            {data: 'FName', header: 'ชื่อ-นามสกุล'},
            {data: 'SDate', header: 'วันที่เริ่มงาน'},
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    var _val = val2.Title + val2.FName + ' ' + val2.LName;
                    return _val;
                },
                orderable: true,
                targets: 1
            },
            {
                render: function (row, type, val2, meta) {
                    var _val = PHP_JSON_To_ShowDate(val2.SDate);
                    return _val;
                },
                orderable: true,
                targets: 2
            }
        ],
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
                            obj.IDCard = _f.find('#txtUser1').val();
                            obj.TitleKey = _f.find('#cmdTitle').val();
                            obj.FName = _f.find('#txtUser2').val();
                            obj.LName = _f.find('#txtUser6').val();
                            obj.Address = _f.find('#txtUser3').val();
                            obj.SubDistrict = _f.find('#cmdSubDistrict').val();
                            obj.ZipCode = _f.find('#txtZipCode').val();
                            obj.Tel = _f.find('#txtUser7').val();
                            obj.SDate = PHP_DateTimeShow_To_JSON(_f.find('#txtSDate'));

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
                url: mvcPatch('Register/edit'),
                title: 'แก้ไขพนักงานขับรถ',
                closable: false,
                size: BootstrapDialog.SIZE_WIDE,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {


                            var obj = new Object();
                            obj.RowKey = d.key;
                            obj.IDCard = _f.find('#txtUser1').val();
                            obj.TitleKey = _f.find('#cmdTitle').val();
                            obj.FName = _f.find('#txtUser2').val();
                            obj.LName = _f.find('#txtUser6').val();
                            obj.Address = _f.find('#txtUser3').val();
                            obj.SubDistrict = _f.find('#cmdSubDistrict').val();
                            obj.ZipCode = _f.find('#txtZipCode').val();
                            obj.Tel = _f.find('#txtUser7').val();
                            obj.SDate = PHP_DateTimeShow_To_JSON(_f.find('#txtSDate'));

                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Register/editRegister'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                var _imagedata = $.ToLinq(_f.find('.tab-image'))
                                                        .Select(function (x) {
                                                            return new Object({
                                                                EmpKey: vdata.key,
                                                                FileType: $(x).attr('data-type'),
                                                                RecordStatus:parseInt($(x).attr('data-type')) === 2 ? false : true,
                                                                EDate:parseInt($(x).attr('data-type')) === 2 ? null : PHP_DateTimeShow_To_JSON($(x).find('.date')),
                                                                ImageBase64:$(x).find('.myimage').attr('src')
                                                            });
                                                        }).ToArray();
                                                alert(JSON.stringify(_imagedata));
                                                
//                                                _f.find('#btn-close').click();
//                                                f.find('.xref').click();
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
                        url: mvcPatch('Register/removeAccount'),
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
            }).prop('action', mvcPatch('Register/branchMain')).submit();
        }
    });
});

