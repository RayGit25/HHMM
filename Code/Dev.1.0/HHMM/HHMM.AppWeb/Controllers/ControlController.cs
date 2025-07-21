using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Configuration;
using HHMM.Librerias.EntidadesNegocio;
using HHMM.Librerias.ReglasNegocio;
using General.Librerias.CodigoUsuario;
using General.Librerias.EntidadesNegocio;
using General.Librerias.AccesoDatos;
using HHMM.AppWeb.Filter;
using System.Text;
using System.Globalization;
using System.IO;
using System.IO.Compression;
using System.Data;
using System.Collections;

namespace HHMM.AppWeb.Views
{
    [frSeguridad]
    public class ControlController : Controller
    {
        string versionJS = ConfigurationManager.AppSettings["VersionJS"];
        string numeroMeses = ConfigurationManager.AppSettings["NumeroMeses"];
        DataSet dst;
        DataTable tabla;

        public ActionResult Reportes()
        {
            ViewBag.versionJS = versionJS;
            ViewBag.numeroMeses = numeroMeses;
            return View();
        }


        public string ListarReporte(string ss, int ti, string su)
        {
            string rpta = "";
            int n = (int)Request.InputStream.Length;
            byte[] buffer = new byte[n];
            Request.InputStream.Read(buffer, 0, n);
            string strFechas = Encoding.UTF8.GetString(buffer);
            string[] Fechas = strFechas.Split('|');
            DateTime valor1 = DateTime.Parse(Fechas[0]);
            DateTime valor2 = DateTime.Parse(Fechas[1]);
            int mes = int.Parse(Fechas[2]);
            int anio = int.Parse(Fechas[3]);
            brReporte obrReporte = new brReporte();
            if (ti != 6)
            {
                beReporteVista obeReporteVista = obrReporte.listarListas(ti, su, valor1, valor2, mes, anio);
                string ListaTipoAtencion = "";
                string ListaServicio = "";
                string ListaReporte = "";
                string Fecha = "";
                if (obeReporteVista != null)
                {
                    if (obeReporteVista.ListaTipoAtencion != null && obeReporteVista.ListaTipoAtencion.Count > 0)
                    {
                        ListaTipoAtencion = ucCustomSerializer.Serializar(obeReporteVista.ListaTipoAtencion, '¦', '¯', false, "");
                    }
                    if (obeReporteVista.ListaServicio != null && obeReporteVista.ListaServicio.Count > 0)
                    {
                        ListaServicio = ucCustomSerializer.Serializar(obeReporteVista.ListaServicio, '¦', '¯', false, "");
                    }
                    if (obeReporteVista.FechaActualizacion != null)
                    {
                        Fecha = obeReporteVista.FechaActualizacion.ToString();
                    }

                    if (obeReporteVista.ListaReporte != null && obeReporteVista.ListaReporte.Count > 0)
                    {
                        ListaReporte = ucCustomSerializer.Serializar(obeReporteVista.ListaReporte, '¦', '¯', false, "", true, true);
                    }
                }
                rpta = String.Format("{0}¬{1}¬{2}¬{3}", ListaTipoAtencion, ListaServicio, ListaReporte, Fecha);
            }
            else
            {
                beReporteVista2 obeReporteVista = obrReporte.listarListas2(ti, su, valor1, valor2, mes, anio);
                string ListaTipoAtencion = "";
                string ListaServicio = "";
                string ListaReporte1 = "";
                string ListaReporte2 = "";
                string ListaReporte3 = "";
                string Fecha = "";
                if (obeReporteVista != null)
                {
                    if (obeReporteVista.ListaTipoAtencion != null && obeReporteVista.ListaTipoAtencion.Count > 0)
                    {
                        ListaTipoAtencion = ucCustomSerializer.Serializar(obeReporteVista.ListaTipoAtencion, '¦', '¯', false, "");
                    }
                    if (obeReporteVista.ListaServicio != null && obeReporteVista.ListaServicio.Count > 0)
                    {
                        ListaServicio = ucCustomSerializer.Serializar(obeReporteVista.ListaServicio, '¦', '¯', false, "");
                    }
                    if (obeReporteVista.FechaActualizacion != null)
                    {
                        Fecha = obeReporteVista.FechaActualizacion.ToString();
                    }
                    if (obeReporteVista.ListaReporte1 != null && obeReporteVista.ListaReporte1.Count > 0)
                    {
                        ListaReporte1 = ucCustomSerializer.Serializar(obeReporteVista.ListaReporte1, '¦', '¯', false, "", true, true);
                    }

                    if (obeReporteVista.ListaReporte2 != null && obeReporteVista.ListaReporte2.Count > 0)
                    {
                        ListaReporte2 = ucCustomSerializer.Serializar(obeReporteVista.ListaReporte2, '¦', '¯', false, "", true, true);
                    }
                    if (obeReporteVista.ListaReporte3 != null && obeReporteVista.ListaReporte3.Count > 0)
                    {
                        ListaReporte3 = ucCustomSerializer.Serializar(obeReporteVista.ListaReporte3, '¦', '¯', false, "", true, true);
                    }

                }
                rpta = String.Format("{0}¬{1}¬{2}¬{3}¬{4}¬{5}", ListaTipoAtencion, ListaServicio, ListaReporte1, ListaReporte2, ListaReporte3, Fecha);
            }
            return rpta;
        }

        public ActionResult ContratoPorVencerLista()
        {
            ViewBag.versionJS = versionJS;
            return View();
        }

        public string listarContratoPorVencer(string ss, string idSucursal, int anio, int mes)
        {
            string rpta = "";
            brMedicoContrato obrMedicoContrato = new brMedicoContrato();
            List<beMedicoContratoVencer> lbeMedicoContrato = obrMedicoContrato.listarMedicoContratoVencer(idSucursal, anio, mes);
            string listaMedicoContrato = "";

            if (lbeMedicoContrato != null && lbeMedicoContrato.Count > 0)
            {
                string archivo = Server.MapPath("~//Files//EstMedicoContrato.txt");
                listaMedicoContrato = ucCustomSerializer.Serializar(lbeMedicoContrato, '¦', '¯', false, archivo);
            }

            rpta = String.Format("{0}", listaMedicoContrato);
            return rpta;
        }

        public ActionResult ConsultaHorariosMedico(string medicoId, string fecha, string no, string su, string idSeg = null)
        {
            ViewBag.versionJS = versionJS;
            ViewBag.medicoId = (medicoId != null ? (medicoId + "¦" + no) : "-1");
            ViewBag.fecha = fecha;
            ViewBag.Sucursal = su;
            ViewBag.idSeg = idSeg;
            return View();
        }

        public string listasConsultaHorariosMedico()
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

        public string consultarHorarioMedico()
        {
            string rpta = "";
            int n = (int)Request.InputStream.Length;
            byte[] buffer = new byte[n];
            Request.InputStream.Read(buffer, 0, n);
            string data = Encoding.UTF8.GetString(buffer);
            string[] datos = data.Split('¦');
            beFrHorarioMedicoConsulta obj = new beFrHorarioMedicoConsulta
            {
                Sucursal = datos[0],
                Medico = int.Parse(datos[1]),
                Periodo = int.Parse(datos[2]),
                Anio = int.Parse(datos[3]),
                Empresa = int.Parse(datos[4]),
                Turno = int.Parse(datos[5]),
                UnidadMedica = int.Parse(datos[6])
            };
            brHorarioMedico obrHorarioMedico = new brHorarioMedico();
            beHorarioMedicoConsultaVista objeto = obrHorarioMedico.consultaHorarioMedico(obj);
            string listaFeriado = "";
            string lista = "";
            if (objeto.lista.Count > 0)
            {
                listaFeriado = String.Join("¬", objeto.listaFeriado);
                lista = ucCustomSerializer.Serializar(objeto.lista, '¦', '¬', false, "", true, true, false, true);
            }
            rpta = String.Format("{0}¯{1}", lista, listaFeriado);
            return rpta;
        }

        public ActionResult ReporteContrato(string idCompania)
        {
            ViewBag.versionJS = versionJS;
            ViewBag.rutaContrato = ConfigurationManager.AppSettings["rutaContrato-" + idCompania];
            return View();
        }
        public string ListarMedicoContratoReporte(string ss, string su)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                brReporteContrato obrReporteContrato = new brReporteContrato();
                beMedicoContratoReporteVista obeMedicoContratoReporteVista = obrReporteContrato.listarMedicoContratoReporte(su, obeUsuarioLogin.UsuarioId);
                if (obeMedicoContratoReporteVista != null)
                {
                    string ListaMedicoContratoReporte = "", ListaTipoMedico = "", ListaComponente = "", ListaServicio = "";
                    if (obeMedicoContratoReporteVista.ListaMedicoContratoReporte != null && obeMedicoContratoReporteVista.ListaMedicoContratoReporte.Count > 0)
                    {
                        ListaMedicoContratoReporte = ucCustomSerializer.Serializar(obeMedicoContratoReporteVista.ListaMedicoContratoReporte, '¦', '¯', false, "");
                    }
                    if (obeMedicoContratoReporteVista.ListaTipoMedico != null && obeMedicoContratoReporteVista.ListaTipoMedico.Count > 0)
                    {
                        ListaTipoMedico = ucCustomSerializer.Serializar(obeMedicoContratoReporteVista.ListaTipoMedico, '¦', '¯', false, "");
                    }
                    if (obeMedicoContratoReporteVista.ListaComponente != null && obeMedicoContratoReporteVista.ListaComponente.Count > 0)
                    {
                        ListaComponente = ucCustomSerializer.Serializar(obeMedicoContratoReporteVista.ListaComponente, '¦', '¯', false, "");
                    }
                    if (obeMedicoContratoReporteVista.ListaServicio != null && obeMedicoContratoReporteVista.ListaServicio.Count > 0)
                    {
                        ListaServicio = ucCustomSerializer.Serializar(obeMedicoContratoReporteVista.ListaServicio, '¦', '¯', false, "");
                    }
                    rpta = String.Format("{0}¬{1}¬{2}¬{3}", ListaMedicoContratoReporte, ListaTipoMedico, ListaComponente, ListaServicio);
                }
            }
            return rpta;
        }

        public string ListarReporteContrato(string ss, string ti)
        {
            string rpta = "";
            int n = (int)Request.InputStream.Length;
            byte[] buffer = new byte[n];
            Request.InputStream.Read(buffer, 0, n);
            string strFechas = Encoding.UTF8.GetString(buffer);
            string[] Fechas = strFechas.Split('|');
            string valor1 = Fechas[0];
            DateTime valor2 = (Fechas[1] == "") ? DateTime.Parse("01/01/1900") : DateTime.Parse(Fechas[1]);
            DateTime valor3 = (Fechas[2] == "") ? DateTime.Parse("01/01/1900") : DateTime.Parse(Fechas[2]);
            int valor4 = (Fechas[3] == "" ? 0 : int.Parse(Fechas[3]));
            int valor5 = (Fechas[4] == "" ? 0 : int.Parse(Fechas[4]));
            string valor6 = Fechas[5];
            brReporteContrato obrReporteContrato = new brReporteContrato();
            beReporteContratoListas obeReporteContratoListas = obrReporteContrato.listarReporte(valor1, valor2, valor3, valor4, valor5, valor6);
            string ListaReporte1 = "";
            string ListaReporte2 = "";
            string ListaReporte3 = "";
            string ListaReporte4 = "";
            string ListaReporte5 = "";
            if (obeReporteContratoListas != null)
            {
                if (obeReporteContratoListas.ListaVista1 != null && obeReporteContratoListas.ListaVista1.Count > 0)
                {
                    ListaReporte1 = ucCustomSerializer.Serializar(obeReporteContratoListas.ListaVista1, '¦', '¯', false, "");
                }
                if (obeReporteContratoListas.ListaVista2 != null && obeReporteContratoListas.ListaVista2.Count > 0)
                {
                    ListaReporte2 = ucCustomSerializer.Serializar(obeReporteContratoListas.ListaVista2, '¦', '¯', false, "");
                }
                if (obeReporteContratoListas.ListaVista3 != null && obeReporteContratoListas.ListaVista3.Count > 0)
                {
                    ListaReporte3 = ucCustomSerializer.Serializar(obeReporteContratoListas.ListaVista3, '¦', '¯', false, "");
                }
                if (obeReporteContratoListas.ListaVista4 != null && obeReporteContratoListas.ListaVista4.Count > 0 && ti == "D")
                {
                    ListaReporte4 = ucCustomSerializer.Serializar(obeReporteContratoListas.ListaVista4, '¦', '¯', false, "");
                }
                if (obeReporteContratoListas.ListaVista5 != null && obeReporteContratoListas.ListaVista5.Count > 0 && ti == "D")
                {
                    ListaReporte5 = ucCustomSerializer.Serializar(obeReporteContratoListas.ListaVista5, '¦', '¯', false, "");
                }
            }
            rpta = String.Format("{0}¬{1}¬{2}¬{3}¬{4}", ListaReporte1, ListaReporte2, ListaReporte3, ListaReporte4, ListaReporte5);
            return rpta;
        }

        public ActionResult ReporteProvision()
        {
            ViewBag.versionJS = versionJS;
            ViewBag.numeroMeses = numeroMeses;
            return View();
        }

        public string ListasReporteProvision(string ss, string su)
        {
            string rpta = "";
            brReporteProvision obrReporteProvision = new brReporteProvision();
            beReporteLiquidacionListas2 obeReporteLiquidacionListas = obrReporteProvision.listasReporte(su);
            string ListaReporte1 = "";
            string ListaReporte2 = "";
            if (obeReporteLiquidacionListas != null)
            {
                if (obeReporteLiquidacionListas.ListaReporteLiquidacion1 != null && obeReporteLiquidacionListas.ListaReporteLiquidacion1.Count > 0)
                {
                    ListaReporte1 = ucCustomSerializer.Serializar(obeReporteLiquidacionListas.ListaReporteLiquidacion1, '¦', '¯', false, "");
                }
                if (obeReporteLiquidacionListas.ListaReporteLiquidacion2 != null && obeReporteLiquidacionListas.ListaReporteLiquidacion2.Count > 0)
                {
                    ListaReporte2 = ucCustomSerializer.Serializar(obeReporteLiquidacionListas.ListaReporteLiquidacion2, '¦', '¯', false, "");
                }
            }
            rpta = String.Format("{0}¬{1}", ListaReporte1, ListaReporte2);
            return rpta;
        }

        public string ListarReporteProvision(string ss)
        {
            string rpta = "";
            int n = (int)Request.InputStream.Length;
            byte[] buffer = new byte[n];
            Request.InputStream.Read(buffer, 0, n);
            string strData = Encoding.UTF8.GetString(buffer);
            string[] Datos = strData.Split('|');
            string valor1 = Datos[0];
            int valor2 = (Datos[1] == "" ? 0 : int.Parse(Datos[1]));
            int valor3 = (Datos[2] == "" ? 0 : int.Parse(Datos[2]));
            int valor4 = (Datos[3] == "" ? 0 : int.Parse(Datos[3]));
            int valor5 = (Datos[4] == "" ? 0 : int.Parse(Datos[4]));
            string tipo = Datos[5];
            string especialidad = Datos[6];
            brReporteProvision obrReporteProvision = new brReporteProvision();
            if (tipo == "D")
            {
                beReporteLiquidacionListas obeReporteLiquidacionListas = obrReporteProvision.listarReporte(valor1, valor2, valor3, valor4, valor5, tipo, especialidad);
                string ListaReporte1 = "";
                string ListaReporte2 = "";
                string ListaReporte3 = "";
                string ListaReporte4 = "";
                string ListaReporte5 = "";
                string ListaReporte6 = "";
                string ListaReporte7 = "";
                string ListaReporte8 = "";
                string ListaReporte9 = "";
                string ListaReporte10 = "";
                string ListaReporte11 = "";
                if (obeReporteLiquidacionListas != null)
                {
                    if (obeReporteLiquidacionListas.ListaReporteLiquidacionVista1 != null && obeReporteLiquidacionListas.ListaReporteLiquidacionVista1.Count > 0)
                    {
                        ListaReporte1 = ucCustomSerializer.Serializar(obeReporteLiquidacionListas.ListaReporteLiquidacionVista1, '¦', '¯', false, "");
                    }
                    if (obeReporteLiquidacionListas.ListaReporteLiquidacionVista2 != null && obeReporteLiquidacionListas.ListaReporteLiquidacionVista2.Count > 0)
                    {
                        ListaReporte2 = ucCustomSerializer.Serializar(obeReporteLiquidacionListas.ListaReporteLiquidacionVista2, '¦', '¯', false, "");
                    }
                    if (obeReporteLiquidacionListas.ListaReporteLiquidacionVista3 != null && obeReporteLiquidacionListas.ListaReporteLiquidacionVista3.Count > 0)
                    {
                        ListaReporte3 = ucCustomSerializer.Serializar(obeReporteLiquidacionListas.ListaReporteLiquidacionVista3, '¦', '¯', false, "", false, true);
                    }
                    if (obeReporteLiquidacionListas.ListaReporteLiquidacionVista4 != null && obeReporteLiquidacionListas.ListaReporteLiquidacionVista4.Count > 0)
                    {
                        ListaReporte4 = ucCustomSerializer.Serializar(obeReporteLiquidacionListas.ListaReporteLiquidacionVista4, '¦', '¯', false, "");
                    }
                    if (obeReporteLiquidacionListas.ListaReporteLiquidacionVista5 != null && obeReporteLiquidacionListas.ListaReporteLiquidacionVista5.Count > 0)
                    {
                        ListaReporte5 = ucCustomSerializer.Serializar(obeReporteLiquidacionListas.ListaReporteLiquidacionVista5, '¦', '¯', false, "");
                    }
                    if (obeReporteLiquidacionListas.ListaReporteTipoAtencion != null && obeReporteLiquidacionListas.ListaReporteTipoAtencion.Count > 0)
                    {
                        ListaReporte6 = ucCustomSerializer.Serializar(obeReporteLiquidacionListas.ListaReporteTipoAtencion, '¦', '¯', false, "");
                    }
                    if (obeReporteLiquidacionListas.ListaReporteTipoOrden != null && obeReporteLiquidacionListas.ListaReporteTipoOrden.Count > 0)
                    {
                        ListaReporte7 = ucCustomSerializer.Serializar(obeReporteLiquidacionListas.ListaReporteTipoOrden, '¦', '¯', false, "");
                    }
                    if (obeReporteLiquidacionListas.ListaReporteConcepto != null && obeReporteLiquidacionListas.ListaReporteConcepto.Count > 0)
                    {
                        ListaReporte8 = ucCustomSerializer.Serializar(obeReporteLiquidacionListas.ListaReporteConcepto, '¦', '¯', false, "");
                    }
                    if (obeReporteLiquidacionListas.listaHorarioMedico != null && obeReporteLiquidacionListas.listaHorarioMedico.Count > 0)
                    {
                        ListaReporte9 = ucCustomSerializer.Serializar(obeReporteLiquidacionListas.listaHorarioMedico, '¦', '¯', false, "");
                    }
                    if (obeReporteLiquidacionListas.ListaReporteArticulo != null && obeReporteLiquidacionListas.ListaReporteArticulo.Count > 0)
                    {
                        ListaReporte10 = ucCustomSerializer.Serializar(obeReporteLiquidacionListas.ListaReporteArticulo, '¦', '¯', false, "");
                    }
                    if (obeReporteLiquidacionListas.ListaReporteLiquidacionVista11 != null && obeReporteLiquidacionListas.ListaReporteLiquidacionVista11.Count > 0)
                    {
                        ListaReporte11 = ucCustomSerializer.Serializar(obeReporteLiquidacionListas.ListaReporteLiquidacionVista11, '¦', '¯', false, "");
                    }
                }
                rpta = String.Format("{0}¬{1}¬{2}¬{3}¬{4}¬{5}¬{6}¬{7}¬{8}¬{9}¬{10}", ListaReporte1, ListaReporte2, ListaReporte3, ListaReporte4, ListaReporte5, ListaReporte6, ListaReporte7, ListaReporte8, ListaReporte9, ListaReporte10, ListaReporte11);
            }
            else
            {
                beReporteLiquidacionListasResumen obeReporteLiquidacionListasResumen = obrReporteProvision.listarReporteResumen(valor1, valor2, valor3, valor4, valor5, tipo, especialidad);
                StringBuilder sb = new StringBuilder();
                if (obeReporteLiquidacionListasResumen != null)
                {
                    if (obeReporteLiquidacionListasResumen.ListaEspecialidad != null && obeReporteLiquidacionListasResumen.ListaEspecialidad.Count > 0)
                    {
                        sb.Append(ucCustomSerializer.Serializar(obeReporteLiquidacionListasResumen.ListaEspecialidad, '¦', '¯', false, ""));
                    }
                    sb.Append("¬");
                    if (obeReporteLiquidacionListasResumen.ListaMedicos != null && obeReporteLiquidacionListasResumen.ListaMedicos.Count > 0)
                    {
                        sb.Append(ucCustomSerializer.Serializar(obeReporteLiquidacionListasResumen.ListaMedicos, '¦', '¯', false, ""));
                    }
                    sb.Append("¬");
                    if (obeReporteLiquidacionListasResumen.ListaResumen != null && obeReporteLiquidacionListasResumen.ListaResumen.Count > 0)
                    {
                        sb.Append(ucCustomSerializer.Serializar(obeReporteLiquidacionListasResumen.ListaResumen, '¦', '¯', false, ""));
                    }
                }
                rpta = sb.ToString();
            }
            return rpta;
        }

        public string generarPDF(string ss, string anio, string mes)
        {
            string rpta = "";
            int n = (int)Request.InputStream.Length;
            byte[] buffer = new byte[n];
            Request.InputStream.Read(buffer, 0, n);
            string contenido = Encoding.UTF8.GetString(buffer);
            var htmlToPdf = new NReco.PdfGenerator.HtmlToPdfConverter();
            htmlToPdf.Size = NReco.PdfGenerator.PageSize.A4;
            htmlToPdf.Orientation = NReco.PdfGenerator.PageOrientation.Landscape;
            CultureInfo ci = CultureInfo.InvariantCulture;
            NReco.PdfGenerator.PageMargins margin = new NReco.PdfGenerator.PageMargins();
            margin.Bottom = 5;
            htmlToPdf.Margins = margin;
            //htmlToPdf.CustomWkHtmlPageArgs = "--header-right [page]/[topage] --header-font-size 8";
            htmlToPdf.PageHeaderHtml = "<div style='font-family:Calibri;text-align:center;height:60px'><div style='display:inline-block'>LIQUIDACIÓN-SERVICIOS MÉDICOS<br/>PERIODO " + anio + "-" + (mes.Length == 1 ? ("0" + mes) : mes) + "</div><div style='width:150px;text-align:left;display:inline-block;float:right'><table style='border-collapse: collapse;width:150px;font-family:Calibri;'><tr><td>Página</td><td><span class='page'></span></td><td>de <span class='topage'></span></td></tr><tr><td>Fecha</td><td colspan='2'>" + DateTime.Now.ToShortDateString() + "</td></tr><tr><td>Hora</td><td colspan='2'>" + DateTime.Now.ToString("hh:mm:ss tt", ci) + "</td></tr></table></div></div>";

            byte[] PDFbuffer = htmlToPdf.GeneratePdf(contenido);
            rpta = Convert.ToBase64String(PDFbuffer);
            rpta = "¦" + rpta;
            return rpta;
        }

        public string exportarPDF(string ss)
        {
            string rpta = "";
            int n = (int)Request.InputStream.Length;
            byte[] buffer = new byte[n];
            Request.InputStream.Read(buffer, 0, n);
            string contenido = Encoding.UTF8.GetString(buffer);
            string[] Datos = contenido.Split('|');
            var htmlToPdf = new NReco.PdfGenerator.HtmlToPdfConverter();
            htmlToPdf.Size = NReco.PdfGenerator.PageSize.A4;
            htmlToPdf.Orientation = NReco.PdfGenerator.PageOrientation.Landscape;
            CultureInfo ci = CultureInfo.InvariantCulture;
            NReco.PdfGenerator.PageMargins margin = new NReco.PdfGenerator.PageMargins();
            margin.Bottom = 5;
            htmlToPdf.Margins = margin;
            string rutaimagen = Server.MapPath("~/Imagenes/logo.png");
            htmlToPdf.PageHeaderHtml = "<img src='" + rutaimagen + "' style='float:left;width:160px;height:47px'/><div style='font-family:Calibri;text-align:center;height:60px'><div style='display:inline-block'>" + Datos[0] + "</div><div style='width:150px;text-align:left;display:inline-block;float:right'><table style='border-collapse: collapse;width:150px;font-family:Calibri;'><tr><td>Página</td><td><span class='page'></span></td><td>de <span class='topage'></span></td></tr><tr><td>Fecha</td><td colspan='2'>" + DateTime.Now.ToShortDateString() + "</td></tr><tr><td>Hora</td><td colspan='2'>" + DateTime.Now.ToString("hh:mm:ss tt", ci) + "</td></tr></table></div></div>";

            byte[] PDFbuffer = htmlToPdf.GeneratePdf(Datos[1]);
            rpta = Convert.ToBase64String(PDFbuffer);
            rpta = "¦" + rpta;
            return rpta;
        }

        public ActionResult ReporteDetalladoProvision()
        {
            ViewBag.versionJS = versionJS;
            ViewBag.numeroMeses = numeroMeses;
            return View();
        }
        public string ListasReporteDetalladoProvision(string ss, string su)
        {
            ViewBag.numeroMeses = numeroMeses;
            StringBuilder sb = new StringBuilder();
            brReporteDetalladoProvision obrReporteDetalladoProvision = new brReporteDetalladoProvision();
            beReporteDetalladoProvicionListas obeReporteDetalladoProvicionListas = obrReporteDetalladoProvision.listas(su);
            if (obeReporteDetalladoProvicionListas != null)
            {
                if (obeReporteDetalladoProvicionListas.ListaPeriodo != null && obeReporteDetalladoProvicionListas.ListaPeriodo.Count > 0)
                {
                    sb.Append(ucCustomSerializer.Serializar(obeReporteDetalladoProvicionListas.ListaPeriodo, '¦', '¯', false, ""));
                }
                sb.Append("¬");
                if (obeReporteDetalladoProvicionListas.ListaTipoAdmision != null && obeReporteDetalladoProvicionListas.ListaTipoAdmision.Count > 0)
                {
                    sb.Append(ucCustomSerializer.Serializar(obeReporteDetalladoProvicionListas.ListaTipoAdmision, '¦', '¯', false, ""));
                }
                sb.Append("¬");
                if (obeReporteDetalladoProvicionListas.ListaEspacialidad != null && obeReporteDetalladoProvicionListas.ListaEspacialidad.Count > 0)
                {
                    sb.Append(ucCustomSerializer.Serializar(obeReporteDetalladoProvicionListas.ListaEspacialidad, '¦', '¯', false, ""));
                }
            }

            return sb.ToString();
        }

        public string listarReporteDetallado(string tipo)
        {
            int n = (int)Request.InputStream.Length;
            byte[] buffer = new byte[n];
            Request.InputStream.Read(buffer, 0, n);
            string strData = Encoding.UTF8.GetString(buffer);
            string[] Datos = strData.Split('|');
            string sucursal = Datos[0];
            int PersonaId = int.Parse(Datos[1]);
            int EmpresaId = int.Parse((Datos[2] == "" ? "0" : Datos[2]));
            int PeriodoId = int.Parse(Datos[3]);
            int TipoAdmision = int.Parse(Datos[4]);
            int Especialidad = int.Parse(Datos[5]);

            StringBuilder sb = new StringBuilder();
            brReporteDetalladoProvision obrReporteDetalladoProvision = new brReporteDetalladoProvision();
            if (tipo == "1")
            {

                beReporteDetalladoProvisionVista obeReporteDetalladoProvisionVista = obrReporteDetalladoProvision.listar(tipo, sucursal, PeriodoId, TipoAdmision, Especialidad, PersonaId, EmpresaId);
                if (obeReporteDetalladoProvisionVista != null)
                {
                    if (obeReporteDetalladoProvisionVista.listaProduccion != null && obeReporteDetalladoProvisionVista.listaProduccion.Count > 0)
                    {
                        sb.Append(ucCustomSerializer.Serializar(obeReporteDetalladoProvisionVista.listaProduccion, '¦', '¯', false, "", false, true));
                    }
                    sb.Append("¬");
                    if (obeReporteDetalladoProvisionVista.listaHorario != null && obeReporteDetalladoProvisionVista.listaHorario.Count > 0)
                    {
                        sb.Append(ucCustomSerializer.Serializar(obeReporteDetalladoProvisionVista.listaHorario, '¦', '¯', false, ""));
                    }
                    sb.Append("¬");
                    if (obeReporteDetalladoProvisionVista.listaPeriodo != null && obeReporteDetalladoProvisionVista.listaPeriodo.Count > 0)
                    {
                        sb.Append(ucCustomSerializer.Serializar(obeReporteDetalladoProvisionVista.listaPeriodo, '¦', '¯', false, ""));
                    }
                }
            }
            else
            {

                beReporteDetalladoProvisionVista2 obeReporteDetalladoProvisionVista = obrReporteDetalladoProvision.listar2(tipo, sucursal, PeriodoId, TipoAdmision, Especialidad, PersonaId, EmpresaId);
                if (obeReporteDetalladoProvisionVista != null)
                {
                    if (obeReporteDetalladoProvisionVista.listaProduccion != null && obeReporteDetalladoProvisionVista.listaProduccion.Count > 0)
                    {
                        sb.Append(ucCustomSerializer.Serializar(obeReporteDetalladoProvisionVista.listaProduccion, '¦', '¯', false, "", false, true));
                    }
                    sb.Append("¬");
                    if (obeReporteDetalladoProvisionVista.listaHorario != null && obeReporteDetalladoProvisionVista.listaHorario.Count > 0)
                    {
                        sb.Append(ucCustomSerializer.Serializar(obeReporteDetalladoProvisionVista.listaHorario, '¦', '¯', false, ""));
                    }
                    sb.Append("¬");
                    if (obeReporteDetalladoProvisionVista.listaPeriodo != null && obeReporteDetalladoProvisionVista.listaPeriodo.Count > 0)
                    {
                        sb.Append(ucCustomSerializer.Serializar(obeReporteDetalladoProvisionVista.listaPeriodo, '¦', '¯', false, ""));
                    }
                }
            }

            return sb.ToString();
        }
        public string listarReporteDetalladoV5(string hojas)
        {
            string rpta = "";
            string[] tempo = hojas.Split('|');
            List<string> Hojas = new List<string>();
            brSQL obrSQL = new brSQL();
            int n = (int)Request.InputStream.Length;
            byte[] buffer = new byte[n];
            Request.InputStream.Read(buffer, 0, n);
            string data = Encoding.UTF8.GetString(buffer);
            string nombre = data.Substring(0) == "1" ? "ReporteDetalladoProvision.xlsx" : "ReporteDetalladoPlanilla.xlsx";
            string msg = obrSQL.EjecutarComando("uspReporteDetalladoListarV6", "@Data", data);
            //

            if (msg != "")
            {
                rpta = msg;
                dst = new DataSet();
                string[] cursores = new string[2000000];
                //****
                ArrayList objCursores = new ArrayList();
                objCursores.AddRange(rpta.Split('¬'));
                string aa = objCursores[0].ToString();
                //****
                cursores = rpta.Split('¬');
                int nCursores = cursores.Length;
                for (int i = 0; i < nCursores; i++)
                {
                    data = cursores[i];
                    tabla = ucCustomSerializer.ConvertirEnTabla(data);
                    dst.Tables.Add(tabla.Copy());
                    Hojas.Add(tempo[i]);
                }
                string[] arrayHojas = Hojas.ToArray();
                string archivo = String.Format(@"D:\Archivos\{0}", nombre);
                if (System.IO.File.Exists(archivo)) System.IO.File.Delete(archivo);
                ExcelXMLx.ExportarTabla2XLSX(archivo, arrayHojas, dst);
                //ExcelXML.Export(archivo, arrayHojas, dst);
                rpta = String.Format("El archivo de Excel {0} fue creado", nombre);
            }
            return rpta;
        }
        public FileResult listarReporteDetalladoV6(string ss, string hojas)
        {
            string rpta = "";
            string[][,] Data = new string[3][,];
            string[] cadenas = new string[2000000];

            string[] tempo = hojas.Split('|');
            List<string> Hojas = new List<string>();
            brSQL obrSQL = new brSQL();
            int n = (int)Request.InputStream.Length;
            byte[] buffer = new byte[n];
            Request.InputStream.Read(buffer, 0, n);
            string data = Encoding.UTF8.GetString(buffer);
            string msg = obrSQL.EjecutarComando("uspReporteDetalladoListarV6", "@Data", data);
            string nombre = data.Substring(0) == "1" ? "ReporteDetalladoProvision.xlsx" : "ReporteDetalladoPlanilla.xlsx";
            //
            if (msg != "")
            {
                rpta = msg;
                string etiquetas = "Produccion,Horario,Monto_Fijo";
                string[] fechas = { "17,18,19,30,51,60", "29", "18" };
                cadenas = rpta.Split('¬');
                int nCursores = cadenas.Length;
                for (int i = 0; i < nCursores; i++)
                {
                    Data[i] = ExcelXML.CrearMatrizExcel(cadenas[i].Split('¯'), "¦", fechas[i]);
                }
                return crearExcelXLS(ss, Data[0], etiquetas, etiquetas, Data[1], Data[2]);
            }
            return null;
        }
        //public void exportarReporteDetalladoGEN(string ss, string hojas, string nombre, string sp)
        //{
        //        return listarReporteDetalladoGEN(ss, hojas, nombre, sp);
        //    }
        //    else
        //    {
        //        return "Sesion Expirada";
        //    }
        //}

        //Trae un cursor, y exporta directo a Excel XLSX
        public FileResult listarReporteDetalladoGEN(string ss, string hojas, string nombre, string sp)
        {
            FileResult rpta = File(new byte[] { }, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            if (Session["Usuario" + ss] != null)
            {
                string sArchivoXlsx = "";
                string[] arrayHojas = hojas.Split('|');
                brSQL obrSQL = new brSQL();
                int n = (int)Request.InputStream.Length;
                byte[] buffer = new byte[n];
                Request.InputStream.Read(buffer, 0, n);
                string data = Encoding.UTF8.GetString(buffer);

                dst = obrSQL.EjecutarComandoDst(sp, "@Data", data);
                int nDataset = dst.Tables.Count - 1;
                if (nDataset > 0)
                {
                    DataTable miTabla;
                    string rspta = Convert.ToString(dst.Tables[nDataset].Rows[0]["Column1"]);
                    string[] cursores = rspta.Split('¬');
                    //nDataset = 1;
                    for (int i = 0; i < nDataset; i++)
                    {
                        data = cursores[i].ToString();
                        miTabla = dst.Tables[i];
                        ucCustomSerializer.CabeceraDeTabla(data, ref miTabla);
                    }
                    //*** Creamos archivo localmente
                    //sArchivoXlsx = String.Format(@"D:\Archivos\{0}", archivoXlsx);
                    //*** Creamos archivo en el Servidor
                    string carpeta = System.Web.HttpContext.Current.Server.MapPath("~//Files//");
                    sArchivoXlsx = carpeta + nombre;
                    if (System.IO.File.Exists(sArchivoXlsx))
                    {
                        System.IO.File.Delete(sArchivoXlsx);
                    }
                    ExcelXMLx.ExportarTabla2XLSX(sArchivoXlsx, arrayHojas, dst);
                    //*** ZIPEAMOS EL XLSX
                    //string rutaEntrada = sArchivoXlsx;
                    //string rutaSalida = rutaEntrada + ".zip";

                    //using (FileStream fs = new FileStream(rutaSalida, FileMode.Create))
                    //using (ZipArchive arch = new ZipArchive(fs, ZipArchiveMode.Create))
                    //{
                    //    arch.CreateEntryFromFile(rutaEntrada, nombre, CompressionLevel.Optimal);
                    //    arch.Dispose();
                    //}
                    //if (System.IO.File.Exists(rutaEntrada))
                    //{
                    //    System.IO.File.Delete(rutaEntrada);
                    //}
                    //return File(System.IO.File.ReadAllBytes(rutaSalida), "application/zip");
                    return File(System.IO.File.ReadAllBytes(sArchivoXlsx), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                }
            }
            return rpta;
        }
        public ActionResult ReporteCuentaCorriente()
        {
            ViewBag.versionJS = versionJS;
            ViewBag.numeroMeses = numeroMeses;
            return View();
        }

        public string obtenerCuentaCorrienteListas(string su)
        {
            string rpta = "";
            string ListaPeriodo = "", ListaEspecialidad = "", ListaEstado = "";
            brCuentaCorriente obrCuentaCorriente = new brCuentaCorriente();
            beCuentaCorrienteReporteListas obeCuentaCorrienteReporteListas = obrCuentaCorriente.listasReporteCTA(su);
            if (obeCuentaCorrienteReporteListas != null)
            {
                if (obeCuentaCorrienteReporteListas.ListaPeriodo != null && obeCuentaCorrienteReporteListas.ListaPeriodo.Count > 0)
                {
                    ListaPeriodo = ucCustomSerializer.Serializar(obeCuentaCorrienteReporteListas.ListaPeriodo, '¦', '¯', false, "");
                }
                if (obeCuentaCorrienteReporteListas.ListaEspecialidad != null && obeCuentaCorrienteReporteListas.ListaEspecialidad.Count > 0)
                {
                    ListaEspecialidad = ucCustomSerializer.Serializar(obeCuentaCorrienteReporteListas.ListaEspecialidad, '¦', '¯', false, "");
                }
                if (obeCuentaCorrienteReporteListas.ListaEstado != null && obeCuentaCorrienteReporteListas.ListaEstado.Count > 0)
                {
                    ListaEstado = ucCustomSerializer.Serializar(obeCuentaCorrienteReporteListas.ListaEstado, '¦', '¯', false, "");
                }
                rpta = string.Format("{0}¬{1}¬{2}", ListaPeriodo, ListaEspecialidad, ListaEstado);
            }
            return rpta;
        }

        public string obtenerCuentaCorrienteReporte(string su, int opc)
        {
            string rpta = "";
            int n = (int)Request.InputStream.Length;
            byte[] buffer = new byte[n];
            Request.InputStream.Read(buffer, 0, n);
            string strData = Encoding.UTF8.GetString(buffer);
            string[] Datos = strData.Split('|');
            brCuentaCorriente obrCuentaCorriente = new brCuentaCorriente();
            int Dato1 = (Datos[0] == "" ? 0 : int.Parse(Datos[0]));
            int Dato2 = (Datos[1] == "" ? 0 : int.Parse(Datos[1]));
            int Dato3 = (Datos[2] == "" ? 0 : int.Parse(Datos[2]));
            int Dato4 = (Datos[3] == "" ? 0 : int.Parse(Datos[3]));
            int Dato5 = (Datos[4] == "" ? 0 : int.Parse(Datos[4]));
            DateTime Dato6 = DateTime.Parse(Datos[6]);
            DateTime Dato7 = DateTime.Parse(Datos[7]);
            int Dato8 = (Datos[8] == "" ? 0 : int.Parse(Datos[8]));
            int Dato9 = (Datos[9] == "" ? 0 : int.Parse(Datos[9]));
            int Dato10 = (Datos[10] == "" ? 0 : int.Parse(Datos[10]));
            int Dato11 = (Datos[11] == "" ? 0 : int.Parse(Datos[11]));
            switch (opc)
            {
                case 1:
                    List<beCuentaCorrienteReporte1> lbeCuentaCorrienteReporte1 = new List<beCuentaCorrienteReporte1>();
                    lbeCuentaCorrienteReporte1 = obrCuentaCorriente.listarReporteCTA1(su, Dato1, Dato2, Dato3, Dato4, Dato5, Datos[5], Dato6, Dato7, Dato8, Dato9, Dato10, opc, Dato11);
                    if (lbeCuentaCorrienteReporte1 != null && lbeCuentaCorrienteReporte1.Count > 0)
                    {
                        rpta = ucCustomSerializer.Serializar(lbeCuentaCorrienteReporte1, '¦', '¯', false, "");
                    }
                    break;
                case 2:
                    List<beCuentaCorrienteReporte2> lbeCuentaCorrienteReporte2 = new List<beCuentaCorrienteReporte2>();
                    lbeCuentaCorrienteReporte2 = obrCuentaCorriente.listarReporteCTA2(su, Dato1, Dato2, Dato3, Dato4, Dato5, Datos[5], Dato6, Dato7, Dato8, Dato9, Dato10, opc, Dato11);
                    if (lbeCuentaCorrienteReporte2 != null && lbeCuentaCorrienteReporte2.Count > 0)
                    {
                        rpta = ucCustomSerializer.Serializar(lbeCuentaCorrienteReporte2, '¦', '¯', false, "");
                    }
                    break;
                case 3:
                    beCuentaCorrienteReporteDetalle obeCuentaCorrienteReporteDetalle = new beCuentaCorrienteReporteDetalle();
                    obeCuentaCorrienteReporteDetalle = obrCuentaCorriente.listarReporteCTA3(su, Dato1, Dato2, Dato3, Dato4, Dato5, Datos[5], Dato6, Dato7, Dato8, Dato9, Dato10, opc, Dato11);
                    string ListaReporte1 = "", ListaReporte2 = "", ListaReporte3 = "";
                    if (obeCuentaCorrienteReporteDetalle != null)
                    {
                        if (obeCuentaCorrienteReporteDetalle.ListaReporte1 != null && obeCuentaCorrienteReporteDetalle.ListaReporte1.Count > 0)
                        {
                            ListaReporte1 = ucCustomSerializer.Serializar(obeCuentaCorrienteReporteDetalle.ListaReporte1, '¦', '¯', false, "");
                        }
                        if (obeCuentaCorrienteReporteDetalle.ListaReporte2 != null && obeCuentaCorrienteReporteDetalle.ListaReporte2.Count > 0)
                        {
                            ListaReporte2 = ucCustomSerializer.Serializar(obeCuentaCorrienteReporteDetalle.ListaReporte2, '¦', '¯', false, "");
                        }
                        if (obeCuentaCorrienteReporteDetalle.ListaReporte3 != null && obeCuentaCorrienteReporteDetalle.ListaReporte3.Count > 0)
                        {
                            ListaReporte3 = ucCustomSerializer.Serializar(obeCuentaCorrienteReporteDetalle.ListaReporte3, '¦', '¯', false, "");
                        }
                        rpta = string.Format("{0}¬{1}¬{2}", ListaReporte1, ListaReporte2, ListaReporte3);
                    }
                    break;
                case 4:
                    StringBuilder sb = new StringBuilder();

                    beReporteDetalladoProvisionVista obeReporteDetalladoProvisionVista = obrCuentaCorriente.ReporteCTAExcel(su, Dato1, Dato2, Dato3, Dato4, Dato5, Datos[5], Dato6, Dato7, Dato8, Dato9, Dato10, opc);
                    if (obeReporteDetalladoProvisionVista != null)
                    {
                        if (obeReporteDetalladoProvisionVista.listaProduccion != null && obeReporteDetalladoProvisionVista.listaProduccion.Count > 0)
                        {
                            sb.Append(ucCustomSerializer.Serializar(obeReporteDetalladoProvisionVista.listaProduccion, '¦', '¯', false, "", false, true));
                        }
                        sb.Append("¬");
                        if (obeReporteDetalladoProvisionVista.listaHorario != null && obeReporteDetalladoProvisionVista.listaHorario.Count > 0)
                        {
                            sb.Append(ucCustomSerializer.Serializar(obeReporteDetalladoProvisionVista.listaHorario, '¦', '¯', false, ""));
                        }
                        sb.Append("¬");
                        if (obeReporteDetalladoProvisionVista.listaPeriodo != null && obeReporteDetalladoProvisionVista.listaPeriodo.Count > 0)
                        {
                            sb.Append(ucCustomSerializer.Serializar(obeReporteDetalladoProvisionVista.listaPeriodo, '¦', '¯', false, ""));
                        }
                        rpta = sb.ToString();
                    }

                    break;
            }
            return rpta;
        }

        public ActionResult ReportePlanillaObligacion(string ss)
        {
            ViewBag.versionJS = versionJS;
            string dato = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                dato = obeUsuarioLogin.UsuarioId.ToString();
            }
            ViewBag.usuarioId = dato;
            return View();
        }

        public string ListarReportePlanillaObligacion()
        {
            string rpta = "";
            int n = (int)Request.InputStream.Length;
            byte[] buffer = new byte[n];
            Request.InputStream.Read(buffer, 0, n);
            string strData = Encoding.UTF8.GetString(buffer);
            string[] Datos = strData.Split('|');
            string Data1 = Datos[0];
            int Data2 = (Datos[1] == "" ? 0 : int.Parse(Datos[1]));
            int Data3 = (Datos[2] == "" ? 0 : int.Parse(Datos[2]));
            string Data4 = Datos[3];
            DateTime Data5 = (Datos[4] == "") ? DateTime.Parse("01/01/1900") : DateTime.Parse(Datos[4]);
            DateTime Data6 = (Datos[5] == "") ? DateTime.Parse("01/01/1900") : DateTime.Parse(Datos[5]);
            int Data7 = (Datos[6] == "" ? 0 : int.Parse(Datos[6]));
            int Data8 = (Datos[7] == "" ? 0 : int.Parse(Datos[7]));

            brReportePlanillaObligacion obrReportePlanillaObligacion = new brReportePlanillaObligacion();
            List<beReportePlanillaObligacionVista> lbeReportePlanillaObligacionVista = obrReportePlanillaObligacion.listarReporte(Data1, Data2, Data3, Data4, Data5, Data6, Data7, Data8);
            if (lbeReportePlanillaObligacionVista != null && lbeReportePlanillaObligacionVista.Count > 0)
            {
                rpta = ucCustomSerializer.Serializar(lbeReportePlanillaObligacionVista, '¦', '¯', false, "", false, true);
            }
            return rpta;
        }

        public string ListasReportePlanillaObligacion(string su)
        {
            string rpta = "";
            string lista1 = "";
            string lista2 = "";
            string lista3 = "";
            string lista4 = "";
            brReportePlanillaObligacion obrReportePlanillaObligacion = new brReportePlanillaObligacion();
            beReportePlanillaObligacionListas obeReportePlanillaObligacionListas = obrReportePlanillaObligacion.listasReporte(su);
            if (obeReportePlanillaObligacionListas != null)
            {
                if (obeReportePlanillaObligacionListas.Lista1 != null && obeReportePlanillaObligacionListas.Lista1.Count > 0)
                {
                    lista1 = ucCustomSerializer.Serializar(obeReportePlanillaObligacionListas.Lista1, '¦', '¯', false, "", false, true);
                }
                if (obeReportePlanillaObligacionListas.Lista2 != null && obeReportePlanillaObligacionListas.Lista2.Count > 0)
                {
                    lista2 = ucCustomSerializer.Serializar(obeReportePlanillaObligacionListas.Lista2, '¦', '¯', false, "", false, true);
                }
                if (obeReportePlanillaObligacionListas.Lista3 != null && obeReportePlanillaObligacionListas.Lista3.Count > 0)
                {
                    lista3 = ucCustomSerializer.Serializar(obeReportePlanillaObligacionListas.Lista3, '¦', '¯', false, "", false, true);
                }
                if (obeReportePlanillaObligacionListas.Lista4 != null && obeReportePlanillaObligacionListas.Lista4.Count > 0)
                {
                    lista4 = ucCustomSerializer.Serializar(obeReportePlanillaObligacionListas.Lista4, '¦', '¯', false, "", false, true);
                }
                rpta = String.Format("{0}¬{1}¬{2}¬{3}", lista1, lista2, lista3, lista4);
            }
            return rpta;
        }

        public ActionResult ReporteControlConsolidado()
        {
            ViewBag.versionJS = versionJS;
            return View();
        }

        public string ReporteControlConsolidadoListas()
        {
            string rpta = "";
            brReporteControlConsolidado obrReporteControlConsolidado = new brReporteControlConsolidado();
            rpta = obrReporteControlConsolidado.listas();
            return rpta;
        }

        public string ReporteControlConsolidadoListar(int opc)
        {
            string rpta = "";
            int n = (int)Request.InputStream.Length;
            byte[] buffer = new byte[n];
            Request.InputStream.Read(buffer, 0, n);
            string Parametros = Encoding.UTF8.GetString(buffer);
            brReporteControlConsolidado obrReporteControlConsolidado = new brReporteControlConsolidado();
            string lista = obrReporteControlConsolidado.listar(opc, Parametros);
            StringBuilder sb = new StringBuilder();
            sb.Append(opc);
            sb.Append("¯");
            sb.Append(lista);

            return sb.ToString();
        }

        public string CrearPDFConsolidado(int opc)
        {
            string rpta = "";
            int n = (int)Request.InputStream.Length;
            byte[] buffer = new byte[n];
            Request.InputStream.Read(buffer, 0, n);
            string Parametros = Encoding.UTF8.GetString(buffer);
            brReporteControlConsolidado obrReporteControlConsolidado = new brReporteControlConsolidado();
            string lista = obrReporteControlConsolidado.listar(opc, Parametros);

            return rpta;
        }

        private string[,] listaSucursal, listaTipoAtencion, listaTipoServicio, listaComponente, listaDocumentoEstados, listaMedicoEmpresa, listaEspecialidad, listaAseguradora;

        private string[,] listaModalidadFacturacion, listaTipoPaciente, listaTipoAdmision, listaTurno, listaConfiguracionPago, listaUnidadMedica, listaConceptoMontoFijo;

        private string[] listaSucursalDes;

        public FileResult CreacionExcelConsolidado(string ss, int opc, string param)
        {
            if (opc == 4)
            {
                int n = (int)Request.InputStream.Length;
                byte[] buffer = new byte[n];
                Request.InputStream.Read(buffer, 0, n);
                string strData = Encoding.UTF8.GetString(buffer);
                string[] Datos = strData.Split('|');
                string sucursal = Datos[0];
                int PersonaId = int.Parse(Datos[1]);
                int EmpresaId = int.Parse((Datos[2] == "" ? "0" : Datos[2]));
                int PeriodoId = int.Parse(Datos[3]);
                int TipoAdmision = int.Parse(Datos[4]);
                int Especialidad = int.Parse(Datos[5]);

                //StringBuilder sb = new StringBuilder();
                brReporteDetalladoProvision obrReporteDetalladoProvision = new brReporteDetalladoProvision();
                beReporteDetalladoProvisionVista obeReporteDetalladoProvisionVista = obrReporteDetalladoProvision.listar("1", sucursal, PeriodoId, TipoAdmision, Especialidad, PersonaId, EmpresaId);

                string Datos0 = "", Datos1 = "", Datos2 = "";
                string[,] Data = null, Data2 = null, Data3 = null;
                if (obeReporteDetalladoProvisionVista != null)
                {
                    if (obeReporteDetalladoProvisionVista.listaProduccion != null && obeReporteDetalladoProvisionVista.listaProduccion.Count > 0)
                    {
                        Datos0 = (ucCustomSerializer.Serializar(obeReporteDetalladoProvisionVista.listaProduccion, '¦', '¬', false, "", false, true));
                    }
                    if (obeReporteDetalladoProvisionVista.listaHorario != null && obeReporteDetalladoProvisionVista.listaHorario.Count > 0)
                    {
                        Datos1 = (ucCustomSerializer.Serializar(obeReporteDetalladoProvisionVista.listaHorario, '¦', '¬', false, ""));
                    }
                    if (obeReporteDetalladoProvisionVista.listaPeriodo != null && obeReporteDetalladoProvisionVista.listaPeriodo.Count > 0)
                    {
                        Datos2 = (ucCustomSerializer.Serializar(obeReporteDetalladoProvisionVista.listaPeriodo, '¦', '¬', false, ""));
                    }
                }


                Data = CrearMatriz(Datos0.Split('¬'), "¦", "OP41ReportePrincipal", "17,18,19,30,51,60");
                Data2 = CrearMatriz(Datos1.Split('¬'), "¦", "OP42ReportePrincipal", "29");
                Data3 = CrearMatriz(Datos2.Split('¬'), "¦", "OP43ReportePrincipal", "18");
                return crearExcelConsolidados(ss, Data, "Produccion,Horario,Monto_Fijo", "Produccion,Horario,Monto Fijo", "OP4ReportePrincipal", Data2, Data3);
            }
            else
            {

                brReporteControlConsolidado obrReporteControlConsolidado = new brReporteControlConsolidado();
                string Listas = obrReporteControlConsolidado.listas();
                string[] MatrizListas = Listas.Split('¯');
                string lista = "";
                string[] Datos = null;
                string[,] Data = null, Data2 = null, Data3 = null;
                listaSucursalDes = MatrizListas[0].Split('¬');
                listaSucursal = CrearMatriz(MatrizListas[0].Split('¬'), "¦");
                listaTipoAtencion = CrearMatriz(MatrizListas[1].Split('¬'), "¦");
                listaTipoServicio = CrearMatriz(MatrizListas[2].Split('¬'), "¦");
                listaComponente = CrearMatriz(MatrizListas[3].Split('¬'), "¦");
                listaDocumentoEstados = CrearMatriz(MatrizListas[4].Split('¬'), "¦");
                listaMedicoEmpresa = CrearMatriz(MatrizListas[5].Split('¬'), "¦");
                listaEspecialidad = CrearMatriz(MatrizListas[6].Split('¬'), "¦");
                listaAseguradora = CrearMatriz(MatrizListas[7].Split('¬'), "¦");
                listaModalidadFacturacion = CrearMatriz(MatrizListas[8].Split('¬'), "¦");
                listaTipoPaciente = CrearMatriz(MatrizListas[9].Split('¬'), "¦");
                listaTipoAdmision = CrearMatriz(MatrizListas[10].Split('¬'), "¦");
                listaTurno = CrearMatriz(MatrizListas[11].Split('¬'), "¦");
                listaConfiguracionPago = CrearMatriz(MatrizListas[12].Split('¬'), "¦");
                listaUnidadMedica = CrearMatriz(MatrizListas[13].Split('¬'), "¦");
                listaConceptoMontoFijo = CrearMatriz(MatrizListas[14].Split('¬'), "¦");

                lista = obrReporteControlConsolidado.listar(opc, param);
                Datos = lista.Split('¯');
                switch (opc)
                {
                    case 1:
                        Data = CrearMatriz(Datos[0].Split('¬'), "¦", "OP1ReportePrincipal", "5,7,24,25,26,27");
                        return crearExcelConsolidados(ss, Data, "Seguimiento_Operativo", "Seguimiento_Operativo", "OP1ReportePrincipal");
                        break;
                    case 2:
                        Data = CrearMatriz(Datos[0].Split('¬'), "¦", "OP21ReportePrincipal", "5,7,24,25,26,27");
                        Data2 = CrearMatriz(Datos[1].Split('¬'), "¦", "OP22ReportePrincipal", "3");
                        Data3 = CrearMatriz(Datos[2].Split('¬'), "¦", "OP23ReportePrincipal", "4,5");
                        return crearExcelConsolidados(ss, Data, "Produccion,Horario,Monto_Fijo", "Produccion,Horario,Monto Fijo", "OP2ReportePrincipal", Data2, Data3);
                        break;
                    case 3:
                        Data = CrearMatriz(Datos[0].Split('¬'), "¦", "OP3ReportePrincipal", "4,5,15,16");
                        return crearExcelConsolidados(ss, Data, "Contratos", "Contratos", "OP3ReportePrincipal");
                        break;
                }

            }
            return null;
        }

        private string BuscarLista(string[,] matriz, string valor, string posicion, int posrespuesta, string separador = "")
        {
            string rpta = "";
            //var matriz = [], valBusqueda, valBusquedaPos, contenido = "";
            string[] valBusqueda;
            string[] valBusquedaPos;
            if (valor.Split(',').Length > 1)
            {
                valBusqueda = valor.Split(',');
                valBusquedaPos = posicion.Split(',');

                for (int y = 0; y < valBusqueda.Length; y++)
                {
                    for (int x = 0; x < matriz.GetLength(1); x++)
                    {
                        if (matriz[x, int.Parse(valBusquedaPos[y])].Equals(valBusqueda[y]))
                        {
                            rpta = matriz[x, posrespuesta].ToString();
                            break;
                        }
                    }
                }
            }
            else
            {
                for (int x = 0; x < matriz.GetLength(0); x++)
                {

                    if (matriz[x, int.Parse(posicion)].Equals(valor))
                    {
                        rpta = matriz[x, posrespuesta].ToString();
                        break;
                    }
                }
            }
            return rpta;
        }

        private bool BuscarIdxLista(string[,] matriz = null, string[] matrizsec = null, string indice = "", int idxbi = -1)
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

        private string[,] CrearMatriz(string[] lista = null, string separador = "", string identificador = "", string fechas = "")
        {
            string[,] matriz = null;
            string[] matrizIndicesFecha = null;
            int nRegistros = lista.Length;
            int nCampos = 0, x = 0, j = 0;
            string[] Datos = null;
            identificador = (identificador == null ? "" : identificador.Trim());
            if (identificador != "")
            {
                matriz = null;
            }
            if (fechas != null && fechas.Trim() != "")
            {
                matrizIndicesFecha = fechas.Split(',');
            }
            if (nRegistros > 0 && lista[0] != "")
            {
                nCampos = lista[0].Split(char.Parse(separador)).Length;
                switch (identificador)
                {
                    case "OP1ReportePrincipal":
                    case "OP21ReportePrincipal":
                        matriz = new string[nRegistros, (nCampos + 4)];
                        break;
                    case "OP22ReportePrincipal":
                        matriz = new string[nRegistros, (nCampos + 4)];
                        break;
                    case "OP23ReportePrincipal":
                        matriz = new string[nRegistros, (nCampos + 2)];
                        break;
                    case "OP3ReportePrincipal":
                        matriz = new string[nRegistros, (nCampos + 12)];
                        break;
                    default:
                        matriz = new string[nRegistros, nCampos];
                        break;
                }

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
                switch (identificador)
                {
                    case "OP1ReportePrincipal":
                    case "OP21ReportePrincipal":
                        for (int i = nRegistros; i > 0; i--)
                        {
                            matriz[x, matriz.GetLength(1) - 4] = BuscarLista(listaComponente, matriz[x, 9].ToString(), "0", 1);
                            matriz[x, matriz.GetLength(1) - 3] = BuscarLista(listaMedicoEmpresa, matriz[x, 17].ToString(), "0", 1);
                            matriz[x, matriz.GetLength(1) - 2] = BuscarLista(listaMedicoEmpresa, matriz[x, 18].ToString(), "0", 1);
                            matriz[x, matriz.GetLength(1) - 1] = BuscarLista(listaAseguradora, matriz[x, 22].ToString(), "0", 1);
                            x++;
                        }
                        break;
                    case "OP22ReportePrincipal":
                        for (int i = nRegistros; i > 0; i--)
                        {
                            matriz[x, matriz.GetLength(1) - 4] = BuscarLista(listaMedicoEmpresa, matriz[x, 2].ToString(), "0", 1);
                            matriz[x, matriz.GetLength(1) - 3] = BuscarLista(listaEspecialidad, matriz[x, 8].ToString(), "0", 1);
                            matriz[x, matriz.GetLength(1) - 2] = BuscarLista(listaTipoAtencion, matriz[x, 9].ToString(), "0", 1);
                            matriz[x, matriz.GetLength(1) - 1] = BuscarLista(listaUnidadMedica, matriz[x, 11].ToString(), "0", 1);
                            x++;
                        }
                        break;
                    case "OP23ReportePrincipal":
                        for (int i = nRegistros; i > 0; i--)
                        {
                            matriz[x, matriz.GetLength(1) - 2] = BuscarLista(listaMedicoEmpresa, matriz[x, 2].ToString(), "0", 1);
                            matriz[x, matriz.GetLength(1) - 1] = BuscarLista(listaConceptoMontoFijo, matriz[x, 7].ToString(), "0", 1);
                            x++;
                        }
                        break;
                    case "OP3ReportePrincipal":
                        string[] datosCadena = new string[] { };

                        List<string> contenido = new List<string>();
                        int contadorMat = 0;
                        for (int i = nRegistros; i > 0; i--)
                        {
                            Array.Clear(datosCadena, 0, datosCadena.Length);
                            contenido.Clear();
                            matriz[x, matriz.GetLength(1) - 12] = BuscarLista(listaMedicoEmpresa, matriz[x, 1].ToString(), "0", 1);
                            matriz[x, matriz.GetLength(1) - 11] = BuscarLista(listaMedicoEmpresa, matriz[x, 1].ToString(), "0", 2);
                            matriz[x, matriz.GetLength(1) - 10] = BuscarLista(listaMedicoEmpresa, matriz[x, 1].ToString(), "0", 3);
                            matriz[x, matriz.GetLength(1) - 9] = BuscarLista(listaMedicoEmpresa, matriz[x, 1].ToString(), "0", 4);
                            matriz[x, matriz.GetLength(1) - 8] = BuscarLista(listaMedicoEmpresa, matriz[x, 1].ToString(), "0", 5);
                            if (matriz[x, 11] != "")
                            {
                                datosCadena = matriz[x, 11].Split('-');
                                for (int o = 0; o < (datosCadena.Length - 1); o++)
                                {
                                    if (datosCadena[o] != "")
                                    {
                                        contenido.Add(BuscarLista(listaEspecialidad, datosCadena[o], "0", 1));
                                    }
                                }
                                matriz[x, matriz.GetLength(1) - 7] = String.Join("-", contenido.ToArray());
                            }
                            else
                            {
                                matriz[x, matriz.GetLength(1) - 7] = "";
                            }
                            contadorMat = 0;
                            datosCadena = new string[] { };
                            contenido.Clear();

                            if (matriz[x, 12] != "")
                            {

                                datosCadena = matriz[x, 12].Split('-');
                                for (int o = 0; o < (datosCadena.Length - 1); o++)
                                {
                                    if (datosCadena[o] != "")
                                    {
                                        contenido.Add(BuscarLista(listaMedicoEmpresa, datosCadena[o], "0", 1));
                                    }
                                }
                                matriz[x, matriz.GetLength(1) - 6] = String.Join("-", contenido.ToArray());
                            }
                            else
                            {
                                matriz[x, matriz.GetLength(1) - 6] = "";
                            }

                            matriz[x, matriz.GetLength(1) - 5] = BuscarLista(listaConfiguracionPago, matriz[x, 14].ToString(), "0", 1);
                            matriz[x, matriz.GetLength(1) - 4] = (BuscarLista(listaAseguradora, matriz[x, 23].ToString(), "0", 1) == "" ? "Todos" : BuscarLista(listaAseguradora, matriz[x, 23].ToString(), "0", 1));
                            matriz[x, matriz.GetLength(1) - 3] = BuscarLista(listaEspecialidad, matriz[x, 25].ToString(), "0", 1);
                            matriz[x, matriz.GetLength(1) - 2] = BuscarLista(listaTurno, matriz[x, 26].ToString(), "0", 1);
                            matriz[x, matriz.GetLength(1) - 1] = BuscarLista(listaComponente, matriz[x, 32].ToString(), "0", 1);
                            x++;
                        }
                        break;
                }
            }
            return matriz;
        }

        private FileResult crearExcelConsolidados(string ss, string[,] matriz, string lista, string pestania, string identificador, string[,] matriz2 = null, string[,] matriz3 = null)
        {
            StringBuilder NuevaCadena = new StringBuilder();
            string nombreConsArc = "";

            switch (identificador)
            {
                case "OP1ReportePrincipal":
                    nombreConsArc = "Reporte_Seguimiento_Operativo";
                    break;
                case "OP2ReportePrincipal":
                    nombreConsArc = "Reporte_Pendiente";
                    break;
                case "OP3ReportePrincipal":
                    nombreConsArc = "Reporte_Contrato";
                    break;
                case "OP4ReportePrincipal":
                    nombreConsArc = "Reporte_Provision";
                    break;
            }

            string archivo = Server.MapPath("~//Files//ExcelConsolidados//");
            string[] matrizNombres = lista.Split(',');
            string[] matrizPestania = pestania.Split(',');
            int ContadorArchivos = 0, Cont2 = 0;
            string carpeta = archivo + ContadorArchivos + "_" + nombreConsArc + "_" + ss + ".xls.zip";

            if (System.IO.File.Exists(carpeta))
            {
                System.IO.File.Delete(carpeta);
            }

            if (lista.Trim() == "")
            {
                return null;
            }
            int nx = (matrizNombres.Length);
            using (StreamWriter contenido = new StreamWriter(archivo + ContadorArchivos + "_" + nombreConsArc + "_" + ss + ".xls", false))
            {
                contenido.Write("<?xml version='1.0' encoding='UTF-8'?><Workbook xmlns='urn:schemas-microsoft-com:office:spreadsheet' xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:ss='urn:schemas-microsoft-com:office:spreadsheet' xmlns:x='urn:schemas-microsoft-com:office:excel'><DocumentProperties xmlns='urn:schemas-microsoft-com:office:office'><Author xmlns='urn:schemas-microsoft-com:office:office'>ewoychowsky</Author><Company xmlns='urn:schemas-microsoft-com:office:office'>EAW</Company><Version xmlns='urn:schemas-microsoft-com:office:office'>10.4219</Version></DocumentProperties><OfficeDocumentSettings xmlns='urn:schemas-microsoft-com:office:office'><DownloadComponents xmlns='urn:schemas-microsoft-com:office:office'/><LocationOfComponents xmlns='urn:schemas-microsoft-com:office:office'/></OfficeDocumentSettings><ExcelWorkbook xmlns='urn:schemas-microsoft-com:office:excel'><WindowHeight xmlns='urn:schemas-microsoft-com:office:excel'>9210</WindowHeight><WindowWidth xmlns='urn:schemas-microsoft-com:office:excel'>15195</WindowWidth><WindowTopX xmlns='urn:schemas-microsoft-com:office:excel'>0</WindowTopX><WindowTopY xmlns='urn:schemas-microsoft-com:office:excel'>60</WindowTopY><ProtectStructure xmlns='urn:schemas-microsoft-com:office:excel'>False</ProtectStructure><ProtectWindows xmlns='urn:schemas-microsoft-com:office:excel'>False</ProtectWindows></ExcelWorkbook><Styles><Style ss:ID='Default' ss:Name='Normal'> <Alignment ss:Vertical='Bottom'/><Borders/><Font/><Interior/><NumberFormat/><Protection/></Style>");
                contenido.Write("<Style ss:ID='s62'> <NumberFormat ss:Format='dd/mm/yyyy h:mm:ss'/></Style>");
                contenido.Write("<Style ss:ID='s63'><NumberFormat ss:Format='0.000000'/></Style>");
                contenido.Write("<Style ss:ID='s65'> <NumberFormat ss:Format='&quot;&quot;#,##0.00'/>");
                contenido.Write("<Alignment ss:Horizontal='Right'/></Style><Style ss:ID='s79'> <Font ss:FontName='Calibri' x:Family='Swiss' ss:Size='11' ss:Color='#FFFFFF'/> <Interior ss:Color='#00B050' ss:Pattern='Solid'/></Style></Styles>");
                ContadorArchivos = ContadorArchivos + 1;
            }
            int n = 0, ncampos = 0;
            string[] matrizCabecera = null;
            int[] matrizIndice = null, matrizAnchos = null;
            string nombre = "";


            for (int x = 0; x < nx; x++)
            {
                switch (identificador)
                {
                    case "OP1ReportePrincipal":
                        matrizIndice = new int[] { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 42, 10, 11, 12, 13, 14, 15, 16, 17, 43, 18, 44, 19, 20, 21, 45, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41 };
                        matrizCabecera = new string[]{"Tipo Reporte", "Sucursal", "Tipo de Registro", "Tipo de Atención", "Código OA", "Fecha Inicio OA", "Periodo Prod.", "Fecha de Proced.", "Tipo de Servicio", "Codigo Prestación", "Prestación", "Cantidad", "Precio Venta", "Importe", "Estado Prestación",
                        "Estado OA", "ID OA", "Linea OA", "Id Médico", "Médico", "Id Médico Secundario", "Médico Secundario", "Especialidad", "Paciente", "Tipo Paciente", "Aseguradora", "Mod. Facturación", "Fecha Hora Crea.", "Fecha Hora Modif.", "Fecha Hora Atend.", "Fecha Hora Term.", "IndInforme", "IndAnamnesis",
                        "IndCierreEME", "IndHonorario", "IdTransaccion", "Transacción Caja", "Estado Hospitalización", "Situación Detalle Hospitalización", "Ind.Eliminado", "Situación Detalle Expediente", "IdPlanilla", "EstadoPlanilla", "Ind.Provisionado", "Id Proceso"};
                        matrizAnchos = new int[] { 420, 250, 145, 145, 100, 145, 150, 145, 400, 150, 400, 140, 140, 140, 150, 150, 100, 100, 100, 400, 150, 400, 400, 400, 400, 400, 145, 145, 145, 145, 145, 120, 120, 120, 120, 120, 200, 145, 210, 120, 200, 120, 145, 120, 120 };
                        n = (matriz == null ? 0 : matriz.GetLength(0));
                        ncampos = matrizCabecera.Length;
                        break;
                    case "OP2ReportePrincipal":
                        switch (x)
                        {
                            case 0:
                                matrizIndice = new int[] { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 46, 10, 11, 12, 13, 14, 15, 16, 17, 47, 18, 48, 19, 20, 21, 49, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45 };
                                matrizCabecera = new string[]{"Tipo Reporte", "Sucursal", "Tipo de Registro", "Tipo de Atención", "Código OA", "Fecha Inicio OA", "Periodo Prod.", "Fecha de Proced.", "Tipo de Servicio", "Codigo Prestación", "Prestación", "Cantidad", "Precio Venta", "Importe", "Estado Prestación",
                                "Estado OA", "ID OA", "Linea OA", "Id Médico", "Médico", "Id Médico Secundario", "Médico Secundario", "Especialidad", "Paciente", "Tipo Paciente", "Aseguradora", "Mod. Facturación", "Fecha Hora Crea.", "Fecha Hora Modif.", "Fecha Hora Atend.", "Fecha Hora Term.", "IndInforme", "IndAnamnesis",
                                "IndCierreEME", "IndHonorario", "IdTransaccion", "Transacción Caja", "Estado Hospitalización", "Situación Detalle Hospitalización", "Ind.Eliminado", "Situación Detalle Expediente", "IdPlanilla", "EstadoPlanilla", "Ind.Provisionado", "Id Proceso", "Tipo Observación", "Patron", "Observación", "Descripción Validación"};
                                matrizAnchos = new int[] { 420, 250, 145, 145, 100, 145, 150, 145, 400, 150, 400, 140, 140, 140, 150, 150, 100, 100, 100, 400, 150, 400, 400, 400, 400, 400, 145, 145, 145, 145, 145, 120, 120, 120, 120, 120, 200, 145, 210, 120, 200, 120, 145, 120, 120, 200, 200, 200, 200 };
                                n = (matriz == null ? 0 : matriz.GetLength(0));
                                ncampos = matrizCabecera.Length;
                                break;
                            case 1:
                                matrizIndice = new int[] { 0, 1, 2, 12, 3, 4, 5, 6, 7, 13, 14, 10, 11, 15 };
                                matrizCabecera = new string[] { "Tipo Reporte", "Sucursal", "Id Médico", "Médico", "Fecha", "Hora Inicio", "Hora Fin", "Dia", "Indicador Feriado", "Especialidad", "Tipo Atención", "Estado", "Unidad Id", "Unidad Médica" };
                                matrizAnchos = new int[] { 250, 250, 90, 400, 100, 100, 100, 100, 100, 400, 250, 100, 100, 300 };
                                n = (matriz2 == null || matriz2.GetLength(0) == 0 ? 0 : matriz2.GetLength(0));
                                ncampos = matrizCabecera.Length;
                                Cont2 = 0;
                                NuevaCadena = new StringBuilder();
                                break;
                            case 2:
                                matrizIndice = new int[] { 0, 1, 2, 9, 3, 4, 5, 6, 7, 10, 8 };
                                matrizCabecera = new string[] { "Tipo Reporte", "Sucursal", "Id Médico", "Médico", "Descripción", "Fecha Inicio", "Fecha Fin", "Valor", "Concepto Monto Fijo Id", "Concepto Monto Fijo", "Estado" };
                                matrizAnchos = new int[] { 250, 250, 90, 400, 400, 100, 100, 120, 150, 300, 150 };
                                n = (matriz3 == null || matriz3.GetLength(0) == 0 ? 0 : matriz3.GetLength(0));
                                ncampos = matrizCabecera.Length;
                                Cont2 = 0;
                                NuevaCadena = new StringBuilder();
                                break;
                        }
                        break;
                    case "OP3ReportePrincipal":
                        matrizIndice = new int[] { 0, 1, 33, 34, 35, 36, 37, 2, 3, 4, 5, 6, 7, 8, 9, 10, 38, 39, 13, 40, 15, 16, 17, 18, 19, 20, 21, 22, 41, 24, 25, 26, 27, 28, 29, 30, 31, 32, 44 };
                        matrizCabecera = new string[]{"Sucursal Médico", "Id Médico", "Médico", "Tipo Persona", "Numero Documento", "Documento Fiscal", "Estado Médico", "Sucursal Contrato", "Id Contrato", "Fecha Inicio Contrato", "Fecha Fin Contrato", "Estado Contrato", "Indicador Adjunto",
                                    "Nombre Archivo", "Nombre Repositorio", "Indicador Contrato", "Especialidad", "Empresa", "Tipo Médico", "Modalidad Pago", "Fecha Inicio Contrato Detalle", "Fecha Fin Contrato Detalle", "Secuencia", "Tipo Registro",
                                    "Tipo Atención", "Tipo Admisión", "Tipo Paciente", "Servicio", "Aseguradora", "Contrato", "Especialidad", "Turno", "Tipo Valor", "Valor1", "Valor2", "Alcance Prestación", "Estado Linea Configuración", "Id Componente", "Componente"};
                        matrizAnchos = new int[] { 200, 100, 400, 145, 130, 145, 100, 200, 100, 150, 150, 100, 120, 200, 200, 120, 300, 300, 100, 110, 180, 180, 70, 100, 100, 100, 120, 400, 300, 145, 300, 120, 120, 120, 120, 120, 150, 120, 300 };
                        n = (matriz == null ? 0 : matriz.GetLength(0));
                        ncampos = matrizCabecera.Length;
                        break;
                    case "OP4ReportePrincipal":
                        switch (x)
                        {
                            case 0:
                                matrizIndice = new int[] { 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,
                                                           47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62};
                                matrizCabecera = new string[]{"Periodo", "SucursalId", "Sucursal", "IdEmpresa", "Empresa", "IdMedico", "Médico", "TipoAdmisión", "CodigoOA", "IdOrdenAtencion", "Línea Orden", "IdExpediente", "Codigo Prestación", "Prestación", "PeriodoProduccion", "TipoRegistro","IndicadorIncluidoPlanilla","F. Atención", "Fecha Atendido", "Fecha Termino", "Precio Unitario", "Costo Prest.", "Cantidad", "Monto Imponible", "Valor Medida", "Tipo Valor", "Valor", "Porcentaje", "Parte Médico", "Bonificación", "F. Inicio OA", "Tipo Paciente", "Tipo Atención", "Aseguradora", "Servicio", "Mod. Facturación", "Especialidad", "Estado Prestación", "Estado Registro", "Ajuste", "Total Provisión", "Paciente", "Ajuste ProcesoId", "Id Planilla SPRING", "Id Estado Planilla SPRING", "Indicador Honorario",
                                    "EstadoHospitalizacion", "SituacionDetalleHospitalizacion", "IndicadorEliminado", "SituacionDetalleExpediente","Estado Planilla", "Fecha Hora Creación", "Estado Provisión", "Cuenta Costo", "Cuenta Proveedor", "Id.Doc.Contable",
                                    "Id Planilla Web", "Estado Planilla Web", "Tipo Documento Pago", "Numero Documento", "Fecha Emision", "Indicador No Visible Planilla","Indicador Excluido"};
                                matrizAnchos = new int[] { 65, 70, 100, 75, 405, 75, 405, 100, 80, 115, 80, 90, 120, 900, 125, 90, 125, 125, 125, 100, 70, 70, 120, 100, 100, 100, 100, 100, 100, 125, 300, 100, 420, 200, 200, 420, 120, 120, 120, 120, 650, 120, 120, 120, 120, 120, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140 };
                                n = (matriz == null ? 0 : matriz.GetLength(0));
                                ncampos = matrizCabecera.Length;
                                break;
                            case 1:
                                matrizIndice = new int[] { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29 };
                                matrizCabecera = new string[]{"SucursalId", "Sucursal", "Periodo", "IdEmpresa", "Empresa", "Id Médico", "Médico", "Fecha", "Hora Inicio", "Hora Fin", "Horas Programadas", "Día", "Indicador Feriado", "Valor Contrato", "Parte Médico","Bonificación", "Total", "Especialidad", "Tipo Atención", "Estado", "Unidad Medica Id", "Unidad Medica", "Cuenta Costo", "Cuenta Proveedor",
                                    "Id.Doc.Contable", "Id Planilla Web", "Estado Planilla Web", "Tipo Documento Pago", "Numero Documento", "Fecha Emision"};
                                matrizAnchos = new int[] { 70, 100, 65, 75, 405, 75, 405, 125, 125, 125, 125, 70, 120, 120, 120, 120, 120, 420, 110, 70, 120, 300, 140, 140, 140, 140, 140, 140, 140, 140 };
                                n = (matriz2 == null || matriz2.GetLength(0) == 0 ? 0 : matriz2.GetLength(0));
                                ncampos = matrizCabecera.Length;
                                Cont2 = 0;
                                NuevaCadena = new StringBuilder();
                                break;
                            case 2:
                                matrizIndice = new int[] { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 };
                                matrizCabecera = new string[]{"Periodo", "SucursalId", "Sucursal", "IdEmpresa", "Empresa", "IdMedico", "Médico", "Descripción", "Importe","Concepto Monto Fijo Id", "Concepto", "Cuenta Costo", "Cuenta Proveedor",
                                    "Id.Doc.Contable", "Id Planilla Web", "Estado Planilla Web", "Tipo Documento Pago", "Numero Documento", "Fecha Emision"};
                                matrizAnchos = new int[] { 65, 70, 100, 75, 405, 75, 405, 650, 80, 160, 300, 140, 140, 140, 140, 140, 140, 140, 140 };
                                n = (matriz3 == null || matriz3.GetLength(0) == 0 ? 0 : matriz3.GetLength(0));
                                ncampos = matrizCabecera.Length;
                                Cont2 = 0;
                                NuevaCadena = new StringBuilder();
                                break;
                        }
                        break;
                }


                nombre = (matrizPestania[x].Trim() == "" ? "OPCION " + (x + 1) : matrizPestania[x]);


                NuevaCadena.Append("<Worksheet ss:Name='" + nombre + "'><Table>");
                for (int u = 0; u < matrizAnchos.Length; u++)
                {
                    NuevaCadena.Append("<ss:Column ss:Width='" + matrizAnchos[u] + "'/>");
                }
                NuevaCadena.Append("<Row>");
                for (int t = 0; t < matrizCabecera.Length; t++)
                {
                    NuevaCadena.Append("<Cell ss:StyleID='s79'>");
                    NuevaCadena.Append("<Data ss:Type='String'>");
                    NuevaCadena.Append(matrizCabecera[t]);
                    NuevaCadena.Append("</Data>");
                    NuevaCadena.Append("</Cell>");
                }
                NuevaCadena.Append("</Row>");
                if (n == 0)
                {
                    using (StreamWriter contenido = new StreamWriter(archivo + ContadorArchivos + "_" + nombreConsArc + "_" + ss + ".xls", false))
                    {
                        contenido.Write(NuevaCadena.ToString());
                    }
                }
                for (int i = 0; i < n; i++)
                {
                    if (Cont2 == 8000)
                    {
                        NuevaCadena = new StringBuilder();
                        ContadorArchivos = ContadorArchivos + 1;
                        Cont2 = 0;
                    }
                    else
                    {
                        Cont2 = Cont2 + 1;
                    }
                    NuevaCadena.Append("<Row>");
                    for (int j = 0; j < ncampos; j++)
                    {
                        switch (identificador)
                        {
                            case "OP1ReportePrincipal":
                                switch (j)
                                {
                                    case 0:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        switch (matriz[i, matrizIndice[j]])
                                        {
                                            case "1":
                                                NuevaCadena.Append("Procedimientos y Consultas sin médico o especialidad");
                                                break;
                                            case "2":
                                                NuevaCadena.Append("Procedimientos y Consultas pendientes de cierre de emergencia");
                                                break;
                                            case "3":
                                                NuevaCadena.Append("Procedimientos y Consultas pendientes de atención");
                                                break;
                                            case "4":
                                                NuevaCadena.Append("Consultas sin anamnesis");
                                                break;
                                            case "5":
                                                NuevaCadena.Append("Procedimientos sin informe médico");
                                                break;
                                        }
                                        break;
                                    case 1:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaSucursal, matriz[i, matrizIndice[j]], "0", 1));
                                        break;
                                    case 3:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaTipoAtencion, matriz[i, matrizIndice[j]], "0", 1));
                                        break;
                                    case 8:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaTipoServicio, matriz[i, matrizIndice[j]], "0", 1));
                                        break;
                                    case 12:
                                    case 13:
                                        NuevaCadena.Append("<Cell ss:StyleID='s65'>");
                                        NuevaCadena.Append("<Data ss:Type='Number'>");
                                        NuevaCadena.Append(double.Parse(matriz[i, matrizIndice[j]]));
                                        break;
                                    case 15:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaDocumentoEstados, "44," + matriz[i, matrizIndice[j]], "0,1", 2));
                                        break;
                                    case 22:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaEspecialidad, matriz[i, matrizIndice[j]], "0", 1));
                                        break;
                                    case 24:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaTipoPaciente, matriz[i, matrizIndice[j]], "0", 1));
                                        break;
                                    case 26:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaModalidadFacturacion, matriz[i, matrizIndice[j]], "0", 1));
                                        break;
                                    case 31:
                                    case 32:
                                    case 33:
                                    case 34:
                                    case 39:
                                    case 43:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append((matriz[i, matrizIndice[j]] == "1" ? "SI" : "NO"));
                                        break;
                                    case 36:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaDocumentoEstados, "41," + matriz[i, matrizIndice[j]], "0,1", 2));
                                        break;
                                    case 37:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaDocumentoEstados, "54," + matriz[i, matrizIndice[j]], "0,1", 2));
                                        break;
                                    case 38:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaDocumentoEstados, "101," + matriz[i, matrizIndice[j]], "0,1", 2));
                                        break;
                                    case 40:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaDocumentoEstados, "100," + matriz[i, matrizIndice[j]], "0,1", 2));
                                        break;
                                    case 42:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaDocumentoEstados, "51," + matriz[i, matrizIndice[j]], "0,1", 2));
                                        break;
                                    case 18:
                                    case 20:
                                    case 41:
                                    case 44:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append((matriz[i, matrizIndice[j]] == "0" ? "" : matriz[i, matrizIndice[j]]));
                                        break;
                                    case 45:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        switch (matriz[i, matrizIndice[j]])
                                        {
                                            case "P":
                                                NuevaCadena.Append("PENDIENTE");
                                                break;
                                            case "I":
                                                NuevaCadena.Append("INFORMATIVO");
                                                break;
                                            default:
                                                NuevaCadena.Append("");
                                                break;
                                        }
                                        break;
                                    default:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(matriz[i, matrizIndice[j]]);
                                        break;
                                }
                                break;
                            case "OP2ReportePrincipal":
                                switch (x)
                                {
                                    case 0:
                                        switch (j)
                                        {
                                            case 0:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append("Pendientes de Provisión - Producción");
                                                break;
                                            case 1:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(BuscarLista(listaSucursal, matriz[i, matrizIndice[j]], "0", 1));
                                                break;
                                            case 3:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(BuscarLista(listaTipoAtencion, matriz[i, matrizIndice[j]], "0", 1));
                                                break;
                                            case 8:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(BuscarLista(listaTipoServicio, matriz[i, matrizIndice[j]], "0", 1));
                                                break;
                                            case 12:
                                            case 13:
                                                NuevaCadena.Append("<Cell ss:StyleID='s65'>");
                                                NuevaCadena.Append("<Data ss:Type='Number'>");
                                                NuevaCadena.Append(double.Parse(matriz[i, matrizIndice[j]]));
                                                break;
                                            case 15:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(BuscarLista(listaDocumentoEstados, "44," + matriz[i, matrizIndice[j]], "0,1", 2));
                                                break;
                                            case 22:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(BuscarLista(listaEspecialidad, matriz[i, matrizIndice[j]], "0", 1));
                                                break;
                                            case 24:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(BuscarLista(listaTipoPaciente, matriz[i, matrizIndice[j]], "0", 1));
                                                break;
                                            case 26:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(BuscarLista(listaModalidadFacturacion, matriz[i, matrizIndice[j]], "0", 1));
                                                break;
                                            case 31:
                                            case 32:
                                            case 33:
                                            case 34:
                                            case 39:
                                            case 43:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append((matriz[i, matrizIndice[j]] == "1" ? "SI" : "NO"));
                                                break;
                                            case 36:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(BuscarLista(listaDocumentoEstados, "41," + matriz[i, matrizIndice[j]], "0,1", 2));
                                                break;
                                            case 37:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(BuscarLista(listaDocumentoEstados, "54," + matriz[i, matrizIndice[j]], "0,1", 2));
                                                break;
                                            case 38:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(BuscarLista(listaDocumentoEstados, "101," + matriz[i, matrizIndice[j]], "0,1", 2));
                                                break;
                                            case 40:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(BuscarLista(listaDocumentoEstados, "100," + matriz[i, matrizIndice[j]], "0,1", 2));
                                                break;
                                            case 42:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(BuscarLista(listaDocumentoEstados, "51," + matriz[i, matrizIndice[j]], "0,1", 2));
                                                break;
                                            case 18:
                                            case 20:
                                            case 41:
                                            case 44:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append((matriz[i, matrizIndice[j]] == "0" ? "" : matriz[i, matrizIndice[j]]));
                                                break;
                                            case 45:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                switch (matriz[i, matrizIndice[j]])
                                                {
                                                    case "P":
                                                        NuevaCadena.Append("PENDIENTE");
                                                        break;
                                                    case "I":
                                                        NuevaCadena.Append("INFORMATIVO");
                                                        break;
                                                    default:
                                                        NuevaCadena.Append("");
                                                        break;
                                                }
                                                break;
                                            default:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(matriz[i, matrizIndice[j]]);
                                                break;
                                        }
                                        break;
                                    case 1:
                                        switch (j)
                                        {
                                            case 0:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append("Pendientes de Provisión - Horario");
                                                break;
                                            case 1:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append((BuscarLista(listaSucursal, matriz2[i, matrizIndice[j]], "0", 1) == "" ? "Varios" : BuscarLista(listaSucursal, matriz2[i, matrizIndice[j]], "0", 1)));
                                                break;
                                            case 8:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append((matriz2[i, matrizIndice[j]] == "0" ? "NO" : "SI"));
                                                break;
                                            case 11:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append((matriz2[i, matrizIndice[j]] == "A" ? "ACTIVO" : "INACTIVO"));
                                                break;
                                            default:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(matriz2[i, matrizIndice[j]]);
                                                break;
                                        }
                                        break;
                                    case 2:
                                        switch (j)
                                        {
                                            case 0:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append("Pendientes de Provisión - Monto Fijo");
                                                break;
                                            case 1:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append((BuscarLista(listaSucursal, matriz3[i, matrizIndice[j]], "0", 1) == "" ? "Varios" : BuscarLista(listaSucursal, matriz3[i, matrizIndice[j]], "0", 1)));
                                                break;
                                            case 10:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append((matriz3[i, matrizIndice[j]] == "A" ? "ACTIVO" : "INACTIVO"));
                                                break;
                                            default:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(matriz3[i, matrizIndice[j]]);
                                                break;
                                        }
                                        break;
                                }
                                break;
                            case "OP3ReportePrincipal":
                                switch (j)
                                {
                                    case 0:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append((matriz[i, matrizIndice[j]]) == "" ? "Varios" : BuscarDescripcionSucursal(listaSucursalDes, matriz[i, matrizIndice[j]]));
                                        break;
                                    case 7:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append((BuscarLista(listaSucursal, matriz[i, matrizIndice[j]], "0", 1) == "" ? "Varios" : BuscarLista(listaSucursal, matriz[i, matrizIndice[j]], "0", 1)));
                                        break;
                                    case 3:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append((matriz[i, matrizIndice[j]] == "J" ? "JURIDICA" : "NATURAL"));
                                        break;
                                    case 6:
                                    case 11:
                                    case 36:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append((matriz[i, matrizIndice[j]] == "A" ? "ACTIVO" : "INACTIVO"));
                                        break;
                                    case 8:
                                    case 29:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append((matriz[i, matrizIndice[j]] == "0" ? "" : matriz[i, matrizIndice[j]]));
                                        break;
                                    case 12:
                                    case 15:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append((matriz[i, matrizIndice[j]] == "1" ? "SI" : "NO"));
                                        break;
                                    case 18:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        switch (matriz[i, matrizIndice[j]])
                                        {
                                            case "T":
                                                NuevaCadena.Append("TERCERO");
                                                break;
                                            case "E":
                                                NuevaCadena.Append("EMPLEADO");
                                                break;
                                            case "C":
                                                NuevaCadena.Append("CORTESIA");
                                                break;
                                            default:
                                                NuevaCadena.Append(matriz[i, matrizIndice[j]]);
                                                break;
                                        }
                                        break;
                                    case 23:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        switch (matriz[i, matrizIndice[j]])
                                        {
                                            case "C":
                                                NuevaCadena.Append("CONFIGURACIÓN");
                                                break;
                                            case "B":
                                                NuevaCadena.Append("BONIFICACIÓN");
                                                break;
                                            default:
                                                NuevaCadena.Append(matriz[i, matrizIndice[j]]);
                                                break;
                                        }
                                        break;
                                    case 24:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaTipoAtencion, matriz[i, matrizIndice[j]], "0", 1));
                                        break;
                                    case 25:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaTipoAdmision, matriz[i, matrizIndice[j]], "0", 1));
                                        break;
                                    case 26:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaTipoPaciente, matriz[i, matrizIndice[j]], "0", 1));
                                        break;
                                    case 27:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaTipoServicio, matriz[i, matrizIndice[j]], "0", 1));
                                        break;
                                    case 30:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaEspecialidad, matriz[i, matrizIndice[j]], "0", 1));
                                        break;
                                    case 31:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(BuscarLista(listaTurno, matriz[i, matrizIndice[j]], "0", 1));
                                        break;
                                    case 32:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        switch (matriz[i, matrizIndice[j]])
                                        {
                                            case "P":
                                                NuevaCadena.Append("PORCENTAJE");
                                                break;
                                            case "M":
                                                NuevaCadena.Append("MONTO");
                                                break;
                                            case "F":
                                                NuevaCadena.Append("FACTOR");
                                                break;
                                            case "D":
                                                NuevaCadena.Append("PAGO DOBLE");
                                                break;
                                            case "H":
                                                NuevaCadena.Append("HORARIO");
                                                break;
                                            case "T":
                                                NuevaCadena.Append("TURNO");
                                                break;
                                            default:
                                                NuevaCadena.Append(matriz[i, matrizIndice[j]]);
                                                break;
                                        }
                                        break;
                                    case 35:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        switch (matriz[i, matrizIndice[j]])
                                        {
                                            case "T":
                                                NuevaCadena.Append("TODOS");
                                                break;
                                            case "A":
                                                NuevaCadena.Append("ALGUNOS");
                                                break;
                                            case "E":
                                                NuevaCadena.Append("EXCEPTO");
                                                break;
                                        }
                                        break;
                                    case 33:
                                    case 34:
                                        NuevaCadena.Append("<Cell ss:StyleID='s65'>");
                                        NuevaCadena.Append("<Data ss:Type='Number'>");
                                        NuevaCadena.Append(double.Parse(matriz[i, matrizIndice[j]]));
                                        break;
                                    default:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(matriz[i, matrizIndice[j]]);
                                        break;

                                }
                                break;
                            case "OP4ReportePrincipal":
                                switch (x)
                                {
                                    case 0:
                                        switch (j)
                                        {
                                            case 3:
                                            case 5:
                                            case 9:
                                            case 10:
                                            case 11:
                                            case 42:
                                            case 43://41
                                            case 44://42
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='Number'>");
                                                NuevaCadena.Append(int.Parse(matriz[i, matrizIndice[j]]));
                                                break;
                                            //case 23:
                                            //    NuevaCadena.Append("<Cell ss:StyleID='s65'>");
                                            //    NuevaCadena.Append("<Data ss:Type='Number'>");
                                            //    NuevaCadena.Append(double.Parse(matriz[i, matrizIndice[j]]));
                                            //    break;											
                                            case 20:
                                            case 21:
                                            case 22:
                                            case 23:
                                            case 26:
                                            case 27:
                                            case 28:
                                            case 29:
                                            case 39:
                                            case 40:
                                                NuevaCadena.Append("<Cell ss:StyleID='s65'>");
                                                NuevaCadena.Append("<Data ss:Type='Number'>");
                                                NuevaCadena.Append(double.Parse(matriz[i, matrizIndice[j]]));
                                                break;
                                            case 16:
                                                NuevaCadena.Append("<Cell ss:StyleID='s62'>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append((matriz[i, matrizIndice[j]] == "False" || matriz[i, matrizIndice[j]] == "0" ? "NO" : "SI"));
                                                break;
                                            case 17:
                                            case 18:
                                            case 19:
                                            case 30:
                                            case 51:
                                            case 60:
                                                NuevaCadena.Append("<Cell ss:StyleID='s62'>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(matriz[i, matrizIndice[j]]);
                                                break;
                                            //case 45:
                                            //case 46:
                                            //case 48:
                                            //case 55:
                                            //    NuevaCadena.Append("<Cell>");
                                            //    NuevaCadena.Append("<Data ss:Type='String'>");
                                            //    NuevaCadena.Append(matriz[i, matrizIndice[j]]);
                                            //    //contenido += (matriz[z][y].charAt(0) == "0" ? "" : matriz[z][y]);
                                            //    break;
                                            default:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(matriz[i, matrizIndice[j]]);
                                                break;
                                        }
                                        break;
                                    case 1:
                                        switch (j)
                                        {
                                            case 12:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append((matriz2[i, matrizIndice[j]] == "False" || matriz2[i, matrizIndice[j]] == "0" ? "NO" : "SI"));
                                                break;
                                            case 3:
                                            case 5:
                                            case 20:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='Number'>");
                                                NuevaCadena.Append(int.Parse(matriz2[i, matrizIndice[j]]));
                                                break;
                                            case 13:
                                            case 14:
                                            case 15:
                                            case 16:
                                                NuevaCadena.Append("<Cell ss:StyleID='s65'>");
                                                NuevaCadena.Append("<Data ss:Type='Number'>");
                                                NuevaCadena.Append(double.Parse(matriz2[i, matrizIndice[j]]));
                                                break;
                                            case 25:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(matriz2[i, matrizIndice[j]]);
                                                //contenido += (matriz[z][y].charAt(0) == "0" ? "" : matriz[z][y]);
                                                break;
                                            case 29:
                                                NuevaCadena.Append("<Cell ss:StyleID='s62'>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(matriz2[i, matrizIndice[j]]);
                                                break;
                                            default:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(matriz2[i, matrizIndice[j]]);
                                                break;
                                        }
                                        break;
                                    case 2:
                                        switch (j)
                                        {
                                            case 3:
                                            case 5:
                                            case 9:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='Number'>");
                                                NuevaCadena.Append(int.Parse(matriz3[i, matrizIndice[j]]));
                                                break;
                                            case 8:
                                                NuevaCadena.Append("<Cell ss:StyleID='s65'>");
                                                NuevaCadena.Append("<Data ss:Type='Number'>");
                                                NuevaCadena.Append(double.Parse(matriz3[i, matrizIndice[j]]));
                                                break;
                                            case 14:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(matriz3[i, matrizIndice[j]]);
                                                //contenido += (matriz[z][y].charAt(0) == "0" ? "" : matriz[z][y]);
                                                break;
                                            case 18:
                                                NuevaCadena.Append("<Cell ss:StyleID='s62'>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(matriz3[i, matrizIndice[j]]);
                                                break;
                                            default:
                                                NuevaCadena.Append("<Cell>");
                                                NuevaCadena.Append("<Data ss:Type='String'>");
                                                NuevaCadena.Append(matriz3[i, matrizIndice[j]]);
                                                break;
                                        }
                                        break;
                                }
                                break;
                        }
                        NuevaCadena.Append("</Data>");
                        NuevaCadena.Append("</Cell>");
                    }
                    NuevaCadena.Append("</Row>");
                    if (Cont2 == 8000)
                    {
                        using (StreamWriter contenido = new StreamWriter(archivo + ContadorArchivos + "_" + nombreConsArc + "_" + ss + ".xls", false))
                        {
                            contenido.Write(NuevaCadena.ToString());
                        }
                    }
                    else
                    {
                        if (i == (n - 1))
                        {
                            using (StreamWriter contenido = new StreamWriter(archivo + ContadorArchivos + "_" + nombreConsArc + "_" + ss + ".xls", false))
                            {
                                contenido.Write(NuevaCadena.ToString());
                            }
                        }
                    }
                }
                ContadorArchivos = ContadorArchivos + 1;
                using (StreamWriter contenido = new StreamWriter(archivo + ContadorArchivos + "_" + nombreConsArc + "_" + ss + ".xls", false))
                {
                    contenido.Write("</Table><WorksheetOptions xmlns='urn:schemas-microsoft-com:office:excel'><Print xmlns='urn:schemas-microsoft-com:office:excel'><ValidPrinterInfo xmlns='urn:schemas-microsoft-com:office:excel'/><HorizontalResolution xmlns='urn:schemas-microsoft-com:office:excel'>1200</HorizontalResolution><VerticalResolution xmlns='urn:schemas-microsoft-com:office:excel'>1200</VerticalResolution></Print><ProtectObjects xmlns='urn:schemas-microsoft-com:office:excel'>False</ProtectObjects><ProtectScenarios xmlns='urn:schemas-microsoft-com:office:excel'>False</ProtectScenarios></WorksheetOptions></Worksheet>");
                    ContadorArchivos = ContadorArchivos + 1;
                }
            }
            using (StreamWriter contenido = new StreamWriter(archivo + ContadorArchivos + "_" + nombreConsArc + "_" + ss + ".xls", false))
            {
                contenido.Write("</Workbook>");
            }
            for (int p = 1; p < (ContadorArchivos + 1); p++)
            {
                using (FileStream r = new FileStream(archivo + p + "_" + nombreConsArc + "_" + ss + ".xls", FileMode.Open, FileAccess.Read))
                {
                    using (FileStream fs = new FileStream(archivo + "0_" + nombreConsArc + "_" + ss + ".xls", FileMode.Append, FileAccess.Write))
                    {
                        r.CopyTo(fs);
                    }
                }

                if (System.IO.File.Exists(archivo + p + "_" + nombreConsArc + "_" + ss + ".xls"))
                {
                    System.IO.File.Delete(archivo + p + "_" + nombreConsArc + "_" + ss + ".xls");
                }
            }

            if (System.IO.File.Exists(archivo + "0_" + nombreConsArc + "_" + ss + ".xls"))
            {


                string rutaEntrada = archivo + "0_" + nombreConsArc + "_" + ss + ".xls";
                string rutaSalida = rutaEntrada + ".zip";

                using (FileStream fs = new FileStream(rutaSalida, FileMode.Create))
                using (ZipArchive arch = new ZipArchive(fs, ZipArchiveMode.Create))
                {
                    arch.CreateEntryFromFile(rutaEntrada, "0_" + nombreConsArc + "_" + ss + ".xls", CompressionLevel.Optimal);
                    arch.Dispose();
                }


                //using (ZipArchive modFile = ZipFile.Open(rutaSalida, ZipArchiveMode.Update))
                //{
                //	modFile.CreateEntryFromFile(rutaEntrada, "0_" + nombreConsArc + "_" + ss + ".xls", CompressionLevel.Optimal);
                //	modFile.Dispose();
                //}

                if (System.IO.File.Exists(rutaEntrada))
                {
                    System.IO.File.Delete(rutaEntrada);
                }
                return File(System.IO.File.ReadAllBytes(rutaSalida), "application/zip");
            }
            else
            {
                return null;
            }
        }

        private string BuscarDescripcionSucursal(string[] lista, string valor)
        {
            string rpta = "";
            int n = lista.Length;
            string[] campos;
            for (int i = 0; i < n; i++)
            {
                campos = lista[i].Split('¦');
                if (valor.IndexOf(campos[0]) > -1)
                {
                    rpta += campos[1];
                    rpta += " -";
                }
            }
            rpta = rpta.Substring(0, rpta.Length - 1);
            return rpta;
        }

        public string contratoPorVencerAmpliar(string ss, string su, string idCompania)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                int n = (int)Request.InputStream.Length;
                byte[] buffer = new byte[n];
                Request.InputStream.Read(buffer, 0, n);
                string data = Encoding.UTF8.GetString(buffer);
                string[] datos = data.Split('¯');

                brMedicoContrato obrMedicoContrato = new brMedicoContrato();
                if (datos[1] != "")
                {
                    rpta = obrMedicoContrato.grabarAmpliacion(datos[0], datos[1], obeUsuarioLogin.UsuarioId);
                }
                else
                {
                    beContratoRenovacion obeContratoRenovacion = obrMedicoContrato.grabarRenovacion(datos[0], datos[2], obeUsuarioLogin.UsuarioId);

                    if (obeContratoRenovacion != null)
                    {
                        rpta = obeContratoRenovacion.mensaje;
                        if (obeContratoRenovacion.listaContrato != null && obeContratoRenovacion.listaContrato.Count > 0)
                        {
                            string rutacontrato = ConfigurationManager.AppSettings["rutaContrato-" + obeUsuarioLogin.IdCompania];
                            string carpeta = rutacontrato + "\\" + su;
                            string rutaorigen = "", rutadestino = "";
                            foreach (beCampoCadena3 contrato in obeContratoRenovacion.listaContrato)
                            {

                                if (Directory.Exists(carpeta))
                                {
                                    rutaorigen = carpeta + "\\" + contrato.Campo2;
                                    rutadestino = carpeta + "\\" + contrato.Campo3;
                                    if (System.IO.File.Exists(rutaorigen))
                                    {
                                        try
                                        {
                                            System.IO.File.Copy(rutaorigen, rutadestino);

                                        }
                                        catch (IOException err)
                                        {

                                        }
                                    }

                                }
                            }

                        }
                    }
                }
            }
            return rpta;
        }

        public ActionResult ConciliacionOA()
        {
            ViewBag.versionJS = versionJS;
            return View();
        }

        public string ConciliacionOAListar()
        {
            string rpta = "";
            int n = (int)Request.InputStream.Length;
            byte[] buffer = new byte[n];
            Request.InputStream.Read(buffer, 0, n);
            string strData = Encoding.UTF8.GetString(buffer);
            string[] Datos = strData.Split('|');
            string sucursal = Datos[0];
            DateTime Fechainicio = DateTime.Parse(Datos[1]);
            DateTime FechaFin = DateTime.Parse(Datos[2]);
            int PersonaId = int.Parse((Datos[3] == "" ? "0" : Datos[3]));
            int EmpresaId = int.Parse((Datos[4] == "" ? "0" : Datos[3]));
            brConciliacionOA obrConciliacionOA = new brConciliacionOA();
            List<beConciliacionOAVista> lista = obrConciliacionOA.Listar(sucursal, Fechainicio, FechaFin, PersonaId, EmpresaId);
            if (lista != null)
            {
                if (lista != null && lista.Count > 0)
                {
                    rpta = ucCustomSerializer.Serializar(lista, '¦', '¬', false, "", false, true);
                }
            }
            return rpta;
        }

        public string ConciliacionOAadicionar(string ss, string su, int id, int opc)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                int n = (int)Request.InputStream.Length;
                byte[] buffer = new byte[n];
                Request.InputStream.Read(buffer, 0, n);
                string strData = Encoding.UTF8.GetString(buffer);

                string[] Datos = strData.Split('¯');
                string descripcion = Datos[0];
                string lista = Datos[1];
                brConciliacionOA obrConciliacionOA = new brConciliacionOA();
                rpta = obrConciliacionOA.adicionar(su, id, obeUsuarioLogin.UsuarioId, descripcion, lista, (opc == 1 ? true : false));
            }
            return rpta;
        }

        public string ConciliacionOAListarPorId(int id)
        {
            string rpta = "";
            brConciliacionOA obrConciliacionOA = new brConciliacionOA();
            rpta = obrConciliacionOA.listarId(id);
            return rpta;
        }

        public string ConciliacionOAProcesar(string ss, int id)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                brConciliacionOA obrConciliacionOA = new brConciliacionOA();
                rpta = obrConciliacionOA.Procesar(id, obeUsuarioLogin.UsuarioId);
            }
            return rpta;
        }

        public string ConciliacionOAActualizarEstado(string ss, int id, string st)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                brConciliacionOA obrConciliacionOA = new brConciliacionOA();
                rpta = obrConciliacionOA.ActualizarEstado(id, obeUsuarioLogin.UsuarioId, st);
            }
            return rpta;
        }

        private FileResult crearExcelXLS(string ss, string[,] matriz1, string lista, string pestania, string[,] matriz2 = null, string[,] matriz3 = null)
        {
            StringBuilder NuevaCadena = new StringBuilder();
            string nombreConsArc = "";
            nombreConsArc = "Reporte_Provision";
            string archivo = System.Web.HttpContext.Current.Server.MapPath("~//Files//ExcelConsolidados//");
            string[] matrizNombres = lista.Split(',');
            string[] matrizPestania = pestania.Split(',');
            int ContadorArchivos = 0, Cont2 = 0;
            string carpeta = archivo + ContadorArchivos + "_" + nombreConsArc + "_" + ss + ".xls.zip";

            if (System.IO.File.Exists(carpeta))
            {
                System.IO.File.Delete(carpeta);
            }

            if (lista.Trim() == "")
            {
                return null;
            }
            int nx = (matrizNombres.Length);
            using (StreamWriter contenido = new StreamWriter(archivo + ContadorArchivos + "_" + nombreConsArc + "_" + ss + ".xls", false))
            {
                contenido.Write("<?xml version='1.0' encoding='UTF-8'?><Workbook xmlns='urn:schemas-microsoft-com:office:spreadsheet' xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:ss='urn:schemas-microsoft-com:office:spreadsheet' xmlns:x='urn:schemas-microsoft-com:office:excel'><DocumentProperties xmlns='urn:schemas-microsoft-com:office:office'><Author xmlns='urn:schemas-microsoft-com:office:office'>ewoychowsky</Author><Company xmlns='urn:schemas-microsoft-com:office:office'>EAW</Company><Version xmlns='urn:schemas-microsoft-com:office:office'>10.4219</Version></DocumentProperties><OfficeDocumentSettings xmlns='urn:schemas-microsoft-com:office:office'><DownloadComponents xmlns='urn:schemas-microsoft-com:office:office'/><LocationOfComponents xmlns='urn:schemas-microsoft-com:office:office'/></OfficeDocumentSettings><ExcelWorkbook xmlns='urn:schemas-microsoft-com:office:excel'><WindowHeight xmlns='urn:schemas-microsoft-com:office:excel'>9210</WindowHeight><WindowWidth xmlns='urn:schemas-microsoft-com:office:excel'>15195</WindowWidth><WindowTopX xmlns='urn:schemas-microsoft-com:office:excel'>0</WindowTopX><WindowTopY xmlns='urn:schemas-microsoft-com:office:excel'>60</WindowTopY><ProtectStructure xmlns='urn:schemas-microsoft-com:office:excel'>False</ProtectStructure><ProtectWindows xmlns='urn:schemas-microsoft-com:office:excel'>False</ProtectWindows></ExcelWorkbook><Styles><Style ss:ID='Default' ss:Name='Normal'> <Alignment ss:Vertical='Bottom'/><Borders/><Font/><Interior/><NumberFormat/><Protection/></Style>");
                contenido.Write("<Style ss:ID='s62'> <NumberFormat ss:Format='dd/mm/yyyy h:mm:ss'/></Style>");
                contenido.Write("<Style ss:ID='s63'><NumberFormat ss:Format='0.000000'/></Style>");
                contenido.Write("<Style ss:ID='s65'> <NumberFormat ss:Format='&quot;&quot;#,##0.00'/>");
                contenido.Write("<Alignment ss:Horizontal='Right'/></Style><Style ss:ID='s79'> <Font ss:FontName='Calibri' x:Family='Swiss' ss:Size='11' ss:Color='#FFFFFF'/> <Interior ss:Color='#00B050' ss:Pattern='Solid'/></Style></Styles>");
                ContadorArchivos = ContadorArchivos + 1;
            }
            int n = 0, ncampos = 0;
            int rows = matriz1.GetLength(0);
            int cols = matriz1.GetLength(1);
            int[] matrizIndice = new int[cols];
            string[] matrizCabecera = new string[cols];
            int[] matrizAnchos = new int[cols];
            string nombre = "";

            for (int x = 0; x < nx; x++)
            {
                switch (x)
                {
                    case 0:
                        for (int j = 0; j < cols; j++)
                        {
                            matrizIndice[j] = j;
                            matrizCabecera[j] = matriz1[0, j];
                            matrizAnchos[j] = int.Parse(matriz1[1, j]);
                        }
                        n = (matriz1 == null ? 0 : matriz1.GetLength(0));
                        ncampos = matrizCabecera.Length;
                        break;
                    case 1:
                        rows = matriz2.GetLength(0);
                        cols = matriz2.GetLength(1);
                        matrizIndice = new int[cols];
                        matrizCabecera = new string[cols];
                        matrizAnchos = new int[cols];
                        for (int j = 0; j < cols; j++)
                        {
                            matrizIndice[j] = j;
                            matrizCabecera[j] = matriz2[0, j];
                            matrizAnchos[j] = int.Parse(matriz2[1, j]);
                        }
                        n = (matriz2 == null || matriz2.GetLength(0) == 0 ? 0 : matriz2.GetLength(0));
                        ncampos = matrizCabecera.Length;
                        Cont2 = 0;
                        NuevaCadena = new StringBuilder();
                        break;
                    case 2:
                        rows = matriz3.GetLength(0);
                        cols = matriz3.GetLength(1);
                        matrizIndice = new int[cols];
                        matrizCabecera = new string[cols];
                        matrizAnchos = new int[cols];
                        for (int j = 0; j < cols; j++)
                        {
                            matrizIndice[j] = j;
                            matrizCabecera[j] = matriz3[0, j];
                            matrizAnchos[j] = int.Parse(matriz3[1, j]);
                        }
                        n = (matriz3 == null || matriz3.GetLength(0) == 0 ? 0 : matriz3.GetLength(0));
                        ncampos = matrizCabecera.Length;
                        Cont2 = 0;
                        NuevaCadena = new StringBuilder();
                        break;
                }

                nombre = (matrizPestania[x].Trim() == "" ? "OPCION " + (x + 1) : matrizPestania[x]);

                NuevaCadena.Append("<Worksheet ss:Name='" + nombre + "'><Table>");
                for (int u = 0; u < matrizAnchos.Length; u++)
                {
                    NuevaCadena.Append("<ss:Column ss:Width='" + matrizAnchos[u] + "'/>");
                }
                NuevaCadena.Append("<Row>");
                for (int t = 0; t < matrizCabecera.Length; t++)
                {
                    NuevaCadena.Append("<Cell ss:StyleID='s79'>");
                    NuevaCadena.Append("<Data ss:Type='String'>");
                    NuevaCadena.Append(matrizCabecera[t]);
                    NuevaCadena.Append("</Data>");
                    NuevaCadena.Append("</Cell>");
                }
                NuevaCadena.Append("</Row>");
                if (n == 0)
                {
                    using (StreamWriter contenido = new StreamWriter(archivo + ContadorArchivos + "_" + nombreConsArc + "_" + ss + ".xls", false))
                    {
                        contenido.Write(NuevaCadena.ToString());
                    }
                }
                //Inicia en i=3 porque la data esta en la fila 3
                for (int i = 3; i < n; i++)
                {
                    if (Cont2 == 8000)
                    {
                        NuevaCadena = new StringBuilder();
                        ContadorArchivos = ContadorArchivos + 1;
                        Cont2 = 0;
                    }
                    else
                    {
                        Cont2 = Cont2 + 1;
                    }
                    NuevaCadena.Append("<Row>");
                    for (int j = 0; j < ncampos; j++)
                    {
                        switch (x)
                        {
                            case 0:
                                switch (j)
                                {
                                    case 3:
                                    case 5:
                                    case 9:
                                    case 10:
                                    case 11:
                                    case 42:
                                    case 43://41
                                    case 44://42
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='Number'>");
                                        NuevaCadena.Append(int.Parse(matriz1[i, j]));
                                        break;
                                    //case 23:
                                    //    NuevaCadena.Append("<Cell ss:StyleID='s65'>");
                                    //    NuevaCadena.Append("<Data ss:Type='Number'>");
                                    //    NuevaCadena.Append(double.Parse(matriz[i, matrizIndice[j]]));
                                    //    break;											
                                    case 20:
                                    case 21:
                                    case 22:
                                    case 23:
                                    case 26:
                                    case 27:
                                    case 28:
                                    case 29:
                                    case 39:
                                    case 40:
                                        NuevaCadena.Append("<Cell ss:StyleID='s65'>");
                                        NuevaCadena.Append("<Data ss:Type='Number'>");
                                        NuevaCadena.Append(double.Parse(matriz1[i, matrizIndice[j]]));
                                        break;
                                    case 16:
                                        NuevaCadena.Append("<Cell ss:StyleID='s62'>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append((matriz1[i, matrizIndice[j]] == "False" || matriz1[i, matrizIndice[j]] == "0" ? "NO" : "SI"));
                                        break;
                                    case 17:
                                    case 18:
                                    case 19:
                                    case 30:
                                    case 51:
                                    case 60:
                                        NuevaCadena.Append("<Cell ss:StyleID='s62'>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(matriz1[i, matrizIndice[j]]);
                                        break;
                                    //case 45:
                                    //case 46:
                                    //case 48:
                                    //case 55:
                                    //    NuevaCadena.Append("<Cell>");
                                    //    NuevaCadena.Append("<Data ss:Type='String'>");
                                    //    NuevaCadena.Append(matriz[i, matrizIndice[j]]);
                                    //    //contenido += (matriz[z][y].charAt(0) == "0" ? "" : matriz[z][y]);
                                    //    break;
                                    default:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(matriz1[i, matrizIndice[j]]);
                                        break;
                                }
                                break;
                            case 1:
                                switch (j)
                                {
                                    case 12:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append((matriz2[i, matrizIndice[j]] == "False" || matriz2[i, matrizIndice[j]] == "0" ? "NO" : "SI"));
                                        break;
                                    case 3:
                                    case 5:
                                    case 20:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='Number'>");
                                        NuevaCadena.Append(int.Parse(matriz2[i, matrizIndice[j]]));
                                        break;
                                    case 13:
                                    case 14:
                                    case 15:
                                    case 16:
                                        NuevaCadena.Append("<Cell ss:StyleID='s65'>");
                                        NuevaCadena.Append("<Data ss:Type='Number'>");
                                        NuevaCadena.Append(double.Parse(matriz2[i, matrizIndice[j]]));
                                        break;
                                    case 25:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(matriz2[i, matrizIndice[j]]);
                                        //contenido += (matriz[z][y].charAt(0) == "0" ? "" : matriz[z][y]);
                                        break;
                                    case 29:
                                        NuevaCadena.Append("<Cell ss:StyleID='s62'>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(matriz2[i, matrizIndice[j]]);
                                        break;
                                    default:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(matriz2[i, matrizIndice[j]]);
                                        break;
                                }
                                break;
                            case 2:
                                switch (j)
                                {
                                    case 3:
                                    case 5:
                                    case 9:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='Number'>");
                                        NuevaCadena.Append(int.Parse(matriz3[i, matrizIndice[j]]));
                                        break;
                                    case 8:
                                        NuevaCadena.Append("<Cell ss:StyleID='s65'>");
                                        NuevaCadena.Append("<Data ss:Type='Number'>");
                                        NuevaCadena.Append(double.Parse(matriz3[i, matrizIndice[j]]));
                                        break;
                                    case 14:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(matriz3[i, matrizIndice[j]]);
                                        //contenido += (matriz[z][y].charAt(0) == "0" ? "" : matriz[z][y]);
                                        break;
                                    case 18:
                                        NuevaCadena.Append("<Cell ss:StyleID='s62'>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(matriz3[i, matrizIndice[j]]);
                                        break;
                                    default:
                                        NuevaCadena.Append("<Cell>");
                                        NuevaCadena.Append("<Data ss:Type='String'>");
                                        NuevaCadena.Append(matriz3[i, matrizIndice[j]]);
                                        break;
                                }
                                break;
                        }
                        NuevaCadena.Append("</Data>");
                        NuevaCadena.Append("</Cell>");
                    }
                    NuevaCadena.Append("</Row>");
                    if (Cont2 == 8000)
                    {
                        using (StreamWriter contenido = new StreamWriter(archivo + ContadorArchivos + "_" + nombreConsArc + "_" + ss + ".xls", false))
                        {
                            contenido.Write(NuevaCadena.ToString());
                        }
                    }
                    else
                    {
                        if (i == (n - 1))
                        {
                            using (StreamWriter contenido = new StreamWriter(archivo + ContadorArchivos + "_" + nombreConsArc + "_" + ss + ".xls", false))
                            {
                                contenido.Write(NuevaCadena.ToString());
                            }
                        }
                    }
                }
                ContadorArchivos = ContadorArchivos + 1;
                using (StreamWriter contenido = new StreamWriter(archivo + ContadorArchivos + "_" + nombreConsArc + "_" + ss + ".xls", false))
                {
                    contenido.Write("</Table><WorksheetOptions xmlns='urn:schemas-microsoft-com:office:excel'><Print xmlns='urn:schemas-microsoft-com:office:excel'><ValidPrinterInfo xmlns='urn:schemas-microsoft-com:office:excel'/><HorizontalResolution xmlns='urn:schemas-microsoft-com:office:excel'>1200</HorizontalResolution><VerticalResolution xmlns='urn:schemas-microsoft-com:office:excel'>1200</VerticalResolution></Print><ProtectObjects xmlns='urn:schemas-microsoft-com:office:excel'>False</ProtectObjects><ProtectScenarios xmlns='urn:schemas-microsoft-com:office:excel'>False</ProtectScenarios></WorksheetOptions></Worksheet>");
                    ContadorArchivos = ContadorArchivos + 1;
                }
            }
            using (StreamWriter contenido = new StreamWriter(archivo + ContadorArchivos + "_" + nombreConsArc + "_" + ss + ".xls", false))
            {
                contenido.Write("</Workbook>");
            }
            for (int p = 1; p < (ContadorArchivos + 1); p++)
            {
                using (FileStream r = new FileStream(archivo + p + "_" + nombreConsArc + "_" + ss + ".xls", FileMode.Open, FileAccess.Read))
                {
                    using (FileStream fs = new FileStream(archivo + "0_" + nombreConsArc + "_" + ss + ".xls", FileMode.Append, FileAccess.Write))
                    {
                        r.CopyTo(fs);
                    }
                }

                if (System.IO.File.Exists(archivo + p + "_" + nombreConsArc + "_" + ss + ".xls"))
                {
                    System.IO.File.Delete(archivo + p + "_" + nombreConsArc + "_" + ss + ".xls");
                }
            }

            if (System.IO.File.Exists(archivo + "0_" + nombreConsArc + "_" + ss + ".xls"))
            {


                string rutaEntrada = archivo + "0_" + nombreConsArc + "_" + ss + ".xls";
                string rutaSalida = rutaEntrada + ".zip";

                using (FileStream fs = new FileStream(rutaSalida, FileMode.Create))
                using (ZipArchive arch = new ZipArchive(fs, ZipArchiveMode.Create))
                {
                    arch.CreateEntryFromFile(rutaEntrada, "0_" + nombreConsArc + "_" + ss + ".xls", CompressionLevel.Optimal);
                    arch.Dispose();
                }


                //using (ZipArchive modFile = ZipFile.Open(rutaSalida, ZipArchiveMode.Update))
                //{
                //	modFile.CreateEntryFromFile(rutaEntrada, "0_" + nombreConsArc + "_" + ss + ".xls", CompressionLevel.Optimal);
                //	modFile.Dispose();
                //}

                if (System.IO.File.Exists(rutaEntrada))
                {
                    System.IO.File.Delete(rutaEntrada);
                }
                return File(System.IO.File.ReadAllBytes(rutaSalida), "application/zip");
            }
            else
            {
                return null;
            }
        }


        #region Validación de Cuentas Contables

        public ActionResult ValidacionCuentasContables()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string ValidacionCuentasContables_Listas(string ss)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				int idUsuario = obeUsuarioLogin.UsuarioId;
                brSQL obrSQL = new brSQL();
                rpta = obrSQL.EjecutarComando("[uspCuentaProvisionPagoValidacionListas]", "@lstParametros", idUsuario.ToString());
			}
			return rpta;
		}

		public string ValidacionCuentasContables_Listar(string ss)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				int idUsuario = obeUsuarioLogin.UsuarioId;
				if (Request.InputStream != null)
				{
					int n = (int)Request.InputStream.Length;
					byte[] buffer = new byte[n];
					Request.InputStream.Read(buffer, 0, n);
					string data = Encoding.UTF8.GetString(buffer);
                    brSQL obrSQL = new brSQL();
                    rpta = obrSQL.EjecutarComando("uspCuentaProvisionPagoValidacion", "@lstParametros", data);
				}
			}
			return rpta;
		}

        #endregion

        public ActionResult CuentaCorrienteMedicoContable()
        {
            ViewBag.versionJS = versionJS;
            return View();
        }

        public string CuentaCorrienteMedicoContable_Listas(string ss)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                int idUsuario = obeUsuarioLogin.UsuarioId;
                brSQL obrSQL = new brSQL();
                rpta = obrSQL.EjecutarComando("[uspCuentaCorrienteMedicoContableListas]", "@lstParametros", idUsuario.ToString());
            }
            return rpta;
        }

        public string CuentaCorrienteMedicoContableConfiguracion_Listar(string ss)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                int idUsuario = obeUsuarioLogin.UsuarioId;
                brSQL obrSQL = new brSQL();
                rpta = obrSQL.EjecutarComando("[uspCuentaCorrienteMedicoContableConfiguracionListar]", "@lstParametros", idUsuario.ToString());
            }
            return rpta;
        }

        public string CuentaCorrienteMedicoContableAgrupacionEstado_Grabar(string ss)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                int idUsuario = obeUsuarioLogin.UsuarioId;
                if (Request.InputStream != null)
                {
                    int n = (int)Request.InputStream.Length;
                    byte[] buffer = new byte[n];
                    Request.InputStream.Read(buffer, 0, n);
                    string data = idUsuario.ToString()+ "¯" + Encoding.UTF8.GetString(buffer);
                    brSQL obrSQL = new brSQL();
                    rpta = obrSQL.EjecutarComando("uspCuentaCorrienteMedicoContableAgrupacionEstadoGrabar", "@lstParametros", data);
                }
            }
            return rpta;
        }

        public string CuentaCorrienteMedicoContableConfiguracionColumna_Grabar(string ss)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                int idUsuario = obeUsuarioLogin.UsuarioId;
                if (Request.InputStream != null)
                {
                    int n = (int)Request.InputStream.Length;
                    byte[] buffer = new byte[n];
                    Request.InputStream.Read(buffer, 0, n);
                    string data = idUsuario.ToString() + "¯" + Encoding.UTF8.GetString(buffer);
                    brSQL obrSQL = new brSQL();
                    rpta = obrSQL.EjecutarComando("uspCuentaCorrienteMedicoContableConfiguracionColumnaGrabar", "@lstParametros", data);
                }
            }
            return rpta;
        }

        public string CuentaCorrienteMedicoContable_Listar(string ss)
        {
            string rpta = "";
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                int idUsuario = obeUsuarioLogin.UsuarioId;
                if (Request.InputStream != null)
                {
                    int n = (int)Request.InputStream.Length;
                    byte[] buffer = new byte[n];
                    Request.InputStream.Read(buffer, 0, n);
                    string data = idUsuario.ToString() + "¦" + Encoding.UTF8.GetString(buffer);
                    brSQL obrSQL = new brSQL();
                    rpta = obrSQL.EjecutarComando("uspCuentaCorrienteMedicoContableListar", "@lstParametros", data);
                }
            }
            return rpta;
        }


        public FileResult generarExcelcuentacorrienteMedico(string ss, string hojas, string nombre, string sp)
        {
            FileResult rpta = File(new byte[] { }, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                int idUsuario = obeUsuarioLogin.UsuarioId;

                string sArchivoXlsx = "";
                string[] arrayHojas = hojas.Split('|');
                brSQL obrSQL = new brSQL();
                int n = (int)Request.InputStream.Length;
                byte[] buffer = new byte[n];
                Request.InputStream.Read(buffer, 0, n);
                string data = Encoding.UTF8.GetString(buffer)+"¦"+ idUsuario.ToString();

                DataSet dstrpta = obrSQL.EjecutarComandoDst("uspCuentaCorrienteMedicoContableExportar", "@lstParametros", data);

                int nDataset = dstrpta.Tables.Count - 1;
                if (nDataset > 0)
                {
                    DataTable miTabla;
                    string rspta = Convert.ToString(dstrpta.Tables[nDataset].Rows[0]["Column1"]);
                    string[] cursores = rspta.Split('¬');

                    for (int i = 0; i < nDataset; i++)
                    {
                        data = cursores[i].ToString();
                        miTabla = dstrpta.Tables[i];
                        ucCustomSerializer.CabeceraDeTabla(data, ref miTabla);
                    }

                    string carpeta = System.Web.HttpContext.Current.Server.MapPath("~//Files//");
                    sArchivoXlsx = carpeta + nombre;
                    if (System.IO.File.Exists(sArchivoXlsx))
                    {
                        System.IO.File.Delete(sArchivoXlsx);
                    }
                    ExcelXMLx.ExportarTabla2XLSX(sArchivoXlsx, arrayHojas, dstrpta);

                    return File(System.IO.File.ReadAllBytes(sArchivoXlsx), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                }
            }
            return rpta;
        }

    }

}

