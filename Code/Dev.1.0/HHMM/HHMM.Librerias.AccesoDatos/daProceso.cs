using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using General.Librerias.EntidadesNegocio;
using HHMM.Librerias.EntidadesNegocio;


namespace HHMM.Librerias.AccesoDatos
{
	public class daProceso
	{
		public List<beProceso> listar(SqlConnection con, beProceso obeProceso, string or)
		{
			List<beProceso> lbeProceso = null;
			SqlCommand cmd = new SqlCommand("uspProcesoProvisionListarV3", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;
			cmd.Parameters.AddWithValue("@SucursalId", obeProceso.SucursalId);
			cmd.Parameters.AddWithValue("@Mes", obeProceso.Mes);
			cmd.Parameters.AddWithValue("@Anio", obeProceso.Anio);
			cmd.Parameters.AddWithValue("@FechaInicio", obeProceso.PeriodoFechaInicio);
			cmd.Parameters.AddWithValue("@FechaFin", obeProceso.PeriodoFechaFin);
			cmd.Parameters.AddWithValue("@OrdenAtencion", or);
			cmd.Parameters.AddWithValue("@MedicoId", obeProceso.MedicoId);
			cmd.Parameters.AddWithValue("@PacienteId", obeProceso.PacienteId);

			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbeProceso = new List<beProceso>();
				int posProcesoId = drd.GetOrdinal("ProcesoId");
				int posSucursalId = drd.GetOrdinal("SucursalId");
				int posSucursal = drd.GetOrdinal("Sucursal");
				int posPeriodo = drd.GetOrdinal("Periodo");
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
				int posCantidad = drd.GetOrdinal("Cantidad");
				int posTotalProvision = drd.GetOrdinal("TotalProvision");
				int posEstadoProvision = drd.GetOrdinal("EstadoProvision");
				int posDescripcion = drd.GetOrdinal("Descripcion");
				int posPeriodoId = drd.GetOrdinal("PeriodoId");
				int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
				int posListaPago = drd.GetOrdinal("ListaPago");
				int posEstadoPeriodo = drd.GetOrdinal("EstadoPeriodo");
				int posDescripcionProceso = drd.GetOrdinal("DescripcionProceso");
				int posIndicadorDescuadre = drd.GetOrdinal("IndicadorDescuadre");
				int posIndicadorRangoDias = drd.GetOrdinal("IndicadorRangoDias");
				while (drd.Read())
				{
					obeProceso = new beProceso();
					obeProceso.ProcesoId = drd.GetInt32(posProcesoId);
					obeProceso.SucursalId = drd.GetString(posSucursalId);
					obeProceso.Sucursal = drd.GetString(posSucursal);
					obeProceso.Periodo = drd.GetString(posPeriodo);
					obeProceso.PeriodoFechaInicio = drd.GetDateTime(posFechaInicio);
					obeProceso.PeriodoFechaFin = drd.GetDateTime(posFechaFin);
					obeProceso.TipoAdmision = drd.GetString(posTipoAdmision);
					obeProceso.Cantidad = drd.GetInt32(posCantidad);
					obeProceso.TotalProvision = drd.GetDecimal(posTotalProvision);
					obeProceso.EstadoProvision = drd.GetString(posEstadoProvision);
					obeProceso.Descripcion = drd.GetString(posDescripcion);
					obeProceso.PeriodoId = drd.GetInt32(posPeriodoId);
					obeProceso.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
					obeProceso.ListaPago = drd.GetString(posListaPago);
					obeProceso.EstadoPeriodo = drd.GetString(posEstadoPeriodo);
					obeProceso.DescripcionProceso = drd.GetString(posDescripcionProceso);
					obeProceso.IndicadorDescuadre = drd.GetBoolean(posIndicadorDescuadre);
					obeProceso.IndicadorRangoDias = drd.GetBoolean(posIndicadorRangoDias);
					lbeProceso.Add(obeProceso);
				}

				drd.Close();
			}
			return lbeProceso;
		}
		public beProcesoListar listarProcesoListas(SqlConnection con, beProceso obeProceso)
		{
			beProcesoListar obeProcesoListar = null;

			List<bePeriodo> lbePeriodo = null;
			List<beTipoAdmision> lbeTipoAdmision = null;
			List<beCampoEntero> lbeConfiguracion = null;
			List<beCampoCadenaCorto> lbeMensajeProvision = null;
			List<beCampoCadenaCorto> lbeMensajePlanilla = null;
			SqlCommand cmd = new SqlCommand("uspProcesoProvisionListas", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", obeProceso.SucursalId);

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				lbeTipoAdmision = new List<beTipoAdmision>();
				beTipoAdmision obeTipoAdmision = null;

				int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
				int posDescripcion = drd.GetOrdinal("Descripcion");

				while (drd.Read())
				{
					obeTipoAdmision = new beTipoAdmision();
					obeTipoAdmision.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
					obeTipoAdmision.Descripcion = drd.GetString(posDescripcion);
					lbeTipoAdmision.Add(obeTipoAdmision);
				}

				drd.NextResult();

				lbePeriodo = new List<bePeriodo>();
				bePeriodo obePeriodo = null;

				int pos2PeriodoId = drd.GetOrdinal("PeriodoId");
				int pos2Periodo = drd.GetOrdinal("Periodo");
				int pos2FechaInicio = drd.GetOrdinal("FechaInicio");
				int pos2FechaFin = drd.GetOrdinal("FechaFin");
				int pos2EstadoProvision = drd.GetOrdinal("EstadoProvision");

				while (drd.Read())
				{
					obePeriodo = new bePeriodo();
					obePeriodo.PeriodoId = drd.GetInt32(pos2PeriodoId);
					obePeriodo.Periodo = drd.GetString(pos2Periodo);
					obePeriodo.FechaInicio = drd.GetDateTime(pos2FechaInicio);
					obePeriodo.FechaFin = drd.GetDateTime(pos2FechaFin);
					obePeriodo.EstadoProvisionFec = drd.GetString(pos2EstadoProvision);
					lbePeriodo.Add(obePeriodo);
				}

				drd.NextResult();

				lbeConfiguracion = new List<beCampoEntero>();
				beCampoEntero obeConfiguracion = null;

				int posConfiguracionPagoId = drd.GetOrdinal("ConfiguracionPagoId");
				int posDescripcion2 = drd.GetOrdinal("Descripcion");

				while (drd.Read())
				{
					obeConfiguracion = new beCampoEntero();
					obeConfiguracion.campo1 = drd.GetInt32(posConfiguracionPagoId);
					obeConfiguracion.campo2 = drd.GetString(posDescripcion2);
					lbeConfiguracion.Add(obeConfiguracion);
				}

				drd.NextResult();

				lbeMensajeProvision = new List<beCampoCadenaCorto>();
				beCampoCadenaCorto obeMensajeProvision = null;

				int posCodigo = drd.GetOrdinal("Codigo");
				int posDescripcion3 = drd.GetOrdinal("Descripcion");

				while (drd.Read())
				{
					obeMensajeProvision = new beCampoCadenaCorto();
					obeMensajeProvision.Campo1 = drd.GetString(posCodigo);
					obeMensajeProvision.Campo2 = drd.GetString(posDescripcion3);
					lbeMensajeProvision.Add(obeMensajeProvision);
				}

				drd.NextResult();

				lbeMensajePlanilla = new List<beCampoCadenaCorto>();
				beCampoCadenaCorto obeMensajePlanilla = null;

				int posCodigo1 = drd.GetOrdinal("Codigo");
				int posDescripcion4 = drd.GetOrdinal("Descripcion");

				while (drd.Read())
				{
					obeMensajePlanilla = new beCampoCadenaCorto();
					obeMensajePlanilla.Campo1 = drd.GetString(posCodigo1);
					obeMensajePlanilla.Campo2 = drd.GetString(posDescripcion4);
					lbeMensajePlanilla.Add(obeMensajePlanilla);
				}
				drd.Close();
			}


			obeProcesoListar = new beProcesoListar();
			obeProcesoListar.ListaTipoAdmision = lbeTipoAdmision;
			obeProcesoListar.ListaPeriodo = lbePeriodo;
			obeProcesoListar.ListaConfiguracionPagos = lbeConfiguracion;
			obeProcesoListar.ListaMensajesProvision = lbeMensajeProvision;
			obeProcesoListar.ListaMensajesPlanilla = lbeMensajePlanilla;
			return obeProcesoListar;
		}
		public int Adicionar(SqlConnection con, beProceso obeProceso, bool indicador1, bool indicador2, bool indicador3, bool indicador4, bool indicador5, bool indicador6, bool indicador7, bool indicador8, bool indicador9, DateTime indicador10, DateTime indicador11,bool indicador12)
		{
			SqlCommand cmd = new SqlCommand("uspProcesoProvisionAdicionarV4", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;
			cmd.Parameters.AddWithValue("@SucursalId", obeProceso.SucursalId);
			cmd.Parameters.AddWithValue("@PeriodoId", obeProceso.PeriodoId);
			cmd.Parameters.AddWithValue("@TipoAdmisionId", obeProceso.TipoAdmisionId);
			cmd.Parameters.AddWithValue("@Descripcion", obeProceso.Descripcion);
			cmd.Parameters.AddWithValue("@UsuarioId", obeProceso.UsuarioCreadorId);
			cmd.Parameters.AddWithValue("@IndicadorProduccion", indicador1);
			cmd.Parameters.AddWithValue("@IndicadorEscalonado", indicador2);
			cmd.Parameters.AddWithValue("@IndicadorMontoFijo", indicador3);
			cmd.Parameters.AddWithValue("@IndicadorHorario", indicador4);
			cmd.Parameters.AddWithValue("@IndicadorTurno", indicador5);
			cmd.Parameters.AddWithValue("@IndicadorCompartido", indicador6);
			cmd.Parameters.AddWithValue("@IndicadorVacuna", indicador7);
			cmd.Parameters.AddWithValue("@IndicadorDescuento", false);
			cmd.Parameters.AddWithValue("@IndicadorDetalleOA", indicador8);
			cmd.Parameters.AddWithValue("@IndicadorDetalleMedico", indicador9);
			cmd.Parameters.AddWithValue("@FechaInicioProceso", indicador10);
			cmd.Parameters.AddWithValue("@FechaFinProceso", indicador11);
			cmd.Parameters.AddWithValue("@PorDias", indicador12);
			SqlParameter par = cmd.Parameters.Add("@Retorno", SqlDbType.Int);
			par.Direction = ParameterDirection.ReturnValue;

			cmd.ExecuteNonQuery();

			int resultado = (int)par.Value;

			return resultado;
		}
		public int Actualizar(SqlConnection con, beProceso obeProceso, bool indicador1, bool indicador2, bool indicador3, bool indicador4, bool indicador5, bool indicador6, bool indicador7,bool indicador8,bool indicador9,DateTime indicador10,DateTime indicador11, bool indicador12)
		{
			SqlCommand cmd = new SqlCommand("uspProcesoProvisionActualizarV4", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;
			cmd.Parameters.AddWithValue("@ProcesoId", obeProceso.ProcesoId);
			cmd.Parameters.AddWithValue("@SucursalId", obeProceso.SucursalId);
			cmd.Parameters.AddWithValue("@PeriodoId", obeProceso.PeriodoId);
			cmd.Parameters.AddWithValue("@TipoAdmisionId", obeProceso.TipoAdmisionId);
			cmd.Parameters.AddWithValue("@Descripcion", obeProceso.Descripcion);
			cmd.Parameters.AddWithValue("@UsuarioId", obeProceso.UsuarioCreadorId);
			cmd.Parameters.AddWithValue("@IndicadorProduccion", indicador1);
			cmd.Parameters.AddWithValue("@IndicadorEscalonado", indicador2);
			cmd.Parameters.AddWithValue("@IndicadorMontoFijo", indicador3);
			cmd.Parameters.AddWithValue("@IndicadorHorario", indicador4);
			cmd.Parameters.AddWithValue("@IndicadorTurno", indicador5);
			cmd.Parameters.AddWithValue("@IndicadorCompartido", indicador6);
			cmd.Parameters.AddWithValue("@IndicadorVacuna", indicador7);
			cmd.Parameters.AddWithValue("@IndicadorDescuento", false);
			cmd.Parameters.AddWithValue("@IndicadorDetalleOA", indicador8);
			cmd.Parameters.AddWithValue("@IndicadorDetalleMedico", indicador9);
			cmd.Parameters.AddWithValue("@FechaInicioProceso", indicador10);
			cmd.Parameters.AddWithValue("@FechaFinProceso", indicador11);
			cmd.Parameters.AddWithValue("@PorDias", indicador12);
			SqlParameter par = cmd.Parameters.Add("@Retorno", SqlDbType.Int);
			par.Direction = ParameterDirection.ReturnValue;

			cmd.ExecuteNonQuery();

			int resultado = (int)par.Value;

			return resultado;
		}
		public int ActualizarEstado(SqlConnection con, beProceso obeProceso)
		{
			SqlCommand cmd = new SqlCommand("uspProcesoProvisionActualizarEstadoV3", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@ProcesoId", obeProceso.ProcesoId);
			cmd.Parameters.AddWithValue("@Estado", obeProceso.EstadoProvision);
			cmd.Parameters.AddWithValue("@UsuarioId", obeProceso.UsuarioCreadorId);
			SqlParameter par = cmd.Parameters.Add("@Retorno", SqlDbType.Int);
			par.Direction = ParameterDirection.ReturnValue;

			cmd.ExecuteNonQuery();

			int resultado = (int)par.Value;

			return resultado;
		}

		public int SeleccionMedicoProvisionActualizacion(SqlConnection con, int id, string lista, int usuario,int configuracionpago)
		{
			SqlCommand cmd = new SqlCommand("uspProcesoDetalleMedicoActualizar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@ProcesoId", id);
			cmd.Parameters.AddWithValue("@ListaMedico", lista);
			cmd.Parameters.AddWithValue("@UsuarioId", usuario);
			cmd.Parameters.AddWithValue("@ConfiguracionPagoId", configuracionpago);
			cmd.ExecuteNonQuery();

			int resultado = cmd.ExecuteNonQuery();

			return resultado;
		}
	}
}
