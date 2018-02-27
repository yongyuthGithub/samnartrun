$(function () {
    var form_Register = $('#form_Register');
    var form_sumbit = $('#form_sumbit');

    form_Register.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreviewText: 'ประกัน',
        btnPreview: true,
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

                            var _imagedata = $.ToLinq(_f.find('.tab-image'))
                                    .Select(function (x) {
                                        return new Object({
                                            EmpKey: Guid,
                                            FileType: $(x).attr('data-type'),
                                            RecordStatus: parseInt($(x).attr('data-type')) === 2 ? false : true,
                                            EDate: parseInt($(x).attr('data-type')) === 2 ? null : ($(x).find('.txtDate').val() === '') ? null : PHP_DateTimeShow_To_JSON($(x).find('.date')),
                                            ImageBase64: checkUndefined($(x).find('.imageShow').attr('src')) ? '' : $(x).find('.imageShow').attr('src')
                                        });
                                    })
                                    .Where(x => $.trim(x.ImageBase64).length > 0)
                                    .ToArray();
                            if ($.ToLinq(_imagedata).Where(x => (parseInt(x.FileType) !== 2) && checkNull(x.EDate)).ToArray().length > 0) {
                                $.bAlert({
                                    message: 'กรุณาระบุวันที่หมดอายุในส่วนของ "บัตรประชาชน" และ "ใบขับขี" ก่อน'
                                });
                            } else {
                                $.bConfirm({
                                    buttonOK: function (k) {
                                        k.close();
                                        $.reqData({
                                            url: mvcPatch('Register/editRegister'),
                                            data: {data: JSON.stringify(obj)},
                                            loanding: false,
                                            callback: function (vdata) {
                                                if (vdata.success) {
                                                    var _indexC = 1;
                                                    function upImage() {
                                                        if (_indexC <= _imagedata.length) {
                                                            _imagedata[(_indexC - 1)].EmpKey = vdata.key;
                                                            $.reqData({
                                                                url: mvcPatch('Register/addImage'),
                                                                data: {data: JSON.stringify(_imagedata[(_indexC - 1)])},
                                                                loanding: false,
                                                                callback: function (vdata) {
                                                                    if (vdata.success) {
                                                                        _indexC++;
                                                                        upImage();
                                                                    } else {
                                                                        $.bAlert({
                                                                            message: vdata.message
                                                                        });
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            _f.find('#btn-close').click();
                                                            f.find('.xref').click();
                                                        }
                                                    }

                                                    if (_imagedata.length > 0) {
                                                        upImage();
                                                    } else {
                                                        _f.find('#btn-close').click();
                                                        f.find('.xref').click();
                                                    }

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

                            var _imagedata = $.ToLinq(_f.find('.tab-image'))
                                    .Select(function (x) {
                                        return new Object({
                                            EmpKey: d.key,
                                            FileType: $(x).attr('data-type'),
                                            RecordStatus: parseInt($(x).attr('data-type')) === 2 ? false : true,
                                            EDate: parseInt($(x).attr('data-type')) === 2 ? null : ($(x).find('.txtDate').val() === '') ? null : PHP_DateTimeShow_To_JSON($(x).find('.date')),
                                            ImageBase64: checkUndefined($(x).find('.imageShow').attr('src')) ? '' : $(x).find('.imageShow').attr('src')
                                        });
                                    })
                                    .Where(x => $.trim(x.ImageBase64).length > 0)
                                    .ToArray();
                            if ($.ToLinq(_imagedata).Where(x => (parseInt(x.FileType) !== 2) && checkNull(x.EDate)).ToArray().length > 0) {
                                $.bAlert({
                                    message: 'กรุณาระบุวันที่หมดอายุในส่วนของ "บัตรประชาชน" และ "ใบขับขี" ก่อน'
                                });
                            } else {
                                $.bConfirm({
                                    buttonOK: function (k) {
                                        k.close();

                                        $.reqData({
                                            url: mvcPatch('Register/editRegister'),
                                            data: {data: JSON.stringify(obj)},
                                            loanding: false,
                                            callback: function (vdata) {
                                                if (vdata.success) {
                                                    var _indexC = 1;
                                                    function upImage() {
                                                        if (_indexC <= _imagedata.length) {
                                                            $.reqData({
                                                                url: mvcPatch('Register/addImage'),
                                                                data: {data: JSON.stringify(_imagedata[(_indexC - 1)])},
                                                                loanding: false,
                                                                callback: function (vdata) {
                                                                    if (vdata.success) {
                                                                        _indexC++;
                                                                        upImage();
                                                                    } else {
                                                                        $.bAlert({
                                                                            message: vdata.message
                                                                        });
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            _f.find('#btn-close').click();
                                                            f.find('.xref').click();
                                                        }
                                                    }

                                                    if (_imagedata.length > 0) {
                                                        upImage();
                                                    } else {
                                                        _f.find('#btn-close').click();
                                                        f.find('.xref').click();
                                                    }


//                                                alert(JSON.stringify(_imagedata));
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
            form_sumbit.SetDataPost({
                data: {
                    txtkey: d.key,
                    txtdisplay: d.Title + d.FName + ' ' + d.LName
                }
            }).prop('action', mvcPatch('Register/branchMain')).submit();
        }
    });
});

