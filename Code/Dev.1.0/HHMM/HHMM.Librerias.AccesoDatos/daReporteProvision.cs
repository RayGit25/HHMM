using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daReporteProvision
	{
		public beReporteLiquidacionListas2 listasReporte(SqlConnection con, string su)
		{
			beReporteLiquidacionListas2 obeReporteLiquidacionListas2 = null;
			List<beReporteLiquidicacionPeriodo> lbeReporteLiquidicacionPeriodo = null;
			SqlCommand cmd = new SqlCommand("uspProcesoProvisionReporteListas", con);
			cmd.CommandType = CommandType.StoredProcedure;
			SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par1.Direction = ParameterDirection.Input;
			par1.Value = su;
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeReporteLiquidacionListas2 = new beReporteLiquidacionListas2();
				lbeReporteLiquidicacionPeriodo = new List<beReporteLiquidicacionPeriodo>();
				int posPeriodoId1 = drd.GetOrdinal("PeriodoId");
				int posDescripcion1 = drd.GetOrdinal("Descripcion");
				int posAnio1 = drd.GetOrdinal("Anio");
				int posMes1 = drd.GetOrdinal("Mes");
				beReporteLiquidicacionPeriodo obeReporteLiquidicacionPeriodo;
				while (drd.Read())
				{
					obeReporteLiquidicacionPeriodo = new beReporteLiquidicacionPeriodo();
					obeReporteLiquidicacionPeriodo.PeriodoId = drd.GetInt32(posPeriodoId1);
					obeReporteLiquidicacionPeriodo.Descripcion = drd.GetString(posDescripcion1).Trim();
					obeReporteLiquidicacionPeriodo.Anio = drd.GetInt32(posAnio1);
					obeReporteLiquidicacionPeriodo.Mes = drd.GetInt32(posMes1);
					lbeReporteLiquidicacionPeriodo.Add(obeReporteLiquidicacionPeriodo);
				}
				obeReporteLiquidacionListas2.ListaReporteLiquidacion1 = lbeReporteLiquidicacionPeriodo;
				List<beCampoEnteroLargo> lbeReporteLiquidicacionPeriodo2 = new List<beCampoEnteroLargo>();
				if (drd.NextResult())
				{
					beCampoEnteroLargo obeReporteLiquidicacionPeriodo2;
					int posProcesoId2 = drd.GetOrdinal("ProcesoId");
					int posDescripcion2 = drd.GetOrdinal("Descripcion");
					int posPeriodoId2 = drd.GetOrdinal("PeriodoId");
					while (drd.Read())
					{
						obeReporteLiquidicacionPeriodo2 = new beCampoEnteroLargo();
						obeReporteLiquidicacionPeriodo2.campo1 = drd.GetInt32(posProcesoId2);
						obeReporteLiquidicacionPeriodo2.campo2 = drd.GetString(posDescripcion2).Trim();
						obeReporteLiquidicacionPeriodo2.campo3 = drd.GetInt32(posPeriodoId2);
						lbeReporteLiquidicacionPeriodo2.Add(obeReporteLiquidicacionPeriodo2);
					}
					obeReporteLiquidacionListas2.ListaReporteLiquidacion2 = lbeReporteLiquidicacionPeriodo2;
				}
				drd.Close();
			}
			return obeReporteLiquidacionListas2;
		}

		public beReporteLiquidacionListas listarReporte(SqlConnection con, string su, int med, int emp, int per, int pro,string tipo,string especialidad)
		{

			beReporteLiquidacionListas obeReporteLiquidacionListas = null;
			List<beReporteLiquidacionVista1> lbeReporteLiquidacionVista1 = null;
			SqlCommand cmd = new SqlCommand("uspProcesoProvisionReporte", con);
			cmd.CommandType = CommandType.StoredProcedure;
			SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par1.Direction = ParameterDirection.Input;
			par1.Value = su;
			SqlParameter par2 = cmd.Parameters.Add("@PersonaId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = med;
			SqlParameter par3 = cmd.Parameters.Add("@EmpresaId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = emp;
			SqlParameter par4 = cmd.Parameters.Add("@PeriodoId", SqlDbType.Int);
			par4.Direction = ParameterDirection.Input;
			par4.Value = per;
			SqlParameter par5 = cmd.Parameters.Add("@ProcesoId", SqlDbType.Int);
			par5.Direction = ParameterDirection.Input;
			par5.Value = pro;
			SqlParameter par6 = cmd.Parameters.Add("@TipoReporte", SqlDbType.Char,1);
			par6.Direction = ParameterDirection.Input;
			par6.Value = tipo;

			SqlParameter par7 = cmd.Parameters.Add("@Especialidades", SqlDbType.VarChar, -1);
			par7.Direction = ParameterDirection.Input;
			if (especialidad == ""){
				par7.Value=DBNull.Value;
			}else{
			   par7.Value=especialidad;
			}

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeReporteLiquidacionListas = new beReporteLiquidacionListas();
				lbeReporteLiquidacionVista1 = new List<beReporteLiquidacionVista1>();
				int posSucursalId1 = drd.GetOrdinal("SucursalId");
				int posSucursal1 = drd.GetOrdinal("Sucursal");
				int posCompania1 = drd.GetOrdinal("Compania");
				int posDireccion1 = drd.GetOrdinal("Direccion");
				int posTelefono1 = drd.GetOrdinal("Telefono");
				int posFax1 = drd.GetOrdinal("Fax");
				int posURL1 = drd.GetOrdinal("URL");
				int posRuc = drd.GetOrdinal("RUC");

				beReporteLiquidacionVista1 obeReporteLiquidacionVista1;
				while (drd.Read())
				{
					obeReporteLiquidacionVista1 = new beReporteLiquidacionVista1();
					obeReporteLiquidacionVista1.SucursalId = drd.GetString(posSucursalId1).Trim();
					obeReporteLiquidacionVista1.Sucursal = drd.GetString(posSucursal1).Trim();
					obeReporteLiquidacionVista1.Compania = drd.GetString(posCompania1).Trim();

					obeReporteLiquidacionVista1.Direccion = drd.GetString(posDireccion1).Trim();
					obeReporteLiquidacionVista1.Telefono = drd.GetString(posTelefono1).Trim();
					obeReporteLiquidacionVista1.Fax = drd.GetString(posFax1).Trim();
					obeReporteLiquidacionVista1.Url = drd.GetString(posURL1).Trim();
					obeReporteLiquidacionVista1.Ruc=drd.GetString(posRuc);
					lbeReporteLiquidacionVista1.Add(obeReporteLiquidacionVista1);
				}
				obeReporteLiquidacionListas.ListaReporteLiquidacionVista1 = lbeReporteLiquidacionVista1;
				List<beReporteLiquidacionVista2> lbeReporteLiquidacionVista2 = new List<beReporteLiquidacionVista2>();
				if (drd.NextResult())
				{
					beReporteLiquidacionVista2 obeReporteLiquidacionVista2;
					int posDescripcion2=drd.GetOrdinal("Descripcion");
					int posTipoAdmisionId2 = drd.GetOrdinal("TipoAdmisionId");
					int posAnio2 = drd.GetOrdinal("Anio");
					int posMes2 = drd.GetOrdinal("Mes");
					int posTipoAdmision2 = drd.GetOrdinal("TipoAdmision");
					int posFechaInicio2 = drd.GetOrdinal("FechaInicio");
					int posFechaFin2 = drd.GetOrdinal("FechaFin"); 
					while (drd.Read())
					{
						obeReporteLiquidacionVista2 = new beReporteLiquidacionVista2();
						obeReporteLiquidacionVista2.Descripcion = drd.GetString(posDescripcion2).Trim();
						obeReporteLiquidacionVista2.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId2);
						obeReporteLiquidacionVista2.Anio = drd.GetInt32(posAnio2);
						obeReporteLiquidacionVista2.Mes = drd.GetInt32(posMes2);
						obeReporteLiquidacionVista2.TipoAdmision = drd.GetString(posTipoAdmision2).Trim();
						obeReporteLiquidacionVista2.FechaInicio = drd.GetDateTime(posFechaInicio2);
						obeReporteLiquidacionVista2.FechaFin = drd.GetDateTime(posFechaFin2);
						lbeReporteLiquidacionVista2.Add(obeReporteLiquidacionVista2);
					}
					obeReporteLiquidacionListas.ListaReporteLiquidacionVista2 = lbeReporteLiquidacionVista2;
				}
				List<beReporteLiquidacionVista3> lbeReporteLiquidacionVista3 = new List<beReporteLiquidacionVista3>();
				if (drd.NextResult())
				{
					beReporteLiquidacionVista3 obeReporteLiquidacionVista3;
					int posProcesoId3 = drd.GetOrdinal("ProcesoId");
					int posFacturar3 = drd.GetOrdinal("Facturar");
					int posNumeroDocumento3 = drd.GetOrdinal("NumeroDocumento");
					int posCodigoUsuario3 = drd.GetOrdinal("CodigoUsuario");
					int posFechaHoraCierre3 = drd.GetOrdinal("FechaHoraCierre");

					while (drd.Read())
					{
						obeReporteLiquidacionVista3 = new beReporteLiquidacionVista3();
						obeReporteLiquidacionVista3.ProcesoId = drd.GetInt32(posProcesoId3);
						obeReporteLiquidacionVista3.Facturar = drd.GetString(posFacturar3).Trim();
						obeReporteLiquidacionVista3.NumeroDocumento = drd.GetString(posNumeroDocumento3).Trim();
						obeReporteLiquidacionVista3.CodigoUsuario = drd.GetString(posCodigoUsuario3).Trim();
						obeReporteLiquidacionVista3.FechaHoraCierre = drd.GetDateTime(posFechaHoraCierre3);
						lbeReporteLiquidacionVista3.Add(obeReporteLiquidacionVista3);
					}
					obeReporteLiquidacionListas.ListaReporteLiquidacionVista3 = lbeReporteLiquidacionVista3;
				}
				List<beReporteLiquidacionVista4> lbeReporteLiquidacionVista4 = new List<beReporteLiquidacionVista4>();
				if (drd.NextResult())
				{
					beReporteLiquidacionVista4 obeReporteLiquidacionVista4;
					int posPersonaId4 = drd.GetOrdinal("PersonaId");
					int posNombreCompleto4 = drd.GetOrdinal("NombreCompleto");
					int posEspecialidadId4 = drd.GetOrdinal("EspecialidadId");
					int posEspecialidad4 = drd.GetOrdinal("Especialidad");
					int posCodigoImpuesto4 = drd.GetOrdinal("CodigoImpuesto");
					int posFactorPorcentaje4 = drd.GetOrdinal("FactorPorcentaje");
					int posTipoImpuestoId4 = drd.GetOrdinal("TipoImpuestoId");
					while (drd.Read())
					{
						obeReporteLiquidacionVista4 = new beReporteLiquidacionVista4();
						obeReporteLiquidacionVista4.PersonaId = drd.GetInt32(posPersonaId4);
						obeReporteLiquidacionVista4.NombreCompleto = drd.GetString(posNombreCompleto4).Trim();
						obeReporteLiquidacionVista4.EspecialidadId = drd.GetInt32(posEspecialidadId4);
						obeReporteLiquidacionVista4.Especialidad = drd.GetString(posEspecialidad4).Trim();
						obeReporteLiquidacionVista4.CodigoImpuesto = drd.GetString(posCodigoImpuesto4).Trim();
						obeReporteLiquidacionVista4.FactorPorcentaje = drd.GetDecimal(posFactorPorcentaje4);
						obeReporteLiquidacionVista4.TipoImpuestoId = drd.GetString(posTipoImpuestoId4).Trim();
						lbeReporteLiquidacionVista4.Add(obeReporteLiquidacionVista4);
					}
					obeReporteLiquidacionListas.ListaReporteLiquidacionVista4 = lbeReporteLiquidacionVista4;
				}
				List<beReporteLiquidacionVista5> lbeReporteLiquidacionVista5 = new List<beReporteLiquidacionVista5>();
				if (drd.NextResult())
				{
					beReporteLiquidacionVista5 obeReporteLiquidacionVista5;
					int posIdTipoAtencion5 = drd.GetOrdinal("IdTipoAtencion");
					int posServicioId5 = drd.GetOrdinal("ServicioId");
					int posPersonaId5 = drd.GetOrdinal("PersonaId");
					int posCodigoPrestacion5 = drd.GetOrdinal("CodigoPrestacion");
					int posEspecialidadId5 = drd.GetOrdinal("EspecialidadId");
					int posFechaAtencionPrestacion5 = drd.GetOrdinal("FechaAtencionPrestacion");
					int posCodigoOA5 = drd.GetOrdinal("CodigoOA");
					int posEstadoPrestacion5 = drd.GetOrdinal("EstadoPrestacion");
					//int posTipoComponente5 = drd.GetOrdinal("TipoComponente");
					int posIdExpediente5 = drd.GetOrdinal("IdExpediente");
					int posEstadoExpediente = drd.GetOrdinal("EstadoExpediente");

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
					int posImpuesto5 = drd.GetOrdinal("Impuesto");
					int posTotal5 = drd.GetOrdinal("Total");
					int posDocumentoEmitido5 = drd.GetOrdinal("DocumentoEmitido");
					int posTipoComponente5 = drd.GetOrdinal("TipoComponente");
					int posTipoAjuste = drd.GetOrdinal("TipoAjuste");

					int posMontoImponiblePrestacionResumen = drd.GetOrdinal("MontoImponiblePrestacionResumen");
					int posImporteResumen = drd.GetOrdinal("ImporteResumen");
					int posParteClinicaResumen = drd.GetOrdinal("ParteClinicaResumen");
					int posBonificacionResumen = drd.GetOrdinal("BonificacionResumen");
					int posTotalResumen = drd.GetOrdinal("TotalResumen");

					while (drd.Read())
					{
						obeReporteLiquidacionVista5 = new beReporteLiquidacionVista5();
						obeReporteLiquidacionVista5.IdTipoAtencion = drd.GetInt32(posIdTipoAtencion5);
						obeReporteLiquidacionVista5.ServicioId = drd.GetInt32(posServicioId5);
						obeReporteLiquidacionVista5.PersonaId = drd.GetInt32(posPersonaId5);
						obeReporteLiquidacionVista5.CodigoPrestacion = drd.GetString(posCodigoPrestacion5).Trim();
						obeReporteLiquidacionVista5.EspecialidadId = drd.GetInt32(posEspecialidadId5);
						obeReporteLiquidacionVista5.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion5);
						obeReporteLiquidacionVista5.CodigoOA = drd.GetString(posCodigoOA5).Trim();
						obeReporteLiquidacionVista5.EstadoPrestacion = drd.GetString(posEstadoPrestacion5);
						//obeReporteLiquidacionVista5.TipoComponente = drd.GetString(posTipoComponente5).Trim();
						obeReporteLiquidacionVista5.IdExpediente = drd.GetInt32(posIdExpediente5);
						obeReporteLiquidacionVista5.EstadoExpediente = drd.GetString(posEstadoExpediente);

						obeReporteLiquidacionVista5.IdPaciente = drd.GetInt32(posIdPaciente5);
						obeReporteLiquidacionVista5.Paciente = drd.GetString(posPaciente5).Trim();
						obeReporteLiquidacionVista5.CodigoTipoPaciente = drd.GetString(posCodigoTipoPaciente5).Trim();
						obeReporteLiquidacionVista5.Cantidad = drd.GetDecimal(posCantidad5);
						obeReporteLiquidacionVista5.MontoImponiblePrestacion = drd.GetDecimal(posMontoImponiblePrestacion5);
						obeReporteLiquidacionVista5.Bonificacion = drd.GetDecimal(posBonificacion5);
						obeReporteLiquidacionVista5.ValorMedida = drd.GetDecimal(posValorMedida5);
						obeReporteLiquidacionVista5.TipoValor = drd.GetString(posTipoValor5).Trim();
						obeReporteLiquidacionVista5.Valor = drd.GetDecimal(posValor5);
						obeReporteLiquidacionVista5.Porcentaje = drd.GetDecimal(posPorcentaje5);
						obeReporteLiquidacionVista5.Importe = drd.GetDecimal(posImporte5);
						obeReporteLiquidacionVista5.ParteClinica = drd.GetDecimal(posParteClinica5);
						obeReporteLiquidacionVista5.Impuesto = drd.GetDecimal(posImpuesto5);
						obeReporteLiquidacionVista5.Total = drd.GetDecimal(posTotal5);
						obeReporteLiquidacionVista5.DocumentoEmitido = drd.GetString(posDocumentoEmitido5).Trim();
						obeReporteLiquidacionVista5.TipoComponente = drd.GetString(posTipoComponente5).Trim();
						obeReporteLiquidacionVista5.TipoAjuste = drd.GetString(posTipoAjuste);

						obeReporteLiquidacionVista5.MontoImponiblePrestacionResumen = drd.GetDecimal(posMontoImponiblePrestacionResumen);
						obeReporteLiquidacionVista5.ImporteResumen = drd.GetDecimal(posImporteResumen);
						obeReporteLiquidacionVista5.ParteClinicaResumen = drd.GetDecimal(posParteClinicaResumen);
						obeReporteLiquidacionVista5.BonificacionResumen = drd.GetDecimal(posBonificacionResumen);
						obeReporteLiquidacionVista5.TotalResumen = drd.GetDecimal(posTotalResumen);

						lbeReporteLiquidacionVista5.Add(obeReporteLiquidacionVista5);
					}
					obeReporteLiquidacionListas.ListaReporteLiquidacionVista5 = lbeReporteLiquidacionVista5;
				}
				List<beCampoCadenaCorto> ListaReporteTipoAtencion= new List<beCampoCadenaCorto>();
				if(drd.NextResult())
				{
					int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
					int posDescripcionLarga = drd.GetOrdinal("DescripcionLarga");
					beCampoCadenaCorto oTipoAtencion;
					while(drd.Read()){
					
					oTipoAtencion = new beCampoCadenaCorto();
					oTipoAtencion.Campo1=drd.GetInt32(posTipoAtencionId).ToString();
					oTipoAtencion.Campo2=drd.GetString(posDescripcionLarga);
					ListaReporteTipoAtencion.Add(oTipoAtencion);
					}
				obeReporteLiquidacionListas.ListaReporteTipoAtencion=ListaReporteTipoAtencion;
				}
				List<beCampoCadenaCorto> ListaReporteTipoOrden = new List<beCampoCadenaCorto>();
				if (drd.NextResult())
				{
					int posServicioId = drd.GetOrdinal("ServicioId");
					int posDescripcion = drd.GetOrdinal("Descripcion");
					beCampoCadenaCorto oTipoOrden;
					while (drd.Read())
					{

						oTipoOrden = new beCampoCadenaCorto();
						oTipoOrden.Campo1 = drd.GetInt32(posServicioId).ToString();
						oTipoOrden.Campo2 = drd.GetString(posDescripcion);
						ListaReporteTipoOrden.Add(oTipoOrden);
					}
					obeReporteLiquidacionListas.ListaReporteTipoOrden = ListaReporteTipoOrden;
				}
				List<beCampoCadenaCorto> ListaReporteConcepto = new List<beCampoCadenaCorto>();
				if (drd.NextResult())
				{
					int posCodigoPrestacion = drd.GetOrdinal("CodigoPrestacion");
					int posDescripcionConcepto = drd.GetOrdinal("Descripcion");
					beCampoCadenaCorto oConcepto;
					while (drd.Read())
					{

						oConcepto = new beCampoCadenaCorto();
						oConcepto.Campo1 = drd.GetString(posCodigoPrestacion);
						oConcepto.Campo2 = drd.GetString(posDescripcionConcepto);
						ListaReporteConcepto.Add(oConcepto);
					}
					obeReporteLiquidacionListas.ListaReporteConcepto = ListaReporteConcepto;
				}
				if (drd.NextResult())
				{
					int posPersonaId9 = drd.GetOrdinal("PersonaId");
					int posFecha=drd.GetOrdinal("Fecha");
					int posHoraInicio = drd.GetOrdinal("HoraInicio");
					int posHoraFin = drd.GetOrdinal("HoraFin");
					int posHorasProgramadas = drd.GetOrdinal("HorasProgramadas");
					int posValorContrato = drd.GetOrdinal("ValorContrato");
					int posImporte = drd.GetOrdinal("Importe");
					int posBonificacion = drd.GetOrdinal("Bonificacion");
					int posTotal = drd.GetOrdinal("Total");
					int posDia = drd.GetOrdinal("Dia");
					int posIndicadorFeriado = drd.GetOrdinal("IndicadorFeriado");
					int posEspecialidad = drd.GetOrdinal("Especialidad");
					int posTipoAtencion = drd.GetOrdinal("TipoAtencion");
					int posImpuesto6 = drd.GetOrdinal("Impuesto");
					int posTotalGeneral6 = drd.GetOrdinal("TotalGeneral");
					List<beReporteProvicionHorarioMedico>lblbeReporteProvicionHorarioMedico=new List<beReporteProvicionHorarioMedico>();
					beReporteProvicionHorarioMedico obeReporteProvicionHorarioMedico;
					while(drd.Read())
					{
						obeReporteProvicionHorarioMedico= new beReporteProvicionHorarioMedico();
						obeReporteProvicionHorarioMedico.PersonaId = drd.GetInt32(posPersonaId9);
						obeReporteProvicionHorarioMedico.Fecha=drd.GetString(posFecha);
						obeReporteProvicionHorarioMedico.HoraInicio = drd.GetString(posHoraInicio);
						obeReporteProvicionHorarioMedico.HoraFin=drd.GetString(posHoraFin);
						obeReporteProvicionHorarioMedico.HorasProgramadas = drd.GetInt32(posHorasProgramadas);
						obeReporteProvicionHorarioMedico.ValorContrato = drd.GetDecimal(posValorContrato);
						obeReporteProvicionHorarioMedico.Importe = drd.GetDecimal(posImporte);
						obeReporteProvicionHorarioMedico.Bonificacion = drd.GetDecimal(posBonificacion);
						obeReporteProvicionHorarioMedico.Total = drd.GetDecimal(posTotal);
						obeReporteProvicionHorarioMedico.Dia = drd.GetString(posDia);
						obeReporteProvicionHorarioMedico.IndicadorFeriado=drd.GetBoolean(posIndicadorFeriado);
						obeReporteProvicionHorarioMedico.Especialidad=drd.GetString(posEspecialidad);
						obeReporteProvicionHorarioMedico.TipoAtencion = drd.GetString(posTipoAtencion);
						obeReporteProvicionHorarioMedico.Impuesto = drd.GetDecimal(posImpuesto6);
						obeReporteProvicionHorarioMedico.TotalGeneral = drd.GetDecimal(posTotalGeneral6);
						lblbeReporteProvicionHorarioMedico.Add(obeReporteProvicionHorarioMedico);
					}
					obeReporteLiquidacionListas.listaHorarioMedico=lblbeReporteProvicionHorarioMedico;
				}
				List<beCampoCadenaCorto> ListaReporteArticulo = new List<beCampoCadenaCorto>();
				if (drd.NextResult())
				{
					int posArticuloId7 = drd.GetOrdinal("ArticuloId");
					int posDescripcion7 = drd.GetOrdinal("Descripcion");
					beCampoCadenaCorto oConcepto7;
					while (drd.Read())
					{

						oConcepto7 = new beCampoCadenaCorto();
						oConcepto7.Campo1 = drd.GetString(posArticuloId7);
						oConcepto7.Campo2 = drd.GetString(posDescripcion7);
						ListaReporteArticulo.Add(oConcepto7);
					}
					obeReporteLiquidacionListas.ListaReporteArticulo = ListaReporteArticulo;
				}
				List<beReporteLiquidacionVista11> lbeReporteLiquidacionVista11 = new List<beReporteLiquidacionVista11>();
				if (drd.NextResult())
				{
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posDescripcion11 = drd.GetOrdinal("Descripcion");
					int posImporte = drd.GetOrdinal("Importe");
					int posConceptoMontoFijoId = drd.GetOrdinal("ConceptoMontoFijoId");
					int posConceptMontoFijo=drd.GetOrdinal("ConceptMontoFijo");
					int posIndicadorAdministrativo = drd.GetOrdinal("IndicadorAdministrativo");
					int posPeriodo = drd.GetOrdinal("Periodo");
					int posImpuesto=drd.GetOrdinal("Impuesto");
					int posTotalGeneral = drd.GetOrdinal("TotalGeneral");
					int posDocumentoEmitido = drd.GetOrdinal("DocumentoEmitido");

					beReporteLiquidacionVista11 obeReporteLiquidacionVista11;
					while (drd.Read())
					{

						obeReporteLiquidacionVista11 = new beReporteLiquidacionVista11();
						obeReporteLiquidacionVista11.PersonaId = drd.GetInt32(posPersonaId);
						obeReporteLiquidacionVista11.Descripcion = drd.GetString(posDescripcion11);
						obeReporteLiquidacionVista11.ConceptoMontoFijoId = drd.GetInt32(posConceptoMontoFijoId);
						obeReporteLiquidacionVista11.ConceptMontoFijo = drd.GetString(posConceptMontoFijo);
						obeReporteLiquidacionVista11.IndicadorAdministrativo = drd.GetBoolean(posIndicadorAdministrativo);
						obeReporteLiquidacionVista11.Periodo = drd.GetString(posPeriodo);
						obeReporteLiquidacionVista11.Importe = drd.GetDecimal(posImporte);
						obeReporteLiquidacionVista11.Impuesto = drd.GetDecimal(posImpuesto);
						obeReporteLiquidacionVista11.TotalGeneral = drd.GetDecimal(posTotalGeneral);
						obeReporteLiquidacionVista11.DocumentoEmitido = drd.GetString(posDocumentoEmitido);

						lbeReporteLiquidacionVista11.Add(obeReporteLiquidacionVista11);
					}
					obeReporteLiquidacionListas.ListaReporteLiquidacionVista11 = lbeReporteLiquidacionVista11;
				}

				drd.Close();
			}
			return obeReporteLiquidacionListas;
		}

		public beReporteLiquidacionListasResumen listarReporteResumen(SqlConnection con, string su, int med, int emp, int per, int pro, string tipo, string especialidad)
		{
			beReporteLiquidacionListasResumen obeReporteLiquidacionListasResumen = new beReporteLiquidacionListasResumen();

			List<beCampoCadenaCorto> lbeEspecialidad = null;
			SqlCommand cmd = new SqlCommand("uspProcesoProvisionReporte", con);
			cmd.CommandType = CommandType.StoredProcedure;
			SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par1.Direction = ParameterDirection.Input;
			par1.Value = su;
			SqlParameter par2 = cmd.Parameters.Add("@PersonaId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = med;
			SqlParameter par3 = cmd.Parameters.Add("@EmpresaId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = emp;
			SqlParameter par4 = cmd.Parameters.Add("@PeriodoId", SqlDbType.Int);
			par4.Direction = ParameterDirection.Input;
			par4.Value = per;
			SqlParameter par5 = cmd.Parameters.Add("@ProcesoId", SqlDbType.Int);
			par5.Direction = ParameterDirection.Input;
			par5.Value = pro;
			SqlParameter par6 = cmd.Parameters.Add("@TipoReporte", SqlDbType.Char, 1);
			par6.Direction = ParameterDirection.Input;
			par6.Value = tipo;
			SqlParameter par7 = cmd.Parameters.Add("@Especialidades", SqlDbType.VarChar, -1);
			par7.Direction = ParameterDirection.Input;
			if (especialidad == "")
			{
				par7.Value = DBNull.Value;
			}
			else
			{
				par7.Value = especialidad;
			}

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{

				int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
				int posDescripcion = drd.GetOrdinal("Descripcion");
				beCampoCadenaCorto oEspecialidad;
				lbeEspecialidad = new List<beCampoCadenaCorto>();
				while (drd.Read())
				{
					oEspecialidad = new beCampoCadenaCorto();
					oEspecialidad.Campo1 = drd.GetInt32(posEspecialidadId).ToString();
					oEspecialidad.Campo2 = drd.GetString(posDescripcion);
					lbeEspecialidad.Add(oEspecialidad);
				}
				obeReporteLiquidacionListasResumen.ListaEspecialidad = lbeEspecialidad;

				if(drd.NextResult())
				{
					int posMedicoEmpresaId = drd.GetOrdinal("MedicoEmpresaId");
					int posNombreCompleto = drd.GetOrdinal("NombreCompleto");
					beCampoCadenaCorto obeMedico;
					List<beCampoCadenaCorto> lbeMedico = new List<beCampoCadenaCorto>();
					while (drd.Read())
					{
						obeMedico = new beCampoCadenaCorto();
						obeMedico.Campo1 = drd.GetInt32(posMedicoEmpresaId).ToString();
						obeMedico.Campo2 = drd.GetString(posNombreCompleto);
						lbeMedico.Add(obeMedico);
					}
					obeReporteLiquidacionListasResumen.ListaMedicos = lbeMedico;
				}
				if (drd.NextResult())
				{
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posNombreCompleto = drd.GetOrdinal("NombreCompleto");
					int posImporte = drd.GetOrdinal("Importe");
					int posBonificacion = drd.GetOrdinal("Bonificacion");
					int posDescuento = drd.GetOrdinal("Descuento");
					int posAjuste = drd.GetOrdinal("Ajuste");
					int posTotal = drd.GetOrdinal("Total");
					int posEstadoProvision = drd.GetOrdinal("EstadoProvision");
					int posEspecialidadId1 = drd.GetOrdinal("EspecialidadId");
					int posMedicoEmpresaId = drd.GetOrdinal("MedicoEmpresaId");

					beReporteProvisionResumen obeReporteProvisionResumen;
					List<beReporteProvisionResumen> lbeMedico = new List<beReporteProvisionResumen>();
					while (drd.Read())
					{
						obeReporteProvisionResumen = new beReporteProvisionResumen();
						obeReporteProvisionResumen.PersonaId = drd.GetInt32(posPersonaId);
						obeReporteProvisionResumen.NombreCompleto = drd.GetString(posNombreCompleto);
						obeReporteProvisionResumen.Importe = drd.GetDecimal(posImporte);
						obeReporteProvisionResumen.Bonificacion = drd.GetDecimal(posBonificacion);
						obeReporteProvisionResumen.Descuento = drd.GetDecimal(posDescuento);
						obeReporteProvisionResumen.Ajuste = drd.GetDecimal(posAjuste);
						obeReporteProvisionResumen.Total = drd.GetDecimal(posTotal);
						obeReporteProvisionResumen.EstadoProvicion = drd.GetString(posEstadoProvision);
						obeReporteProvisionResumen.EspecialidadId = drd.GetInt32(posEspecialidadId1);
						obeReporteProvisionResumen.MedicoEmpresaId = drd.GetInt32(posMedicoEmpresaId);
						lbeMedico.Add(obeReporteProvisionResumen);
					}
					obeReporteLiquidacionListasResumen.ListaResumen = lbeMedico;
				}
				drd.Close();
			}
			return obeReporteLiquidacionListasResumen;
		}
	}
}
