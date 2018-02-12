$(function () {
    var form_record = $('#form_record');
    var form_record_C = $.modelDialog(form_record);

    form_record.find('#btn-addimage').on({
        click: function () {
            form_record.find('#xfile').remove();
            form_record.append('<input type="file" id="xfile" name="xfile" style="display: none;" />').find('#xfile').click();
        }
    });

    form_record.on('change', '#xfile', function (ev) {
        var _type = 'i' + newGuid();
        var _html = '<img class="img-responsive imgShow" id="' + _type + '">';
        var _tool = form_record.find('#showimage').append(_html).find('#' + _type);
        var reader = new FileReader();
        reader.onload = function () {
            var dataURL = reader.result;
            _tool.prop("src", dataURL);
        };
        var _this = ev.target.files;
        reader.readAsDataURL(_this[0]);
        _tool.data('data', _this[0]);
    });

    form_record.find('#btn-upload').on({
        click: function () {
            $.each(form_record.find('#showimage > img'), function (k, v) {
                var _fdata = new FormData();
                _fdata.append('f', $(v).data('data'));
                $.reqFile({
                    url: mvcPatch('record/file_upload'),
                    data: _fdata,
                    callback: function (vdata) {

                    }
                });
            });
        }
    })
});

