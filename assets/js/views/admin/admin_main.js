$(function () {
    var form_adminlist = $('#form_adminlist');

    form_adminlist.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: true,
        headerString: '',
        UrlDataJson: mvcPatch('admin/findAccount'),
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
            {data: 'User', header: 'User'},
            {data: 'Name', header: 'Name'},
            {data: 'RowStatus', header: 'Active'}
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('admin/edit'),
                title: 'New Account',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL ,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = Guid;
                            obj.User = _f.find('#txtUser').val();
                            obj.Password = _f.find('#txtPassword').val();
                            obj.TitleKey = _f.find('#cmdTitle').val();
                            obj.FName = _f.find('#txtFirstName').val();
                            obj.LName = _f.find('#txtLastName').val();
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('admin/editAccouss'),
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
            alert(d.Name);
        },
        btnDeleteFun: function (f, d) {
        },
        btnPreviewFun: function (f, d) {

        }
    });
});

