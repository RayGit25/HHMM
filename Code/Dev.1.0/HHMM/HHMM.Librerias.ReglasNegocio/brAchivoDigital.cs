using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;
using System.Threading.Tasks;
using System.IO;
using System.Text;
using System.Configuration;
using System.Globalization;

using System.Threading;
using System.Net.WebSockets;

namespace HHMM.Librerias.ReglasNegocio
{
    public class brAchivoDigital : brGeneral
    {
        public beArchivoDigitalListas listas(string sucursal)
        {
            beArchivoDigitalListas obeArchivoDigitalListas = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daArchivoDigital odaArchivoDigital = new daArchivoDigital();
                    obeArchivoDigitalListas = odaArchivoDigital.listas(con, sucursal);
                }
                catch (SqlException ex)
                {
                    foreach (SqlError err in ex.Errors)
                    {
                        ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
                    }
                }
                catch (Exception ex)
                {
                    ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
                }
            }
            return (obeArchivoDigitalListas);
        }

        public beArchivoDigitalDetalleListas listarBusqueda(string sucursal, int personaId, int TipoAdmisionId, int PeriodoIdInicial, int PeriodoIdFinal, string est, int usuario)
        {
            beArchivoDigitalDetalleListas obeArchivoDigitalDetalleListas = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daArchivoDigital odaArchivoDigital = new daArchivoDigital();
                    obeArchivoDigitalDetalleListas = odaArchivoDigital.listarBusqueda(con, sucursal, personaId, TipoAdmisionId, PeriodoIdInicial, PeriodoIdFinal, est, usuario);
                }
                catch (SqlException ex)
                {
                    foreach (SqlError err in ex.Errors)
                    {
                        ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
                    }
                }
                catch (Exception ex)
                {
                    ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
                }
            }
            return (obeArchivoDigitalDetalleListas);
        }
        public beArchivoDigitalListasPdf obtenerListasPdfMaestro(string sucursal)
        {
            beArchivoDigitalListasPdf obeArchivoDigitalListasPdf = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daArchivoDigital odaArchivoDigital = new daArchivoDigital();
                    obeArchivoDigitalListasPdf = odaArchivoDigital.obtenerListasPdfMaestro(con, sucursal);
                }
                catch (SqlException ex)
                {
                    foreach (SqlError err in ex.Errors)
                    {
                        ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
                    }
                }
                catch (Exception ex)
                {
                    ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
                }
            }
            return (obeArchivoDigitalListasPdf);
        }
        //public beArchivoDigitalMedicoListas obtenerListasPdfDetalle(string sucursal, int planillaId, int personaId)
        //{
        //    beArchivoDigitalMedicoListas obeArchivoDigitalMedicoListas = null;
        //    using (SqlConnection con = new SqlConnection(Conexion))
        //    {
        //        try
        //        {
        //            con.Open();
        //            daArchivoDigital odaArchivoDigital = new daArchivoDigital();
        //            obeArchivoDigitalMedicoListas = odaArchivoDigital.obtenerListasPdfDetalle(con, sucursal, planillaId, personaId);
        //        }
        //        catch (SqlException ex)
        //        {
        //            foreach (SqlError err in ex.Errors)
        //            {
        //                ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
        //        }
        //    }
        //    return (obeArchivoDigitalMedicoListas);
        //}
        public bool actualizarEstados(string lista, string estado, int usuarioId, string su)
        {
            bool exito = false;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daArchivoDigital odaArchivoDigital = new daArchivoDigital();
                    exito = odaArchivoDigital.actualizarEstados(con, lista, estado, usuarioId, su);
                }
                catch (SqlException ex)
                {
                    foreach (SqlError err in ex.Errors)
                    {
                        ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
                    }
                }
                catch (Exception ex)
                {
                    ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
                }
            }
            return (exito);

        }

        public async Task<string> crearPdfDefault(string medico, string su, string rutaPdf, int tipoFormato)
        {
            string rpta = "";
            beArchivoDigitalListasPdf obeArchivoDigitalListasPdf = null;
            beArchivoDigitalMedicoListas obeArchivoDigitalMedicoListas = null;
            //int nMedicos = medicos.Length;
            string[] regMedico;
            await Task.Run(() =>
            {

                using (SqlConnection con = new SqlConnection(Conexion))
                {
                    try
                    {
                        con.Open();
                        daArchivoDigital odaArchivoDigital = new daArchivoDigital();
                        //obeArchivoDigitalListasPdf = odaArchivoDigital.obtenerListasPdfMaestro(con,su);
                        int nRegistrosLista = 0;
                        string[] cabecerasTitulos = new string[] { };
                        string contenido = "";
                        string crearQuiebre = "";
                        List<string> lstTotales = new List<string>();
                        string DatoQuiebre = "";
                        StringBuilder sb = new StringBuilder();
                        //for (int i = 0; i < nMedicos; i++)
                        //{
                        crearQuiebre = "";
                        regMedico = medico.Split('¦');
                        obeArchivoDigitalMedicoListas = odaArchivoDigital.obtenerListasPdfDefaultDetalle(con, su, int.Parse(regMedico[0]), int.Parse(regMedico[1]));

                        if (obeArchivoDigitalMedicoListas != null)
                        {
                            lstTotales = crearMatriz(obeArchivoDigitalMedicoListas.ListaProcesoOrden, obeArchivoDigitalMedicoListas.ListaMedicos);
                            sb.Clear();
                            //contenido = "";
                            sb.Append("<html><head><meta charset='utf-8' /><style type='text/css'>thead {display: table-header-group;}tr { page-break-inside: avoid;} p{font-family:Calibri;font-size:12px}</style></head><body style='width:100%;font-family:Calibri;margin-bottom:80px;'>");

                            for (int p = 0; p < 3; p++)
                            {
                                switch (p)
                                {
                                    case 0:
                                        nRegistrosLista = obeArchivoDigitalMedicoListas.ListaProcesoOrden.Count;
                                        if (tipoFormato == 1)
                                        {
                                            cabecerasTitulos = new string[] { "Fecha Pres.", "Código OA", "Estado", "Exp", "Estado Exp.", "Nombre Paciente", "Tipo Pac.", "Cant.", "Monto Prestación", "Part. Médico Total", "Part. Médico", "Part. Clínica", "Monto a facturar", "Bonificación", "Importe Total" }; //15
                                        }
                                        else
                                        {
                                            cabecerasTitulos = new string[] { "Fecha Pres.", "Código OA", "Estado", "Exp", "Estado Exp.", "Nombre Paciente", "Tipo Pac.", "Cant.", "Part. Médico Total", "Part. Médico",
                                                //"Monto a facturar",
                                                "Bonificación", "Importe Total" }; //12
                                        }
                                        beProcesoOrdenAtencionPdf registro;
                                        int idMed = 0, idTipoAte = 0;
                                        string tipoAjuste = "";
                                        bool esNuevo = false;
                                        bool esNuevoTipoAte = false;
                                        bool esNuevoMedico = false;
                                        int idEspecialidad = 0;
                                        int idServicio = 0;
                                        string codPres = "";
                                        string cabecera = "";
                                        beProcesoOrdenAtencionPdf regSiguiente;
                                        bePlanillaMedicoDescuento regDescuento;
                                        if (nRegistrosLista > 0)
                                        {
                                            crearQuiebre = "A";
                                            sb.Append("<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'><thead style='display: table-header-group'>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold'>Compañia:</td><td colspan='13' style='text-align:left'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Compania);
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold;'>Sucursal: </td><td colspan='9' style='text-align:left'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Sucursal);
                                            sb.Append("</td><td colspan='2' style='font-weight:bold'>Condición de Pago</td><td colspan='2'>");
                                            sb.Append("PRODUCCIÓN");
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='15' style='font-weight:bold;'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Direccion);
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold;'>Teléfono</td><td colspan='2'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Telefono);
                                            sb.Append("</td><td style='font-weight:bold;'>Fax</td><td style='text-align:left'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Fax);
                                            sb.Append("</td><td colspan='11'></td></tr>");
                                            sb.Append("<tr><td colspan='15' style='font-weight:bold;border-bottom:1px solid black'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.URL);
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold'>N° Liquidacíon: </td><td style='text-align:left' colspan='9'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.ProcesoId);
                                            sb.Append("</td><td colspan='2'>Fecha Cierre</td><td colspan='2'>");
                                            sb.Append((obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.FechaHoraCierre.ToShortDateString().IndexOf("1900") > -1 ? "" : obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.FechaHoraCierre.ToShortDateString()));
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold'>Factura a: </td><td style='text-align:left' colspan='9'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.Facturar);
                                            sb.Append("</td><td colspan='2'>Hora</td><td colspan='2'>");
                                            sb.Append((obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.FechaHoraCierre.ToShortDateString().IndexOf("1900") > -1 ? "" : obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.FechaHoraCierre.ToShortTimeString()));
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold'>RUC: </td><td style='text-align:left' colspan='9'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.NumeroDocumento);
                                            sb.Append("</td><td colspan='2'>Usuario</td><td colspan='2'>");
                                            //sb.Append("");
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr>");
                                            if (tipoFormato == 1)
                                            {
                                                for (int j = 0; j < cabecerasTitulos.Length; j++)
                                                {
                                                    sb.Append("<td style='font-weight:bold;border-top: 4px double black;'>");
                                                    sb.Append(cabecerasTitulos[j]);
                                                    sb.Append("</td>");
                                                }
                                            }
                                            else
                                            {
                                                for (int j = 0; j < cabecerasTitulos.Length; j++)
                                                {
                                                    switch (j)
                                                    {
                                                        case 5:
                                                            sb.Append("<td style='font-weight:bold;border-top: 4px double black;' colspan='3'>");
                                                            break;
                                                        case 7:
                                                        case 8:
                                                        case 9:
                                                        case 10:
                                                            sb.Append("<td style='font-weight:bold;border-top: 4px double black;text-align:center'>");
                                                            break;
                                                        default:
                                                            sb.Append("<td style='font-weight:bold;border-top: 4px double black;'>");
                                                            break;
                                                    }
                                                    sb.Append(cabecerasTitulos[j]);
                                                    sb.Append("</td>");
                                                }
                                                sb.Append("<td></td>");
                                            }
                                            sb.Append("</tr></thead><tbody>");
                                            for (int k = 0; k < nRegistrosLista; k++)
                                            {
                                                registro = obeArchivoDigitalMedicoListas.ListaProcesoOrden[k];

                                                idMed = registro.PersonaId;
                                                idTipoAte = registro.IdTipoAtencion;
                                                tipoAjuste = registro.TipoAjuste;
                                                idServicio = registro.ServicioId;
                                                idEspecialidad = registro.EspecialidadId;
                                                codPres = registro.CodigoPrestacion;

                                                if (k == 0 || esNuevoTipoAte == true)
                                                {
                                                    string[] oMed = buscarMedicoLista(obeArchivoDigitalMedicoListas.ListaMedicos, idMed, idEspecialidad);

                                                    cabecera = registro.PersonaId + "¦" + oMed[1] + "¦" + oMed[2] + "¦" + registro.TipoAjuste + "¦" + buscarDescripcionTipoAtencion(obeArchivoDigitalMedicoListas.ListaTipoAtencion, registro.IdTipoAtencion) + "¦";
                                                    ////cabecera += registro.MontoImponiblePrestacionResumen + "¦" + registro.ImporteResumen + "¦" + registro.ParteClinicaResumen + "¦" + registro.BonificacionResumen + "¦" + registro.TotalResumen;
                                                    cabecera += registro.MontoImponiblePrestacionResumen + "¦" + registro.ImporteResumen + "¦" + registro.ParteClinicaResumen + "¦" + registro.BonificacionResumen + "¦" + registro.TotalResumen + "¦" + registro.ImporteTotalResumen + "¦" + registro.MontoFacturarResumen; //12
                                                    //sb.Append(obtenerCabeceraMedico(lstTotales, idMed, idTipoAte, obeArchivoDigitalMedicoListas.ListaTipoAtencion));
                                                    sb.Append(obtenerCabeceraMedico(cabecera, esNuevoMedico, tipoFormato));


                                                    sb.Append("<tr style='font-weight: bold'><td colspan='2'>Tipo Ord. Ate</td>");
                                                    if (tipoFormato == 1) sb.Append("<td colspan='13'>");
                                                    else sb.Append("<td colspan='15'>");
                                                    sb.Append(buscarDescripcionTipoOrden(obeArchivoDigitalMedicoListas.ListaServicio, registro.ServicioId).ToString());
                                                    sb.Append("</td></tr>");
                                                    sb.Append("<tr style='font-weight: bold'><td colspan='2'>Concepto</td>");
                                                    if (tipoFormato == 1) sb.Append("<td colspan='13'>");
                                                    else sb.Append("<td colspan='15'>");
                                                    if (registro.TipoComponente == "A")
                                                    {
                                                        sb.Append(registro.CodigoPrestacion.ToString() + "-" + buscarDescripcionConcepto(obeArchivoDigitalMedicoListas.ListaArticulo, registro.CodigoPrestacion).ToString());
                                                    }
                                                    else
                                                    {
                                                        sb.Append(registro.CodigoPrestacion.ToString() + "-" + buscarDescripcionConcepto(obeArchivoDigitalMedicoListas.ListaPrestacion, registro.CodigoPrestacion).ToString());
                                                    }
                                                    sb.Append("</td></tr>");
                                                    esNuevoTipoAte = false;
                                                    esNuevoMedico = false;
                                                }

                                                if (esNuevo == true)
                                                {
                                                    sb.Append("<tr><td colspan='4'>&nbsp</td></tr>");
                                                    sb.Append("<tr><td colspan='4'>&nbsp</td></tr>");
                                                    sb.Append("<tr style='font-weight: bold'><td colspan='2'>Tipo Ord. Ate</td>");
                                                    if (tipoFormato == 1) sb.Append("<td colspan='13'>");
                                                    else sb.Append("<td colspan='15'>");
                                                    sb.Append(buscarDescripcionTipoOrden(obeArchivoDigitalMedicoListas.ListaServicio, registro.ServicioId).ToString());
                                                    sb.Append("</td></tr>");
                                                    sb.Append("<tr style='font-weight: bold'><td colspan='2'>Concepto</td>");
                                                    if (tipoFormato == 1) sb.Append("<td colspan='13'>");
                                                    else sb.Append("<td colspan='15'>");
                                                    if (registro.TipoComponente == "A")
                                                    {
                                                        sb.Append(registro.CodigoPrestacion.ToString() + "-" + buscarDescripcionConcepto(obeArchivoDigitalMedicoListas.ListaArticulo, registro.CodigoPrestacion).ToString());
                                                    }
                                                    else
                                                    {
                                                        sb.Append(registro.CodigoPrestacion.ToString() + "-" + buscarDescripcionConcepto(obeArchivoDigitalMedicoListas.ListaPrestacion, registro.CodigoPrestacion).ToString());
                                                    }
                                                    sb.Append("</td></tr>");
                                                    esNuevo = false;
                                                }
                                                if (k < (nRegistrosLista - 1))
                                                {
                                                    regSiguiente = obeArchivoDigitalMedicoListas.ListaProcesoOrden[k + 1];
                                                    if (regSiguiente != null)
                                                    {
                                                        if (idMed != regSiguiente.PersonaId)
                                                        {
                                                            esNuevoTipoAte = true;
                                                            esNuevoMedico = true;
                                                        }
                                                        else if (idEspecialidad != regSiguiente.EspecialidadId)
                                                        {
                                                            esNuevoTipoAte = true;
                                                        }
                                                        else if (tipoAjuste != regSiguiente.TipoAjuste)
                                                        {
                                                            esNuevoTipoAte = true;
                                                        }
                                                        else if (idTipoAte != regSiguiente.IdTipoAtencion)
                                                        {
                                                            esNuevoTipoAte = true;
                                                        }
                                                        else if (idServicio != regSiguiente.ServicioId)
                                                        {
                                                            esNuevo = true;
                                                        }
                                                        else if (codPres != regSiguiente.CodigoPrestacion)
                                                        {
                                                            esNuevo = true;
                                                        }
                                                        else
                                                        {
                                                            esNuevo = false;
                                                        }
                                                    }
                                                }

                                                sb.Append("<tr>");
                                                sb.Append("<td>");
                                                sb.Append(registro.FechaAtencionPrestacion.ToShortDateString());
                                                sb.Append("</td>");
                                                sb.Append("<td style='mso-number-format:\"@\"'>");
                                                sb.Append(registro.CodigoOA.ToString());
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro.EstadoPrestacion.ToString());
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro.IdExpediente == 0 ? "" : registro.IdExpediente.ToString());
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro.EstadoExpediente);
                                                sb.Append("</td>");
                                                if (tipoFormato == 1) sb.Append("<td>");
                                                else sb.Append("<td colspan=3>");
                                                sb.Append(registro.Paciente);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro.CodigoTipoPaciente);
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:center'>");
                                                sb.Append(String.Format("{0:N2}", registro.Cantidad));
                                                sb.Append("</td>");
                                                if (tipoFormato == 1)
                                                {
                                                    sb.Append("<td style='text-align:center'>");
                                                    sb.Append(String.Format("{0:N2}", registro.MontoImponiblePrestacion));
                                                    sb.Append("</td>");
                                                }
                                                sb.Append("<td style='text-align:center'>");
                                                sb.Append(String.Format("{0:N2}", registro.ImporteTotal));//2021-08-17
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:center'>");
                                                sb.Append(String.Format("{0:N2}", registro.Importe));
                                                sb.Append("</td>");
                                                if (tipoFormato == 1)
                                                {
                                                    sb.Append("<td style='text-align:center'>");
                                                    sb.Append(String.Format("{0:N2}", registro.ParteClinica));
                                                    sb.Append("</td>");

                                                    sb.Append("<td style='text-align:center'>");
                                                    sb.Append(String.Format("{0:N2}", registro.MontoFacturar));
                                                    sb.Append("</td>");
                                                }

                                                sb.Append("<td style='text-align:center'>");
                                                sb.Append(String.Format("{0:N2}", registro.Bonificacion));
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:center'>");
                                                sb.Append(String.Format("{0:N2}", registro.Total));
                                                sb.Append("&nbsp</td>");
                                                //sb.Append("<td>");
                                                //sb.Append(registro.DocumentoEmitido);
                                                //sb.Append("</td>");

                                                sb.Append("</tr>");
                                                if (esNuevoTipoAte == true || (k == (nRegistrosLista - 1)))
                                                {
                                                    if (tipoFormato == 1)
                                                    {
                                                        sb.Append("<tr><td colspan='3'>&nbsp</td><td colspan='5'>SUB TOTAL ");
                                                        sb.Append(buscarDescripcionTipoAtencion(obeArchivoDigitalMedicoListas.ListaTipoAtencion, int.Parse(registro.IdTipoAtencion.ToString())));
                                                        sb.Append("</td><td style='text-align:center'>" + String.Format("{0:N2}", registro.MontoImponiblePrestacionResumen));
                                                        sb.Append("</td><td style='text-align:center'>" + String.Format("{0:N2}", registro.ImporteTotalResumen)); //Cambiar por ImporteTotalResumen
                                                        sb.Append("</td><td style='text-align:center'>" + String.Format("{0:N2}", registro.ImporteResumen));
                                                        sb.Append("</td><td style='text-align:center'>" + String.Format("{0:N2}", registro.ParteClinicaResumen));

                                                        sb.Append("</td><td style='text-align:center'>" + String.Format("{0:N2}", registro.MontoFacturarResumen));

                                                        sb.Append("</td><td style='text-align:center'>" + String.Format("{0:N2}", registro.BonificacionResumen));
                                                        sb.Append("</td><td style='text-align:center'>" + String.Format("{0:N2}", registro.TotalResumen) + "&nbsp</td></tr>");
                                                        sb.Append("<tr><td colspan='4'>&nbsp</td></tr>");
                                                        sb.Append("<tr><td colspan='4'>&nbsp</td></tr>");
                                                    }
                                                    else
                                                    {
                                                        sb.Append("<tr><td colspan='3'>&nbsp</td><td colspan='7'>SUB TOTAL ");
                                                        sb.Append(buscarDescripcionTipoAtencion(obeArchivoDigitalMedicoListas.ListaTipoAtencion, int.Parse(registro.IdTipoAtencion.ToString())));
                                                        sb.Append("</td><td style='text-align:center'>" + String.Format("{0:N2}", registro.ImporteTotalResumen)); //Cambiar por ImporteTotalResumen
                                                        sb.Append("</td><td style='text-align:center'>" + String.Format("{0:N2}", registro.ImporteResumen));

                                                        //sb.Append("</td><td style='text-align:center'>" + String.Format("{0:N2}", registro.MontoFacturarResumen));

                                                        sb.Append("</td><td style='text-align:center'>" + String.Format("{0:N2}", registro.BonificacionResumen));
                                                        sb.Append("</td><td style='text-align:center'>" + String.Format("{0:N2}", registro.TotalResumen) + "&nbsp</td></tr>");
                                                        sb.Append("<tr><td colspan='4'>&nbsp</td></tr>");
                                                        sb.Append("<tr><td colspan='4'>&nbsp</td></tr>");
                                                    }
                                                    if (esNuevoMedico == true)
                                                    {
                                                        sb.Append("<tr><td colspan='3'>&nbsp</td><td colspan='5'>TOTAL</td>");
                                                        sb.Append("<td style='text-align:center'>" + String.Format("{0:N2}", registro.MontoImponiblePrestacionResumenMed) + "</td>");
                                                        sb.Append("<td style='text-align:center'>" + String.Format("{0:N2}", registro.ImporteResumenMed) + "</td>");
                                                        sb.Append("<td style='text-align:center'>" + String.Format("{0:N2}", registro.ParteClinicaResumenMed) + "</td>");

                                                        if (tipoFormato == 1)
                                                        {
                                                            sb.Append("<td style='text-align:center'>" + String.Format("{0:N2}", registro.MontoFacturarResumenMed) + "</td>");
                                                        }

                                                        sb.Append("<td style='text-align:center'>" + String.Format("{0:N2}", registro.BonificacionResumenMed) + "</td>");
                                                        sb.Append("<td style='text-align:center'>" + String.Format("{0:N2}", registro.TotalResumenMed) + "</td>");
                                                        sb.Append("<td></td></tr>");
                                                    }
                                                }
                                            }
                                            sb.Append("<tr><td colsan='15'></td></tr>");
                                            sb.Append(obtenerTotales(lstTotales, tipoFormato));
                                            //contenido += "</tr></tbody></table>";
                                            if ((obeArchivoDigitalMedicoListas.listaProcesoMedico2.Count == 0 && obeArchivoDigitalMedicoListas.listaProcesoMedico.Count == 0))
                                            {
                                                string[] valorTotal;
                                                decimal mxTotal = 0;
                                                decimal TotalFinal = 0;
                                                int NX = 0;
                                                for (int z = 0; z < 3; z++)
                                                {
                                                    switch (z)
                                                    {
                                                        case 0:
                                                            NX = obeArchivoDigitalMedicoListas.ListaProcesoOrden.Count;
                                                            for (int ax = 0; ax < NX; ax++)
                                                            {
                                                                beProcesoOrdenAtencionPdf RegistroContemplar;
                                                                RegistroContemplar = obeArchivoDigitalMedicoListas.ListaProcesoOrden[ax];
                                                                //mxTotal += RegistroContemplar.Importe;
                                                                mxTotal += RegistroContemplar.Total;
                                                            }
                                                            break;
                                                        case 1:
                                                            NX = obeArchivoDigitalMedicoListas.listaProcesoMedico.Count;
                                                            for (int bx = 0; bx < NX; bx++)
                                                            {
                                                                beProcesoMedicoHorarioPdf2 RegistroContemplar2;
                                                                RegistroContemplar2 = obeArchivoDigitalMedicoListas.listaProcesoMedico[bx];
                                                                mxTotal += RegistroContemplar2.Total;
                                                            }
                                                            break;
                                                        case 2:
                                                            NX = obeArchivoDigitalMedicoListas.listaProcesoMedico2.Count;
                                                            for (int cx = 0; cx < NX; cx++)
                                                            {
                                                                beProcesoMedicoHorarioPdf3 RegistroContemplar3;
                                                                RegistroContemplar3 = obeArchivoDigitalMedicoListas.listaProcesoMedico2[cx];
                                                                mxTotal += RegistroContemplar3.Importe;
                                                            }
                                                            break;
                                                    }
                                                }
                                                var descuento = mxTotal * (obeArchivoDigitalMedicoListas.ListaMedicos[0].FactorPorcentaje / 100);
                                                if (obeArchivoDigitalMedicoListas.ListaMedicos[0].TipoImpuestoId == "I")
                                                {
                                                    TotalFinal = mxTotal + descuento;
                                                }
                                                else
                                                {
                                                    TotalFinal = mxTotal - descuento;
                                                    descuento = descuento * -1;
                                                }
                                                CultureInfo us = new CultureInfo("en-US");
                                                switch (crearQuiebre)
                                                {
                                                    case "A":
                                                    case "B":
                                                        DatoQuiebre += "</tr><tr rowspan='10'><td colspan='15'>";
                                                        break;
                                                    case "C":
                                                        DatoQuiebre += "</tr></tbody><tfoot><tr rowspan='10'><td colspan='9'>";
                                                        break;
                                                }
                                                DatoQuiebre += "<br/><br/><p style='font-weight: bold;margin:0px'>Estimado Dr(a): ";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.Facturar;
                                                DatoQuiebre += "</p><p style='margin:0px'>Le agredecemos emitir sus comprobantes de pago por los servicios médicos</p><p style='margin:0px'>tomar en cuenta la siguiente información:</p><table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'><tr><td style='width:100px'>Girar a</td><td>";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Compania;
                                                DatoQuiebre += "</td></tr><tr><td style='width:100px'>RUC</td><td>";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.RUC;
                                                DatoQuiebre += "</td></tr><tr><td style='width:100px'>Sucursal</td><td>";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Sucursal;
                                                DatoQuiebre += "</td></tr><tr><td style='width:100px'>Dirección</td><td>";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Direccion;
                                                DatoQuiebre += "</td></tr></table>";
                                                DatoQuiebre += "<p style='margin:0px'>";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Descripcion;
                                                DatoQuiebre += "</p>";
                                                ///////////////////////
                                                DatoQuiebre += "<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td style='width:40%'>";
                                                DatoQuiebre += "<table style='width:100%;border-collapse:collapse;font-family:Calibri;font-size:12px'>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td style='width:50%'></td>";
                                                DatoQuiebre += "<td style='width:25%'>Valor venta</td>";
                                                DatoQuiebre += "<td style='text-align:right;width:25%'>" + mxTotal.ToString("#,##0.00", us) + "</td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "</tr>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td style='width:50%'>Tipo Admisión: " + obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.TipoAdmision + "</td>";
                                                DatoQuiebre += "<td style='width:25%;border-bottom:2px solid black'>IGV/Renta</td>";
                                                DatoQuiebre += "<td style='text-align:right;width:25%;border-bottom:2px solid black'>" + descuento.ToString("#,##0.00", us) + "</td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "</tr>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td style='width:50%'></td>";
                                                DatoQuiebre += "<td style='width:25%'>Total</td>";
                                                DatoQuiebre += "<td style='text-align:right;width:25%'>" + TotalFinal.ToString("#,##0.00", us) + "</td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "</tr>";

                                                if (obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count > 0 && obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos != null)
                                                {
                                                    int nregDescuento = (obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count + 1) - 3;
                                                    for (int k = 0; k < nregDescuento; k++)
                                                    {
                                                        DatoQuiebre += "<tr>";
                                                        DatoQuiebre += "<td colspan='5' style='opacity:0'>-</td>";
                                                        DatoQuiebre += "</tr>";
                                                    }
                                                }

                                                DatoQuiebre += "</table>";
                                                DatoQuiebre += "</td>";
                                                DatoQuiebre += "<td style='width:20%'></td>";
                                                DatoQuiebre += "<td style='width:25%'>";

                                                if (obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count > 0 && obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos != null)
                                                {
                                                    DatoQuiebre += "<table style='width:100%;border-collapse:collapse;font-family:Calibri;font-size:12px'>";
                                                    DatoQuiebre += "<tr>";
                                                    DatoQuiebre += "<td colspan='2' style='font-weight:bold'>Descuentos aplicados</td>";
                                                    DatoQuiebre += "</tr>";
                                                    int nregDescuento = obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count;
                                                    decimal sumDescuentos = 0;
                                                    for (int j = 0; j < nregDescuento; j++)
                                                    {
                                                        regDescuento = obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos[j];
                                                        if (j == (nregDescuento - 1))
                                                        {
                                                            DatoQuiebre += "<tr>";
                                                            DatoQuiebre += "<td style='width:70%;border-bottom:2px solid'>" + regDescuento.Descripcion.ToString() + "</td>";
                                                            DatoQuiebre += "<td style='width:30%;text-align:right;border-bottom:2px solid'>" + regDescuento.Descuento.ToString("#,##0.00", us) + "</td>";
                                                            DatoQuiebre += "</tr>";
                                                        }
                                                        else
                                                        {
                                                            DatoQuiebre += "<tr>";
                                                            DatoQuiebre += "<td style='width:70%'>" + regDescuento.Descripcion.ToString() + "</td>";
                                                            DatoQuiebre += "<td style='width:30%;text-align:right'>" + regDescuento.Descuento.ToString("#,##0.00", us) + "</td>";
                                                            DatoQuiebre += "</tr>";
                                                        }
                                                        sumDescuentos += regDescuento.Descuento;
                                                    }
                                                    DatoQuiebre += "<tr>";
                                                    DatoQuiebre += "<td style='width:70%'>Total</td>";
                                                    DatoQuiebre += "<td style='width:30%;text-align:right'>" + sumDescuentos.ToString("#,##0.00", us) + "</td>";
                                                    DatoQuiebre += "</tr>";

                                                    int c = nregDescuento + 2;
                                                    if (c == 3)
                                                    {
                                                        DatoQuiebre += "<tr>";
                                                        DatoQuiebre += "<td colspan='5' style='opacity:0'>-</td>";
                                                        DatoQuiebre += "</tr>";
                                                        DatoQuiebre += "<tr>";
                                                        DatoQuiebre += "<td colspan='5' style='opacity:0'>-</td>";
                                                        DatoQuiebre += "</tr>";
                                                    }

                                                    DatoQuiebre += "</table>";
                                                }

                                                DatoQuiebre += "</td>";
                                                DatoQuiebre += "<td style='width:15%'></td>";
                                                DatoQuiebre += "</tr>";
                                                DatoQuiebre += "</table>";

                                                DatoQuiebre += "<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td style='width:40%'>";
                                                DatoQuiebre += "<table style='width:100%;border-collapse:collapse;font-family:Calibri;font-size:12px'>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td>" + NumeroALetra(Math.Abs(TotalFinal).ToString()) + "SOLES";
                                                DatoQuiebre += "</td>";
                                                DatoQuiebre += "</tr>";
                                                DatoQuiebre += "</table>";
                                                DatoQuiebre += "</td>";
                                                DatoQuiebre += "<td style='width:20%'></td>";
                                                DatoQuiebre += "<td style='width:25%'></td>";
                                                DatoQuiebre += "<td style='width:15%'></td>";
                                                DatoQuiebre += "</tr>";
                                                DatoQuiebre += "</table>";



                                                ///////////////////////////////////////////

                                                //DatoQuiebre += "<table style='width:700px;border-collapse: collapse;font-family:Calibri;font-size:12px'><tr><td style='width:200px'></td><td style='width:100px'>Valor venta</td><td style='text-align:right;width:100px'>";
                                                //DatoQuiebre += mxTotal.ToString("#,##0.00", us);
                                                //DatoQuiebre += "</td><td></td><td></td></tr><tr><td style='width:200px'>Tipo Admisión: ";
                                                //DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.TipoAdmision;
                                                //DatoQuiebre += "</td><td style='width:100px;border-bottom:2px solid black'>IGV/Renta</td><td style='text-align:right;width:100px;border-bottom:2px solid black'>";
                                                //DatoQuiebre += descuento.ToString("#,##0.00", us);
                                                //DatoQuiebre += "</td><td></td><td></td></tr><tr><td style='width:200px'></td><td style='width:100px'>Total</td><td style='text-align:right;width:100px'>";
                                                //DatoQuiebre += TotalFinal.ToString("#,##0.00", us);
                                                //DatoQuiebre += "</td><td></td><td></td></tr><tr><td colspan='5'>Son: ";
                                                //DatoQuiebre += NumeroALetra(Math.Abs(TotalFinal).ToString()) + " SOLES";
                                                //DatoQuiebre += "</td></tr></table>";




                                                DatoQuiebre += "</td></tr></tbody></table>";


                                                DatoQuiebre += "</body></html>";
                                                sb.Append(DatoQuiebre);
                                            }
                                            else
                                            {
                                                sb.Append("</tr></tbody></table>");
                                            }
                                        }
                                        break;
                                    case 1:
                                        cabecerasTitulos = new string[] { "PersonaId", "Fecha", "Hora Inicio", "Hora Fin", "Horas", "Valor Contrato", "Importe", "Bonificación", "Total", "Día", "Feriado", "Especialidad", "Tipo Atención", "Documento Emitido" };
                                        nRegistrosLista = obeArchivoDigitalMedicoListas.listaProcesoMedico.Count;
                                        beProcesoMedicoHorarioPdf2 registro2;
                                        decimal vc = 0, imp = 0, bon = 0, total = 0, totalGen = 0;
                                        if (nRegistrosLista > 0)
                                        {
                                            crearQuiebre = "B";
                                            sb.Append("<div style='page-break-after:always'></div>");
                                            sb.Append("<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'><thead style='display: table-header-group'>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold'>Compañia:</td><td colspan='13' style='text-align:left'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Compania);
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold;'>Sucursal: </td><td colspan='10' style='text-align:left'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Sucursal);
                                            sb.Append("</td><td colspan='2' style='font-weight:bold'>Condición de Pago</td><td>");
                                            sb.Append("HORARIO");
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='15' style='font-weight:bold;'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Direccion);
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold;'>Teléfono</td><td colspan='2'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Telefono);
                                            sb.Append("</td><td style='font-weight:bold;'>Fax</td><td style='text-align:left'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Fax);
                                            sb.Append("</td><td colspan='9'></td></tr>");
                                            sb.Append("<tr><td colspan='15' style='font-weight:bold;border-bottom:1px solid black'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.URL);
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold'>N° Liquidacíon: </td><td style='text-align:left' colspan='10'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.ProcesoId);
                                            sb.Append("</td><td colspan='2'>Fecha Cierre</td><td colspan='2'>");
                                            sb.Append((obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.FechaHoraCierre.ToShortDateString().IndexOf("1900") > -1 ? "" : obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.FechaHoraCierre.ToShortDateString()));
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold'>Factura a: </td><td style='text-align:left' colspan='10'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.Facturar);
                                            sb.Append("</td><td colspan='2'>Hora</td><td colspan='2'>");
                                            sb.Append((obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.FechaHoraCierre.ToShortDateString().IndexOf("1900") > -1 ? "" : obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.FechaHoraCierre.ToShortTimeString()));
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold'>RUC: </td><td style='text-align:left' colspan='10'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.NumeroDocumento);
                                            sb.Append("</td><td colspan='2'>Usuario</td><td colspan='2'>");
                                            //sb.Append("");
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr>");
                                            for (int j = 0; j < cabecerasTitulos.Length; j++)
                                            {
                                                sb.Append("<td style='font-weight:bold;border-top: 4px double black;'>");
                                                sb.Append(cabecerasTitulos[j]);
                                                sb.Append("</td>");
                                            }
                                            sb.Append("</tr></thead><tbody style 'width:100%;font-family:Calibri;font-size:6px !important'>");
                                            for (int k = 0; k < nRegistrosLista; k++)
                                            {
                                                registro2 = obeArchivoDigitalMedicoListas.listaProcesoMedico[k];
                                                sb.Append("<tr>");
                                                sb.Append("<td>");
                                                sb.Append(registro2.PersonaId);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro2.Fecha);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro2.HoraInicio);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro2.HoraFin);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro2.HorasProgramadas.ToString());
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:right'>");
                                                sb.Append(String.Format("{0:N2}", registro2.ValorContrato));
                                                vc += registro2.ValorContrato;
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:right'>");
                                                sb.Append(String.Format("{0:N2}", registro2.Importe));
                                                imp += registro2.Importe;
                                                sb.Append("</td>");

                                                sb.Append("<td style='text-align:right'>");
                                                sb.Append(String.Format("{0:N2}", registro2.Bonificacion));
                                                bon += registro2.Bonificacion;
                                                sb.Append("</td>");

                                                sb.Append("<td style='text-align:right;font-weight:bold'>");
                                                sb.Append(String.Format("{0:N2}", registro2.Total));
                                                total += registro2.Total;
                                                sb.Append("</td>");

                                                sb.Append("<td style='text-align:center'>");
                                                sb.Append(registro2.Dia);
                                                sb.Append("</td>");

                                                sb.Append("<td style='text-align:center'>");
                                                sb.Append(registro2.IndicadorFeriado ? "Sí" : "No");
                                                sb.Append("</td>");

                                                sb.Append("<td style='text-align:center'>");
                                                sb.Append(registro2.Especialidad);
                                                sb.Append("</td>");

                                                sb.Append("<td style='text-align:center'>");
                                                sb.Append(registro2.TipoAtencion);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro2.DocumentoEmitido);
                                                sb.Append("</td>");
                                                sb.Append("</tr>");
                                            }
                                            sb.Append("<tr><td colspan='6' style='text-align:right;font-wight:bold'>TOTAL GENERAL</td>");
                                            sb.Append("<td style='text-align:right;'>" + String.Format("{0:N2}", imp) + "</td>");
                                            sb.Append("<td style='text-align:right;'>" + String.Format("{0:N2}", bon) + "</td>");
                                            sb.Append("<td style='text-align:right;font-wight:bold'>" + String.Format("{0:N2}", total) + "</td>");
                                            sb.Append("<td colspan='5'></td></tr>");

                                            if (obeArchivoDigitalMedicoListas.listaProcesoMedico2.Count == 0)
                                            {
                                                string[] valorTotal;
                                                decimal mxTotal = 0;
                                                decimal TotalFinal = 0;
                                                int NX = 0;
                                                for (int z = 0; z < 3; z++)
                                                {
                                                    switch (z)
                                                    {
                                                        case 0:
                                                            NX = obeArchivoDigitalMedicoListas.ListaProcesoOrden.Count;
                                                            for (int ax = 0; ax < NX; ax++)
                                                            {
                                                                beProcesoOrdenAtencionPdf RegistroContemplar;
                                                                RegistroContemplar = obeArchivoDigitalMedicoListas.ListaProcesoOrden[ax];
                                                                mxTotal += RegistroContemplar.Total;
                                                            }
                                                            break;
                                                        case 1:
                                                            NX = obeArchivoDigitalMedicoListas.listaProcesoMedico.Count;
                                                            for (int bx = 0; bx < NX; bx++)
                                                            {
                                                                beProcesoMedicoHorarioPdf2 RegistroContemplar2;
                                                                RegistroContemplar2 = obeArchivoDigitalMedicoListas.listaProcesoMedico[bx];
                                                                mxTotal += RegistroContemplar2.Total;
                                                            }
                                                            break;
                                                        case 2:
                                                            NX = obeArchivoDigitalMedicoListas.listaProcesoMedico2.Count;
                                                            for (int cx = 0; cx < NX; cx++)
                                                            {
                                                                beProcesoMedicoHorarioPdf3 RegistroContemplar3;
                                                                RegistroContemplar3 = obeArchivoDigitalMedicoListas.listaProcesoMedico2[cx];
                                                                mxTotal += RegistroContemplar3.Importe;
                                                            }
                                                            break;
                                                    }
                                                }

                                                var descuento = mxTotal * (obeArchivoDigitalMedicoListas.ListaMedicos[0].FactorPorcentaje / 100);
                                                if (obeArchivoDigitalMedicoListas.ListaMedicos[0].TipoImpuestoId == "I")
                                                {
                                                    TotalFinal = mxTotal + descuento;
                                                }
                                                else
                                                {
                                                    TotalFinal = mxTotal - descuento;
                                                    descuento = descuento * -1;
                                                }
                                                CultureInfo us = new CultureInfo("en-US");

                                                switch (crearQuiebre)
                                                {
                                                    case "A":
                                                    case "B":
                                                        DatoQuiebre += "</tr><tr rowspan='10'><td colspan='14'>";
                                                        break;
                                                    case "C":
                                                        DatoQuiebre += "</tr></tbody><tfoot><tr rowspan='10'><td colspan='9'>";
                                                        break;
                                                }
                                                DatoQuiebre += "<br/><br/><p style='font-weight: bold;margin:0px'>Estimado Dr(a): ";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.Facturar;
                                                DatoQuiebre += "</p><p style='margin:0px'>Le agredecemos emitir sus comprobantes de pago por los servicios médicos</p><p style='margin:0px'>tomar en cuenta la siguiente información:</p><table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'><tr><td style='width:100px'>Girar a</td><td>";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Compania;
                                                DatoQuiebre += "</td></tr><tr><td style='width:100px'>RUC</td><td>";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.RUC;
                                                DatoQuiebre += "</td></tr><tr><td style='width:100px'>Sucursal</td><td>";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Sucursal;
                                                DatoQuiebre += "</td></tr><tr><td style='width:100px'>Dirección</td><td>";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Direccion;
                                                DatoQuiebre += "</td></tr></table>";
                                                DatoQuiebre += "<p style='margin:0px'>";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Descripcion;

                                                DatoQuiebre += "</p>";

                                                ///////////////////////
                                                DatoQuiebre += "<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td style='width:40%'>";
                                                DatoQuiebre += "<table style='width:100%;border-collapse:collapse;font-family:Calibri;font-size:12px'>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td style='width:50%'></td>";
                                                DatoQuiebre += "<td style='width:25%'>Valor venta</td>";
                                                DatoQuiebre += "<td style='text-align:right;width:25%'>" + mxTotal.ToString("#,##0.00", us) + "</td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "</tr>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td style='width:50%'>Tipo Admisión: " + obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.TipoAdmision + "</td>";
                                                DatoQuiebre += "<td style='width:25%;border-bottom:2px solid black'>IGV/Renta</td>";
                                                DatoQuiebre += "<td style='text-align:right;width:25%;border-bottom:2px solid black'>" + descuento.ToString("#,##0.00", us) + "</td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "</tr>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td style='width:50%'></td>";
                                                DatoQuiebre += "<td style='width:25%'>Total</td>";
                                                DatoQuiebre += "<td style='text-align:right;width:25%'>" + TotalFinal.ToString("#,##0.00", us) + "</td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "</tr>";


                                                if (obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count > 0 && obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos != null)
                                                {
                                                    int nregDescuento = (obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count + 1) - 3;
                                                    for (int k = 0; k < nregDescuento; k++)
                                                    {
                                                        DatoQuiebre += "<tr>";
                                                        DatoQuiebre += "<td colspan='5' style='opacity:0'>-</td>";
                                                        DatoQuiebre += "</tr>";
                                                    }
                                                }

                                                DatoQuiebre += "</table>";
                                                DatoQuiebre += "</td>";
                                                DatoQuiebre += "<td style='width:20%'></td>";
                                                DatoQuiebre += "<td style='width:25%'>";

                                                if (obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count > 0 && obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos != null)
                                                {
                                                    DatoQuiebre += "<table style='width:100%;border-collapse:collapse;font-family:Calibri;font-size:12px'>";
                                                    DatoQuiebre += "<tr>";
                                                    DatoQuiebre += "<td colspan='2' style='font-weight:bold'>Descuentos aplicados</td>";
                                                    DatoQuiebre += "</tr>";
                                                    int nregDescuento = obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count;
                                                    decimal sumDescuentos = 0;
                                                    for (int j = 0; j < nregDescuento; j++)
                                                    {
                                                        regDescuento = obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos[j];
                                                        if (j == (nregDescuento - 1))
                                                        {
                                                            DatoQuiebre += "<tr>";
                                                            DatoQuiebre += "<td style='width:70%;border-bottom:2px solid'>" + regDescuento.Descripcion.ToString() + "</td>";
                                                            DatoQuiebre += "<td style='width:30%;text-align:right;border-bottom:2px solid'>" + regDescuento.Descuento.ToString("#,##0.00", us) + "</td>";
                                                            DatoQuiebre += "</tr>";
                                                        }
                                                        else
                                                        {
                                                            DatoQuiebre += "<tr>";
                                                            DatoQuiebre += "<td style='width:70%'>" + regDescuento.Descripcion.ToString() + "</td>";
                                                            DatoQuiebre += "<td style='width:30%;text-align:right'>" + regDescuento.Descuento.ToString("#,##0.00", us) + "</td>";
                                                            DatoQuiebre += "</tr>";
                                                        }
                                                        sumDescuentos += regDescuento.Descuento;
                                                    }
                                                    DatoQuiebre += "<tr>";
                                                    DatoQuiebre += "<td style='width:70%'>Total:</td>";
                                                    DatoQuiebre += "<td style='width:30%;text-align:right'>" + sumDescuentos.ToString("#,##0.00", us) + "</td>";
                                                    DatoQuiebre += "</tr>";

                                                    int c = nregDescuento + 2;
                                                    if (c == 3)
                                                    {
                                                        DatoQuiebre += "<tr>";
                                                        DatoQuiebre += "<td colspan='5' style='opacity:0'>-</td>";
                                                        DatoQuiebre += "</tr>";
                                                        DatoQuiebre += "<tr>";
                                                        DatoQuiebre += "<td colspan='5' style='opacity:0'>-</td>";
                                                        DatoQuiebre += "</tr>";
                                                    }

                                                    DatoQuiebre += "</table>";
                                                }

                                                DatoQuiebre += "</td>";
                                                DatoQuiebre += "<td style='width:15%'></td>";
                                                DatoQuiebre += "</tr>";
                                                DatoQuiebre += "</table>";

                                                DatoQuiebre += "<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td style='width:40%'>";
                                                DatoQuiebre += "<table style='width:100%;border-collapse:collapse;font-family:Calibri;font-size:12px'>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td>" + NumeroALetra(Math.Abs(TotalFinal).ToString()) + "SOLES";
                                                DatoQuiebre += "</td>";
                                                DatoQuiebre += "</tr>";
                                                DatoQuiebre += "</table>";
                                                DatoQuiebre += "</td>";
                                                DatoQuiebre += "<td style='width:20%'></td>";
                                                DatoQuiebre += "<td style='width:25%'></td>";
                                                DatoQuiebre += "<td style='width:15%'></td>";
                                                DatoQuiebre += "</tr>";
                                                DatoQuiebre += "</table>";
                                                ///////////////////////////////////////////


                                                //DatoQuiebre += "</p><table style='width:700px;border-collapse: collapse;font-family:Calibri;font-size:12px'><tr><td style='width:200px'></td><td style='width:100px'>Valor venta</td><td style='text-align:right;width:100px'>";
                                                //DatoQuiebre += mxTotal.ToString("#,##0.00", us);
                                                //DatoQuiebre += "</td><td></td><td></td></tr><tr><td style='width:200px'>Tipo Admisión: ";
                                                //DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.TipoAdmision;
                                                //DatoQuiebre += "</td><td style='width:100px;border-bottom:2px solid black'>IGV/Renta</td><td style='text-align:right;width:100px;border-bottom:2px solid black'>";
                                                //DatoQuiebre += descuento.ToString("#,##0.00", us);
                                                //DatoQuiebre += "</td><td></td><td></td></tr><tr><td style='width:200px'></td><td style='width:100px'>Total</td><td style='text-align:right;width:100px'>";
                                                //DatoQuiebre += TotalFinal.ToString("#,##0.00", us);
                                                //DatoQuiebre += "</td><td></td><td></td></tr><tr><td colspan='5'>Son: ";
                                                //DatoQuiebre += NumeroALetra(Math.Abs(TotalFinal).ToString()) + " SOLES";
                                                //DatoQuiebre += "</td></tr></table>";



                                                DatoQuiebre += "</td></tr></tbody></table>";
                                                DatoQuiebre += "</body></html>";
                                                sb.Append(DatoQuiebre);
                                            }
                                            else
                                            {
                                                sb.Append("</tr></tbody></table>");
                                            }
                                        }
                                        break;
                                    case 2:
                                        cabecerasTitulos = new string[] { "PersonaId", "Descripción", "Importe", "Concepto Id", "Concepto", "Indicador Administrativo", "Periodo", "Total General", "Documento Emitido" };
                                        nRegistrosLista = obeArchivoDigitalMedicoListas.listaProcesoMedico2.Count;
                                        beProcesoMedicoHorarioPdf3 registro3;
                                        decimal TotGen = 0;
                                        if (nRegistrosLista > 0)
                                        {
                                            crearQuiebre = "C";
                                            sb.Append("<div style='page-break-after:always'></div>");
                                            sb.Append("<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'><thead style='display: table-header-group'>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold'>Compañia:</td><td colspan='7' style='text-align:left'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Compania);
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold;'>Sucursal: </td><td colspan='4' style='text-align:left'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Sucursal);
                                            sb.Append("</td><td colspan='2' style='font-weight:bold'>Condición de Pago</td><td>");
                                            sb.Append("MONTO FIJO");
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='9' style='font-weight:bold;'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Direccion);
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold;'>Teléfono</td><td colspan='2'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Telefono);
                                            sb.Append("</td><td style='font-weight:bold;'>Fax</td><td style='text-align:left'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Fax);
                                            sb.Append("</td><td colspan='3'></td></tr>");
                                            sb.Append("<tr><td colspan='9' style='font-weight:bold;border-bottom:1px solid black'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.URL);
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold'>N° Liquidacíon: </td><td style='text-align:left' colspan='4'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.ProcesoId);
                                            sb.Append("</td><td colspan='2'>Fecha Cierre</td><td colspan='2'>");
                                            sb.Append((obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.FechaHoraCierre.ToShortDateString().IndexOf("1900") > -1 ? "" : obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.FechaHoraCierre.ToShortDateString()));
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold'>Factura a: </td><td style='text-align:left' colspan='4'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.Facturar);
                                            sb.Append("</td><td colspan='2'>Hora</td><td colspan='2'>");
                                            sb.Append((obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.FechaHoraCierre.ToShortDateString().IndexOf("1900") > -1 ? "" : obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.FechaHoraCierre.ToShortTimeString()));
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr><td colspan='2' style='font-weight:bold'>RUC: </td><td style='text-align:left' colspan='4'>");
                                            sb.Append(obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.NumeroDocumento);
                                            sb.Append("</td><td colspan='2'>Usuario</td><td colspan='2'>");
                                            sb.Append("</td></tr>");
                                            sb.Append("<tr>");
                                            sb.Append("<tr>");
                                            for (int j = 0; j < cabecerasTitulos.Length; j++)
                                            {
                                                sb.Append("<td style='font-weight:bold;border-top: 4px double black;'>");
                                                sb.Append(cabecerasTitulos[j]);
                                                sb.Append("</td>");
                                            }
                                            sb.Append("</tr></thead><tbody style 'width:100%;font-family:Calibri;font-size:6px !important'>");
                                            for (int k = 0; k < nRegistrosLista; k++)
                                            {
                                                registro3 = obeArchivoDigitalMedicoListas.listaProcesoMedico2[k];
                                                sb.Append("<tr>");
                                                sb.Append("<td>");
                                                sb.Append(registro3.PersonaId);
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:left'>");
                                                sb.Append(registro3.Descripcion);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro3.Importe);
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:left'>");
                                                sb.Append(registro3.ConceptoMontoFijoId);
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:left'>");
                                                sb.Append(registro3.ConceptoMontoFijo);
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:center'>");
                                                sb.Append((registro3.IndicadorAdministrativo ? "Sí" : "No"));
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                switch (registro3.Periodo)
                                                {
                                                    case "D":
                                                        sb.Append("DIARIO");
                                                        break;
                                                    case "M":
                                                        sb.Append("MENSUAL");
                                                        break;
                                                    case "Q":
                                                        sb.Append("QUINCENAL");
                                                        break;
                                                    default:
                                                        sb.Append("OTRO");
                                                        break;
                                                }
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:right;font-weight:bold'>");
                                                sb.Append(String.Format("{0:N2}", registro3.TotalGeneral));
                                                TotGen += registro3.TotalGeneral;
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro3.DocumentoEmitido);
                                                sb.Append("</td>");
                                                sb.Append("</tr>");
                                            }
                                            sb.Append("<tr><td colspan='7' style='text-align:right;font-weight:bold'>TOTAL GENERAL</td>");
                                            sb.Append("<td style='text-align:right;font-weight:bold'>" + String.Format("{0:N2}", TotGen) + "</td>");
                                            sb.Append("<td></td></tr>");
                                            string[] valorTotal;
                                            decimal mxTotal = 0;
                                            decimal TotalFinal = 0;
                                            int NX = 0;
                                            for (int z = 0; z < 3; z++)
                                            {
                                                switch (z)
                                                {
                                                    case 0:
                                                        NX = obeArchivoDigitalMedicoListas.ListaProcesoOrden.Count;
                                                        for (int ax = 0; ax < NX; ax++)
                                                        {
                                                            beProcesoOrdenAtencionPdf RegistroContemplar;
                                                            RegistroContemplar = obeArchivoDigitalMedicoListas.ListaProcesoOrden[ax];
                                                            mxTotal += RegistroContemplar.Total;
                                                        }
                                                        break;
                                                    case 1:
                                                        NX = obeArchivoDigitalMedicoListas.listaProcesoMedico.Count;
                                                        for (int bx = 0; bx < NX; bx++)
                                                        {
                                                            beProcesoMedicoHorarioPdf2 RegistroContemplar2;
                                                            RegistroContemplar2 = obeArchivoDigitalMedicoListas.listaProcesoMedico[bx];
                                                            mxTotal += RegistroContemplar2.Total;
                                                        }
                                                        break;
                                                    case 2:
                                                        NX = obeArchivoDigitalMedicoListas.listaProcesoMedico2.Count;
                                                        for (int cx = 0; cx < NX; cx++)
                                                        {
                                                            beProcesoMedicoHorarioPdf3 RegistroContemplar3;
                                                            RegistroContemplar3 = obeArchivoDigitalMedicoListas.listaProcesoMedico2[cx];
                                                            mxTotal += RegistroContemplar3.Importe;
                                                        }
                                                        break;
                                                }

                                            }

                                            var descuento = mxTotal * (obeArchivoDigitalMedicoListas.ListaMedicos[0].FactorPorcentaje / 100);
                                            if (obeArchivoDigitalMedicoListas.ListaMedicos[0].TipoImpuestoId == "I")
                                            {
                                                TotalFinal = mxTotal + descuento;
                                            }
                                            else
                                            {
                                                TotalFinal = mxTotal - descuento;
                                                descuento = descuento * -1;
                                            }
                                            CultureInfo us = new CultureInfo("en-US");

                                            switch (crearQuiebre)
                                            {
                                                case "A":
                                                case "B":
                                                    DatoQuiebre += "</tr><tr rowspan='10'><td colspan='14'>";
                                                    break;
                                                case "C":
                                                    DatoQuiebre += "</tr></tbody><tfoot><tr rowspan='10'><td colspan='9'>";
                                                    break;
                                            }
                                            DatoQuiebre += "<br/><br/><p style='font-weight: bold;margin:0px'>Estimado Dr(a): ";
                                            DatoQuiebre += obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.Facturar;
                                            DatoQuiebre += "</p><p style='margin:0px'>Le agredecemos emitir sus comprobantes de pago por los servicios médicos</p><p style='margin:0px'>tomar en cuenta la siguiente información:</p><table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'><tr><td style='width:100px'>Girar a</td><td>";
                                            DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Compania;
                                            DatoQuiebre += "</td></tr><tr><td style='width:100px'>RUC</td><td>";
                                            DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.RUC;
                                            DatoQuiebre += "</td></tr><tr><td style='width:100px'>Sucursal</td><td>";
                                            DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Sucursal;
                                            DatoQuiebre += "</td></tr><tr><td style='width:100px'>Dirección</td><td>";
                                            DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Direccion;
                                            DatoQuiebre += "</td></tr></table>";
                                            DatoQuiebre += "<p style='margin:0px'>";
                                            DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Descripcion;

                                            ///////////////////////
                                            DatoQuiebre += "<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'>";
                                            DatoQuiebre += "<tr>";
                                            DatoQuiebre += "<td style='width:40%'>";
                                            DatoQuiebre += "<table style='width:100%;border-collapse:collapse;font-family:Calibri;font-size:12px'>";
                                            DatoQuiebre += "<tr>";
                                            DatoQuiebre += "<td style='width:50%'></td>";
                                            DatoQuiebre += "<td style='width:25%'>Valor venta</td>";
                                            DatoQuiebre += "<td style='text-align:right;width:25%'>" + mxTotal.ToString("#,##0.00", us) + "</td>";
                                            DatoQuiebre += "<td></td>";
                                            DatoQuiebre += "<td></td>";
                                            DatoQuiebre += "</tr>";
                                            DatoQuiebre += "<tr>";
                                            DatoQuiebre += "<td style='width:50%'>Tipo Admisión: " + obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.TipoAdmision + "</td>";
                                            DatoQuiebre += "<td style='width:25%;border-bottom:2px solid black'>IGV/Renta</td>";
                                            DatoQuiebre += "<td style='text-align:right;width:25%;border-bottom:2px solid black'>" + descuento.ToString("#,##0.00", us) + "</td>";
                                            DatoQuiebre += "<td></td>";
                                            DatoQuiebre += "<td></td>";
                                            DatoQuiebre += "</tr>";
                                            DatoQuiebre += "<tr>";
                                            DatoQuiebre += "<td style='width:50%'></td>";
                                            DatoQuiebre += "<td style='width:25%'>Total</td>";
                                            DatoQuiebre += "<td style='text-align:right;width:25%'>" + TotalFinal.ToString("#,##0.00", us) + "</td>";
                                            DatoQuiebre += "<td></td>";
                                            DatoQuiebre += "<td></td>";
                                            DatoQuiebre += "</tr>";


                                            if (obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count > 0 && obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos != null)
                                            {
                                                int nregDescuento = (obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count + 1) - 3;
                                                for (int k = 0; k < nregDescuento; k++)
                                                {
                                                    DatoQuiebre += "<tr>";
                                                    DatoQuiebre += "<td colspan='5' style='opacity:0'>-</td>";
                                                    DatoQuiebre += "</tr>";
                                                }
                                            }

                                            DatoQuiebre += "</table>";
                                            DatoQuiebre += "</td>";
                                            DatoQuiebre += "<td style='width:20%'></td>";
                                            DatoQuiebre += "<td style='width:25%'>";

                                            if (obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count > 0 && obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos != null)
                                            {
                                                DatoQuiebre += "<table style='width:100%;border-collapse:collapse;font-family:Calibri;font-size:12px'>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td colspan='2' style='font-weight:bold'>Descuentos aplicados</td>";
                                                DatoQuiebre += "</tr>";
                                                int nregDescuento = obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count;
                                                decimal sumDescuentos = 0;
                                                for (int j = 0; j < nregDescuento; j++)
                                                {
                                                    regDescuento = obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos[j];
                                                    if (j == (nregDescuento - 1))
                                                    {
                                                        DatoQuiebre += "<tr>";
                                                        DatoQuiebre += "<td style='width:70%;border-bottom:2px solid'>" + regDescuento.Descripcion.ToString() + "</td>";
                                                        DatoQuiebre += "<td style='width:30%;text-align:right;border-bottom:2px solid'>" + regDescuento.Descuento.ToString("#,##0.00", us) + "</td>";
                                                        DatoQuiebre += "</tr>";
                                                    }
                                                    else
                                                    {
                                                        DatoQuiebre += "<tr>";
                                                        DatoQuiebre += "<td style='width:70%'>" + regDescuento.Descripcion.ToString() + "</td>";
                                                        DatoQuiebre += "<td style='width:30%;text-align:right'>" + regDescuento.Descuento.ToString("#,##0.00", us) + "</td>";
                                                        DatoQuiebre += "</tr>";
                                                    }
                                                    sumDescuentos += regDescuento.Descuento;
                                                }
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td style='width:70%'>Total:</td>";
                                                DatoQuiebre += "<td style='width:30%;text-align:right'>" + sumDescuentos.ToString("#,##0.00", us) + "</td>";
                                                DatoQuiebre += "</tr>";

                                                int c = nregDescuento + 2;
                                                if (c == 3)
                                                {
                                                    DatoQuiebre += "<tr>";
                                                    DatoQuiebre += "<td colspan='5' style='opacity:0'>-</td>";
                                                    DatoQuiebre += "</tr>";
                                                    DatoQuiebre += "<tr>";
                                                    DatoQuiebre += "<td colspan='5' style='opacity:0'>-</td>";
                                                    DatoQuiebre += "</tr>";
                                                }

                                                DatoQuiebre += "</table>";
                                            }

                                            DatoQuiebre += "</td>";
                                            DatoQuiebre += "<td style='width:15%'></td>";
                                            DatoQuiebre += "</tr>";
                                            DatoQuiebre += "</table>";

                                            DatoQuiebre += "<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'>";
                                            DatoQuiebre += "<tr>";
                                            DatoQuiebre += "<td style='width:40%'>";
                                            DatoQuiebre += "<table style='width:100%;border-collapse:collapse;font-family:Calibri;font-size:12px'>";
                                            DatoQuiebre += "<tr>";
                                            DatoQuiebre += "<td>" + NumeroALetra(Math.Abs(TotalFinal).ToString()) + "SOLES";
                                            DatoQuiebre += "</td>";
                                            DatoQuiebre += "</tr>";
                                            DatoQuiebre += "</table>";
                                            DatoQuiebre += "</td>";
                                            DatoQuiebre += "<td style='width:20%'></td>";
                                            DatoQuiebre += "<td style='width:25%'></td>";
                                            DatoQuiebre += "<td style='width:15%'></td>";
                                            DatoQuiebre += "</tr>";
                                            DatoQuiebre += "</table>";
                                            ///////////////////////////////////////////

                                            //DatoQuiebre += "</p><table style='width:700px;border-collapse: collapse;font-family:Calibri;font-size:12px'><tr><td style='width:200px'></td><td style='width:100px'>Valor venta</td><td style='text-align:right;width:100px'>";
                                            //DatoQuiebre += mxTotal.ToString("#,##0.00", us);
                                            //DatoQuiebre += "</td><td></td><td></td></tr><tr><td style='width:200px'>Tipo Admisión: ";
                                            //DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.TipoAdmision;
                                            //DatoQuiebre += "</td><td style='width:100px;border-bottom:2px solid black'>IGV/Renta</td><td style='text-align:right;width:100px;border-bottom:2px solid black'>";
                                            //DatoQuiebre += descuento.ToString("#,##0.00", us);
                                            //DatoQuiebre += "</td><td></td><td></td></tr><tr><td style='width:200px'></td><td style='width:100px'>Total</td><td style='text-align:right;width:100px'>";
                                            //DatoQuiebre += TotalFinal.ToString("#,##0.00", us);
                                            //DatoQuiebre += "</td><td></td><td></td></tr><tr><td colspan='5'>Son: ";
                                            //DatoQuiebre += NumeroALetra(Math.Abs(TotalFinal).ToString()) + " SOLES";
                                            //DatoQuiebre += "</td></tr></table>";


                                            DatoQuiebre += "</td></tr></tbody></table>";
                                            DatoQuiebre += "</body></html>";
                                            sb.Append(DatoQuiebre);
                                        }
                                        break;
                                }
                            }

                            var htmlToPdf = new NReco.PdfGenerator.HtmlToPdfConverter();
                            htmlToPdf.Size = NReco.PdfGenerator.PageSize.A4;
                            htmlToPdf.Margins = new NReco.PdfGenerator.PageMargins { Top = 14, Bottom = 6, Left = 5, Right = 5 };
                            htmlToPdf.Orientation = NReco.PdfGenerator.PageOrientation.Landscape;
                            htmlToPdf.CustomWkHtmlPageArgs = "--footer-right [page]/[topage] --footer-font-size 8";
                            htmlToPdf.PageHeaderHtml = "<div style='font-family:Calibri;text-align:center;height:60px'><div style='display:inline-block'>LIQUIDACIÓN-SERVICIOS MÉDICOS<br/>Periodo Planilla: " + obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Anio + "-" + (int.Parse(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Mes) >= 10 ? obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Mes : "0" + obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Mes) + "<br/>" + obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.PeriodoProvision + "</div><div style='width:150px;text-align:left;display:inline-block;float:right'><table style='border-collapse: collapse;width:150px;font-family:Calibri;'><tr><td>Página</td><td><span class='page'></span></td><td>de <span class='topage'></span></td></tr><tr><td>Fecha</td><td colspan='2'>" + DateTime.Now.ToShortDateString() + "</td></tr><tr><td>Hora</td><td colspan='2'>" + DateTime.Now.ToShortTimeString() + "</td></tr></table></div></div>";

                            byte[] PDFbuffer = htmlToPdf.GeneratePdf(sb.ToString());
                            string pdfstring = Convert.ToBase64String(PDFbuffer);
                            string carpeta = rutaPdf + "\\" + obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.SucursalId;
                            if (!Directory.Exists(carpeta))
                            {
                                Directory.CreateDirectory(carpeta);
                            }
                            string carpetaPeriodo = carpeta + "\\" + obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Anio + (int.Parse(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Mes) >= 10 ? obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Mes : "0" + obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Mes);
                            if (!Directory.Exists(carpetaPeriodo))
                            {
                                Directory.CreateDirectory(carpetaPeriodo);
                            }
                            string carpetaTipoAdmision = carpetaPeriodo + "\\" + obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.TipoAdmision;
                            if (!Directory.Exists(carpetaTipoAdmision))
                            {
                                Directory.CreateDirectory(carpetaTipoAdmision);
                            }
                            string ruta = carpetaTipoAdmision + "\\" + obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.NombrePDF;
                            if (File.Exists(ruta))
                            {
                                File.Delete(ruta);
                            }
                            using (FileStream fs = File.Create(ruta))
                            {
                                Byte[] info = Convert.FromBase64String(pdfstring);
                                // Add some information to the file.
                                fs.Write(info, 0, info.Length);
                            }
                            DatoQuiebre = "";
                            rpta = "1";
                        }
                        //}
                    }
                    catch (SqlException ex)
                    {
                        foreach (SqlError err in ex.Errors)
                        {
                            ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
                        }
                    }
                    catch (Exception ex)
                    {
                        ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
                    }
                }
            });
            //rpta = "";
            return rpta;
        }
        public async Task<string> crearPdfCSFR(string medico, string su, string rutaPdf, int tipoFormato)
        {
            string rpta = "";
            beArchivoDigitalListasPdf obeArchivoDigitalListasPdf = null;
            beArchivoDigitalMedicoCSFRListas obeArchivoDigitalMedicoListas = null;
            //int nMedicos = medicos.Length;
            string[] regMedico;
            await Task.Run(() =>
            {

                using (SqlConnection con = new SqlConnection(Conexion))
                {
                    try
                    {
                        con.Open();
                        daArchivoDigital odaArchivoDigital = new daArchivoDigital();
                        //obeArchivoDigitalListasPdf = odaArchivoDigital.obtenerListasPdfMaestro(con,su);
                        int nRegistrosLista = 0;
                        string[] cabecerasTitulos = new string[] { };
                        string contenido = "";
                        string crearQuiebre = "";
                        List<string> lstTotales = new List<string>();
                        string DatoQuiebre = "";
                        StringBuilder sb = new StringBuilder();
                        CultureInfo us = new CultureInfo("en-US");
                        //for (int i = 0; i < nMedicos; i++)
                        //{
                        crearQuiebre = "";
                        regMedico = medico.Split('¦');
                        string planillaId = regMedico[0];
                        obeArchivoDigitalMedicoListas = odaArchivoDigital.obtenerListasPdfCSFRDetalle(con, su, int.Parse(planillaId), int.Parse(regMedico[1]));

                        if (obeArchivoDigitalMedicoListas != null)
                        {
                            //lstTotales = crearMatriz(obeArchivoDigitalMedicoListas.ListaProcesoOrden, obeArchivoDigitalMedicoListas.ListaMedicos);
                            sb.Clear();
                            //contenido = "";
                            sb.Append("<html><head><meta charset='utf-8' /><style type='text/css'>thead {display: table-header-group;}tr { page-break-inside: avoid;} p{font-family:Calibri;font-size:12px}</style></head><body style='width:100%;font-family:Calibri;margin-bottom:80px;'>");

                            for (int p = 0; p < 4; p++)
                            {
                                switch (p)
                                {
                                    case 0:
                                        nRegistrosLista = obeArchivoDigitalMedicoListas.ListaProcesoOrden.Count;
                                        cabecerasTitulos = new string[] { "N°", "Fecha", "Prefactura", "Entidad", "Paciente", "Descripcion", "Origen", "Concepto", "Total(S/.)", "Clínica(S/.)", "Médico(S/.)", "Sucursal" }; //15
                                        beProcesoOrdenAtencionCSFRPdf registro;
                                        int idMed = 0, idTipoAte = 0;
                                        string tipoAjuste = "";
                                        bool esNuevo = false;
                                        bool esNuevoTipoAte = false;
                                        bool esNuevoMedico = false;
                                        int idEspecialidad = 0;
                                        int idServicio = 0;
                                        string codPres = "";
                                        string cabecera = "";
                                        beProcesoOrdenAtencionCSFRPdf regSiguiente;
                                        bePlanillaMedicoDescuento regDescuento;
                                        if (nRegistrosLista > 0)
                                        {
                                            crearQuiebre = "A";
                                            sb.Append("<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'><thead style='display: table-header-group'>");
                                            sb.Append("<tr>");
                                            if (tipoFormato == 1)
                                            {
                                                for (int j = 0; j < cabecerasTitulos.Length; j++)
                                                {
                                                    sb.Append("<td style='font-weight:bold'>");
                                                    sb.Append(cabecerasTitulos[j]);
                                                    sb.Append("</td>");
                                                }
                                            }
                                            else
                                            {
                                                for (int j = 0; j < cabecerasTitulos.Length; j++)
                                                {
                                                    switch (j)
                                                    {
                                                        case 5:
                                                            sb.Append("<td style='font-weight:bold' colspan='3'>");
                                                            break;
                                                        case 7:
                                                        case 8:
                                                        case 9:
                                                        case 10:
                                                            sb.Append("<td style='font-weight:bold;text-align:center'>");
                                                            break;
                                                        default:
                                                            sb.Append("<td style='font-weight:bold;'>");
                                                            break;
                                                    }
                                                    sb.Append(cabecerasTitulos[j]);
                                                    sb.Append("</td>");
                                                }
                                                sb.Append("<td></td>");
                                            }
                                            sb.Append("</tr></thead><tbody>");
                                            decimal mtTotal = 0;
                                            decimal mtClinica = 0;
                                            decimal mtMedico = 0;
                                            for (int k = 0; k < nRegistrosLista; k++)
                                            {
                                                registro = obeArchivoDigitalMedicoListas.ListaProcesoOrden[k];
                                                sb.Append("<tr>");
                                                sb.Append("<td>");
                                                sb.Append((k + 1).ToString());
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro.Fecha.ToShortDateString());
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro.Prefactura);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro.Entidad);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro.Paciente);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro.Descripcion);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro.Concepto);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro.Origen);
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:right'>");
                                                sb.Append(registro.Total.ToString("#,##0.00", us));
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:right'>");
                                                sb.Append(registro.Clinica.ToString("#,##0.00", us));
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:right'>");
                                                sb.Append(registro.Medico.ToString("#,##0.00", us));
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:center'>");
                                                sb.Append(registro.Sucursal);
                                                sb.Append("</td>");
                                                sb.Append("</tr>");
                                                mtTotal += registro.Total;
                                                mtClinica += registro.Clinica;
                                                mtMedico += registro.Medico;
                                            }
                                            sb.Append("<tr><td colsan='15'></td></tr>");

                                            sb.Append("<tr><td colspan='3'>&nbsp</td><td style='font-weight:bold' colspan='5'>TOTAL GENERAL</td>");
                                            sb.Append("<td style='text-align:right;font-weight:bold'>" + mtTotal.ToString("#,##0.00", us) + "</td>");
                                            sb.Append("<td style='text-align:right;font-weight:bold'>" + mtClinica.ToString("#,##0.00", us) + "</td>");
                                            sb.Append("<td style='text-align:right;font-weight:bold'>" + mtMedico.ToString("#,##0.00", us) + "</td>");
                                            sb.Append("</tr>");

                                            sb.Append("<br/>");
                                            sb.Append("<table style='width:100%'>");
                                            sb.Append("<tr>");
                                            sb.Append("<td style='width:50%'>");
                                            sb.Append(crearResumenAtenciones(obeArchivoDigitalMedicoListas.ListaResumenAtenciones));
                                            sb.Append("</td>");
                                            sb.Append("<td style='width:50%;padding-right:5px' valign='top' align='right'>");
                                            sb.Append(crearResumen(obeArchivoDigitalMedicoListas.ListaResumenEmpresa));
                                            sb.Append("</td>");
                                            sb.Append("<tr>");
                                            sb.Append("</table>");

                                            if ((obeArchivoDigitalMedicoListas.listaProcesoMedico2.Count == 0 && obeArchivoDigitalMedicoListas.listaProcesoMedico.Count == 0))
                                            {
                                                string[] valorTotal;
                                                decimal mxTotal = 0;
                                                decimal TotalFinal = 0;
                                                int NX = 0;
                                                for (int z = 0; z < 3; z++)
                                                {
                                                    switch (z)
                                                    {
                                                        case 0:
                                                            NX = obeArchivoDigitalMedicoListas.ListaProcesoOrden.Count;
                                                            for (int ax = 0; ax < NX; ax++)
                                                            {
                                                                beProcesoOrdenAtencionCSFRPdf RegistroContemplar;
                                                                RegistroContemplar = obeArchivoDigitalMedicoListas.ListaProcesoOrden[ax];
                                                                //mxTotal += RegistroContemplar.Importe;
                                                                mxTotal += RegistroContemplar.Total;
                                                            }
                                                            break;
                                                        case 1:
                                                            NX = obeArchivoDigitalMedicoListas.listaProcesoMedico.Count;
                                                            for (int bx = 0; bx < NX; bx++)
                                                            {
                                                                beProcesoMedicoHorarioPdf2 RegistroContemplar2;
                                                                RegistroContemplar2 = obeArchivoDigitalMedicoListas.listaProcesoMedico[bx];
                                                                mxTotal += RegistroContemplar2.Total;
                                                            }
                                                            break;
                                                        case 2:
                                                            NX = obeArchivoDigitalMedicoListas.listaProcesoMedico2.Count;
                                                            for (int cx = 0; cx < NX; cx++)
                                                            {
                                                                beProcesoMedicoHorarioPdf3 RegistroContemplar3;
                                                                RegistroContemplar3 = obeArchivoDigitalMedicoListas.listaProcesoMedico2[cx];
                                                                mxTotal += RegistroContemplar3.Importe;
                                                            }
                                                            break;
                                                    }
                                                }
                                                var descuento = mxTotal * (obeArchivoDigitalMedicoListas.ListaMedicos[0].FactorPorcentaje / 100);
                                                if (obeArchivoDigitalMedicoListas.ListaMedicos[0].TipoImpuestoId == "I")
                                                {
                                                    TotalFinal = mxTotal + descuento;
                                                }
                                                else
                                                {
                                                    TotalFinal = mxTotal - descuento;
                                                    descuento = descuento * -1;
                                                }

                                                switch (crearQuiebre)
                                                {
                                                    case "A":
                                                    case "B":
                                                        DatoQuiebre += "</tr><tr rowspan='10'><td colspan='15'>";
                                                        break;
                                                    case "C":
                                                        DatoQuiebre += "</tr></tbody><tfoot><tr rowspan='10'><td colspan='9'>";
                                                        break;
                                                }
                                                DatoQuiebre += "</td></tr></tbody></table>";


                                                DatoQuiebre += "</body></html>";
                                                sb.Append(DatoQuiebre);
                                            }
                                            else
                                            {
                                                sb.Append("</tr></tbody></table>");
                                            }
                                        }
                                        break;
                                    case 1:
                                        cabecerasTitulos = new string[] { "PersonaId", "Fecha", "Hora Inicio", "Hora Fin", "Horas", "Valor Contrato", "Importe", "Bonificación", "Total", "Día", "Feriado", "Especialidad", "Tipo Atención", "Documento Emitido" };
                                        nRegistrosLista = obeArchivoDigitalMedicoListas.listaProcesoMedico.Count;
                                        beProcesoMedicoHorarioPdf2 registro2;
                                        decimal vc = 0, imp = 0, bon = 0, total = 0, totalGen = 0;
                                        if (nRegistrosLista > 0)
                                        {
                                            crearQuiebre = "B";
                                            sb.Append("<div style='page-break-after:always'></div>");
                                            sb.Append("<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'><thead style='display: table-header-group'>");
                                            sb.Append("<tr>");
                                            for (int j = 0; j < cabecerasTitulos.Length; j++)
                                            {
                                                sb.Append("<td style='font-weight:bold;'>");
                                                sb.Append(cabecerasTitulos[j]);
                                                sb.Append("</td>");
                                            }
                                            sb.Append("</tr></thead><tbody style 'width:100%;font-family:Calibri;font-size:6px !important'>");
                                            for (int k = 0; k < nRegistrosLista; k++)
                                            {
                                                registro2 = obeArchivoDigitalMedicoListas.listaProcesoMedico[k];
                                                sb.Append("<tr>");
                                                sb.Append("<td>");
                                                sb.Append(registro2.PersonaId);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro2.Fecha);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro2.HoraInicio);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro2.HoraFin);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro2.HorasProgramadas.ToString());
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:right'>");
                                                sb.Append(registro2.ValorContrato.ToString("#,##0.00", us));
                                                vc += registro2.ValorContrato;
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:right'>");
                                                sb.Append(registro2.Importe.ToString("#,##0.00", us));
                                                imp += registro2.Importe;
                                                sb.Append("</td>");

                                                sb.Append("<td style='text-align:right'>");
                                                sb.Append(registro2.Bonificacion.ToString("#,##0.00", us));
                                                bon += registro2.Bonificacion;
                                                sb.Append("</td>");

                                                sb.Append("<td style='text-align:right;font-weight:bold'>");
                                                sb.Append(registro2.Total.ToString("#,##0.00", us));
                                                total += registro2.Total;
                                                sb.Append("</td>");

                                                sb.Append("<td style='text-align:center'>");
                                                sb.Append(registro2.Dia);
                                                sb.Append("</td>");

                                                sb.Append("<td style='text-align:center'>");
                                                sb.Append(registro2.IndicadorFeriado ? "Sí" : "No");
                                                sb.Append("</td>");

                                                sb.Append("<td style='text-align:center'>");
                                                sb.Append(registro2.Especialidad);
                                                sb.Append("</td>");

                                                sb.Append("<td style='text-align:center'>");
                                                sb.Append(registro2.TipoAtencion);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro2.DocumentoEmitido);
                                                sb.Append("</td>");
                                                sb.Append("</tr>");
                                            }
                                            sb.Append("<tr><td colspan='6' style='text-align:right;font-wight:bold'>TOTAL GENERAL</td>");
                                            sb.Append("<td style='text-align:right;'>" + imp.ToString("#,##0.00", us) + "</td>");
                                            sb.Append("<td style='text-align:right;'>" + bon.ToString("#,##0.00", us) + "</td>");
                                            sb.Append("<td style='text-align:right;font-wight:bold'>" + total.ToString("#,##0.00", us) + "</td>");
                                            sb.Append("<td colspan='5'></td></tr>");

                                            if (obeArchivoDigitalMedicoListas.listaProcesoMedico2.Count == 0)
                                            {
                                                string[] valorTotal;
                                                decimal mxTotal = 0;
                                                decimal TotalFinal = 0;
                                                int NX = 0;
                                                for (int z = 0; z < 3; z++)
                                                {
                                                    switch (z)
                                                    {
                                                        case 0:
                                                            NX = obeArchivoDigitalMedicoListas.ListaProcesoOrden.Count;
                                                            for (int ax = 0; ax < NX; ax++)
                                                            {
                                                                beProcesoOrdenAtencionCSFRPdf RegistroContemplar;
                                                                RegistroContemplar = obeArchivoDigitalMedicoListas.ListaProcesoOrden[ax];
                                                                mxTotal += RegistroContemplar.Total;
                                                            }
                                                            break;
                                                        case 1:
                                                            NX = obeArchivoDigitalMedicoListas.listaProcesoMedico.Count;
                                                            for (int bx = 0; bx < NX; bx++)
                                                            {
                                                                beProcesoMedicoHorarioPdf2 RegistroContemplar2;
                                                                RegistroContemplar2 = obeArchivoDigitalMedicoListas.listaProcesoMedico[bx];
                                                                mxTotal += RegistroContemplar2.Total;
                                                            }
                                                            break;
                                                        case 2:
                                                            NX = obeArchivoDigitalMedicoListas.listaProcesoMedico2.Count;
                                                            for (int cx = 0; cx < NX; cx++)
                                                            {
                                                                beProcesoMedicoHorarioPdf3 RegistroContemplar3;
                                                                RegistroContemplar3 = obeArchivoDigitalMedicoListas.listaProcesoMedico2[cx];
                                                                mxTotal += RegistroContemplar3.Importe;
                                                            }
                                                            break;
                                                    }
                                                }

                                                var descuento = mxTotal * (obeArchivoDigitalMedicoListas.ListaMedicos[0].FactorPorcentaje / 100);
                                                if (obeArchivoDigitalMedicoListas.ListaMedicos[0].TipoImpuestoId == "I")
                                                {
                                                    TotalFinal = mxTotal + descuento;
                                                }
                                                else
                                                {
                                                    TotalFinal = mxTotal - descuento;
                                                    descuento = descuento * -1;
                                                }

                                                switch (crearQuiebre)
                                                {
                                                    case "A":
                                                    case "B":
                                                        DatoQuiebre += "</tr><tr rowspan='10'><td colspan='14'>";
                                                        break;
                                                    case "C":
                                                        DatoQuiebre += "</tr></tbody><tfoot><tr rowspan='10'><td colspan='9'>";
                                                        break;
                                                }
                                                DatoQuiebre += "<br/><br/><p style='font-weight: bold;margin:0px'>Estimado Dr(a): ";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.Facturar;
                                                DatoQuiebre += "</p><p style='margin:0px'>Le agredecemos emitir sus comprobantes de pago por los servicios médicos</p><p style='margin:0px'>tomar en cuenta la siguiente información:</p><table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'><tr><td style='width:100px'>Girar a</td><td>";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Compania;
                                                DatoQuiebre += "</td></tr><tr><td style='width:100px'>RUC</td><td>";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.RUC;
                                                DatoQuiebre += "</td></tr><tr><td style='width:100px'>Sucursal</td><td>";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Sucursal;
                                                DatoQuiebre += "</td></tr><tr><td style='width:100px'>Dirección</td><td>";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Direccion;
                                                DatoQuiebre += "</td></tr></table>";
                                                DatoQuiebre += "<p style='margin:0px'>";
                                                DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Descripcion;

                                                DatoQuiebre += "</p>";

                                                ///////////////////////
                                                DatoQuiebre += "<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td style='width:40%'>";
                                                DatoQuiebre += "<table style='width:100%;border-collapse:collapse;font-family:Calibri;font-size:12px'>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td style='width:50%'></td>";
                                                DatoQuiebre += "<td style='width:25%'>Valor venta</td>";
                                                DatoQuiebre += "<td style='text-align:right;width:25%'>" + mxTotal.ToString("#,##0.00", us) + "</td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "</tr>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td style='width:50%'>Tipo Admisión: " + obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.TipoAdmision + "</td>";
                                                DatoQuiebre += "<td style='width:25%;border-bottom:2px solid black'>IGV/Renta</td>";
                                                DatoQuiebre += "<td style='text-align:right;width:25%;border-bottom:2px solid black'>" + descuento.ToString("#,##0.00", us) + "</td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "</tr>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td style='width:50%'></td>";
                                                DatoQuiebre += "<td style='width:25%'>Total</td>";
                                                DatoQuiebre += "<td style='text-align:right;width:25%'>" + TotalFinal.ToString("#,##0.00", us) + "</td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "<td></td>";
                                                DatoQuiebre += "</tr>";


                                                if (obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count > 0 && obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos != null)
                                                {
                                                    int nregDescuento = (obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count + 1) - 3;
                                                    for (int k = 0; k < nregDescuento; k++)
                                                    {
                                                        DatoQuiebre += "<tr>";
                                                        DatoQuiebre += "<td colspan='5' style='opacity:0'>-</td>";
                                                        DatoQuiebre += "</tr>";
                                                    }
                                                }

                                                DatoQuiebre += "</table>";
                                                DatoQuiebre += "</td>";
                                                DatoQuiebre += "<td style='width:20%'></td>";
                                                DatoQuiebre += "<td style='width:25%'>";

                                                if (obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count > 0 && obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos != null)
                                                {
                                                    DatoQuiebre += "<table style='width:100%;border-collapse:collapse;font-family:Calibri;font-size:12px'>";
                                                    DatoQuiebre += "<tr>";
                                                    DatoQuiebre += "<td colspan='2' style='font-weight:bold'>Descuentos aplicados</td>";
                                                    DatoQuiebre += "</tr>";
                                                    int nregDescuento = obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count;
                                                    decimal sumDescuentos = 0;
                                                    for (int j = 0; j < nregDescuento; j++)
                                                    {
                                                        regDescuento = obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos[j];
                                                        if (j == (nregDescuento - 1))
                                                        {
                                                            DatoQuiebre += "<tr>";
                                                            DatoQuiebre += "<td style='width:70%;border-bottom:2px solid'>" + regDescuento.Descripcion.ToString() + "</td>";
                                                            DatoQuiebre += "<td style='width:30%;text-align:right;border-bottom:2px solid'>" + regDescuento.Descuento.ToString("#,##0.00", us) + "</td>";
                                                            DatoQuiebre += "</tr>";
                                                        }
                                                        else
                                                        {
                                                            DatoQuiebre += "<tr>";
                                                            DatoQuiebre += "<td style='width:70%'>" + regDescuento.Descripcion.ToString() + "</td>";
                                                            DatoQuiebre += "<td style='width:30%;text-align:right'>" + regDescuento.Descuento.ToString("#,##0.00", us) + "</td>";
                                                            DatoQuiebre += "</tr>";
                                                        }
                                                        sumDescuentos += regDescuento.Descuento;
                                                    }
                                                    DatoQuiebre += "<tr>";
                                                    DatoQuiebre += "<td style='width:70%'>Total:</td>";
                                                    DatoQuiebre += "<td style='width:30%;text-align:right'>" + sumDescuentos.ToString("#,##0.00", us) + "</td>";
                                                    DatoQuiebre += "</tr>";

                                                    int c = nregDescuento + 2;
                                                    if (c == 3)
                                                    {
                                                        DatoQuiebre += "<tr>";
                                                        DatoQuiebre += "<td colspan='5' style='opacity:0'>-</td>";
                                                        DatoQuiebre += "</tr>";
                                                        DatoQuiebre += "<tr>";
                                                        DatoQuiebre += "<td colspan='5' style='opacity:0'>-</td>";
                                                        DatoQuiebre += "</tr>";
                                                    }

                                                    DatoQuiebre += "</table>";
                                                }

                                                DatoQuiebre += "</td>";
                                                DatoQuiebre += "<td style='width:15%'></td>";
                                                DatoQuiebre += "</tr>";
                                                DatoQuiebre += "</table>";

                                                DatoQuiebre += "<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td style='width:40%'>";
                                                DatoQuiebre += "<table style='width:100%;border-collapse:collapse;font-family:Calibri;font-size:12px'>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td>" + NumeroALetra(Math.Abs(TotalFinal).ToString()) + "SOLES";
                                                DatoQuiebre += "</td>";
                                                DatoQuiebre += "</tr>";
                                                DatoQuiebre += "</table>";
                                                DatoQuiebre += "</td>";
                                                DatoQuiebre += "<td style='width:20%'></td>";
                                                DatoQuiebre += "<td style='width:25%'></td>";
                                                DatoQuiebre += "<td style='width:15%'></td>";
                                                DatoQuiebre += "</tr>";
                                                DatoQuiebre += "</table>";
                                                ///////////////////////////////////////////


                                                //DatoQuiebre += "</p><table style='width:700px;border-collapse: collapse;font-family:Calibri;font-size:12px'><tr><td style='width:200px'></td><td style='width:100px'>Valor venta</td><td style='text-align:right;width:100px'>";
                                                //DatoQuiebre += mxTotal.ToString("#,##0.00", us);
                                                //DatoQuiebre += "</td><td></td><td></td></tr><tr><td style='width:200px'>Tipo Admisión: ";
                                                //DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.TipoAdmision;
                                                //DatoQuiebre += "</td><td style='width:100px;border-bottom:2px solid black'>IGV/Renta</td><td style='text-align:right;width:100px;border-bottom:2px solid black'>";
                                                //DatoQuiebre += descuento.ToString("#,##0.00", us);
                                                //DatoQuiebre += "</td><td></td><td></td></tr><tr><td style='width:200px'></td><td style='width:100px'>Total</td><td style='text-align:right;width:100px'>";
                                                //DatoQuiebre += TotalFinal.ToString("#,##0.00", us);
                                                //DatoQuiebre += "</td><td></td><td></td></tr><tr><td colspan='5'>Son: ";
                                                //DatoQuiebre += NumeroALetra(Math.Abs(TotalFinal).ToString()) + " SOLES";
                                                //DatoQuiebre += "</td></tr></table>";



                                                DatoQuiebre += "</td></tr></tbody></table>";
                                                DatoQuiebre += "</body></html>";
                                                sb.Append(DatoQuiebre);
                                            }
                                            else
                                            {
                                                sb.Append("</tr></tbody></table>");
                                            }
                                        }
                                        break;
                                    case 2:
                                        cabecerasTitulos = new string[] { "PersonaId", "Descripción", "Importe", "Concepto Id", "Concepto", "Indicador Administrativo", "Periodo", "Total General", "Documento Emitido" };
                                        nRegistrosLista = obeArchivoDigitalMedicoListas.listaProcesoMedico2.Count;
                                        beProcesoMedicoHorarioPdf3 registro3;
                                        decimal TotGen = 0;
                                        if (nRegistrosLista > 0)
                                        {
                                            crearQuiebre = "C";
                                            sb.Append("<div style='page-break-after:always'></div>");
                                            sb.Append("<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'><thead style='display: table-header-group'>");
                                            sb.Append("<tr>");
                                            sb.Append("<tr>");
                                            for (int j = 0; j < cabecerasTitulos.Length; j++)
                                            {
                                                sb.Append("<td style='font-weight:bold'>");
                                                sb.Append(cabecerasTitulos[j]);
                                                sb.Append("</td>");
                                            }
                                            sb.Append("</tr></thead><tbody style 'width:100%;font-family:Calibri;font-size:6px !important'>");
                                            for (int k = 0; k < nRegistrosLista; k++)
                                            {
                                                registro3 = obeArchivoDigitalMedicoListas.listaProcesoMedico2[k];
                                                sb.Append("<tr>");
                                                sb.Append("<td>");
                                                sb.Append(registro3.PersonaId);
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:left'>");
                                                sb.Append(registro3.Descripcion);
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro3.Importe);
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:left'>");
                                                sb.Append(registro3.ConceptoMontoFijoId);
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:left'>");
                                                sb.Append(registro3.ConceptoMontoFijo);
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:center'>");
                                                sb.Append((registro3.IndicadorAdministrativo ? "Sí" : "No"));
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                switch (registro3.Periodo)
                                                {
                                                    case "D":
                                                        sb.Append("DIARIO");
                                                        break;
                                                    case "M":
                                                        sb.Append("MENSUAL");
                                                        break;
                                                    case "Q":
                                                        sb.Append("QUINCENAL");
                                                        break;
                                                    default:
                                                        sb.Append("OTRO");
                                                        break;
                                                }
                                                sb.Append("</td>");
                                                sb.Append("<td style='text-align:right;font-weight:bold'>");
                                                sb.Append(registro3.TotalGeneral.ToString("#,##0.00", us));
                                                TotGen += registro3.TotalGeneral;
                                                sb.Append("</td>");
                                                sb.Append("<td>");
                                                sb.Append(registro3.DocumentoEmitido);
                                                sb.Append("</td>");
                                                sb.Append("</tr>");
                                            }
                                            sb.Append("<tr><td colspan='7' style='text-align:right;font-weight:bold'>TOTAL GENERAL</td>");
                                            sb.Append("<td style='text-align:right;font-weight:bold'>" + TotGen.ToString("#,##0.00", us) + "</td>");
                                            sb.Append("<td></td></tr>");
                                            string[] valorTotal;
                                            decimal mxTotal = 0;
                                            decimal TotalFinal = 0;
                                            int NX = 0;
                                            for (int z = 0; z < 3; z++)
                                            {
                                                switch (z)
                                                {
                                                    case 0:
                                                        NX = obeArchivoDigitalMedicoListas.ListaProcesoOrden.Count;
                                                        for (int ax = 0; ax < NX; ax++)
                                                        {
                                                            beProcesoOrdenAtencionCSFRPdf RegistroContemplar;
                                                            RegistroContemplar = obeArchivoDigitalMedicoListas.ListaProcesoOrden[ax];
                                                            mxTotal += RegistroContemplar.Total;
                                                        }
                                                        break;
                                                    case 1:
                                                        NX = obeArchivoDigitalMedicoListas.listaProcesoMedico.Count;
                                                        for (int bx = 0; bx < NX; bx++)
                                                        {
                                                            beProcesoMedicoHorarioPdf2 RegistroContemplar2;
                                                            RegistroContemplar2 = obeArchivoDigitalMedicoListas.listaProcesoMedico[bx];
                                                            mxTotal += RegistroContemplar2.Total;
                                                        }
                                                        break;
                                                    case 2:
                                                        NX = obeArchivoDigitalMedicoListas.listaProcesoMedico2.Count;
                                                        for (int cx = 0; cx < NX; cx++)
                                                        {
                                                            beProcesoMedicoHorarioPdf3 RegistroContemplar3;
                                                            RegistroContemplar3 = obeArchivoDigitalMedicoListas.listaProcesoMedico2[cx];
                                                            mxTotal += RegistroContemplar3.Importe;
                                                        }
                                                        break;
                                                }

                                            }

                                            var descuento = mxTotal * (obeArchivoDigitalMedicoListas.ListaMedicos[0].FactorPorcentaje / 100);
                                            if (obeArchivoDigitalMedicoListas.ListaMedicos[0].TipoImpuestoId == "I")
                                            {
                                                TotalFinal = mxTotal + descuento;
                                            }
                                            else
                                            {
                                                TotalFinal = mxTotal - descuento;
                                                descuento = descuento * -1;
                                            }

                                            switch (crearQuiebre)
                                            {
                                                case "A":
                                                case "B":
                                                    DatoQuiebre += "</tr><tr rowspan='10'><td colspan='14'>";
                                                    break;
                                                case "C":
                                                    DatoQuiebre += "</tr></tbody><tfoot><tr rowspan='10'><td colspan='9'>";
                                                    break;
                                            }
                                            DatoQuiebre += "<br/><br/><p style='font-weight: bold;margin:0px'>Estimado Dr(a): ";
                                            DatoQuiebre += obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.Facturar;
                                            DatoQuiebre += "</p><p style='margin:0px'>Le agredecemos emitir sus comprobantes de pago por los servicios médicos</p><p style='margin:0px'>tomar en cuenta la siguiente información:</p><table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'><tr><td style='width:100px'>Girar a</td><td>";
                                            DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Compania;
                                            DatoQuiebre += "</td></tr><tr><td style='width:100px'>RUC</td><td>";
                                            DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.RUC;
                                            DatoQuiebre += "</td></tr><tr><td style='width:100px'>Sucursal</td><td>";
                                            DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Sucursal;
                                            DatoQuiebre += "</td></tr><tr><td style='width:100px'>Dirección</td><td>";
                                            DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.Direccion;
                                            DatoQuiebre += "</td></tr></table>";
                                            DatoQuiebre += "<p style='margin:0px'>";
                                            DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Descripcion;

                                            ///////////////////////
                                            DatoQuiebre += "<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'>";
                                            DatoQuiebre += "<tr>";
                                            DatoQuiebre += "<td style='width:40%'>";
                                            DatoQuiebre += "<table style='width:100%;border-collapse:collapse;font-family:Calibri;font-size:12px'>";
                                            DatoQuiebre += "<tr>";
                                            DatoQuiebre += "<td style='width:50%'></td>";
                                            DatoQuiebre += "<td style='width:25%'>Valor venta</td>";
                                            DatoQuiebre += "<td style='text-align:right;width:25%'>" + mxTotal.ToString("#,##0.00", us) + "</td>";
                                            DatoQuiebre += "<td></td>";
                                            DatoQuiebre += "<td></td>";
                                            DatoQuiebre += "</tr>";
                                            DatoQuiebre += "<tr>";
                                            DatoQuiebre += "<td style='width:50%'>Tipo Admisión: " + obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.TipoAdmision + "</td>";
                                            DatoQuiebre += "<td style='width:25%;border-bottom:2px solid black'>IGV/Renta</td>";
                                            DatoQuiebre += "<td style='text-align:right;width:25%;border-bottom:2px solid black'>" + descuento.ToString("#,##0.00", us) + "</td>";
                                            DatoQuiebre += "<td></td>";
                                            DatoQuiebre += "<td></td>";
                                            DatoQuiebre += "</tr>";
                                            DatoQuiebre += "<tr>";
                                            DatoQuiebre += "<td style='width:50%'></td>";
                                            DatoQuiebre += "<td style='width:25%'>Total</td>";
                                            DatoQuiebre += "<td style='text-align:right;width:25%'>" + TotalFinal.ToString("#,##0.00", us) + "</td>";
                                            DatoQuiebre += "<td></td>";
                                            DatoQuiebre += "<td></td>";
                                            DatoQuiebre += "</tr>";


                                            if (obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count > 0 && obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos != null)
                                            {
                                                int nregDescuento = (obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count + 1) - 3;
                                                for (int k = 0; k < nregDescuento; k++)
                                                {
                                                    DatoQuiebre += "<tr>";
                                                    DatoQuiebre += "<td colspan='5' style='opacity:0'>-</td>";
                                                    DatoQuiebre += "</tr>";
                                                }
                                            }

                                            DatoQuiebre += "</table>";
                                            DatoQuiebre += "</td>";
                                            DatoQuiebre += "<td style='width:20%'></td>";
                                            DatoQuiebre += "<td style='width:25%'>";

                                            if (obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count > 0 && obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos != null)
                                            {
                                                DatoQuiebre += "<table style='width:100%;border-collapse:collapse;font-family:Calibri;font-size:12px'>";
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td colspan='2' style='font-weight:bold'>Descuentos aplicados</td>";
                                                DatoQuiebre += "</tr>";
                                                int nregDescuento = obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos.Count;
                                                decimal sumDescuentos = 0;
                                                for (int j = 0; j < nregDescuento; j++)
                                                {
                                                    regDescuento = obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos[j];
                                                    if (j == (nregDescuento - 1))
                                                    {
                                                        DatoQuiebre += "<tr>";
                                                        DatoQuiebre += "<td style='width:70%;border-bottom:2px solid'>" + regDescuento.Descripcion.ToString() + "</td>";
                                                        DatoQuiebre += "<td style='width:30%;text-align:right;border-bottom:2px solid'>" + regDescuento.Descuento.ToString("#,##0.00", us) + "</td>";
                                                        DatoQuiebre += "</tr>";
                                                    }
                                                    else
                                                    {
                                                        DatoQuiebre += "<tr>";
                                                        DatoQuiebre += "<td style='width:70%'>" + regDescuento.Descripcion.ToString() + "</td>";
                                                        DatoQuiebre += "<td style='width:30%;text-align:right'>" + regDescuento.Descuento.ToString("#,##0.00", us) + "</td>";
                                                        DatoQuiebre += "</tr>";
                                                    }
                                                    sumDescuentos += regDescuento.Descuento;
                                                }
                                                DatoQuiebre += "<tr>";
                                                DatoQuiebre += "<td style='width:70%'>Total:</td>";
                                                DatoQuiebre += "<td style='width:30%;text-align:right'>" + sumDescuentos.ToString("#,##0.00", us) + "</td>";
                                                DatoQuiebre += "</tr>";

                                                int c = nregDescuento + 2;
                                                if (c == 3)
                                                {
                                                    DatoQuiebre += "<tr>";
                                                    DatoQuiebre += "<td colspan='5' style='opacity:0'>-</td>";
                                                    DatoQuiebre += "</tr>";
                                                    DatoQuiebre += "<tr>";
                                                    DatoQuiebre += "<td colspan='5' style='opacity:0'>-</td>";
                                                    DatoQuiebre += "</tr>";
                                                }

                                                DatoQuiebre += "</table>";
                                            }

                                            DatoQuiebre += "</td>";
                                            DatoQuiebre += "<td style='width:15%'></td>";
                                            DatoQuiebre += "</tr>";
                                            DatoQuiebre += "</table>";

                                            DatoQuiebre += "<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'>";
                                            DatoQuiebre += "<tr>";
                                            DatoQuiebre += "<td style='width:40%'>";
                                            DatoQuiebre += "<table style='width:100%;border-collapse:collapse;font-family:Calibri;font-size:12px'>";
                                            DatoQuiebre += "<tr>";
                                            DatoQuiebre += "<td>" + NumeroALetra(Math.Abs(TotalFinal).ToString()) + "SOLES";
                                            DatoQuiebre += "</td>";
                                            DatoQuiebre += "</tr>";
                                            DatoQuiebre += "</table>";
                                            DatoQuiebre += "</td>";
                                            DatoQuiebre += "<td style='width:20%'></td>";
                                            DatoQuiebre += "<td style='width:25%'></td>";
                                            DatoQuiebre += "<td style='width:15%'></td>";
                                            DatoQuiebre += "</tr>";
                                            DatoQuiebre += "</table>";
                                            ///////////////////////////////////////////

                                            //DatoQuiebre += "</p><table style='width:700px;border-collapse: collapse;font-family:Calibri;font-size:12px'><tr><td style='width:200px'></td><td style='width:100px'>Valor venta</td><td style='text-align:right;width:100px'>";
                                            //DatoQuiebre += mxTotal.ToString("#,##0.00", us);
                                            //DatoQuiebre += "</td><td></td><td></td></tr><tr><td style='width:200px'>Tipo Admisión: ";
                                            //DatoQuiebre += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.TipoAdmision;
                                            //DatoQuiebre += "</td><td style='width:100px;border-bottom:2px solid black'>IGV/Renta</td><td style='text-align:right;width:100px;border-bottom:2px solid black'>";
                                            //DatoQuiebre += descuento.ToString("#,##0.00", us);
                                            //DatoQuiebre += "</td><td></td><td></td></tr><tr><td style='width:200px'></td><td style='width:100px'>Total</td><td style='text-align:right;width:100px'>";
                                            //DatoQuiebre += TotalFinal.ToString("#,##0.00", us);
                                            //DatoQuiebre += "</td><td></td><td></td></tr><tr><td colspan='5'>Son: ";
                                            //DatoQuiebre += NumeroALetra(Math.Abs(TotalFinal).ToString()) + " SOLES";
                                            //DatoQuiebre += "</td></tr></table>";


                                            DatoQuiebre += "</td></tr></tbody></table>";
                                            DatoQuiebre += "</body></html>";
                                            sb.Append(DatoQuiebre);
                                        }
                                        break;
                                    case 3:
                                        nRegistrosLista = obeArchivoDigitalMedicoListas.listaPlanillaMedicoConsolidado.Count;
                                        if (nRegistrosLista > 0)
                                        {
                                            sb.Append("<div style='page-break-after:always'></div>");
                                            sb.Append("<br/>");
                                            sb.Append("<table style='width:100%'>");
                                            sb.Append("<tr>");
                                            sb.Append("<td style='width:65%'>");
                                            ///
                                            sb.Append(crearConsolidado(obeArchivoDigitalMedicoListas.listaPlanillaMedicoConsolidado, obeArchivoDigitalMedicoListas.listaPlanillaMedicoConsolidadoResumen));
                                            ///
                                            sb.Append("</td>");
                                            sb.Append("<td style='width:10%;padding-right:5px' valign='top' align='center'>");
                                            sb.Append("</td>");
                                            sb.Append("<td style='width:25%;padding-right:5px' valign='top' align='center'>");
                                            ///
                                            sb.Append(crearConsolidadoResumen(obeArchivoDigitalMedicoListas.listaPlanillaMedicoConsolidadoResumenTipo, obeArchivoDigitalMedicoListas.listaPlanillaMedicoConsolidadoResumenTipoResumen));
                                            ///
                                            sb.Append("</td>");
                                            sb.Append("<tr>");
                                            sb.Append("</table>");

                                            sb.Append("<br/>");
                                            sb.Append("<table style='width:100%'>");
                                            sb.Append("<tr>");
                                            sb.Append("<td style='width:20%' align='center'>");
                                            sb.Append(crearResumen(obeArchivoDigitalMedicoListas.ListaResumenServicios));
                                            sb.Append("</td>");
                                            sb.Append("<td style='width:20%' align='center'>");
                                            sb.Append(crearResumen(obeArchivoDigitalMedicoListas.ListaResumenEquipos));
                                            sb.Append("</td>");
                                            sb.Append("<td style='width:20%' valign='top' align='center'>");
                                            sb.Append(crearResumen(obeArchivoDigitalMedicoListas.ListaResumenClinica));
                                            sb.Append("</td>");
                                            sb.Append("<td style='width:20%' valign='top' align='center'>");
                                            sb.Append(crearResumen(obeArchivoDigitalMedicoListas.ListaResumenMedico));
                                            sb.Append("</td>");
                                            sb.Append("<td style='width:20%' valign='top' align='center'>");
                                            sb.Append(crearResumen(obeArchivoDigitalMedicoListas.ListaResumenDetraccion));
                                            sb.Append("</td>");
                                            sb.Append("<tr>");
                                            sb.Append("</table>");
                                        }
                                        break;

                                }
                            }

                            var htmlToPdf = new NReco.PdfGenerator.HtmlToPdfConverter();
                            htmlToPdf.Size = NReco.PdfGenerator.PageSize.A4;
                            htmlToPdf.Margins = new NReco.PdfGenerator.PageMargins { Top = 14, Bottom = 6, Left = 5, Right = 5 };
                            htmlToPdf.Orientation = NReco.PdfGenerator.PageOrientation.Landscape;
                            htmlToPdf.Zoom = 0.7F;
                            htmlToPdf.CustomWkHtmlPageArgs = "--footer-right [page]/[topage] --footer-font-size 8";
                            //htmlToPdf.PageHeaderHtml = "<div style='font-family:Calibri;text-align:center;height:60px'><div style='display:inline-block'>LIQUIDACIÓN-SERVICIOS MÉDICOS<br/>Periodo Planilla: " + obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Anio + "-" + (int.Parse(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Mes) >= 10 ? obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Mes : "0" + obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Mes) + "<br/>" + obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.PeriodoProvision + "</div><div style='width:150px;text-align:left;display:inline-block;float:right'><table style='border-collapse: collapse;width:150px;font-family:Calibri;'><tr><td>Página</td><td><span class='page'></span></td><td>de <span class='topage'></span></td></tr><tr><td>Fecha</td><td colspan='2'>" + DateTime.Now.ToShortDateString() + "</td></tr><tr><td>Hora</td><td colspan='2'>" + DateTime.Now.ToShortTimeString() + "</td></tr></table></div></div>";
                            string pageHeader = obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.NumeroDocumento + "¦";
                            pageHeader += "PAGO A MÉDICOS¦";
                            pageHeader += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.FechaInicio.ToShortDateString() + "¦";
                            pageHeader += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.FechaFin.ToShortDateString() + "¦";
                            pageHeader += obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.Facturar + "¦";
                            pageHeader += obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.TipoAdmision + "¦";
                            pageHeader += planillaId;
                            htmlToPdf.PageHeaderHtml = crearPageHeader(pageHeader);

                            byte[] PDFbuffer = htmlToPdf.GeneratePdf(sb.ToString());
                            string pdfstring = Convert.ToBase64String(PDFbuffer);
                            string carpeta = rutaPdf + "\\" + obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal.SucursalId;
                            if (!Directory.Exists(carpeta))
                            {
                                Directory.CreateDirectory(carpeta);
                            }
                            string carpetaPeriodo = carpeta + "\\" + obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Anio + (int.Parse(obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Mes) >= 10 ? obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Mes : "0" + obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.Mes);
                            if (!Directory.Exists(carpetaPeriodo))
                            {
                                Directory.CreateDirectory(carpetaPeriodo);
                            }
                            string carpetaTipoAdmision = carpetaPeriodo + "\\" + obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf.TipoAdmision;
                            if (!Directory.Exists(carpetaTipoAdmision))
                            {
                                Directory.CreateDirectory(carpetaTipoAdmision);
                            }
                            string ruta = carpetaTipoAdmision + "\\" + obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar.NombrePDF;
                            if (File.Exists(ruta))
                            {
                                File.Delete(ruta);
                            }
                            using (FileStream fs = File.Create(ruta))
                            {
                                Byte[] info = Convert.FromBase64String(pdfstring);
                                // Add some information to the file.
                                fs.Write(info, 0, info.Length);
                            }
                            DatoQuiebre = "";
                            rpta = "1";
                        }
                        //}
                    }
                    catch (SqlException ex)
                    {
                        foreach (SqlError err in ex.Errors)
                        {
                            ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
                        }
                    }
                    catch (Exception ex)
                    {
                        ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
                    }
                }
            });
            //rpta = "";
            return rpta;
        }
        private string crearHeader(string[] lstInformacion)
        {
            string SucursalId = lstInformacion[0];
            string Sucursal = lstInformacion[1];
            string Compania = lstInformacion[2];
            string Direccion = lstInformacion[3];
            string Telefono = lstInformacion[4];
            string Fax = lstInformacion[5];
            string URL = lstInformacion[6];
            string RUC = lstInformacion[7];

            string Descripcion = lstInformacion[8];
            string TipoAdmisionId = lstInformacion[9];
            string Anio = lstInformacion[10];
            string Mes = lstInformacion[11];
            string TipoAdmision = lstInformacion[12];
            string FechaInicio = lstInformacion[13];
            string FechaFin = lstInformacion[14];

            string ProcesoId = lstInformacion[15];
            string Facturar = lstInformacion[16];
            string NumeroDocumento = lstInformacion[17];
            string CodigoUsuario = lstInformacion[18];
            string FechaHoraCierre = lstInformacion[19];
            string NombrePDF = lstInformacion[20];
            string PeriodoProvision = lstInformacion[21];

            StringBuilder sb = new StringBuilder();
            sb.Append("<tr><td colspan='2' style='font-weight:bold'>Compañia:</td><td colspan='13' style='text-align:left'>");
            sb.Append(Compania);
            sb.Append("</td></tr>");
            sb.Append("<tr><td colspan='2' style='font-weight:bold;'>Sucursal: </td><td colspan='9' style='text-align:left'>");
            sb.Append(Sucursal);
            sb.Append("</td><td colspan='2' style='font-weight:bold'>Condición de Pago</td><td colspan='2'>");
            sb.Append("PRODUCCIÓN");
            sb.Append("</td></tr>");
            sb.Append("<tr><td colspan='15' style='font-weight:bold;'>");
            sb.Append(Direccion);
            sb.Append("</td></tr>");
            sb.Append("<tr><td colspan='2' style='font-weight:bold;'>Teléfono</td><td colspan='2'>");
            sb.Append(Telefono);
            sb.Append("</td><td style='font-weight:bold;'>Fax</td><td style='text-align:left'>");
            sb.Append(Fax);
            sb.Append("</td><td colspan='11'></td></tr>");
            sb.Append("<tr><td colspan='15' style='font-weight:bold;border-bottom:1px solid black'>");
            sb.Append(URL);
            sb.Append("</td></tr>");
            sb.Append("<tr><td colspan='2' style='font-weight:bold'>N° Liquidacíon: </td><td style='text-align:left' colspan='9'>");
            sb.Append(ProcesoId);
            sb.Append("</td><td colspan='2'>Fecha Cierre</td><td colspan='2'>");
            sb.Append(FechaHoraCierre.IndexOf("1900") > -1 ? "" : FechaHoraCierre);
            sb.Append("</td></tr>");
            sb.Append("<tr><td colspan='2' style='font-weight:bold'>Factura a: </td><td style='text-align:left' colspan='9'>");
            sb.Append(Facturar);
            sb.Append("</td><td colspan='2'>Hora</td><td colspan='2'>");
            sb.Append(FechaHoraCierre.IndexOf("1900") > -1 ? "" : FechaHoraCierre);
            sb.Append("</td></tr>");
            sb.Append("<tr><td colspan='2' style='font-weight:bold'>RUC: </td><td style='text-align:left' colspan='9'>");
            sb.Append(NumeroDocumento);
            sb.Append("</td><td colspan='2'>Usuario</td><td colspan='2'>");
            sb.Append("</td></tr>");
            return sb.ToString();
        }
        private string crearInformacion(string[] lstInformacion, decimal mxTotal, decimal descuento, decimal TotalFinal)
        {
            string SucursalId = lstInformacion[0];
            string Sucursal = lstInformacion[1];
            string Compania = lstInformacion[2];
            string Direccion = lstInformacion[3];
            string Telefono = lstInformacion[4];
            string Fax = lstInformacion[5];
            string URL = lstInformacion[6];
            string RUC = lstInformacion[7];

            string Descripcion = lstInformacion[8];
            string TipoAdmisionId = lstInformacion[9];
            string Anio = lstInformacion[10];
            string Mes = lstInformacion[11];
            string TipoAdmision = lstInformacion[12];
            string FechaInicio = lstInformacion[13];
            string FechaFin = lstInformacion[14];

            string ProcesoId = lstInformacion[15];
            string Facturar = lstInformacion[16];
            string NumeroDocumento = lstInformacion[17];
            string CodigoUsuario = lstInformacion[18];
            string FechaHoraCierre = lstInformacion[19];
            string NombrePDF = lstInformacion[20];
            string PeriodoProvision = lstInformacion[21];

            CultureInfo us = new CultureInfo("en-US");
            StringBuilder sb = new StringBuilder();
            string DatoQuiebre = "";
            DatoQuiebre += "<br/><br/><p style='font-weight: bold;margin:0px'>Estimado Dr(a): ";
            DatoQuiebre += Facturar;
            DatoQuiebre += "</p><p style='margin:0px'>Le agredecemos emitir sus comprobantes de pago por los servicios médicos</p><p style='margin:0px'>tomar en cuenta la siguiente información:</p><table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'><tr><td style='width:100px'>Girar a</td><td>";
            DatoQuiebre += Compania;
            DatoQuiebre += "</td></tr><tr><td style='width:100px'>RUC</td><td>";
            DatoQuiebre += RUC;
            DatoQuiebre += "</td></tr><tr><td style='width:100px'>Sucursal</td><td>";
            DatoQuiebre += Sucursal;
            DatoQuiebre += "</td></tr><tr><td style='width:100px'>Dirección</td><td>";
            DatoQuiebre += Direccion;
            DatoQuiebre += "</td></tr></table>";
            DatoQuiebre += "<p style='margin:0px'>";
            DatoQuiebre += Descripcion;
            DatoQuiebre += "</p>";

            DatoQuiebre += "<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'>";
            DatoQuiebre += "<tr>";
            DatoQuiebre += "<td style='width:40%'>";
            DatoQuiebre += "<table style='width:100%;border-collapse:collapse;font-family:Calibri;font-size:12px'>";
            DatoQuiebre += "<tr>";
            DatoQuiebre += "<td style='width:50%'></td>";
            DatoQuiebre += "<td style='width:25%'>Valor venta</td>";
            DatoQuiebre += "<td style='text-align:right;width:25%'>" + mxTotal.ToString("#,##0.00", us) + "</td>";
            DatoQuiebre += "<td></td>";
            DatoQuiebre += "<td></td>";
            DatoQuiebre += "</tr>";
            DatoQuiebre += "<tr>";
            DatoQuiebre += "<td style='width:50%'>Tipo Admisión: " + TipoAdmision + "</td>";
            DatoQuiebre += "<td style='width:25%;border-bottom:2px solid black'>IGV/Renta</td>";
            DatoQuiebre += "<td style='text-align:right;width:25%;border-bottom:2px solid black'>" + descuento.ToString("#,##0.00", us) + "</td>";
            DatoQuiebre += "<td></td>";
            DatoQuiebre += "<td></td>";
            DatoQuiebre += "</tr>";
            DatoQuiebre += "<tr>";
            DatoQuiebre += "<td style='width:50%'></td>";
            DatoQuiebre += "<td style='width:25%'>Total</td>";
            DatoQuiebre += "<td style='text-align:right;width:25%'>" + TotalFinal.ToString("#,##0.00", us) + "</td>";
            DatoQuiebre += "<td></td>";
            DatoQuiebre += "<td></td>";
            DatoQuiebre += "</tr>";
            return sb.ToString();
        }
        private string crearPageHeader(string lstPageHeader)
        {
            string[] pageHeader = string.IsNullOrEmpty(lstPageHeader) ? new string[] { } : lstPageHeader.Split('¦');
            string usuario = pageHeader[0]; // "123456";
            string titulo = pageHeader[1]; // "PAGO A MÉDICOS";
            string desde = pageHeader[2]; // "16/09/2024";
            string hasta = pageHeader[3]; // "22/09/2024";
            string medico = pageHeader[4]; // "LAZARTE PELAEZ";
            string tipoAtencion = pageHeader[5]; // "PARTICULAR";
            string planillaId = pageHeader[6]; // "1234";
            DateTime fechaHora = DateTime.Now;
            StringBuilder sb = new StringBuilder();
            sb.Append("<div style='font-family:Calibri;font-size:12px;padding-top:15px'>");
            sb.Append("<div><span>" + fechaHora.ToShortDateString() + "  " + fechaHora.ToString("HH:mm") + " Usuario: " + usuario + "</span></div>");
            sb.Append("<div style='text-align:center;font-size:14px;text-decoration:underline;font-weight:bold'>" + titulo + "</div>");
            sb.Append("<table style='width:100%;padding-top:5px;border-bottom: 3px double black;padding-bottom:5px'>");
            sb.Append("<tr>");
            sb.Append("<td><span><b>Desde: </b>" + desde + "</span></td>");
            sb.Append("<td><span><b>Hasta: </b>" + hasta + "</span></td>");
            sb.Append("<td style='text-align:right'><span>Página </span><span class='page'></span></td><td>de <span class='topage'></span></td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td><span><b>Médico: </b>" + medico + "</span></td>");
            sb.Append("<td><span><b>Tipo de Atención: </b>" + tipoAtencion + "</span></td>");
            sb.Append("<td><span><b>ID Planilla: </b>" + planillaId + "</span></td>");
            sb.Append("</tr>");
            sb.Append("</table>");

            sb.Append("</div>");

            return sb.ToString();
        }
        private string crearResumenAtenciones(List<beCampoCadena3> lstResumenAtenciones)
        {
            string header = "<tr><th style='width:150px;text-align:center'></th>";
            string body = "";
            string footer = "<tr><td style='font-weight:bold'>Total</td>";

            int nReg = lstResumenAtenciones.Count;
            string aux = "";
            decimal xTotal = 0;
            CultureInfo us = new CultureInfo("en-US");

            Dictionary<string, decimal> lstHeader = new Dictionary<string, decimal>();

            for (int i = 0; i < nReg; i++)
            {
                //string[] campos = lstResumenAtenciones[i].Split('¦');
                if (!lstHeader.ContainsKey(lstResumenAtenciones[i].Campo2))
                {
                    lstHeader.Add(lstResumenAtenciones[i].Campo2, decimal.Parse(lstResumenAtenciones[i].Campo3, us));
                    header += "<th style='width:100px;text-align:center'>" + lstResumenAtenciones[i].Campo2 + "</th>";
                }
                else
                {
                    decimal valor = lstHeader[lstResumenAtenciones[i].Campo2];
                    lstHeader[lstResumenAtenciones[i].Campo2] = valor + decimal.Parse(lstResumenAtenciones[i].Campo3, us);
                }
                if (lstResumenAtenciones[i].Campo1 != aux)
                {
                    body += ((i > 0) ? "<td style='text-align:right'>" + xTotal.ToString("#,##0.00", us) + "</td></tr>" : "");
                    body += "<tr><td style='font-weight:bold'>" + lstResumenAtenciones[i].Campo1 + "</td>";
                    xTotal = 0;
                }
                body += "<td style='text-align:right'>" + decimal.Parse(lstResumenAtenciones[i].Campo3, us).ToString("#,##0.00", us) + "</td>";
                xTotal = xTotal + decimal.Parse(lstResumenAtenciones[i].Campo3, us);
                body += ((i == (nReg - 1)) ? "<td style='text-align:right'>" + xTotal.ToString("#,##0.00", us) + "</td></tr>" : "");
                aux = lstResumenAtenciones[i].Campo1;
            }

            decimal xyTotal = 0;
            foreach (KeyValuePair<string, decimal> key in lstHeader)
            {
                xyTotal = xyTotal + key.Value;
                footer += "<td style='text-align:right'>" + key.Value.ToString("#,##0.00", us) + "</td>";
            }
            footer += "<td style='text-align:right'>" + xyTotal.ToString("#,##0.00", us) + "</td></tr>";
            header += "<th style='width:100px;text-align:center'>Total</th></tr>";

            string rpta = "<table style='font-family:Calibri;font-size:12px;padding-top:5px'>";
            rpta += header + body + footer;
            rpta += "</table>";

            return rpta;
        }
        private string crearResumen(List<beCampoCadenaCorto> lstResumen)
        {
            CultureInfo us = new CultureInfo("en-US");
            string rpta = "<table style='font-family:Calibri;font-size:12px;'>";
            int nReg = lstResumen.Count;

            for (int i = 0; i < nReg; i++)
            {
                string bold = ((i == nReg - 1) ? ";font-weight:bold" : "");
                if (i == 0)
                {
                    rpta += "<tr>";
                    rpta += "<td style='text-align:right;font-weight:bold' colspan=2>" + lstResumen[i].Campo1 + "</td>";
                    //rpta += "<td></td>";
                    rpta += "</tr>";
                }
                else
                {
                    rpta += "<tr>";
                    rpta += "<td style='text-align:right" + bold + "'>" + lstResumen[i].Campo1 + "</td>";
                    rpta += "<td style='width:80px;text-align:right" + bold + "'>" + decimal.Parse(lstResumen[i].Campo2, us).ToString("N2", us) + "</td>";
                    rpta += "</tr>";
                }
            }
            rpta += "</table>";
            return rpta;
        }
        private string crearConsolidado(List<bePlanillaMedicoConsolidado> lstConsolidado, List<bePlanillaMedicoConsolidadoResumen> lstConsolidadoResumen)
        {
            CultureInfo us = new CultureInfo("en-US");
            string[] cabecerasTitulos = new string[] { "# Planilla", "IdPlanilla", "Periodo", "F. Inicio", "F. Fin", "T. Admision", "T. Servicio", "M. Total", "M. Medico", "M. Clinica" };
            StringBuilder sb = new StringBuilder();
            sb.Append("<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'><thead style='display: table-header-group'>");
            sb.Append("<tr>");
            for (int j = 0; j < cabecerasTitulos.Length; j++)
            {
                sb.Append("<td style='text-align:left;font-weight:bold;border-bottom:2px solid'>");
                sb.Append(cabecerasTitulos[j]);
                sb.Append("</td>");
            }
            sb.Append("</tr></thead><tbody>");

            int nRegistrosLista = lstConsolidado.Count;
            bePlanillaMedicoConsolidado registroConsolidado;
            for (int k = 0; k < nRegistrosLista; k++)
            {
                registroConsolidado = lstConsolidado[k];
                sb.Append("<tr>");
                sb.Append("<td>");
                sb.Append((k + 1).ToString());
                sb.Append("</td>");
                sb.Append("<td>");
                sb.Append(registroConsolidado.IdPlanilla);
                sb.Append("</td>");
                sb.Append("<td>");
                sb.Append(registroConsolidado.Periodo);
                sb.Append("</td>");
                sb.Append("<td>");
                sb.Append(registroConsolidado.FechaInicio.ToShortDateString());
                sb.Append("</td>");
                sb.Append("<td>");
                sb.Append(registroConsolidado.FechaFin.ToShortDateString());
                sb.Append("</td>");
                sb.Append("<td>");
                sb.Append(registroConsolidado.TipoAdmision);
                sb.Append("</td>");
                sb.Append("<td>");
                sb.Append(registroConsolidado.TipoServicio);
                sb.Append("</td>");
                sb.Append("<td style='text-align:right'>");
                sb.Append(registroConsolidado.MontoTotal.ToString("#,##0.00", us));
                sb.Append("</td>");
                sb.Append("<td style='text-align:right'>");
                sb.Append(registroConsolidado.MontoMedico.ToString("#,##0.00", us));
                sb.Append("</td>");
                sb.Append("<td style='text-align:right'>");
                sb.Append(registroConsolidado.MontoClinica.ToString("#,##0.00", us));
                sb.Append("</td>");
                sb.Append("</tr>");
            }

            nRegistrosLista = lstConsolidadoResumen.Count;
            bePlanillaMedicoConsolidadoResumen registroConsolidadoResumen;
            string border = "";
            for (int k = 0; k < nRegistrosLista; k++)
            {
                registroConsolidadoResumen = lstConsolidadoResumen[k];
                border = ((k == 0) ? ";border-top: 2px solid" : "");
                sb.Append("<tr><td style='" + border + "' colspan='6'></td><td style='font-weight:bold" + border + "'>" + registroConsolidadoResumen.Descripcion + "</td>");
                sb.Append("<td style='text-align:right;font-weight:bold" + border + "'>" + registroConsolidadoResumen.Total.ToString("#,##0.00", us) + "</td>");
                sb.Append("<td style='text-align:right;font-weight:bold" + border + "'>" + registroConsolidadoResumen.Medico.ToString("#,##0.00", us) + "</td>");
                sb.Append("<td style='text-align:right;font-weight:bold" + border + "'>" + registroConsolidadoResumen.Clinica.ToString("#,##0.00", us) + "</td>");
                sb.Append("</tr>");
            }
            sb.Append("</tbody></table>");
            return sb.ToString();
        }
        private string crearConsolidadoResumen(List<bePlanillaMedicoConsolidadoResumenTipo> lstConsolidadoResumenTipo, List<bePlanillaMedicoConsolidadoResumenTipo> lstConsolidadoResumenTipoResumen)
        {
            CultureInfo us = new CultureInfo("en-US");
            string[] cabecerasTitulos = new string[] { "Tipo", "Médico", "Clínica", "Total", "IGV", "NETO" };
            StringBuilder sb = new StringBuilder();
            sb.Append("<table style='width:100%;border-collapse: collapse;font-family:Calibri;font-size:12px'><thead style='display: table-header-group'>");
            sb.Append("<tr>");
            for (int j = 0; j < cabecerasTitulos.Length; j++)
            {
                sb.Append("<td style='font-weight:bold;border-bottom:2px solid'>");
                sb.Append(cabecerasTitulos[j]);
                sb.Append("</td>");
            }
            sb.Append("</tr></thead><tbody>");

            int nRegistrosLista = lstConsolidadoResumenTipo.Count;
            bePlanillaMedicoConsolidadoResumenTipo registroConsolidadoResumenTipo;
            for (int k = 0; k < nRegistrosLista; k++)
            {
                registroConsolidadoResumenTipo = lstConsolidadoResumenTipo[k];
                sb.Append("<tr><td>" + registroConsolidadoResumenTipo.Descripcion + "</td>");
                sb.Append("<td style='text-align:right'>" + registroConsolidadoResumenTipo.Medico.ToString("#,##0.00", us) + "</td>");
                sb.Append("<td style='text-align:right'>" + registroConsolidadoResumenTipo.Clinica.ToString("#,##0.00", us) + "</td>");
                sb.Append("<td style='text-align:right'>" + registroConsolidadoResumenTipo.Total.ToString("#,##0.00", us) + "</td>");
                sb.Append("<td style='text-align:right'>" + registroConsolidadoResumenTipo.IGV.ToString("#,##0.00", us) + "</td>");
                sb.Append("<td style='text-align:right'>" + registroConsolidadoResumenTipo.Neto.ToString("#,##0.00", us) + "</td>");
                sb.Append("</tr>");
            }
            
            nRegistrosLista = lstConsolidadoResumenTipoResumen.Count;
            bePlanillaMedicoConsolidadoResumenTipo registroConsolidadoResumenTipoResumen;
            for (int k = 0; k < nRegistrosLista; k++)
            {
                registroConsolidadoResumenTipoResumen = lstConsolidadoResumenTipoResumen[k];
                sb.Append("<tr><td style='font-weight:bold;border-top: 2px solid'>" + registroConsolidadoResumenTipoResumen.Descripcion + "</td>");
                sb.Append("<td style='text-align:right;font-weight:bold;border-top: 2px solid'>" + registroConsolidadoResumenTipoResumen.Medico.ToString("#,##0.00", us) + "</td>");
                sb.Append("<td style='text-align:right;font-weight:bold;border-top: 2px solid'>" + registroConsolidadoResumenTipoResumen.Clinica.ToString("#,##0.00", us) + "</td>");
                sb.Append("<td style='text-align:right;font-weight:bold;border-top: 2px solid'>" + registroConsolidadoResumenTipoResumen.Total.ToString("#,##0.00", us) + "</td>");
                sb.Append("<td style='text-align:right;font-weight:bold;border-top: 2px solid'>" + registroConsolidadoResumenTipoResumen.IGV.ToString("#,##0.00", us) + "</td>");
                sb.Append("<td style='text-align:right;font-weight:bold;border-top: 2px solid'>" + registroConsolidadoResumenTipoResumen.Neto.ToString("#,##0.00", us) + "</td>");
                sb.Append("</tr>");
            }
            sb.Append("</tbody></table>");
            return sb.ToString();
        }
        private List<string> crearMatriz(List<beProcesoOrdenAtencionPdf> lstProceso, List<beReporteLiquidacionVista4> lstMedicos)
        {

            //var data = l!=""?( l.split("¯")):[];
            var n = lstProceso.Count;
            decimal mtPres = 0;//14
            decimal mtPartMed = 0;//20
            decimal mtPartCli = 0;//21
            decimal mtMontoFacturar = 0;
            decimal mtBono = 0;//15
            decimal mtIgv = 0;//22
            decimal mtTotal = 0;//23
            decimal mtImporteTotal = 0;//25
            int idMed = 0;
            int idTipoAte = 0;
            int idEspecialidad = 0;
            var esNuevo = false;
            beProcesoOrdenAtencionPdf camposNuevos;
            List<string> lstTotales = new List<string>();
            string[] aTotales = new string[] { "", "", "", "", "", "", "", "", "" };
            if (n > 0)
            {
                beProcesoOrdenAtencionPdf campos;
                int x = 0;
                for (int i = 0; i < n; i++)
                {
                    campos = lstProceso[i];

                    idMed = campos.PersonaId;
                    idTipoAte = campos.IdTipoAtencion;
                    idEspecialidad = campos.EspecialidadId;//cambio marco
                    if (i < (n - 1))
                    {
                        if (lstProceso[i + 1] != null)
                        {
                            camposNuevos = lstProceso[i + 1];
                            if (idMed != camposNuevos.PersonaId || idTipoAte != camposNuevos.IdTipoAtencion)
                            {
                                esNuevo = true;
                            }
                        }
                    }
                    mtPres += campos.MontoImponiblePrestacion;//14
                    mtBono += campos.Bonificacion;//15
                    mtPartMed += campos.Importe;//20
                    mtPartCli += campos.ParteClinica;//21
                    mtMontoFacturar += campos.MontoFacturar;//se agrego
                    mtIgv += campos.Impuesto;//22
                    mtTotal += campos.Total;//23
                    mtImporteTotal += campos.ImporteTotal;//25

                    if ((esNuevo) || (i == (n - 1)))
                    {
                        string[] medico = buscarMedicoLista(lstMedicos, idMed, idEspecialidad);
                        string registro = medico[0] + "¦" + idTipoAte.ToString() + "¦" + medico[1] + "¦" + medico[2] + "¦" + mtPres.ToString() + "¦" + mtPartMed.ToString() + "¦" + mtPartCli.ToString() + "¦" + mtBono.ToString() + "¦" + mtTotal.ToString() + "¦" + mtImporteTotal.ToString() + "¦" + mtMontoFacturar.ToString();
                        lstTotales.Add(registro);
                        esNuevo = false;
                        mtPres = 0;//14
                        mtBono = 0;//15
                        mtPartMed = 0;//20
                        mtPartCli = 0;//21
                        mtMontoFacturar = 0;
                        mtIgv = 0;//22
                        mtTotal = 0;//23
                        mtImporteTotal = 0;//25
                    }
                }
            }

            return lstTotales;
        }


        private string[] buscarMedicoLista(List<beReporteLiquidacionVista4> lstMedicos, int id, int idEspecialidad)
        {

            int n = lstMedicos.Count;
            beReporteLiquidacionVista4 registro;
            string[] medico = new string[] { "", "", "" };
            for (var i = 0; i < n; i++)
            {
                registro = lstMedicos[i];
                if (registro.PersonaId == id && registro.EspecialidadId == idEspecialidad)
                {
                    medico[0] = registro.PersonaId.ToString();
                    medico[1] = registro.NombreCompleto;
                    medico[2] = registro.Especialidad;
                    break;
                }
            }
            return medico;
        }
        private string[] buscarMedico(List<string> lstTotales, int id, int tipo)
        {

            int n = lstTotales.Count;
            string[] registro;
            string[] rpta = new string[] { };
            for (var i = 0; i < n; i++)
            {
                registro = lstTotales[i].Split('¦');

                if (int.Parse(registro[0]) == id && int.Parse(registro[1]) == tipo)
                {
                    rpta = registro;
                    break;
                }
            }
            return rpta;
        }
        private string obtenerCabeceraMedico(string data, bool esNuevoMedico, int tipoRegistro)
        {
            string[] registro = data.Split('¦');

            string contenido = "";
            if (registro.Length > 0)
            {
                if (esNuevoMedico == true)
                {
                    contenido += "<tr><td style='border-bottom: 1px double black' colspan='15'>&nbsp</td></tr>";
                    contenido += "<tr><td colspan='15'>&nbsp</td></tr>";
                }
                contenido += "<tr><td style='font-weight:bold'>Médico</td><td style='font-weight:bold'>" + (registro[0] == null ? "" : registro[0]);
                contenido += "</td><td  style='font-weight:bold' colspan='3'>" + (registro[1] == null ? "" : registro[1]) + "</td><td colspan='10'>Especialidad <b>" + (registro[2] == null ? "" : registro[2]) + "</b></td></tr>";
                contenido += "<tr><td style='font-weight:bold;border-bottom: 1px solid black' colspan='2'>Tipo Registro</td><td style='font-weight:bold;border-bottom: 1px solid black' colspan='1'>" + registro[3] + "</td></tr>";//parametro nuevo

                if (tipoRegistro > -1)
                {
                    if (tipoRegistro == 1)
                    {
                        contenido += "<tr><td colspan='2'>Tipo Atención</td><td colspan='6'>" + registro[4] + "</td>";
                        contenido += "<td style='border-bottom: 4px double black;text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[5])));
                        contenido += "</td><td style='border-bottom: 4px double black;text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[10])));
                        contenido += "</td><td style='border-bottom: 4px double black;text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[6])));
                        contenido += "</td><td style='border-bottom: 4px double black;text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[7])));
                        contenido += "</td><td style='border-bottom: 4px double black;text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[11])));
                    }
                    else
                    {
                        contenido += "<tr><td colspan='2'>Tipo Atención</td><td colspan='8'>" + registro[4] + "</td>";
                        contenido += "</td><td style='border-bottom: 4px double black;text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[10])));
                        contenido += "</td><td style='border-bottom: 4px double black;text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[6])));
                    }
                }
                else
                {
                    contenido += "<tr><td colspan='2'>Tipo Atención</td><td colspan='6'>" + registro[4] + "</td>";
                    contenido += "<td style='border-bottom: 4px double black;text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[5])));
                    contenido += "</td><td style='border-bottom: 4px double black;text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[10])));
                    contenido += "</td><td style='border-bottom: 4px double black;text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[6])));
                    contenido += "</td><td style='border-bottom: 4px double black;text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[7])));
                }

                contenido += "</td><td style='border-bottom: 4px double black;text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[8]))) + "</td>";
                //contenido += "<td style='border-bottom: 4px double black;text-align:right;background:green;display:none'>" + (registro[8].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td>";
                contenido += "<td style='border-bottom: 4px double black;text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[9]))) + "&nbsp</td>";
                if (tipoRegistro == 2)
                {
                    contenido += "<td></td>";
                }
                contenido += "</tr>";


                contenido += "<tr>";

                if (tipoRegistro > -1)
                {
                    if (tipoRegistro == 1)
                    {
                        contenido += "<td colspan='8'></td>";
                        contenido += "<td style='text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[5])));
                        contenido += "</td><td style='text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[10])));
                        contenido += "</td><td style='text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[6])));
                        contenido += "</td><td style='text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[7])));
                        contenido += "</td><td style='text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[11])));
                    }
                    else
                    {
                        contenido += "<td colspan='10'></td>";
                        contenido += "</td><td style='text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[10])));
                        contenido += "</td><td style='text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[6])));
                    }
                }
                else
                {
                    contenido += "<td colspan='8'></td>";
                    contenido += "<td style='text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[5])));
                    contenido += "</td><td style='text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[10])));
                    contenido += "</td><td style='text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[6])));
                    contenido += "</td><td style='text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[7])));
                }

                contenido += "</td><td style='text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[8]))) + "</td>";
                //contenido += "<td style='text-align:right;background:green;display:none'>" + (registro[8].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td>";
                contenido += "<td style='text-align:center'>" + (String.Format("{0:N2}", float.Parse(registro[9]))) + "&nbsp</td>";
                if (tipoRegistro == 2)
                {
                    contenido += "<td></td>";
                }
                contenido += "</tr>";

                contenido += "<tr><td colspan='15'>&nbsp</td></tr>";
            }

            return contenido;
        }

        private string buscarDescripcionTipoAtencion(List<beCampoEntero> lstTipoAtencion, int id)
        {
            int n = lstTipoAtencion.Count;
            beCampoEntero registro;
            string des = "";
            for (var i = 0; i < n; i++)
            {
                registro = lstTipoAtencion[i];

                if (registro.campo1 == id)
                {
                    des = registro.campo2;
                    break;
                }
            }
            return des;
        }

        private string buscarDescripcionTipoOrden(List<beCampoEntero> lstTipoOrden, int id)
        {
            int n = lstTipoOrden.Count;
            beCampoEntero registro;
            string des = "";
            for (var i = 0; i < n; i++)
            {
                registro = lstTipoOrden[i];
                if (registro.campo1 == id)
                {
                    des = registro.campo2;
                    break;
                }
            }
            return des;
        }

        private string buscarDescripcionConcepto(List<beCampoCadenaCorto> lstConcepto, string id)
        {
            int n = lstConcepto.Count;
            beCampoCadenaCorto registro;
            string des = "";
            for (var i = 0; i < n; i++)
            {
                registro = lstConcepto[i];
                if (registro.Campo1 == id)
                {
                    des = registro.Campo2;
                    break;
                }
            }
            return des;
        }
        private string obtenerTotales(List<string> lstTotales, int tipo)
        {

            int n = lstTotales.Count;
            string[] registro;
            string contenido = "";
            decimal mtPres = 0;//14
            decimal mtPartMed = 0;//20
            decimal mtPartCli = 0;//21
            decimal mtMontoaFacturar = 0;
            decimal mtBono = 0;//15
            decimal mtIgv = 0;//22
            decimal mtTotal = 0;//23
            decimal mtImporteTotal = 0;//25
            for (int i = 0; i < n; i++)
            {
                registro = lstTotales[i].Split('¦');

                mtPres += decimal.Parse(registro[4]);//14
                mtPartMed += decimal.Parse(registro[5]);//20
                mtPartCli += decimal.Parse(registro[6]);//21
                mtBono += decimal.Parse(registro[7]);//15
                                                     //mtIgv += decimal.Parse(registro[8]);//22
                mtTotal += decimal.Parse(registro[8]);//23
                mtImporteTotal += decimal.Parse(registro[9]);//25
                mtMontoaFacturar += decimal.Parse(registro[10]);//25
            }
            if (tipo == 1)
            {
                contenido += "<tr><td colspan='3'>&nbsp</td><td colspan='5'>TOTAL GENERAL ";
                contenido += "</td><td style='text-align:center'>" + String.Format("{0:N2}", mtPres) + "</td>";
                contenido += "<td style='text-align:center'>" + String.Format("{0:N2}", mtImporteTotal) + "</td>";
                contenido += "<td style='text-align:center'>" + String.Format("{0:N2}", mtPartMed) + "</td>";
                contenido += "<td style='text-align:center'>" + String.Format("{0:N2}", mtPartCli) + "</td>";
                contenido += "<td style='text-align:center'>" + String.Format("{0:N2}", mtMontoaFacturar) + "</td>";
                contenido += "<td style='text-align:center'>" + String.Format("{0:N2}", mtBono) + "</td>";
                contenido += "<td style='text-align:center'>" + String.Format("{0:N2}", mtTotal) + "&nbsp</td>";
                contenido += "</tr>";
            }
            else
            {
                contenido += "<tr><td colspan='3'>&nbsp</td><td colspan='7'>TOTAL GENERAL ";
                contenido += "<td style='text-align:center'>" + String.Format("{0:N2}", mtImporteTotal) + "</td>";
                contenido += "<td style='text-align:center'>" + String.Format("{0:N2}", mtPartMed) + "</td>";
                //contenido += "<td style='text-align:center'>" + String.Format("{0:N2}", mtMontoaFacturar) + "</td>";
                contenido += "<td style='text-align:center'>" + String.Format("{0:N2}", mtBono) + "</td>";
                contenido += "<td style='text-align:center'>" + String.Format("{0:N2}", mtTotal) + "&nbsp</td>";
                contenido += "</tr>";

            }
            return contenido;
        }
        public async Task<string> EnviarCorreo(string[] medicos, string su, string rutaPdf, int UsuarioId, string[] CabeceraCorreo, string[] ContenidoCorreo)
        {
            //string ip = ConfigurationManager.AppSettings["WebSocketIp"];
            //string puerto = ConfigurationManager.AppSettings["WebSocketPuerto"];
            //string ruta = "ws://" + ip + ":" + puerto;
            //ClientWebSocket ws = new ClientWebSocket();
            //await ws.ConnectAsync(new Uri(ruta), CancellationToken.None);
            //string res = "GEnial";

            //var buffer = Encoding.UTF8.GetBytes(res);
            //var segment = new ArraySegment<byte>(buffer);


            string rpta = "";
            await Task.Run(() =>
            {

                beArchivoDigitalPlantillaCorreo obeArchivoDigitalPlantillaCorreo = obtenerPlantilla(su, UsuarioId);

                if (obeArchivoDigitalPlantillaCorreo != null)
                {
                    beMensaje obeMensaje;
                    string correoDe = ConfigurationManager.AppSettings["CorreoDe"];
                    string correoClave = ConfigurationManager.AppSettings["CorreoClave"];
                    //string CorreoTest = ConfigurationManager.AppSettings["CorreoTest"];
                    int n = medicos.Length;
                    string[] registro;
                    string archivoPdf;
                    string CadenaEnviar = "";
                    string NuevaLista = "";
                    string[] Periodo;
                    string nombreArchivo = "";
                    for (int i = 0; i < n; i++)
                    {
                        registro = medicos[i].Split('¦');
                        nombreArchivo = registro[4];
                        if (!String.IsNullOrEmpty(nombreArchivo))
                        {
                            Periodo = nombreArchivo.Split('-');
                            archivoPdf = rutaPdf + su + "\\" + Periodo[2] + "\\" + registro[5].Trim() + "\\" + registro[4].Trim();//le quite los \\
                            obeMensaje = new beMensaje();
                            obeMensaje.Asunto = CabeceraCorreo[i];
                            obeMensaje.De = correoDe;
                            obeMensaje.Clave = correoClave;
                            if (registro[2].IndexOf(',') > -1)
                            {
                                string[] Correos = registro[2].Split(',');
                                obeMensaje.Para = new string[] { Correos[0] };
                                obeMensaje.CC = new string[] { Correos[1] };
                            }
                            else
                            {
                                obeMensaje.Para = new string[] { registro[2] };
                            }
                            obeMensaje.Contenido = ContenidoCorreo[i];
                            obeMensaje.Archivo = new string[] { archivoPdf };
                            CadenaEnviar = obeMensaje.Contenido.ToString();
                            NuevaLista = NuevaLista + String.Format("{0}¦{1}¦{2}¦{3}¦{4}", registro[0], registro[1], registro[2], registro[3], CadenaEnviar);
                            if (i < (n - 1))
                            {
                                NuevaLista = NuevaLista + "¬";
                            }
                            bool exito = ucCorreo.enviar(obeMensaje);
                            //bool exito = true;
                            if (exito) rpta = NuevaLista;
                            //ws.SendAsync(segment, System.Net.WebSockets.WebSocketMessageType.Text, true, CancellationToken.None);
                        }
                    }
                }
            });
            return rpta;
        }

        public beArchivoDigitalPlantillaCorreo obtenerPlantilla(string sucursal, int usuarioId)
        {
            beArchivoDigitalPlantillaCorreo obeArchivoDigitalPlantillaCorreo = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daArchivoDigital odaArchivoDigital = new daArchivoDigital();
                    obeArchivoDigitalPlantillaCorreo = odaArchivoDigital.obtenerPlantilla(con, sucursal, usuarioId);
                }
                catch (SqlException ex)
                {
                    foreach (SqlError err in ex.Errors)
                    {
                        ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
                    }
                }
                catch (Exception ex)
                {
                    ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
                }
            }
            return (obeArchivoDigitalPlantillaCorreo);
        }

        public string NumeroALetra(string num)
        {
            string res, dec = "";
            Int64 entero;
            int decimales;
            double nro;

            try
            {
                nro = Convert.ToDouble(num);
            }
            catch
            {
                return "";
            }

            entero = Convert.ToInt64(Math.Truncate(nro));
            decimales = Convert.ToInt32(Math.Round((nro - entero) * 100, 2));
            if (decimales > 0)
            {
                dec = " CON " + decimales.ToString() + "/100";
            }

            res = toText(Convert.ToDouble(entero)) + dec;
            return res;
        }

        private string toText(double value)
        {
            string Num2Text = "";
            value = Math.Truncate(value);
            if (value == 0) Num2Text = "CERO";
            else if (value == 1) Num2Text = "UNO";
            else if (value == 2) Num2Text = "DOS";
            else if (value == 3) Num2Text = "TRES";
            else if (value == 4) Num2Text = "CUATRO";
            else if (value == 5) Num2Text = "CINCO";
            else if (value == 6) Num2Text = "SEIS";
            else if (value == 7) Num2Text = "SIETE";
            else if (value == 8) Num2Text = "OCHO";
            else if (value == 9) Num2Text = "NUEVE";
            else if (value == 10) Num2Text = "DIEZ";
            else if (value == 11) Num2Text = "ONCE";
            else if (value == 12) Num2Text = "DOCE";
            else if (value == 13) Num2Text = "TRECE";
            else if (value == 14) Num2Text = "CATORCE";
            else if (value == 15) Num2Text = "QUINCE";
            else if (value < 20) Num2Text = "DIECI" + toText(value - 10);
            else if (value == 20) Num2Text = "VEINTE";
            else if (value < 30) Num2Text = "VEINTI" + toText(value - 20);
            else if (value == 30) Num2Text = "TREINTA";
            else if (value == 40) Num2Text = "CUARENTA";
            else if (value == 50) Num2Text = "CINCUENTA";
            else if (value == 60) Num2Text = "SESENTA";
            else if (value == 70) Num2Text = "SETENTA";
            else if (value == 80) Num2Text = "OCHENTA";
            else if (value == 90) Num2Text = "NOVENTA";
            else if (value < 100) Num2Text = toText(Math.Truncate(value / 10) * 10) + " Y " + toText(value % 10);
            else if (value == 100) Num2Text = "CIEN";
            else if (value < 200) Num2Text = "CIENTO " + toText(value - 100);
            else if ((value == 200) || (value == 300) || (value == 400) || (value == 600) || (value == 800)) Num2Text = toText(Math.Truncate(value / 100)) + "CIENTOS";
            else if (value == 500) Num2Text = "QUINIENTOS";
            else if (value == 700) Num2Text = "SETECIENTOS";
            else if (value == 900) Num2Text = "NOVECIENTOS";
            else if (value < 1000) Num2Text = toText(Math.Truncate(value / 100) * 100) + " " + toText(value % 100);
            else if (value == 1000) Num2Text = "MIL";
            else if (value < 2000) Num2Text = "MIL " + toText(value % 1000);
            else if (value < 1000000)
            {
                Num2Text = toText(Math.Truncate(value / 1000)) + " MIL";
                if ((value % 1000) > 0) Num2Text = Num2Text + " " + toText(value % 1000);
            }

            else if (value == 1000000) Num2Text = "UN MILLON";
            else if (value < 2000000) Num2Text = "UN MILLON " + toText(value % 1000000);
            else if (value < 1000000000000)
            {
                Num2Text = toText(Math.Truncate(value / 1000000)) + " MILLONES ";
                if ((value - Math.Truncate(value / 1000000) * 1000000) > 0) Num2Text = Num2Text + " " + toText(value - Math.Truncate(value / 1000000) * 1000000);
            }

            else if (value == 1000000000000) Num2Text = "UN BILLON";
            else if (value < 2000000000000) Num2Text = "UN BILLON " + toText(value - Math.Truncate(value / 1000000000000) * 1000000000000);

            else
            {
                Num2Text = toText(Math.Truncate(value / 1000000000000)) + " BILLONES";
                if ((value - Math.Truncate(value / 1000000000000) * 1000000000000) > 0) Num2Text = Num2Text + " " + toText(value - Math.Truncate(value / 1000000000000) * 1000000000000);
            }
            return Num2Text;
        }

    }
}
