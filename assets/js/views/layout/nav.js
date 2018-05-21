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

    $('#btn-profile').off().on({
        click: function () {
            $.bPopup({
                url: mvcPatch('home/profile'),
                title: 'Login Profile',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                }
            });
        }
    });

    function genHtml() {
        var _tooltipDisplay = '<ul class="list-group use-alert">';
        _tooltipDisplay += '<li class="list-group-item"><i class="fa fa-credit-card" style="min-width:20px;"></i>บัตรประชาชนของนายกกกก กกกกก จะหมดอายุในวันที่ 02/10/2018</li>';
        _tooltipDisplay += '<li class="list-group-item"><i class="fa fa-medkit" style="min-width:20px;"></i>ประกันชีวิตของนายกกกก กกกกก จะหมดอายุในวันที่ 02/10/2018</li>';
        _tooltipDisplay += '<li class="list-group-item"><i class="fa fa-truck" style="min-width:20px;"></i>ประกันของรถขนส่งทะเบียน ก1-111 จะหมดอายุในวันที่ 02/10/2018</li>';
        _tooltipDisplay += '<li class="list-group-item"><i class="fa fa-file-text-o" style="min-width:20px;"></i>พ.ร.บ. ของรถขนส่งทะเบียน ก1-111 จะหมดอายุในวันที่ 02/10/2018</li>';
        _tooltipDisplay += '<li class="list-group-item"><i class="fa fa-credit-card" style="min-width:20px;"></i>ใบขับขี่ของนายกกกก กกกกก จะหมดอายุในวันที่ 02/10/2018</li>';
        _tooltipDisplay += '</ul>';
        return _tooltipDisplay;
    }

    $('#btn-alert').tooltip({
//       selector: "[rel=tooltip]",
        placement: "top",
        html: true,
        container: '#btn-alert'
//        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
//       title:_tooltipDisplay
    }).attr('data-original-title', genHtml());
});

