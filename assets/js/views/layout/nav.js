$(function () {
    var form_sumbit = $('#form_sumbit');

    if ($('#loginUrl').length === 0) {
        $.reqData({
            url: mvcPatch('home/chkLoginCookie'),
            loanding: false,
            callback: function (vdata) {
                if (vdata.success) {
                    //javascript code
                } else {
                    form_sumbit.prop('action', mvcPatch('home/index')).submit();
                }
            }
        });
    }

    $('#btn-logout').off().on({
        click: function () {
            $.cookie('samnartrun_login', '', {path: '/', expires: -1});
            $.cookie('samnartrun_token', '', {path: '/', expires: -1});
            form_sumbit.prop('action', mvcPatch('home/index')).submit();
        }
    });
});

