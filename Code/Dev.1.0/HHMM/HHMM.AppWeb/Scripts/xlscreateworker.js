importScripts('loadash.js');
importScripts('jszip.js');
importScripts('excel-builder.dist.js');

onmessage = function (oEvent) {
    var h;
    try {
        var workbook = ExcelBuilder.Builder.createWorkbook();
        var worksheet, worksheet1, worksheet2, worksheet3, worksheet4, worksheet5;
        var stylesheet = workbook.getStyleSheet();
        var white = 'FFFFFFFF';
        var header = stylesheet.createFormat({
        	font: { bold: true, color: white }, fill: { type: 'pattern', patternType: 'solid', fgColor: '00a850' }
        });
        var currency = workbook.getStyleSheet().createFormat({
        	format: "#,##0.00"
        	});

        var obj = oEvent.data;
        var basicReport = new ExcelBuilder.Template.BasicReport();

            for (var i = 0; i < 2; i += 1) {
                switch (i) {
                    case 0:
                        worksheet = workbook.createWorksheet({ name: 'Produccion' });
                        worksheet.sheetView.showGridLines = false;
					
                        worksheet.setData(obj.prod);
                        workbook.addWorksheet(worksheet);
                        break;
                    case 1:
                        worksheet1 = workbook.createWorksheet({ name: 'Horario' });
                       // worksheet1.setColumns([{ width: 20 }, { width: 20 }, { width: 20 }, { width: 20 }, { width: 20 }]);
                        worksheet1.sheetView.showGridLines = false;
                        worksheet1.setData(obj.hor);
                        workbook.addWorksheet(worksheet1);
                        break;
                }
            }

        ExcelBuilder.Builder.createFile(workbook).then(function (data) {
            if (navigator.appVersion.toString().indexOf('.NET') > 0) {
                h = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet¯" + data;
            } else {
            	h = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet¯" + data;
                //h = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + data;
            }
            postMessage(h);
        });
    } catch (e) { postMessage({ t: "e", d: e.stack }); }
};