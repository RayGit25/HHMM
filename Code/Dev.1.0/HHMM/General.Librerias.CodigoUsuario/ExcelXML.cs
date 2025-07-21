using System;
using System.Data;
using System.IO;
using System.IO.Compression;
//using System.Web.Mvc;
using System.Collections.Generic;
using System.Text;
//using Microsoft.Office.Interop.Excel;
using System.Configuration;
using System.Reflection;
using DataTable = System.Data.DataTable;

namespace General.Librerias.CodigoUsuario
{
    public class ExcelXML
    {
        private static string sArchivoXlsx;
        private static string[] sHojas;
        private static string[] sRango;
        private static int nHojas;
        private static List<dynamic> data;

        public static void ExportarTabla2XLSX(string archivoXlsx, string[] hojas, DataSet objData)
        {
            data = new List<dynamic>();
            //*** Creamos archivo en el Servidor / Local
            sArchivoXlsx = archivoXlsx;
            sHojas = hojas;
            nHojas = hojas.Length;
            sRango = new string[nHojas];
            DataTable tabla;
            string sCol = "";
            for (int i = 0; i < objData.Tables.Count; i++)
            {
                tabla = objData.Tables[i];
                data.Add(tabla);
                sCol = NumeroAColumnaExcel(tabla.Columns.Count);
                sRango[i] = String.Format("${0}${1}", sCol, tabla.Rows.Count + 1);
            }
            crearDirectoriosArchivos();
        }

        private static void crearDirectoriosArchivos()
        {
            //Definir la ruta de los directorios a crear
            string sDirectorioRaiz = Path.Combine(Path.GetDirectoryName(sArchivoXlsx),
                Path.GetFileNameWithoutExtension(sArchivoXlsx));
            string sDirectorioRels = Path.Combine(sDirectorioRaiz, "_rels");
            string sDirectorioDocProps = Path.Combine(sDirectorioRaiz, "docProps");
            string sDirectorioXl = Path.Combine(sDirectorioRaiz, "xl");
            string sDirectorioXlRels = Path.Combine(sDirectorioXl, "_rels");
            string sDirectorioXlTheme = Path.Combine(sDirectorioXl, "theme");
            string sDirectorioXlWorksheets = Path.Combine(sDirectorioXl, "worksheets");
            string sDirectorioXlCharts = Path.Combine(sDirectorioXl, "charts");
            string sDirectorioXlChartSheets = Path.Combine(sDirectorioXl, "chartsheets");
            string sDirectorioXlDrawings = Path.Combine(sDirectorioXl, "drawings");
            string sDirectorioXlChartSheetsRel = Path.Combine(sDirectorioXlChartSheets, "_rels");
            string sDirectorioXlDrawingsRel = Path.Combine(sDirectorioXlDrawings, "_rels");

            //Definir la ruta de los archivos a crear
            string sArchivoContentTypes = Path.Combine(sDirectorioRaiz, "[Content_Types].xml");
            string sArchivoRels = Path.Combine(sDirectorioRels, ".rels");
            string sArchivoDocApp = Path.Combine(sDirectorioDocProps, "app.xml");
            string sArchivoDocCore = Path.Combine(sDirectorioDocProps, "core.xml");
            string sArchivoXlStyles = Path.Combine(sDirectorioXl, "styles.xml");
            string sArchivoXlWorkbook = Path.Combine(sDirectorioXl, "workbook.xml");
            string sArchivoXlRels = Path.Combine(sDirectorioXlRels, "workbook.xml.rels");
            string sArchivoXlTheme = Path.Combine(sDirectorioXlTheme, "theme1.xml");
            string[] sArchivoXlSheets = new string[nHojas];
            for (var i = 0; i < nHojas; i++) sArchivoXlSheets[i] =
                 Path.Combine(sDirectorioXlWorksheets, String.Format("sheet{0}.xml", i + 1));
            string sArchivoXlChart = Path.Combine(sDirectorioXlCharts, "chart1.xml");
            string sArchivoXlChartSheet = Path.Combine(sDirectorioXlChartSheets, "sheet1.xml");
            string sArchivoXlChartSheetRel = Path.Combine(sDirectorioXlChartSheetsRel, "sheet1.xml.rels");
            string sArchivoXlDrawing = Path.Combine(sDirectorioXlDrawings, "drawing1.xml");
            string sArchivoXlDrawingRel = Path.Combine(sDirectorioXlDrawings, "drawing1.xml.rels");

            //Crear los Directorios definidos
            DirectoryInfo oDirectorioRaiz = Directory.CreateDirectory(sDirectorioRaiz);
            oDirectorioRaiz.CreateSubdirectory("_rels");
            oDirectorioRaiz.CreateSubdirectory("docProps");
            DirectoryInfo oDirectorioXl = oDirectorioRaiz.CreateSubdirectory("xl");
            oDirectorioXl.CreateSubdirectory("_rels");
            oDirectorioXl.CreateSubdirectory("theme");
            oDirectorioXl.CreateSubdirectory("worksheets");

            //Crear los Archivos definidos
            File.WriteAllText(sArchivoContentTypes, getContentTypes());
            File.WriteAllText(sArchivoRels, getRels());
            File.WriteAllText(sArchivoDocApp, getApp());
            File.WriteAllText(sArchivoDocCore, getCore());
            File.WriteAllText(sArchivoXlStyles, getXlStyles());
            File.WriteAllText(sArchivoXlWorkbook, getXlWorkbook());
            File.WriteAllText(sArchivoXlRels, getXlRels());
            File.WriteAllText(sArchivoXlTheme, getXlTheme());
            for (var i = 0; i < nHojas; i++) getXlSheet(sArchivoXlSheets[i], i);
            //File.WriteAllText(sArchivoXlSheets[i], getXlSheet(i));

            //Si el archivo ya existe entonces borrar
            if (File.Exists(sArchivoXlsx)) File.Delete(sArchivoXlsx);
            //Comprimir los archivos en un Xlsx
            ZipFile.CreateFromDirectory(sDirectorioRaiz, sArchivoXlsx);
            //Borrar todo el directorio con los archivos temporales creados
            Directory.Delete(sDirectorioRaiz, true);
        }

        private static string getContentTypes()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
            sb.Append("<Types xmlns=\"http://schemas.openxmlformats.org/package/2006/content-types\">");
            sb.Append("<Default Extension=\"rels\" ContentType=\"application/vnd.openxmlformats-package.relationships+xml\"/>");
            //sb.Append("<Default Extension=\"wmf\" ContentType=\"image/x-wmf\"/>");
            sb.Append("<Default Extension=\"xml\" ContentType=\"application/xml\"/>");
            sb.Append("<Override PartName=\"/xl/workbook.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml\"/>");
            sb.Append("<Override PartName=\"/xl/styles.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml\"/>");
            sb.Append("<Override PartName=\"/xl/theme/theme1.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.theme+xml\"/>");
            sb.Append("<Override PartName=\"/docProps/core.xml\" ContentType=\"application/vnd.openxmlformats-package.core-properties+xml\"/>");
            sb.Append("<Override PartName=\"/docProps/app.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.extended-properties+xml\"/>");
            for (var i = 0; i < nHojas; i++)
            {
                sb.Append("<Override PartName=\"/xl/worksheets/sheet");
                sb.Append(i + 1);
                sb.Append(".xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml\"/>");
            }
            sb.Append("</Types>");
            return sb.ToString();
        }

        private static string getRels()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
            sb.Append("<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">");
            sb.Append("<Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties\" Target=\"docProps/core.xml\"/>");
            //sb.Append("<Relationship Id=\"rId2\" Type=\"http://schemas.openxmlformats.org/package/2006/relationships/metadata/thumbnail\" Target=\"docProps/thumbnail.wmf\"/>");
            sb.Append("<Relationship Id=\"rId2\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument\" Target=\"xl/workbook.xml\"/>");
            sb.Append("<Relationship Id=\"rId3\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties\" Target=\"docProps/app.xml\"/>");
            sb.Append("</Relationships>");
            return sb.ToString();
        }

        private static string getApp()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
            sb.Append("<Properties xmlns=\"http://schemas.openxmlformats.org/officeDocument/2006/extended-properties\" xmlns:vt=\"http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes\">");
            sb.Append("<Application>Microsoft Access</Application>");
            sb.Append("<DocSecurity>0</DocSecurity>");
            sb.Append("<ScaleCrop>false</ScaleCrop>");
            sb.Append("<HeadingPairs>");
            sb.Append("<vt:vector size=\"2\" baseType=\"variant\">");
            sb.Append("<vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant>");
            sb.Append("<vt:variant><vt:i4>1</vt:i4></vt:variant>");
            sb.Append("</vt:vector>");
            sb.Append("</HeadingPairs>");
            sb.Append("<TitlesOfParts>");
            sb.Append("<vt:vector size=\"1\" baseType=\"lpstr\">");
            sb.Append("<vt:lpstr>A266FF2A662E84b639DA</vt:lpstr>");
            sb.Append("</vt:vector>");
            sb.Append("</TitlesOfParts>");
            sb.Append("<Company>Microsoft</Company>");
            sb.Append("<LinksUpToDate>false</LinksUpToDate>");
            sb.Append("<SharedDoc>false</SharedDoc>");
            sb.Append("<HyperlinksChanged>false</HyperlinksChanged>");
            sb.Append("<AppVersion>12.0000</AppVersion>");
            sb.Append("</Properties>");
            return sb.ToString();
        }

        private static string getCore()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
            sb.Append("<cp:coreProperties ");
            sb.Append("xmlns:cp=\"http://schemas.openxmlformats.org/package/2006/metadata/core-properties\" ");
            sb.Append("xmlns:dc=\"http://purl.org/dc/elements/1.1/\" ");
            sb.Append("xmlns:dcterms=\"http://purl.org/dc/terms/\" ");
            sb.Append("xmlns:dcmitype=\"http://purl.org/dc/dcmitype/\" ");
            sb.Append("xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">");
            sb.Append("<dc:creator>");
            sb.Append(Environment.UserName);
            sb.Append("</dc:creator>");
            sb.Append("<cp:lastModifiedBy>");
            sb.Append(Environment.UserName);
            sb.Append("</cp:lastModifiedBy>");
            sb.Append("<dcterms:created xsi:type=\"dcterms:W3CDTF\">");
            sb.Append(DateTime.Now.ToString("s"));
            sb.Append("Z</dcterms:created>");
            sb.Append("<dcterms:modified xsi:type=\"dcterms:W3CDTF\">");
            sb.Append(DateTime.Now.ToString("s"));
            sb.Append("Z</dcterms:modified>");
            sb.Append("</cp:coreProperties>");
            return sb.ToString();
        }

        private static string getXlStyles()
        {
            StringBuilder sb = new StringBuilder();
            //**************************************
            //sb.Append("<styleSheet xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" xmlns:mc=\"http://schemas.openxmlformats.org/markup-compatibility/2006\" xmlns:x14ac=\"http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac\" mc:Ignorable=\"x14ac\">");
            //sb.Append("<numFmts count=\"1\">");
            //sb.Append("<numFmt numFmtId=\"164\" formatCode=\"\"\"#,##0.00\"/>");
            //sb.Append("</numFmts>");
            //sb.Append("<fonts count=\"2\" x14ac:knownFonts=\"1\">");
            //sb.Append("<font>");
            //sb.Append("<sz val=\"11\"/>");
            //sb.Append("<color theme=\"1\"/>");
            //sb.Append("<name val=\"Calibri\"/>");
            //sb.Append("<family val=\"2\"/>");
            //sb.Append("<scheme val=\"minor\"/>");
            //sb.Append("</font>");
            //sb.Append("<font>");
            //sb.Append("<sz val=\"11\"/>");
            //sb.Append("<color indexed=\"9\"/>");
            //sb.Append("<name val=\"Calibri\"/>");
            //sb.Append("<family val=\"2\"/>");
            //sb.Append("</font>");
            //sb.Append("</fonts>");
            //sb.Append("<fills count=\"3\">");
            //sb.Append("<fill>");
            //sb.Append("<patternFill patternType=\"none\"/>");
            //sb.Append("</fill>");
            //sb.Append("<fill>");
            //sb.Append("<patternFill patternType=\"gray125\"/>");
            //sb.Append("</fill>");
            //sb.Append("<fill>");
            //sb.Append("<patternFill patternType=\"solid\">");
            //sb.Append("<fgColor rgb=\"FF00B050\"/>");
            //sb.Append("<bgColor indexed=\"64\"/>");
            ////sb.Append("</patternFill>");
            //sb.Append("</fill>");
            //sb.Append("</fills>");
            //sb.Append("<borders count=\"1\">");
            //sb.Append("<border>");
            //sb.Append("<left/>");
            //sb.Append("<right/>");
            //sb.Append("<top/>");
            //sb.Append("<bottom/>");
            //sb.Append("<diagonal/>");
            //sb.Append("</border>");
            //sb.Append("</borders>");
            //sb.Append("<cellStyleXfs count=\"1\">");
            //sb.Append("<xf numFmtId=\"0\" fontId=\"0\" fillId=\"0\" borderId=\"0\"/>");
            //sb.Append("</cellStyleXfs>");
            //sb.Append("<cellXfs count=\"3\">");
            //sb.Append("<xf numFmtId=\"0\" fontId=\"0\" fillId=\"0\" borderId=\"0\" xfId=\"0\"/>");
            //sb.Append("<xf numFmtId=\"0\" fontId=\"1\" fillId=\"2\" borderId=\"0\" xfId=\"0\" applyFont=\"1\" applyFill=\"1\"/>");
            //sb.Append("<xf numFmtId=\"164\" fontId=\"0\" fillId=\"0\" borderId=\"0\" xfId=\"0\" applyNumberFormat=\"1\" applyAlignment=\"1\">");
            //sb.Append("<alignment horizontal=\"right\"/>");
            //sb.Append("</xf>");
            //sb.Append("</cellXfs>");
            //sb.Append("<cellStyles count=\"1\">");
            //sb.Append("<cellStyle name=\"Normal\" xfId=\"0\" builtinId=\"0\"/>");
            //sb.Append("</cellStyles>");
            //sb.Append("<dxfs count=\"0\"/>");
            //sb.Append("<tableStyles count=\"0\" defaultTableStyle=\"TableStyleMedium2\" defaultPivotStyle=\"PivotStyleLight16\"/>");
            //sb.Append("<extLst>");
            //sb.Append("<ext xmlns:x14=\"http://schemas.microsoft.com/office/spreadsheetml/2009/9/main\" uri=\"{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}\">");
            //sb.Append("<x14:slicerStyles defaultSlicerStyle=\"SlicerStyleLight1\"/>");
            //sb.Append("</ext>");
            //sb.Append("<ext xmlns:x15=\"http://schemas.microsoft.com/office/spreadsheetml/2010/11/main\" uri=\"{9260A510-F301-46a8-8635-F512D64BE5F5}\">");
            //sb.Append("<x15:timelineStyles defaultTimelineStyle=\"TimeSlicerStyleLight1\"/>");
            //sb.Append("</ext>");
            //sb.Append("</extLst>");
            //sb.Append("</styleSheet>");
            //**************************************
            sb.Append("<styleSheet xmlns='http://schemas.openxmlformats.org/spreadsheetml/2006/main' xmlns:mc='http://schemas.openxmlformats.org/markup-compatibility/2006' xmlns:x14ac='http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac' mc:Ignorable='x14ac'>");
            sb.Append("<numFmts count='2'>");
            sb.Append("<numFmt numFmtId='164' formatCode='dd/mm/yyyy;@'/>");
            sb.Append("<numFmt numFmtId='164' formatCode='\"\"#,##0.00'/>");
            sb.Append("</numFmts>");
            sb.Append("<fonts count='2'>");
            sb.Append("<font>");        //Font General
            sb.Append("<sz val='11'/>");
            sb.Append("<color theme='1'/>");
            sb.Append("<name val='MS Sans Serif'/>");
            sb.Append("<family val='2'/>");
            sb.Append("<scheme val='minor'/>");
            sb.Append("</font>");
            sb.Append("<font>");        //Segundo Font Especifico
            sb.Append("<sz val='11'/>");
            sb.Append("<color theme='0'/>");
            sb.Append("<name val='Calibri'/>");
            sb.Append("<family val='2'/>");
            sb.Append("<scheme val='minor'/>");
            sb.Append("</font>");
            sb.Append("</fonts>");
            sb.Append("<fills count='3'>");
            sb.Append("<fill><patternFill patternType='none'/></fill>");
            sb.Append("<fill><patternFill patternType='gray125'/></fill>");
            sb.Append("<fill><patternFill patternType='solid'/>");
            sb.Append("<fgColor rgb='FF00B050'/><bgColor indexed='64'/>");
            //sb.Append("</patternFill>");
            sb.Append("</fill>"); //Tercer Background
            sb.Append("</fills>");
            sb.Append("<borders count='1'>");
            sb.Append("<border><left/><right/><top/><bottom/><diagonal/></border>");
            sb.Append("</borders>");
            sb.Append("<cellStyleXfs count='1'>");
            sb.Append("<xf numFmtId='0' fontId='0' fillId='0' borderId='0'/>");
            sb.Append("</cellStyleXfs>");
            sb.Append("<cellXfs count='4'>");
            sb.Append("<xf numFmtId='0' fontId='0' fillId='0' borderId='0' xfId='0'/>");
            sb.Append("<xf numFmtId='0' fontId='1' fillId='2' borderId='0' xfId='0' applyFont='1' applyFill='1'/>");  //Segundo Formato
            sb.Append("<xf numFmtId='2' fontId='0' fillId='0' borderId='0' xfId='0' applyNumberFormat='1'/>");
            sb.Append("<xf numFmtId='164' fontId='0' fillId='0' borderId='0' xfId='0' applyNumberFormat='1'/>");
            sb.Append("</cellXfs>");
            sb.Append("<cellStyles count='1'>");
            sb.Append("<cellStyle name='Normal' xfId='0' builtinId='0'/>");
            sb.Append("</cellStyles>");
            sb.Append("<dxfs count='0'/>");
            sb.Append("<tableStyles count='0' defaultTableStyle='TableStyleMedium9' defaultPivotStyle='PivotStyleLight16'/>");
            sb.Append("<extLst><ext uri='{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}' ");
            sb.Append("xmlns:x14='http://schemas.microsoft.com/office/spreadsheetml/2009/9/main'>");
            sb.Append("<x14:slicerStyles defaultSlicerStyle='SlicerStyleLight1'/></ext>");
            sb.Append("<ext uri='{9260A510-F301-46a8-8635-F512D64BE5F5}' ");
            sb.Append("xmlns:x15='http://schemas.microsoft.com/office/spreadsheetml/2010/11/main'>");
            sb.Append("<x15:timelineStyles defaultTimelineStyle='TimeSlicerStyleLight1'/></ext></extLst>");

            sb.Append("</styleSheet>"); return sb.ToString();
        }

        private static string getXlWorkbook()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<workbook xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" ");
            sb.Append("xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\">");
            sb.Append("<fileVersion appName=\"xl\" lastEdited=\"4\" lowestEdited=\"4\" rupBuild=\"4505\"/>");
            sb.Append("<workbookPr defaultThemeVersion=\"124226\"/>");
            sb.Append("<bookViews>");
            sb.Append("<workbookView xWindow=\"120\" yWindow=\"90\" windowWidth=\"23895\" windowHeight=\"14535\"/>");
            sb.Append("</bookViews>");
            sb.Append("<sheets>");
            for (var i = 0; i < nHojas; i++)
            {
                sb.Append("<sheet sheetId=\"");
                sb.Append(i + 1);
                sb.Append("\" r:id=\"rId");
                sb.Append(i + 3);
                sb.Append("\" name=\"");
                sb.Append(sHojas[i]);
                sb.Append("\"/>");
            }
            sb.Append("</sheets>");
            sb.Append("<definedNames>");
            for (var i = 0; i < nHojas; i++)
            {
                sb.Append("<definedName name=\"");
                sb.Append(sHojas[i]);
                sb.Append("\">'");
                sb.Append(sHojas[i]);
                sb.Append("'!$A$1:");
                sb.Append(sRango[i]);
                sb.Append("</definedName>");
            }
            sb.Append("</definedNames>");
            sb.Append("<calcPr calcId=\"125725\" fullCalcOnLoad=\"true\"/>");
            sb.Append("</workbook>");
            return sb.ToString();
        }

        private static string getXlRels()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
            sb.Append("<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">");
            sb.Append("<Relationship Id=\"rId1\" ");
            sb.Append("Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles\" ");
            sb.Append("Target=\"styles.xml\"/>");
            sb.Append("<Relationship Id=\"rId2\" ");
            sb.Append("Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme\" ");
            sb.Append("Target=\"theme/theme1.xml\"/>");
            for (var i = 0; i < nHojas; i++)
            {
                sb.Append("<Relationship Id=\"rId");
                sb.Append(i + 3);
                sb.Append("\" ");
                sb.Append("Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet\" ");
                sb.Append("Target=\"worksheets/sheet");
                sb.Append(i + 1);
                sb.Append(".xml\"/>");
            }
            sb.Append("</Relationships>");
            return sb.ToString();
        }

        private static string getXlTheme()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
            sb.Append("<a:theme xmlns:a=\"http://schemas.openxmlformats.org/drawingml/2006/main\" name=\"Office Theme\">");
            sb.Append("<a:themeElements>");
            sb.Append("<a:clrScheme name=\"Office\">");
            sb.Append("<a:dk1><a:sysClr val=\"windowText\" lastClr=\"000000\"/></a:dk1>");
            sb.Append("<a:lt1><a:sysClr val=\"window\" lastClr=\"FFFFFF\"/></a:lt1>");
            sb.Append("<a:dk2><a:srgbClr val=\"1F497D\"/></a:dk2>");
            sb.Append("<a:lt2><a:srgbClr val=\"EEECE1\"/></a:lt2>");
            sb.Append("<a:accent1><a:srgbClr val=\"4F81BD\"/></a:accent1>");
            sb.Append("</a:themeElements>");
            sb.Append("<a:objectDefaults/>");
            sb.Append("<a:extraClrSchemeLst/>");
            sb.Append("</a:theme>");
            return sb.ToString();
        }

        private static void getXlSheet(string sArchivoXlSheet, int nHoja)
        {
            //StringBuilder sb = new StringBuilder();
            using (StreamWriter sw = new StreamWriter(sArchivoXlSheet))
            {
                sw.Write("<worksheet xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" ");
                sw.Write("xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\">");
                sw.Write("<dimension ref=\"A1:");
                sw.Write(sRango[nHoja]);
                sw.Write("\"/>");
                sw.Write("<sheetViews>");
                sw.Write("<sheetView tabSelected=\"1\" workbookViewId=\"0\" rightToLeft=\"false\">");
                sw.Write("<selection activeCell=\"A1\" sqref=\"A1\"/>");
                sw.Write("</sheetView>");
                sw.Write("</sheetViews>");
                sw.Write("<sheetFormatPr defaultRowHeight=\"15\"/>");
                sw.Write("<cols>");
                DataTable tabla = data[nHoja];
                int nCampos = tabla.Columns.Count;
                for (int j = 0; j < nCampos; j++)   //Ancho de Columna
                {
                    sw.Write("<col min=\"");
                    sw.Write((j + 1).ToString());
                    sw.Write("\" max=\"");
                    sw.Write((j + 1).ToString());
                    sw.Write("\" width=\"");
                    sw.Write((int.Parse(tabla.Columns[j].Caption) / 10).ToString());
                    sw.Write("\" bestFit=\"1\" customWidth=\"1\" />");
                }
                sw.Write("</cols>");
                sw.Write("<sheetData>");
                getSheetTable(sw, nHoja);
                sw.Write("</sheetData>");
                sw.Write("<pageMargins left=\"0.7\" right=\"0.7\" top=\"0.75\" bottom=\"0.75\" header=\"0.3\" footer=\"0.3\"/>");
                sw.Write("</worksheet>");
            }
            //return sb.ToString();
        }

        private static void getSheetTable(StreamWriter sw, int nHoja)
        {
            //StringBuilder sb = new StringBuilder();
            var tabla = data[nHoja];
            DataColumnCollection campos = tabla.Columns;
            sw.Write("<row outlineLevel=\"0\" r=\"1\">");
            string celda;
            string sCol;
            string valor;
            decimal importe;
            string tipo;
            for (int j = 0; j < campos.Count; j++)
            {
                sCol = NumeroAColumnaExcel(j + 1);
                celda = String.Format("{0}1", sCol);
                valor = campos[j].ColumnName;
                sw.Write("<c r=\"");
                sw.Write(celda);
                sw.Write("\" s=\"1\" t=\"inlineStr\"><is><t>"); //Formato 2
                sw.Write(valor);
                sw.Write("</t></is></c>");
            }
            sw.Write("</row>");
            for (int i = 0; i < tabla.Rows.Count; i++)
            {
                sw.Write("<row outlineLevel=\"0\" r=\"");
                sw.Write(i + 2);
                sw.Write("\">");
                for (int j = 0; j < campos.Count; j++)
                {
                    sCol = NumeroAColumnaExcel(j + 1);
                    celda = String.Format("{0}{1}", sCol, i + 2);
                    valor = tabla.Rows[i][j].ToString();
                    //tipo = campos[j].DefaultValue.ToString();
                    tipo = campos[j].DataType.ToString();
                    sw.Write("<c r=\"");
                    sw.Write(celda);
                    if (tipo.Contains("Date")) sw.Write("\" s=\"1\"");
                    else sw.Write("\" s=\"0\"");
                    if (tipo.Contains("String")) // && j!=8)
                    {
                        sw.Write(" t=\"inlineStr\"><is><t>");
                        sw.Write(valor);
                        sw.Write("</t></is>");
                    }
                    else
                    {
                        importe = tabla.Rows[i][j];
                        sw.Write("><is><t>");   //<v>
                        sw.Write(valor);
                        sw.Write("</t></is>");  //</v>
                    }
                    sw.Write("</c>");
                }
                sw.Write("</row>");
            }
        }
        //public static void ExportXLS(string ExcelName, string[] sheets, DataSet DS)
        //{
        //    // Crea una instancia de Excel, es lento para tablas muy grandes
        //    // Usa la referencia Microsoft.Office.Interop.Excel
        //    // Prevenir conflicto de idiomas. Si no se pone genera este error
        //    // Old format or invalid type library. (Exception from HRESULT: 0x80028018 (TYPE_E_INVDATAREAD))
        //    System.Threading.Thread.CurrentThread.CurrentCulture =
        //                    System.Globalization.CultureInfo.CreateSpecificCulture("en-US");

        //    //try {
        //    Application _excel = new Application();
        //    Workbook _wBook = _excel.Workbooks.Add(Missing.Value);

        //    for (int idx = 0; idx < DS.Tables.Count; idx++)
        //    {

        //        Worksheet _sheet = (Worksheet)_wBook.Worksheets.Add(Missing.Value, Missing.Value, Missing.Value, Missing.Value);
        //        _sheet.Name = sheets[idx];

        //        for (int i = 0; i < DS.Tables[idx].Columns.Count; i++)
        //        {
        //            _sheet.Cells[1, i + 1] = DS.Tables[idx].Columns[i].ColumnName.ToString();
        //        }
        //        Range rng = (Range)_sheet.Cells[1, DS.Tables[idx].Columns.Count];
        //        rng.EntireRow.Font.Bold = true;
        //        rng.EntireRow.Interior.ColorIndex = 3;


        //        for (int i = 0; i < DS.Tables[idx].Rows.Count; i++)
        //        {
        //            for (int k = 0; k < DS.Tables[idx].Columns.Count; k++)
        //            {
        //                _sheet.Cells[i + 2, k + 1] = DS.Tables[idx].Rows[i].ItemArray[k];
        //            }
        //        }

        //    }

        //    string path = ConfigurationManager.AppSettings["pathExcel"];
        //    ExcelName = path + ExcelName;

        //    if (File.Exists(ExcelName))
        //    {
        //        File.Delete(ExcelName);
        //    }
        //    _excel.ActiveCell.Worksheet.SaveAs(ExcelName, XlFileFormat.xlExcel8, Missing.Value,
        //                Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value);

        //    // Muestra el excel
        //    _excel.Visible = false;

        //    deleteProcess();
        //    //}
        //    //catch (Exception EX) {
        //    //    string ss = EX.Message;
        //    //}
        //}

        private static void deleteProcess()
        {
            System.Diagnostics.Process[] miproceso = System.Diagnostics.Process.GetProcessesByName("EXCEL");

            foreach (System.Diagnostics.Process pc in miproceso)
            {
                pc.Kill();
            }
        }

        public static string NumeroAColumnaExcel(int column)
        {
            //Devuelve la columna en letras del Excel
            string columnString = "";
            decimal columnNumber = column;
            while (columnNumber > 0)
            {
                decimal currentLetterNumber = (columnNumber - 1) % 26;
                char currentLetter = (char)(currentLetterNumber + 65);
                columnString = currentLetter + columnString;
                columnNumber = (columnNumber - (currentLetterNumber + 1)) / 26;
            }
            return columnString;
        }

        public static string[,] CrearMatrizExcel(string[] lista = null, string separador = "", string fechas = "")
        {
            string[,] matriz = null;
            string[] matrizIndicesFecha = null;
            int nRegistros = lista.Length;
            int nCampos = 0, x = 0, j = 0;
            string[] Datos = null;
            if (fechas != null && fechas.Trim() != "")
            {
                matrizIndicesFecha = fechas.Split(',');
            }
            if (nRegistros > 0 && lista[0] != "")
            {
                nCampos = lista[0].Split(char.Parse(separador)).Length;
                matriz = new string[nRegistros, nCampos];

                for (int i = nRegistros; i > 0; i--)
                {
                    for (int r = 0; r < nCampos; r++)
                    {
                        Datos = lista[x].Split(char.Parse(separador));
                        matriz[x, r] = Datos[r].Trim();
                        if (matrizIndicesFecha != null && matrizIndicesFecha.Length > 0 && BuscarIdxLista(null, matrizIndicesFecha, r.ToString()))
                        {
                            if (matriz[x, r].IndexOf("1900") > -1)
                            {
                                matriz[x, r] = "";
                            }
                        }
                    }
                    x++;
                }
                x = 0;
            }
            return matriz;
        }

        private static bool BuscarIdxLista(string[,] matriz = null, string[] matrizsec = null, string indice = "", int idxbi = -1)
        {
            bool rpta = false;
            if (idxbi < 0)
            {
                for (int x = 0; x < matrizsec.Length; x++)
                {
                    if (matrizsec[x] == indice)
                    {
                        rpta = true;
                        break;
                    }
                }
            }
            else
            {
                for (int x = 0; x < matriz.Length; x++)
                {
                    if (matriz[x, idxbi].Equals(indice))
                    {
                        rpta = true;
                        break;
                    }
                }
            }
            return rpta;
        }
    }
}
