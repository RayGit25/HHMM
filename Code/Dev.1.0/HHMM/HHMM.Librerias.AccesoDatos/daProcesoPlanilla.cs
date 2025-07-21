using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using General.Librerias.EntidadesNegocio;
using HHMM.Librerias.EntidadesNegocio;
using System.Configuration;
using System.IO;

namespace HHMM.Librerias.AccesoDatos
{
    public class daProcesoPlanilla
    {
        public List<beProcesoPlanilla> listar(SqlConnection con, beProcesoPlanilla obeProcesoPlanilla, string or)
        {
            List<beProcesoPlanilla> lbeProcesoPlanilla = null;
            SqlCommand cmd = new SqlCommand("uspPlanillaProcesoListarV2", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@SucursalId", obeProcesoPlanilla.SucursalId);
            cmd.Parameters.AddWithValue("@Mes", obeProcesoPlanilla.Mes);
            cmd.Parameters.AddWithValue("@Anio", obeProcesoPlanilla.Anio);
            cmd.Parameters.AddWithValue("@FechaInicio", obeProcesoPlanilla.PeriodoFechaInicio);
            cmd.Parameters.AddWithValue("@FechaFin", obeProcesoPlanilla.PeriodoFechaFin);
            cmd.Parameters.AddWithValue("@OrdenAtencion", or);
            cmd.Parameters.AddWithValue("@MedicoId", obeProcesoPlanilla.MedicoId);
            cmd.Parameters.AddWithValue("@PacienteId", obeProcesoPlanilla.PacienteId);
            cmd.Parameters.AddWithValue("@ProcesoPlanillaId", obeProcesoPlanilla.ProcesoPlanillaId);
            cmd.Parameters.AddWithValue("@PlanillaId", obeProcesoPlanilla.PlanillaId);

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
            if (drd != null)
            {
                lbeProcesoPlanilla = new List<beProcesoPlanilla>();
                int posPeriodoId = drd.GetOrdinal("PeriodoId");
                int posSucursal = drd.GetOrdinal("Sucursal");
                int posProcesoPlanillaId = drd.GetOrdinal("ProcesoPlanillaId");
                int posDescripcion = drd.GetOrdinal("Descripcion");
                int posPeriodo = drd.GetOrdinal("Periodo");
                int posFechaInicio = drd.GetOrdinal("FechaInicio");
                int posFechaFin = drd.GetOrdinal("FechaFin");
                int posCantidad = drd.GetOrdinal("Cantidad");
                int posImporteTotal = drd.GetOrdinal("ImporteTotal");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
                int posTipoPlanilla = drd.GetOrdinal("TipoPlanilla");
                while (drd.Read())
                {
                    obeProcesoPlanilla = new beProcesoPlanilla();
                    obeProcesoPlanilla.PeriodoId = drd.GetInt32(posPeriodoId);
                    obeProcesoPlanilla.Sucursal = drd.GetString(posSucursal);
                    obeProcesoPlanilla.ProcesoPlanillaId = drd.GetInt32(posProcesoPlanillaId);
                    obeProcesoPlanilla.Descripcion = drd.GetString(posDescripcion);
                    obeProcesoPlanilla.Periodo = drd.GetString(posPeriodo);
                    obeProcesoPlanilla.PeriodoFechaInicio = drd.GetDateTime(posFechaInicio);
                    obeProcesoPlanilla.PeriodoFechaFin = drd.GetDateTime(posFechaFin);
                    obeProcesoPlanilla.Cantidad = drd.GetInt32(posCantidad);
                    obeProcesoPlanilla.Total = drd.GetDecimal(posImporteTotal);
                    obeProcesoPlanilla.Estado = drd.GetString(posEstadoRegistro);
                    obeProcesoPlanilla.TipoProceso = drd.GetInt32(posTipoPlanilla);
                    lbeProcesoPlanilla.Add(obeProcesoPlanilla);
                }

                drd.Close();
            }
            return lbeProcesoPlanilla;
        }

        public beProcesoPlanillaVistaListas listarProvisionPlanilla(SqlConnection con, string su, int periodo, string oa, int me, int pa, int pro, string ip, string bd)
        {
            beProcesoPlanillaVistaListas obeProcesoPlanillaVistaListas = null;
            List<beProcesoPlanillaVista> lbeProcesoPlanilla = null;
            SqlCommand cmd = null;
            if (ip != null && bd != null)
            {
                cmd = new SqlCommand("uspPlanillaProcesoMedicoListarV1", con);
            }
            else
            {
                cmd = new SqlCommand("uspPlanillaProcesoMedicoListar", con);
            }
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@SucursalId", su);
            cmd.Parameters.AddWithValue("@PeriodoId", periodo);
            cmd.Parameters.AddWithValue("@CodigoOA", oa);
            cmd.Parameters.AddWithValue("@MedicoId", me);
            cmd.Parameters.AddWithValue("@PacienteId", pa);
            cmd.Parameters.AddWithValue("@ProcesoPlanillaId", pro);
            if (ip != null && bd != null)
            {
                cmd.Parameters.AddWithValue("@IP", ip);
                cmd.Parameters.AddWithValue("@BaseDatos", bd);
            }

            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                obeProcesoPlanillaVistaListas = new beProcesoPlanillaVistaListas();
                lbeProcesoPlanilla = new List<beProcesoPlanillaVista>();

                int posPlanillaId = drd.GetOrdinal("PlanillaId");
                int posMedico = drd.GetOrdinal("Medico");
                int posImporte = drd.GetOrdinal("Importe");
                int posBonificacion = drd.GetOrdinal("Bonificacion");
                int posDescuento = drd.GetOrdinal("Descuento");
                int posAjuste = drd.GetOrdinal("Ajuste");
                int posTotal = drd.GetOrdinal("Total");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
                int posTipoDocumentoPagoId = drd.GetOrdinal("TipoDocumentoPagoId");
                int posDocumento = drd.GetOrdinal("Documento");
                int posFechaEmision = drd.GetOrdinal("FechaEmision");
                int posPersonaId = drd.GetOrdinal("PersonaId");
                int posCMP = drd.GetOrdinal("CMP");
                beProcesoPlanillaVista obeProcesoPlanilla;
                while (drd.Read())
                {
                    obeProcesoPlanilla = new beProcesoPlanillaVista();
                    obeProcesoPlanilla.PlanillaId = drd.GetInt32(posPlanillaId);
                    obeProcesoPlanilla.Medico = drd.GetString(posMedico);
                    obeProcesoPlanilla.Importe = drd.GetDecimal(posImporte);
                    obeProcesoPlanilla.Bonificacion = drd.GetDecimal(posBonificacion);
                    obeProcesoPlanilla.Descuento = drd.GetDecimal(posDescuento);
                    obeProcesoPlanilla.Ajuste = drd.GetDecimal(posAjuste);
                    obeProcesoPlanilla.Total = drd.GetDecimal(posTotal);
                    obeProcesoPlanilla.Estado = drd.GetString(posEstadoRegistro);
                    obeProcesoPlanilla.TipoDocumentoPagoId = drd.GetString(posTipoDocumentoPagoId);
                    obeProcesoPlanilla.Documento = drd.GetString(posDocumento);
                    obeProcesoPlanilla.FechaEmision = drd.GetDateTime(posFechaEmision);
                    obeProcesoPlanilla.PersonaId = drd.GetInt32(posPersonaId);
                    obeProcesoPlanilla.CMP = drd.GetString(posCMP);
                    lbeProcesoPlanilla.Add(obeProcesoPlanilla);
                }
                obeProcesoPlanillaVistaListas.ListaProcesoPlanillaVista = lbeProcesoPlanilla;
                if (drd.NextResult())
                {
                    List<beCampoCadenaCorto> lbeTipoDocumento = null;
                    lbeTipoDocumento = new List<beCampoCadenaCorto>();

                    int posTipoDocumentoPagoId2 = drd.GetOrdinal("TipoDocumentoPagoId");
                    int posDescripcion = drd.GetOrdinal("Descripcion");
                    beCampoCadenaCorto obeCampoCadenaCorto;
                    while (drd.Read())
                    {
                        obeCampoCadenaCorto = new beCampoCadenaCorto();
                        obeCampoCadenaCorto.Campo1 = drd.GetString(posTipoDocumentoPagoId2);
                        obeCampoCadenaCorto.Campo2 = drd.GetString(posDescripcion);
                        lbeTipoDocumento.Add(obeCampoCadenaCorto);
                    }
                    obeProcesoPlanillaVistaListas.ListaTipoDocumento = lbeTipoDocumento;
                }
                drd.Close();
            }
            return obeProcesoPlanillaVistaListas;
        }

        public string ProvisionPlanillaActualizarEstado(SqlConnection con, string lista, string estado, int id)
        {
            SqlCommand cmd = new SqlCommand("uspPlanillaProcesoMedicoActualizarEstado", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@ListaPlanillaId", SqlDbType.VarChar);
            par1.Direction = ParameterDirection.Input;
            par1.Value = lista;
            SqlParameter par2 = cmd.Parameters.Add("@Estado", SqlDbType.Char);
            par2.Direction = ParameterDirection.Input;
            par2.Value = estado;
            SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = id;


            object n = cmd.ExecuteScalar();
            string resultado = n.ToString();
            return (resultado);

        }

        public int ProvisionPlanillaObligacionRevertir(SqlConnection con, int id, string lista, string su, int usu, string ip, string bd)
        {
            SqlCommand cmd = null;
            if (ip != null && bd != null)
            {
                cmd = new SqlCommand("uspPlanillaMedicoObligacionRevertirV1", con);
            }
            else
            {
                cmd = new SqlCommand("uspPlanillaMedicoObligacionRevertir", con);
            }
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 0;
            SqlParameter par1 = cmd.Parameters.Add("@ProcesoPlanillaId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = id;
            SqlParameter par2 = cmd.Parameters.Add("@ListaPlanillaId", SqlDbType.VarChar);
            par2.Direction = ParameterDirection.Input;
            par2.Value = lista;
            SqlParameter par3 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
            par3.Direction = ParameterDirection.Input;
            par3.Value = su;
            SqlParameter par4 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
            par4.Direction = ParameterDirection.Input;
            par4.Value = usu;

            if (ip != null && bd != null)
            {
                SqlParameter par5 = cmd.Parameters.Add("@IP", SqlDbType.VarChar, 80);
                par5.Direction = ParameterDirection.Input;
                par5.Value = ip;

                SqlParameter par6 = cmd.Parameters.Add("@BaseDatos", SqlDbType.VarChar, 80);
                par6.Direction = ParameterDirection.Input;
                par6.Value = bd;
            }


            object n = cmd.ExecuteScalar();
            int resultado = (n.ToString() == "-1" ? -1 : 0);
            return (resultado);
        }
        public int ProvisionPlanillaObligacionRevertirCSFR(SqlConnection con, int id, string lista, string su, int usu, string ip, string bd)
        {
            SqlCommand cmd = null;

            cmd = new SqlCommand("uspPlanillaMedicoObligacionRevertirV2", con);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 0;
            SqlParameter par1 = cmd.Parameters.Add("@ProcesoPlanillaId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = id;
            SqlParameter par2 = cmd.Parameters.Add("@ListaPlanillaId", SqlDbType.VarChar);
            par2.Direction = ParameterDirection.Input;
            par2.Value = lista;
            SqlParameter par3 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
            par3.Direction = ParameterDirection.Input;
            par3.Value = su;
            SqlParameter par4 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
            par4.Direction = ParameterDirection.Input;
            par4.Value = usu;

            if (ip != null && bd != null)
            {
                SqlParameter par5 = cmd.Parameters.Add("@IP", SqlDbType.VarChar, 80);
                par5.Direction = ParameterDirection.Input;
                par5.Value = ip;

                SqlParameter par6 = cmd.Parameters.Add("@BaseDatos", SqlDbType.VarChar, 80);
                par6.Direction = ParameterDirection.Input;
                par6.Value = bd;
            }


            object n = cmd.ExecuteScalar();
            int resultado = (n.ToString() == "-1" ? -1 : 0);
            return (resultado);
        }

        public int ProvisionPlanillaObligacionRevertirPagado(SqlConnection con, int id, string lista, string su, int usu, string ip, string bd)
        {
            SqlCommand cmd = null;
            //if (ip != null && bd != null)
            //{
            //    cmd = new SqlCommand("uspPlanillaMedicoObligacionRevertirV1", con);
            //}
            //else
            //{
            //    cmd = new SqlCommand("uspPlanillaMedicoObligacionRevertir", con);
            //}
            cmd = new SqlCommand("uspPlanillaMedicoPagoRevertir", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 0;
            SqlParameter par1 = cmd.Parameters.Add("@ProcesoPlanillaId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = id;
            SqlParameter par2 = cmd.Parameters.Add("@ListaPlanillaId", SqlDbType.VarChar);
            par2.Direction = ParameterDirection.Input;
            par2.Value = lista;
            SqlParameter par3 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
            par3.Direction = ParameterDirection.Input;
            par3.Value = su;
            SqlParameter par4 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
            par4.Direction = ParameterDirection.Input;
            par4.Value = usu;

            if (ip != null && bd != null)
            {
                SqlParameter par5 = cmd.Parameters.Add("@IP", SqlDbType.VarChar, 80);
                par5.Direction = ParameterDirection.Input;
                par5.Value = ip;

                SqlParameter par6 = cmd.Parameters.Add("@BaseDatos", SqlDbType.VarChar, 80);
                par6.Direction = ParameterDirection.Input;
                par6.Value = bd;
            }


            object n = cmd.ExecuteScalar();
            int resultado = (n.ToString() == "-1" ? -1 : 0);
            return (resultado);
        }

        public beDetalleOAListas listarDetalledeConceptosOA(SqlConnection con, int id)
        {
            beDetalleOAListas obeDetalleOAListas = null;
            List<beDetalleOA> lbeDetalleOA = null;
            SqlCommand cmd = new SqlCommand("uspPlanillaMedicoDetalleOAListar", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlParameter par1 = cmd.Parameters.Add("@PlanillaId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = id;
            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                obeDetalleOAListas = new beDetalleOAListas();
                lbeDetalleOA = new List<beDetalleOA>();
                int posCodigoOA1 = drd.GetOrdinal("CodigoOA");
                int posPaciente1 = drd.GetOrdinal("Paciente");
                int posIdExpediente1 = drd.GetOrdinal("IdExpediente");
                int posPrestacion1 = drd.GetOrdinal("Prestacion");
                int posFechaAtencionPrestacion1 = drd.GetOrdinal("FechaAtencionPrestacion");
                int posFechaAtendido1 = drd.GetOrdinal("FechaAtendido");
                int posFechaTerminado1 = drd.GetOrdinal("FechaTerminado");
                int posPrecioUnitarioPrestacion1 = drd.GetOrdinal("PrecioUnitarioPrestacion");
                int posCostoPrestacion1 = drd.GetOrdinal("CostoPrestacion");
                int posCantidad1 = drd.GetOrdinal("Cantidad");
                int posMontoImponiblePrestacion1 = drd.GetOrdinal("MontoImponiblePrestacion");
                int posValorMedida1 = drd.GetOrdinal("ValorMedida");
                int posTipoValor1 = drd.GetOrdinal("TipoValor");
                int posValor1 = drd.GetOrdinal("Valor");
                int posPorcentaje1 = drd.GetOrdinal("Porcentaje");
                int posImporte1 = drd.GetOrdinal("Importe");
                int posParteClinica1 = drd.GetOrdinal("ParteClinica");
                int posAjuste1 = drd.GetOrdinal("Ajuste");
                int posBonificacion1 = drd.GetOrdinal("Bonificacion");
                int posImporteProvision1 = drd.GetOrdinal("ImporteProvision");
                int posAjusteProcesoId1 = drd.GetOrdinal("AjusteProcesoId");
                int posAjusteTipoRegistro1 = drd.GetOrdinal("AjusteTipoRegistro");
                int posFechaInicioOA1 = drd.GetOrdinal("FechaInicioOA");
                int posTipoPaciente1 = drd.GetOrdinal("TipoPaciente");
                int posTipoAtencion1 = drd.GetOrdinal("TipoAtencion");
                int posAseguradora1 = drd.GetOrdinal("Aseguradora");
                int posServicio1 = drd.GetOrdinal("Servicio");
                int posEspecialidad1 = drd.GetOrdinal("Especialidad");
                int posDescripcionEstadoPrestacion1 = drd.GetOrdinal("DescripcionEstadoPrestacion");
                int posIdOrdenAtencion1 = drd.GetOrdinal("IdOrdenAtencion");
                int posLineaOrdenAtencion1 = drd.GetOrdinal("LineaOrdenAtencion");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
                int posIndicadorIncluidoPlanilla = drd.GetOrdinal("IndicadorIncluidoPlanilla");
                beDetalleOA obeDetalleOA;
                while (drd.Read())
                {
                    obeDetalleOA = new beDetalleOA();

                    obeDetalleOA.CodigoOA = drd.GetString(posCodigoOA1);
                    obeDetalleOA.Paciente = drd.GetString(posPaciente1);
                    obeDetalleOA.IdExpediente = drd.GetInt32(posIdExpediente1);
                    obeDetalleOA.Prestacion = drd.GetString(posPrestacion1);
                    obeDetalleOA.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion1);
                    obeDetalleOA.FechaAtendido = drd.GetDateTime(posFechaAtendido1);
                    obeDetalleOA.FechaTerminado = drd.GetDateTime(posFechaTerminado1);
                    obeDetalleOA.PrecioUnitarioPrestacion = drd.GetDecimal(posPrecioUnitarioPrestacion1);
                    obeDetalleOA.CostoPrestacion = drd.GetDecimal(posCostoPrestacion1);
                    obeDetalleOA.Cantidad = drd.GetDecimal(posCantidad1);
                    obeDetalleOA.MontoImponiblePrestacion = drd.GetDecimal(posMontoImponiblePrestacion1);
                    obeDetalleOA.ValorMedida = drd.GetDecimal(posValorMedida1);
                    obeDetalleOA.TipoValor = drd.GetString(posTipoValor1);
                    obeDetalleOA.Valor = drd.GetDecimal(posValor1);
                    obeDetalleOA.Porcentaje = drd.GetDecimal(posPorcentaje1);
                    obeDetalleOA.Importe = drd.GetDecimal(posImporte1);
                    obeDetalleOA.ParteClinica = drd.GetDecimal(posParteClinica1);
                    obeDetalleOA.Ajuste = drd.GetDecimal(posAjuste1);
                    obeDetalleOA.Bonificacion = drd.GetDecimal(posBonificacion1);
                    obeDetalleOA.ImporteProvision = drd.GetDecimal(posImporteProvision1);
                    obeDetalleOA.AjusteProcesoId = drd.GetInt32(posAjusteProcesoId1);
                    obeDetalleOA.AjusteTipoRegistro = drd.GetString(posAjusteTipoRegistro1);
                    obeDetalleOA.FechaInicioOA = drd.GetDateTime(posFechaInicioOA1);
                    obeDetalleOA.TipoPaciente = drd.GetString(posTipoPaciente1);
                    obeDetalleOA.TipoAtencion = drd.GetString(posTipoAtencion1);
                    obeDetalleOA.Aseguradora = drd.GetString(posAseguradora1);
                    obeDetalleOA.Servicio = drd.GetString(posServicio1);
                    obeDetalleOA.Especialidad = drd.GetString(posEspecialidad1);
                    obeDetalleOA.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion1);
                    obeDetalleOA.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion1);
                    obeDetalleOA.DescripcionEstadoPrestacion = drd.GetString(posDescripcionEstadoPrestacion1);
                    obeDetalleOA.EstadoRegistro = drd.GetString(posEstadoRegistro);
                    obeDetalleOA.IndicadorIncluidoPlanilla = drd.GetBoolean(posIndicadorIncluidoPlanilla);
                    lbeDetalleOA.Add(obeDetalleOA);
                }
                obeDetalleOAListas.ListaDetalle1 = lbeDetalleOA;
                List<beDetalleOAHorario> lbeDetalleErrorHorarioLista = new List<beDetalleOAHorario>();
                if (drd.NextResult())
                {
                    int posFecha2 = drd.GetOrdinal("Fecha");
                    int posHoraInicio2 = drd.GetOrdinal("HoraInicio");
                    int posHoraFin2 = drd.GetOrdinal("HoraFin");
                    int posHorasProgramadas2 = drd.GetOrdinal("HorasProgramadas");
                    int posDia2 = drd.GetOrdinal("Dia");
                    int posValorContrato2 = drd.GetOrdinal("ValorContrato");
                    int posImporte2 = drd.GetOrdinal("Importe");
                    int posBonificacion2 = drd.GetOrdinal("Bonificacion");
                    int posTotal2 = drd.GetOrdinal("Total");
                    int posIndicadorFeriado2 = drd.GetOrdinal("IndicadorFeriado");
                    int posEspecialidad2 = drd.GetOrdinal("Especialidad");
                    int posTipoAtencion2 = drd.GetOrdinal("TipoAtencion");
                    beDetalleOAHorario obeDetalleErrorHorarioLista;
                    while (drd.Read())
                    {
                        obeDetalleErrorHorarioLista = new beDetalleOAHorario();
                        obeDetalleErrorHorarioLista.Fecha = drd.GetString(posFecha2);
                        obeDetalleErrorHorarioLista.HoraInicio = drd.GetString(posHoraInicio2);
                        obeDetalleErrorHorarioLista.HoraFin = drd.GetString(posHoraFin2);
                        obeDetalleErrorHorarioLista.HorasProgramadas = drd.GetDecimal(posHorasProgramadas2);
                        obeDetalleErrorHorarioLista.ValorContratado = drd.GetDecimal(posValorContrato2);
                        obeDetalleErrorHorarioLista.Importe = drd.GetDecimal(posImporte2);
                        obeDetalleErrorHorarioLista.Bonificacion = drd.GetDecimal(posBonificacion2);
                        obeDetalleErrorHorarioLista.Total = drd.GetDecimal(posTotal2);
                        obeDetalleErrorHorarioLista.Dia = drd.GetString(posDia2);
                        obeDetalleErrorHorarioLista.IndicadorFeriado = drd.GetBoolean(posIndicadorFeriado2);
                        obeDetalleErrorHorarioLista.Especialidad = drd.GetString(posEspecialidad2);
                        obeDetalleErrorHorarioLista.TipoAtencion = drd.GetString(posTipoAtencion2);
                        lbeDetalleErrorHorarioLista.Add(obeDetalleErrorHorarioLista);
                    }
                    obeDetalleOAListas.ListaHorario = lbeDetalleErrorHorarioLista;
                }
                List<beDetalleOAMontoFijo> lbeDetalleOAMontoFijo = new List<beDetalleOAMontoFijo>();
                if (drd.NextResult())
                {
                    int posSucursalId3 = drd.GetOrdinal("SucursalId");
                    int posSucursal3 = drd.GetOrdinal("Sucursal");
                    int posPeriodo3 = drd.GetOrdinal("Periodo");
                    int posMedicoEmpresaId3 = drd.GetOrdinal("MedicoEmpresaId");
                    int posEmpresa3 = drd.GetOrdinal("Empresa");
                    int posIdMedico3 = drd.GetOrdinal("IdMedico");
                    int posMedico3 = drd.GetOrdinal("Medico");
                    int posDescripcion3 = drd.GetOrdinal("Descripcion");
                    int posImporte3 = drd.GetOrdinal("Importe");
                    int posConceptoMontoFijoId3 = drd.GetOrdinal("ConceptoMontoFijoId");
                    int posConcepto3 = drd.GetOrdinal("Concepto");
                    beDetalleOAMontoFijo obeDetalleOAMontoFijo;
                    while (drd.Read())
                    {
                        obeDetalleOAMontoFijo = new beDetalleOAMontoFijo();
                        obeDetalleOAMontoFijo.SucursalId = drd.GetString(posSucursalId3);
                        obeDetalleOAMontoFijo.Sucursal = drd.GetString(posSucursal3);
                        obeDetalleOAMontoFijo.Periodo = drd.GetString(posPeriodo3);
                        obeDetalleOAMontoFijo.MedicoEmpresaId = drd.GetInt32(posMedicoEmpresaId3);
                        obeDetalleOAMontoFijo.Empresa = drd.GetString(posEmpresa3);
                        obeDetalleOAMontoFijo.IdMedico = drd.GetInt32(posIdMedico3);
                        obeDetalleOAMontoFijo.Medico = drd.GetString(posMedico3);
                        obeDetalleOAMontoFijo.Descripcion = drd.GetString(posDescripcion3);
                        obeDetalleOAMontoFijo.Importe = drd.GetDecimal(posImporte3);
                        obeDetalleOAMontoFijo.ConceptoMontoFijoId = drd.GetInt32(posConceptoMontoFijoId3);
                        obeDetalleOAMontoFijo.Concepto = drd.GetString(posConcepto3);
                        lbeDetalleOAMontoFijo.Add(obeDetalleOAMontoFijo);
                    }
                    obeDetalleOAListas.ListaMontoFijo = lbeDetalleOAMontoFijo;
                }
                drd.Close();
            }


            return obeDetalleOAListas;
        }

        public string CargarPlanillaExcel(SqlConnection con, string su, string lista, int id, int tipo)
        {
            string rpta = "";
            SqlCommand cmd = new SqlCommand("uspPlanillaExcelCargarV2", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@SucursalId", su);
            cmd.Parameters.AddWithValue("@ListaOAs", lista);
            cmd.Parameters.AddWithValue("@UsuarioId", id);
            cmd.Parameters.AddWithValue("@TipoPlanilla", tipo);
            cmd.CommandTimeout = 0;
            object drd = cmd.ExecuteScalar();
            if (drd != null)
            {
                rpta = drd.ToString();
            }
            return rpta;
        }

        public string AnularPlanilla(SqlConnection con, int id, int usuario, string idCompania)
        {
            string exito = "";
            SqlCommand cmd = new SqlCommand("uspPlanillaAnular", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlanillaId", id);
            cmd.Parameters.AddWithValue("@UsuarioId", usuario);
            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
            if (drd != null)
            {
                string rutapdf = ConfigurationManager.AppSettings["rutaPDF-" + idCompania];
                int posNombrePDF = drd.GetOrdinal("NombrePDF");
                string archivo = "";
                while (drd.Read())
                {
                    archivo = rutapdf + "\\" + drd.GetString(posNombrePDF);
                    if (File.Exists(archivo))
                    {
                        File.Delete(archivo);
                    }
                }
                exito = "OK";
            }
            return (exito);
        }

        public string AnularProcesoPlanilla(SqlConnection con, int id, int usuario, string idCompania)
        {
            
            string exito = "";
            
            SqlCommand cmd = new SqlCommand("uspPlanillaProcesoAnular", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ProcesoPlanillaId", id);
            cmd.Parameters.AddWithValue("@UsuarioId", usuario);
            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
            if (drd != null)
            {
               
                string rutapdf = ConfigurationManager.AppSettings["rutaPDF-" + idCompania];
                int posNombrePDF = drd.GetOrdinal("NombrePDF");
                string archivo = "";
                while (drd.Read())
                {
                    archivo = rutapdf + "\\" + drd.GetString(posNombrePDF);
                    if (File.Exists(archivo))
                    {
                        File.Delete(archivo);
                    }
                }
                exito = "OK";
            }
            return (exito);
        }

        public string ActualizarDesProcesoPlanilla(SqlConnection con, string descripcion, int id, int usuario)
        {
            string rpta = "";
            SqlCommand cmd = new SqlCommand("uspPlanillaProcesoActualizar", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ProcesoPlanillaId", id);
            cmd.Parameters.AddWithValue("@Descripcion", descripcion);
            cmd.Parameters.AddWithValue("@UsuarioId", usuario);
            int n = cmd.ExecuteNonQuery();
            if (n > 0) rpta = "OK";
            return rpta;
        }
    }
}
