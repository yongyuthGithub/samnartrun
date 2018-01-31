﻿const Guid = '00000000-0000-0000-0000-000000000000';
const FormatCodeAsset = ':GG-:YY:MM-:SS-:RRR';

const regexpMail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
const regexpNumber = /^[0-9]+$/;
const regexpDecimal = /^\d+(?:\.\d{1,2})?$/;
const regexpPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,32}$/;

const empPictureType = ["jpg", "gif", "png"];
$("[data-header-left='true']").parent().addClass("pmd-navbar-left");

function mvcPatch(v) {
    return $('.mvcpath').val() + v;
}
function mvcWSLogin() {
    return $('.mvcwslogin').val();
}

function newGuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

function NewGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function userPopup() {
    var vindex = -1;
    for (var i = 0; i < PopupList.length; i++) {
        if ($('body').find('.' + PopupList[i]).length > 0) {
            vindex = i;
        }
    }
    if (vindex == -1) {
        return vindex = 0;
    } else {
        return vindex + 1;
    }
};

function addCommas(nStr, point) {
    nStr = parseFloat(nStr).toFixed(point);
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

var ImageStatus = {
    Old: 0,
    New: 1,
    Delete: 2
}

var ThumbnailImageOption = {
    Original: 0,
    AutoOptimize: 1,
    Size50x50: 2,
    Size200x150: 3,
    Size480x360: 4,
    Size800x600: 5,
    Size1024x768: 6
}

var DeliveryChargeType = {
    NoCharge: 0,
    PerItem: 1,
    PerMinOrder: 2,
    PerOrder: 3
}
function DeliveryChargeTypeStr(v) {
    if (parseInt(v) === DeliveryChargeType.NoCharge) {
        return 'No Charge';
    } else if (parseInt(v) === DeliveryChargeType.PerItem) {
        return 'Per Item';
    } else if (parseInt(v) === DeliveryChargeType.PerMinOrder) {
        return 'Per Min Order';
    } else {
        return 'Per Order';
    }
}

function htmlEscape(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function htmlUnescape(str) {
    return str
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}

function html_br(str) {
    try {
        return str.replace(new RegExp('\r?\n', 'g'), '<br />');
    } catch (v) {
        return '';
    }
}

var RowStatus = {
    Inactive: 0,
    Active: 1
};

function checkUndefined(val) {
    if (val === undefined) {
        return true;
    } else if (val === null) {
        return true;
    } else {
        return false;
    }
}

function CloneDataObjectToValue(val) {
    return JSON.parse(JSON.stringify(val));
}

//------------------------------------------------------------- เกี่ยวกับวันที่
function getDateNow() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return dd + '/' + mm + '/' + yyyy;
}

function getDateCustom(v) {
    var today = new Date(v);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return dd + '/' + mm + '/' + yyyy;
}

function getDateCustom2(v) {
    var today = v === undefined ? new Date() : v;
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return dd + '/' + mm + '/' + yyyy;
}

function getTimemCustom(v, s, t) {//---v(Date), s(H="ชั่วโมง", M="นาที", S="วินาที", F="HH:mm:ss"), t(1="1 หลัก", 2="2 หลัก")
    var today = new Date(v);
    var tHH = today.getHours();
    var tMM = today.getMinutes();
    var tSS = today.getSeconds();

    if (t === 2) {
        if (tHH < 10) {
            tHH = '0' + tHH;
        }
        if (tMM < 10) {
            tMM = '0' + tMM;
        }
        if (tSS < 10) {
            tSS = '0' + tSS;
        }
    }

    var vReturn = '';
    if (s === 'H') {
        vReturn = tHH;
    } else if (s === 'M') {
        vReturn = tMM;
    } else if (s === 'S') {
        vReturn = tSS;
    } else if (s === 'F') {
        vReturn = tHH + ':' + tMM + ':' + tSS;
    }
    return vReturn;
}

function getDateCustomWithTime(v) {
    var today = new Date(v);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var tHH = today.getHours();
    var tMM = today.getMinutes();
    var tSS = today.getSeconds();

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    if (tHH < 10) {
        tHH = '0' + tHH;
    }
    if (tMM < 10) {
        tMM = '0' + tMM;
    }
    if (tSS < 10) {
        tSS = '0' + tSS;
    }
    return dd + '/' + mm + '/' + yyyy + ' ' + tHH + ':' + tMM + ':' + tSS;
}

function getDateJson(v) {//---จาก v="วันที่รูปแบบ JSON" --> "dd/MM/yyyy"
    return getDateCustom(parseInt(v.substring(6)));
}

function getDateJsonWithTime(v) {//---จาก v="วันที่รูปแบบ JSON" --> "dd/MM/yyyy HH:mm:ss"
    return getDateCustomWithTime(parseInt(v.substring(6)));
}

function getTimeJson(v, s, t) {//---จาก v="วันที่รูปแบบ JSON", s="ค่าที่ส่งกลับ[H:ชั่วโมง, M:นาที, S:วินาที, F:เวลาเต็มรูปแบบ]", t="จำนวนหน่วยที่แสดง[1:1 หน่วย, 2:2 หน่วย]"
    return getTimemCustom(parseInt(v.substring(6)), s, t);
}

function setDateJson(v) {//---จาก v="dd/MM/yyyy" --> Date
    var vReturn = v.split('/');
    return new Date(parseInt(vReturn[2]), parseInt(vReturn[1]) - 1, parseInt(vReturn[0]));
}

function setDateJsonTime(v, t) {//---จาก v="dd/MM/yyyy", t="HH:mm:ss" --> DateTime
    var vdate = v.split('/');
    t = t === undefined ? '00:00:00' : t;
    var tdate = t.split(':');
    return new Date(parseInt(vdate[2]), parseInt(vdate[1]) - 1, parseInt(vdate[0]), parseInt(tdate[0]), parseInt(tdate[1]), parseInt(tdate[2]));
}

function jsonToDateTime(v) {//---จาก v="วันที่รูปแบบ JSON" --> DateTime
    return new Date(parseInt(v.substring(6)));
}

function jsonToJavaDate(v) {//---จาก JSON --> javascript datetime
    return new Date(parseInt(v.substring(6))).toJSON();
}
function ShowDateToJavaDate(v) {//---จาก ShowDate --> javascript datetime
    return setDateJson(v).toJSON();
}
//-------------------------------------------------------------
function checkNullAndReturn(v) {
    return v === null || v === 'null' || v === '' ? -1 : v;
}

function CloneDataToValue(v) {
    return JSON.parse(JSON.stringify(v));
}

function ConvertToBoolean(v) {
    return parseInt(v) === 1 ? true : false;
}

function ChkNumber(v) {
    var _v = parseFloat(v);
    if (isNaN(_v)) {
        return 0;
    } else {
        return _v;
    }
}

(function ($) {
    $.ToLinq = function (v) {
        return Enumerable.From(v);
    }

    $.myLoading = function (v) {
        if (v === undefined)
            v = 'show';

        $('#bodySYS').ShowLoading({ action: v });
    }

    $.fn.ShowLoading = function (option) {
        var setting = $.extend({
            action: 'show'
        }, option);

        return this.each(function () {
            var _this = $(this);
            _this.LoadingOverlay(setting.action, {
                //image: mvcPatch('images/DC.svg'),
                //maxSize: "100px",                      // Integer/String
                //minSize: "20px",
                //size: "10%",
                image: "",
                //custom: "<div class='Cube panelLoad'><div class='cube-face cube-face-front'>N</div><div class='cube-face cube-face-back'>2</div><div class='cube-face cube-face-left'>N</div><div class='cube-face cube-face-right'>N</div><div class='cube-face cube-face-bottom'>2</div><div class='cube-face cube-face-top'>N</div></div>",
                custom: '<div class="loader loader-5"></div>',
                color: 'rgba(44, 62, 80, 0.8)'
            });
        });
    }

    $.reqDataCheckUser = function (option) {
        var setting = $.extend({
            url: '',
            callback: function () { },
            data: {},
            //loanding: true,
            //loandingclose: true,
        }, option);

        //if (setting.loanding)
        //    $('#bodySystem').ShowLoading();

        $.ajax({
            url: setting.url,
            type: 'post',
            dataType: 'json',
            data: setting.data,
            success: function (data) {
                setting.callback(data);
                //if (setting.loandingclose)
                //    $('#bodySystem').ShowLoading({ action: "hide" });
            }
        });
    }

    $.reqData = function (option) {
        var setting = $.extend({
            url: '',
            callback: function () { },
            data: {},
            loanding: true,
            loandingclose: true,
        }, option);

        if (setting.loanding)
            $.myLoading();

        $.ajax({
            url: setting.url,
            type: 'post',
            dataType: 'json',
            data: setting.data,
            success: function (data) {
                setting.callback(data);
                if (setting.loandingclose)
                    $.myLoading('hide');
            }
        });
    }

    $.reqFile = function (option) {
        var setting = $.extend({
            url: '',
            callback: function () { },
            data: new FormData(),
            loanding: true,
            loandingclose: true,
        }, option);

        if (setting.loanding)
            $.myLoading();

        $.ajax({
            url: setting.url,
            type: 'post',
            dataType: 'json',
            data: setting.data,
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {
                setting.callback(data);
                if (setting.loandingclose)
                    $.myLoading('hide');
            }
        });
    }

    $.reqDownloadFile = function (option) {
        var setting = $.extend({
            url: '',
            callback: function () { },
            data: new FormData(),
            loanding: true,
            loandingclose: true,
        }, option);

        if (setting.loanding)
            $.myLoading();

        $.ajax({
            url: setting.url,
            type: 'post',
            data: setting.data,
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {
                setting.callback(data);
                if (setting.loandingclose)
                    $.myLoading('hide');
            }
        });
    }

    $.fn.NumericOnly = function (option) {
        var setting = $.extend({
            decimalpoint: 2,
            maxnumber: -1
        }, option);
        return this.each(function () {
            if ($(this).val() === '') $(this).val((0).toFixed(setting.decimalpoint));
            $(this).off('keypress').on({
                keypress: function (evt, element) {
                    var charCode = (evt.which) ? evt.which : event.keyCode
                    if (
                        (charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
                        (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
                        (charCode < 48 || charCode > 57))
                        return false;

                    return true;
                },
                focusout: function () {
                    try {
                        var _thisvalue = Number($(this).val());
                        if (isNaN(_thisvalue)) {
                            $(this).val((0).toFixed(setting.decimalpoint));
                        } else {
                            $(this).val(_thisvalue.toFixed(setting.decimalpoint));
                        }
                    } catch (ex) {
                        $(this).val((0).toFixed(setting.decimalpoint));
                    }
                    if (setting.maxnumber > -1) {
                        if (parseInt($(this).val()) > parseInt(setting.maxnumber)) {
                            $(this).val(setting.maxnumber);
                        } else if (parseInt($(this).val()) < 1) {
                            $(this).val(1);
                        }
                    }
                }
            })
        });
    };

    $.fn.CloneDataObject = function (option) {
        var setting = $.extend({
            dataKey: 'data',
            data: new Object()
        }, option);

        return this.each(function () {
            $(this).removeData(setting.dataKey).data(setting.dataKey, JSON.parse(JSON.stringify(setting.data)));
        });
    };

    $.fn.SetDataPost = function (option) {
        var setting = $.extend({
            data: new Object()
        }, option);

        return this.each(function () {
            var _this = $(this);
            $.each(Object.keys(setting.data), function (k, v) {
                _this.find('#' + v).remove();
                _this.append('<input type="hidden" name="' + v + '" id="' + v + '" value="' + Object.values(setting.data)[k] + '" />');
            });
        });
    };

    $.fn.TextEditCustom = function (option) {
        var setting = $.extend({

        }, option);

        return this.each(function () {
            $(this).Editor({
                'texteffects': true,
                'aligneffects': true,
                'textformats': true,
                'fonteffects': true,
                'actions': true,
                'insertoptions': true,
                'extraeffects': true,
                'advancedoptions': true,
                'screeneffects': true,
                'bold': true,
                'italics': true,
                'underline': true,
                'ol': false,
                'ul': false,
                'undo': false,
                'redo': false,
                'l_align': true,
                'r_align': true,
                'c_align': true,
                'justify': true,
                'insert_link': false,
                'unlink': false,
                'insert_img': false,
                'hr_line': false,
                'block_quote': false,
                'source': false,
                'strikeout': false,
                'indent': false,
                'outdent': false,
                //'fonts': fonts,
                'styles': false,
                'print': false,
                'rm_format': false,
                'status_bar': true,
                //'font_size': false,
                //'color': false,
                'splchars': false,
                'insert_table': false,
                'select_all': false,
                'togglescreen': false
            });
        });
    }

    $.getPermission = function (option) {
        var setting = $.extend({
            data: new Array(),
            callback: function () { }
        }, option);

        $.reqData({
            url: 'ajax/GetPermission.ashx',
            loanding: false,
            loandingclose: false,
            data: {
                tranKey: getEmp() === '' ? Guid : getEmp().RowKey,
                items: setting.data
            },
            callback: function (vdata) {
                setting.callback(vdata);
            }
        })
    }

    $.getNameStr = function (option) {
        var setting = $.extend({
            data: new Array(),
            callback: function () { }
        }, option);

        $.reqData({
            url: mvcPatch('home/getNameString'),
            data: { _name: JSON.stringify(setting.data) },
            loanding: false,
            loandingclose: false,
            callback: function (vdata) {
                setting.callback(vdata);
            }
        });
    }

}(jQuery));