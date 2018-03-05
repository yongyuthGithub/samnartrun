$(function () {
    var _in = new Array(439340, 525030, 571770, 696580, 970310, 1199310, 1371330, 1541750, 439340, 525030, 571770, 696580);
    var _out = new Array(249160, 240640, 297420, 298510, 324900, 302820, 381210, 404340, 249160, 240640, 297420, 298510);
    Highcharts.chart('ch1', {

        title: {
            text: 'รายรับ-รายจ่าย 12 เดือนย้อนหลัง'
        },

        subtitle: {
            text: 'รายการทั้งหมดเกิดจากการคำนวณข้อมูลที่ทำการบันทึกเข้าไปภายในระบบเท่านั้น'
        },

        yAxis: {
            title: {
                text: 'จำนวนเงิน'
            }
        },
        xAxis: {
            categories: ['เม.ย. 60', 'พ.ค. 60', 'มิ.ย. 60', 'ก.ค. 60', 'ส.ค. 60', 'ก.ย. 60', 'ต.ค. 60', 'พ.ย. 60', 'ธ.ค. 60', 'ม.ค. 61', 'ก.พ. 61', 'มี.ค. 61']
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
//            series: {
//                label: {
//                    connectorAllowed: false
//                },
//                pointStart: 2010
//            }
        },

        series: [{
                name: 'รายรับ',
                data: _in
            }, {
                name: 'รายจ่าย',
                data: _out
            }],

        responsive: {
            rules: [{
//                    condition: {
//                        maxWidth: 500
//                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
        }

    });

    Highcharts.chart('ch2', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'อัตรารายรับ-รายจ่าย 12 เดือนย้อนหลัง'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                        name: 'รายรับ',
                        y: $.ToLinq(_in).Sum(x => x)
                    }, {
                        name: 'รายจ่าย',
                        y: $.ToLinq(_out).Sum(x => x),
                        sliced: true,
                        selected: true
                    }]
            }]
    });

    Highcharts.chart('ch3', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'ลูกค้าที่ใช้บริการ 5 ลำดับแรก'
        },
        xAxis: {
            categories: [
                'ลูกค้า A',
                'ลูกค้า B',
                'ลูกค้า C',
                'ลูกค้า D',
                'ลูกค้า E',
            ]
        },
        yAxis: [{
                min: 0,
                title: {
                    text: 'ค่าบริการ'
                }
            },
//            {
//                title: {
//                    text: 'Profit (millions)'
//                },
//                opposite: true
//            }
        ],
        legend: {
            shadow: false
        },
        tooltip: {
            shared: true
        },
        plotOptions: {
            column: {
                grouping: false,
                shadow: false,
                borderWidth: 0
            }
        },
        series: [{
                name: 'ลูกค้า',
                color: 'rgba(165,170,217,1)',
                data: [3000000, 2500000, 2100000, 2000000, 1800000],
                pointPadding: 0.3,
//                pointPlacement: -0.2
            },
//            {
//                name: 'C002',
//                color: 'rgba(126,86,134,.9)',
//                data: [140, 90, 40],
//                pointPadding: 0.4,
//                pointPlacement: -0.2
//            }, 
//            {
//                name: 'C003',
//                color: 'rgba(248,161,63,1)',
//                data: [183.6, 178.8, 198.5],
//                tooltip: {
//                    valuePrefix: '$',
//                    valueSuffix: ' M'
//                },
//                pointPadding: 0.3,
//                pointPlacement: 0.2,
//                yAxis: 1
//            }, 
//            {
//                name: 'C004',
//                color: 'rgba(186,60,61,.9)',
//                data: [203.6, 198.8, 208.5],
//                tooltip: {
//                    valuePrefix: '$',
//                    valueSuffix: ' M'
//                },
//                pointPadding: 0.4,
//                pointPlacement: 0.2,
//                yAxis: 1
//            }
        ]
    });
});
