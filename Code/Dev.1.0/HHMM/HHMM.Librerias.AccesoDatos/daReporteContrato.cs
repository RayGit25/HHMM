using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daReporteContrato
	{
		public beReporteContratoListas listarReporte(SqlConnection con, string su, DateTime fecini, DateTime fecfin, int med, int emp,string com)
		{
			beReporteContratoListas obeReporteContratoListas = null;
			List<beReporteContratoVista1> lbeReporteContratoVista1 = null;
			SqlCommand cmd = new SqlCommand("uspReporteContratoV2", con);
			cmd.CommandType = CommandType.StoredProcedure;
			SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par1.Direction = ParameterDirection.Input;
			par1.Value = su;
			SqlParameter par2 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par2.Direction = ParameterDirection.Input;
			par2.Value = fecini;
			SqlParameter par3 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par3.Direction = ParameterDirection.Input;
			par3.Value = fecfin;
			SqlParameter par4 = cmd.Parameters.Add("@MedicoId", SqlDbType.Int);
			par4.Direction = ParameterDirection.Input;
			par4.Value = med;
			SqlParameter par5 = cmd.Parameters.Add("@EmpresaId", SqlDbType.Int);
			par5.Direction = ParameterDirection.Input;
			par5.Value = emp;
			SqlParameter par6 = cmd.Parameters.Add("@ComponenteId", SqlDbType.VarChar, 25);
			par6.Direction = ParameterDirection.Input;
			par6.Value = com;
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeReporteContratoListas = new beReporteContratoListas();
				lbeReporteContratoVista1 = new List<beReporteContratoVista1>();
				int posMedicoContratoId1 = drd.GetOrdinal("MedicoContratoId");
				int posPersonaId1 = drd.GetOrdinal("PersonaId");
				int posNombreCompleto1 = drd.GetOrdinal("NombreCompleto");
				int posFechaInicio1 = drd.GetOrdinal("FechaInicio");
				int posFechaFin1 = drd.GetOrdinal("FechaFin");
				int posObservacion1 = drd.GetOrdinal("Observacion");
				beReporteContratoVista1 obeReporteContratoVista1;
				while (drd.Read())
				{
					obeReporteContratoVista1 = new beReporteContratoVista1();
					obeReporteContratoVista1.MedicoContratoId = drd.GetInt32(posMedicoContratoId1);
					obeReporteContratoVista1.PersonaId = drd.GetInt32(posPersonaId1);
					obeReporteContratoVista1.NombreCompleto = drd.GetString(posNombreCompleto1).Trim();
					obeReporteContratoVista1.FechaInicio = drd.GetDateTime(posFechaInicio1);
					obeReporteContratoVista1.FechaFin = drd.GetDateTime(posFechaFin1);
					obeReporteContratoVista1.Observacion = drd.GetString(posObservacion1).Trim();
					lbeReporteContratoVista1.Add(obeReporteContratoVista1);
				}
				obeReporteContratoListas.ListaVista1 = lbeReporteContratoVista1;
				List<beReporteContratoVista2> lbeReporteContratoVista2 = new List<beReporteContratoVista2>();
				if (drd.NextResult())
				{
					beReporteContratoVista2 obeReporteContratoVista2;
					int posMedicoContratoId2 = drd.GetOrdinal("MedicoContratoId");
					int posMedicoContratoPagoId2 = drd.GetOrdinal("MedicoContratoPagoId");
					int posConfiguracionPagoId2 = drd.GetOrdinal("ConfiguracionPagoId");
					while (drd.Read())
					{
						obeReporteContratoVista2 = new beReporteContratoVista2();
						obeReporteContratoVista2.MedicoContratoId = drd.GetInt32(posMedicoContratoId2);
						obeReporteContratoVista2.MedicoContratoPagoId = drd.GetInt32(posMedicoContratoPagoId2);
						obeReporteContratoVista2.ConfiguracionPagoId = drd.GetInt32(posConfiguracionPagoId2);

						lbeReporteContratoVista2.Add(obeReporteContratoVista2);
					}
					obeReporteContratoListas.ListaVista2 = lbeReporteContratoVista2;
				}
				List<beReporteContratoVista3> lbeReporteContratoVista3 = new List<beReporteContratoVista3>();
				if (drd.NextResult())
				{
					beReporteContratoVista3 obeReporteContratoVista3;
					int posMedicoContratoDetalleId3 = drd.GetOrdinal("MedicoContratoDetalleId");
					int posMedicoContratoId3 = drd.GetOrdinal("MedicoContratoId");
					int posMedicoContratoPagoId3 = drd.GetOrdinal("MedicoContratoPagoId");
					int posSecuencia3 = drd.GetOrdinal("Secuencia");
					int posTipoRegistro3 = drd.GetOrdinal("TipoRegistro");
					int posTipoValor3 = drd.GetOrdinal("TipoValor");
					int posValor13 = drd.GetOrdinal("Valor1");
					int posAlcancePrestacion3 = drd.GetOrdinal("AlcancePrestacion");
					int posEstadoRegistro3 = drd.GetOrdinal("EstadoRegistro");
					int posCondicion3 = drd.GetOrdinal("Condicion");
					int posValor2 = drd.GetOrdinal("Valor2");
					int posFechaInicio3 = drd.GetOrdinal("FechaInicio");
					int posFechaFin3 = drd.GetOrdinal("FechaFin");
					while (drd.Read())
					{
						obeReporteContratoVista3 = new beReporteContratoVista3();
						obeReporteContratoVista3.MedicoContratoDetalleId = drd.GetInt32(posMedicoContratoDetalleId3);
						obeReporteContratoVista3.MedicoContratoId = drd.GetInt32(posMedicoContratoId3);
						obeReporteContratoVista3.MedicoContratoPagoId = drd.GetInt32(posMedicoContratoPagoId3);
						obeReporteContratoVista3.Secuencia = drd.GetInt32(posSecuencia3);
						obeReporteContratoVista3.TipoRegistro = drd.GetString(posTipoRegistro3).Trim();
						obeReporteContratoVista3.TipoValor = drd.GetString(posTipoValor3).Trim();
						obeReporteContratoVista3.Valor1 = drd.GetDecimal(posValor13);
						obeReporteContratoVista3.AlcancePrestacion = drd.GetString(posAlcancePrestacion3).Trim();
						obeReporteContratoVista3.EstadoRegistro = drd.GetString(posEstadoRegistro3).Trim();
						obeReporteContratoVista3.Condicion = drd.GetString(posCondicion3).Trim();
						obeReporteContratoVista3.Valor2 = drd.GetDecimal(posValor2);
						obeReporteContratoVista3.FechaInicio = drd.GetDateTime(posFechaInicio3);
						obeReporteContratoVista3.FechaFin = drd.GetDateTime(posFechaFin3);
						lbeReporteContratoVista3.Add(obeReporteContratoVista3);
					}
					obeReporteContratoListas.ListaVista3 = lbeReporteContratoVista3;
				}
				List<beReporteContratoVista4> lbeReporteContratoVista4 = new List<beReporteContratoVista4>();
				if (drd.NextResult())
				{
					beReporteContratoVista4 obeReporteContratoVista4;
					int posMedicoContratoDetalleId4 = drd.GetOrdinal("MedicoContratoDetalleId");
					int posComponenteId4 = drd.GetOrdinal("ComponenteId");
					int posValorMedida4 = drd.GetOrdinal("ValorMedida");
					int posServicioId4 = drd.GetOrdinal("ServicioId");
					while (drd.Read())
					{
						obeReporteContratoVista4 = new beReporteContratoVista4();
						obeReporteContratoVista4.MedicoContratoDetalleId = drd.GetInt32(posMedicoContratoDetalleId4);
						obeReporteContratoVista4.ComponenteId = drd.GetString(posComponenteId4).Trim();
						obeReporteContratoVista4.ValorMedida = drd.GetDecimal(posValorMedida4);
						obeReporteContratoVista4.ServicioId = drd.GetInt32(posServicioId4);
						lbeReporteContratoVista4.Add(obeReporteContratoVista4);
					}
					obeReporteContratoListas.ListaVista4 = lbeReporteContratoVista4;
				}
				List<beCampoEntero> lbeReporteContratoVista5 = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeReporteContratoVista5;
					int posServicioId5 = drd.GetOrdinal("ServicioId");
					int posDescripcion5 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeReporteContratoVista5 = new beCampoEntero();
						obeReporteContratoVista5.campo1 = drd.GetInt32(posServicioId5);
						obeReporteContratoVista5.campo2 = drd.GetString(posDescripcion5).Trim();
						lbeReporteContratoVista5.Add(obeReporteContratoVista5);
					}
					obeReporteContratoListas.ListaVista5 = lbeReporteContratoVista5;
				}
				drd.Close();
			}
			return (obeReporteContratoListas);
		}

		public beMedicoContratoReporteVista listarMedicoContratoReporte(SqlConnection con, string su, int usuarioId)
		{
			beMedicoContratoReporteVista obeMedicoContratoReporteVista = null;
			List<beMedicoContratoReporte> lbeMedicoContratoReporte = null;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoReporteV3", con);
			cmd.CommandType = CommandType.StoredProcedure;
			SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par1.Direction = ParameterDirection.Input;
			par1.Value = su;
			SqlParameter par2 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = usuarioId;
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeMedicoContratoReporteVista = new beMedicoContratoReporteVista();
				lbeMedicoContratoReporte = new List<beMedicoContratoReporte>();				
				int posId = drd.GetOrdinal("Id");
				int posMedico = drd.GetOrdinal("Medico");
				int posTipoPersona = drd.GetOrdinal("TipoPersona");
				int posNumeroDocumento = drd.GetOrdinal("NumeroDocumento");
				int posDocumentoFiscal = drd.GetOrdinal("DocumentoFiscal");
				int posEstadoMedico = drd.GetOrdinal("EstadoMedico");
				int posContratoId = drd.GetOrdinal("ContratoId");
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posEstadoContrato = drd.GetOrdinal("EstadoContrato");
				int posIndicadorAdjunto = drd.GetOrdinal("IndicadorAdjunto");
				int posNombreArchivo = drd.GetOrdinal("NombreArchivo");
				int posNombreRepositorio = drd.GetOrdinal("NombreRepositorio");
				int posIndicadorContrato = drd.GetOrdinal("IndicadorContrato");
				int posEspecialidad = drd.GetOrdinal("Especialidad");
				int posEmpresa = drd.GetOrdinal("Empresa");
				int posTipoMedico = drd.GetOrdinal("TipoMedico");
				beMedicoContratoReporte obeMedicoContratoReporte;
				while (drd.Read())
				{
					obeMedicoContratoReporte = new beMedicoContratoReporte();
					obeMedicoContratoReporte.Id = drd.GetInt32(posId);
					obeMedicoContratoReporte.Medico = drd.GetString(posMedico);
					obeMedicoContratoReporte.TipoPersona = drd.GetString(posTipoPersona);
					obeMedicoContratoReporte.NumeroDocumento = drd.GetString(posNumeroDocumento);
					obeMedicoContratoReporte.DocumentoFiscal = drd.GetString(posDocumentoFiscal);
					obeMedicoContratoReporte.EstadoMedico = drd.GetString(posEstadoMedico);
					obeMedicoContratoReporte.ContratoId = drd.GetInt32(posContratoId);
					obeMedicoContratoReporte.FechaInicio = drd.GetDateTime(posFechaInicio);
					obeMedicoContratoReporte.FechaFin = drd.GetDateTime(posFechaFin);
					obeMedicoContratoReporte.EstadoContrato = drd.GetString(posEstadoContrato);
					obeMedicoContratoReporte.IndicadorAdjunto = drd.GetString(posIndicadorAdjunto);
					obeMedicoContratoReporte.NombreArchivo = drd.GetString(posNombreArchivo);
					obeMedicoContratoReporte.NombreRepositorio = drd.GetString(posNombreRepositorio);
					obeMedicoContratoReporte.IndicadorContrato = drd.GetString(posIndicadorContrato);
					obeMedicoContratoReporte.Especialidad = drd.GetString(posEspecialidad);
					obeMedicoContratoReporte.Empresa = drd.GetString(posEmpresa);
					obeMedicoContratoReporte.TipoMedico = drd.GetString(posTipoMedico);
					lbeMedicoContratoReporte.Add(obeMedicoContratoReporte);
				}
				obeMedicoContratoReporteVista.ListaMedicoContratoReporte = lbeMedicoContratoReporte;
				if (drd.NextResult())
				{
					List<beCampoCadenaCorto> lbeTipoMedico = new List<beCampoCadenaCorto>();
					int posTipoMedico2 = drd.GetOrdinal("TipoMedico");
					int posDescripcion = drd.GetOrdinal("Descripcion");
					beCampoCadenaCorto obeTipoMedico;
					while (drd.Read())
					{
						obeTipoMedico = new beCampoCadenaCorto();
						obeTipoMedico.Campo1 = drd.GetString(posTipoMedico2);
						obeTipoMedico.Campo2 = drd.GetString(posDescripcion);
						lbeTipoMedico.Add(obeTipoMedico);
					}
					obeMedicoContratoReporteVista.ListaTipoMedico = lbeTipoMedico;
				}
				if (drd.NextResult())
				{
					List<beMedicoContratoComponenteReporte> lbeComponente = new List<beMedicoContratoComponenteReporte>();
					int posComponenteId3 = drd.GetOrdinal("ComponenteId");
					int posDescripcion3 = drd.GetOrdinal("Descripcion");
					int posValorMedida3 = drd.GetOrdinal("ValorMedida");
					int posServicioId3 = drd.GetOrdinal("ServicioId");
					int posEstadoComponente3 = drd.GetOrdinal("EstadoComponente");
					int posEstadoPrestacion3 = drd.GetOrdinal("EstadoPrestacion");
					beMedicoContratoComponenteReporte obeMedicoContratoComponenteReporte;
					while (drd.Read())
					{
						obeMedicoContratoComponenteReporte = new beMedicoContratoComponenteReporte();
						obeMedicoContratoComponenteReporte.ComponenteId = drd.GetString(posComponenteId3);
						obeMedicoContratoComponenteReporte.Descripcion = drd.GetString(posDescripcion3);
						obeMedicoContratoComponenteReporte.ValorMedida = drd.GetDecimal(posValorMedida3);
						obeMedicoContratoComponenteReporte.ServicioId = drd.GetInt32(posServicioId3);
						obeMedicoContratoComponenteReporte.EstadoComponente = drd.GetString(posEstadoComponente3);
						obeMedicoContratoComponenteReporte.EstadoPrestacion = drd.GetString(posEstadoPrestacion3);
						lbeComponente.Add(obeMedicoContratoComponenteReporte);
					}
					obeMedicoContratoReporteVista.ListaComponente = lbeComponente;
				}
				if (drd.NextResult())
				{
					List<beCampoEntero> lbeServicio = new List<beCampoEntero>();
					int posServicioId4 = drd.GetOrdinal("ServicioId");
					int posDescripcion4 = drd.GetOrdinal("Descripcion");
					beCampoEntero obeServicio;
					while (drd.Read())
					{
						obeServicio = new beCampoEntero();
						obeServicio.campo1 = drd.GetInt32(posServicioId4);
						obeServicio.campo2 = drd.GetString(posDescripcion4);
						lbeServicio.Add(obeServicio);
					}
					obeMedicoContratoReporteVista.ListaServicio = lbeServicio;
				}
				drd.Close();
			}
			return (obeMedicoContratoReporteVista);
		}
	}
}
