$(function () {
    var form_Car = $('#form_Car');

    form_brandcar.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
        UrlDataJson: mvcPatch('Car/findCar'),
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
             {data: 'CarNumber', header: 'ทะเบียนรถ'},
            {data: 'Province', header: 'จังหวัด'},
            {data: 'Brand', header: 'ยี่ห้อ'},
            {data: 'CarType', header: 'ประเภทรถ'},
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Car/edit'),
                title: 'เพิ่มข้อมูลรถ',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = Guid;
                            obj.BrandKey = _f.find('#cmdBrand').val();  
                            obj.CarNumber = _f.find('#txtCarNumber').val();  
                            obj.ProvinceKey = _f.find('#cmdProvince').val();  
                            obj.CarType = _f.find('#txtCarType').val();  
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Car/editCar'),
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
            $.bPopup({
                url: mvcPatch('Car/edit'),
                title: 'แก้ไขข้อมูลรถ',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = d.key;
                            obj.BrandKey = _f.find('#cmdBrand').val();  
                            obj.CarNumber = _f.find('#txtCarNumber').val();  
                            obj.ProvinceKey = _f.find('#cmdProvince').val();  
                            obj.CarType = _f.find('#txtCarType').val();                 
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Car/editCar'),
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
                        label: '&nbsp;Save',
                        action: function (k) {

                        }
                    }
                ]
            });
        },
        btnDeleteFun: function (f, d) {
            if (d.length === 0)
                return false;
            $.bConfirm({
                message: 'Do you want to delete the data?',
                type: BootstrapDialog.TYPE_DANGER,
                buttonOK: function (k) {
                    k.close();
                    var vdata = $.ToLinq(d)
                            .Select(function (x) {
                                return x.key;
                            }).ToArray();
                    $.reqData({
                        url: mvcPatch('Car/removeCar'),
                        data: {data: JSON.stringify(vdata)},
                        callback: function (vdata) {
                            if (vdata.success) {
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
        },

        
        btnPreviewFun: function (f, d) {

        }
    });
});