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
        DataJson: function () {
            return new Array(
                    {
                        User: 'yongyuth@gmail.com',
                        Name: 'Yongyuth Janloy',
                        RowStatus: 1,
                    },
                    {
                        User: 'yongyuth@hotmail.com',
                        Name: 'Yongyuth Janloy',
                        RowStatus: 0,
                    }
            );
        },
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
                title: 'New Accouss',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
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
                        label: '&nbsp;ok',
                        action: function (k) {

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

