$(function () {
    var form_showBill = $('#form_showBill');
    var form_showBill_C = $.modelDialog(form_showBill);
//    var str = Stimulsoft.System.IO.File.getFile(mvcPatch('Bill/loadBillReport'));
//    var str = Stimulsoft.System.IO.File.getFile(mvcPatch('reports/Report.mrt'));
    var options = new Stimulsoft.Viewer.StiViewerOptions();
    options.toolbar.zoom = Stimulsoft.Viewer.StiZoomMode.PageWidth;
    options.toolbar.viewMode = Stimulsoft.Viewer.StiWebViewMode.WholeReport;
    options.toolbar.showPrintButton = false;
    options.toolbar.showSaveButton = false;
    options.toolbar.showFullScreenButton = false;
    var viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);
    viewer.renderHtml("display-prevuew");
    viewer.showProcessIndicator();

//    report.reqData('DataList','DataList',JSON.stringify(new Array()));
    var report = new Stimulsoft.Report.StiReport();
    report.loadFile(mvcPatch('Bill/loadBillReport'));
    report.dictionary.databases.clear();

    $.reqData({
        url: mvcPatch('Bill/findBillWithReport'),
        data: {key: form_showBill_C.data('data')},
        loanding: false,
        callback: function (vdata) {
            report.dictionary.variables.getByName('CompanyName').valueObject = vdata.Company.Customer;
            report.dictionary.variables.getByName('CompanyAddress').valueObject = vdata.Company.Address;
            report.dictionary.variables.getByName('CompanySubDistrict').valueObject = vdata.Company.SubDistrict;
            report.dictionary.variables.getByName('CompanyDistrict').valueObject = vdata.Company.District;
            report.dictionary.variables.getByName('CompanyProvince').valueObject = vdata.Company.Province;
            report.dictionary.variables.getByName('CompanyZipCode').valueObject = vdata.Company.ZipCode;
            report.dictionary.variables.getByName('CompanyTel').valueObject = vdata.Company.Tel;
            report.dictionary.variables.getByName('CompanyFax').valueObject = vdata.Company.Fax;
            report.dictionary.variables.getByName('CustomerIDCard').valueObject = vdata.Company.IDCard;

            report.dictionary.variables.getByName('CustName').valueObject = vdata.Customer.Customer;
            report.dictionary.variables.getByName('CustAddress').valueObject = vdata.Customer.Address;
            report.dictionary.variables.getByName('CustSubDistrict').valueObject = vdata.Customer.SubDistrict;
            report.dictionary.variables.getByName('CustDistrict').valueObject = vdata.Customer.District;
            report.dictionary.variables.getByName('CustProvince').valueObject = vdata.Customer.Province;
            report.dictionary.variables.getByName('CustTel').valueObject = vdata.Customer.Tel;
            report.dictionary.variables.getByName('CustFax').valueObject = vdata.Customer.Fax;
            report.dictionary.variables.getByName('CustIDCard').valueObject = vdata.Customer.IDCard;
            report.dictionary.variables.getByName('CustZipCode').valueObject = vdata.Customer.ZipCode;
            report.dictionary.variables.getByName('CustBranch').valueObject = vdata.Customer.Branch;

            report.dictionary.variables.getByName('BillDate').valueObject = PHP_JSON_To_ShowDate(vdata.DocDate);

            try {
                report.dictionary.variables.getByName('BillDueDate').valueObject = PHP_JSON_To_ShowDate(vdata.DueDate);
            } catch (e) {
                report.dictionary.variables.getByName('BillDueDate').valueObject = PHP_JSON_To_ShowDate(vdata.DocDate);
            }
            var _pay = '';
            if (parseInt(vdata.PayType) === 1) {
                _pay = 'ชำระเงินสด';
            } else if (parseInt(vdata.PayType) === 2) {
                _pay = 'ชำระเช็ค';
            }
            report.dictionary.variables.getByName('PayType').valueObject = _pay;
            viewer.report = report;

        }
    });
//    report.reqData('DataList','DataList',JSON.stringify(new Array()));




    $('#btn-print').on({
        click: function () {
            report.print();
        }
    });
});

