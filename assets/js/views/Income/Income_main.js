$(function () {
    var form_Income = $('#form_Income');

    form_Income.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
        UrlDataJson: mvcPatch('Income/findIncome'),
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
            {data: 'DocDate', header: 'วันที่'},
            {data: 'Detial', header: 'รายละเอียด'},
            {data: 'IncomeType', header: 'ประเภท'},
            {data: 'Amount', header: 'จำนวนเงิน'},
//           {data: 'Url', header: 'Url'}
        ],
       
         DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    var _val = PHP_JSON_To_ShowDate(val2.DocDate);
                    return _val;
                },
                orderable: true,
                targets: 0
            },
            {
                render: function (row, type, val2, meta) {
                    var _val = val2.IncomeType === 1 ? 'รายรับ' : 'รายจ่าย';
                    return _val;
                },
                orderable: true,
                targets: 2
            }
            
            
        ],
        
        

        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Income/edit'),
                title: 'เพิ่มประภทเชื้อเพลิง',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = Guid;
                            obj.DocDate = PHP_DateTimeShow_To_JSON(_f.find('#txtSDate'));
                            obj.Detial = _f.find('#txtUser2').val();
                            obj.IncomeType = _f.find('#cmdTitle').val();
                            obj.Amount = _f.find('#txtUser3').val();
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Income/editIncome'),
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
                url: mvcPatch('FuleType/edit'),
                title: 'แก้ไขประเภทเชื้อเพลิง',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = d.key;
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
                        label: '&nbsp;Save',
                        action: function (k) {

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
                        url: mvcPatch('Income/removeAccount'),
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

