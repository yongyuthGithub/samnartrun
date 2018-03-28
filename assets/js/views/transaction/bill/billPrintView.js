$(function () {
    var str = Stimulsoft.System.IO.File.getFile(mvcPatch('Bill/loadBillReport'));
    var report = new Stimulsoft.Report.StiReport();
    report.load(str);
    var options = new Stimulsoft.Viewer.StiViewerOptions();
    options.toolbar.zoom = Stimulsoft.Viewer.StiZoomMode.PageWidth;
    options.toolbar.viewMode = Stimulsoft.Viewer.StiWebViewMode.WholeReport;
    options.toolbar.showPrintButton = false;
    options.toolbar.showSaveButton = false;
    options.toolbar.showFullScreenButton = false;
    var viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);

    viewer.report = report;
    viewer.renderHtml("display-prevuew");

    $('#btn-print').on({
        click: function () {
            report.print();
        }
    });
});

