$(function () {
    var form_billnew = $('#form_billnew');
    var form_bilelist = $('#form_bilelist');

    form_billnew.find('#cmdCust').selectpicker({
    }).on({
        change: function () {
            var _key = $(this).val();
            $.reqData({
                url: mvcPatch('Bill/findRecordNotIsBill'),
                data: {key: _key},
                loanding: false,
                callback: function (vdata) {
                    form_bilelist.data('data', vdata).find('.xref').click();
                }
            });
        }
    });

    setDataCust(Guid);
    function setDataCust(v) {
        $.reqData({
            url: mvcPatch('Bill/findCustomerIsRecord'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_billnew.find('#cmdCust').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-address-book" value="' + v.RowKey + '" data-display="' + v.Customer + '">&nbsp;&nbsp;(' + v.CusCode + ') ' + v.Customer + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }

    function sumTotal() {
        var _pricetotal = $.ToLinq(form_bilelist.data('data'))
                .Select(function (x) {
                    return x.PriceTotal - x.Discount;
                }).Sum();
        form_billnew.find('#txtPriceTotal').val(addCommas(_pricetotal, 2));
    }
    form_bilelist.data('data', new Array()).setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: false,
        btnPreview: false,
        headerString: '',
//        UrlDataJson: mvcPatch('controllers/action'),
        DataJson: function () {
            return form_bilelist.data('data');
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
        AfterLoadData: function (f, d, t) {
            sumTotal();
        },
        DataColumns: [
            {data: 'DocID', header: 'เลขที่ใบงาน'},
            {data: 'DocDate', header: 'วันที่ใบงาน'},
            {data: 'Product', header: 'สินค้า'},
            {data: 'PriceTotal', header: 'ค่าบริการ'},
            {data: 'Discount', header: 'ส่วนลด'},
            {data: 'NetPrice', header: 'เงินรวม'}
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return PHP_JSON_To_ShowDate(val2.DocDate);
                },
                orderable: true,
                targets: 1
            },
            {
                render: function (row, type, val2, meta) {
                    return addCommas(val2.PriceTotal, 2)
                },
                orderable: true,
                targets: 3
            },
            {
                render: function (row, type, val2, meta) {
                    return '<input type="text" class="form-control text-right txtDis" id="t' + val2.key + '" name="t' + val2.key + '" placeholder="ส่วนลด" value="' + val2.Discount + '">';
                },
                orderable: true,
                targets: 4
            },
            {
                render: function (row, type, val2, meta) {
                    return addCommas(val2.NetPrice, 2)
                },
                orderable: true,
                targets: 5
            }
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Bill/newRecord'),
                title: 'เลือกใบงานเพิ่ม',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        key: form_billnew.find('#cmdCust').val(),
                        data: $.ToLinq(f.data('data')).Select(function (x) {
                            return x.key
                        }).ToArray(),
                        fun: function (_f) {
                            $.reqData({
                                url: mvcPatch('Bill/findRecordByKey'),
                                data: {data: JSON.stringify(_f.find('#cmdNewRecord').val())},
                                loanding: false,
                                callback: function (vdata) {
                                    $.each(vdata, function (k2, v2) {
                                        f.data('data').push(v2);
                                    });
                                    f.find('.xref').click();
                                    _f.find('#btn-close').click();
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
                            //javascript code
                        }
                    }
                ]
            });
        },
        btnEditFun: function (f, d) {
        },
        btnDeleteFun: function (f, d) {
            var _d = $.ToLinq(d)
                    .Select(function (x) {
                        return x.key;
                    });
            var _u = $.ToLinq(f.data('data'))
                    .Where(x => !_d.Contains(x.key))
                    .ToArray();
            f.data('data', _u);
            f.find('.xref').click();
        },
        btnPreviewFun: function (f, d) {
        }
    });
});
