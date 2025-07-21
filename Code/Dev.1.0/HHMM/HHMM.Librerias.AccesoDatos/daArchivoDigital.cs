using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
    public class daArchivoDigital
    {
        public beArchivoDigitalListas listas(SqlConnection con, string sucursal)
        {
            beArchivoDigitalListas obeArchivoDigitalListas = new beArchivoDigitalListas();
            List<beCampoEntero> lbeAdmision = null;
            List<beCampoEntero> lbePeriodo = null;
            List<string> lbeVariableCorreo = null;
            SqlCommand cmd = new SqlCommand("uspArchivoDigitalListas", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@SucursalId", sucursal);
            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                lbeAdmision = new List<beCampoEntero>();
                int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
                int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
                beCampoEntero obebeCampoEntero;
                while (drd.Read())
                {
                    obebeCampoEntero = new beCampoEntero();
                    obebeCampoEntero.campo1 = drd.GetInt32(posTipoAdmisionId);
                    obebeCampoEntero.campo2 = drd.GetString(posTipoAdmision);
                    lbeAdmision.Add(obebeCampoEntero);
                }
                obeArchivoDigitalListas.ListaAdmision = lbeAdmision;
                if (drd.NextResult())
                {
                    lbePeriodo = new List<beCampoEntero>();
                    int posPeriodoId = drd.GetOrdinal("PeriodoId");
                    int posPeriodo = drd.GetOrdinal("Periodo");
                    beCampoEntero obebeCampoEntero2;
                    while (drd.Read())
                    {
                        obebeCampoEntero2 = new beCampoEntero();
                        obebeCampoEntero2.campo1 = drd.GetInt32(posPeriodoId);
                        obebeCampoEntero2.campo2 = drd.GetInt32(posPeriodo).ToString();
                        lbePeriodo.Add(obebeCampoEntero2);
                    }
                    obeArchivoDigitalListas.ListaPeriodo = lbePeriodo;

                }
                if (drd.NextResult())
                {
                    lbeVariableCorreo = new List<string>();
                    int posVariableCorreoId = drd.GetOrdinal("VariableCorreoId");
                    string VariableCorreo;
                    while (drd.Read())
                    {
                        VariableCorreo = drd.GetString(posVariableCorreoId);
                        lbeVariableCorreo.Add(VariableCorreo);
                    }
                    obeArchivoDigitalListas.ListaVariables = lbeVariableCorreo;
                }
                drd.Close();
            }
            return (obeArchivoDigitalListas);
        }

        public beArchivoDigitalDetalleListas listarBusqueda(SqlConnection con, string sucursal, int personaId, int TipoAdmisionId, int PeriodoIdInicial, int PeriodoIdFinal, string est, int usuario)
        {
            beArchivoDigitalDetalleListas obeArchivoDigitalDetalleListas = new beArchivoDigitalDetalleListas();
            List<beCampoEntero> lbePeriodo = null;
            List<beArchivoDigitalMedico> lbeArchivoDigitalMedico = null;
            List<beCampoCadenaCorto> lbeDescripcionCorreo = null;
            SqlCommand cmd = new SqlCommand("uspArchivoDigitalListarV1", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@SucursalId", sucursal);
            cmd.Parameters.AddWithValue("@PersonaId", personaId);
            cmd.Parameters.AddWithValue("@TipoAdmisionId", TipoAdmisionId);
            cmd.Parameters.AddWithValue("@PeriodoIdInicial", PeriodoIdInicial);
            cmd.Parameters.AddWithValue("@PeriodoIdFinal", PeriodoIdFinal);
            cmd.Parameters.AddWithValue("@Estado", est);
            cmd.Parameters.AddWithValue("@UsuarioId", usuario);
            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                lbePeriodo = new List<beCampoEntero>();
                int posPeriodoId = drd.GetOrdinal("PeriodoId");
                int posPeriodo = drd.GetOrdinal("Periodo");
                beCampoEntero obebeCampoEntero;
                while (drd.Read())
                {
                    obebeCampoEntero = new beCampoEntero();
                    obebeCampoEntero.campo1 = drd.GetInt32(posPeriodoId);
                    obebeCampoEntero.campo2 = drd.GetInt32(posPeriodo).ToString();
                    lbePeriodo.Add(obebeCampoEntero);
                }
                obeArchivoDigitalDetalleListas.ListaPeriodo = lbePeriodo;

                if (drd.NextResult())
                {
                    lbeArchivoDigitalMedico = new List<beArchivoDigitalMedico>();
                    int posPeriodo1 = 0;
                    int posPeriodo2 = 0;
                    int posFechaUltimoEnvio = 0;
                    int posNombrePDF = 0;
                    int posElementosCorreo = 0;
                    int posTipoPlanilla = 0;
                    if (est == "P")
                    {
                        posPeriodo1 = drd.GetOrdinal("Periodo");
                        posTipoPlanilla = drd.GetOrdinal("TipoPlanilla");
                    }
                    else if (est == "G" || est == "E")
                    {
                        posPeriodo1 = drd.GetOrdinal("CorreoElectronico");
                        posPeriodo2 = drd.GetOrdinal("Periodo");
                        if (est == "E")
                        {
                            posFechaUltimoEnvio = drd.GetOrdinal("FechaUltimoEnvio");
                        }
                    }
                    int posMedico = drd.GetOrdinal("Medico");
                    int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
                    int posEstadoDifundir = drd.GetOrdinal("EstadoDifundir");
                    int posPersonaId = drd.GetOrdinal("PersonaId");
                    int posPlanillaId = drd.GetOrdinal("PlanillaId");
                    int posTotal = drd.GetOrdinal("Total");
                    int posPeriodoProvision = drd.GetOrdinal("PeriodoProvision");
                    beArchivoDigitalMedico obeArchivoDigitalMedico;
                    if (est == "G" || est == "E")
                    {
                        posNombrePDF = drd.GetOrdinal("NombrePDF");
                        posElementosCorreo = drd.GetOrdinal("ElementosCorreo");
                    }
                    while (drd.Read())
                    {
                        obeArchivoDigitalMedico = new beArchivoDigitalMedico();
                        obeArchivoDigitalMedico.Periodo = (est == "P" ? (drd.GetInt32(posPeriodo1).ToString()) : (drd.GetString(posPeriodo1)));
                        obeArchivoDigitalMedico.PersonaId = drd.GetInt32(posPersonaId);
                        obeArchivoDigitalMedico.Medico = drd.GetString(posMedico);
                        obeArchivoDigitalMedico.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
                        obeArchivoDigitalMedico.EstadoDifundir = drd.GetString(posEstadoDifundir);
                        obeArchivoDigitalMedico.PlanillaId = drd.GetInt32(posPlanillaId);
                        if (est != "P")
                        {
                            obeArchivoDigitalMedico.Periodo2 = drd.GetInt32(posPeriodo2).ToString();

                        }
                        if (est == "E")
                        {
                            obeArchivoDigitalMedico.FechaUltimoEnvio = drd.GetDateTime(posFechaUltimoEnvio);
                        }
                        if (est == "G" || est == "E")
                        {
                            obeArchivoDigitalMedico.NombrePDF = drd.GetString(posNombrePDF);
                            obeArchivoDigitalMedico.ElementosCorreo = drd.GetString(posElementosCorreo).Trim();
                        }
                        if (est == "P")
                        {
                            obeArchivoDigitalMedico.TipoPlanilla = drd.GetInt32(posTipoPlanilla);

                        }
                        obeArchivoDigitalMedico.Total = drd.GetDecimal(posTotal);
                        obeArchivoDigitalMedico.PeriodoProvision = drd.GetString(posPeriodoProvision);
                        lbeArchivoDigitalMedico.Add(obeArchivoDigitalMedico);
                    }
                    obeArchivoDigitalDetalleListas.ListaMedico = lbeArchivoDigitalMedico;
                }
                if (drd.NextResult())
                {
                    lbeDescripcionCorreo = new List<beCampoCadenaCorto>();
                    int posDescripcionCorreo1 = drd.GetOrdinal("Asunto");
                    int posDescripcionCorreo2 = drd.GetOrdinal("Cuerpo");
                    beCampoCadenaCorto obeDescripcionCorreo;
                    while (drd.Read())
                    {
                        obeDescripcionCorreo = new beCampoCadenaCorto();
                        obeDescripcionCorreo.Campo1 = drd.GetString(posDescripcionCorreo1);
                        obeDescripcionCorreo.Campo2 = drd.GetString(posDescripcionCorreo2);
                        lbeDescripcionCorreo.Add(obeDescripcionCorreo);
                    }
                    obeArchivoDigitalDetalleListas.ListaDescripcionCorreo = lbeDescripcionCorreo;
                }
                drd.Close();
            }
            return (obeArchivoDigitalDetalleListas);
        }

        public beArchivoDigitalListasPdf obtenerListasPdfMaestro(SqlConnection con, string sucursal)
        {
            beArchivoDigitalListasPdf obeArchivoDigitalListasPdf = new beArchivoDigitalListasPdf();
            beCampoCadena3 CabeceraPdf = null;
            List<beCampoEntero> ListaTipoAtencion = null;
            List<beCampoEntero> ListaServicio = null;
            List<beCampoCadenaCorto> ListaComponente = null;

            SqlCommand cmd = new SqlCommand("uspArchivoDigitalReporteListas", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@SucursalId", sucursal);
            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                CabeceraPdf = new beCampoCadena3();
                int posSucursalId = drd.GetOrdinal("SucursalId");
                int posSucursal = drd.GetOrdinal("Sucursal");
                int posCompania = drd.GetOrdinal("Compania");

                while (drd.Read())
                {
                    CabeceraPdf.Campo1 = drd.GetString(posSucursalId);
                    CabeceraPdf.Campo2 = drd.GetString(posSucursal);
                    CabeceraPdf.Campo3 = drd.GetString(posCompania);
                }
                obeArchivoDigitalListasPdf.CabeceraPdf = CabeceraPdf;

                if (drd.NextResult())
                {
                    ListaTipoAtencion = new List<beCampoEntero>();
                    int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
                    int posDescripcionLarga = drd.GetOrdinal("DescripcionLarga");

                    beCampoEntero oTipoAtencion;
                    while (drd.Read())
                    {
                        oTipoAtencion = new beCampoEntero();
                        oTipoAtencion.campo1 = drd.GetInt32(posTipoAtencionId);
                        oTipoAtencion.campo2 = drd.GetString(posDescripcionLarga);
                        ListaTipoAtencion.Add(oTipoAtencion);
                    }
                    obeArchivoDigitalListasPdf.ListaTipoAtencion = ListaTipoAtencion;
                }
                if (drd.NextResult())
                {
                    ListaServicio = new List<beCampoEntero>();
                    int posServicioId = drd.GetOrdinal("ServicioId");
                    int posDescripcion = drd.GetOrdinal("Descripcion");

                    beCampoEntero oServicio;
                    while (drd.Read())
                    {
                        oServicio = new beCampoEntero();
                        oServicio.campo1 = drd.GetInt32(posServicioId);
                        oServicio.campo2 = drd.GetString(posDescripcion);
                        ListaServicio.Add(oServicio);
                    }
                    obeArchivoDigitalListasPdf.ListaServicio = ListaServicio;
                }
                if (drd.NextResult())
                {
                    ListaComponente = new List<beCampoCadenaCorto>();
                    int posCodigoPrestacion = drd.GetOrdinal("CodigoPrestacion");
                    int posDescripcion1 = drd.GetOrdinal("Descripcion");

                    beCampoCadenaCorto oComponente;
                    while (drd.Read())
                    {
                        oComponente = new beCampoCadenaCorto();
                        oComponente.Campo1 = drd.GetString(posCodigoPrestacion);
                        oComponente.Campo2 = drd.GetString(posDescripcion1);
                        ListaComponente.Add(oComponente);
                    }
                    obeArchivoDigitalListasPdf.ListaComponente = ListaComponente;
                }
                drd.Close();
            }
            return (obeArchivoDigitalListasPdf);
        }

        public beArchivoDigitalMedicoListas obtenerListasPdfDefaultDetalle(SqlConnection con, string sucursal, int planillaId, int personaId)
        {
            beArchivoDigitalMedicoListas obeArchivoDigitalMedicoListas = new beArchivoDigitalMedicoListas();
            beArchivoDigitalMedicoCabeceraPrincipalPdf obeArchivoDigitalMedicoCabeceraPrincipalPdf = null;
            beArchivoDigitalMedicoCabeceraPdf obeArchivoDigitalMedicoCabeceraPdf = null;
            beArchivoDigitalMedicoFacturacion obeArchivoDigitalMedicoFacturacion = null;
            List<beReporteLiquidacionVista4> lbeReporteLiquidacionVista4 = null;
            List<beProcesoOrdenAtencionPdf> lbeProcesoOrdenAtencionPdf = null;
            List<beCampoEntero> lbeTipoAtencion = null;
            List<beCampoEntero> lbeServicio = null;
            List<beCampoCadenaCorto> lbePrestacion = null;
            List<beProcesoMedicoHorarioPdf2> lbeProcesoMedico = null;
            List<beCampoCadenaCorto> lbeArticulo = null;
            List<beProcesoMedicoHorarioPdf3> lbeProcesoMedico2 = null;
            List<bePlanillaMedicoDescuento> lbePlanillaDescuento = null;

            SqlCommand cmd = new SqlCommand("uspArchivoDigitalReporteV2", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@SucursalId", sucursal);
            cmd.Parameters.AddWithValue("@PlanillaId", planillaId);
            cmd.Parameters.AddWithValue("@PersonaId", personaId);

            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                obeArchivoDigitalMedicoCabeceraPrincipalPdf = new beArchivoDigitalMedicoCabeceraPrincipalPdf();
                int posSucursalId1 = drd.GetOrdinal("SucursalId");
                int posSucursal1 = drd.GetOrdinal("Sucursal");
                int posCompania1 = drd.GetOrdinal("Compania");
                int posDireccion1 = drd.GetOrdinal("Direccion");
                int posTelefono1 = drd.GetOrdinal("Telefono");
                int posFax1 = drd.GetOrdinal("Fax");
                int posURL1 = drd.GetOrdinal("URL");
                int posRUC = drd.GetOrdinal("RUC");
                while (drd.Read())
                {
                    obeArchivoDigitalMedicoCabeceraPrincipalPdf.SucursalId = drd.GetString(posSucursalId1).Trim();
                    obeArchivoDigitalMedicoCabeceraPrincipalPdf.Sucursal = drd.GetString(posSucursal1).Trim();
                    obeArchivoDigitalMedicoCabeceraPrincipalPdf.Compania = drd.GetString(posCompania1).Trim();
                    obeArchivoDigitalMedicoCabeceraPrincipalPdf.Direccion = drd.GetString(posDireccion1).Trim();
                    obeArchivoDigitalMedicoCabeceraPrincipalPdf.Telefono = drd.GetString(posTelefono1).Trim();
                    obeArchivoDigitalMedicoCabeceraPrincipalPdf.Fax = drd.GetString(posFax1).Trim();
                    obeArchivoDigitalMedicoCabeceraPrincipalPdf.URL = drd.GetString(posURL1).Trim();
                    obeArchivoDigitalMedicoCabeceraPrincipalPdf.RUC = drd.GetString(posRUC);
                }
                obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal = obeArchivoDigitalMedicoCabeceraPrincipalPdf;
                if (drd.NextResult())
                {
                    obeArchivoDigitalMedicoCabeceraPdf = new beArchivoDigitalMedicoCabeceraPdf();
                    int posDescripcion2 = drd.GetOrdinal("Descripcion");
                    int posTipoAdmisionId2 = drd.GetOrdinal("TipoAdmisionId");
                    int posAnio2 = drd.GetOrdinal("Anio");
                    int posMes2 = drd.GetOrdinal("Mes");
                    int posTipoAdmision2 = drd.GetOrdinal("TipoAdmision");
                    int posFechaInicio2 = drd.GetOrdinal("FechaInicio");
                    int posFechaFin2 = drd.GetOrdinal("FechaFin");

                    while (drd.Read())
                    {
                        obeArchivoDigitalMedicoCabeceraPdf.Descripcion = drd.GetString(posDescripcion2).Trim();
                        obeArchivoDigitalMedicoCabeceraPdf.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId2).ToString();
                        obeArchivoDigitalMedicoCabeceraPdf.Anio = drd.GetInt32(posAnio2).ToString();
                        obeArchivoDigitalMedicoCabeceraPdf.Mes = drd.GetInt32(posMes2).ToString();
                        obeArchivoDigitalMedicoCabeceraPdf.TipoAdmision = drd.GetString(posTipoAdmision2);
                        obeArchivoDigitalMedicoCabeceraPdf.FechaInicio = drd.GetDateTime(posFechaInicio2);
                        obeArchivoDigitalMedicoCabeceraPdf.FechaFin = drd.GetDateTime(posFechaFin2);
                    }
                    obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf = obeArchivoDigitalMedicoCabeceraPdf;
                }
                if (drd.NextResult())
                {
                    obeArchivoDigitalMedicoFacturacion = new beArchivoDigitalMedicoFacturacion();
                    int posProcesoId3 = drd.GetOrdinal("ProcesoId");
                    int posFacturar3 = drd.GetOrdinal("Facturar");
                    int posNumeroDocumento3 = drd.GetOrdinal("NumeroDocumento");
                    int posCodigoUsuario3 = drd.GetOrdinal("CodigoUsuario");
                    int posFechaHoraCierre3 = drd.GetOrdinal("FechaHoraCierre");
                    int posNombrePDF3 = drd.GetOrdinal("NombrePDF");
                    int posPeriodoProvision3 = drd.GetOrdinal("PeriodoProvision");

                    while (drd.Read())
                    {
                        obeArchivoDigitalMedicoFacturacion.ProcesoId = drd.GetInt32(posProcesoId3);
                        obeArchivoDigitalMedicoFacturacion.Facturar = drd.GetString(posFacturar3);
                        obeArchivoDigitalMedicoFacturacion.NumeroDocumento = drd.GetString(posNumeroDocumento3);
                        obeArchivoDigitalMedicoFacturacion.CodigoUsuario = drd.GetString(posCodigoUsuario3);
                        obeArchivoDigitalMedicoFacturacion.FechaHoraCierre = drd.GetDateTime(posFechaHoraCierre3);
                        obeArchivoDigitalMedicoFacturacion.NombrePDF = drd.GetString(posNombrePDF3);
                        obeArchivoDigitalMedicoFacturacion.PeriodoProvision = drd.GetString(posPeriodoProvision3);
                    }
                    obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar = obeArchivoDigitalMedicoFacturacion;
                }
                if (drd.NextResult())
                {
                    lbeReporteLiquidacionVista4 = new List<beReporteLiquidacionVista4>();
                    int posPersonaId4 = drd.GetOrdinal("PersonaId");
                    int posNombreCompleto4 = drd.GetOrdinal("NombreCompleto");
                    int posEspecialidadId4 = drd.GetOrdinal("EspecialidadId");
                    int posEspecialidad4 = drd.GetOrdinal("Especialidad");
                    int posCodigoImpuesto4 = drd.GetOrdinal("CodigoImpuesto");
                    int posFactorPorcentaje4 = drd.GetOrdinal("FactorPorcentaje");
                    int posTipoImpuestoId4 = drd.GetOrdinal("TipoImpuestoId");
                    beReporteLiquidacionVista4 obeMedico;
                    while (drd.Read())
                    {
                        obeMedico = new beReporteLiquidacionVista4();
                        obeMedico.PersonaId = drd.GetInt32(posPersonaId4);
                        obeMedico.NombreCompleto = drd.GetString(posNombreCompleto4);
                        obeMedico.EspecialidadId = drd.GetInt32(posEspecialidadId4);
                        obeMedico.Especialidad = drd.GetString(posEspecialidad4);
                        obeMedico.CodigoImpuesto = drd.GetString(posCodigoImpuesto4);
                        obeMedico.FactorPorcentaje = drd.GetDecimal(posFactorPorcentaje4);
                        obeMedico.TipoImpuestoId = drd.GetString(posTipoImpuestoId4);
                        lbeReporteLiquidacionVista4.Add(obeMedico);
                    }
                    obeArchivoDigitalMedicoListas.ListaMedicos = lbeReporteLiquidacionVista4;
                }
                if (drd.NextResult())
                {
                    lbeProcesoOrdenAtencionPdf = new List<beProcesoOrdenAtencionPdf>();
                    int posIdTipoAtencion5 = drd.GetOrdinal("IdTipoAtencion");
                    int posServicioId5 = drd.GetOrdinal("ServicioId");
                    int posPersonaId5 = drd.GetOrdinal("PersonaId");
                    int posCodigoPrestacion5 = drd.GetOrdinal("CodigoPrestacion");
                    int posEspecialidadId5 = drd.GetOrdinal("EspecialidadId");
                    int posFechaAtencionPrestacion5 = drd.GetOrdinal("FechaAtencionPrestacion");
                    int posCodigoOA5 = drd.GetOrdinal("CodigoOA");
                    int posEstadoPrestacion5 = drd.GetOrdinal("EstadoPrestacion");
                    int posIdExpediente5 = drd.GetOrdinal("IdExpediente");
                    int posEstadoExpediente5 = drd.GetOrdinal("EstadoExpediente");
                    int posIdPaciente5 = drd.GetOrdinal("IdPaciente");
                    int posPaciente5 = drd.GetOrdinal("Paciente");
                    int posCodigoTipoPaciente5 = drd.GetOrdinal("CodigoTipoPaciente");
                    int posCantidad5 = drd.GetOrdinal("Cantidad");
                    int posMontoImponiblePrestacion5 = drd.GetOrdinal("MontoImponiblePrestacion");
                    int posBonificacion5 = drd.GetOrdinal("Bonificacion");
                    int posValorMedida5 = drd.GetOrdinal("ValorMedida");
                    int posTipoValor5 = drd.GetOrdinal("TipoValor");
                    int posValor5 = drd.GetOrdinal("Valor");
                    int posPorcentaje5 = drd.GetOrdinal("Porcentaje");
                    int posImporte5 = drd.GetOrdinal("Importe");
                    int posParteClinica5 = drd.GetOrdinal("ParteClinica");

                    int posMontoFacturar = drd.GetOrdinal("Descuento");

                    int posImpuesto5 = drd.GetOrdinal("Impuesto");
                    int posTotal5 = drd.GetOrdinal("Total");
                    int posDocumentoEmitido5 = drd.GetOrdinal("DocumentoEmitido");
                    int posTipoComponente5 = drd.GetOrdinal("TipoComponente");
                    int posTipoAjuste5 = drd.GetOrdinal("TipoAjuste");

                    int posMontoImponiblePrestacionResumen = drd.GetOrdinal("MontoImponiblePrestacionResumen");
                    int posImporteResumen = drd.GetOrdinal("ImporteResumen");
                    int posParteClinicaResumen = drd.GetOrdinal("ParteClinicaResumen");
                    int posMontoFacturarResumen = drd.GetOrdinal("MontoFacturarResumen");
                    int posBonificacionResumen = drd.GetOrdinal("BonificacionResumen");
                    int posTotalResumen = drd.GetOrdinal("TotalResumen");

                    int posMontoImponiblePrestacionResumenMed = drd.GetOrdinal("MontoImponiblePrestacionResumenMed");
                    int posImporteResumenMed = drd.GetOrdinal("ImporteResumenMed");
                    int posParteClinicaResumenMed = drd.GetOrdinal("ParteClinicaResumenMed");
                    int MontoFacturarResumenMed = drd.GetOrdinal("MontoFacturarResumenMed");
                    int posBonificacionResumenMed = drd.GetOrdinal("BonificacionResumenMed");
                    int posTotalResumenMed = drd.GetOrdinal("TotalResumenMed");
                    int posImporteTotal = drd.GetOrdinal("ImporteTotal");
                    int posImporteTotalResumen = drd.GetOrdinal("ImporteTotalResumen");

                    beProcesoOrdenAtencionPdf obeProcesoOrdenAtencionPdf;
                    while (drd.Read())
                    {
                        obeProcesoOrdenAtencionPdf = new beProcesoOrdenAtencionPdf();
                        obeProcesoOrdenAtencionPdf.IdTipoAtencion = drd.GetInt32(posIdTipoAtencion5);
                        obeProcesoOrdenAtencionPdf.ServicioId = drd.GetInt32(posServicioId5);
                        obeProcesoOrdenAtencionPdf.PersonaId = drd.GetInt32(posPersonaId5);
                        obeProcesoOrdenAtencionPdf.CodigoPrestacion = drd.GetString(posCodigoPrestacion5);
                        obeProcesoOrdenAtencionPdf.EspecialidadId = drd.GetInt32(posEspecialidadId5);
                        obeProcesoOrdenAtencionPdf.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion5);
                        obeProcesoOrdenAtencionPdf.CodigoOA = drd.GetString(posCodigoOA5);
                        obeProcesoOrdenAtencionPdf.EstadoPrestacion = drd.GetString(posEstadoPrestacion5);
                        obeProcesoOrdenAtencionPdf.IdExpediente = drd.GetInt32(posIdExpediente5);
                        obeProcesoOrdenAtencionPdf.EstadoExpediente = drd.GetString(posEstadoExpediente5);
                        obeProcesoOrdenAtencionPdf.IdPaciente = drd.GetInt32(posIdPaciente5);
                        obeProcesoOrdenAtencionPdf.Paciente = drd.GetString(posPaciente5);
                        obeProcesoOrdenAtencionPdf.CodigoTipoPaciente = drd.GetString(posCodigoTipoPaciente5);
                        obeProcesoOrdenAtencionPdf.Cantidad = drd.GetDecimal(posCantidad5);
                        obeProcesoOrdenAtencionPdf.MontoImponiblePrestacion = drd.GetDecimal(posMontoImponiblePrestacion5);
                        obeProcesoOrdenAtencionPdf.Bonificacion = drd.GetDecimal(posBonificacion5);
                        obeProcesoOrdenAtencionPdf.ValorMedida = drd.GetDecimal(posValorMedida5);
                        obeProcesoOrdenAtencionPdf.TipoValor = drd.GetString(posTipoValor5);
                        obeProcesoOrdenAtencionPdf.Valor = drd.GetDecimal(posValor5);
                        obeProcesoOrdenAtencionPdf.Porcentaje = drd.GetDecimal(posPorcentaje5);
                        obeProcesoOrdenAtencionPdf.Importe = drd.GetDecimal(posImporte5);
                        obeProcesoOrdenAtencionPdf.ParteClinica = drd.GetDecimal(posParteClinica5);


                        obeProcesoOrdenAtencionPdf.MontoFacturar = drd.GetDecimal(posMontoFacturar);


                        obeProcesoOrdenAtencionPdf.Impuesto = drd.GetDecimal(posImpuesto5);
                        obeProcesoOrdenAtencionPdf.Total = drd.GetDecimal(posTotal5);
                        obeProcesoOrdenAtencionPdf.DocumentoEmitido = drd.GetString(posDocumentoEmitido5);
                        obeProcesoOrdenAtencionPdf.TipoComponente = drd.GetString(posTipoComponente5);
                        obeProcesoOrdenAtencionPdf.TipoAjuste = drd.GetString(posTipoAjuste5);

                        obeProcesoOrdenAtencionPdf.MontoImponiblePrestacionResumen = drd.GetDecimal(posMontoImponiblePrestacionResumen);
                        obeProcesoOrdenAtencionPdf.ImporteResumen = drd.GetDecimal(posImporteResumen);
                        obeProcesoOrdenAtencionPdf.ParteClinicaResumen = drd.GetDecimal(posParteClinicaResumen);
                        obeProcesoOrdenAtencionPdf.MontoFacturarResumen = drd.GetDecimal(posMontoFacturarResumen);

                        obeProcesoOrdenAtencionPdf.BonificacionResumen = drd.GetDecimal(posBonificacionResumen);
                        obeProcesoOrdenAtencionPdf.TotalResumen = drd.GetDecimal(posTotalResumen);

                        obeProcesoOrdenAtencionPdf.MontoImponiblePrestacionResumenMed = drd.GetDecimal(posMontoImponiblePrestacionResumenMed);
                        obeProcesoOrdenAtencionPdf.ImporteResumenMed = drd.GetDecimal(posImporteResumenMed);
                        obeProcesoOrdenAtencionPdf.ParteClinicaResumenMed = drd.GetDecimal(posParteClinicaResumenMed);
                        obeProcesoOrdenAtencionPdf.MontoFacturarResumenMed = drd.GetDecimal(MontoFacturarResumenMed);

                        obeProcesoOrdenAtencionPdf.BonificacionResumenMed = drd.GetDecimal(posBonificacionResumenMed);
                        obeProcesoOrdenAtencionPdf.TotalResumenMed = drd.GetDecimal(posTotalResumenMed);
                        obeProcesoOrdenAtencionPdf.ImporteTotal = drd.GetDecimal(posImporteTotal);
                        obeProcesoOrdenAtencionPdf.ImporteTotalResumen = drd.GetDecimal(posImporteTotalResumen);

                        lbeProcesoOrdenAtencionPdf.Add(obeProcesoOrdenAtencionPdf);
                    }
                    obeArchivoDigitalMedicoListas.ListaProcesoOrden = lbeProcesoOrdenAtencionPdf;
                }
                if (drd.NextResult())
                {
                    lbeTipoAtencion = new List<beCampoEntero>();
                    int posTipoAtencionId6 = drd.GetOrdinal("TipoAtencionId");
                    int posDescripcionLarga6 = drd.GetOrdinal("DescripcionLarga");
                    beCampoEntero obeTipoAtencion;
                    while (drd.Read())
                    {
                        obeTipoAtencion = new beCampoEntero();
                        obeTipoAtencion.campo1 = drd.GetInt32(posTipoAtencionId6);
                        obeTipoAtencion.campo2 = drd.GetString(posDescripcionLarga6);
                        lbeTipoAtencion.Add(obeTipoAtencion);
                    }
                    obeArchivoDigitalMedicoListas.ListaTipoAtencion = lbeTipoAtencion;
                }
                if (drd.NextResult())
                {
                    lbeServicio = new List<beCampoEntero>();
                    int posServicioId7 = drd.GetOrdinal("ServicioId");
                    int posDescripcion = drd.GetOrdinal("Descripcion");
                    beCampoEntero obeServicio;
                    while (drd.Read())
                    {
                        obeServicio = new beCampoEntero();
                        obeServicio.campo1 = drd.GetInt32(posServicioId7);
                        obeServicio.campo2 = drd.GetString(posDescripcion);
                        lbeServicio.Add(obeServicio);
                    }
                    obeArchivoDigitalMedicoListas.ListaServicio = lbeServicio;
                }
                if (drd.NextResult())
                {
                    lbePrestacion = new List<beCampoCadenaCorto>();
                    int posCodigoPrestacion8 = drd.GetOrdinal("CodigoPrestacion");
                    int posDescripcion8 = drd.GetOrdinal("Descripcion");
                    beCampoCadenaCorto obePrestacion;
                    while (drd.Read())
                    {
                        obePrestacion = new beCampoCadenaCorto();
                        obePrestacion.Campo1 = drd.GetString(posCodigoPrestacion8);
                        obePrestacion.Campo2 = drd.GetString(posDescripcion8);
                        lbePrestacion.Add(obePrestacion);
                    }
                    obeArchivoDigitalMedicoListas.ListaPrestacion = lbePrestacion;
                }
                if (drd.NextResult())
                {
                    lbeProcesoMedico = new List<beProcesoMedicoHorarioPdf2>();
                    int posPersonaId9 = drd.GetOrdinal("PersonaId");
                    int posFecha9 = drd.GetOrdinal("Fecha");
                    int posHoraInicio9 = drd.GetOrdinal("HoraInicio");
                    int posHoraFin9 = drd.GetOrdinal("HoraFin");
                    int posHorasProgramadas9 = drd.GetOrdinal("HorasProgramadas");
                    int posValorContrato9 = drd.GetOrdinal("ValorContrato");
                    int posImporte9 = drd.GetOrdinal("Importe");
                    int posBonificacion9 = drd.GetOrdinal("Bonificacion");
                    int posTotal9 = drd.GetOrdinal("Total");
                    int posDia9 = drd.GetOrdinal("Dia");
                    int posIndicadorFeriado9 = drd.GetOrdinal("IndicadorFeriado");
                    int posEspecialidad9 = drd.GetOrdinal("Especialidad");
                    int posTipoAtencion9 = drd.GetOrdinal("TipoAtencion");
                    int posImpuesto9 = drd.GetOrdinal("Impuesto");
                    int posTotalGeneral9 = drd.GetOrdinal("TotalGeneral");
                    int posDocumentoEmitido9 = drd.GetOrdinal("DocumentoEmitido");
                    beProcesoMedicoHorarioPdf2 obeProcesoMedicoHorarioPdf;
                    while (drd.Read())
                    {
                        obeProcesoMedicoHorarioPdf = new beProcesoMedicoHorarioPdf2();
                        obeProcesoMedicoHorarioPdf.PersonaId = drd.GetInt32(posPersonaId9);
                        obeProcesoMedicoHorarioPdf.Fecha = drd.GetString(posFecha9);
                        obeProcesoMedicoHorarioPdf.HoraInicio = drd.GetString(posHoraInicio9);
                        obeProcesoMedicoHorarioPdf.HoraFin = drd.GetString(posHoraFin9);
                        obeProcesoMedicoHorarioPdf.HorasProgramadas = drd.GetInt32(posHorasProgramadas9);
                        obeProcesoMedicoHorarioPdf.ValorContrato = drd.GetDecimal(posValorContrato9);
                        obeProcesoMedicoHorarioPdf.Importe = drd.GetDecimal(posImporte9);
                        obeProcesoMedicoHorarioPdf.Bonificacion = drd.GetDecimal(posBonificacion9);
                        obeProcesoMedicoHorarioPdf.Total = drd.GetDecimal(posTotal9);
                        obeProcesoMedicoHorarioPdf.Dia = drd.GetString(posDia9);
                        obeProcesoMedicoHorarioPdf.IndicadorFeriado = drd.GetBoolean(posIndicadorFeriado9);
                        obeProcesoMedicoHorarioPdf.Especialidad = drd.GetString(posEspecialidad9);
                        obeProcesoMedicoHorarioPdf.TipoAtencion = drd.GetString(posTipoAtencion9);
                        obeProcesoMedicoHorarioPdf.Impuesto = drd.GetDecimal(posImpuesto9);
                        obeProcesoMedicoHorarioPdf.TotalGeneral = drd.GetDecimal(posTotalGeneral9);
                        obeProcesoMedicoHorarioPdf.DocumentoEmitido = drd.GetString(posDocumentoEmitido9);
                        lbeProcesoMedico.Add(obeProcesoMedicoHorarioPdf);
                    }
                    obeArchivoDigitalMedicoListas.listaProcesoMedico = lbeProcesoMedico;
                }
                if (drd.NextResult())
                {
                    lbeArticulo = new List<beCampoCadenaCorto>();
                    int posArticuloId10 = drd.GetOrdinal("ArticuloId");
                    int posDescripcion10 = drd.GetOrdinal("Descripcion");
                    beCampoCadenaCorto obeArticulo;
                    while (drd.Read())
                    {
                        obeArticulo = new beCampoCadenaCorto();
                        obeArticulo.Campo1 = drd.GetString(posArticuloId10);
                        obeArticulo.Campo2 = drd.GetString(posDescripcion10);
                        lbeArticulo.Add(obeArticulo);
                    }
                    obeArchivoDigitalMedicoListas.ListaArticulo = lbeArticulo;
                }
                if (drd.NextResult())
                {
                    lbeProcesoMedico2 = new List<beProcesoMedicoHorarioPdf3>();
                    int posPersonaId11 = drd.GetOrdinal("PersonaId");
                    int posDescripcion11 = drd.GetOrdinal("Descripcion");
                    int posImporte11 = drd.GetOrdinal("Importe");
                    int posConceptoMontoFijoId11 = drd.GetOrdinal("ConceptoMontoFijoId");
                    int posConceptoMontoFijo11 = drd.GetOrdinal("ConceptMontoFijo");
                    int posIndicadorAdministrativo11 = drd.GetOrdinal("IndicadorAdministrativo");
                    int posPeriodo11 = drd.GetOrdinal("Periodo");
                    int posImpuesto11 = drd.GetOrdinal("Impuesto");
                    int posTotalGeneral11 = drd.GetOrdinal("TotalGeneral");
                    int posDocumentoEmitido11 = drd.GetOrdinal("DocumentoEmitido");
                    beProcesoMedicoHorarioPdf3 obeProcesoMedicoHorarioPdf3;
                    while (drd.Read())
                    {
                        obeProcesoMedicoHorarioPdf3 = new beProcesoMedicoHorarioPdf3();
                        obeProcesoMedicoHorarioPdf3.PersonaId = drd.GetInt32(posPersonaId11);
                        obeProcesoMedicoHorarioPdf3.Descripcion = drd.GetString(posDescripcion11);
                        obeProcesoMedicoHorarioPdf3.Importe = drd.GetDecimal(posImporte11);
                        obeProcesoMedicoHorarioPdf3.ConceptoMontoFijoId = drd.GetInt32(posConceptoMontoFijoId11);
                        obeProcesoMedicoHorarioPdf3.ConceptoMontoFijo = drd.GetString(posConceptoMontoFijo11);
                        obeProcesoMedicoHorarioPdf3.IndicadorAdministrativo = drd.GetBoolean(posIndicadorAdministrativo11);
                        obeProcesoMedicoHorarioPdf3.Periodo = drd.GetString(posPeriodo11);
                        obeProcesoMedicoHorarioPdf3.Impuesto = drd.GetDecimal(posImpuesto11);
                        obeProcesoMedicoHorarioPdf3.TotalGeneral = drd.GetDecimal(posTotalGeneral11);
                        obeProcesoMedicoHorarioPdf3.DocumentoEmitido = drd.GetString(posDocumentoEmitido11);
                        lbeProcesoMedico2.Add(obeProcesoMedicoHorarioPdf3);
                    }
                    obeArchivoDigitalMedicoListas.listaProcesoMedico2 = lbeProcesoMedico2;
                }
                if (drd.NextResult())
                {
                    lbePlanillaDescuento = new List<bePlanillaMedicoDescuento>();
                    int PersonaId = drd.GetOrdinal("PersonaId");
                    int Descripcion = drd.GetOrdinal("Descripcion");
                    int Descuento = drd.GetOrdinal("Descuento");
                    int DescuentoId = drd.GetOrdinal("DescuentoId");

                    bePlanillaMedicoDescuento obePlanillaDescuento;
                    while (drd.Read())
                    {
                        obePlanillaDescuento = new bePlanillaMedicoDescuento();
                        obePlanillaDescuento.PersonaId = drd.GetInt32(PersonaId);
                        obePlanillaDescuento.Descripcion = drd.GetString(Descripcion);
                        obePlanillaDescuento.Descuento = drd.GetDecimal(Descuento);
                        obePlanillaDescuento.DescuentoId = drd.GetInt32(DescuentoId);

                        lbePlanillaDescuento.Add(obePlanillaDescuento);
                    }
                    obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos = lbePlanillaDescuento;
                }
                drd.Close();
            }
            return (obeArchivoDigitalMedicoListas);
        }
        public beArchivoDigitalMedicoCSFRListas obtenerListasPdfCSFRDetalle(SqlConnection con, string sucursal, int planillaId, int personaId)
        {
            beArchivoDigitalMedicoCSFRListas obeArchivoDigitalMedicoListas = new beArchivoDigitalMedicoCSFRListas();
            beArchivoDigitalMedicoCabeceraPrincipalPdf obeArchivoDigitalMedicoCabeceraPrincipalPdf = null;
            beArchivoDigitalMedicoCabeceraPdf obeArchivoDigitalMedicoCabeceraPdf = null;
            beArchivoDigitalMedicoFacturacion obeArchivoDigitalMedicoFacturacion = null;
            List<beReporteLiquidacionVista4> lbeReporteLiquidacionVista4 = null;
            List<beProcesoOrdenAtencionCSFRPdf> lbeProcesoOrdenAtencionPdf = null;
            List<beCampoEntero> lbeTipoAtencion = null;
            List<beCampoEntero> lbeServicio = null;
            List<beCampoCadenaCorto> lbePrestacion = null;
            List<beProcesoMedicoHorarioPdf2> lbeProcesoMedico = null;
            List<beCampoCadenaCorto> lbeArticulo = null;
            List<beProcesoMedicoHorarioPdf3> lbeProcesoMedico2 = null;
            List<bePlanillaMedicoDescuento> lbePlanillaDescuento = null;
            List<bePlanillaMedicoConsolidado> lbePlanillaMedicoConsolidado = null;
            List<bePlanillaMedicoConsolidadoResumen> lbePlanillaMedicoConsolidadoResumen = null;
            List<bePlanillaMedicoConsolidadoResumenTipo> lbePlanillaMedicoConsolidadoResumenTipo = null;
            List<bePlanillaMedicoConsolidadoResumenTipo> lbePlanillaMedicoConsolidadoResumenTipoResumen = null;
            List<beCampoCadena3> lbeResumenAtenciones = null;
            List<beCampoCadenaCorto> lbeResumenEmpresa = null;
            List<beCampoCadenaCorto> lbeResumenServicios = null;
            List<beCampoCadenaCorto> lbeResumenEquipos = null;
            List<beCampoCadenaCorto> lbeResumenClinica = null;
            List<beCampoCadenaCorto> lbeResumenMedico = null;
            List<beCampoCadenaCorto> lbeResumenDetraccion = null;

            SqlCommand cmd = new SqlCommand("uspArchivoDigitalReporte_CSFR", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@SucursalId", sucursal);
            cmd.Parameters.AddWithValue("@PlanillaId", planillaId);
            cmd.Parameters.AddWithValue("@PersonaId", personaId);

            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                obeArchivoDigitalMedicoCabeceraPrincipalPdf = new beArchivoDigitalMedicoCabeceraPrincipalPdf();
                int posSucursalId1 = drd.GetOrdinal("SucursalId");
                int posSucursal1 = drd.GetOrdinal("Sucursal");
                int posCompania1 = drd.GetOrdinal("Compania");
                int posDireccion1 = drd.GetOrdinal("Direccion");
                int posTelefono1 = drd.GetOrdinal("Telefono");
                int posFax1 = drd.GetOrdinal("Fax");
                int posURL1 = drd.GetOrdinal("URL");
                int posRUC = drd.GetOrdinal("RUC");
                while (drd.Read())
                {
                    obeArchivoDigitalMedicoCabeceraPrincipalPdf.SucursalId = drd.GetString(posSucursalId1).Trim();
                    obeArchivoDigitalMedicoCabeceraPrincipalPdf.Sucursal = drd.GetString(posSucursal1).Trim();
                    obeArchivoDigitalMedicoCabeceraPrincipalPdf.Compania = drd.GetString(posCompania1).Trim();
                    obeArchivoDigitalMedicoCabeceraPrincipalPdf.Direccion = drd.GetString(posDireccion1).Trim();
                    obeArchivoDigitalMedicoCabeceraPrincipalPdf.Telefono = drd.GetString(posTelefono1).Trim();
                    obeArchivoDigitalMedicoCabeceraPrincipalPdf.Fax = drd.GetString(posFax1).Trim();
                    obeArchivoDigitalMedicoCabeceraPrincipalPdf.URL = drd.GetString(posURL1).Trim();
                    obeArchivoDigitalMedicoCabeceraPrincipalPdf.RUC = drd.GetString(posRUC);
                }
                obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPrincipal = obeArchivoDigitalMedicoCabeceraPrincipalPdf;
                if (drd.NextResult())
                {
                    obeArchivoDigitalMedicoCabeceraPdf = new beArchivoDigitalMedicoCabeceraPdf();
                    int posDescripcion2 = drd.GetOrdinal("Descripcion");
                    int posTipoAdmisionId2 = drd.GetOrdinal("TipoAdmisionId");
                    int posAnio2 = drd.GetOrdinal("Anio");
                    int posMes2 = drd.GetOrdinal("Mes");
                    int posTipoAdmision2 = drd.GetOrdinal("TipoAdmision");
                    int posFechaInicio2 = drd.GetOrdinal("FechaInicio");
                    int posFechaFin2 = drd.GetOrdinal("FechaFin");

                    while (drd.Read())
                    {
                        obeArchivoDigitalMedicoCabeceraPdf.Descripcion = drd.GetString(posDescripcion2).Trim();
                        obeArchivoDigitalMedicoCabeceraPdf.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId2).ToString();
                        obeArchivoDigitalMedicoCabeceraPdf.Anio = drd.GetInt32(posAnio2).ToString();
                        obeArchivoDigitalMedicoCabeceraPdf.Mes = drd.GetInt32(posMes2).ToString();
                        obeArchivoDigitalMedicoCabeceraPdf.TipoAdmision = drd.GetString(posTipoAdmision2);
                        obeArchivoDigitalMedicoCabeceraPdf.FechaInicio = drd.GetDateTime(posFechaInicio2);
                        obeArchivoDigitalMedicoCabeceraPdf.FechaFin = drd.GetDateTime(posFechaFin2);
                    }
                    obeArchivoDigitalMedicoListas.ArchivoDigitalMedicoCabeceraPdf = obeArchivoDigitalMedicoCabeceraPdf;
                }
                if (drd.NextResult())
                {
                    obeArchivoDigitalMedicoFacturacion = new beArchivoDigitalMedicoFacturacion();
                    int posProcesoId3 = drd.GetOrdinal("ProcesoId");
                    int posFacturar3 = drd.GetOrdinal("Facturar");
                    int posNumeroDocumento3 = drd.GetOrdinal("NumeroDocumento");
                    int posCodigoUsuario3 = drd.GetOrdinal("CodigoUsuario");
                    int posFechaHoraCierre3 = drd.GetOrdinal("FechaHoraCierre");
                    int posNombrePDF3 = drd.GetOrdinal("NombrePDF");
                    int posPeriodoProvision3 = drd.GetOrdinal("PeriodoProvision");

                    while (drd.Read())
                    {
                        obeArchivoDigitalMedicoFacturacion.ProcesoId = drd.GetInt32(posProcesoId3);
                        obeArchivoDigitalMedicoFacturacion.Facturar = drd.GetString(posFacturar3);
                        obeArchivoDigitalMedicoFacturacion.NumeroDocumento = drd.GetString(posNumeroDocumento3);
                        obeArchivoDigitalMedicoFacturacion.CodigoUsuario = drd.GetString(posCodigoUsuario3);
                        obeArchivoDigitalMedicoFacturacion.FechaHoraCierre = drd.GetDateTime(posFechaHoraCierre3);
                        obeArchivoDigitalMedicoFacturacion.NombrePDF = drd.GetString(posNombrePDF3);
                        obeArchivoDigitalMedicoFacturacion.PeriodoProvision = drd.GetString(posPeriodoProvision3);
                    }
                    obeArchivoDigitalMedicoListas.MedicoEmpresaFacturar = obeArchivoDigitalMedicoFacturacion;
                }
                if (drd.NextResult())
                {
                    lbeReporteLiquidacionVista4 = new List<beReporteLiquidacionVista4>();
                    int posPersonaId4 = drd.GetOrdinal("PersonaId");
                    int posNombreCompleto4 = drd.GetOrdinal("NombreCompleto");
                    int posEspecialidadId4 = drd.GetOrdinal("EspecialidadId");
                    int posEspecialidad4 = drd.GetOrdinal("Especialidad");
                    int posCodigoImpuesto4 = drd.GetOrdinal("CodigoImpuesto");
                    int posFactorPorcentaje4 = drd.GetOrdinal("FactorPorcentaje");
                    int posTipoImpuestoId4 = drd.GetOrdinal("TipoImpuestoId");
                    beReporteLiquidacionVista4 obeMedico;
                    while (drd.Read())
                    {
                        obeMedico = new beReporteLiquidacionVista4();
                        obeMedico.PersonaId = drd.GetInt32(posPersonaId4);
                        obeMedico.NombreCompleto = drd.GetString(posNombreCompleto4);
                        obeMedico.EspecialidadId = drd.GetInt32(posEspecialidadId4);
                        obeMedico.Especialidad = drd.GetString(posEspecialidad4);
                        obeMedico.CodigoImpuesto = drd.GetString(posCodigoImpuesto4);
                        obeMedico.FactorPorcentaje = drd.GetDecimal(posFactorPorcentaje4);
                        obeMedico.TipoImpuestoId = drd.GetString(posTipoImpuestoId4);
                        lbeReporteLiquidacionVista4.Add(obeMedico);
                    }
                    obeArchivoDigitalMedicoListas.ListaMedicos = lbeReporteLiquidacionVista4;
                }
                if (drd.NextResult())
                {
                    lbeProcesoOrdenAtencionPdf = new List<beProcesoOrdenAtencionCSFRPdf>();
                    int posItem = drd.GetOrdinal("Item");
                    int posFecha = drd.GetOrdinal("Fecha");
                    int posPrefactura = drd.GetOrdinal("Prefactura");
                    int posEntidad = drd.GetOrdinal("Entidad");
                    int posPaciente = drd.GetOrdinal("Paciente");
                    int posDescripcion = drd.GetOrdinal("Descripcion");
                    int posOrigen = drd.GetOrdinal("Origen");
                    int posConcepto = drd.GetOrdinal("Concepto");
                    int posTotal = drd.GetOrdinal("Total");
                    int posClinica = drd.GetOrdinal("Clinica");
                    int posMedico = drd.GetOrdinal("Medico");
                    int posSucursal = drd.GetOrdinal("Sucursal");

                    beProcesoOrdenAtencionCSFRPdf obeProcesoOrdenAtencionPdf;
                    while (drd.Read())
                    {
                        obeProcesoOrdenAtencionPdf = new beProcesoOrdenAtencionCSFRPdf();
                        obeProcesoOrdenAtencionPdf.Item = drd.GetInt32(posItem);
                        obeProcesoOrdenAtencionPdf.Fecha = drd.GetDateTime(posFecha);
                        obeProcesoOrdenAtencionPdf.Prefactura = drd.GetString(posPrefactura);
                        obeProcesoOrdenAtencionPdf.Entidad = drd.GetString(posEntidad);
                        obeProcesoOrdenAtencionPdf.Paciente = drd.GetString(posPaciente);
                        obeProcesoOrdenAtencionPdf.Descripcion = drd.GetString(posDescripcion);
                        obeProcesoOrdenAtencionPdf.Origen = drd.GetString(posOrigen);
                        obeProcesoOrdenAtencionPdf.Concepto = drd.GetString(posConcepto);
                        obeProcesoOrdenAtencionPdf.Total = drd.GetDecimal(posTotal);
                        obeProcesoOrdenAtencionPdf.Clinica = drd.GetDecimal(posClinica);
                        obeProcesoOrdenAtencionPdf.Medico = drd.GetDecimal(posMedico);
                        obeProcesoOrdenAtencionPdf.Sucursal = drd.GetString(posSucursal);

                        lbeProcesoOrdenAtencionPdf.Add(obeProcesoOrdenAtencionPdf);
                    }
                    obeArchivoDigitalMedicoListas.ListaProcesoOrden = lbeProcesoOrdenAtencionPdf;
                }
                if (drd.NextResult())
                {
                    lbeTipoAtencion = new List<beCampoEntero>();
                    int posTipoAtencionId6 = drd.GetOrdinal("TipoAtencionId");
                    int posDescripcionLarga6 = drd.GetOrdinal("DescripcionLarga");
                    beCampoEntero obeTipoAtencion;
                    while (drd.Read())
                    {
                        obeTipoAtencion = new beCampoEntero();
                        obeTipoAtencion.campo1 = drd.GetInt32(posTipoAtencionId6);
                        obeTipoAtencion.campo2 = drd.GetString(posDescripcionLarga6);
                        lbeTipoAtencion.Add(obeTipoAtencion);
                    }
                    obeArchivoDigitalMedicoListas.ListaTipoAtencion = lbeTipoAtencion;
                }
                if (drd.NextResult())
                {
                    lbeServicio = new List<beCampoEntero>();
                    int posServicioId7 = drd.GetOrdinal("ServicioId");
                    int posDescripcion = drd.GetOrdinal("Descripcion");
                    beCampoEntero obeServicio;
                    while (drd.Read())
                    {
                        obeServicio = new beCampoEntero();
                        obeServicio.campo1 = drd.GetInt32(posServicioId7);
                        obeServicio.campo2 = drd.GetString(posDescripcion);
                        lbeServicio.Add(obeServicio);
                    }
                    obeArchivoDigitalMedicoListas.ListaServicio = lbeServicio;
                }
                if (drd.NextResult())
                {
                    lbePrestacion = new List<beCampoCadenaCorto>();
                    int posCodigoPrestacion8 = drd.GetOrdinal("CodigoPrestacion");
                    int posDescripcion8 = drd.GetOrdinal("Descripcion");
                    beCampoCadenaCorto obePrestacion;
                    while (drd.Read())
                    {
                        obePrestacion = new beCampoCadenaCorto();
                        obePrestacion.Campo1 = drd.GetString(posCodigoPrestacion8);
                        obePrestacion.Campo2 = drd.GetString(posDescripcion8);
                        lbePrestacion.Add(obePrestacion);
                    }
                    obeArchivoDigitalMedicoListas.ListaPrestacion = lbePrestacion;
                }
                if (drd.NextResult())
                {
                    lbeProcesoMedico = new List<beProcesoMedicoHorarioPdf2>();
                    int posPersonaId9 = drd.GetOrdinal("PersonaId");
                    int posFecha9 = drd.GetOrdinal("Fecha");
                    int posHoraInicio9 = drd.GetOrdinal("HoraInicio");
                    int posHoraFin9 = drd.GetOrdinal("HoraFin");
                    int posHorasProgramadas9 = drd.GetOrdinal("HorasProgramadas");
                    int posValorContrato9 = drd.GetOrdinal("ValorContrato");
                    int posImporte9 = drd.GetOrdinal("Importe");
                    int posBonificacion9 = drd.GetOrdinal("Bonificacion");
                    int posTotal9 = drd.GetOrdinal("Total");
                    int posDia9 = drd.GetOrdinal("Dia");
                    int posIndicadorFeriado9 = drd.GetOrdinal("IndicadorFeriado");
                    int posEspecialidad9 = drd.GetOrdinal("Especialidad");
                    int posTipoAtencion9 = drd.GetOrdinal("TipoAtencion");
                    int posImpuesto9 = drd.GetOrdinal("Impuesto");
                    int posTotalGeneral9 = drd.GetOrdinal("TotalGeneral");
                    int posDocumentoEmitido9 = drd.GetOrdinal("DocumentoEmitido");
                    beProcesoMedicoHorarioPdf2 obeProcesoMedicoHorarioPdf;
                    while (drd.Read())
                    {
                        obeProcesoMedicoHorarioPdf = new beProcesoMedicoHorarioPdf2();
                        obeProcesoMedicoHorarioPdf.PersonaId = drd.GetInt32(posPersonaId9);
                        obeProcesoMedicoHorarioPdf.Fecha = drd.GetString(posFecha9);
                        obeProcesoMedicoHorarioPdf.HoraInicio = drd.GetString(posHoraInicio9);
                        obeProcesoMedicoHorarioPdf.HoraFin = drd.GetString(posHoraFin9);
                        obeProcesoMedicoHorarioPdf.HorasProgramadas = drd.GetInt32(posHorasProgramadas9);
                        obeProcesoMedicoHorarioPdf.ValorContrato = drd.GetDecimal(posValorContrato9);
                        obeProcesoMedicoHorarioPdf.Importe = drd.GetDecimal(posImporte9);
                        obeProcesoMedicoHorarioPdf.Bonificacion = drd.GetDecimal(posBonificacion9);
                        obeProcesoMedicoHorarioPdf.Total = drd.GetDecimal(posTotal9);
                        obeProcesoMedicoHorarioPdf.Dia = drd.GetString(posDia9);
                        obeProcesoMedicoHorarioPdf.IndicadorFeriado = drd.GetBoolean(posIndicadorFeriado9);
                        obeProcesoMedicoHorarioPdf.Especialidad = drd.GetString(posEspecialidad9);
                        obeProcesoMedicoHorarioPdf.TipoAtencion = drd.GetString(posTipoAtencion9);
                        obeProcesoMedicoHorarioPdf.Impuesto = drd.GetDecimal(posImpuesto9);
                        obeProcesoMedicoHorarioPdf.TotalGeneral = drd.GetDecimal(posTotalGeneral9);
                        obeProcesoMedicoHorarioPdf.DocumentoEmitido = drd.GetString(posDocumentoEmitido9);
                        lbeProcesoMedico.Add(obeProcesoMedicoHorarioPdf);
                    }
                    obeArchivoDigitalMedicoListas.listaProcesoMedico = lbeProcesoMedico;
                }
                if (drd.NextResult())
                {
                    lbeArticulo = new List<beCampoCadenaCorto>();
                    int posArticuloId10 = drd.GetOrdinal("ArticuloId");
                    int posDescripcion10 = drd.GetOrdinal("Descripcion");
                    beCampoCadenaCorto obeArticulo;
                    while (drd.Read())
                    {
                        obeArticulo = new beCampoCadenaCorto();
                        obeArticulo.Campo1 = drd.GetString(posArticuloId10);
                        obeArticulo.Campo2 = drd.GetString(posDescripcion10);
                        lbeArticulo.Add(obeArticulo);
                    }
                    obeArchivoDigitalMedicoListas.ListaArticulo = lbeArticulo;
                }
                if (drd.NextResult())
                {
                    lbeProcesoMedico2 = new List<beProcesoMedicoHorarioPdf3>();
                    int posPersonaId11 = drd.GetOrdinal("PersonaId");
                    int posDescripcion11 = drd.GetOrdinal("Descripcion");
                    int posImporte11 = drd.GetOrdinal("Importe");
                    int posConceptoMontoFijoId11 = drd.GetOrdinal("ConceptoMontoFijoId");
                    int posConceptoMontoFijo11 = drd.GetOrdinal("ConceptMontoFijo");
                    int posIndicadorAdministrativo11 = drd.GetOrdinal("IndicadorAdministrativo");
                    int posPeriodo11 = drd.GetOrdinal("Periodo");
                    int posImpuesto11 = drd.GetOrdinal("Impuesto");
                    int posTotalGeneral11 = drd.GetOrdinal("TotalGeneral");
                    int posDocumentoEmitido11 = drd.GetOrdinal("DocumentoEmitido");
                    beProcesoMedicoHorarioPdf3 obeProcesoMedicoHorarioPdf3;
                    while (drd.Read())
                    {
                        obeProcesoMedicoHorarioPdf3 = new beProcesoMedicoHorarioPdf3();
                        obeProcesoMedicoHorarioPdf3.PersonaId = drd.GetInt32(posPersonaId11);
                        obeProcesoMedicoHorarioPdf3.Descripcion = drd.GetString(posDescripcion11);
                        obeProcesoMedicoHorarioPdf3.Importe = drd.GetDecimal(posImporte11);
                        obeProcesoMedicoHorarioPdf3.ConceptoMontoFijoId = drd.GetInt32(posConceptoMontoFijoId11);
                        obeProcesoMedicoHorarioPdf3.ConceptoMontoFijo = drd.GetString(posConceptoMontoFijo11);
                        obeProcesoMedicoHorarioPdf3.IndicadorAdministrativo = drd.GetBoolean(posIndicadorAdministrativo11);
                        obeProcesoMedicoHorarioPdf3.Periodo = drd.GetString(posPeriodo11);
                        obeProcesoMedicoHorarioPdf3.Impuesto = drd.GetDecimal(posImpuesto11);
                        obeProcesoMedicoHorarioPdf3.TotalGeneral = drd.GetDecimal(posTotalGeneral11);
                        obeProcesoMedicoHorarioPdf3.DocumentoEmitido = drd.GetString(posDocumentoEmitido11);
                        lbeProcesoMedico2.Add(obeProcesoMedicoHorarioPdf3);
                    }
                    obeArchivoDigitalMedicoListas.listaProcesoMedico2 = lbeProcesoMedico2;
                }
                if (drd.NextResult())
                {
                    lbePlanillaDescuento = new List<bePlanillaMedicoDescuento>();
                    int PersonaId = drd.GetOrdinal("PersonaId");
                    int Descripcion = drd.GetOrdinal("Descripcion");
                    int Descuento = drd.GetOrdinal("Descuento");
                    int DescuentoId = drd.GetOrdinal("DescuentoId");

                    bePlanillaMedicoDescuento obePlanillaDescuento;
                    while (drd.Read())
                    {
                        obePlanillaDescuento = new bePlanillaMedicoDescuento();
                        obePlanillaDescuento.PersonaId = drd.GetInt32(PersonaId);
                        obePlanillaDescuento.Descripcion = drd.GetString(Descripcion);
                        obePlanillaDescuento.Descuento = drd.GetDecimal(Descuento);
                        obePlanillaDescuento.DescuentoId = drd.GetInt32(DescuentoId);

                        lbePlanillaDescuento.Add(obePlanillaDescuento);
                    }
                    obeArchivoDigitalMedicoListas.ListaPlanillaMedicoDescuentos = lbePlanillaDescuento;
                }
                if (drd.NextResult())
                {
                    lbeResumenAtenciones = new List<beCampoCadena3>();
                    int posServicio = drd.GetOrdinal("Servicio");
                    int posTipoAtencion = drd.GetOrdinal("TipoAtencion");
                    int posMonto = drd.GetOrdinal("Monto");
                    beCampoCadena3 obeResumenAtenciones;
                    while (drd.Read())
                    {
                        obeResumenAtenciones = new beCampoCadena3();
                        obeResumenAtenciones.Campo1 = drd.GetString(posServicio);
                        obeResumenAtenciones.Campo2 = drd.GetString(posTipoAtencion);
                        obeResumenAtenciones.Campo3 = drd.GetString(posMonto);
                        lbeResumenAtenciones.Add(obeResumenAtenciones);
                    }
                    obeArchivoDigitalMedicoListas.ListaResumenAtenciones = lbeResumenAtenciones;
                }
                if (drd.NextResult())
                {
                    lbeResumenEmpresa = new List<beCampoCadenaCorto>();
                    int posDescripcion = drd.GetOrdinal("Descripcion");
                    int posValor = drd.GetOrdinal("Valor");
                    beCampoCadenaCorto obeResumenEmpresa;
                    while (drd.Read())
                    {
                        obeResumenEmpresa = new beCampoCadenaCorto();
                        obeResumenEmpresa.Campo1 = drd.GetString(posDescripcion);
                        obeResumenEmpresa.Campo2 = drd.GetString(posValor);
                        lbeResumenEmpresa.Add(obeResumenEmpresa);
                    }
                    obeArchivoDigitalMedicoListas.ListaResumenEmpresa = lbeResumenEmpresa;
                }
                if (drd.NextResult())
                {
                    lbeResumenServicios = new List<beCampoCadenaCorto>();
                    int posDescripcion1 = drd.GetOrdinal("Descripcion");
                    int posValor1 = drd.GetOrdinal("Valor");
                    beCampoCadenaCorto obeResumenServicios;
                    while (drd.Read())
                    {
                        obeResumenServicios = new beCampoCadenaCorto();
                        obeResumenServicios.Campo1 = drd.GetString(posDescripcion1);
                        obeResumenServicios.Campo2 = drd.GetString(posValor1);
                        lbeResumenServicios.Add(obeResumenServicios);
                    }
                    obeArchivoDigitalMedicoListas.ListaResumenServicios = lbeResumenServicios;
                }
                if (drd.NextResult())
                {
                    lbeResumenEquipos = new List<beCampoCadenaCorto>();
                    int posDescripcion2 = drd.GetOrdinal("Descripcion");
                    int posValor2 = drd.GetOrdinal("Valor");
                    beCampoCadenaCorto obeResumenEquipos;
                    while (drd.Read())
                    {
                        obeResumenEquipos = new beCampoCadenaCorto();
                        obeResumenEquipos.Campo1 = drd.GetString(posDescripcion2);
                        obeResumenEquipos.Campo2 = drd.GetString(posValor2);
                        lbeResumenEquipos.Add(obeResumenEquipos);
                    }
                    obeArchivoDigitalMedicoListas.ListaResumenEquipos = lbeResumenEquipos;
                }
                if (drd.NextResult())
                {
                    lbeResumenClinica = new List<beCampoCadenaCorto>();
                    int posDescripcion3 = drd.GetOrdinal("Descripcion");
                    int posValor3 = drd.GetOrdinal("Valor");
                    beCampoCadenaCorto obeResumenClinica;
                    while (drd.Read())
                    {
                        obeResumenClinica = new beCampoCadenaCorto();
                        obeResumenClinica.Campo1 = drd.GetString(posDescripcion3);
                        obeResumenClinica.Campo2 = drd.GetString(posValor3);
                        lbeResumenClinica.Add(obeResumenClinica);
                    }
                    obeArchivoDigitalMedicoListas.ListaResumenClinica = lbeResumenClinica;
                }
                if (drd.NextResult())
                {
                    lbeResumenMedico = new List<beCampoCadenaCorto>();
                    int posDescripcion4 = drd.GetOrdinal("Descripcion");
                    int posValor4 = drd.GetOrdinal("Valor");
                    beCampoCadenaCorto obeResumenMedico;
                    while (drd.Read())
                    {
                        obeResumenMedico = new beCampoCadenaCorto();
                        obeResumenMedico.Campo1 = drd.GetString(posDescripcion4);
                        obeResumenMedico.Campo2 = drd.GetString(posValor4);
                        lbeResumenMedico.Add(obeResumenMedico);
                    }
                    obeArchivoDigitalMedicoListas.ListaResumenMedico = lbeResumenMedico;
                }
                if (drd.NextResult())
                {
                    lbeResumenDetraccion = new List<beCampoCadenaCorto>();
                    int posDescripcion5 = drd.GetOrdinal("Descripcion");
                    int posValor5 = drd.GetOrdinal("Valor");
                    beCampoCadenaCorto obeResumenDetraccion;
                    while (drd.Read())
                    {
                        obeResumenDetraccion = new beCampoCadenaCorto();
                        obeResumenDetraccion.Campo1 = drd.GetString(posDescripcion5);
                        obeResumenDetraccion.Campo2 = drd.GetString(posValor5);
                        lbeResumenDetraccion.Add(obeResumenDetraccion);
                    }
                    obeArchivoDigitalMedicoListas.ListaResumenDetraccion = lbeResumenDetraccion;
                }
                if (drd.NextResult())
                {
                    lbePlanillaMedicoConsolidado = new List<bePlanillaMedicoConsolidado>();
                    int posItem = drd.GetOrdinal("Item");
                    int posIdPlanilla = drd.GetOrdinal("IdPlanilla");
                    int posPeriodo = drd.GetOrdinal("Periodo");
                    int posFechaInicio = drd.GetOrdinal("FechaInicio");
                    int posFechaFin = drd.GetOrdinal("FechaFin");
                    int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
                    int posTipoServicio = drd.GetOrdinal("TipoServicio");
                    int posMontoTotal = drd.GetOrdinal("MontoTotal");
                    int posMontoMedico = drd.GetOrdinal("MontoMedico");
                    int posMontoClinica = drd.GetOrdinal("MontoClinica");
                    bePlanillaMedicoConsolidado obePlanillaMedicoConsolidado;
                    while (drd.Read())
                    {
                        obePlanillaMedicoConsolidado = new bePlanillaMedicoConsolidado();
                        obePlanillaMedicoConsolidado.Item = drd.GetString(posItem);
                        obePlanillaMedicoConsolidado.IdPlanilla = drd.GetString(posIdPlanilla);
                        obePlanillaMedicoConsolidado.Periodo = drd.GetString(posPeriodo);
                        obePlanillaMedicoConsolidado.FechaInicio = drd.GetDateTime(posFechaInicio);
                        obePlanillaMedicoConsolidado.FechaFin = drd.GetDateTime(posFechaFin);
                        obePlanillaMedicoConsolidado.TipoAdmision = drd.GetString(posTipoAdmision);
                        obePlanillaMedicoConsolidado.TipoServicio = drd.GetString(posTipoServicio);
                        obePlanillaMedicoConsolidado.MontoTotal = drd.GetDecimal(posMontoTotal);
                        obePlanillaMedicoConsolidado.MontoMedico = drd.GetDecimal(posMontoMedico);
                        obePlanillaMedicoConsolidado.MontoClinica = drd.GetDecimal(posMontoClinica);
                        lbePlanillaMedicoConsolidado.Add(obePlanillaMedicoConsolidado);
                    }
                    obeArchivoDigitalMedicoListas.listaPlanillaMedicoConsolidado = lbePlanillaMedicoConsolidado;
                }
                if (drd.NextResult())
                {
                    lbePlanillaMedicoConsolidadoResumen = new List<bePlanillaMedicoConsolidadoResumen>();
                    int posDescripcion = drd.GetOrdinal("Descripcion");
                    int posTotal = drd.GetOrdinal("Total");
                    int posMedico = drd.GetOrdinal("Medico");
                    int posClinica = drd.GetOrdinal("Clinica");
                    bePlanillaMedicoConsolidadoResumen obePlanillaMedicoConsolidadoResumen;
                    while (drd.Read())
                    {
                        obePlanillaMedicoConsolidadoResumen = new bePlanillaMedicoConsolidadoResumen();
                        obePlanillaMedicoConsolidadoResumen.Descripcion = drd.GetString(posDescripcion);
                        obePlanillaMedicoConsolidadoResumen.Total = drd.GetDecimal(posTotal);
                        obePlanillaMedicoConsolidadoResumen.Medico = drd.GetDecimal(posMedico);
                        obePlanillaMedicoConsolidadoResumen.Clinica = drd.GetDecimal(posClinica);
                        lbePlanillaMedicoConsolidadoResumen.Add(obePlanillaMedicoConsolidadoResumen);
                    }
                    obeArchivoDigitalMedicoListas.listaPlanillaMedicoConsolidadoResumen = lbePlanillaMedicoConsolidadoResumen;
                }
                if (drd.NextResult())
                {
                    lbePlanillaMedicoConsolidadoResumenTipo = new List<bePlanillaMedicoConsolidadoResumenTipo>();
                    int posDescripcion = drd.GetOrdinal("Descripcion");
                    int posMedico = drd.GetOrdinal("Medico");
                    int posClinica = drd.GetOrdinal("Clinica");
                    int posTotal = drd.GetOrdinal("Total");
                    int posIGV = drd.GetOrdinal("IGV");
                    int posNeto = drd.GetOrdinal("Neto");
                    bePlanillaMedicoConsolidadoResumenTipo obePlanillaMedicoConsolidadoResumenTipo;
                    while (drd.Read())
                    {
                        obePlanillaMedicoConsolidadoResumenTipo = new bePlanillaMedicoConsolidadoResumenTipo();
                        obePlanillaMedicoConsolidadoResumenTipo.Descripcion = drd.GetString(posDescripcion);
                        obePlanillaMedicoConsolidadoResumenTipo.Medico = drd.GetDecimal(posMedico);
                        obePlanillaMedicoConsolidadoResumenTipo.Clinica = drd.GetDecimal(posClinica);
                        obePlanillaMedicoConsolidadoResumenTipo.Total = drd.GetDecimal(posTotal);
                        obePlanillaMedicoConsolidadoResumenTipo.IGV = drd.GetDecimal(posIGV);
                        obePlanillaMedicoConsolidadoResumenTipo.Neto = drd.GetDecimal(posNeto);
                        lbePlanillaMedicoConsolidadoResumenTipo.Add(obePlanillaMedicoConsolidadoResumenTipo);
                    }
                    obeArchivoDigitalMedicoListas.listaPlanillaMedicoConsolidadoResumenTipo = lbePlanillaMedicoConsolidadoResumenTipo;
                }
                if (drd.NextResult())
                {
                    lbePlanillaMedicoConsolidadoResumenTipoResumen = new List<bePlanillaMedicoConsolidadoResumenTipo>();
                    int posDescripcion = drd.GetOrdinal("Descripcion");
                    int posMedico = drd.GetOrdinal("Medico");
                    int posClinica = drd.GetOrdinal("Clinica");
                    int posTotal = drd.GetOrdinal("Total");
                    int posIGV = drd.GetOrdinal("IGV");
                    int posNeto = drd.GetOrdinal("Neto");
                    bePlanillaMedicoConsolidadoResumenTipo obePlanillaMedicoConsolidadoResumenTipoResumen;
                    while (drd.Read())
                    {
                        obePlanillaMedicoConsolidadoResumenTipoResumen = new bePlanillaMedicoConsolidadoResumenTipo();
                        obePlanillaMedicoConsolidadoResumenTipoResumen.Descripcion = drd.GetString(posDescripcion);
                        obePlanillaMedicoConsolidadoResumenTipoResumen.Medico = drd.GetDecimal(posMedico);
                        obePlanillaMedicoConsolidadoResumenTipoResumen.Clinica = drd.GetDecimal(posClinica);
                        obePlanillaMedicoConsolidadoResumenTipoResumen.Total = drd.GetDecimal(posTotal);
                        obePlanillaMedicoConsolidadoResumenTipoResumen.IGV = drd.GetDecimal(posIGV);
                        obePlanillaMedicoConsolidadoResumenTipoResumen.Neto = drd.GetDecimal(posNeto);
                        lbePlanillaMedicoConsolidadoResumenTipoResumen.Add(obePlanillaMedicoConsolidadoResumenTipoResumen);
                    }
                    obeArchivoDigitalMedicoListas.listaPlanillaMedicoConsolidadoResumenTipoResumen = lbePlanillaMedicoConsolidadoResumenTipoResumen;
                }
                drd.Close();
            }
            return (obeArchivoDigitalMedicoListas);
        }

        public bool actualizarEstados(SqlConnection con, string lista, string estado, int usuarioId, string su)
        {
            bool exito = false;
            SqlCommand cmd = new SqlCommand("uspArchivoDigitalActualizarEstado", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ListaPlanillaPersonaId", lista);
            cmd.Parameters.AddWithValue("@Estado", estado);
            cmd.Parameters.AddWithValue("@UsuarioId", usuarioId);
            cmd.Parameters.AddWithValue("@SucursalId", su);
            int n = cmd.ExecuteNonQuery();
            if (n > 0) exito = true;
            return (exito);
        }

        public beArchivoDigitalPlantillaCorreo obtenerPlantilla(SqlConnection con, string sucursal, int usuarioId)
        {
            beArchivoDigitalPlantillaCorreo obeArchivoDigitalPlantillaCorreo = new beArchivoDigitalPlantillaCorreo();
            List<beCampoCadena3> listaVariables = null;

            SqlCommand cmd = new SqlCommand("uspResponsableCorreoListarPorUsuario", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UsuarioId", usuarioId);
            cmd.Parameters.AddWithValue("@SucursalId", sucursal);

            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                beCampoCadena3 obeCampoCadena3 = new beCampoCadena3();
                int posAsunto = drd.GetOrdinal("Asunto");
                int posCuerpo = drd.GetOrdinal("Cuerpo");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");

                while (drd.Read())
                {
                    obeCampoCadena3.Campo1 = drd.GetString(posAsunto);
                    obeCampoCadena3.Campo2 = drd.GetString(posCuerpo);
                    obeCampoCadena3.Campo3 = drd.GetString(posEstadoRegistro);
                }
                obeArchivoDigitalPlantillaCorreo.plantilla = obeCampoCadena3;

                if (drd.NextResult())
                {
                    listaVariables = new List<beCampoCadena3>();

                    int posVariableCorreoId = drd.GetOrdinal("VariableCorreoId");
                    int posDescripcion = drd.GetOrdinal("Descripcion");
                    int posEstadoRegistro1 = drd.GetOrdinal("EstadoRegistro");

                    beCampoCadena3 obeVariables;
                    while (drd.Read())
                    {
                        obeVariables = new beCampoCadena3();
                        obeVariables.Campo1 = drd.GetString(posVariableCorreoId);
                        obeVariables.Campo2 = drd.GetString(posDescripcion);
                        obeVariables.Campo3 = drd.GetString(posEstadoRegistro1);
                        listaVariables.Add(obeVariables);
                    }
                    obeArchivoDigitalPlantillaCorreo.listaVariables = listaVariables;
                }
                drd.Close();
            }
            return (obeArchivoDigitalPlantillaCorreo);
        }
    }
}
