using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daCuentaCorriente
	{
		public beCuentaCorrienteReporteListas listasReporteCTA(SqlConnection con, string sucursal)
		{
			beCuentaCorrienteReporteListas obeCuentaCorrienteReporteListas = null;
			List<beCampoEntero> ListaPeriodo = null;
			List<beCampoEntero> ListaEspecialidad = null;
			List<beCampoCadenaCorto> ListaEstado = null;
			SqlCommand cmd = new SqlCommand("uspReporteCTACTEListas", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", sucursal);
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeCuentaCorrienteReporteListas = new beCuentaCorrienteReporteListas();
				ListaPeriodo = new List<beCampoEntero>();
				int posPeriodoId = drd.GetOrdinal("PeriodoId");
				int posPeriodo = drd.GetOrdinal("Periodo");
				beCampoEntero obeperiodo;
				while (drd.Read())
				{
					obeperiodo = new beCampoEntero();
					obeperiodo.campo1 = drd.GetInt32(posPeriodoId);
					obeperiodo.campo2 = drd.GetString(posPeriodo);
					ListaPeriodo.Add(obeperiodo);
				}
				obeCuentaCorrienteReporteListas.ListaPeriodo = ListaPeriodo;
				if (drd.NextResult())
				{
					ListaEspecialidad = new List<beCampoEntero>();
					int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
					int posDescripcion = drd.GetOrdinal("Descripcion");
					beCampoEntero obeespecialidad;
					while (drd.Read())
					{
						obeespecialidad = new beCampoEntero();
						obeespecialidad.campo1 = drd.GetInt32(posEspecialidadId);
						obeespecialidad.campo2 = drd.GetString(posDescripcion);
						ListaEspecialidad.Add(obeespecialidad);
					}
					obeCuentaCorrienteReporteListas.ListaEspecialidad = ListaEspecialidad;
				}
				if (drd.NextResult())
				{
					ListaEstado = new List<beCampoCadenaCorto>();
					int posCodigo = drd.GetOrdinal("Codigo");
					int posEstado = drd.GetOrdinal("Estado");
					beCampoCadenaCorto obeestado;
					while (drd.Read())
					{
						obeestado = new beCampoCadenaCorto();
						obeestado.Campo1 = drd.GetString(posCodigo);
						obeestado.Campo2 = drd.GetString(posEstado);
						ListaEstado.Add(obeestado);
					}
					obeCuentaCorrienteReporteListas.ListaEstado = ListaEstado;
				}
				drd.Close();
			}
			return obeCuentaCorrienteReporteListas;
		}

		public List<beCuentaCorrienteReporte1> listarReporteCTA1(SqlConnection con, string sucursal, int perproini, int perprofin, int perprodini, int perprodfin, int especialidadid, string estadoplanilla, DateTime fecinicio, DateTime fecfin, int tipoadmision, int persona, int empresa, int opc, int IndicadorNoOA)
		{
			List<beCuentaCorrienteReporte1> lbeCuentaCorrienteReporte1 = null;
			SqlCommand cmd = new SqlCommand("uspReporteCTACTEV3", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@TipoReporte", opc);
			cmd.Parameters.AddWithValue("@SucursalId", sucursal);
			cmd.Parameters.AddWithValue("@PeriodoProvisionInicio", perproini);
			cmd.Parameters.AddWithValue("@PeriodoProvisionFin", perprofin);
			cmd.Parameters.AddWithValue("@PeriodoProduccionInicio", perprodini);
			cmd.Parameters.AddWithValue("@PeriodoProduccionFin", perprodfin);
			cmd.Parameters.AddWithValue("@EspeciaidadId", especialidadid);
			cmd.Parameters.AddWithValue("@EstadoPlanilla", estadoplanilla);
			cmd.Parameters.AddWithValue("@FechaProduccionInicio", fecinicio);
			cmd.Parameters.AddWithValue("@FechaProduccionFin", fecfin);
			cmd.Parameters.AddWithValue("@TipoAdmisionId", tipoadmision);
			cmd.Parameters.AddWithValue("@PersonaId", persona);
			cmd.Parameters.AddWithValue("@EmpresaId", empresa);
			cmd.Parameters.AddWithValue("@IndicadorNoOA", IndicadorNoOA);
			cmd.CommandTimeout = 0;
			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbeCuentaCorrienteReporte1 = new List<beCuentaCorrienteReporte1>();
				int posMedicoEmpresaId = drd.GetOrdinal("MedicoEmpresaId");
				int posEmpresa = drd.GetOrdinal("Empresa");
				int posPersonaId = drd.GetOrdinal("PersonaId");
				int posMedico = drd.GetOrdinal("Medico");
				int posTotalProvision = drd.GetOrdinal("TotalProvision");
				int posSaldoProvision = drd.GetOrdinal("SaldoProvision");
				int posTotalLiquidado = drd.GetOrdinal("TotalLiquidado");
				int posTotalProcesoPago = drd.GetOrdinal("TotalProcesoPago");
				beCuentaCorrienteReporte1 obeCuentaCorrienteReporte1;
				while (drd.Read())
				{
					obeCuentaCorrienteReporte1 = new beCuentaCorrienteReporte1();
					obeCuentaCorrienteReporte1.MedicoEmpresaId = drd.GetInt32(posMedicoEmpresaId);			
					obeCuentaCorrienteReporte1.MedicoEmpresa = drd.GetString(posEmpresa);
					obeCuentaCorrienteReporte1.MedicoId = drd.GetInt32(posPersonaId);
					obeCuentaCorrienteReporte1.Medico = drd.GetString(posMedico);
					obeCuentaCorrienteReporte1.TotalProvision = drd.GetDecimal(posTotalProvision);
					obeCuentaCorrienteReporte1.SaldoProvision = drd.GetDecimal(posSaldoProvision);
					obeCuentaCorrienteReporte1.TotalLiquidado = drd.GetDecimal(posTotalLiquidado);
					obeCuentaCorrienteReporte1.TotalProcesoPago = drd.GetDecimal(posTotalProcesoPago);
					lbeCuentaCorrienteReporte1.Add(obeCuentaCorrienteReporte1);
				}
				drd.Close();
			}
			return (lbeCuentaCorrienteReporte1);
		}

		public List<beCuentaCorrienteReporte2> listarReporteCTA2(SqlConnection con, string sucursal, int perproini, int perprofin, int perprodini, int perprodfin, int especialidadid, string estadoplanilla, DateTime fecinicio, DateTime fecfin, int tipoadmision, int persona, int empresa, int opc, int IndicadorNoOA)
		{
			List<beCuentaCorrienteReporte2> lbeCuentaCorrienteReporte2 = null;
			SqlCommand cmd = new SqlCommand("uspReporteCTACTEV3", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@TipoReporte", opc);
			cmd.Parameters.AddWithValue("@SucursalId", sucursal);
			cmd.Parameters.AddWithValue("@PeriodoProvisionInicio", perproini);
			cmd.Parameters.AddWithValue("@PeriodoProvisionFin", perprofin);
			cmd.Parameters.AddWithValue("@PeriodoProduccionInicio", perprodini);
			cmd.Parameters.AddWithValue("@PeriodoProduccionFin", perprodfin);
			cmd.Parameters.AddWithValue("@EspeciaidadId", especialidadid);
			cmd.Parameters.AddWithValue("@EstadoPlanilla", estadoplanilla);
			cmd.Parameters.AddWithValue("@FechaProduccionInicio", fecinicio);
			cmd.Parameters.AddWithValue("@FechaProduccionFin", fecfin);
			cmd.Parameters.AddWithValue("@TipoAdmisionId", tipoadmision);
			cmd.Parameters.AddWithValue("@PersonaId", persona);
			cmd.Parameters.AddWithValue("@EmpresaId", empresa);
			cmd.Parameters.AddWithValue("@IndicadorNoOA", IndicadorNoOA);
			cmd.CommandTimeout = 0;
			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbeCuentaCorrienteReporte2 = new List<beCuentaCorrienteReporte2>();
				int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
				int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
				int posPeriodoId = drd.GetOrdinal("PeriodoId");
				int posPeriodo = drd.GetOrdinal("Periodo");
				int posIdProvision = drd.GetOrdinal("IdProvision");
				int posPeriodoProduccion = drd.GetOrdinal("PeriodoProduccion");
				int posMoneda = drd.GetOrdinal("Moneda");
				int posTotal = drd.GetOrdinal("Total");
				int posTotalLiquidado = drd.GetOrdinal("TotalLiquidado");
				int posTotalPagado = drd.GetOrdinal("TotalPagado");
				int posSaldoxLiquidar = drd.GetOrdinal("SaldoxLiquidar");
				int posSaldoxPagar = drd.GetOrdinal("SaldoxPagar");
				int posDocumento = drd.GetOrdinal("Documento");
				int posFechaEmision = drd.GetOrdinal("FechaEmision");
				beCuentaCorrienteReporte2 obeCuentaCorrienteReporte2;
				while (drd.Read())
				{
					obeCuentaCorrienteReporte2 = new beCuentaCorrienteReporte2();
					obeCuentaCorrienteReporte2.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
					obeCuentaCorrienteReporte2.TipoAdmision = drd.GetString(posTipoAdmision);
					obeCuentaCorrienteReporte2.PeriodoId = drd.GetInt32(posPeriodoId);
					obeCuentaCorrienteReporte2.Periodo = drd.GetInt32(posPeriodo);
					obeCuentaCorrienteReporte2.IdProvision = drd.GetString(posIdProvision);
					obeCuentaCorrienteReporte2.PeriodoProduccion = drd.GetInt32(posPeriodoProduccion);
					obeCuentaCorrienteReporte2.Moneda = drd.GetString(posMoneda);
					obeCuentaCorrienteReporte2.Total = drd.GetDecimal(posTotal);
					obeCuentaCorrienteReporte2.TotalLiquidado = drd.GetDecimal(posTotalLiquidado);
					obeCuentaCorrienteReporte2.TotalPagado = drd.GetDecimal(posTotalPagado);
					obeCuentaCorrienteReporte2.SaldoxLiquidar = drd.GetDecimal(posSaldoxLiquidar);
					obeCuentaCorrienteReporte2.SaldoxPagar = drd.GetDecimal(posSaldoxPagar);
					obeCuentaCorrienteReporte2.Documento = drd.GetString(posDocumento);
					obeCuentaCorrienteReporte2.FechaEmision = drd.GetDateTime(posFechaEmision);
					lbeCuentaCorrienteReporte2.Add(obeCuentaCorrienteReporte2);
				}
				drd.Close();
			}
			return (lbeCuentaCorrienteReporte2);
		}

		public beCuentaCorrienteReporteDetalle listarReporteCTA3(SqlConnection con, string sucursal, int perproini, int perprofin, int perprodini, int perprodfin, int especialidadid, string estadoplanilla, DateTime fecinicio, DateTime fecfin, int tipoadmision, int persona, int empresa, int opc, int IndicadorNoOA)
		{
			beCuentaCorrienteReporteDetalle obeCuentaCorrienteReporteDetalle = null;
			List<beCuentaCorrienteReporte3> ListaReporte1 = null;
			SqlCommand cmd = new SqlCommand("uspReporteCTACTEV3", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@TipoReporte", opc);
			cmd.Parameters.AddWithValue("@SucursalId", sucursal);
			cmd.Parameters.AddWithValue("@PeriodoProvisionInicio", perproini);
			cmd.Parameters.AddWithValue("@PeriodoProvisionFin", perprofin);
			cmd.Parameters.AddWithValue("@PeriodoProduccionInicio", perprodini);
			cmd.Parameters.AddWithValue("@PeriodoProduccionFin", perprodfin);
			cmd.Parameters.AddWithValue("@EspeciaidadId", especialidadid);
			cmd.Parameters.AddWithValue("@EstadoPlanilla", estadoplanilla);
			cmd.Parameters.AddWithValue("@FechaProduccionInicio", fecinicio);
			cmd.Parameters.AddWithValue("@FechaProduccionFin", fecfin);
			cmd.Parameters.AddWithValue("@TipoAdmisionId", tipoadmision);
			cmd.Parameters.AddWithValue("@PersonaId", persona);
			cmd.Parameters.AddWithValue("@EmpresaId", empresa);
			cmd.Parameters.AddWithValue("@IndicadorNoOA", IndicadorNoOA);
			cmd.CommandTimeout = 0;
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeCuentaCorrienteReporteDetalle = new beCuentaCorrienteReporteDetalle();
				ListaReporte1 = new List<beCuentaCorrienteReporte3>();
				int posTipoAdmisionId1 = drd.GetOrdinal("TipoAdmisionId");
				int posTipoAdmision1 = drd.GetOrdinal("TipoAdmision");
				int posServicioId1 = drd.GetOrdinal("ServicioId");
				int posServicio1 = drd.GetOrdinal("Servicio");
				int posPeriodoId1 = drd.GetOrdinal("PeriodoId");
				int posPeriodo1 = drd.GetOrdinal("Periodo");
				int posIdProvision1 = drd.GetOrdinal("IdProvision");
				int posPeriodoProduccion1 = drd.GetOrdinal("PeriodoProduccion");
				int posMoneda1 = drd.GetOrdinal("Moneda");
				int posTotal1 = drd.GetOrdinal("Total");
				int posTotalLiquidado1 = drd.GetOrdinal("TotalLiquidado");
				int posTotalPagado1 = drd.GetOrdinal("TotalPagado");
				int posSaldoxLiquidar1 = drd.GetOrdinal("SaldoxLiquidar");
				int posSaldoxPagar1 = drd.GetOrdinal("SaldoxPagar");
				int posDocumento1 = drd.GetOrdinal("Documento");
				int posFechaEmision1 = drd.GetOrdinal("FechaEmision");
				beCuentaCorrienteReporte3 obeCuentaCorrienteReporte31;
				while (drd.Read())
				{
					obeCuentaCorrienteReporte31 = new beCuentaCorrienteReporte3();
					obeCuentaCorrienteReporte31.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId1);
					obeCuentaCorrienteReporte31.TipoAdmision = drd.GetString(posTipoAdmision1);
					obeCuentaCorrienteReporte31.DatoId = drd.GetString(posServicioId1);
					obeCuentaCorrienteReporte31.Dato = drd.GetString(posServicio1);
					obeCuentaCorrienteReporte31.PeriodoId = drd.GetInt32(posPeriodoId1);
					obeCuentaCorrienteReporte31.Periodo = drd.GetInt32(posPeriodo1);
					obeCuentaCorrienteReporte31.IdProvision = drd.GetString(posIdProvision1);
					obeCuentaCorrienteReporte31.PeriodoProduccion = drd.GetInt32(posPeriodoProduccion1);
					obeCuentaCorrienteReporte31.Moneda = drd.GetString(posMoneda1);
					obeCuentaCorrienteReporte31.Total = drd.GetDecimal(posTotal1);
					obeCuentaCorrienteReporte31.TotalLiquidado = drd.GetDecimal(posTotalLiquidado1);
					obeCuentaCorrienteReporte31.TotalPagado = drd.GetDecimal(posTotalPagado1);
					obeCuentaCorrienteReporte31.SaldoxLiquidar = drd.GetDecimal(posSaldoxLiquidar1);
					obeCuentaCorrienteReporte31.SaldoxPagar = drd.GetDecimal(posSaldoxPagar1);
					obeCuentaCorrienteReporte31.Documento = drd.GetString(posDocumento1);
					obeCuentaCorrienteReporte31.FechaEmision = drd.GetDateTime(posFechaEmision1);
					ListaReporte1.Add(obeCuentaCorrienteReporte31);
				}
				obeCuentaCorrienteReporteDetalle.ListaReporte1 = ListaReporte1;
				List<beCuentaCorrienteReporte3>  ListaReporte2 = new List<beCuentaCorrienteReporte3>();
				if (drd.NextResult())
				{
					int posTipoAdmisionId2 = drd.GetOrdinal("TipoAdmisionId");
					int posTipoAdmision2 = drd.GetOrdinal("TipoAdmision");
					int posUnidadMedicaId2 = drd.GetOrdinal("UnidadMedicaId");
					int posUnidadMedica2 = drd.GetOrdinal("UnidadMedica");
					int posPeriodoId2 = drd.GetOrdinal("PeriodoId");
					int posPeriodo2 = drd.GetOrdinal("Periodo");
					int posIdProvision2 = drd.GetOrdinal("IdProvision");
					int posPeriodoProduccion2 = drd.GetOrdinal("PeriodoProduccion");
					int posMoneda2 = drd.GetOrdinal("Moneda");
					int posTotal2= drd.GetOrdinal("Total");
					int posTotalLiquidado2 = drd.GetOrdinal("TotalLiquidado");
					int posTotalPagado2 = drd.GetOrdinal("TotalPagado");
					int posSaldoxLiquidar2 = drd.GetOrdinal("SaldoxLiquidar");
					int posSaldoxPagar2 = drd.GetOrdinal("SaldoxPagar");
					int posDocumento2= drd.GetOrdinal("Documento");
					int posFechaEmision2 = drd.GetOrdinal("FechaEmision");
					beCuentaCorrienteReporte3 obeCuentaCorrienteReporte32;
					while (drd.Read())
					{
						obeCuentaCorrienteReporte32 = new beCuentaCorrienteReporte3();
						obeCuentaCorrienteReporte32.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId2);
						obeCuentaCorrienteReporte32.TipoAdmision = drd.GetString(posTipoAdmision2);
						obeCuentaCorrienteReporte32.DatoId = drd.GetString(posUnidadMedicaId2);
						obeCuentaCorrienteReporte32.Dato = drd.GetString(posUnidadMedica2);
						obeCuentaCorrienteReporte32.PeriodoId = drd.GetInt32(posPeriodoId2);
						obeCuentaCorrienteReporte32.Periodo = drd.GetInt32(posPeriodo2);
						obeCuentaCorrienteReporte32.IdProvision = drd.GetString(posIdProvision2);
						obeCuentaCorrienteReporte32.PeriodoProduccion = drd.GetInt32(posPeriodoProduccion2);
						obeCuentaCorrienteReporte32.Moneda = drd.GetString(posMoneda2);
						obeCuentaCorrienteReporte32.Total = drd.GetDecimal(posTotal2);
						obeCuentaCorrienteReporte32.TotalLiquidado = drd.GetDecimal(posTotalLiquidado2);
						obeCuentaCorrienteReporte32.TotalPagado = drd.GetDecimal(posTotalPagado2);
						obeCuentaCorrienteReporte32.SaldoxLiquidar = drd.GetDecimal(posSaldoxLiquidar2);
						obeCuentaCorrienteReporte32.SaldoxPagar = drd.GetDecimal(posSaldoxPagar2);
						obeCuentaCorrienteReporte32.Documento = drd.GetString(posDocumento2);
						obeCuentaCorrienteReporte32.FechaEmision = drd.GetDateTime(posFechaEmision2);
						ListaReporte2.Add(obeCuentaCorrienteReporte32);
					}
					obeCuentaCorrienteReporteDetalle.ListaReporte2 = ListaReporte2;
				}
				List<beCuentaCorrienteReporte3> ListaReporte3 = new List<beCuentaCorrienteReporte3>();
				if (drd.NextResult())
				{
					int posTipoAdmisionId3 = drd.GetOrdinal("TipoAdmisionId");
					int posTipoAdmision3 = drd.GetOrdinal("TipoAdmision");
					int posCodigoConceptoMontoFijo3 = drd.GetOrdinal("CodigoConceptoMontoFijo");
					int posConceptoMontoFijo3 = drd.GetOrdinal("ConceptoMontoFijo");
					int posPeriodoId3 = drd.GetOrdinal("PeriodoId");
					int posPeriodo3 = drd.GetOrdinal("Periodo");
					int posIdProvision3 = drd.GetOrdinal("IdProvision");
					int posPeriodoProduccion3 = drd.GetOrdinal("PeriodoProduccion");
					int posMoneda3 = drd.GetOrdinal("Moneda");
					int posTotal3 = drd.GetOrdinal("Total");
					int posTotalLiquidado3 = drd.GetOrdinal("TotalLiquidado");
					int posTotalPagado3 = drd.GetOrdinal("TotalPagado");
					int posSaldoxLiquidar3 = drd.GetOrdinal("SaldoxLiquidar");
					int posSaldoxPagar3 = drd.GetOrdinal("SaldoxPagar");
					int posDocumento3 = drd.GetOrdinal("Documento");
					int posFechaEmision3 = drd.GetOrdinal("FechaEmision");
					beCuentaCorrienteReporte3 obeCuentaCorrienteReporte33;
					while (drd.Read())
					{
						obeCuentaCorrienteReporte33 = new beCuentaCorrienteReporte3();
						obeCuentaCorrienteReporte33.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId3);
						obeCuentaCorrienteReporte33.TipoAdmision = drd.GetString(posTipoAdmision3);
						obeCuentaCorrienteReporte33.DatoId = drd.GetString(posCodigoConceptoMontoFijo3);
						obeCuentaCorrienteReporte33.Dato = drd.GetString(posConceptoMontoFijo3);
						obeCuentaCorrienteReporte33.PeriodoId = drd.GetInt32(posPeriodoId3);
						obeCuentaCorrienteReporte33.Periodo = drd.GetInt32(posPeriodo3);
						obeCuentaCorrienteReporte33.IdProvision = drd.GetString(posIdProvision3);
						obeCuentaCorrienteReporte33.PeriodoProduccion = drd.GetInt32(posPeriodoProduccion3);
						obeCuentaCorrienteReporte33.Moneda = drd.GetString(posMoneda3);
						obeCuentaCorrienteReporte33.Total = drd.GetDecimal(posTotal3);
						obeCuentaCorrienteReporte33.TotalLiquidado = drd.GetDecimal(posTotalLiquidado3);
						obeCuentaCorrienteReporte33.TotalPagado = drd.GetDecimal(posTotalPagado3);
						obeCuentaCorrienteReporte33.SaldoxLiquidar = drd.GetDecimal(posSaldoxLiquidar3);
						obeCuentaCorrienteReporte33.SaldoxPagar = drd.GetDecimal(posSaldoxPagar3);
						obeCuentaCorrienteReporte33.Documento = drd.GetString(posDocumento3);
						obeCuentaCorrienteReporte33.FechaEmision = drd.GetDateTime(posFechaEmision3);
						ListaReporte3.Add(obeCuentaCorrienteReporte33);
					}
					obeCuentaCorrienteReporteDetalle.ListaReporte3 = ListaReporte3;
				}
				drd.Close();
			}
			return (obeCuentaCorrienteReporteDetalle);
		}

		public beReporteDetalladoProvisionVista ReporteCTAExcel(SqlConnection con, string sucursal, int perproini, int perprofin, int perprodini, int perprodfin, int especialidadid, string estadoplanilla, DateTime fecinicio, DateTime fecfin, int tipoadmision, int persona, int empresa, int opc)
		{
			beReporteDetalladoProvisionVista obeReporteDetalladoProvisionVista = new beReporteDetalladoProvisionVista();

			List<beReporteDetalladoProvisionProduccion> listaProduccion = null;
			List<beReporteDetalladoProvisionHorario> listaHorario = null;
			List<beReporteDetalladoProvisionPeriodo> listaPeriodo = null;
			SqlCommand cmd = new SqlCommand("uspReporteCTACTEDescargar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			//cmd.Parameters.AddWithValue("@TipoReporte", opc);
			cmd.Parameters.AddWithValue("@SucursalId", sucursal);
			cmd.Parameters.AddWithValue("@PeriodoProvisionInicio", perproini);
			cmd.Parameters.AddWithValue("@PeriodoProvisionFin", perprofin);
			cmd.Parameters.AddWithValue("@PeriodoProduccionInicio", perprodini);
			cmd.Parameters.AddWithValue("@PeriodoProduccionFin", perprodfin);
			cmd.Parameters.AddWithValue("@EspeciaidadId", especialidadid);
			cmd.Parameters.AddWithValue("@EstadoPlanilla", estadoplanilla);
			cmd.Parameters.AddWithValue("@FechaProduccionInicio", fecinicio);
			cmd.Parameters.AddWithValue("@FechaProduccionFin", fecfin);
			//cmd.Parameters.AddWithValue("@TipoAdmisionId", tipoadmision);
			cmd.Parameters.AddWithValue("@PersonaId", persona);
			cmd.Parameters.AddWithValue("@EmpresaId", empresa);
			cmd.CommandTimeout = 0;
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				int posPeriodo = drd.GetOrdinal("Periodo");
				int posSucursalId = drd.GetOrdinal("SucursalId");
				int posSucursal = drd.GetOrdinal("Sucursal");
				int posMedicoEmpresaId = drd.GetOrdinal("MedicoEmpresaId");
				int posEmpresa = drd.GetOrdinal("Empresa");
				int posIdMedico = drd.GetOrdinal("IdMedico");
				int posMedico = drd.GetOrdinal("Medico");
				int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
				int posCodigoOA = drd.GetOrdinal("CodigoOA");
				int posIdOrdenAtencion = drd.GetOrdinal("IdOrdenAtencion");
				int posLineaOrdenAtencion = drd.GetOrdinal("LineaOrdenAtencion");
				int posIdExpediente = drd.GetOrdinal("IdExpediente");
				int posCodigoPrestacion = drd.GetOrdinal("CodigoPrestacion");
				int posPrestacion = drd.GetOrdinal("Prestacion");
				int posPeriodoProduccion = drd.GetOrdinal("PeriodoProduccion");
				int posTipoRegistro = drd.GetOrdinal("TipoRegistro");
				int posFechaAtencionPrestacion = drd.GetOrdinal("FechaAtencionPrestacion");
				int posFechaAtendido = drd.GetOrdinal("FechaAtendido");
				int posFechaTerminado = drd.GetOrdinal("FechaTerminado");
				int posPrecioUnitarioPrestacion = drd.GetOrdinal("PrecioUnitarioPrestacion");
				int posCostoPrestacion = drd.GetOrdinal("CostoPrestacion");
				int posCantidad = drd.GetOrdinal("Cantidad");
				int posMontoImponiblePrestacion = drd.GetOrdinal("MontoImponiblePrestacion");
				int posValorMedida = drd.GetOrdinal("ValorMedida");
				int posTipoValor = drd.GetOrdinal("TipoValor");
				int posValor = drd.GetOrdinal("Valor");
				int posPorcentaje = drd.GetOrdinal("Porcentaje");
				int posParteMedico = drd.GetOrdinal("ParteMedico");
				int posBonificacion = drd.GetOrdinal("Bonificacion");
				int posFechaInicioOA = drd.GetOrdinal("FechaInicioOA");
				int posTipoPaciente = drd.GetOrdinal("TipoPaciente");
				int posTipoAtencion = drd.GetOrdinal("TipoAtencion");
				int posAseguradora = drd.GetOrdinal("Aseguradora");
				int posServicio = drd.GetOrdinal("Servicio");
				int posModFacturacion = drd.GetOrdinal("ModFacturacion");
				int posEspecialidad = drd.GetOrdinal("Especialidad");
				int posDescripcionEstadoPrestacion = drd.GetOrdinal("DescripcionEstadoPrestacion");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posAjuste = drd.GetOrdinal("Ajuste");
				int posTotalProvision = drd.GetOrdinal("TotalProvision");
				int posPaciente = drd.GetOrdinal("Paciente");
				int posAjusteProcesoId = drd.GetOrdinal("AjusteProcesoId");
				//int posAjusteTipoRegistro = drd.GetOrdinal("AjusteTipoRegistro");
				int posIdplanilla = drd.GetOrdinal("Idplanilla");
				int posIdEstadoPlanilla = drd.GetOrdinal("IdEstadoPlanilla");
				int posIndicadorHonorario = drd.GetOrdinal("IndicadorHonorario");

				int posEstadoHospitalizacion = drd.GetOrdinal("EstadoHospitalizacion");
				int posSituacionDetalleHospitalizacion = drd.GetOrdinal("SituacionDetalleHospitalizacion");
				int posIndicadorEliminado = drd.GetOrdinal("IndicadorEliminado");
				int posSituacionDetalleExpediente = drd.GetOrdinal("SituacionDetalleExpediente");


				int posEstadoPlanillaSPRING = drd.GetOrdinal("EstadoPlanillaSPRING");
				int posFechaHoraCreacion = drd.GetOrdinal("FechaHoraCreacion");
				int posEstadoProvision = drd.GetOrdinal("EstadoProvision");
				int posCuentaCosto = drd.GetOrdinal("CuentaCosto");
				int posCuentaProveedor = drd.GetOrdinal("CuentaProveedor");
				int posIdDocContable = drd.GetOrdinal("IdDocContable");

				int posPlanillaId = drd.GetOrdinal("PlanillaId");
				int posEstadoPlanilla = drd.GetOrdinal("EstadoPlanilla");
				int posTipoDocumentoPagoId = drd.GetOrdinal("TipoDocumentoPagoId");
				int posNumeroDocumento = drd.GetOrdinal("NumeroDocumento");
				int posFechaEmision = drd.GetOrdinal("FechaEmision");
				int posIndicadorNoVisiblePlanilla = drd.GetOrdinal("IndicadorNoVisiblePlanilla");

                int posIndicadorIncluidoPlanilla = drd.GetOrdinal("IndicadorIncluidoPlanilla");
                int posIndicadorExcluido = drd.GetOrdinal("IndicadorExcluido");

                listaProduccion = new List<beReporteDetalladoProvisionProduccion>();
				beReporteDetalladoProvisionProduccion obeReporteDetalladoProvisionProduccion;
				while (drd.Read())
				{
					obeReporteDetalladoProvisionProduccion = new beReporteDetalladoProvisionProduccion();
					obeReporteDetalladoProvisionProduccion.Periodo = drd.GetString(posPeriodo);
					obeReporteDetalladoProvisionProduccion.SucursalId = drd.GetString(posSucursalId);
					obeReporteDetalladoProvisionProduccion.Sucursal = drd.GetString(posSucursal);
					obeReporteDetalladoProvisionProduccion.MedicoEmpresaId = drd.GetInt32(posMedicoEmpresaId);
					obeReporteDetalladoProvisionProduccion.Empresa = drd.GetString(posEmpresa);
					obeReporteDetalladoProvisionProduccion.IdMedico = drd.GetInt32(posIdMedico);
					obeReporteDetalladoProvisionProduccion.Medico = drd.GetString(posMedico);
					obeReporteDetalladoProvisionProduccion.TipoAdmision = drd.GetString(posTipoAdmision);
					obeReporteDetalladoProvisionProduccion.CodigoOA = drd.GetString(posCodigoOA);
					obeReporteDetalladoProvisionProduccion.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion);
					obeReporteDetalladoProvisionProduccion.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion);
					obeReporteDetalladoProvisionProduccion.IdExpediente = drd.GetInt32(posIdExpediente);
					obeReporteDetalladoProvisionProduccion.CodigoPrestacion = drd.GetString(posCodigoPrestacion);
					obeReporteDetalladoProvisionProduccion.Prestacion = drd.GetString(posPrestacion);
					obeReporteDetalladoProvisionProduccion.PeriodoProduccion = drd.GetString(posPeriodoProduccion);
					obeReporteDetalladoProvisionProduccion.TipoRegistro = drd.GetString(posTipoRegistro);
					obeReporteDetalladoProvisionProduccion.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion);
					obeReporteDetalladoProvisionProduccion.FechaAtendido = drd.GetDateTime(posFechaAtendido);
					obeReporteDetalladoProvisionProduccion.FechaTerminado = drd.GetDateTime(posFechaTerminado);
					obeReporteDetalladoProvisionProduccion.PrecioUnitarioPrestacion = drd.GetDecimal(posPrecioUnitarioPrestacion);
					obeReporteDetalladoProvisionProduccion.CostoPrestacion = drd.GetDecimal(posCostoPrestacion);
					obeReporteDetalladoProvisionProduccion.Cantidad = drd.GetDecimal(posCantidad);
					obeReporteDetalladoProvisionProduccion.MontoImponiblePrestacion = drd.GetDecimal(posMontoImponiblePrestacion);
					obeReporteDetalladoProvisionProduccion.ValorMedida = drd.GetDecimal(posValorMedida);
					obeReporteDetalladoProvisionProduccion.TipoValor = drd.GetString(posTipoValor);
					obeReporteDetalladoProvisionProduccion.Valor = drd.GetDecimal(posValor);
					obeReporteDetalladoProvisionProduccion.Porcentaje = drd.GetDecimal(posPorcentaje);
					obeReporteDetalladoProvisionProduccion.ParteMedico = drd.GetDecimal(posParteMedico);
					obeReporteDetalladoProvisionProduccion.Bonificacion = drd.GetDecimal(posBonificacion);
					obeReporteDetalladoProvisionProduccion.FechaInicioOA = drd.GetDateTime(posFechaInicioOA);
					obeReporteDetalladoProvisionProduccion.TipoPaciente = drd.GetString(posTipoPaciente);
					obeReporteDetalladoProvisionProduccion.TipoAtencion = drd.GetString(posTipoAtencion);
					obeReporteDetalladoProvisionProduccion.Aseguradora = drd.GetString(posAseguradora);
					obeReporteDetalladoProvisionProduccion.Servicio = drd.GetString(posServicio);
					obeReporteDetalladoProvisionProduccion.ModFacturacion = drd.GetString(posModFacturacion).Trim();
					obeReporteDetalladoProvisionProduccion.Especialidad = drd.GetString(posEspecialidad);
					obeReporteDetalladoProvisionProduccion.DescripcionEstadoPrestacion = drd.GetString(posDescripcionEstadoPrestacion);
					obeReporteDetalladoProvisionProduccion.EstadoRegistro = drd.GetString(posEstadoRegistro);
					obeReporteDetalladoProvisionProduccion.Ajuste = drd.GetDecimal(posAjuste);
					obeReporteDetalladoProvisionProduccion.TotalProvision = drd.GetDecimal(posTotalProvision);
					obeReporteDetalladoProvisionProduccion.Paciente = drd.GetString(posPaciente);
					obeReporteDetalladoProvisionProduccion.AjusteProcesoId = drd.GetInt32(posAjusteProcesoId);
					//obeReporteDetalladoProvisionProduccion.AjusteTipoRegistro = drd.GetString(posAjusteTipoRegistro);
					obeReporteDetalladoProvisionProduccion.IdPlanilla = drd.GetInt32(posIdplanilla);
					obeReporteDetalladoProvisionProduccion.IdEstadoPlanilla = drd.GetInt32(posIdEstadoPlanilla);
					obeReporteDetalladoProvisionProduccion.IndicadorHonorario = drd.GetString(posIndicadorHonorario);

					obeReporteDetalladoProvisionProduccion.EstadoHospitalizacion = drd.GetString(posEstadoHospitalizacion);
					obeReporteDetalladoProvisionProduccion.SituacionDetalleHospitalizacion = drd.GetString(posSituacionDetalleHospitalizacion);
					obeReporteDetalladoProvisionProduccion.IndicadorEliminado = drd.GetString(posIndicadorEliminado);
					obeReporteDetalladoProvisionProduccion.SituacionDetalleExpediente = drd.GetString(posSituacionDetalleExpediente);

					obeReporteDetalladoProvisionProduccion.EstadoPlanillaSPRING = drd.GetString(posEstadoPlanillaSPRING);
					obeReporteDetalladoProvisionProduccion.FechaHoraCreacion = drd.GetDateTime(posFechaHoraCreacion);
					obeReporteDetalladoProvisionProduccion.EstadoProvision = drd.GetString(posEstadoProvision);
					obeReporteDetalladoProvisionProduccion.CuentaCosto = drd.GetString(posCuentaCosto);
					obeReporteDetalladoProvisionProduccion.CuentaProvedor = drd.GetString(posCuentaProveedor);
					obeReporteDetalladoProvisionProduccion.IdDocContable = drd.GetString(posIdDocContable);

					obeReporteDetalladoProvisionProduccion.PlanillaId = drd.GetInt32(posPlanillaId);
					obeReporteDetalladoProvisionProduccion.EstadoPlanilla = drd.GetString(posEstadoPlanilla);
					obeReporteDetalladoProvisionProduccion.TipoDocumentoPagoId = drd.GetString(posTipoDocumentoPagoId);
					obeReporteDetalladoProvisionProduccion.NumeroDocumento = drd.GetString(posNumeroDocumento);
					obeReporteDetalladoProvisionProduccion.FechaEmision = drd.GetDateTime(posFechaEmision);
					obeReporteDetalladoProvisionProduccion.IndicadorNoVisiblePlanilla = drd.GetString(posIndicadorNoVisiblePlanilla);
                    obeReporteDetalladoProvisionProduccion.IndicadorIncluidoPlanilla = drd.GetBoolean(posIndicadorIncluidoPlanilla);
                    obeReporteDetalladoProvisionProduccion.IndicadorExcluido = drd.GetString(posIndicadorExcluido);

                    listaProduccion.Add(obeReporteDetalladoProvisionProduccion);
				}
				obeReporteDetalladoProvisionVista.listaProduccion = listaProduccion;
				if (drd.NextResult())
				{
					listaHorario = new List<beReporteDetalladoProvisionHorario>();

					int posSucursalIdh = drd.GetOrdinal("SucursalId");
					int posSucursalh = drd.GetOrdinal("Sucursal");
					int posPeriodoh = drd.GetOrdinal("Periodo");
					int posMedicoEmpresaId2 = drd.GetOrdinal("MedicoEmpresaId");
					int posEmpresa2 = drd.GetOrdinal("Empresa");
					int posIdMedicoh = drd.GetOrdinal("IdMedico");
					int posMedicoh = drd.GetOrdinal("Medico");
					int posFecha = drd.GetOrdinal("Fecha");
					int posHoraInicio = drd.GetOrdinal("HoraInicio");
					int posHoraFin = drd.GetOrdinal("HoraFin");
					int posHorasProgramadas = drd.GetOrdinal("HorasProgramadas");
					int posDia = drd.GetOrdinal("Dia");
					int posIndicadorFeriado = drd.GetOrdinal("IndicadorFeriado");
					int posValorContrato = drd.GetOrdinal("ValorContrato");
					int posParteMedicoh = drd.GetOrdinal("ParteMedico");
					int posBonificacionh = drd.GetOrdinal("Bonificacion");
					int posTotal = drd.GetOrdinal("Total");
					int posEspecialidadh = drd.GetOrdinal("Especialidad");
					int posTipoAtencionh = drd.GetOrdinal("TipoAtencion");
					int posEstadoRegistroh = drd.GetOrdinal("EstadoRegistro");
					int posUnidadMedicaId = drd.GetOrdinal("UnidadMedicaId");
					int posUnidadMedica = drd.GetOrdinal("UnidadMedica");
					int posCuentaCosto2 = drd.GetOrdinal("CuentaCosto");
					int posCuentaProveedor2 = drd.GetOrdinal("CuentaProveedor");

					int posIdDocContable2 = drd.GetOrdinal("IdDocContable");
					int posPlanillaId2 = drd.GetOrdinal("PlanillaId");
					int posEstadoPlanilla2 = drd.GetOrdinal("EstadoPlanilla");
					int posTipoDocumentoPagoId2 = drd.GetOrdinal("TipoDocumentoPagoId");
					int posNumeroDocumento2 = drd.GetOrdinal("NumeroDocumento");
					int posFechaEmision2 = drd.GetOrdinal("FechaEmision");


					beReporteDetalladoProvisionHorario obeReporteDetalladoProvisionHorario;
					while (drd.Read())
					{
						obeReporteDetalladoProvisionHorario = new beReporteDetalladoProvisionHorario();
						obeReporteDetalladoProvisionHorario.SucursalId = drd.GetString(posSucursalIdh);
						obeReporteDetalladoProvisionHorario.Sucursal = drd.GetString(posSucursalh);
						obeReporteDetalladoProvisionHorario.Periodo = drd.GetString(posPeriodoh);
						obeReporteDetalladoProvisionHorario.MedicoEmpresaId = drd.GetInt32(posMedicoEmpresaId2);
						obeReporteDetalladoProvisionHorario.Empresa = drd.GetString(posEmpresa2);
						obeReporteDetalladoProvisionHorario.IdMedico = drd.GetInt32(posIdMedicoh);
						obeReporteDetalladoProvisionHorario.Medico = drd.GetString(posMedicoh);
						obeReporteDetalladoProvisionHorario.Fecha = drd.GetString(posFecha);
						obeReporteDetalladoProvisionHorario.HoraInicio = drd.GetString(posHoraInicio);
						obeReporteDetalladoProvisionHorario.HoraFin = drd.GetString(posHoraFin);
						obeReporteDetalladoProvisionHorario.HorasProgramadas = drd.GetDecimal(posHorasProgramadas);
						obeReporteDetalladoProvisionHorario.Dia = drd.GetString(posDia);
						obeReporteDetalladoProvisionHorario.IndicadorFeriado = drd.GetBoolean(posIndicadorFeriado);
						obeReporteDetalladoProvisionHorario.ValorContrato = drd.GetDecimal(posValorContrato);
						obeReporteDetalladoProvisionHorario.ParteMedico = drd.GetDecimal(posParteMedicoh);
						obeReporteDetalladoProvisionHorario.Bonificacion = drd.GetDecimal(posBonificacionh);
						obeReporteDetalladoProvisionHorario.Total = drd.GetDecimal(posTotal);
						obeReporteDetalladoProvisionHorario.Especialidad = drd.GetString(posEspecialidadh);
						obeReporteDetalladoProvisionHorario.TipoAtencion = drd.GetString(posTipoAtencionh);
						obeReporteDetalladoProvisionHorario.EstadoRegistro = drd.GetString(posEstadoRegistroh);
						obeReporteDetalladoProvisionHorario.UnidadMedicaId = drd.GetInt32(posUnidadMedicaId);
						obeReporteDetalladoProvisionHorario.UnidadMedica = drd.GetString(posUnidadMedica);
						obeReporteDetalladoProvisionHorario.CuentaCosto = drd.GetString(posCuentaCosto2);
						obeReporteDetalladoProvisionHorario.CuentaProveedor = drd.GetString(posCuentaProveedor2);

						obeReporteDetalladoProvisionHorario.IdDocContable = drd.GetString(posIdDocContable2);
						obeReporteDetalladoProvisionHorario.PlanillaId = drd.GetInt32(posPlanillaId2);
						obeReporteDetalladoProvisionHorario.EstadoPlanilla = drd.GetString(posEstadoPlanilla2);
						obeReporteDetalladoProvisionHorario.TipoDocumentoPagoId = drd.GetString(posTipoDocumentoPagoId2);
						obeReporteDetalladoProvisionHorario.NumeroDocumento = drd.GetString(posNumeroDocumento2);
						obeReporteDetalladoProvisionHorario.FechaEmision = drd.GetDateTime(posFechaEmision2);


						listaHorario.Add(obeReporteDetalladoProvisionHorario);
					}
					obeReporteDetalladoProvisionVista.listaHorario = listaHorario;
				}
				if (drd.NextResult())
				{
					listaPeriodo = new List<beReporteDetalladoProvisionPeriodo>();

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
					int posConcepto = drd.GetOrdinal("Concepto");
					int posCuentaCosto3 = drd.GetOrdinal("CuentaCosto");
					int posCuentaProveedor3 = drd.GetOrdinal("CuentaProveedor");

					int posIdDocContable3 = drd.GetOrdinal("IdDocContable");
					int posPlanillaId3 = drd.GetOrdinal("PlanillaId");
					int posEstadoPlanilla3 = drd.GetOrdinal("EstadoPlanilla");
					int posTipoDocumentoPagoId3 = drd.GetOrdinal("TipoDocumentoPagoId");
					int posNumeroDocumento3 = drd.GetOrdinal("NumeroDocumento");
					int posFechaEmision3 = drd.GetOrdinal("FechaEmision");

					beReporteDetalladoProvisionPeriodo obeReporteDetalladoProvisionPeriodo;

					while (drd.Read())
					{
						obeReporteDetalladoProvisionPeriodo = new beReporteDetalladoProvisionPeriodo();
						obeReporteDetalladoProvisionPeriodo.SucursalId = drd.GetString(posSucursalId3);
						obeReporteDetalladoProvisionPeriodo.Sucursal = drd.GetString(posSucursal3);
						obeReporteDetalladoProvisionPeriodo.Periodo = drd.GetString(posPeriodo3);
						obeReporteDetalladoProvisionPeriodo.MedicoEmpresaId = drd.GetInt32(posMedicoEmpresaId3);
						obeReporteDetalladoProvisionPeriodo.Empresa = drd.GetString(posEmpresa3);
						obeReporteDetalladoProvisionPeriodo.IdMedico = drd.GetInt32(posIdMedico3);
						obeReporteDetalladoProvisionPeriodo.Medico = drd.GetString(posMedico3);
						obeReporteDetalladoProvisionPeriodo.Descripcion = drd.GetString(posDescripcion3);
						obeReporteDetalladoProvisionPeriodo.Importe = drd.GetDecimal(posImporte3);
						obeReporteDetalladoProvisionPeriodo.ConceptoMontoFijoId = drd.GetInt32(posConceptoMontoFijoId3);
						obeReporteDetalladoProvisionPeriodo.Concepto = drd.GetString(posConcepto);
						obeReporteDetalladoProvisionPeriodo.CuentaCosto = drd.GetString(posCuentaCosto3);
						obeReporteDetalladoProvisionPeriodo.CuentaProveedor = drd.GetString(posCuentaProveedor3);

						obeReporteDetalladoProvisionPeriodo.IdDocContable = drd.GetString(posIdDocContable3);
						obeReporteDetalladoProvisionPeriodo.PlanillaId = drd.GetInt32(posPlanillaId3);
						obeReporteDetalladoProvisionPeriodo.EstadoPlanilla = drd.GetString(posEstadoPlanilla3);
						obeReporteDetalladoProvisionPeriodo.TipoDocumentoPagoId = drd.GetString(posTipoDocumentoPagoId3);
						obeReporteDetalladoProvisionPeriodo.NumeroDocumento = drd.GetString(posNumeroDocumento3);
						obeReporteDetalladoProvisionPeriodo.FechaEmision = drd.GetDateTime(posFechaEmision3);

						listaPeriodo.Add(obeReporteDetalladoProvisionPeriodo);
					}
					obeReporteDetalladoProvisionVista.listaPeriodo = listaPeriodo;
				}
				drd.Close();
			}
			return (obeReporteDetalladoProvisionVista);
		}
	}
}
