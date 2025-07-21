using System;
using System.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HHMM.Librerias.EntidadesNegocio;
using HHMM.Librerias.ReglasNegocio;
using General.Librerias.CodigoUsuario;
using General.Librerias.EntidadesNegocio;
using HHMM.AppWeb.Filter;
using System.Text;
using io = System.IO;
using System.IO.Compression;
using System.Xml;
using System.IO;

namespace HHMM.AppWeb.Controllers
{
    [frSeguridad]
    public class ConfiguracionController : Controller
    {
        string versionJS = ConfigurationManager.AppSettings["VersionJS"];
        public ActionResult ContratoLista(string ss, int id, string idCompania)
        {
            AdministracionController Administracion = new AdministracionController();
            beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
            ViewBag.seguridad = (Session["Usuario" + ss] == null ? "" : Administracion.obtenerMenuAccion(id, obeUsuarioLogin.PerfilId).ToString());
            ViewBag.versionJS = versionJS;
            ViewBag.rutaContrato = ConfigurationManager.AppSettings["rutaContrato-" + obeUsuarioLogin.IdCompania];
            ViewBag.indicadorAutorizacion = ConfigurationManager.AppSettings["IndicadorAutorizacionContrato"];
            return View();
        }

        public string listasMedicoContrato(string ss, string su)
        {
            string rpta = "";
            brMedicoContrato obrMedicoContrato = new brMedicoContrato();
            beMedicoContratoListas obeMedicoContratoListas = obrMedicoContrato.listarListas(su);
            string ListaConfiguracionPago = "";
            string ListaTipoAtencion = "";
            string ListaTipoAdmision = "";
            string ListaTipoPaciente = "";
            string ListaTipoAseguradora = "";
            string ListaEspecialidad = "";
            string ListaTurno = "";
            string ListaTiempoPago = "";
            string ListaServicio = "";
            string ListaContrato = "";
            string ListaTipoBonificacion = "";

            string ListaTipoAdmisionAdm = "";
            string ListaTipoDocumentoPago = "";
            string ListaTipoServicioImpuesto = "";
            string ListaConceptoMonto = "";
            string ListaModalidad = "";
            string ListaAplicacion = "";

            string ListaAplica = "";
            string ListaDescuento = "";
            string ListaTipoDescuento = "";

            if (obeMedicoContratoListas != null)
            {
                if (obeMedicoContratoListas.ListaConfiguracionPago != null && obeMedicoContratoListas.ListaConfiguracionPago.Count > 0)
                {
                    ListaConfiguracionPago = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaConfiguracionPago, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaTipoAtencion != null && obeMedicoContratoListas.ListaTipoAtencion.Count > 0)
                {
                    ListaTipoAtencion = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaTipoAtencion, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaTipoAdmision != null && obeMedicoContratoListas.ListaTipoAdmision.Count > 0)
                {
                    ListaTipoAdmision = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaTipoAdmision, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaTipoPaciente != null && obeMedicoContratoListas.ListaTipoPaciente.Count > 0)
                {
                    ListaTipoPaciente = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaTipoPaciente, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaTipoAseguradora != null && obeMedicoContratoListas.ListaTipoAseguradora.Count > 0)
                {
                    ListaTipoAseguradora = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaTipoAseguradora, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaEspecialidad != null && obeMedicoContratoListas.ListaEspecialidad.Count > 0)
                {
                    ListaEspecialidad = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaEspecialidad, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaTurno != null && obeMedicoContratoListas.ListaTurno.Count > 0)
                {
                    ListaTurno = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaTurno, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaTiempoPago != null && obeMedicoContratoListas.ListaTiempoPago.Count > 0)
                {
                    ListaTiempoPago = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaTiempoPago, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaServicio != null && obeMedicoContratoListas.ListaServicio.Count > 0)
                {
                    ListaServicio = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaServicio, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaContrato != null && obeMedicoContratoListas.ListaContrato.Count > 0)
                {
                    ListaContrato = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaContrato, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaTipoBonificacion != null && obeMedicoContratoListas.ListaTipoBonificacion.Count > 0)
                {
                    ListaTipoBonificacion = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaTipoBonificacion, '¦', '¯', false, "");
                }

                if (obeMedicoContratoListas.ListaTipoAdmisionProveedor != null && obeMedicoContratoListas.ListaTipoAdmisionProveedor.Count > 0)
                {
                    ListaTipoAdmisionAdm = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaTipoAdmisionProveedor, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaTipoDocumento != null && obeMedicoContratoListas.ListaTipoDocumento.Count > 0)
                {
                    ListaTipoDocumentoPago = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaTipoDocumento, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaTipoServicioImpuesto != null && obeMedicoContratoListas.ListaTipoServicioImpuesto.Count > 0)
                {
                    ListaTipoServicioImpuesto = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaTipoServicioImpuesto, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaConceptoMonto != null && obeMedicoContratoListas.ListaConceptoMonto.Count > 0)
                {
                    ListaConceptoMonto = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaConceptoMonto, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaModalidad != null && obeMedicoContratoListas.ListaModalidad.Count > 0)
                {
                    ListaModalidad = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaModalidad, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaAplicacion != null && obeMedicoContratoListas.ListaAplicacion.Count > 0)
                {
                    ListaAplicacion = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaAplicacion, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaAplica != null && obeMedicoContratoListas.ListaAplica.Count > 0)
                {
                    ListaAplica = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaAplica, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaDescuento != null && obeMedicoContratoListas.ListaDescuento.Count > 0)
                {
                    ListaDescuento = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaDescuento, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListas.ListaTipoDescuento != null && obeMedicoContratoListas.ListaTipoDescuento.Count > 0)
                {
                    ListaTipoDescuento = ucCustomSerializer.Serializar(obeMedicoContratoListas.ListaTipoDescuento, '¦', '¯', false, "");
                }


            }
            rpta = String.Format("{0}¬{1}¬{2}¬{3}¬{4}¬{5}¬{6}¬{7}¬{8}¬{9}¬{10}¬{11}¬{12}¬{13}¬{14}¬{15}¬{16}¬{17}¬{18}¬{19}", ListaConfiguracionPago, ListaTipoAtencion, ListaTipoAdmision, ListaTipoPaciente, ListaTipoAseguradora, ListaEspecialidad, ListaTurno, ListaTiempoPago, ListaServicio, ListaContrato, ListaTipoBonificacion, ListaTipoAdmisionAdm, ListaTipoDocumentoPago, ListaTipoServicioImpuesto, ListaConceptoMonto, ListaModalidad, ListaAplicacion, ListaAplica, ListaDescuento, ListaTipoDescuento);
            return rpta;
        }



        public string listarMedicoContrato(string ss)
        {
            string rpta = "";
            if (Request.InputStream != null)
            {
                int n = (int)Request.InputStream.Length;
                byte[] buffer = new byte[n];
                Request.InputStream.Read(buffer, 0, n);
                string strMedicoContrato = Encoding.UTF8.GetString(buffer);
                string[] MedicoContrato = strMedicoContrato.Split('|');
                brAsignacionDescuento obrAsignacionDescuento = new brAsignacionDescuento();
                int personaid = (MedicoContrato[1] == "") ? 0 : int.Parse(MedicoContrato[1]);
                int medicoid = (MedicoContrato[2] == "") ? 0 : int.Parse(MedicoContrato[2]);
                DateTime fechainicio = (MedicoContrato[3] == "") ? DateTime.Parse("01/01/1900") : DateTime.Parse(MedicoContrato[3]);
                DateTime fechafin = (MedicoContrato[4] == "") ? DateTime.Parse("01/01/1900") : DateTime.Parse(MedicoContrato[4]);
                int EmpresaId = int.Parse(MedicoContrato[5]);
                int EspecialidadId = int.Parse(MedicoContrato[6]);
                bool indicador = bool.Parse(MedicoContrato[7]);
                beAsignacionDescuentoVistaLista obeAsignacionDescuentoVistaLista = obrAsignacionDescuento.listarVista(MedicoContrato[0], personaid, medicoid, fechainicio, fechafin, EmpresaId, EspecialidadId, indicador);
                if (obeAsignacionDescuentoVistaLista != null)
                {
                    if (obeAsignacionDescuentoVistaLista.ListaAsignacionDescuento != null && obeAsignacionDescuentoVistaLista.ListaAsignacionDescuento.Count > 0)
                    {
                        rpta = ucCustomSerializer.Serializar(obeAsignacionDescuentoVistaLista.ListaAsignacionDescuento, '¦', '¯', false);
                    }
                }
            }
            return rpta;
        }

        public string leerArchivoExcel()
        {
            string rpta = "";
            string contenido = "";
            StringBuilder sb = new StringBuilder();
            string contenidoFila = "";
            int nRegistros = 0;
            List<string> hojas = new List<string>();
            HttpPostedFileBase hpfb = (HttpPostedFileBase)Request.Files["archivo"];
            List<XmlDocument> docs = new List<XmlDocument>();
            List<string> nombres = new List<string>();
            List<string> valores = new List<string>();
            List<string> columnas = new List<string>();
            //Descomprimir el archivo Excel y guardar solo los archivos xml necesarios
            //en una Lista de objetos de tipo XmlDocument
            using (var zip = new ZipArchive(hpfb.InputStream, ZipArchiveMode.Read))
            {
                XmlDocument doc;
                foreach (var archivoXml in zip.Entries)
                {
                    if (archivoXml.Name == "workbook.xml" || archivoXml.Name == "sharedStrings.xml" || archivoXml.Name.StartsWith("sheet") && io.Path.GetExtension(archivoXml.Name) == ".xml")
                    {
                        using (io.Stream stream = archivoXml.Open())
                        {
                            doc = new XmlDocument();
                            doc.Load(stream);
                            docs.Add(doc);
                            nombres.Add(archivoXml.Name);
                        }
                    }
                }
            }
            if (docs.Count > 0)
            {
                //Leer el archivo xml donde se guardan los datos de tipo cadena
                int pos = nombres.IndexOf("sharedStrings.xml");
                if (pos > -1)
                {
                    XmlDocument xdStrings = docs[pos];
                    XmlElement nodoRaizStrings = xdStrings.DocumentElement;
                    XmlNodeList nodosValores = nodoRaizStrings.ChildNodes;
                    if (nodosValores != null)
                    {
                        foreach (XmlNode nodoValor in nodosValores)
                        {
                            valores.Add(nodoValor.FirstChild.FirstChild.Value);
                        }
                    }
                }
                //Leer el archivo xml workbook donde se guardan la lista de hojas
                pos = nombres.IndexOf("workbook.xml");
                if (pos > -1)
                {
                    XmlDocument xdLibro = docs[pos];
                    XmlElement nodoRaizHojas = xdLibro.DocumentElement;
                    XmlNodeList nodosHojas = nodoRaizHojas.GetElementsByTagName("sheet");
                    string id, hoja;
                    if (nodosHojas != null)
                    {
                        contenido = "";
                        int ch = 0;
                        foreach (XmlNode nodoHoja in nodosHojas)
                        {
                            id = nodoHoja.Attributes["r:id"].Value.Replace("rId", "");
                            hoja = nodoHoja.Attributes["name"].Value;
                            //Leer cada archivo xml con la hoja
                            pos = nombres.IndexOf("sheet" + id + ".xml");
                            if (pos > -1)
                            {
                                XmlDocument xdHoja = docs[pos];
                                XmlElement nodoRaizHoja = xdHoja.DocumentElement;
                                XmlNodeList nodosFilas = nodoRaizHoja.GetElementsByTagName("row");

                                int indice;
                                string celda, valor;
                                XmlAttribute tipoString;
                                contenido = "";
                                int cf = 0; //contador de filas
                                int cc = 0; //contador de columnas
                                XmlNode nodoCelda = null;
                                if (nodosFilas != null)
                                {
                                    foreach (XmlNode nodoFila in nodosFilas)
                                    {
                                        XmlNodeList nodoCeldas = nodoFila.ChildNodes;
                                        if (nodoCeldas != null)
                                        {
                                            if (cf == 0)
                                            {
                                                columnas = new List<string>();
                                                nRegistros = nodoCeldas.Count;
                                                for (int i = 0; i < nRegistros; i++)
                                                {
                                                    columnas.Add(nodoCeldas[i].Attributes["r"].Value.Replace(nodoFila.Attributes["r"].Value, ""));
                                                }
                                            }
                                            else
                                            {
                                                cc = 0;
                                                contenidoFila = "";
                                                nRegistros = columnas.Count;
                                                for (int i = 0; i < nRegistros; i++)
                                                {
                                                    nodoCelda = nodoCeldas[cc];
                                                    if (cc > 0) contenidoFila += "¦";
                                                    if (nodoCelda != null)
                                                    {
                                                        if (columnas[i] == nodoCelda.Attributes["r"].Value.Replace(nodoFila.Attributes["r"].Value, ""))
                                                        {
                                                            celda = nodoCelda.Attributes["r"].Value;
                                                            tipoString = nodoCelda.Attributes["t"];
                                                            valor = "";
                                                            if (tipoString != null)
                                                            {
                                                                if (valores != null && valores.Count > 0)
                                                                {
                                                                    indice = int.Parse(nodoCelda.FirstChild.FirstChild.Value);
                                                                    valor = valores[indice];
                                                                    contenidoFila += valor;
                                                                }
                                                            }
                                                            else
                                                            {
                                                                if (nodoCelda.FirstChild != null && nodoCelda.FirstChild.FirstChild != null)
                                                                {
                                                                    valor = nodoCelda.FirstChild.FirstChild.Value;
                                                                    contenidoFila += valor;
                                                                }
                                                            }
                                                            cc++;
                                                        }
                                                    }
                                                }
                                                if (cf < nodosFilas.Count - 1) contenidoFila += "¬";
                                                contenido += contenidoFila;
                                            }
                                        }
                                        cf++;
                                    }
                                }
                                hojas.Add(contenido);
                                //sb.AppendLine(contenido);
                            }
                            ch++;
                        }
                    }
                }
            }
            //rpta = sb.ToString();
            brMedicoContrato obrMedicoContrato = new brMedicoContrato();
            beContratoExcel obeContratoExcel = obrMedicoContrato.cargarExcel(hojas);
            string lista1 = "";
            string lista2 = "";
            string lista3 = "";
            if (obeContratoExcel != null)
            {
                if (obeContratoExcel.Lista1 != null)
                {
                    if (obeContratoExcel.Lista1.Count > 0)
                    {
                        lista1 = ucCustomSerializer.Serializar(obeContratoExcel.Lista1, '¦', '¯', false);
                    }
                }
                if (obeContratoExcel.Lista2 != null)
                {
                    if (obeContratoExcel.Lista2.Count > 0)
                    {
                        lista2 = ucCustomSerializer.Serializar(obeContratoExcel.Lista2, '¦', '¯', false);
                    }
                }
                if (obeContratoExcel.Lista3 != null)
                {
                    if (obeContratoExcel.Lista3.Count > 0)
                    {
                        lista3 = ucCustomSerializer.Serializar(obeContratoExcel.Lista3, '¦', '¯', false);
                    }
                }
            }
            rpta = String.Format("{0}¬{1}¬{2}", lista1, lista2, lista3);
            return rpta;
        }

        public string adicionarContratos(string ss, string lista1, string lista2, string lista3)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                brMedicoContrato obrMedicoContrato = new brMedicoContrato();
                bool exito = obrMedicoContrato.adicionarContratos(lista1, lista2, lista3, ((beUsuarioLogin)(Session["Usuario" + ss])).UsuarioId);
                if (exito) rpta = "OK";
            }
            return rpta;
        }

        public string leerArchivoExcel2()
        {
            string rpta = "";
            string contenido = "";
            StringBuilder sb = new StringBuilder();
            string contenidoFila = "";
            int nRegistros = 0;
            List<string> hojas = new List<string>();
            HttpPostedFileBase hpfb = (HttpPostedFileBase)Request.Files["archivo"];
            List<XmlDocument> docs = new List<XmlDocument>();
            List<string> nombres = new List<string>();
            List<string> valores = new List<string>();
            List<string> columnas = new List<string>();
            //Descomprimir el archivo Excel y guardar solo los archivos xml necesarios
            //en una Lista de objetos de tipo XmlDocument
            using (var zip = new ZipArchive(hpfb.InputStream, ZipArchiveMode.Read))
            {
                XmlDocument doc;
                foreach (var archivoXml in zip.Entries)
                {
                    if (archivoXml.Name == "workbook.xml" || archivoXml.Name == "sharedStrings.xml" || archivoXml.Name.StartsWith("sheet") && io.Path.GetExtension(archivoXml.Name) == ".xml")
                    {
                        using (io.Stream stream = archivoXml.Open())
                        {
                            doc = new XmlDocument();
                            doc.Load(stream);
                            docs.Add(doc);
                            nombres.Add(archivoXml.Name);
                        }
                    }
                }
            }
            if (docs.Count > 0)
            {
                //Leer el archivo xml donde se guardan los datos de tipo cadena
                int pos = nombres.IndexOf("sharedStrings.xml");
                if (pos > -1)
                {
                    XmlDocument xdStrings = docs[pos];
                    XmlElement nodoRaizStrings = xdStrings.DocumentElement;
                    XmlNodeList nodosValores = nodoRaizStrings.ChildNodes;
                    if (nodosValores != null)
                    {
                        foreach (XmlNode nodoValor in nodosValores)
                        {
                            valores.Add(nodoValor.FirstChild.FirstChild.Value);
                        }
                    }
                }
                //Leer el archivo xml workbook donde se guardan la lista de hojas
                pos = nombres.IndexOf("workbook.xml");
                if (pos > -1)
                {
                    XmlDocument xdLibro = docs[pos];
                    XmlElement nodoRaizHojas = xdLibro.DocumentElement;
                    XmlNodeList nodosHojas = nodoRaizHojas.GetElementsByTagName("sheet");
                    string id, hoja;
                    if (nodosHojas != null)
                    {
                        contenido = "";
                        int ch = 0;
                        foreach (XmlNode nodoHoja in nodosHojas)
                        {
                            id = nodoHoja.Attributes["r:id"].Value.Replace("rId", "");
                            hoja = nodoHoja.Attributes["name"].Value;
                            //Leer cada archivo xml con la hoja
                            pos = nombres.IndexOf("sheet" + id + ".xml");
                            if (pos > -1)
                            {
                                XmlDocument xdHoja = docs[pos];
                                XmlElement nodoRaizHoja = xdHoja.DocumentElement;
                                XmlNodeList nodosFilas = nodoRaizHoja.GetElementsByTagName("row");

                                int indice;
                                string celda, valor;
                                XmlAttribute tipoString;
                                contenido = "";
                                int cf = 0; //contador de filas
                                int cc = 0; //contador de columnas
                                XmlNode nodoCelda = null;
                                if (nodosFilas != null)
                                {
                                    foreach (XmlNode nodoFila in nodosFilas)
                                    {
                                        XmlNodeList nodoCeldas = nodoFila.ChildNodes;
                                        if (nodoCeldas != null)
                                        {
                                            if (cf == 0)
                                            {
                                                columnas = new List<string>();
                                                nRegistros = nodoCeldas.Count;
                                                for (int i = 0; i < nRegistros; i++)
                                                {
                                                    columnas.Add(nodoCeldas[i].Attributes["r"].Value.Replace(nodoFila.Attributes["r"].Value, ""));
                                                }
                                            }
                                            else
                                            {
                                                cc = 0;
                                                contenidoFila = "";
                                                nRegistros = columnas.Count;
                                                for (int i = 0; i < nRegistros; i++)
                                                {
                                                    nodoCelda = nodoCeldas[cc];
                                                    if (cc > 0) contenidoFila += "¦";
                                                    if (nodoCelda != null)
                                                    {
                                                        if (columnas[i] == nodoCelda.Attributes["r"].Value.Replace(nodoFila.Attributes["r"].Value, ""))
                                                        {
                                                            celda = nodoCelda.Attributes["r"].Value;
                                                            tipoString = nodoCelda.Attributes["t"];
                                                            valor = "";
                                                            if (tipoString != null)
                                                            {
                                                                if (valores != null && valores.Count > 0)
                                                                {
                                                                    indice = int.Parse(nodoCelda.FirstChild.FirstChild.Value);
                                                                    valor = valores[indice];
                                                                    contenidoFila += valor;
                                                                }
                                                            }
                                                            else
                                                            {
                                                                if (nodoCelda.FirstChild != null && nodoCelda.FirstChild.FirstChild != null)
                                                                {
                                                                    valor = nodoCelda.FirstChild.FirstChild.Value;
                                                                    contenidoFila += valor;
                                                                }
                                                            }
                                                            cc++;
                                                        }
                                                    }
                                                }
                                                if (cf < nodosFilas.Count - 1) contenidoFila += "¬";
                                                contenido += contenidoFila;
                                            }
                                        }
                                        cf++;
                                    }
                                }
                                hojas.Add(contenido);
                                //sb.AppendLine(contenido);
                            }
                            ch++;
                        }
                    }
                }
            }
            if (hojas.Count > 0) rpta = hojas[0];
            return rpta;
        }

        public string listasMedicoContratoDetalleporId(string ss, int id, int opc)
        {
            string rpta = "";
            brMedicoContrato obrMedicoContrato = new brMedicoContrato();
            string Lista = "";
            string Componente = "";
            string archivo = "";
            string archivocf = "";
            string listaCFijoDetalleOA = "";
            switch (opc)
            {
                case 1:
                    beProduccionFijaPorId obeProduccionFijaPorId = obrMedicoContrato.listarProduccionFijaCPorId(id);
                    if (obeProduccionFijaPorId != null)
                    {
                        if (obeProduccionFijaPorId.ListaProduccionFija != null && obeProduccionFijaPorId.ListaProduccionFija.Count > 0)
                        {
                            archivo = Server.MapPath("~//Files//EstaProduccionFijaCPorId.txt");
                            Lista = ucCustomSerializer.Serializar(obeProduccionFijaPorId.ListaProduccionFija, '¦', '¯', false, archivo, false, false, false);
                        }
                        if (obeProduccionFijaPorId.Componente != null && obeProduccionFijaPorId.Componente.Count > 0)
                        {
                            Componente = ucCustomSerializer.Serializar(obeProduccionFijaPorId.Componente, '¦', '¯', false);
                        }
                    }
                    break;
                case 2:
                    beProduccionFijaPorId obeProduccionFijaPorId2 = obrMedicoContrato.listarProduccionFijaBPorId(id);
                    if (obeProduccionFijaPorId2 != null)
                    {
                        if (obeProduccionFijaPorId2.ListaProduccionFija != null && obeProduccionFijaPorId2.ListaProduccionFija.Count > 0)
                        {
                            archivo = Server.MapPath("~//Files//EstaProduccionFijaBPorId.txt");
                            Lista = ucCustomSerializer.Serializar(obeProduccionFijaPorId2.ListaProduccionFija, '¦', '¯', false, archivo);
                        }
                        if (obeProduccionFijaPorId2.Componente != null && obeProduccionFijaPorId2.Componente.Count > 0)
                        {
                            Componente = ucCustomSerializer.Serializar(obeProduccionFijaPorId2.Componente, '¦', '¯', false);
                        }
                    }
                    break;
                case 3:
                    beProduccionEscalonadaPorId obeProduccionEscalonadaPorId = obrMedicoContrato.listarProduccionEscalonadaPorId(id);
                    if (obeProduccionEscalonadaPorId != null)
                    {
                        if (obeProduccionEscalonadaPorId.ListaProduccionEscalonada != null && obeProduccionEscalonadaPorId.ListaProduccionEscalonada.Count > 0)
                        {
                            archivo = Server.MapPath("~//Files//EstaProduccionEscalonadaPorId.txt");
                            Lista = ucCustomSerializer.Serializar(obeProduccionEscalonadaPorId.ListaProduccionEscalonada, '¦', '¯', false, archivo);
                        }
                        if (obeProduccionEscalonadaPorId.Componente != null && obeProduccionEscalonadaPorId.Componente.Count > 0)
                        {
                            Componente = ucCustomSerializer.Serializar(obeProduccionEscalonadaPorId.Componente, '¦', '¯', false);
                        }
                    }
                    break;
                case 4:
                    beMontoPorId obeMontoPorId = obrMedicoContrato.listarMontoPorId(id);
                    if (obeMontoPorId != null)
                    {
                        if (obeMontoPorId.ListaMonto != null && obeMontoPorId.ListaMonto.Count > 0)
                        {
                            archivo = Server.MapPath("~//Files//EstMontoPorId.txt");
                            Lista = ucCustomSerializer.Serializar(obeMontoPorId.ListaMonto, '¦', '¯', false, archivo);
                        }
                        if (obeMontoPorId.Componente != null && obeMontoPorId.Componente.Count > 0)
                        {
                            Componente = ucCustomSerializer.Serializar(obeMontoPorId.Componente, '¦', '¯', false);
                        }
                        if (obeMontoPorId.lArchivos != null && obeMontoPorId.lArchivos.Count > 0)
                        {
                            archivocf = ucCustomSerializer.Serializar(obeMontoPorId.lArchivos, '¦', '¯', false);
                        }
                        if (obeMontoPorId.lDetalleOAs != null && obeMontoPorId.lDetalleOAs.Count > 0)
                        {
                            listaCFijoDetalleOA = ucCustomSerializer.Serializar(obeMontoPorId.lDetalleOAs, '¦', '¯', false);
                        }
                    }
                    break;
                case 5:
                    beMedicoContratoHorarioPorId obeMedicoContratoHorarioPorId = obrMedicoContrato.listarContratoHorarioCPorId(id);
                    if (obeMedicoContratoHorarioPorId != null)
                    {
                        if (obeMedicoContratoHorarioPorId.ListaContratoHorario != null && obeMedicoContratoHorarioPorId.ListaContratoHorario.Count > 0)
                        {
                            archivo = Server.MapPath("~//Files//EstHorarioCPorId.txt");
                            Lista = ucCustomSerializer.Serializar(obeMedicoContratoHorarioPorId.ListaContratoHorario, '¦', '¯', false, archivo, true);
                        }
                        if (obeMedicoContratoHorarioPorId.Componente != null && obeMedicoContratoHorarioPorId.Componente.Count > 0)
                        {
                            Componente = ucCustomSerializer.Serializar(obeMedicoContratoHorarioPorId.Componente, '¦', '¯', false);
                        }
                    }
                    break;
                case 6:
                    beMedicoContratoHorarioPorId obeMedicoContratoHorarioPorId2 = obrMedicoContrato.listarContratoHorarioBPorId(id);
                    if (obeMedicoContratoHorarioPorId2 != null)
                    {
                        if (obeMedicoContratoHorarioPorId2.ListaContratoHorario != null && obeMedicoContratoHorarioPorId2.ListaContratoHorario.Count > 0)
                        {
                            archivo = Server.MapPath("~//Files//EstHorarioBPorId.txt");
                            Lista = ucCustomSerializer.Serializar(obeMedicoContratoHorarioPorId2.ListaContratoHorario, '¦', '¯', false, archivo);
                        }
                        if (obeMedicoContratoHorarioPorId2.Componente != null && obeMedicoContratoHorarioPorId2.Componente.Count > 0)
                        {
                            Componente = ucCustomSerializer.Serializar(obeMedicoContratoHorarioPorId2.Componente, '¦', '¯', false);
                        }
                    }
                    break;
                case 7:
                    beMedicoContratoTurnoPorId obeMedicoContratoTurnoPorId = obrMedicoContrato.listarContratoTurnoCPorId(id);
                    if (obeMedicoContratoTurnoPorId != null)
                    {
                        if (obeMedicoContratoTurnoPorId.ListaContratoTurno != null && obeMedicoContratoTurnoPorId.ListaContratoTurno.Count > 0)
                        {
                            archivo = Server.MapPath("~//Files//EstTurnoCPorId.txt");
                            Lista = ucCustomSerializer.Serializar(obeMedicoContratoTurnoPorId.ListaContratoTurno, '¦', '¯', false, archivo);
                        }
                        if (obeMedicoContratoTurnoPorId.Componente != null && obeMedicoContratoTurnoPorId.Componente.Count > 0)
                        {
                            Componente = ucCustomSerializer.Serializar(obeMedicoContratoTurnoPorId.Componente, '¦', '¯', false);
                        }
                    }
                    break;
                case 8:
                    beMedicoContratoTurnoPorId obeMedicoContratoTurnoPorId2 = obrMedicoContrato.listarContratoTurnoBPorId(id);
                    if (obeMedicoContratoTurnoPorId2 != null)
                    {
                        if (obeMedicoContratoTurnoPorId2.ListaContratoTurno != null && obeMedicoContratoTurnoPorId2.ListaContratoTurno.Count > 0)
                        {
                            archivo = Server.MapPath("~//Files//EstTurnoBPorId.txt");
                            Lista = ucCustomSerializer.Serializar(obeMedicoContratoTurnoPorId2.ListaContratoTurno, '¦', '¯', false, archivo);
                        }
                        if (obeMedicoContratoTurnoPorId2.Componente != null && obeMedicoContratoTurnoPorId2.Componente.Count > 0)
                        {
                            Componente = ucCustomSerializer.Serializar(obeMedicoContratoTurnoPorId2.Componente, '¦', '¯', false);
                        }
                    }
                    break;
                case 9:
                    beContratoCompartidoPorId obeContratoCompartidoPorId = obrMedicoContrato.listarContratoCompartidoPorId(id);
                    if (obeContratoCompartidoPorId != null)
                    {
                        if (obeContratoCompartidoPorId.ListaContratoCompartido != null && obeContratoCompartidoPorId.ListaContratoCompartido.Count > 0)
                        {
                            archivo = Server.MapPath("~//Files//EstCompartidoPorId.txt");
                            Lista = ucCustomSerializer.Serializar(obeContratoCompartidoPorId.ListaContratoCompartido, '¦', '¯', false, archivo);
                        }
                        if (obeContratoCompartidoPorId.Componente != null && obeContratoCompartidoPorId.Componente.Count > 0)
                        {
                            Componente = ucCustomSerializer.Serializar(obeContratoCompartidoPorId.Componente, '¦', '¯', false);
                        }
                    }
                    break;
                case 10:
                    beMedicoVacunaPorId obeMedicoVacunaPorId = obrMedicoContrato.listarVacunaPorId(id);
                    if (obeMedicoVacunaPorId != null)
                    {
                        if (obeMedicoVacunaPorId.ListaMedicoVacuna != null && obeMedicoVacunaPorId.ListaMedicoVacuna.Count > 0)
                        {
                            archivo = Server.MapPath("~//Files//EstVacunaPorId.txt");
                            Lista = ucCustomSerializer.Serializar(obeMedicoVacunaPorId.ListaMedicoVacuna, '¦', '¯', false, archivo);
                        }
                        if (obeMedicoVacunaPorId.Componente != null && obeMedicoVacunaPorId.Componente.Count > 0)
                        {
                            Componente = ucCustomSerializer.Serializar(obeMedicoVacunaPorId.Componente, '¦', '¯', false);
                        }
                    }
                    break;
            }
            rpta = String.Format("{0}¬{1}¬{2}¬{3}¬{4}", Lista, Componente, opc, archivocf, listaCFijoDetalleOA);
            return rpta;
        }

        public string listasMedicoContratoporId(string ss, int id, string su, int per)
        {
            string rpta = "";
            brMedicoContrato obrMedicoContrato = new brMedicoContrato();
            beMedicoContratoListar obeMedicoContratoListar = obrMedicoContrato.MedicoContratoListar(id);

            if (obeMedicoContratoListar != null)
            {
                string ListaAdjuntos = "";
                string ListaConfiguracionPago = "";
                string ListaProduccionConfiguracion = "";
                string ListaProduccionBonificacion = "";
                string ListaProduccionEscalonada = "";
                string ListaMonto = "";
                string ListaHorarioCalculo = "";
                string ListaHorarioBonificacion = "";
                string ListaTurnoCalculo = "";
                string ListaTurnoBonificacion = "";
                string ListaCompartido = "";
                string ListaVacuna = "";
                string ListaFeriado = "";
                string ListaObservacion = "";
                string ListaCorreoProveedor = "";
                string ListaExtorno = "";
                if (obeMedicoContratoListar.ListaAdjuntos != null && obeMedicoContratoListar.ListaAdjuntos.Count > 0)
                {
                    ListaAdjuntos = ucCustomSerializer.Serializar(obeMedicoContratoListar.ListaAdjuntos, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListar.ListaConfiguracionPago != null && obeMedicoContratoListar.ListaConfiguracionPago.Count > 0)
                {
                    ListaConfiguracionPago = ucCustomSerializer.Serializar(obeMedicoContratoListar.ListaConfiguracionPago, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListar.ListaProduccionConfiguracion != null && obeMedicoContratoListar.ListaProduccionConfiguracion.Count > 0)
                {
                    ListaProduccionConfiguracion = ucCustomSerializer.Serializar(obeMedicoContratoListar.ListaProduccionConfiguracion, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListar.ListaProduccionBonificacion != null && obeMedicoContratoListar.ListaProduccionBonificacion.Count > 0)
                {
                    ListaProduccionBonificacion = ucCustomSerializer.Serializar(obeMedicoContratoListar.ListaProduccionBonificacion, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListar.ListaProduccionEscalonada != null && obeMedicoContratoListar.ListaProduccionEscalonada.Count > 0)
                {
                    ListaProduccionEscalonada = ucCustomSerializer.Serializar(obeMedicoContratoListar.ListaProduccionEscalonada, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListar.ListaMonto != null && obeMedicoContratoListar.ListaMonto.Count > 0)
                {
                    ListaMonto = ucCustomSerializer.Serializar(obeMedicoContratoListar.ListaMonto, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListar.ListaHorarioCalculo != null && obeMedicoContratoListar.ListaHorarioCalculo.Count > 0)
                {
                    ListaHorarioCalculo = ucCustomSerializer.Serializar(obeMedicoContratoListar.ListaHorarioCalculo, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListar.ListaHorarioBonificacion != null && obeMedicoContratoListar.ListaHorarioBonificacion.Count > 0)
                {
                    ListaHorarioBonificacion = ucCustomSerializer.Serializar(obeMedicoContratoListar.ListaHorarioBonificacion, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListar.ListaTurnoCalculo != null && obeMedicoContratoListar.ListaTurnoCalculo.Count > 0)
                {
                    ListaTurnoCalculo = ucCustomSerializer.Serializar(obeMedicoContratoListar.ListaTurnoCalculo, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListar.ListaTurnoBonificacion != null && obeMedicoContratoListar.ListaTurnoBonificacion.Count > 0)
                {
                    ListaTurnoBonificacion = ucCustomSerializer.Serializar(obeMedicoContratoListar.ListaTurnoBonificacion, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListar.ListaCompartido != null && obeMedicoContratoListar.ListaCompartido.Count > 0)
                {
                    ListaCompartido = ucCustomSerializer.Serializar(obeMedicoContratoListar.ListaCompartido, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListar.ListaVacuna != null && obeMedicoContratoListar.ListaVacuna.Count > 0)
                {
                    ListaVacuna = ucCustomSerializer.Serializar(obeMedicoContratoListar.ListaVacuna, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListar.ListaFeriado != null && obeMedicoContratoListar.ListaFeriado.Count > 0)
                {
                    ListaFeriado = ucCustomSerializer.Serializar(obeMedicoContratoListar.ListaFeriado, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListar.ListaObservacion != null && obeMedicoContratoListar.ListaObservacion.Count > 0)
                {
                    ListaObservacion = ucCustomSerializer.Serializar(obeMedicoContratoListar.ListaObservacion, '¦', '¯', false, "");
                }
                if (obeMedicoContratoListar.ListaCorreoProveedor != null)
                {
                    ListaCorreoProveedor = ucCustomSerializer.SerializarObjeto(obeMedicoContratoListar.ListaCorreoProveedor, '¦');
                }
                List<beExtornoMontoFijo> lbeExtornoMontoFijo = obrMedicoContrato.obtenerExtornoMontoFijo(su, per);
                if (lbeExtornoMontoFijo != null)
                {
                    ListaExtorno = ucCustomSerializer.Serializar(lbeExtornoMontoFijo, '¦', '¯', false, "");
                }

                rpta = String.Format("{0}¬{1}¬{2}¬{3}¬{4}¬{5}¬{6}¬{7}¬{8}¬{9}¬{10}¬{11}¬{12}¬{13}¬{14}¬{15}", ListaAdjuntos, ListaConfiguracionPago, ListaProduccionConfiguracion, ListaProduccionBonificacion, ListaProduccionEscalonada, ListaMonto, ListaHorarioCalculo, ListaHorarioBonificacion, ListaTurnoCalculo, ListaTurnoBonificacion, ListaCompartido, ListaVacuna, ListaFeriado, ListaObservacion, ListaCorreoProveedor, ListaExtorno);
            }
            return rpta;
        }

        public string grabarMedicoContrato(string ss)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                if (Request.InputStream != null)
                {
                    int n = (int)Request.InputStream.Length;
                    byte[] buffer = new byte[n];
                    Request.InputStream.Read(buffer, 0, n);
                    string strContrato = Encoding.UTF8.GetString(buffer);
                    string[] Contratos = strContrato.Split('|');
                    bool indicador = bool.Parse(ConfigurationManager.AppSettings["IndicadorAutorizacionContrato"]);
                    if (Contratos[0] == "1")
                    {
                        string sucursal = Contratos[1];
                        int personaid = int.Parse(Contratos[2]);
                        DateTime fechainicio = DateTime.Parse(Contratos[3]);
                        DateTime fechafin = DateTime.Parse(Contratos[4]);
                        string observacion = Contratos[5];
                        int usuarioid = obeUsuarioLogin.UsuarioId;
                        brMedicoContrato obrMedicoContrato = new brMedicoContrato();
                        string data = obrMedicoContrato.adicionarMedicoContrato(sucursal, personaid, fechainicio, fechafin, observacion, usuarioid, indicador);
                        if (data != "")
                        {
                            rpta = string.Format("{0}¬1", data);
                        }
                    }
                    else
                    {
                        DateTime fechainicio = DateTime.Parse(Contratos[3]);
                        DateTime fechafin = DateTime.Parse(Contratos[4]);
                        string observacion = Contratos[5];
                        int medicoContratoId = int.Parse(Contratos[6]);
                        string opciones = Contratos[7];
                        int usuarioid = obeUsuarioLogin.UsuarioId;
                        brMedicoContrato obrMedicoContrato = new brMedicoContrato();
                        string data = obrMedicoContrato.actualizarMedicoContrato(medicoContratoId, fechainicio, fechafin, observacion, usuarioid, opciones, indicador);
                        if (data != "")
                        {
                            rpta = string.Format("{0}¬2", data);
                        }
                    }
                }
            }
            return rpta;
        }

        public string anularMedicoContrato(string ss, int id, string est)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                brMedicoContrato obrMedicoContrato = new brMedicoContrato();
                string data = obrMedicoContrato.actualizarEstadoMedicoContrato(id, est, obeUsuarioLogin.UsuarioId);
                if (data != "")
                {
                    rpta = string.Format("{0}¬3", data);
                }
            }
            return rpta;
        }

        public string grabarConfiguracionPagoDescuento(string ss)
        {

            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                if (Request.InputStream != null)
                {

                    int n = (int)Request.InputStream.Length;
                    byte[] buffer = new byte[n];
                    Request.InputStream.Read(buffer, 0, n);
                    string strContrato = Encoding.UTF8.GetString(buffer);
                    string[] Descuento = strContrato.Split('|');

                    beContratoDescuento obeContratoDescuento = new beContratoDescuento();



                    obeContratoDescuento.MedicoContratoDetalleId = int.Parse(Descuento[0]);
                    obeContratoDescuento.MedicoContratoId = int.Parse(Descuento[1]);
                    obeContratoDescuento.AplicaId = (Descuento[2] == "") ? 0 : int.Parse(Descuento[2]);
                    obeContratoDescuento.DescuentoId = (Descuento[3] == "") ? 0 : int.Parse(Descuento[3]);
                    obeContratoDescuento.TipoDescuentoId = (Descuento[4] == "") ? 0 : int.Parse(Descuento[4]);
                    obeContratoDescuento.TipoMontoId = Descuento[5];
                    obeContratoDescuento.Importe = (Descuento[6] == "") ? 0 : decimal.Parse(Descuento[6]);

                    obeContratoDescuento.FechaInicio = DateTime.Parse(Descuento[7]);
                    obeContratoDescuento.FechaFin = DateTime.Parse(Descuento[8]);
                    obeContratoDescuento.UsuarioId = obeUsuarioLogin.UsuarioId;

                    brMedicoContrato obrMedicoContrato = new brMedicoContrato();
                    string id = obrMedicoContrato.adicionarContratoDescuento(obeContratoDescuento);
                    if (!id.Equals("-1"))
                    {
                        rpta = string.Format("{0}¬1", id);
                    }
                    else
                    {
                        rpta = string.Format("ERROR¬{0}", id);
                    }



                }

            }

            return rpta;

        }
        public string grabarConfiguracionPago(string ss, int opc, string su = "")
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                if (Request.InputStream != null)
                {
                    string[] Contratos;
                    List<HttpPostedFileBase> archivoCf = null;
                    string eliminarArchivo = "";
                    string listaDetalleOA = "";
                    bool IndicadorAutorizacionContrato = bool.Parse(ConfigurationManager.AppSettings["IndicadorAutorizacionContrato"]);
                    if (opc == 4)
                    {
                        string data = Request.Form["cadena"];
                        eliminarArchivo = Request.Form["eliminar"];
                        listaDetalleOA = Request.Form["detalleOA"];
                        archivoCf = new List<HttpPostedFileBase>();
                        for (int i = 0; i < Request.Files.Count; i++)
                        {
                            archivoCf.Add(Request.Files[i]);
                        }
                        Contratos = data.Split('|');
                    }
                    else
                    {
                        int n = (int)Request.InputStream.Length;
                        byte[] buffer = new byte[n];
                        Request.InputStream.Read(buffer, 0, n);
                        string strContrato = Encoding.UTF8.GetString(buffer);
                        Contratos = strContrato.Split('|');
                    }


                    brMedicoContrato obrMedicoContrato = new brMedicoContrato();
                    switch (opc)
                    {
                        case 1:
                            beProduccionFija obeProduccionFijaConfiguracion = new beProduccionFija();
                            obeProduccionFijaConfiguracion.UsuarioId = obeUsuarioLogin.UsuarioId;
                            obeProduccionFijaConfiguracion.MedicoContratoId = int.Parse(Contratos[1]);
                            obeProduccionFijaConfiguracion.ConfiguracionPagoId = 1;
                            obeProduccionFijaConfiguracion.TipoRegistro = Contratos[2];
                            obeProduccionFijaConfiguracion.FechaInicio = DateTime.Parse(Contratos[3]);
                            obeProduccionFijaConfiguracion.FechaFin = DateTime.Parse(Contratos[4]);
                            obeProduccionFijaConfiguracion.TipoAtencionId = (Contratos[5] == "") ? 0 : int.Parse(Contratos[5]);
                            obeProduccionFijaConfiguracion.TipoAdmisionId = (Contratos[6] == "") ? 0 : int.Parse(Contratos[6]);
                            obeProduccionFijaConfiguracion.TipoPacienteId = (Contratos[7] == "") ? 0 : int.Parse(Contratos[7]);
                            obeProduccionFijaConfiguracion.AseguradoraId = (Contratos[8] == "") ? 0 : int.Parse(Contratos[8]);
                            obeProduccionFijaConfiguracion.EspecialidadId = (Contratos[9] == "") ? 0 : int.Parse(Contratos[9]);
                            obeProduccionFijaConfiguracion.TurnoId = (Contratos[10] == "") ? 0 : int.Parse(Contratos[10]);
                            obeProduccionFijaConfiguracion.TipoValor = Contratos[11];
                            obeProduccionFijaConfiguracion.Valor1 = (Contratos[12] == "") ? 0 : decimal.Parse(Contratos[12]);
                            obeProduccionFijaConfiguracion.Valor2 = (Contratos[13] == "") ? 0 : decimal.Parse(Contratos[13]);
                            obeProduccionFijaConfiguracion.AlcancePrestacion = Contratos[14];
                            obeProduccionFijaConfiguracion.TiempoPagoId = (Contratos[15] == "") ? 0 : int.Parse(Contratos[15]);
                            obeProduccionFijaConfiguracion.Operador = Contratos[16];
                            obeProduccionFijaConfiguracion.TipoDia = Contratos[17];
                            obeProduccionFijaConfiguracion.TipoFeriado = Contratos[18];
                            obeProduccionFijaConfiguracion.FechaFeriado = (Contratos[19] == "") ? DateTime.Parse("01/01/1900") : DateTime.Parse(Contratos[19]);
                            obeProduccionFijaConfiguracion.IndicadorLunes = (Contratos[20] == "True") ? true : false;
                            obeProduccionFijaConfiguracion.IndicadorMartes = (Contratos[21] == "True") ? true : false;
                            obeProduccionFijaConfiguracion.IndicadorMiercoles = (Contratos[22] == "True") ? true : false;
                            obeProduccionFijaConfiguracion.IndicadorJueves = (Contratos[23] == "True") ? true : false;
                            obeProduccionFijaConfiguracion.IndicadorViernes = (Contratos[24] == "True") ? true : false;
                            obeProduccionFijaConfiguracion.IndicadorSabado = (Contratos[25] == "True") ? true : false;
                            obeProduccionFijaConfiguracion.IndicadorDomingo = (Contratos[26] == "True") ? true : false;
                            obeProduccionFijaConfiguracion.ListaPrestaciones = Contratos[27];
                            obeProduccionFijaConfiguracion.ContratoId = (Contratos[28] == "") ? 0 : int.Parse(Contratos[28]);
                            obeProduccionFijaConfiguracion.ServicioId = (Contratos[29] == "") ? 0 : int.Parse(Contratos[29]);
                            obeProduccionFijaConfiguracion.TipoBonificacion = 0;
                            obeProduccionFijaConfiguracion.Modalidad = (Contratos[30] == "") ? 0 : int.Parse(Contratos[30]);
                            obeProduccionFijaConfiguracion.AplicacionId = (Contratos[31] == "") ? 1 : int.Parse(Contratos[31]);

                            if (Contratos[0] == "1")
                            {
                                int idMedicoContrato = obrMedicoContrato.adicionarProduccionFija(obeProduccionFijaConfiguracion, IndicadorAutorizacionContrato);
                                if (idMedicoContrato > -1)
                                {
                                    rpta = string.Format("{0}¬1¬{1}", idMedicoContrato, opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", idMedicoContrato);
                                }
                            }
                            else
                            {
                                int idDetalle = int.Parse(Contratos[32]);
                                int exito = obrMedicoContrato.actualizarProduccionFija(obeProduccionFijaConfiguracion, idDetalle, IndicadorAutorizacionContrato);
                                if (exito > -1)
                                {
                                    rpta = string.Format("{0}¬2¬{1}", Contratos[1], opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", exito);
                                }
                            }
                            break;
                        case 2:
                            beProduccionFija obeProduccionFijaConfiguracion2 = new beProduccionFija();
                            obeProduccionFijaConfiguracion2.UsuarioId = obeUsuarioLogin.UsuarioId;
                            obeProduccionFijaConfiguracion2.MedicoContratoId = int.Parse(Contratos[1]);
                            obeProduccionFijaConfiguracion2.ConfiguracionPagoId = 1;
                            obeProduccionFijaConfiguracion2.TipoRegistro = Contratos[2];
                            obeProduccionFijaConfiguracion2.FechaInicio = DateTime.Parse(Contratos[3]);
                            obeProduccionFijaConfiguracion2.FechaFin = DateTime.Parse(Contratos[4]);
                            obeProduccionFijaConfiguracion2.TipoAtencionId = (Contratos[5] == "") ? 0 : int.Parse(Contratos[5]);
                            obeProduccionFijaConfiguracion2.TipoAdmisionId = (Contratos[6] == "") ? 0 : int.Parse(Contratos[6]);
                            obeProduccionFijaConfiguracion2.TipoPacienteId = (Contratos[7] == "") ? 0 : int.Parse(Contratos[7]);
                            obeProduccionFijaConfiguracion2.AseguradoraId = (Contratos[8] == "") ? 0 : int.Parse(Contratos[8]);
                            obeProduccionFijaConfiguracion2.EspecialidadId = (Contratos[9] == "") ? 0 : int.Parse(Contratos[9]);
                            obeProduccionFijaConfiguracion2.TurnoId = (Contratos[10] == "") ? 0 : int.Parse(Contratos[10]);
                            obeProduccionFijaConfiguracion2.TipoValor = Contratos[11];
                            obeProduccionFijaConfiguracion2.Valor1 = (Contratos[12] == "") ? 0 : decimal.Parse(Contratos[12]);
                            obeProduccionFijaConfiguracion2.Valor2 = (Contratos[13] == "") ? 0 : decimal.Parse(Contratos[13]);
                            obeProduccionFijaConfiguracion2.AlcancePrestacion = Contratos[14];
                            obeProduccionFijaConfiguracion2.TiempoPagoId = (Contratos[15] == "") ? 0 : int.Parse(Contratos[15]);
                            obeProduccionFijaConfiguracion2.Operador = Contratos[16];
                            obeProduccionFijaConfiguracion2.TipoDia = Contratos[17];
                            obeProduccionFijaConfiguracion2.TipoFeriado = Contratos[18];
                            obeProduccionFijaConfiguracion2.FechaFeriado = (Contratos[19] == "") ? DateTime.Parse("01/01/1900") : DateTime.Parse(Contratos[19]);
                            obeProduccionFijaConfiguracion2.IndicadorLunes = (Contratos[20] == "True") ? true : false;
                            obeProduccionFijaConfiguracion2.IndicadorMartes = (Contratos[21] == "True") ? true : false;
                            obeProduccionFijaConfiguracion2.IndicadorMiercoles = (Contratos[22] == "True") ? true : false;
                            obeProduccionFijaConfiguracion2.IndicadorJueves = (Contratos[23] == "True") ? true : false;
                            obeProduccionFijaConfiguracion2.IndicadorViernes = (Contratos[24] == "True") ? true : false;
                            obeProduccionFijaConfiguracion2.IndicadorSabado = (Contratos[25] == "True") ? true : false;
                            obeProduccionFijaConfiguracion2.IndicadorDomingo = (Contratos[26] == "True") ? true : false;
                            obeProduccionFijaConfiguracion2.ListaPrestaciones = Contratos[27];
                            obeProduccionFijaConfiguracion2.ContratoId = 0;
                            obeProduccionFijaConfiguracion2.ServicioId = (Contratos[28] == "") ? 0 : int.Parse(Contratos[28]);
                            obeProduccionFijaConfiguracion2.TipoBonificacion = (Contratos[29] == "") ? 0 : int.Parse(Contratos[29]);
                            obeProduccionFijaConfiguracion2.Modalidad = (Contratos[30] == "") ? 0 : int.Parse(Contratos[30]);
                            if (Contratos[0] == "1")
                            {

                                int idMedicoContrato = obrMedicoContrato.adicionarProduccionFija(obeProduccionFijaConfiguracion2, IndicadorAutorizacionContrato);
                                if (idMedicoContrato > -1)
                                {
                                    rpta = string.Format("{0}¬1¬{1}", idMedicoContrato, opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", idMedicoContrato);
                                }
                            }
                            else
                            {
                                int idDetalle = int.Parse(Contratos[31]);
                                int exito = obrMedicoContrato.actualizarProduccionFija(obeProduccionFijaConfiguracion2, idDetalle, IndicadorAutorizacionContrato);
                                if (exito > -1)
                                {
                                    rpta = string.Format("{0}¬2¬{1}", Contratos[1], opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", exito);
                                }
                            }
                            break;
                        case 3:
                            beProduccionEscalonada obeProduccionEscalonada = new beProduccionEscalonada();
                            obeProduccionEscalonada.UsuarioId = obeUsuarioLogin.UsuarioId;
                            obeProduccionEscalonada.MedicoContratoId = int.Parse(Contratos[1]);
                            obeProduccionEscalonada.ConfiguracionPagoId = 2;
                            obeProduccionEscalonada.FechaInicio = DateTime.Parse(Contratos[2]);
                            obeProduccionEscalonada.FechaFin = DateTime.Parse(Contratos[3]);
                            obeProduccionEscalonada.TipoRango = Contratos[4];
                            obeProduccionEscalonada.Rango1 = (Contratos[5] == "") ? 0 : decimal.Parse(Contratos[5]);
                            obeProduccionEscalonada.Rango2 = (Contratos[6] == "") ? 0 : decimal.Parse(Contratos[6]);
                            obeProduccionEscalonada.ServicioId = (Contratos[7] == "") ? 0 : int.Parse(Contratos[7]);
                            obeProduccionEscalonada.TipoAtencionId = (Contratos[8] == "") ? 0 : int.Parse(Contratos[8]);
                            obeProduccionEscalonada.TipoAdmisionId = (Contratos[9] == "") ? 0 : int.Parse(Contratos[9]);
                            obeProduccionEscalonada.TipoPacienteId = (Contratos[10] == "") ? 0 : int.Parse(Contratos[10]);
                            obeProduccionEscalonada.AseguradoraId = (Contratos[11] == "") ? 0 : int.Parse(Contratos[11]);
                            obeProduccionEscalonada.EspecialidadId = (Contratos[12] == "") ? 0 : int.Parse(Contratos[12]);
                            obeProduccionEscalonada.TipoValor = Contratos[13];
                            obeProduccionEscalonada.Valor1 = (Contratos[14] == "") ? 0 : decimal.Parse(Contratos[14]);
                            obeProduccionEscalonada.Valor2 = (Contratos[15] == "") ? 0 : decimal.Parse(Contratos[15]);
                            obeProduccionEscalonada.Aplicacion = Contratos[16];
                            obeProduccionEscalonada.TipoCalculo = Contratos[17];
                            obeProduccionEscalonada.AlcancePrestacion = Contratos[18];
                            obeProduccionEscalonada.TiempoPagoId = (Contratos[19] == "") ? 0 : int.Parse(Contratos[19]);
                            obeProduccionEscalonada.ListaPrestaciones = Contratos[20];
                            if (Contratos[0] == "1")
                            {
                                int idMedicoContrato = obrMedicoContrato.adicionarProduccionEscalonada(obeProduccionEscalonada, IndicadorAutorizacionContrato);
                                if (idMedicoContrato > -1)
                                {
                                    rpta = string.Format("{0}¬1¬{1}", idMedicoContrato, opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", idMedicoContrato);
                                }
                            }
                            else
                            {
                                int idDetalle = int.Parse(Contratos[21]);
                                bool exito = obrMedicoContrato.actualizarProduccionEscalonada(obeProduccionEscalonada, idDetalle, IndicadorAutorizacionContrato);
                                if (exito)
                                {
                                    rpta = string.Format("{0}¬2¬{1}", Contratos[1], opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", Contratos[1]);
                                }
                            }
                            break;
                        case 4:
                            beMonto obeMonto = new beMonto();
                            obeMonto.UsuarioId = obeUsuarioLogin.UsuarioId;
                            obeMonto.MedicoContratoId = int.Parse(Contratos[1]);
                            obeMonto.ConfiguracionPagoId = 3;
                            obeMonto.Descripcion = Contratos[2];
                            obeMonto.FechaInicio = DateTime.Parse(Contratos[3]);
                            obeMonto.FechaFin = DateTime.Parse(Contratos[4]);
                            obeMonto.Valor1 = (Contratos[5] == "") ? 0 : decimal.Parse(Contratos[5]);
                            obeMonto.Periodo = Contratos[6];
                            obeMonto.AlcancePrestacion = Contratos[7];
                            obeMonto.TiempoPagoId = (Contratos[8] == "") ? 0 : int.Parse(Contratos[8]);
                            obeMonto.TurnoId = (Contratos[9] == "") ? 0 : int.Parse(Contratos[9]);
                            obeMonto.HoraInicio = (Contratos[10] == "") ? "01/01/1900" : Contratos[10];
                            obeMonto.HoraFin = (Contratos[11] == "") ? "01/01/1900" : Contratos[11];
                            obeMonto.ListaPrestacion = Contratos[12];
                            obeMonto.ConceptoMontoFijoId = (Contratos[13] == "") ? 0 : int.Parse(Contratos[13]);
                            obeMonto.TipoRegistro = Contratos[14];
                            obeMonto.MesProduccionMF = (Contratos[15] == "") ? 0 : int.Parse(Contratos[15]);
                            obeMonto.AnioProduccionMF = (Contratos[16] == "") ? 0 : int.Parse(Contratos[16]);
                            if (Contratos[0] == "1")
                            {
                                int idMedicoContrato = obrMedicoContrato.adicionarMonto(obeMonto, IndicadorAutorizacionContrato);
                                if (idMedicoContrato > -1)
                                {
                                    rpta = string.Format("{0}¬1¬{1}", idMedicoContrato, opc);
                                    if (archivoCf != null && archivoCf.Count > 0)
                                    {
                                        bool exito = grabarAdjuntoDetalle(archivoCf, idMedicoContrato, obeUsuarioLogin.UsuarioId, su, int.Parse(Contratos[1]), obeUsuarioLogin.IdCompania);
                                    }

                                    beMedicoContratoAdjuntar obeMedicoContratoDetalleImportar = new beMedicoContratoAdjuntar();
                                    obeMedicoContratoDetalleImportar.MedicoContratoId = idMedicoContrato;
                                    obeMedicoContratoDetalleImportar.NombreArchivo = listaDetalleOA;
                                    if (!listaDetalleOA.Equals("E") && !listaDetalleOA.Equals("A") && !listaDetalleOA.Equals(""))
                                    {
                                        int rowsImportar = obrMedicoContrato.adicionarMedicoContratoDetalleImportar(obeMedicoContratoDetalleImportar, obeUsuarioLogin.UsuarioId);
                                    }
                                }
                                if (idMedicoContrato == -1)
                                {
                                    rpta = string.Format("ERROR¬{0}", idMedicoContrato);
                                }
                                if (idMedicoContrato == -2)
                                {
                                    rpta = "-2¬-2";
                                }
                            }
                            else
                            {
                                int idDetalle = int.Parse(Contratos[17]);
                                int exito = obrMedicoContrato.actualizarMonto(obeMonto, idDetalle, IndicadorAutorizacionContrato);
                                if (exito > -1)
                                {
                                    rpta = string.Format("{0}¬2¬{1}", Contratos[1], opc);
                                    if (eliminarArchivo != "" && IndicadorAutorizacionContrato == false)
                                    {
                                        EliminarArchivoCf(eliminarArchivo, obeUsuarioLogin.UsuarioId, su, int.Parse(Contratos[1]), obeUsuarioLogin.IdCompania);
                                    }
                                    if (archivoCf != null && archivoCf.Count > 0)
                                    {
                                        bool exito2 = grabarAdjuntoDetalle(archivoCf, idDetalle, obeUsuarioLogin.UsuarioId, su, int.Parse(Contratos[1]), obeUsuarioLogin.IdCompania);
                                    }

                                    beMedicoContratoAdjuntar obeMedicoContratoDetalleImportar = new beMedicoContratoAdjuntar();
                                    obeMedicoContratoDetalleImportar.MedicoContratoId = idDetalle;
                                    obeMedicoContratoDetalleImportar.NombreArchivo = listaDetalleOA;
                                    if (listaDetalleOA.Equals("E") || listaDetalleOA.Equals("A"))
                                    {
                                        int rowsImportar = obrMedicoContrato.actualizarMedicoContratoDetalleImportar(idDetalle, obeUsuarioLogin.UsuarioId);
                                    }
                                    if (!listaDetalleOA.Equals("E") && !listaDetalleOA.Equals("A") && !listaDetalleOA.Equals(""))
                                    {
                                        int rowsImportarEliminar = obrMedicoContrato.actualizarMedicoContratoDetalleImportar(idDetalle, obeUsuarioLogin.UsuarioId);
                                        int rowsImportar = obrMedicoContrato.adicionarMedicoContratoDetalleImportar(obeMedicoContratoDetalleImportar, obeUsuarioLogin.UsuarioId);
                                    }
                                }
                                if (exito == -1)
                                {
                                    rpta = string.Format("ERROR¬{0}", idDetalle);
                                }
                                if (exito == -2)
                                {
                                    rpta = "-2¬-2";
                                }
                            }
                            break;
                        case 5:
                            beMedicoContratoHorario obeMedicoContratoHorario = new beMedicoContratoHorario();
                            obeMedicoContratoHorario.UsuarioId = obeUsuarioLogin.UsuarioId;
                            obeMedicoContratoHorario.MedicoContratoId = int.Parse(Contratos[1]);
                            obeMedicoContratoHorario.ConfiguracionPagoId = 4;
                            obeMedicoContratoHorario.TipoRegistro = Contratos[2];
                            obeMedicoContratoHorario.FechaInicio = DateTime.Parse(Contratos[3]);
                            obeMedicoContratoHorario.FechaFin = DateTime.Parse(Contratos[4]);
                            obeMedicoContratoHorario.TipoAtencionId = (Contratos[5] == "") ? 0 : int.Parse(Contratos[5]);
                            obeMedicoContratoHorario.TipoAdmisionId = (Contratos[6] == "") ? 0 : int.Parse(Contratos[6]);
                            obeMedicoContratoHorario.TipoPacienteId = (Contratos[7] == "") ? 0 : int.Parse(Contratos[7]);
                            obeMedicoContratoHorario.AseguradoraId = (Contratos[8] == "") ? 0 : int.Parse(Contratos[8]);
                            obeMedicoContratoHorario.EspecialidadId = (Contratos[9] == "") ? 0 : int.Parse(Contratos[9]);
                            obeMedicoContratoHorario.TipoDia = Contratos[10];
                            obeMedicoContratoHorario.TurnoId = (Contratos[11] == "") ? 0 : int.Parse(Contratos[11]);
                            obeMedicoContratoHorario.TipoValor = Contratos[12];
                            obeMedicoContratoHorario.Valor1 = (Contratos[13] == "") ? 0 : decimal.Parse(Contratos[13]);
                            obeMedicoContratoHorario.AlcancePrestacion = Contratos[14];
                            obeMedicoContratoHorario.TiempoPagoId = (Contratos[15] == "") ? 0 : int.Parse(Contratos[15]);
                            obeMedicoContratoHorario.Operador = Contratos[16];
                            obeMedicoContratoHorario.TipoFeriado = Contratos[17];
                            obeMedicoContratoHorario.FechaFeriado = (Contratos[18] == "") ? DateTime.Parse("01/01/1900") : DateTime.Parse(Contratos[18]);
                            obeMedicoContratoHorario.IndicadorLunes = (Contratos[19] == "True") ? true : false;
                            obeMedicoContratoHorario.IndicadorMartes = (Contratos[20] == "True") ? true : false;
                            obeMedicoContratoHorario.IndicadorMiercoles = (Contratos[21] == "True") ? true : false;
                            obeMedicoContratoHorario.IndicadorJueves = (Contratos[22] == "True") ? true : false;
                            obeMedicoContratoHorario.IndicadorViernes = (Contratos[23] == "True") ? true : false;
                            obeMedicoContratoHorario.IndicadorSabado = (Contratos[24] == "True") ? true : false;
                            obeMedicoContratoHorario.IndicadorDomingo = (Contratos[25] == "True") ? true : false;
                            obeMedicoContratoHorario.ListaPrestaciones = Contratos[26];
                            obeMedicoContratoHorario.HoraInicio = (Contratos[27] == "") ? "01/01/1900" : Contratos[27];
                            obeMedicoContratoHorario.HoraFin = (Contratos[28] == "") ? "01/01/1900" : Contratos[28];
                            obeMedicoContratoHorario.TipoBonificacion = 0;
                            if (Contratos[0] == "1")
                            {
                                int idMedicoContrato = obrMedicoContrato.adicionarMedicoContratoHorario(obeMedicoContratoHorario, IndicadorAutorizacionContrato);
                                if (idMedicoContrato > -1)
                                {
                                    rpta = string.Format("{0}¬1¬{1}", idMedicoContrato, opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", idMedicoContrato);
                                }
                            }
                            else
                            {
                                int idDetalle = int.Parse(Contratos[29]);
                                bool exito = obrMedicoContrato.actualizarMedicoContratoHorario(obeMedicoContratoHorario, idDetalle, IndicadorAutorizacionContrato);
                                if (exito)
                                {
                                    rpta = string.Format("{0}¬2¬{1}", Contratos[1], opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", Contratos[1]);
                                }
                            }
                            break;
                        case 6:
                            beMedicoContratoHorario obeMedicoContratoHorario2 = new beMedicoContratoHorario();
                            obeMedicoContratoHorario2.UsuarioId = obeUsuarioLogin.UsuarioId;
                            obeMedicoContratoHorario2.MedicoContratoId = int.Parse(Contratos[1]);
                            obeMedicoContratoHorario2.ConfiguracionPagoId = 4;
                            obeMedicoContratoHorario2.TipoRegistro = Contratos[2];
                            obeMedicoContratoHorario2.FechaInicio = DateTime.Parse(Contratos[3]);
                            obeMedicoContratoHorario2.FechaFin = DateTime.Parse(Contratos[4]);
                            obeMedicoContratoHorario2.TipoAtencionId = (Contratos[5] == "") ? 0 : int.Parse(Contratos[5]);
                            obeMedicoContratoHorario2.TipoAdmisionId = (Contratos[6] == "") ? 0 : int.Parse(Contratos[6]);
                            obeMedicoContratoHorario2.TipoPacienteId = (Contratos[7] == "") ? 0 : int.Parse(Contratos[7]);
                            obeMedicoContratoHorario2.AseguradoraId = (Contratos[8] == "") ? 0 : int.Parse(Contratos[8]);
                            obeMedicoContratoHorario2.EspecialidadId = (Contratos[9] == "") ? 0 : int.Parse(Contratos[9]);
                            obeMedicoContratoHorario2.TipoDia = Contratos[10];
                            obeMedicoContratoHorario2.TurnoId = (Contratos[11] == "") ? 0 : int.Parse(Contratos[11]);
                            obeMedicoContratoHorario2.TipoValor = Contratos[12];
                            obeMedicoContratoHorario2.Valor1 = (Contratos[13] == "") ? 0 : decimal.Parse(Contratos[13]);
                            obeMedicoContratoHorario2.AlcancePrestacion = Contratos[14];
                            obeMedicoContratoHorario2.TiempoPagoId = (Contratos[15] == "") ? 0 : int.Parse(Contratos[15]);
                            obeMedicoContratoHorario2.Operador = Contratos[16];
                            obeMedicoContratoHorario2.TipoFeriado = Contratos[17];
                            obeMedicoContratoHorario2.FechaFeriado = (Contratos[18] == "") ? DateTime.Parse("01/01/1900") : DateTime.Parse(Contratos[18]);
                            obeMedicoContratoHorario2.IndicadorLunes = (Contratos[19] == "True") ? true : false;
                            obeMedicoContratoHorario2.IndicadorMartes = (Contratos[20] == "True") ? true : false;
                            obeMedicoContratoHorario2.IndicadorMiercoles = (Contratos[21] == "True") ? true : false;
                            obeMedicoContratoHorario2.IndicadorJueves = (Contratos[22] == "True") ? true : false;
                            obeMedicoContratoHorario2.IndicadorViernes = (Contratos[23] == "True") ? true : false;
                            obeMedicoContratoHorario2.IndicadorSabado = (Contratos[24] == "True") ? true : false;
                            obeMedicoContratoHorario2.IndicadorDomingo = (Contratos[25] == "True") ? true : false;
                            obeMedicoContratoHorario2.ListaPrestaciones = Contratos[26];
                            obeMedicoContratoHorario2.TipoBonificacion = (Contratos[27] == "") ? 0 : int.Parse(Contratos[27]);
                            obeMedicoContratoHorario2.HoraInicio = "01/01/1900";
                            obeMedicoContratoHorario2.HoraFin = "01/01/1900";
                            if (Contratos[0] == "1")
                            {
                                int idMedicoContrato = obrMedicoContrato.adicionarMedicoContratoHorario(obeMedicoContratoHorario2, IndicadorAutorizacionContrato);
                                if (idMedicoContrato > -1)
                                {
                                    rpta = string.Format("{0}¬1¬{1}", idMedicoContrato, opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", idMedicoContrato);
                                }
                            }
                            else
                            {
                                int idDetalle = int.Parse(Contratos[28]);
                                bool exito = obrMedicoContrato.actualizarMedicoContratoHorario(obeMedicoContratoHorario2, idDetalle, IndicadorAutorizacionContrato);
                                if (exito)
                                {
                                    rpta = string.Format("{0}¬2¬{1}", Contratos[1], opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", Contratos[1]);
                                }
                            }
                            break;
                        case 7:
                            beMedicoContratoTurno obeMedicoContratoTurno = new beMedicoContratoTurno();
                            obeMedicoContratoTurno.UsuarioId = obeUsuarioLogin.UsuarioId;
                            obeMedicoContratoTurno.MedicoContratoId = int.Parse(Contratos[1]);
                            obeMedicoContratoTurno.ConfiguracionPagoId = 5;
                            obeMedicoContratoTurno.TipoRegistro = Contratos[2];
                            obeMedicoContratoTurno.FechaInicio = DateTime.Parse(Contratos[3]);
                            obeMedicoContratoTurno.FechaFin = DateTime.Parse(Contratos[4]);
                            obeMedicoContratoTurno.TipoAtencionId = (Contratos[5] == "") ? 0 : int.Parse(Contratos[5]);
                            obeMedicoContratoTurno.TipoAdmisionId = (Contratos[6] == "") ? 0 : int.Parse(Contratos[6]);
                            obeMedicoContratoTurno.TipoPacienteId = (Contratos[7] == "") ? 0 : int.Parse(Contratos[7]);
                            obeMedicoContratoTurno.AseguradoraId = (Contratos[8] == "") ? 0 : int.Parse(Contratos[8]);
                            obeMedicoContratoTurno.EspecialidadId = (Contratos[9] == "") ? 0 : int.Parse(Contratos[9]);
                            obeMedicoContratoTurno.TipoDia = Contratos[10];
                            obeMedicoContratoTurno.TurnoId = (Contratos[11] == "") ? 0 : int.Parse(Contratos[11]);
                            obeMedicoContratoTurno.TipoValor = Contratos[12];
                            obeMedicoContratoTurno.CantidadHora = (Contratos[13] == "") ? 0 : int.Parse(Contratos[13]);
                            obeMedicoContratoTurno.Valor1 = (Contratos[14] == "") ? 0 : decimal.Parse(Contratos[14]);
                            obeMedicoContratoTurno.AlcancePrestacion = Contratos[15];
                            obeMedicoContratoTurno.TiempoPagoId = (Contratos[16] == "") ? 0 : int.Parse(Contratos[16]);
                            obeMedicoContratoTurno.Operador = Contratos[17];
                            obeMedicoContratoTurno.TipoFeriado = Contratos[18];
                            obeMedicoContratoTurno.FechaFeriado = (Contratos[19] == "") ? DateTime.Parse("01/01/1900") : DateTime.Parse(Contratos[19]);
                            obeMedicoContratoTurno.IndicadorLunes = (Contratos[20] == "True") ? true : false;
                            obeMedicoContratoTurno.IndicadorMartes = (Contratos[21] == "True") ? true : false;
                            obeMedicoContratoTurno.IndicadorMiercoles = (Contratos[22] == "True") ? true : false;
                            obeMedicoContratoTurno.IndicadorJueves = (Contratos[23] == "True") ? true : false;
                            obeMedicoContratoTurno.IndicadorViernes = (Contratos[24] == "True") ? true : false;
                            obeMedicoContratoTurno.IndicadorSabado = (Contratos[25] == "True") ? true : false;
                            obeMedicoContratoTurno.IndicadorDomingo = (Contratos[26] == "True") ? true : false;
                            obeMedicoContratoTurno.CantidadAtencionMinima = (Contratos[27] == "") ? 0 : decimal.Parse(Contratos[27]);
                            obeMedicoContratoTurno.MontoAtencionMinima = (Contratos[28] == "") ? 0 : decimal.Parse(Contratos[28]);
                            obeMedicoContratoTurno.ListaPrestaciones = Contratos[29];
                            obeMedicoContratoTurno.HoraInicio = (Contratos[30] == "") ? "01/01/1900" : Contratos[30];
                            obeMedicoContratoTurno.HoraFin = (Contratos[31] == "") ? "01/01/1900" : Contratos[31];
                            obeMedicoContratoTurno.TipoBonificacion = 0;
                            if (Contratos[0] == "1")
                            {

                                int idMedicoContrato = obrMedicoContrato.adicionarMedicoContratoTurno(obeMedicoContratoTurno, IndicadorAutorizacionContrato);
                                if (idMedicoContrato > -1)
                                {
                                    rpta = string.Format("{0}¬1¬{1}", idMedicoContrato, opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", idMedicoContrato);
                                }
                            }
                            else
                            {
                                int idDetalle = int.Parse(Contratos[32]);
                                bool exito = obrMedicoContrato.actualizarMedicoContratoTurno(obeMedicoContratoTurno, idDetalle, IndicadorAutorizacionContrato);
                                if (exito)
                                {
                                    rpta = string.Format("{0}¬2¬{1}", Contratos[1], opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", Contratos[1]);
                                }
                            }
                            break;
                        case 8:
                            beMedicoContratoTurno obeMedicoContratoTurno2 = new beMedicoContratoTurno();
                            obeMedicoContratoTurno2.UsuarioId = obeUsuarioLogin.UsuarioId;
                            obeMedicoContratoTurno2.MedicoContratoId = int.Parse(Contratos[1]);
                            obeMedicoContratoTurno2.ConfiguracionPagoId = 5;
                            obeMedicoContratoTurno2.TipoRegistro = Contratos[2];
                            obeMedicoContratoTurno2.FechaInicio = DateTime.Parse(Contratos[3]);
                            obeMedicoContratoTurno2.FechaFin = DateTime.Parse(Contratos[4]);
                            obeMedicoContratoTurno2.TipoAtencionId = (Contratos[5] == "") ? 0 : int.Parse(Contratos[5]);
                            obeMedicoContratoTurno2.TipoAdmisionId = (Contratos[6] == "") ? 0 : int.Parse(Contratos[6]);
                            obeMedicoContratoTurno2.TipoPacienteId = (Contratos[7] == "") ? 0 : int.Parse(Contratos[7]);
                            obeMedicoContratoTurno2.AseguradoraId = (Contratos[8] == "") ? 0 : int.Parse(Contratos[8]);
                            obeMedicoContratoTurno2.EspecialidadId = (Contratos[9] == "") ? 0 : int.Parse(Contratos[9]);
                            obeMedicoContratoTurno2.TipoDia = Contratos[10];
                            obeMedicoContratoTurno2.TurnoId = (Contratos[11] == "") ? 0 : int.Parse(Contratos[11]);
                            obeMedicoContratoTurno2.TipoValor = Contratos[12];
                            obeMedicoContratoTurno2.CantidadHora = (Contratos[13] == "") ? 0 : int.Parse(Contratos[13]);
                            obeMedicoContratoTurno2.Valor1 = (Contratos[14] == "") ? 0 : decimal.Parse(Contratos[14]);
                            obeMedicoContratoTurno2.AlcancePrestacion = Contratos[15];
                            obeMedicoContratoTurno2.TiempoPagoId = (Contratos[16] == "") ? 0 : int.Parse(Contratos[16]);
                            obeMedicoContratoTurno2.Operador = Contratos[17];
                            obeMedicoContratoTurno2.TipoFeriado = Contratos[18];
                            obeMedicoContratoTurno2.FechaFeriado = (Contratos[19] == "") ? DateTime.Parse("01/01/1900") : DateTime.Parse(Contratos[19]);
                            obeMedicoContratoTurno2.IndicadorLunes = (Contratos[20] == "True") ? true : false;
                            obeMedicoContratoTurno2.IndicadorMartes = (Contratos[21] == "True") ? true : false;
                            obeMedicoContratoTurno2.IndicadorMiercoles = (Contratos[22] == "True") ? true : false;
                            obeMedicoContratoTurno2.IndicadorJueves = (Contratos[23] == "True") ? true : false;
                            obeMedicoContratoTurno2.IndicadorViernes = (Contratos[24] == "True") ? true : false;
                            obeMedicoContratoTurno2.IndicadorSabado = (Contratos[25] == "True") ? true : false;
                            obeMedicoContratoTurno2.IndicadorDomingo = (Contratos[26] == "True") ? true : false;
                            obeMedicoContratoTurno2.CantidadAtencionMinima = (Contratos[27] == "") ? 0 : decimal.Parse(Contratos[27]);
                            obeMedicoContratoTurno2.MontoAtencionMinima = (Contratos[28] == "") ? 0 : decimal.Parse(Contratos[28]);
                            obeMedicoContratoTurno2.ListaPrestaciones = Contratos[29];
                            obeMedicoContratoTurno2.TipoBonificacion = (Contratos[30] == "") ? 0 : int.Parse(Contratos[30]);
                            obeMedicoContratoTurno2.HoraInicio = "01/01/1900";
                            obeMedicoContratoTurno2.HoraFin = "01/01/1900";
                            if (Contratos[0] == "1")
                            {

                                int idMedicoContrato = obrMedicoContrato.adicionarMedicoContratoTurno(obeMedicoContratoTurno2, IndicadorAutorizacionContrato);
                                if (idMedicoContrato > -1)
                                {
                                    rpta = string.Format("{0}¬1¬{1}", idMedicoContrato, opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", idMedicoContrato);
                                }
                            }
                            else
                            {
                                int idDetalle = int.Parse(Contratos[31]);
                                bool exito = obrMedicoContrato.actualizarMedicoContratoTurno(obeMedicoContratoTurno2, idDetalle, IndicadorAutorizacionContrato);
                                if (exito)
                                {
                                    rpta = string.Format("{0}¬2¬{1}", Contratos[1], opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", Contratos[1]);
                                }
                            }
                            break;
                        case 9:
                            beContratoCompartido obeContratoCompartido = new beContratoCompartido();
                            obeContratoCompartido.UsuarioId = obeUsuarioLogin.UsuarioId;
                            obeContratoCompartido.MedicoContratoId = int.Parse(Contratos[1]);
                            obeContratoCompartido.ConfiguracionPagoId = 6;
                            obeContratoCompartido.FechaInicio = DateTime.Parse(Contratos[2]);
                            obeContratoCompartido.FechaFin = DateTime.Parse(Contratos[3]);
                            obeContratoCompartido.TipoAtencionId = (Contratos[4] == "") ? 0 : int.Parse(Contratos[4]);
                            obeContratoCompartido.TipoAdmisionId = (Contratos[5] == "") ? 0 : int.Parse(Contratos[5]);
                            obeContratoCompartido.TipoPacienteId = (Contratos[6] == "") ? 0 : int.Parse(Contratos[6]);
                            obeContratoCompartido.AseguradoraId = (Contratos[7] == "") ? 0 : int.Parse(Contratos[7]);
                            obeContratoCompartido.EspecialidadId = (Contratos[8] == "") ? 0 : int.Parse(Contratos[8]);
                            obeContratoCompartido.TipoValor = Contratos[9];
                            obeContratoCompartido.Valor1 = (Contratos[10] == "") ? 0 : decimal.Parse(Contratos[10]);
                            obeContratoCompartido.Valor2 = (Contratos[11] == "") ? 0 : decimal.Parse(Contratos[11]);
                            obeContratoCompartido.AlcancePrestacion = Contratos[12];
                            obeContratoCompartido.TiempoPagoId = (Contratos[13] == "") ? 0 : int.Parse(Contratos[13]);
                            obeContratoCompartido.ListaPrestaciones = Contratos[14];
                            obeContratoCompartido.ServicioId = (Contratos[15] == "") ? 0 : int.Parse(Contratos[15]);
                            if (Contratos[0] == "1")
                            {

                                int idMedicoContrato = obrMedicoContrato.adicionarContratoCompartido(obeContratoCompartido, IndicadorAutorizacionContrato);
                                if (idMedicoContrato > -1)
                                {
                                    rpta = string.Format("{0}¬1¬{1}", idMedicoContrato, opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", idMedicoContrato);
                                }
                            }
                            else
                            {
                                int idDetalle = int.Parse(Contratos[16]);
                                bool exito = obrMedicoContrato.actualizarContratoCompartido(obeContratoCompartido, idDetalle, IndicadorAutorizacionContrato);
                                if (exito)
                                {
                                    rpta = string.Format("{0}¬2¬{1}", Contratos[1], opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", Contratos[1]);
                                }
                            }
                            break;
                        case 10:
                            beMedicoVacuna obeMedicoVacuna = new beMedicoVacuna();
                            obeMedicoVacuna.UsuarioId = obeUsuarioLogin.UsuarioId;
                            obeMedicoVacuna.MedicoContratoId = int.Parse(Contratos[1]);
                            obeMedicoVacuna.ConfiguracionPagoId = 7;
                            obeMedicoVacuna.FechaInicio = DateTime.Parse(Contratos[2]);
                            obeMedicoVacuna.FechaFin = DateTime.Parse(Contratos[3]);
                            obeMedicoVacuna.TipoAtencionId = (Contratos[4] == "") ? 0 : int.Parse(Contratos[4]);
                            obeMedicoVacuna.TipoAdmisionId = (Contratos[5] == "") ? 0 : int.Parse(Contratos[5]);
                            obeMedicoVacuna.TipoPacienteId = (Contratos[6] == "") ? 0 : int.Parse(Contratos[6]);
                            obeMedicoVacuna.AseguradoraId = (Contratos[7] == "") ? 0 : int.Parse(Contratos[7]);
                            obeMedicoVacuna.EspecialidadId = (Contratos[8] == "") ? 0 : int.Parse(Contratos[8]);
                            obeMedicoVacuna.TipoValor = Contratos[9];
                            obeMedicoVacuna.Valor1 = (Contratos[10] == "") ? 0 : decimal.Parse(Contratos[10]);
                            obeMedicoVacuna.Valor2 = (Contratos[11] == "") ? 0 : decimal.Parse(Contratos[11]);
                            obeMedicoVacuna.AlcanceArticulo = Contratos[12];
                            obeMedicoVacuna.TiempoPagoId = (Contratos[13] == "") ? 0 : int.Parse(Contratos[13]);
                            obeMedicoVacuna.ListaPrestaciones = Contratos[14];
                            if (Contratos[0] == "1")
                            {

                                int idMedicoContrato = obrMedicoContrato.adicionarMedicoVacuna(obeMedicoVacuna, IndicadorAutorizacionContrato);
                                if (idMedicoContrato > -1)
                                {
                                    rpta = string.Format("{0}¬1¬{1}", idMedicoContrato, opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", idMedicoContrato);
                                }
                            }
                            else
                            {
                                int idDetalle = int.Parse(Contratos[15]);
                                bool exito = obrMedicoContrato.actualizarMedicoVacuna(obeMedicoVacuna, idDetalle, IndicadorAutorizacionContrato);
                                if (exito)
                                {
                                    rpta = string.Format("{0}¬2¬{1}", Contratos[1], opc);
                                }
                                else
                                {
                                    rpta = string.Format("ERROR¬{0}", Contratos[1]);
                                }
                            }
                            break;
                    }
                }
            }
            return rpta;
        }

        public string AutorizarRechazarContrato(string ss, int opc, int cab, int id)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                brMedicoContrato obrMedicoContrato = new brMedicoContrato();
                if (opc == 1)
                {
                    if (cab == 1)
                    {
                        rpta = obrMedicoContrato.AutorizacionRechazoContrato(true, id, "A", obeUsuarioLogin.UsuarioId);
                        rpta = rpta + "|" + cab;
                    }
                    else
                    {
                        rpta = obrMedicoContrato.AutorizacionRechazoContrato(false, id, "A", obeUsuarioLogin.UsuarioId);
                        rpta = rpta + "|" + cab;
                    }
                }
                else
                {
                    if (cab == 1)
                    {
                        rpta = obrMedicoContrato.AutorizacionRechazoContrato(true, id, "I", obeUsuarioLogin.UsuarioId);
                        rpta = rpta + "|" + cab;
                    }
                    else
                    {
                        rpta = obrMedicoContrato.AutorizacionRechazoContrato(false, id, "I", obeUsuarioLogin.UsuarioId);
                        rpta = rpta + "|" + cab;
                    }
                }
            }
            return rpta;
        }

        public string listarAutDetalleConfiguracionPago(string ss, string id, int opcion)
        {
            string rpta = "";
            brMedicoContrato obrMedicoContrato = new brMedicoContrato();
            rpta = obrMedicoContrato.ListarAutorizacionContratoDetalle(id, opcion);
            return rpta;
        }

        public string anularConfiguracionPago(string ss, int id, string est)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                brMedicoContrato obrMedicoContrato = new brMedicoContrato();
                int exito = obrMedicoContrato.actualizarEstadoMedicoContratoDetalle(id, est, obeUsuarioLogin.UsuarioId);
                if (exito > -1)
                {
                    rpta = string.Format("{0}¬3", id);
                }
                else
                {
                    rpta = string.Format("ERROR¬{0}", exito);
                }
            }
            return rpta;
        }

        public string anularConfiguracionPago2(string ss, int id, string est)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                brMedicoContrato obrMedicoContrato = new brMedicoContrato();
                bool IndicadorAutorizacionContrato = bool.Parse(ConfigurationManager.AppSettings["IndicadorAutorizacionContrato"]);
                string exito = obrMedicoContrato.actualizarEstadoMedicoContratoDetalle2(id, est, obeUsuarioLogin.UsuarioId, IndicadorAutorizacionContrato);
                string[] validacion = exito.Split('¦');
                if (validacion[0] != "0")
                {
                    rpta = string.Format("{0}¬{1}", exito, id);
                }
                else
                {
                    rpta = string.Format("{0}¬ERROR", exito);
                }
            }
            return rpta;
        }

        public ActionResult AsignacionDescuentoLista(string ss, int id)
        {
            AdministracionController Administracion = new AdministracionController();
            beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
            ViewBag.seguridad = (Session["Usuario" + ss] == null ? "" : Administracion.obtenerMenuAccion(id, obeUsuarioLogin.PerfilId).ToString());
            ViewBag.versionJS = versionJS;
            return View();
        }

        public string listasAsignacionDescuento(string ss)
        {
            string rpta = "";
            brAsignacionDescuento obrAsignacionDescuento = new brAsignacionDescuento();
            beAsignacionDescuentoListas obeAsignacionDescuentoListas = obrAsignacionDescuento.listarListas();
            string ListaTipoDescuento = "";
            string ListaDescuento = "";
            string ListaTipoDocumento = "";
            string ListaEspecialidad = "";
            if (obeAsignacionDescuentoListas != null)
            {
                if (obeAsignacionDescuentoListas.ListaTipoDescuento != null && obeAsignacionDescuentoListas.ListaTipoDescuento.Count > 0)
                {
                    ListaTipoDescuento = ucCustomSerializer.Serializar(obeAsignacionDescuentoListas.ListaTipoDescuento, '¦', '¯', false, "");
                }
                if (obeAsignacionDescuentoListas.ListaDescuento != null && obeAsignacionDescuentoListas.ListaDescuento.Count > 0)
                {
                    ListaDescuento = ucCustomSerializer.Serializar(obeAsignacionDescuentoListas.ListaDescuento, '¦', '¯', false, "");
                }
                if (obeAsignacionDescuentoListas.ListaTipoDocumento != null && obeAsignacionDescuentoListas.ListaTipoDocumento.Count > 0)
                {
                    ListaTipoDocumento = ucCustomSerializer.Serializar(obeAsignacionDescuentoListas.ListaTipoDocumento, '¦', '¯', false, "");
                }
                if (obeAsignacionDescuentoListas.ListaEspecialidad != null && obeAsignacionDescuentoListas.ListaEspecialidad.Count > 0)
                {
                    ListaEspecialidad = ucCustomSerializer.Serializar(obeAsignacionDescuentoListas.ListaEspecialidad, '¦', '¯', false, "");
                }
            }
            rpta = String.Format("{0}¬{1}¬{2}¬{3}", ListaTipoDescuento, ListaDescuento, ListaTipoDocumento, ListaEspecialidad);
            return rpta;
        }

        public string listarAsignacionDescuento(string ss)
        {
            string rpta = "";
            if (Request.InputStream != null)
            {
                int n = (int)Request.InputStream.Length;
                byte[] buffer = new byte[n];
                Request.InputStream.Read(buffer, 0, n);
                string strDescuento = Encoding.UTF8.GetString(buffer);
                string[] Descuento = strDescuento.Split('|');
                brAsignacionDescuento obrAsignacionDescuento = new brAsignacionDescuento();
                int personaid = (Descuento[1] == "") ? 0 : int.Parse(Descuento[1]);
                int medicoid = (Descuento[2] == "") ? 0 : int.Parse(Descuento[2]);
                DateTime fechainicio = (Descuento[3] == "") ? DateTime.Parse("01/01/1900") : DateTime.Parse(Descuento[3]);
                DateTime fechafin = (Descuento[4] == "") ? DateTime.Parse("01/01/1900") : DateTime.Parse(Descuento[4]);
                int EmpresaId = int.Parse(Descuento[5]);
                int EspecialidadId = int.Parse(Descuento[6]);
                beAsignacionDescuentoVistaLista obeAsignacionDescuentoVistaLista = obrAsignacionDescuento.listarVista(Descuento[0], personaid, medicoid, fechainicio, fechafin, EmpresaId, EspecialidadId, false);
                if (obeAsignacionDescuentoVistaLista != null)
                {
                    if (obeAsignacionDescuentoVistaLista.ListaAsignacionDescuento != null && obeAsignacionDescuentoVistaLista.ListaAsignacionDescuento.Count > 0)
                    {
                        rpta = ucCustomSerializer.Serializar(obeAsignacionDescuentoVistaLista.ListaAsignacionDescuento, '¦', '¯', false);
                    }
                }
            }
            return rpta;
        }

        public string listarDescuento(string ss, int id)
        {
            string rpta = "";
            brAsignacionDescuento obrAsignacionDescuento = new brAsignacionDescuento();
            List<beMedicoContratoDescuento> lbeMedicoContratoDescuento = obrAsignacionDescuento.listarDescuentos(id);
            if (lbeMedicoContratoDescuento != null)
            {
                rpta = ucCustomSerializer.Serializar(lbeMedicoContratoDescuento, '¦', '¯', false);
            }
            return rpta;
        }

        public string listarDescuentoPorId(string ss, int id)
        {
            string rpta = "";
            brAsignacionDescuento obrAsignacionDescuento = new brAsignacionDescuento();
            beMedicoContratoDescuento obeMedicoContratoDescuento = obrAsignacionDescuento.listarDescuentoPorId(id);
            if (obeMedicoContratoDescuento != null)
            {
                string archivo = Server.MapPath("~//Files//EstDescuento.txt");
                rpta = ucCustomSerializer.SerializarObjeto(obeMedicoContratoDescuento, '¦', archivo, false, false);
            }
            return rpta;
        }

        public string grabarDescuento(string ss)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                if (Request.InputStream != null)
                {
                    int n = (int)Request.InputStream.Length;
                    byte[] buffer = new byte[n];
                    Request.InputStream.Read(buffer, 0, n);
                    string strDescuento = Encoding.UTF8.GetString(buffer);
                    string[] Descuentos = strDescuento.Split('|');
                    beMedicoContratoDescuentoPorId obeMedicoContratoDescuentoPorId = new beMedicoContratoDescuentoPorId();

                    obeMedicoContratoDescuentoPorId.UsuarioId = obeUsuarioLogin.UsuarioId;
                    obeMedicoContratoDescuentoPorId.MedicoContratoId = int.Parse(Descuentos[1]);
                    obeMedicoContratoDescuentoPorId.FechaInicio = DateTime.Parse(Descuentos[2]);
                    obeMedicoContratoDescuentoPorId.FechaFin = DateTime.Parse(Descuentos[3]);
                    obeMedicoContratoDescuentoPorId.TipoDescuentoId = int.Parse(Descuentos[4]);
                    obeMedicoContratoDescuentoPorId.DescuentoId = int.Parse(Descuentos[5]);
                    obeMedicoContratoDescuentoPorId.Monto = decimal.Parse(Descuentos[6]);
                    obeMedicoContratoDescuentoPorId.IndicadorDocumentoPago = (Descuentos[7] == "True" ? true : false);
                    obeMedicoContratoDescuentoPorId.TipoDocumentoPago = Descuentos[8];
                    obeMedicoContratoDescuentoPorId.Descripcion = Descuentos[9];
                    if (Descuentos[0] == "1")
                    {
                        brAsignacionDescuento obrAsignacionDescuento = new brAsignacionDescuento();
                        int idDescuento = obrAsignacionDescuento.adicionarDescuento(obeMedicoContratoDescuentoPorId);
                        if (idDescuento > -1)
                        {
                            string listaDescuento = listarDescuento(ss, int.Parse(Descuentos[1]));
                            rpta = string.Format("{0}¬1", listaDescuento);
                        }
                    }
                    else
                    {
                        obeMedicoContratoDescuentoPorId.MedicoContratoDetalleId = int.Parse(Descuentos[10]);
                        brAsignacionDescuento obrAsignacionDescuento = new brAsignacionDescuento();
                        bool exito = obrAsignacionDescuento.actualizarDescuento(obeMedicoContratoDescuentoPorId);
                        if (exito)
                        {
                            string listaDescuento = listarDescuento(ss, int.Parse(Descuentos[1]));
                            rpta = string.Format("{0}¬2", listaDescuento);
                        }
                    }
                }
            }
            return rpta;
        }

        public string anularDescuento(string ss, int id, string est)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                brAsignacionDescuento obrAsignacionDescuento = new brAsignacionDescuento();
                bool exito = obrAsignacionDescuento.actualizarEstadoDescuento(id, est, obeUsuarioLogin.UsuarioId);
                if (exito)
                {
                    rpta = string.Format("{0}¬3", id);
                }
            }
            return rpta;
        }

        public string grabarCopia(string ss)
        {

            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                Stream s = Request.InputStream;
                StreamReader sr = new StreamReader(s);
                string[] Fechas = sr.ReadToEnd().Split('¦');
                brMedicoContrato obrMedicoContrato = new brMedicoContrato();

                DateTime FecInicio = DateTime.Parse(Fechas[0]);
                DateTime FecFin = DateTime.Parse(Fechas[1]);
                int MedicoId = int.Parse(Fechas[2]);
                string SucursalId = Fechas[3];
                int UsuarioId = ((beUsuarioLogin)Session["Usuario" + ss]).UsuarioId;
                int valorCopiaDoctor = int.Parse(Fechas[4]);
                bool IndicadorAutorizacionContrato = bool.Parse(ConfigurationManager.AppSettings["IndicadorAutorizacionContrato"]);
                string data = obrMedicoContrato.grabarMedicoContratoCopiar(SucursalId, MedicoId, FecInicio, FecFin, UsuarioId, valorCopiaDoctor, IndicadorAutorizacionContrato);
                if (data != "") rpta = data;
            }
            return rpta;
        }

        public string grabarAdjunto(string ss, int contratoId, string opc, string su, string nombre, int tot, int con, string idCompania)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                HttpPostedFileBase file = Request.Files["file"];
                //string Archivos = Server.MapPath("~/files/Adjuntos/");
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                beMedicoContratoAdjuntar obeMedicoContratoAdjuntar = new beMedicoContratoAdjuntar();
                obeMedicoContratoAdjuntar.MedicoContratoId = contratoId;
                obeMedicoContratoAdjuntar.NombreArchivo = nombre;
                string NombreRepositorio = contratoId + "_" + nombre;
                obeMedicoContratoAdjuntar.NombreRepositorio = NombreRepositorio;
                if (con == tot)
                {
                    brMedicoContrato obrMedicoContrato = new brMedicoContrato();
                    //if (opc == "1")
                    //{

                    //	int idMedicoContratoAdjuntar = obrMedicoContrato.adicionarMedicoContratoAdjuntar(obeMedicoContratoAdjuntar, obeUsuarioLogin.UsuarioId);
                    //	if (idMedicoContratoAdjuntar > -1)
                    //	{
                    //		rpta = string.Format("{0}¬1", contratoId);
                    //	}
                    //}
                    //else
                    //{
                    //	bool exito = obrMedicoContrato.actualizarMedicoContratoAdjuntar(obeMedicoContratoAdjuntar, obeUsuarioLogin.UsuarioId);
                    //	if (exito)
                    //	{
                    //		rpta = string.Format("{0}¬2", contratoId);
                    //	}
                    //}
                    int idMedicoContratoAdjuntar = obrMedicoContrato.adicionarMedicoContratoAdjuntar(obeMedicoContratoAdjuntar, obeUsuarioLogin.UsuarioId);
                    if (idMedicoContratoAdjuntar > -1)
                    {
                        rpta = string.Format("{0}¬1", contratoId);
                    }
                }
                else
                {
                    string rutacontrato = ConfigurationManager.AppSettings["rutaContrato-" + obeUsuarioLogin.IdCompania];
                    string carpeta = rutacontrato + su;
                    if (!Directory.Exists(carpeta))
                    {
                        Directory.CreateDirectory(carpeta);
                    }

                    if (Directory.Exists(carpeta))
                    {
                        string ruta = carpeta + "\\" + NombreRepositorio;
                        con = con + 1;
                        if (io.File.Exists(ruta))
                        {
                            rpta = con.ToString() + "¯" + nombre + "¯true";
                        }
                        else
                        {
                            file.SaveAs(ruta);
                            rpta = con.ToString() + "¯" + nombre + "¯false";
                        }

                    }

                }
            }

            return rpta;
        }

        private bool grabarAdjuntoDetalle(List<HttpPostedFileBase> archivos, int id, int usuarioId, string su, int contratoid, string idCompania)
        {

            string rutacontrato = ConfigurationManager.AppSettings["rutaContratoFijo-" + idCompania];
            string NombreRepositorio;
            string cadenaNombre = "";
            foreach (HttpPostedFileBase file in archivos)
            {
                if (!Directory.Exists(rutacontrato + su))
                {
                    Directory.CreateDirectory(rutacontrato + "\\" + su);
                }
                string carpeta = rutacontrato + su + "\\" + contratoid;
                if (!Directory.Exists(carpeta))
                {
                    Directory.CreateDirectory(carpeta);
                }
                if (Directory.Exists(carpeta))
                {
                    NombreRepositorio = id + "_" + file.FileName;
                    string ruta = carpeta + "\\" + NombreRepositorio;

                    if (io.File.Exists(ruta))
                    {
                        io.File.Delete(ruta);
                    }
                    file.SaveAs(ruta);
                    cadenaNombre += file.FileName + "¯";
                }

            }

            beMedicoContratoAdjuntar obeMedicoContratoAdjuntar = new beMedicoContratoAdjuntar();
            obeMedicoContratoAdjuntar.MedicoContratoId = id;
            obeMedicoContratoAdjuntar.NombreArchivo = cadenaNombre.Substring(0, cadenaNombre.Length - 1);

            brMedicoContrato obrMedicoContrato = new brMedicoContrato();
            int idMedicoContratoAdjuntar = obrMedicoContrato.adicionarMedicoContratoDetalleAdjuntar(obeMedicoContratoAdjuntar, usuarioId);

            return true;
        }

        public string grabarAdjunto2(string ss, int contratoId, string opc, string su, string nombre, int tot, int con, string idCompania)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                HttpPostedFileBase file = Request.Files["file"];
                //string Archivos = Server.MapPath("~/files/Adjuntos/");
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                beMedicoContratoAdjuntar obeMedicoContratoAdjuntar = new beMedicoContratoAdjuntar();
                obeMedicoContratoAdjuntar.MedicoContratoId = contratoId;
                obeMedicoContratoAdjuntar.NombreArchivo = nombre;
                string NombreRepositorio = contratoId + "_" + nombre;
                obeMedicoContratoAdjuntar.NombreRepositorio = NombreRepositorio;
                string rutacontrato = ConfigurationManager.AppSettings["rutaContrato-" + obeUsuarioLogin.IdCompania];
                string carpeta = rutacontrato + "\\" + su;
                if (!Directory.Exists(carpeta))
                {
                    Directory.CreateDirectory(carpeta);
                }

                if (Directory.Exists(carpeta))
                {
                    string ruta = carpeta + "\\" + NombreRepositorio;
                    file.SaveAs(ruta);
                }
                con = con + 1;
                rpta = con.ToString();
                brMedicoContrato obrMedicoContrato = new brMedicoContrato();
                if (opc == "1")
                {

                    int idMedicoContratoAdjuntar = obrMedicoContrato.adicionarMedicoContratoAdjuntar(obeMedicoContratoAdjuntar, obeUsuarioLogin.UsuarioId);
                    if (idMedicoContratoAdjuntar > -1)
                    {
                        rpta = string.Format("{0}¬1", contratoId);
                    }
                }
                else
                {
                    bool exito = obrMedicoContrato.actualizarMedicoContratoAdjuntar(obeMedicoContratoAdjuntar, obeUsuarioLogin.UsuarioId);
                    if (exito)
                    {
                        rpta = string.Format("{0}¬2", contratoId);
                    }
                }

            }
            return rpta;
        }

        public string EliminarArchivo(string arc, string ss, string su, string idCompania)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                //string Archivos = Server.MapPath("~/files/Adjuntos/");
                string rutacontrato = ConfigurationManager.AppSettings["rutaContrato-" + obeUsuarioLogin.IdCompania];
                string carpeta = rutacontrato + "\\" + su;

                string[] id = arc.Split('_');
                //string ruta = String.Format("{0}{1}", Archivos, arc);

                if (Directory.Exists(carpeta))
                {
                    string ruta = carpeta + "\\" + arc;

                    if (io.File.Exists(ruta))
                    {
                        io.File.Delete(ruta);
                    }
                    //beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                    brMedicoContrato obrMedicoContrato = new brMedicoContrato();
                    bool exito = obrMedicoContrato.actualizarEstadoMedicoContratoAdjuntar(int.Parse(id[0]), "I", obeUsuarioLogin.UsuarioId, arc);
                    if (exito)
                    {
                        rpta = string.Format("{0}¬3", id[0]);
                    }
                }
            }
            return rpta;
        }

        private bool EliminarArchivoCf(string archivos, int usuarioId, string su, int contratoid, string idCompania)
        {
            string[] data = archivos.Split('¬');
            string rutacontrato = ConfigurationManager.AppSettings["rutaContratoFijo-" + idCompania];
            string carpeta = rutacontrato + su + "\\" + contratoid;
            brMedicoContrato obrMedicoContrato = new brMedicoContrato();
            string[] archivo;
            for (int i = 0; i < data.Length; i++)
            {
                archivo = data[i].Split('¯');
                if (Directory.Exists(carpeta))
                {
                    string ruta = carpeta + "\\" + archivo[1];
                    if (io.File.Exists(ruta))
                    {
                        io.File.Delete(ruta);
                    }
                    obrMedicoContrato.actualizarEstadoMedicoContratoDetalleAdjuntar(int.Parse(archivo[0]), "I", usuarioId);
                }
            }
            return true;
        }

        public string listarNombreEmpresa(string ss, string su, int id)
        {
            string rpta = "";
            brMedicoContrato obrMedicoContrato = new brMedicoContrato();
            beCampoEntero obeCampoEntero = obrMedicoContrato.obtenerEmpresaNombre(su, id);
            if (obeCampoEntero != null)
            {
                rpta = obeCampoEntero.campo1 + "¦" + obeCampoEntero.campo2;
            }
            return rpta;
        }

        public ActionResult AprobacionMedico(string ss, int id)
        {
            ViewBag.versionJS = versionJS;
            return View();
        }
        public string listasConsultaAprobacionMedico()
        {
            string rpta = "";
            string ListaTurno = "";
            string ListaUnidadMedica = "";
            brHorarioMedico obrHorarioMedico = new brHorarioMedico();
            beConsultaHorarioMedicoListas lista = obrHorarioMedico.listarTurno();
            if (lista != null)
            {
                if (lista.ListaTurno != null && lista.ListaTurno.Count > 0)
                {
                    ListaTurno = ucCustomSerializer.Serializar(lista.ListaTurno, '¦', '¬', false);
                }
                if (lista.ListaUnidadMedica != null && lista.ListaUnidadMedica.Count > 0)
                {
                    ListaUnidadMedica = ucCustomSerializer.Serializar(lista.ListaUnidadMedica, '¦', '¬', false);
                }
                rpta = string.Format("{0}¯{1}", ListaTurno, ListaUnidadMedica);
            }
            return rpta;
        }
        public string consultarAprobacionMedico()
        {
            int n = (int)Request.InputStream.Length;
            byte[] buffer = new byte[n];
            Request.InputStream.Read(buffer, 0, n);
            string data = Encoding.UTF8.GetString(buffer);
            string[] datos = data.Split('¦');
            beFrHorarioMedicoConsulta obj = new beFrHorarioMedicoConsulta();
            obj.Sucursal = datos[0];
            obj.Medico = int.Parse(datos[1]);
            obj.Periodo = int.Parse(datos[2]);
            obj.Anio = int.Parse(datos[3]);
            obj.Empresa = int.Parse(datos[4]);
            obj.Turno = int.Parse(datos[5]);
            obj.UnidadMedica = int.Parse(datos[6]);

            brAprobacionMedico obrAprobacionMedico = new brAprobacionMedico();
            beAprobacionMedicoListas obeAprobacionMedicoListas = obrAprobacionMedico.listas(obj);
            StringBuilder sb = new StringBuilder();
            if (obeAprobacionMedicoListas != null)
            {
                if (obeAprobacionMedicoListas.lista != null && obeAprobacionMedicoListas.lista.Count > 0)
                {
                    sb.Append(ucCustomSerializer.Serializar(obeAprobacionMedicoListas.lista, '¦', '¬', false, "", true, true));
                }
                sb.Append("¯");
                if (obeAprobacionMedicoListas.listaFeriado != null && obeAprobacionMedicoListas.listaFeriado.Count > 0)
                {
                    sb.Append(String.Join("¬", obeAprobacionMedicoListas.listaFeriado));
                }
                sb.Append("¯");
                if (obeAprobacionMedicoListas.listaTabla != null && obeAprobacionMedicoListas.listaTabla.Count > 0)
                {
                    sb.Append(ucCustomSerializer.Serializar(obeAprobacionMedicoListas.listaTabla, '¦', '¬', false, "", false, true));
                }
            }
            return sb.ToString();
        }

        public string grabarAprobacionMedico(string ss, string su)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                int n = (int)Request.InputStream.Length;
                byte[] buffer = new byte[n];
                Request.InputStream.Read(buffer, 0, n);
                string[] data = Encoding.UTF8.GetString(buffer).Split('¯');
                string[] Periodo = data[1].Split('¦');
                int mes = int.Parse(Periodo[0]);
                int anio = int.Parse(Periodo[1]);
                brAprobacionMedico obrAprobacionMedico = new brAprobacionMedico();
                int exito = obrAprobacionMedico.grabarAprobacion(data[0], su, anio, mes, obeUsuarioLogin.UsuarioId);
                if (exito > -1)
                {
                    rpta = exito.ToString();
                }
            }
            return rpta;
        }
        public string generarPDF(string ss)
        {
            string rpta = "";
            int n = (int)Request.InputStream.Length;
            byte[] buffer = new byte[n];
            Request.InputStream.Read(buffer, 0, n);
            string contenido = Encoding.UTF8.GetString(buffer);
            var htmlToPdf = new NReco.PdfGenerator.HtmlToPdfConverter();
            htmlToPdf.Size = NReco.PdfGenerator.PageSize.A4;
            htmlToPdf.Orientation = NReco.PdfGenerator.PageOrientation.Landscape;
            htmlToPdf.CustomWkHtmlPageArgs = "--footer-right [page]/[topage] --footer-font-size 8";
            byte[] PDFbuffer = htmlToPdf.GeneratePdf(contenido);
            rpta = Convert.ToBase64String(PDFbuffer);
            rpta = "¦" + rpta;
            return rpta;
        }

        public string listasContratoProveedor(string ss, int id)
        {
            string rpta = "";
            brMedicoContratoProveedor obrMedicoContratoProveedor = new brMedicoContratoProveedor();
            List<beMedicoContratoProveedor> lista = obrMedicoContratoProveedor.listar(id);
            if (lista != null && lista.Count > 0)
            {
                string archivo = Server.MapPath("~/Files/EstMedicoContratoProveedor.txt");
                rpta = ucCustomSerializer.Serializar(lista, '¦', '¬', false, archivo);
            }
            return rpta;
        }

        public string grabarProveedor(string ss)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                int n = (int)Request.InputStream.Length;
                byte[] buffer = new byte[n];
                Request.InputStream.Read(buffer, 0, n);
                string[] contenido = Encoding.UTF8.GetString(buffer).Split('¦');
                beMedicoContratoProveedor obeMedicoContratoProveedor = new beMedicoContratoProveedor();
                obeMedicoContratoProveedor.EspecialidadId = int.Parse(contenido[0]);
                obeMedicoContratoProveedor.FechaInicioVigencia = DateTime.Parse(contenido[1]);
                obeMedicoContratoProveedor.FechaFinVigencia = DateTime.Parse(contenido[2]);
                obeMedicoContratoProveedor.TipoAdmisionId = int.Parse(contenido[3]);
                obeMedicoContratoProveedor.TipoPersona = contenido[4];
                obeMedicoContratoProveedor.MedicoEmpresaId = int.Parse(contenido[5]);
                obeMedicoContratoProveedor.TiempoPagoId = int.Parse(contenido[6]);
                obeMedicoContratoProveedor.TipoDocumentoPagoId = contenido[7];
                obeMedicoContratoProveedor.CodigoImpuesto = contenido[8];
                obeMedicoContratoProveedor.MedicoContratoId = int.Parse(contenido[9]);
                obeMedicoContratoProveedor.TipoMedico = contenido[10];
                obeMedicoContratoProveedor.CorreoElectronico = contenido[11];
                obeMedicoContratoProveedor.CorreoElectronicoAlterno = contenido[12];
                obeMedicoContratoProveedor.MedicoContratoProveedorId = int.Parse(contenido[13]);
                obeMedicoContratoProveedor.TipoPrestaciones = contenido[14];
                obeMedicoContratoProveedor.ListaPrestaciones = contenido[15];
                //obeMedicoContratoProveedor.EstadoRegistro = "A";
                brMedicoContratoProveedor obrMedicoContratoProveedor = new brMedicoContratoProveedor();
                int id = -1;
                if (contenido[13] == "0")
                {
                    id = obrMedicoContratoProveedor.grabar(obeMedicoContratoProveedor, obeUsuarioLogin.UsuarioId);
                }
                else
                {
                    id = obrMedicoContratoProveedor.actualizar(obeMedicoContratoProveedor, obeUsuarioLogin.UsuarioId);
                }
                rpta = id.ToString();
            }
            return rpta;
        }

        public string anularProveedor(string ss, int id, string est)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                brMedicoContratoProveedor obrMedicoContratoProveedor = new brMedicoContratoProveedor();
                int exito = obrMedicoContratoProveedor.actualizarEstado(obeUsuarioLogin.UsuarioId, id, est);
                if (exito > -1)
                {
                    rpta = "A";
                }
                else
                {
                    rpta = "-1";
                }
            }
            return rpta;
        }

        public string ProveedorCorreoAlterno(int id)
        {
            string rpta = "";
            brMedicoContratoProveedor obrMedicoContratoProveedor = new brMedicoContratoProveedor();
            return rpta = obrMedicoContratoProveedor.ObtenerDatosAdicionales(id);
        }

        public string listarContratoDescuento(string ss, int id)
        {
            string rpta = "";

            brMedicoContrato obrMedicoContrato = new brMedicoContrato();
            List<beContratoProduccionDescuentoVista> lista = obrMedicoContrato.contratoProduccionFijaDescuentoListar(id);


            if (lista != null && lista.Count > 0)
            {
                rpta = ucCustomSerializer.Serializar(lista, '¦', '¬', false);
            }
            return rpta;
        }

        public string anularContratoProduccionDescuento(string ss, int id, string est)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];

                brMedicoContrato obrMedicoContrato = new brMedicoContrato();
                int exito = obrMedicoContrato.contratoProduccionFijaDescuentoActualizarEstado(obeUsuarioLogin.UsuarioId, id, est);

                if (exito > -1)
                {
                    rpta = "A";
                }
                else
                {
                    rpta = "-1";
                }
            }
            return rpta;
        }


    }
}
