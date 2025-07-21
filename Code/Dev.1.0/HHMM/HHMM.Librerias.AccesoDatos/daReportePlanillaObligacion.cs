using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daReportePlanillaObligacion
	{
		public List<beReportePlanillaObligacionVista> listarReporte(SqlConnection con, string su,int periodo,int persona,string estado,DateTime fechainicio,DateTime fechafin,int usuario,int tipo)
		{
			List<beReportePlanillaObligacionVista> lbeReportePlanillaObligacionVista = null;
			SqlCommand cmd = new SqlCommand("uspPlanillaMedicoReporte", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", su);
			cmd.Parameters.AddWithValue("@PeriodoId", periodo);
			cmd.Parameters.AddWithValue("@PersonaId", persona);
			cmd.Parameters.AddWithValue("@EstadoRegistro", estado);
			cmd.Parameters.AddWithValue("@FechaEnvioInicio", fechainicio);
			cmd.Parameters.AddWithValue("@FechaEnvioFin", fechafin);
			cmd.Parameters.AddWithValue("@UsuarioEnvioId", usuario);
			cmd.Parameters.AddWithValue("@TipoAdmisionId", tipo);
			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbeReportePlanillaObligacionVista = new List<beReportePlanillaObligacionVista>();
				int posMedicoEmpresaId = drd.GetOrdinal("MedicoEmpresaId");
				int posMedicoEmpresa = drd.GetOrdinal("MedicoEmpresa");
				int posPlanillaId = drd.GetOrdinal("PlanillaId");
				int posProceso = drd.GetOrdinal("Proceso");
				int posPeriodo = drd.GetOrdinal("Periodo");
				int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
				int posTipoServicio = drd.GetOrdinal("TipoServicio");
				int posTipoDocumentoPagoId = drd.GetOrdinal("TipoDocumentoPagoId");
				int posDocumento = drd.GetOrdinal("Documento");
				int posSubTotal = drd.GetOrdinal("SubTotal");
				int posIGV = drd.GetOrdinal("Impuesto");
				int posMontoObligacion = drd.GetOrdinal("MontoObligacion");
				int posFechaEnvio = drd.GetOrdinal("FechaEnvio");
				int posUsuarioEnvio = drd.GetOrdinal("UsuarioEnvio");
				beReportePlanillaObligacionVista obeReportePlanillaObligacionVista;
				while (drd.Read())
				{
					obeReportePlanillaObligacionVista = new beReportePlanillaObligacionVista();
					obeReportePlanillaObligacionVista.MedicoEmpresaId = drd.GetInt32(posMedicoEmpresaId);
					obeReportePlanillaObligacionVista.MedicoEmpresa = drd.GetString(posMedicoEmpresa);
					obeReportePlanillaObligacionVista.PlanillaId = drd.GetInt32(posPlanillaId);
					obeReportePlanillaObligacionVista.Proceso = drd.GetString(posProceso);
					obeReportePlanillaObligacionVista.Periodo = drd.GetInt32(posPeriodo);
					obeReportePlanillaObligacionVista.TipoAdmision = drd.GetString(posTipoAdmision);
					obeReportePlanillaObligacionVista.TipoServicio = drd.GetString(posTipoServicio);
					obeReportePlanillaObligacionVista.TipoDocumentoPagoId = drd.GetString(posTipoDocumentoPagoId);
					obeReportePlanillaObligacionVista.Documento = drd.GetString(posDocumento);
					obeReportePlanillaObligacionVista.SubTotal = drd.GetDecimal(posSubTotal);
					obeReportePlanillaObligacionVista.IGV = drd.GetDecimal(posIGV);
					obeReportePlanillaObligacionVista.MontoObligacion = drd.GetDecimal(posMontoObligacion);
					obeReportePlanillaObligacionVista.FechaEnvio = drd.GetDateTime(posFechaEnvio);
					obeReportePlanillaObligacionVista.UsuarioEnvio = drd.GetString(posUsuarioEnvio);
					lbeReportePlanillaObligacionVista.Add(obeReportePlanillaObligacionVista);
				}			
				drd.Close();
			}
			return lbeReportePlanillaObligacionVista;
		}

		public beReportePlanillaObligacionListas listasReporte(SqlConnection con, string su)
		{
			beReportePlanillaObligacionListas obeReportePlanillaObligacionListas = null;
			List<beCampoEntero> lbePeriodo = null;
			List<beCampoEntero> lbeTipoAdmision = null;
			List<beCampoCadenaCorto> lbeTipoRegistro = null;
			List<beCampoEntero> lbeUsuario = null;
			SqlCommand cmd = new SqlCommand("uspPlanillaMedicoReporteListas", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", su);
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeReportePlanillaObligacionListas = new beReportePlanillaObligacionListas();
				lbePeriodo = new List<beCampoEntero>();
				int posPeriodoId = drd.GetOrdinal("PeriodoId");
				int posPeriodo = drd.GetOrdinal("Periodo");
				beCampoEntero obePeriodo;
				while (drd.Read())
				{
					obePeriodo = new beCampoEntero();
					obePeriodo.campo1 = drd.GetInt32(posPeriodoId);
					obePeriodo.campo2 = drd.GetString(posPeriodo);
					lbePeriodo.Add(obePeriodo);
				}
				obeReportePlanillaObligacionListas.Lista1 = lbePeriodo;
				if (drd.NextResult())
				{
					lbeTipoAdmision = new List<beCampoEntero>();
					int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
					int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
					beCampoEntero obeTipoAdmision;
					while (drd.Read())
					{
						obeTipoAdmision = new beCampoEntero();
						obeTipoAdmision.campo1 = drd.GetInt32(posTipoAdmisionId);
						obeTipoAdmision.campo2 = drd.GetString(posTipoAdmision);
						lbeTipoAdmision.Add(obeTipoAdmision);
					}
					obeReportePlanillaObligacionListas.Lista2 = lbeTipoAdmision;
				}
				if (drd.NextResult())
				{
					lbeTipoRegistro = new List<beCampoCadenaCorto>();
					int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
					int posDescripcion = drd.GetOrdinal("Descripcion");
					beCampoCadenaCorto obeTipoRegistro;
					while (drd.Read())
					{
						obeTipoRegistro = new beCampoCadenaCorto();
						obeTipoRegistro.Campo1 = drd.GetString(posEstadoRegistro);
						obeTipoRegistro.Campo2 = drd.GetString(posDescripcion);
						lbeTipoRegistro.Add(obeTipoRegistro);
					}
					obeReportePlanillaObligacionListas.Lista3 = lbeTipoRegistro;
				}
				if (drd.NextResult())
				{
					lbeUsuario = new List<beCampoEntero>();
					int posUsuarioId = drd.GetOrdinal("UsuarioId");
					int posUsuario = drd.GetOrdinal("Usuario");
					beCampoEntero obeUsuario;
					while (drd.Read())
					{
						obeUsuario = new beCampoEntero();
						obeUsuario.campo1 = drd.GetInt32(posUsuarioId);
						obeUsuario.campo2 = drd.GetString(posUsuario);
						lbeUsuario.Add(obeUsuario);
					}
					obeReportePlanillaObligacionListas.Lista4 = lbeUsuario;
				}
				drd.Close();
			}
			return obeReportePlanillaObligacionListas;
		}
	}
}
