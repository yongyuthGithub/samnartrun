$(function () {
    var form_recordfuleedit = $('#form_recordfuleedit');
    var form_recordfuleedit_C = $.modelDialog(form_recordfuleedit);

    var _formdata = form_recordfuleedit_C.data('data');
    if (_formdata.key === Guid) {
        setFule(function (f) {
            if (f.find('option').length === 0)
                f.val(Guid).selectpicker('render');
            setFuleBranch(function (fb) {
                if (fb.find('option').length === 0)
                    fb.val(Guid).selectpicker('render');
                setFuleType(function (ft) {
                    if (ft.find('option').length === 0)
                        ft.val(Guid).selectpicker('render');
                });
            });
        });
    } else {

    }

    form_recordfuleedit.find('#cmdFule').selectpicker({
    }).on({
        change: function () {
            setFuleBranch(function (fb) {
                if (fb.find('option').length === 0)
                    fb.val(Guid).selectpicker('render');
                setFuleType(function (ft) {
                    if (ft.find('option').length === 0)
                        ft.val(Guid).selectpicker('render');
                });
            });
        }
    });

    function setFule(fun) {
        $.reqData({
            url: mvcPatch('Record/findFule'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordfuleedit.find('#cmdFule').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-product-hunt" value="' + v.RowKey + '" data-display="' + v.Pump + '">&nbsp;&nbsp;' + v.Pump + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                fun(_sel);
            }
        });
    }

    form_recordfuleedit.find('#cmdFuleBranch').selectpicker({
    }).on({
        change: function () {
            setFuleType(function (ft) {
                if (ft.find('option').length === 0)
                    ft.val(Guid).selectpicker('render');
            });
        }
    });

    function setFuleBranch(fun) {
        $.reqData({
            url: mvcPatch('Record/findFuleBranch'),
            data: {key: form_recordfuleedit.find('#cmdFule').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordfuleedit.find('#cmdFuleBranch').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-paypal" value="' + v.RowKey + '" data-display="' + v.PumpBranch + '">&nbsp;&nbsp;' + v.PumpBranch + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                fun(_sel);
            }
        });
    }

    form_recordfuleedit.find('#cmdFuleType').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });

    function setFuleType(fun) {
        $.reqData({
            url: mvcPatch('Record/findFuleType'),
            data: {key: form_recordfuleedit.find('#cmdFuleBranch').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordfuleedit.find('#cmdFuleType').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-fire" value="' + v.RowKey + '" data-display="' + v.Fuel + '">&nbsp;&nbsp;' + v.Fuel + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                fun(_sel);
            }
        });
    }
});

