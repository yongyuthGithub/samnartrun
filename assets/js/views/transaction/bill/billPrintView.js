$(function () {
    var report = new Stimulsoft.Report.StiReport();
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

