using System;
using System.Data;
using System.IO;
using System.IO.Compression;
using System.Collections.Generic;
using System.Text;
using DataTable = System.Data.DataTable;

namespace General.Librerias.CodigoUsuario
{
    public class ExcelXMLx
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
            nHojas = objData.Tables.Count - 1;
            sRango = new string[nHojas];
            DataTable tabla;
            string sCol = "";
            for (int i = 0; i < nHojas; i++)
            {
                tabla = objData.Tables[i];
                data.Add(tabla);
                sCol = NumeroAColumnaExcel(tabla.Columns.Count);
                sRango[i] = String.Format("${0}${1}", sCol, tabla.Rows.Count + 1);
            }
            crearDirectoriosArchivos();
        }

        //public static void ExportarTablaHorariosXLSX(string archivoXlsx, string[] hojas, DataSet objData)
        //{
        //    data = new List<dynamic>();
        //    sArchivoXlsx = archivoXlsx;
        //    sHojas = hojas;
        //    nHojas = objData.Tables.Count;
        //    sRango = new string[nHojas];
        //    DataTable tabla;
        //    string sCol = "";
        //    for (int i = 0; i < nHojas; i++)
        //    {
        //        tabla = objData.Tables[i];
        //        data.Add(tabla);
        //        sCol = NumeroAColumnaExcel(tabla.Columns.Count);
        //        sRango[i] = String.Format("${0}${1}", sCol, tabla.Rows.Count + 1);
        //    }
        //    crearDirectoriosArchivos();
        //}

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
            for (var i = 0; i < nHojas; i++)
                getXlSheet(sArchivoXlSheets[i], i);

            //Si el archivo ya existe entonces borrar
            if (File.Exists(sArchivoXlsx)) File.Delete(sArchivoXlsx);
            //Comprimir los archivos en un Xlsx
            ZipFile.CreateFromDirectory(sDirectorioRaiz, sArchivoXlsx);
            //Borrar todo el directorio con los archivos temporales creados
            Directory.Delete(sDirectorioRaiz, true);
        }
        private static string getContentTypes()
        {
            //NUEVA VERSION 07/11/2018
            StringBuilder sb = new StringBuilder();
            sb.Append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
            sb.Append("<Types xmlns='http://schemas.openxmlformats.org/package/2006/content-types'>");
            sb.Append("<Default Extension='rels' ContentType='application/vnd.openxmlformats-package.relationships+xml'/>");
            sb.Append("<Default Extension='xml' ContentType='application/xml'/>");
            sb.Append("<Override PartName='/xl/workbook.xml' ContentType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml'/>");
            for (var i = 0; i < nHojas; i++)
            {
                sb.Append("<Override PartName='/xl/worksheets/sheet");
                sb.Append(i + 1);
                sb.Append(".xml' ContentType='application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml'/>");
            }
            sb.Append("<Override PartName='/xl/theme/theme1.xml' ContentType='application/vnd.openxmlformats-officedocument.theme+xml'/>");
            sb.Append("<Override PartName='/xl/styles.xml' ContentType='application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml'/>");
            sb.Append("<Override PartName='/xl/sharedStrings.xml' ContentType='application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml'/>");
            sb.Append("<Override PartName='/docProps/core.xml' ContentType='application/vnd.openxmlformats-package.core-properties+xml'/>");
            sb.Append("<Override PartName='/docProps/app.xml' ContentType='application/vnd.openxmlformats-officedocument.extended-properties+xml'/>");
            sb.Append("</Types>");
            return sb.ToString();
        }

        private static string getRels()
        {
            //Nueva Version
            StringBuilder sb = new StringBuilder();
            sb.Append("<?xml version='1.0' encoding='UTF-8' standalone='yes'?>");
            sb.Append("<Relationships xmlns='http://schemas.openxmlformats.org/package/2006/relationships'>");
            sb.Append("<Relationship Id='rId3' Type='http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties' Target='docProps/app.xml'/>");
            sb.Append("<Relationship Id='rId2' Type='http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties' Target='docProps/core.xml'/>");
            sb.Append("<Relationship Id='rId1' Type='http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument' Target='xl/workbook.xml'/>");
            sb.Append("</Relationships>");
            return sb.ToString();
        }

        private static string getApp()
        {
            //Nueva Version
            StringBuilder sb = new StringBuilder();
            sb.Append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
            sb.Append("<Properties xmlns='http://schemas.openxmlformats.org/officeDocument/2006/extended-properties' xmlns:vt='http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes'>");
            sb.Append("<Application>Microsoft Excel</Application>");
            sb.Append("<DocSecurity>0</DocSecurity>");
            sb.Append("<ScaleCrop>false</ScaleCrop>");
            sb.Append("<HeadingPairs>");
            sb.Append("<vt:vector size='2' baseType='variant'>");
            sb.Append("<vt:variant>");
            sb.Append("<vt:lpstr>Hojas de cálculo</vt:lpstr>");
            sb.Append("</vt:variant>");
            sb.Append("<vt:variant>");
            sb.Append("<vt:i4>1</vt:i4>");
            sb.Append("</vt:variant>");
            sb.Append("</vt:vector>");
            sb.Append("</HeadingPairs>");
            sb.Append("<TitlesOfParts>");
            sb.Append("<vt:vector size='1' baseType='lpstr'>");
            sb.Append("<vt:lpstr>Hoja1</vt:lpstr>");
            sb.Append("</vt:vector>");
            sb.Append("</TitlesOfParts>");
            sb.Append("<Company>Microsoft</Company>");
            sb.Append("<LinksUpToDate>false</LinksUpToDate>");
            sb.Append("<SharedDoc>false</SharedDoc>");
            sb.Append("<HyperlinksChanged>false</HyperlinksChanged>");
            sb.Append("<AppVersion>15.0300</AppVersion>");
            sb.Append("</Properties>");
            return sb.ToString();
        }

        private static string getCore()
        {
            //Nueva Version
            StringBuilder sb = new StringBuilder();
            sb.Append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
            sb.Append("<cp:coreProperties xmlns:cp='http://schemas.openxmlformats.org/package/2006/metadata/core-properties' xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:dcterms='http://purl.org/dc/terms/' xmlns:dcmitype='http://purl.org/dc/dcmitype/' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'>");
            sb.Append("<dc:creator>");
            sb.Append(Environment.UserName);
            sb.Append("</dc:creator>");
            sb.Append("<cp:lastModifiedBy>");
            sb.Append(Environment.UserName);
            sb.Append("</cp:lastModifiedBy>");
            sb.Append("<dcterms:created xsi:type='dcterms:W3CDTF'>");
            sb.Append(DateTime.Now.ToString("s"));
            sb.Append("Z</dcterms:created>");
            sb.Append("<dcterms:modified xsi:type='dcterms:W3CDTF'>");
            sb.Append(DateTime.Now.ToString("s"));
            sb.Append("Z</dcterms:modified>");
            sb.Append("</cp:coreProperties>");
            return sb.ToString();
        }

        private static string getXlStyles()
        {
            //Nueva Version
            StringBuilder sb = new StringBuilder();
            sb.Append("<styleSheet xmlns='http://schemas.openxmlformats.org/spreadsheetml/2006/main' xmlns:mc='http://schemas.openxmlformats.org/markup-compatibility/2006' xmlns:x14ac='http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac' mc:Ignorable='x14ac'>");
            sb.Append("<fonts count='2' x14ac:knownFonts='1'>");
            sb.Append("<font>");
            sb.Append("<sz val='11'/>");
            sb.Append("<color theme='1'/>");
            sb.Append("<name val='Calibri'/>");
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
            sb.Append("<fill>");
            sb.Append("<patternFill patternType='none'/>");
            sb.Append("</fill>");
            sb.Append("<fill>");
            sb.Append("<patternFill patternType='gray125'/>");
            sb.Append("</fill>");
            sb.Append("<fill>");        //Tercer Background Especifico
            sb.Append("<patternFill patternType='solid'>");
            sb.Append("<fgColor rgb='FF00B050'/>");
            sb.Append("<bgColor indexed='64'/>");
            sb.Append("</patternFill>");
            sb.Append("</fill>");
            sb.Append("</fills>");
            sb.Append("<borders count='1'>");
            sb.Append("<border>");
            sb.Append("<left/>");
            sb.Append("<right/>");
            sb.Append("<top/>");
            sb.Append("<bottom/>");
            sb.Append("<diagonal/>");
            sb.Append("</border>");
            sb.Append("</borders>");
            sb.Append("<cellStyleXfs count='1'>");
            sb.Append("<xf numFmtId='0' fontId='0' fillId='0' borderId='0'/>");
            sb.Append("</cellStyleXfs>");
            sb.Append("<cellXfs count='3'>");
            sb.Append("<xf numFmtId='0' fontId='0' fillId='0' borderId='0' xfId='0'/>");
            sb.Append("<xf numFmtId='0' fontId='1' fillId='2' borderId='0' xfId='0' applyFont='1' applyFill='1'/>");  //Segundo Formato
            sb.Append("<xf numFmtId='4' fontId='0' fillId='0' borderId='0' xfId='0' applyNumberFormat='1'/>");
            sb.Append("</cellXfs>");
            sb.Append("<cellStyles count='1'>");
            sb.Append("<cellStyle name='Normal' xfId='0' builtinId='0'/>");
            sb.Append("</cellStyles>");
            sb.Append("<dxfs count='0'/>");
            sb.Append("<tableStyles count='0' defaultTableStyle='TableStyleMedium2' defaultPivotStyle='PivotStyleLight16'/>");
            sb.Append("<extLst>");
            sb.Append("<ext xmlns:x14='http://schemas.microsoft.com/office/spreadsheetml/2009/9/main' uri='{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}'>");
            sb.Append("<x14:slicerStyles defaultSlicerStyle='SlicerStyleLight1'/>");
            sb.Append("</ext>");
            sb.Append("<ext xmlns:x15='http://schemas.microsoft.com/office/spreadsheetml/2010/11/main' uri='{9260A510-F301-46a8-8635-F512D64BE5F5}'>");
            sb.Append("<x15:timelineStyles defaultTimelineStyle='TimeSlicerStyleLight1'/>");
            sb.Append("</ext>");
            sb.Append("</extLst>");
            sb.Append("</styleSheet>");
            return sb.ToString();
        }

        private static string getXlWorkbook()
        {
            //Nueva Version
            StringBuilder sb = new StringBuilder();
            sb.Append("<workbook xmlns='http://schemas.openxmlformats.org/spreadsheetml/2006/main' xmlns:r='http://schemas.openxmlformats.org/officeDocument/2006/relationships' xmlns:mc='http://schemas.openxmlformats.org/markup-compatibility/2006' xmlns:x15='http://schemas.microsoft.com/office/spreadsheetml/2010/11/main' mc:Ignorable='x15'>");
            sb.Append("<fileVersion appName='xl' lastEdited='6' lowestEdited='6' rupBuild='14420'/>");
            sb.Append("<workbookPr defaultThemeVersion='153222'/>");
            sb.Append("<mc:AlternateContent xmlns:mc='http://schemas.openxmlformats.org/markup-compatibility/2006'>");
            sb.Append("<mc:Choice Requires='x15'>");
            sb.Append("<x15ac:absPath xmlns:x15ac='http://schemas.microsoft.com/office/spreadsheetml/2010/11/ac' url='E:\\Archivos\'/>");
            sb.Append("</mc:Choice>");
            sb.Append("</mc:AlternateContent>");
            sb.Append("<bookViews>");
            sb.Append("<workbookView xWindow='0' yWindow='0' windowWidth='18195' windowHeight='6825'/>");
            sb.Append("</bookViews>");
            sb.Append("<sheets>");
            for (var i = 0; i < nHojas; i++)
            {
                sb.Append("<sheet name='");
                sb.Append(sHojas[i]);
                sb.Append("' sheetId='");
                sb.Append(i + 1);
                sb.Append("' r:id='rId");
                sb.Append(i + 3);
                sb.Append("'/>");

            }
            sb.Append("</sheets>");
            sb.Append("<definedNames>");
            for (var i = 0; i < nHojas; i++)
            {
                sb.Append("<definedName name='");
                sb.Append(sHojas[i]);
                sb.Append("'>'");
                sb.Append(sHojas[i]);
                sb.Append("'!$A$1:");
                sb.Append(sRango[i]);
                sb.Append("</definedName>");
            }
            sb.Append("</definedNames>");

            sb.Append("<calcPr calcId='152511'/>");
            sb.Append("<extLst>");
            sb.Append("<ext xmlns:x15='http://schemas.microsoft.com/office/spreadsheetml/2010/11/main' uri='{140A7094-0E35-4892-8432-C4D2E57EDEB5}'>");
            sb.Append("<x15:workbookPr chartTrackingRefBase='1'/>");
            sb.Append("</ext>");
            sb.Append("</extLst>");
            sb.Append("</workbook>");
            return sb.ToString();
        }

        private static string getXlRels()
        {
            //Nueva Version
            StringBuilder sb = new StringBuilder();
            int id = 0;
            sb.Append("<?xml version='1.0' encoding='UTF-8' standalone='yes'?>");
            sb.Append("<Relationships xmlns='http://schemas.openxmlformats.org/package/2006/relationships'>");
            sb.Append("<Relationship Id='rId1' Type='http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles' Target='styles.xml'/>");
            sb.Append("<Relationship Id='rId2' Type='http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme' Target='theme/theme1.xml'/>");
            for (int i = 0; i < nHojas; i++)
            {
                id = i + 3;
                sb.Append("<Relationship Id='rId");
                sb.Append(id);
                sb.Append("' Type='http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet' Target='worksheets/sheet");
                sb.Append(i + 1);
                sb.Append(".xml'/>");
            }
            sb.Append("<Relationship Id='rId");
            sb.Append(id + 1);
            sb.Append("' Type='http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings' Target='sharedStrings.xml'/>");
            sb.Append("</Relationships>");
            return sb.ToString();
        }

        private static string getXlTheme()
        {
            //Nueva Version
            StringBuilder sb = new StringBuilder();
            sb.Append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
            sb.Append("<a:theme xmlns:a='http://schemas.openxmlformats.org/drawingml/2006/main' name='Tema de Office'>");
            sb.Append("<a:themeElements>");
            sb.Append("<a:clrScheme name='Office'>");
            sb.Append("<a:dk1>");
            sb.Append("<a:sysClr val='windowText' lastClr='000000'/>");
            sb.Append("</a:dk1>");
            sb.Append("<a:lt1>");
            sb.Append("<a:sysClr val='window' lastClr='FFFFFF'/>");
            sb.Append("</a:lt1>");
            sb.Append("<a:dk2>");
            sb.Append("<a:srgbClr val='44546A'/>");
            sb.Append("</a:dk2>");
            sb.Append("<a:lt2>");
            sb.Append("<a:srgbClr val='E7E6E6'/>");
            sb.Append("</a:lt2>");
            sb.Append("<a:accent1>");
            sb.Append("<a:srgbClr val='5B9BD5'/>");
            sb.Append("</a:accent1>");
            sb.Append("<a:accent2>");
            sb.Append("<a:srgbClr val='ED7D31'/>");
            sb.Append("</a:accent2>");
            sb.Append("<a:accent3>");
            sb.Append("<a:srgbClr val='A5A5A5'/>");
            sb.Append("</a:accent3>");
            sb.Append("<a:accent4>");
            sb.Append("<a:srgbClr val='FFC000'/>");
            sb.Append("</a:accent4>");
            sb.Append("<a:accent5>");
            sb.Append("<a:srgbClr val='4472C4'/>");
            sb.Append("</a:accent5>");
            sb.Append("<a:accent6>");
            sb.Append("<a:srgbClr val='70AD47'/>");
            sb.Append("</a:accent6>");
            sb.Append("<a:hlink>");
            sb.Append("<a:srgbClr val='0563C1'/>");
            sb.Append("</a:hlink>");
            sb.Append("<a:folHlink>");
            sb.Append("<a:srgbClr val='954F72'/>");
            sb.Append("</a:folHlink>");
            sb.Append("</a:clrScheme>");
            sb.Append("<a:fontScheme name='Office'>");
            sb.Append("<a:majorFont>");
            sb.Append("<a:latin typeface='Calibri Light' panose='020F0302020204030204'/>");
            sb.Append("<a:ea typeface=''/>");
            sb.Append("<a:cs typeface=''/>");
            sb.Append("</a:majorFont>");
            sb.Append("<a:minorFont>");
            sb.Append("<a:latin typeface='Calibri' panose='020F0502020204030204'/>");
            sb.Append("<a:ea typeface=''/>");
            sb.Append("<a:cs typeface=''/>");
            sb.Append("</a:minorFont>");
            sb.Append("</a:fontScheme>");
            sb.Append("<a:fmtScheme name='Office'>");
            sb.Append("<a:fillStyleLst>");
            sb.Append("<a:solidFill>");
            sb.Append("<a:schemeClr val='phClr'/>");
            sb.Append("</a:solidFill>");
            sb.Append("<a:gradFill rotWithShape='1'>");
            sb.Append("<a:gsLst>");
            sb.Append("<a:gs pos='0'>");
            sb.Append("<a:schemeClr val='phClr'>");
            sb.Append("<a:lumMod val='110000'/>");
            sb.Append("<a:satMod val='105000'/>");
            sb.Append("<a:tint val='67000'/>");
            sb.Append("</a:schemeClr>");
            sb.Append("</a:gs>");
            sb.Append("<a:gs pos='50000'>");
            sb.Append("<a:schemeClr val='phClr'>");
            sb.Append("<a:lumMod val='105000'/>");
            sb.Append("<a:satMod val='103000'/>");
            sb.Append("<a:tint val='73000'/>");
            sb.Append("</a:schemeClr>");
            sb.Append("</a:gs>");
            sb.Append("<a:gs pos='100000'>");
            sb.Append("<a:schemeClr val='phClr'>");
            sb.Append("<a:lumMod val='105000'/>");
            sb.Append("<a:satMod val='109000'/>");
            sb.Append("<a:tint val='81000'/>");
            sb.Append("</a:schemeClr>");
            sb.Append("</a:gs>");
            sb.Append("</a:gsLst>");
            sb.Append("<a:lin ang='5400000' scaled='0'/>");
            sb.Append("</a:gradFill>");
            sb.Append("<a:gradFill rotWithShape='1'>");
            sb.Append("<a:gsLst>");
            sb.Append("<a:gs pos='0'>");
            sb.Append("<a:schemeClr val='phClr'>");
            sb.Append("<a:satMod val='103000'/>");
            sb.Append("<a:lumMod val='102000'/>");
            sb.Append("<a:tint val='94000'/>");
            sb.Append("</a:schemeClr>");
            sb.Append("</a:gs>");
            sb.Append("<a:gs pos='50000'>");
            sb.Append("<a:schemeClr val='phClr'>");
            sb.Append("<a:satMod val='110000'/>");
            sb.Append("<a:lumMod val='100000'/>");
            sb.Append("<a:shade val='100000'/>");
            sb.Append("</a:schemeClr>");
            sb.Append("</a:gs>");
            sb.Append("<a:gs pos='100000'>");
            sb.Append("<a:schemeClr val='phClr'>");
            sb.Append("<a:lumMod val='99000'/>");
            sb.Append("<a:satMod val='120000'/>");
            sb.Append("<a:shade val='78000'/>");
            sb.Append("</a:schemeClr>");
            sb.Append("</a:gs>");
            sb.Append("</a:gsLst>");
            sb.Append("<a:lin ang='5400000' scaled='0'/>");
            sb.Append("</a:gradFill>");
            sb.Append("</a:fillStyleLst>");
            sb.Append("<a:lnStyleLst>");
            sb.Append("<a:ln w='6350' cap='flat' cmpd='sng' algn='ctr'>");
            sb.Append("<a:solidFill>");
            sb.Append("<a:schemeClr val='phClr'/>");
            sb.Append("</a:solidFill>");
            sb.Append("<a:prstDash val='solid'/>");
            sb.Append("<a:miter lim='800000'/>");
            sb.Append("</a:ln>");
            sb.Append("<a:ln w='12700' cap='flat' cmpd='sng' algn='ctr'>");
            sb.Append("<a:solidFill>");
            sb.Append("<a:schemeClr val='phClr'/>");
            sb.Append("</a:solidFill>");
            sb.Append("<a:prstDash val='solid'/>");
            sb.Append("<a:miter lim='800000'/>");
            sb.Append("</a:ln>");
            sb.Append("<a:ln w='19050' cap='flat' cmpd='sng' algn='ctr'>");
            sb.Append("<a:solidFill>");
            sb.Append("<a:schemeClr val='phClr'/>");
            sb.Append("</a:solidFill>");
            sb.Append("<a:prstDash val='solid'/>");
            sb.Append("<a:miter lim='800000'/>");
            sb.Append("</a:ln>");
            sb.Append("</a:lnStyleLst>");
            sb.Append("<a:effectStyleLst>");
            sb.Append("<a:effectStyle>");
            sb.Append("<a:effectLst/>");
            sb.Append("</a:effectStyle>");
            sb.Append("<a:effectStyle>");
            sb.Append("<a:effectLst/>");
            sb.Append("</a:effectStyle>");
            sb.Append("<a:effectStyle>");
            sb.Append("<a:effectLst>");
            sb.Append("<a:outerShdw blurRad='57150' dist='19050' dir='5400000' algn='ctr' rotWithShape='0'>");
            sb.Append("<a:srgbClr val='000000'>");
            sb.Append("<a:alpha val='63000'/>");
            sb.Append("</a:srgbClr>");
            sb.Append("</a:outerShdw>");
            sb.Append("</a:effectLst>");
            sb.Append("</a:effectStyle>");
            sb.Append("</a:effectStyleLst>");
            sb.Append("<a:bgFillStyleLst>");
            sb.Append("<a:solidFill>");
            sb.Append("<a:schemeClr val='phClr'/>");
            sb.Append("</a:solidFill>");
            sb.Append("<a:solidFill>");
            sb.Append("<a:schemeClr val='phClr'>");
            sb.Append("<a:tint val='95000'/>");
            sb.Append("<a:satMod val='170000'/>");
            sb.Append("</a:schemeClr>");
            sb.Append("</a:solidFill>");
            sb.Append("<a:gradFill rotWithShape='1'>");
            sb.Append("<a:gsLst>");
            sb.Append("<a:gs pos='0'>");
            sb.Append("<a:schemeClr val='phClr'>");
            sb.Append("<a:tint val='93000'/>");
            sb.Append("<a:satMod val='150000'/>");
            sb.Append("<a:shade val='98000'/>");
            sb.Append("<a:lumMod val='102000'/>");
            sb.Append("</a:schemeClr>");
            sb.Append("</a:gs>");
            sb.Append("<a:gs pos='50000'>");
            sb.Append("<a:schemeClr val='phClr'>");
            sb.Append("<a:tint val='98000'/>");
            sb.Append("<a:satMod val='130000'/>");
            sb.Append("<a:shade val='90000'/>");
            sb.Append("<a:lumMod val='103000'/>");
            sb.Append("</a:schemeClr>");
            sb.Append("</a:gs>");
            sb.Append("<a:gs pos='100000'>");
            sb.Append("<a:schemeClr val='phClr'>");
            sb.Append("<a:shade val='63000'/>");
            sb.Append("<a:satMod val='120000'/>");
            sb.Append("</a:schemeClr>");
            sb.Append("</a:gs>");
            sb.Append("</a:gsLst>");
            sb.Append("<a:lin ang='5400000' scaled='0'/>");
            sb.Append("</a:gradFill>");
            sb.Append("</a:bgFillStyleLst>");
            sb.Append("</a:fmtScheme>");
            sb.Append("</a:themeElements>");
            sb.Append("<a:objectDefaults/>");
            sb.Append("<a:extraClrSchemeLst/>");
            sb.Append("<a:extLst>");
            sb.Append("<a:ext uri='{05A4C25C-085E-4340-85A3-A5531E510DB2}'>");
            sb.Append("<thm15:themeFamily xmlns:thm15='http://schemas.microsoft.com/office/thememl/2012/main' name='Office Theme' id='{62F939B6-93AF-4DB8-9C6B-D6C7DFDC589F}' vid='{4A3C46E8-61CC-4603-A589-7422A47A8E4A}'/>");
            sb.Append("</a:ext>");
            sb.Append("</a:extLst>");
            sb.Append("</a:theme>");
            return sb.ToString();
        }

        private static void getXlSheet(string sArchivoXlSheet, int nHoja)
        {
            //Nueva Version
            using (StreamWriter sw = new StreamWriter(sArchivoXlSheet))
            {
                sw.Write("<worksheet xmlns='http://schemas.openxmlformats.org/spreadsheetml/2006/main' xmlns:r='http://schemas.openxmlformats.org/officeDocument/2006/relationships' xmlns:mc='http://schemas.openxmlformats.org/markup-compatibility/2006' xmlns:x14ac='http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac' mc:Ignorable='x14ac'>");
                sw.Write("<dimension ref='A1:");
                sw.Write(sRango[nHoja]);
                sw.Write("'/>");
                sw.Write("<sheetViews>");
                sw.Write("<sheetView tabSelected='1' workbookViewId='0' rightToLeft='false'>");
                sw.Write("<selection activeCell='A2' sqref='A2'/>");
                sw.Write("</sheetView>");
                sw.Write("</sheetViews>");
                sw.Write("<sheetFormatPr baseColWidth='10' defaultRowHeight='15' x14ac:dyDescent='0.25'/>");
                sw.Write("<cols>");

                DataTable tabla = data[nHoja];
                int nCampos = tabla.Columns.Count;
                for (int j = 0; j < nCampos; j++)   //Ancho de Columna
                {
                    sw.Write("<col min='");
                    sw.Write((j + 1).ToString());
                    sw.Write("' max='");
                    sw.Write((j + 1).ToString());
                    sw.Write("' width='");
                    sw.Write((int.Parse(tabla.Columns[j].Caption) / 10).ToString());
                    sw.Write("' bestFit='1' customWidth='1'/>");
                }
                sw.Write("</cols>");
                sw.Write("<sheetData>");
                getSheetTable(sw, nHoja);
                sw.Write("</sheetData>");
                sw.Write("<pageMargins left=\"0.7\" right=\"0.7\" top=\"0.75\" bottom=\"0.75\" header=\"0.3\" footer=\"0.3\"/>");
                sw.Write("</worksheet>");
            }
        }

        private static void getSheetTable(StreamWriter sw, int nHoja)
        {
            var tabla = data[nHoja];
            string celda;
            string sCol;
            string valor;
            string tipo;
            DataColumnCollection campos = tabla.Columns;
            int nCampos = campos.Count;
            int nFilas = tabla.Rows.Count;
            sw.Write("<row outlineLevel='0' r='1'>");
            //Cabeceras r>1
            for (int j = 0; j < nCampos; j++)
            {
                sCol = NumeroAColumnaExcel(j + 1);
                celda = String.Format("{0}1", sCol);
                valor = campos[j].ColumnName;
                sw.Write("<c r='");
                sw.Write(celda);
                sw.Write("' s='1' t='inlineStr'><is><t>"); //Formato 2
                sw.Write(valor);
                sw.Write("</t></is></c>");
            }
            sw.Write("</row>");
            //Filas r>1
            for (int i = 0; i < nFilas; i++)
            {
                sw.Write("<row outlineLevel='0' r='");
                sw.Write(i + 2);
                sw.Write("'>");
                for (int j = 0; j < campos.Count; j++)
                {
                    sCol = NumeroAColumnaExcel(j + 1);
                    celda = String.Format("{0}{1}", sCol, i + 2);
                    valor = tabla.Rows[i][j].ToString();
                    tipo = campos[j].DataType.ToString();
                    sw.Write("<c r='");
                    sw.Write(celda);
                    if (tipo.Contains("Date"))
                        sw.Write("' s='1'");
                    else if (tipo.Contains("Decimal"))
                        sw.Write("' s='2'");
                    else
                        sw.Write("' s='0'");
                    if (tipo.Contains("String")) // && j!=8)
                    {
                        sw.Write(" t='inlineStr'><is><t>");
                        sw.Write(valor);
                        sw.Write("</t></is>");
                    }
                    else if (tipo.Contains("Boolean")) // && j!=8)
                    {
                        var bValue = "SI";
                        sw.Write(" t='inlineStr'><is><t>");
                        sw.Write(bValue);
                        sw.Write("</t></is>");
                    }
                    else if (tipo.Contains("DateTime")) // && j!=8)
                    {
                        var bValue = valor;
                        sw.Write(" t='inlineStr'><is><t>");
                        sw.Write(bValue);
                        sw.Write("</t></is>");
                    }
                    else if (tipo.Contains("Int32")) // && j!=8)
                    {
                        sw.Write("><v>");   //<v>
                        sw.Write(Convert.ToInt32(valor));
                        sw.Write("</v>");  //</v>
                    }
                    else
                    {
                        sw.Write("><v>");   //<v>
                        sw.Write(Convert.ToDecimal(valor));
                        sw.Write("</v>");  //</v>
                    }
                    sw.Write("</c>");
                }
                sw.Write("</row>");
            }
        }

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
