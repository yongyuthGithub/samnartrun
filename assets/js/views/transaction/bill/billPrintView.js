$(function () {
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
        url: mvcPatch('MySystem/findMyCompany'),
//        data: {data: JSON.stringify(obj)},
        loanding: false,
        callback: function (vdata) {
            report.dictionary.variables.getByName('CompanyName').valueObject = vdata.Customer;
            report.dictionary.variables.getByName('CompanyAddress').valueObject = vdata.Address;
            report.dictionary.variables.getByName('CompanySubDistrict').valueObject = vdata.SubDistrict;
            report.dictionary.variables.getByName('CompanyDistrict').valueObject = vdata.District;
            report.dictionary.variables.getByName('CompanyProvince').valueObject = vdata.Province;
            report.dictionary.variables.getByName('CompanyZipCode').valueObject = vdata.ZipCode;
            report.dictionary.variables.getByName('CompanyTel').valueObject = vdata.Tel;
            report.dictionary.variables.getByName('CompanyFax').valueObject = vdata.Fax;
            report.dictionary.variables.getByName('CustomerIDCard').valueObject = vdata.IDCard;
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

