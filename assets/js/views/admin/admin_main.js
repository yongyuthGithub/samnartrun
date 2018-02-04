$(function () {
    var form_adminlist = $('#form_adminlist');

    form_adminlist.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: true,
        headerString: '',
//        UrlDataJson: mvcPatch('Sales/FindProduct'),
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

