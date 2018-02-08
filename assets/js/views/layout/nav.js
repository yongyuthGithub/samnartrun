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
});

