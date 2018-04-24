$(function () {
    var form_Carmtn = $('#form_Carmtn');

//---------------------------------------CarEmp---------------------------------------------------
form_Carmtn.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnEditText: 'แก้ไข',
        btnNewText: 'เพิ่ม',
        btnDeleteText: 'ลบ',
        btnPreview: false,
        headerString: '',
        UrlDataJson: mvcPatch('CarMaintenance/findcarmtn'),
        UrlDataSend: {key: $('#txtkey').val()},
//        DataJson: function () {
//            return new Array()
//        },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'CarNumber', header: 'ทะเบียนรถ'},
            {data: 'BeginDate', header: 'วันที่ลงรายละเอียด'},
            {data: 'Detail', header: 'รายละเอียด'},
            {data: 'CostVaule', header: 'ยอดเงิน'},
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    var _val = PHP_JSON_To_ShowDate(val2.BeginDate);
                    return _val;
                },
                orderable: true,
                targets: 1
            },
             {
                render: function (row, type, val2, meta) {
                    var _val = val2.Title + ' ' + val2.FName +' '+ val2.LName;
                    return _val;
                },
                orderable: true,
                targets: 2
            },
            
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('CarMaintenance/editcarmtn'),
                title: 'เพิ่มรายละเอียดค่าใช้จ่ายรถ',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: Guid,
                                CarKey: $('#txtcmdCarnumber').val(),
                                Detail: $('#txtDetail').val(),
                                ListDate: PHP_DateTimeShow_To_JSON(_f.find('#txtSDate')),
                                CostVaule: _f.find('#txtCash').val()
                            });
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('CarMaintenance/editcarmtn'),
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
                url: mvcPatch('CarMaintenance/editcarmtn'),
                title: 'แก้ไขรายละเอียดค่าใช้จ่ายรถ',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: d.key,
                                CarKey: $('#txtcmdCarnumber').val(),
                                Detail: $('#txtDetail').val(),
                                ListDate: PHP_DateTimeShow_To_JSON(_f.find('#txtSDate')),
                                CostVaule: _f.find('#txtCash').val()
                            });
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('CarMaintenance/editcarmtn'),
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
                        url: mvcPatch('CarMaintenance/removecaremp'),
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

