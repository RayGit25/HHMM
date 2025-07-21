using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daPlanilla
	{
		public List<bePlanillaVistaResumen> listarPlanillaResumen(SqlConnection con, string sucursal)
		{
			List<bePlanillaVistaResumen> lbePlanillaVistaResumen = null;
			SqlCommand cmd = new SqlCommand("uspProcesoProvisionResumenListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", sucursal);
			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbePlanillaVistaResumen = new List<bePlanillaVistaResumen>();

				int posProcesoId = drd.GetOrdinal("ProcesoId");
				int posPeriodo = drd.GetOrdinal("Periodo");
				int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
				int posTotalPlanilla = drd.GetOrdinal("TotalPlanilla");
				int posSaldoProcesar = drd.GetOrdinal("SaldoProcesar");
				bePlanillaVistaResumen obePlanillaVistaResumen;
				while (drd.Read())
				{
					obePlanillaVistaResumen = new bePlanillaVistaResumen();
					obePlanillaVistaResumen.ProcesoId = drd.GetInt32(posProcesoId);
					obePlanillaVistaResumen.Periodo = drd.GetString(posPeriodo);
					obePlanillaVistaResumen.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
					obePlanillaVistaResumen.TotalPlanilla = drd.GetDecimal(posTotalPlanilla);
					obePlanillaVistaResumen.SaldoProcesar = drd.GetDecimal(posSaldoProcesar);
					lbePlanillaVistaResumen.Add(obePlanillaVistaResumen);
				}
				drd.Close();
			}
			return (lbePlanillaVistaResumen);
		}

		public List<beProcesoMedico> listarProcesoMedico(SqlConnection con, string sucursal, string lista, int oa, int paciente, DateTime fechainicio, DateTime fechafin)
		{
			List<beProcesoMedico> lbeProcesoMedico = null;
			SqlCommand cmd = new SqlCommand("uspProcesoProvisionMedicoListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", sucursal);
			cmd.Parameters.AddWithValue("@ListaPeriodo", lista);
			cmd.Parameters.AddWithValue("@OrdenAtencionId", oa);
			cmd.Parameters.AddWithValue("@PacienteId", paciente);
			cmd.Parameters.AddWithValue("@FechaInicio", fechainicio);
			cmd.Parameters.AddWithValue("@FechaFin", fechafin);
			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbeProcesoMedico = new List<beProcesoMedico>();

				int posProcesoMedicoId = drd.GetOrdinal("ProcesoMedicoId");
				int posProcesoId = drd.GetOrdinal("ProcesoId");
				int posPersonaId = drd.GetOrdinal("PersonaId");
				int posNombreCompleto = drd.GetOrdinal("NombreCompleto");
				int posImportePlanilla = drd.GetOrdinal("ImportePlanilla");
				int posDescuentoPlanilla = drd.GetOrdinal("DescuentoPlanilla");
				int posAjustePlanilla = drd.GetOrdinal("AjustePlanilla");
				int posTotalPlanilla = drd.GetOrdinal("TotalPlanilla");
				int posTiempoPago = drd.GetOrdinal("TiempoPago");
				beProcesoMedico obeProcesoMedico;
				while (drd.Read())
				{
					obeProcesoMedico = new beProcesoMedico();
					obeProcesoMedico.ProcesoMedicoId = drd.GetInt32(posProcesoMedicoId);
					obeProcesoMedico.ProcesoId = drd.GetInt32(posProcesoId);
					obeProcesoMedico.PersonaId = drd.GetInt32(posPersonaId);
					obeProcesoMedico.NombreCompleto = drd.GetString(posNombreCompleto);
					obeProcesoMedico.ImportePlanilla = drd.GetDecimal(posImportePlanilla);
					obeProcesoMedico.DescuentoPlanilla = drd.GetDecimal(posDescuentoPlanilla);
					obeProcesoMedico.AjustePlanilla = drd.GetDecimal(posAjustePlanilla);
					obeProcesoMedico.TotalPlanilla = drd.GetDecimal(posTotalPlanilla);
					obeProcesoMedico.TiempoPago = drd.GetString(posTiempoPago);
					lbeProcesoMedico.Add(obeProcesoMedico);
				}
				drd.Close();
			}
			return (lbeProcesoMedico);
		}

		public List<bePacienteVista> listarPacientes(SqlConnection con, string apepaterno, string apematerno, string nombre)
		{
			List<bePacienteVista> lbePacienteVista = null;
			SqlCommand cmd = new SqlCommand("uspPacienteListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@ApellidoPaterno", apepaterno);
			cmd.Parameters.AddWithValue("@ApellidoMaterno", apematerno);
			cmd.Parameters.AddWithValue("@Nombres", nombre);
			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbePacienteVista = new List<bePacienteVista>();

				int posPacienteId = drd.GetOrdinal("PacienteId");
				int posApellidoPaterno = drd.GetOrdinal("ApellidoPaterno");
				int posApellidoMaterno = drd.GetOrdinal("ApellidoMaterno");
				int posNombres = drd.GetOrdinal("Nombres");
				bePacienteVista obePacienteVista;
				while (drd.Read())
				{
					obePacienteVista = new bePacienteVista();
					obePacienteVista.PacienteId = drd.GetInt32(posPacienteId);
					obePacienteVista.ApellidoPaterno = drd.GetString(posApellidoPaterno).Trim();
					obePacienteVista.ApellidoMaterno = drd.GetString(posApellidoMaterno).Trim();
					obePacienteVista.Nombres = drd.GetString(posNombres).Trim();
					lbePacienteVista.Add(obePacienteVista);
				}
				drd.Close();
			}
			return (lbePacienteVista);
		}

		public beProcesoMedicoVista listarDetalledeConceptos(SqlConnection con, int ProId, int PerId, int es, string sap)
		{
			beProcesoMedicoVista obeProcesoMedicoVista = null;
			List<beProcesoMedicoDetalle> lbeProcesoMedicoDetalle = null;
			SqlCommand cmd = null;
			if (sap == "G")
			{
				cmd = new SqlCommand("uspProcesoMedicoContratoPagadoListar", con);
			}
			else
			{
				cmd = new SqlCommand("uspProcesoMedicoContratoListar", con);
			}
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@ProcesoId", ProId);
			cmd.Parameters.AddWithValue("@PersonaId", PerId);
			cmd.Parameters.AddWithValue("@EspecialidadId", es);

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeProcesoMedicoVista = new beProcesoMedicoVista();
				lbeProcesoMedicoDetalle = new List<beProcesoMedicoDetalle>();
				int posPeriodo = drd.GetOrdinal("Periodo");
				int posNombreCompleto = drd.GetOrdinal("NombreCompleto");
				int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
				int posEspecialidad = drd.GetOrdinal("Especialidad");
				while (drd.Read())
				{
					obeProcesoMedicoVista.Periodo = drd.GetString(posPeriodo);
					obeProcesoMedicoVista.NombreCompleto = drd.GetString(posNombreCompleto).Trim();
					obeProcesoMedicoVista.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
					obeProcesoMedicoVista.Especialidad = drd.GetString(posEspecialidad).Trim();
				}
				if (drd.NextResult())
				{
					int posProcesoId = drd.GetOrdinal("ProcesoId");
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posConfiguracionPagoId = drd.GetOrdinal("ConfiguracionPagoId");
					int posConcepto = drd.GetOrdinal("Concepto");
					int posImporte = drd.GetOrdinal("Importe");
					int posBonificacion = drd.GetOrdinal("Bonificacion");
					int posDescuento = drd.GetOrdinal("Descuento");
					int posAjuste = drd.GetOrdinal("Ajuste");
					int posTotal = drd.GetOrdinal("Total");
					int posIndicadorNoPago = drd.GetOrdinal("IndicadorNoPago");
					int posObservacionNoPago = drd.GetOrdinal("ObservacionNoPago");
					beProcesoMedicoDetalle obeProcesoMedicoDetalle;
					while (drd.Read())
					{
						obeProcesoMedicoDetalle = new beProcesoMedicoDetalle();
						obeProcesoMedicoDetalle.ProcesoId = drd.GetInt32(posProcesoId);
						obeProcesoMedicoDetalle.PersonaId = drd.GetInt32(posPersonaId);
						obeProcesoMedicoDetalle.ConfiguracionPagoId = drd.GetInt32(posConfiguracionPagoId);
						obeProcesoMedicoDetalle.Concepto = drd.GetString(posConcepto);
						obeProcesoMedicoDetalle.Importe = drd.GetDecimal(posImporte);
						obeProcesoMedicoDetalle.Bonificacion = drd.GetDecimal(posBonificacion);
						obeProcesoMedicoDetalle.Descuento = drd.GetDecimal(posDescuento);
						obeProcesoMedicoDetalle.Ajuste = drd.GetDecimal(posAjuste);
						obeProcesoMedicoDetalle.Total = drd.GetDecimal(posTotal);
						obeProcesoMedicoDetalle.IndicadorNoPago = drd.GetString(posIndicadorNoPago);
						obeProcesoMedicoDetalle.ObservacionNoPago = drd.GetString(posObservacionNoPago).Trim();
						lbeProcesoMedicoDetalle.Add(obeProcesoMedicoDetalle);
					}
					obeProcesoMedicoVista.ListaDetalle = lbeProcesoMedicoDetalle;
				}
				List<beProcesoMedicoDetalle2> lbeProcesoMedicoDetalle2 = new List<beProcesoMedicoDetalle2>();
				if (drd.NextResult())
				{
					int posConfiguracionPagoId2 = drd.GetOrdinal("ConfiguracionPagoId");
					int posTipoRegistro2 = drd.GetOrdinal("TipoRegistro");
					int posPeriodo2 = drd.GetOrdinal("Periodo");
					int posImporte2 = drd.GetOrdinal("Importe");
					int posBonificacion2 = drd.GetOrdinal("Bonificacion");
					int posDescuento2 = drd.GetOrdinal("Descuento");
					int posAjuste2 = drd.GetOrdinal("Ajuste");
					int posTotal2 = drd.GetOrdinal("Total");
					beProcesoMedicoDetalle2 obeProcesoMedicoDetalle2;
					while (drd.Read())
					{
						obeProcesoMedicoDetalle2 = new beProcesoMedicoDetalle2();
						obeProcesoMedicoDetalle2.ConfiguracionPagoId = drd.GetInt32(posConfiguracionPagoId2);
						obeProcesoMedicoDetalle2.TipoRegistro = drd.GetString(posTipoRegistro2);
						obeProcesoMedicoDetalle2.Periodo = drd.GetString(posPeriodo2);
						obeProcesoMedicoDetalle2.Importe = drd.GetDecimal(posImporte2);
						obeProcesoMedicoDetalle2.Bonificacion = drd.GetDecimal(posBonificacion2);
						obeProcesoMedicoDetalle2.Descuento = drd.GetDecimal(posDescuento2);
						obeProcesoMedicoDetalle2.Ajuste = drd.GetDecimal(posAjuste2);
						obeProcesoMedicoDetalle2.Total = drd.GetDecimal(posTotal2);
						lbeProcesoMedicoDetalle2.Add(obeProcesoMedicoDetalle2);
					}
					obeProcesoMedicoVista.ListaDetalle2 = lbeProcesoMedicoDetalle2;
				}
				drd.Close();
			}
			return (obeProcesoMedicoVista);
		}


		public string CalculoProcesoMedico(SqlConnection con, string su, int pro, int tipoAdmi, DateTime fechainicio, DateTime fechafin, string lista, int usuario, bool indicador1, bool indicador2, bool indicador3, bool indicador4, bool indicador5, bool indicador6, bool indicador7)
		{
			string exito = "";
			SqlCommand cmd = new SqlCommand("uspProcesoMedicoCalcularV2", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;

			SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par1.Direction = ParameterDirection.Input;
			par1.Value = su;
			SqlParameter par2 = cmd.Parameters.Add("@ProcesoId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = pro;
			SqlParameter par3 = cmd.Parameters.Add("@TipoAdmisionProcesoId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = tipoAdmi;
			SqlParameter par4 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = fechainicio;
			SqlParameter par5 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par5.Direction = ParameterDirection.Input;
			par5.Value = fechafin;
			SqlParameter par6 = cmd.Parameters.Add("@ListaMedicoId", SqlDbType.VarChar);
			par6.Direction = ParameterDirection.Input;
			par6.Value = lista;
			SqlParameter par7 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par7.Direction = ParameterDirection.Input;
			par7.Value = usuario;

			SqlParameter par8 = cmd.Parameters.Add("@IndicadorProduccion", SqlDbType.Bit);
			par8.Direction = ParameterDirection.Input;
			par8.Value = indicador1;
			SqlParameter par9 = cmd.Parameters.Add("@IndicadorEscalonado", SqlDbType.Bit);
			par9.Direction = ParameterDirection.Input;
			par9.Value = indicador2;
			SqlParameter par10 = cmd.Parameters.Add("@IndicadorMontoFijo", SqlDbType.Bit);
			par10.Direction = ParameterDirection.Input;
			par10.Value = indicador3;
			SqlParameter par11 = cmd.Parameters.Add("@IndicadorHorario", SqlDbType.Bit);
			par11.Direction = ParameterDirection.Input;
			par11.Value = indicador4;
			SqlParameter par12 = cmd.Parameters.Add("@IndicadorTurno", SqlDbType.Bit);
			par12.Direction = ParameterDirection.Input;
			par12.Value = indicador5;
			SqlParameter par13 = cmd.Parameters.Add("@IndicadorCompartido", SqlDbType.Bit);
			par13.Direction = ParameterDirection.Input;
			par13.Value = indicador6;
			SqlParameter par14 = cmd.Parameters.Add("@IndicadorVacuna", SqlDbType.Bit);
			par14.Direction = ParameterDirection.Input;
			par14.Value = indicador7;
			SqlParameter par15 = cmd.Parameters.Add("@IndicadorDescuento", SqlDbType.Bit);
			par15.Direction = ParameterDirection.Input;
			par15.Value = false;

			object valor = cmd.ExecuteScalar();
			string[] data = new string[] { };
			if (valor != null)
			{
				exito = valor.ToString();

			}
			return (exito);
		}

		public int ProcesoMedicoActualizarEstado(SqlConnection con, string lista, int usuario, string estado, int id)
		{
			SqlCommand cmd = new SqlCommand("uspProcesoMedicoActualizarEstado", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;

			SqlParameter par1 = cmd.Parameters.Add("@ListaMedicoId", SqlDbType.VarChar);
			par1.Direction = ParameterDirection.Input;
			par1.Value = lista;
			SqlParameter par2 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = usuario;
			SqlParameter par3 = cmd.Parameters.Add("@EstadoProvision", SqlDbType.Char);
			par3.Direction = ParameterDirection.Input;
			par3.Value = estado;

			SqlParameter par4 = cmd.Parameters.Add("@ProcesoId", SqlDbType.Int);
			par4.Direction = ParameterDirection.Input;
			par4.Value = id;
			int n = cmd.ExecuteNonQuery();
			int resultado = n;
			return (resultado);
		}

		public beDetalleOAListas listarDetalledeConceptosOA(SqlConnection con, int id, string sap)
		{
			beDetalleOAListas obeDetalleOAListas = null;
			List<beDetalleOA> lbeDetalleOA = null;
			SqlCommand cmd = null;
			if (sap == "G")
			{
				cmd = new SqlCommand("uspProcesoMedicoDetalleOAPagadoListar", con);
			}
			else
			{
				cmd = new SqlCommand("uspProcesoMedicoDetalleOAListar", con);
			}
			cmd.CommandType = CommandType.StoredProcedure;
			SqlParameter par1 = cmd.Parameters.Add("@ProcesoMedicoId", SqlDbType.Int);
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

				int posPeriodoProduccion1 = drd.GetOrdinal("PeriodoProduccion");

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
				int posModFacturacion1 = drd.GetOrdinal("ModFacturacion");
				int posEspecialidad1 = drd.GetOrdinal("Especialidad");
				int posDescripcionEstadoPrestacion1 = drd.GetOrdinal("DescripcionEstadoPrestacion");
				int posIdOrdenAtencion1 = drd.GetOrdinal("IdOrdenAtencion");
				int posLineaOrdenAtencion1 = drd.GetOrdinal("LineaOrdenAtencion");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posIndicadorNoPago = drd.GetOrdinal("IndicadorNoPago");
				int posFechaHoraCreacion1 = drd.GetOrdinal("FechaHoraCreacion");
				int posFechaHoraModificacion1 = drd.GetOrdinal("FechaHoraModificacion");
				beDetalleOA obeDetalleOA;
				while (drd.Read())
				{
					obeDetalleOA = new beDetalleOA();

					obeDetalleOA.CodigoOA = drd.GetString(posCodigoOA1);
					obeDetalleOA.Paciente = drd.GetString(posPaciente1);
					obeDetalleOA.IdExpediente = drd.GetInt32(posIdExpediente1);
					obeDetalleOA.Prestacion = drd.GetString(posPrestacion1);

					obeDetalleOA.PeriodoProduccion = drd.GetString(posPeriodoProduccion1);

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

					obeDetalleOA.ModFacturacion = drd.GetString(posModFacturacion1);

					obeDetalleOA.Especialidad = drd.GetString(posEspecialidad1);
					obeDetalleOA.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion1);
					obeDetalleOA.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion1);
					obeDetalleOA.DescripcionEstadoPrestacion = drd.GetString(posDescripcionEstadoPrestacion1);
					obeDetalleOA.EstadoRegistro = drd.GetString(posEstadoRegistro);
					obeDetalleOA.IndicadorNoPago = drd.GetBoolean(posIndicadorNoPago);

					obeDetalleOA.FechaHoraCreacion = drd.GetDateTime(posFechaHoraCreacion1);
					obeDetalleOA.FechaHoraModificacion = drd.GetDateTime(posFechaHoraModificacion1);
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

				List<beDetalleOAMontoFijo> lbeDetalleOAMontoFijoLista = new List<beDetalleOAMontoFijo>();
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
						lbeDetalleOAMontoFijoLista.Add(obeDetalleOAMontoFijo);
					}
					obeDetalleOAListas.ListaMontoFijo = lbeDetalleOAMontoFijoLista;
				}

				drd.Close();
			}
			return obeDetalleOAListas;
		}

		public beMedicoAsientoProvisionListas generarAsientoProvision(SqlConnection con, int procesoId, string sucursalId, int usuarioId, DateTime fecha,string ip,string bd)
		{
			beMedicoAsientoProvisionListas obeMedicoAsientoProvisionListas = new beMedicoAsientoProvisionListas();
			List<beProduccionVista> listaProduccion = null;
			List<beMontoFijoVista> listaMontofijo = null;
			List<beHorarioVista> listaHorario = null;
			List<beHorarioVista> listaturno = null;
			SqlCommand cmd = null;
			if (ip != null && bd != null)
			{
				 cmd = new SqlCommand("uspProcesoMedicoAsientoProvisionV1", con);
			}
			else
			{
				 cmd = new SqlCommand("uspProcesoMedicoAsientoProvision", con);
			}
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;
			SqlParameter par1 = cmd.Parameters.Add("@ProcesoId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = procesoId;
			SqlParameter par2 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par2.Direction = ParameterDirection.Input;
			par2.Value = sucursalId;
			SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = usuarioId;

			SqlParameter par4 = cmd.Parameters.Add("@Fecha", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = fecha;

			if (ip != null && bd != null)
			{
				SqlParameter par5 = cmd.Parameters.Add("@IP", SqlDbType.VarChar, 80);
				par5.Direction = ParameterDirection.Input;
				par5.Value = ip;

				SqlParameter par6 = cmd.Parameters.Add("@BaseDatos", SqlDbType.VarChar, 80);
				par6.Direction = ParameterDirection.Input;
				par6.Value = bd;
			}

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				if (drd.HasRows)
				{
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posMedico = drd.GetOrdinal("Medico");
					int posIndicadorVinculada = drd.GetOrdinal("IndicadorVinculada");
					int posIdOrdenAtencion = drd.GetOrdinal("IdOrdenAtencion");
					int posLineaOrdenAtencion = drd.GetOrdinal("LineaOrdenAtencion");
					int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
					int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
					int posServicioId = drd.GetOrdinal("ServicioId");
					int posServicio = drd.GetOrdinal("Servicio");
					int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
					int posEspecialidad = drd.GetOrdinal("Especialidad");
					int posClasificadorMovimientoId = drd.GetOrdinal("ClasificadorMovimientoId");
					int posClasificadorMovimiento = drd.GetOrdinal("ClasificadorMovimiento");
					int posCodigoPrestacion = drd.GetOrdinal("CodigoPrestacion");
					int posPrestacion = drd.GetOrdinal("Prestacion");

					listaProduccion = new List<beProduccionVista>();
					beProduccionVista obeProduccionVista;
					while (drd.Read())
					{
						obeProduccionVista = new beProduccionVista();
						obeProduccionVista.PersonaId = drd.GetInt32(posPersonaId);
						obeProduccionVista.Medico = drd.GetString(posMedico);

						obeProduccionVista.IndicadorVinculada = drd.GetString(posIndicadorVinculada);
						obeProduccionVista.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion);
						obeProduccionVista.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion);
						obeProduccionVista.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
						obeProduccionVista.TipoAdmision = drd.GetString(posTipoAdmision);
						obeProduccionVista.ServicioId = drd.GetInt32(posServicioId);
						obeProduccionVista.Servicio = drd.GetString(posServicio);
						obeProduccionVista.EspecialidadId = drd.GetInt32(posEspecialidadId);
						obeProduccionVista.Especialidad = drd.GetString(posEspecialidad);
						obeProduccionVista.ClasificadorMovimientoId = drd.GetString(posClasificadorMovimientoId);
						obeProduccionVista.ClasificadorMovimiento = drd.GetString(posClasificadorMovimiento);
						obeProduccionVista.CodigoPrestacion = drd.GetString(posCodigoPrestacion);
						obeProduccionVista.Prestacion = drd.GetString(posPrestacion);
						listaProduccion.Add(obeProduccionVista);
					}
					obeMedicoAsientoProvisionListas.listaProduccion = listaProduccion;
				}
				if (drd.NextResult())
				{
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posMedico = drd.GetOrdinal("Medico");
					int posIndicadorVinculada = drd.GetOrdinal("IndicadorVinculada");
					int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
					int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
					int posConceptoMontoFijoId = drd.GetOrdinal("ConceptoMontoFijoId");
					int posConceptoMontoFijo = drd.GetOrdinal("ConceptoMontoFijo");

					listaMontofijo = new List<beMontoFijoVista>();
					beMontoFijoVista obeMontoFijoVista;
					while (drd.Read())
					{
						obeMontoFijoVista = new beMontoFijoVista();
						obeMontoFijoVista.PersonaId = drd.GetInt32(posPersonaId);
						obeMontoFijoVista.Medico = drd.GetString(posMedico);
						obeMontoFijoVista.IndicadorVinculada = drd.GetString(posIndicadorVinculada);
						obeMontoFijoVista.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
						obeMontoFijoVista.TipoAdmision = drd.GetString(posTipoAdmision);
						obeMontoFijoVista.ConceptoMontoFijoId = drd.GetInt32(posConceptoMontoFijoId);
						obeMontoFijoVista.ConceptoMontoFijo = drd.GetString(posConceptoMontoFijo);
						listaMontofijo.Add(obeMontoFijoVista);
					}
					obeMedicoAsientoProvisionListas.listaMontofijo = listaMontofijo;
				}
				if (drd.NextResult())
				{
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posMedico = drd.GetOrdinal("Medico");
					int posIndicadorVinculada = drd.GetOrdinal("IndicadorVinculada");
					int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
					int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
					int posUnidadMedicaId = drd.GetOrdinal("UnidadMedicaId");
					int posUnidadMedica = drd.GetOrdinal("UnidadMedica");

					listaHorario = new List<beHorarioVista>();
					beHorarioVista obeHorarioVista;
					while (drd.Read())
					{
						obeHorarioVista = new beHorarioVista();
						obeHorarioVista.PersonaId = drd.GetInt32(posPersonaId);
						obeHorarioVista.Medico = drd.GetString(posMedico);
						obeHorarioVista.IndicadorVinculada = drd.GetString(posIndicadorVinculada);
						obeHorarioVista.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
						obeHorarioVista.TipoAdmision = drd.GetString(posTipoAdmision);
						obeHorarioVista.UnidadMedicaId = drd.GetInt32(posUnidadMedicaId);
						obeHorarioVista.UnidadMedica = drd.GetString(posUnidadMedica);
						listaHorario.Add(obeHorarioVista);
					}
					obeMedicoAsientoProvisionListas.listaHorario = listaHorario;
				}
				if (drd.NextResult())
				{
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posMedico = drd.GetOrdinal("Medico");
					int posIndicadorVinculada = drd.GetOrdinal("IndicadorVinculada");
					int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
					int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
					int posUnidadMedicaId = drd.GetOrdinal("UnidadMedicaId");
					int posUnidadMedica = drd.GetOrdinal("UnidadMedica");

					listaturno = new List<beHorarioVista>();
					beHorarioVista obeTurnoVista;
					while (drd.Read())
					{
						obeTurnoVista = new beHorarioVista();
						obeTurnoVista.PersonaId = drd.GetInt32(posPersonaId);
						obeTurnoVista.Medico = drd.GetString(posMedico);
						obeTurnoVista.IndicadorVinculada = drd.GetString(posIndicadorVinculada);
						obeTurnoVista.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
						obeTurnoVista.TipoAdmision = drd.GetString(posTipoAdmision);
						obeTurnoVista.UnidadMedicaId = drd.GetInt32(posUnidadMedicaId);
						obeTurnoVista.UnidadMedica = drd.GetString(posUnidadMedica);
						listaturno.Add(obeTurnoVista);
					}
					obeMedicoAsientoProvisionListas.listaturno = listaturno;
				}
				drd.Close();
			}

			return (obeMedicoAsientoProvisionListas);
		}
		public beMedicoAsientoProvisionListas generarAsientoProvisionCSFR(SqlConnection con, int procesoId, string sucursalId, int usuarioId, DateTime fecha)
		{
			beMedicoAsientoProvisionListas obeMedicoAsientoProvisionListas = new beMedicoAsientoProvisionListas();
			List<beProduccionVista> listaProduccion = null;
			List<beMontoFijoVista> listaMontofijo = null;
			List<beHorarioVista> listaHorario = null;
			List<beHorarioVista> listaturno = null;
			SqlCommand cmd = new SqlCommand("uspProcesoMedicoAsientoProvision", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;
			SqlParameter par1 = cmd.Parameters.Add("@ProcesoId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = procesoId;
			SqlParameter par2 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par2.Direction = ParameterDirection.Input;
			par2.Value = sucursalId;
			SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = usuarioId;

			SqlParameter par4 = cmd.Parameters.Add("@Fecha", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = fecha;

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				if (drd.HasRows)
				{
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posMedico = drd.GetOrdinal("Medico");
					int posIndicadorVinculada = drd.GetOrdinal("IndicadorVinculada");
					int posIdOrdenAtencion = drd.GetOrdinal("IdOrdenAtencion");
					int posLineaOrdenAtencion = drd.GetOrdinal("LineaOrdenAtencion");
					int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
					int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
					int posServicioId = drd.GetOrdinal("ServicioId");
					int posServicio = drd.GetOrdinal("Servicio");
					int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
					int posEspecialidad = drd.GetOrdinal("Especialidad");
					int posClasificadorMovimientoId = drd.GetOrdinal("ClasificadorMovimientoId");
					int posClasificadorMovimiento = drd.GetOrdinal("ClasificadorMovimiento");
					int posCodigoPrestacion = drd.GetOrdinal("CodigoPrestacion");
					int posPrestacion = drd.GetOrdinal("Prestacion");

					listaProduccion = new List<beProduccionVista>();
					beProduccionVista obeProduccionVista;
					while (drd.Read())
					{
						obeProduccionVista = new beProduccionVista();
						obeProduccionVista.PersonaId = drd.GetInt32(posPersonaId);
						obeProduccionVista.Medico = drd.GetString(posMedico);

						obeProduccionVista.IndicadorVinculada = drd.GetString(posIndicadorVinculada);
						obeProduccionVista.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion);
						obeProduccionVista.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion);
						obeProduccionVista.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
						obeProduccionVista.TipoAdmision = drd.GetString(posTipoAdmision);
						obeProduccionVista.ServicioId = drd.GetInt32(posServicioId);
						obeProduccionVista.Servicio = drd.GetString(posServicio);
						obeProduccionVista.EspecialidadId = drd.GetInt32(posEspecialidadId);
						obeProduccionVista.Especialidad = drd.GetString(posEspecialidad);
						obeProduccionVista.ClasificadorMovimientoId = drd.GetString(posClasificadorMovimientoId);
						obeProduccionVista.ClasificadorMovimiento = drd.GetString(posClasificadorMovimiento);
						obeProduccionVista.CodigoPrestacion = drd.GetString(posCodigoPrestacion);
						obeProduccionVista.Prestacion = drd.GetString(posPrestacion);
						listaProduccion.Add(obeProduccionVista);
					}
					obeMedicoAsientoProvisionListas.listaProduccion = listaProduccion;
				}
				if (drd.NextResult())
				{
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posMedico = drd.GetOrdinal("Medico");
					int posIndicadorVinculada = drd.GetOrdinal("IndicadorVinculada");
					int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
					int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
					int posConceptoMontoFijoId = drd.GetOrdinal("ConceptoMontoFijoId");
					int posConceptoMontoFijo = drd.GetOrdinal("ConceptoMontoFijo");

					listaMontofijo = new List<beMontoFijoVista>();
					beMontoFijoVista obeMontoFijoVista;
					while (drd.Read())
					{
						obeMontoFijoVista = new beMontoFijoVista();
						obeMontoFijoVista.PersonaId = drd.GetInt32(posPersonaId);
						obeMontoFijoVista.Medico = drd.GetString(posMedico);
						obeMontoFijoVista.IndicadorVinculada = drd.GetString(posIndicadorVinculada);
						obeMontoFijoVista.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
						obeMontoFijoVista.TipoAdmision = drd.GetString(posTipoAdmision);
						obeMontoFijoVista.ConceptoMontoFijoId = drd.GetInt32(posConceptoMontoFijoId);
						obeMontoFijoVista.ConceptoMontoFijo = drd.GetString(posConceptoMontoFijo);
						listaMontofijo.Add(obeMontoFijoVista);
					}
					obeMedicoAsientoProvisionListas.listaMontofijo = listaMontofijo;
				}
				if (drd.NextResult())
				{
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posMedico = drd.GetOrdinal("Medico");
					int posIndicadorVinculada = drd.GetOrdinal("IndicadorVinculada");
					int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
					int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
					int posUnidadMedicaId = drd.GetOrdinal("UnidadMedicaId");
					int posUnidadMedica = drd.GetOrdinal("UnidadMedica");

					listaHorario = new List<beHorarioVista>();
					beHorarioVista obeHorarioVista;
					while (drd.Read())
					{
						obeHorarioVista = new beHorarioVista();
						obeHorarioVista.PersonaId = drd.GetInt32(posPersonaId);
						obeHorarioVista.Medico = drd.GetString(posMedico);
						obeHorarioVista.IndicadorVinculada = drd.GetString(posIndicadorVinculada);
						obeHorarioVista.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
						obeHorarioVista.TipoAdmision = drd.GetString(posTipoAdmision);
						obeHorarioVista.UnidadMedicaId = drd.GetInt32(posUnidadMedicaId);
						obeHorarioVista.UnidadMedica = drd.GetString(posUnidadMedica);
						listaHorario.Add(obeHorarioVista);
					}
					obeMedicoAsientoProvisionListas.listaHorario = listaHorario;
				}
				if (drd.NextResult())
				{
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posMedico = drd.GetOrdinal("Medico");
					int posIndicadorVinculada = drd.GetOrdinal("IndicadorVinculada");
					int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
					int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
					int posUnidadMedicaId = drd.GetOrdinal("UnidadMedicaId");
					int posUnidadMedica = drd.GetOrdinal("UnidadMedica");

					listaturno = new List<beHorarioVista>();
					beHorarioVista obeTurnoVista;
					while (drd.Read())
					{
						obeTurnoVista = new beHorarioVista();
						obeTurnoVista.PersonaId = drd.GetInt32(posPersonaId);
						obeTurnoVista.Medico = drd.GetString(posMedico);
						obeTurnoVista.IndicadorVinculada = drd.GetString(posIndicadorVinculada);
						obeTurnoVista.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
						obeTurnoVista.TipoAdmision = drd.GetString(posTipoAdmision);
						obeTurnoVista.UnidadMedicaId = drd.GetInt32(posUnidadMedicaId);
						obeTurnoVista.UnidadMedica = drd.GetString(posUnidadMedica);
						listaturno.Add(obeTurnoVista);
					}
					obeMedicoAsientoProvisionListas.listaturno = listaturno;
				}
				drd.Close();
			}

			return (obeMedicoAsientoProvisionListas);
		}
		public bool generarInterfaseSAP_ProvisionHHMMCSFR(SqlConnection con, int procesoId, int usuarioId)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("USP_InterfaseSAP_ProvisionHHMM_V1", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;
			SqlParameter par1 = cmd.Parameters.Add("@ProcesoId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = procesoId;

			SqlParameter par2 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = usuarioId;

			int n = cmd.ExecuteNonQuery();
			exito = true;
			return exito;
		}
		public bool generarInterfaseSAP_PlanillaHHMMCSFR(SqlConnection con, string listaPlanillaId, int usuarioId)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("USP_InterfaseSAP_PlanillaHHMM_V1", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;
			SqlParameter par1 = cmd.Parameters.Add("@ListaPlanillaId", SqlDbType.VarChar);
			par1.Direction = ParameterDirection.Input;
			par1.Value = listaPlanillaId;

			SqlParameter par2 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = usuarioId;

			int n = cmd.ExecuteNonQuery();
			exito = true;
			return exito;
		}
		public beMedicoAsientoProvisionListas generarObligacionPago(SqlConnection con, int procesoplanillaid, string planillaid, string sucursalId, int usuarioId,string ip,string bd)
		{
			beMedicoAsientoProvisionListas obeMedicoAsientoProvisionListas = new beMedicoAsientoProvisionListas();
			List<beProduccionVista> listaProduccion = null;
			List<beMontoFijoVista> listaMontofijo = null;
			List<beHorarioVista> listaHorario = null;
			List<beHorarioVista> listaturno = null;
			SqlCommand cmd = null;
			if (ip != null && bd != null)
			{
				cmd = new SqlCommand("uspPlanillaMedicoObligacionPagoV1", con);
			}
			else
			{
				cmd = new SqlCommand("uspPlanillaMedicoObligacionPago", con);
			}
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;
			SqlParameter par1 = cmd.Parameters.Add("@ProcesoPlanillaId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = procesoplanillaid;
			SqlParameter par2 = cmd.Parameters.Add("@ListaPlanilla", SqlDbType.VarChar);
			par2.Direction = ParameterDirection.Input;
			par2.Value = planillaid;
			SqlParameter par3 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par3.Direction = ParameterDirection.Input;
			par3.Value = sucursalId;
			SqlParameter par4 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par4.Direction = ParameterDirection.Input;
			par4.Value = usuarioId;
			if (ip != null && bd != null)
			{
				SqlParameter par5 = cmd.Parameters.Add("@IP", SqlDbType.VarChar, 80);
				par5.Direction = ParameterDirection.Input;
				par5.Value = ip;

				SqlParameter par6 = cmd.Parameters.Add("@BaseDatos", SqlDbType.VarChar, 80);
				par6.Direction = ParameterDirection.Input;
				par6.Value = bd;
			}

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				if (drd.HasRows)
				{
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posMedico = drd.GetOrdinal("Medico");
					int posIndicadorVinculada = drd.GetOrdinal("IndicadorVinculada");
					int posIdOrdenAtencion = drd.GetOrdinal("IdOrdenAtencion");
					int posLineaOrdenAtencion = drd.GetOrdinal("LineaOrdenAtencion");
					int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
					int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
					int posServicioId = drd.GetOrdinal("ServicioId");
					int posServicio = drd.GetOrdinal("Servicio");
					int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
					int posEspecialidad = drd.GetOrdinal("Especialidad");
					int posClasificadorMovimientoId = drd.GetOrdinal("ClasificadorMovimientoId");
					int posClasificadorMovimiento = drd.GetOrdinal("ClasificadorMovimiento");
					int posCodigoPrestacion = drd.GetOrdinal("CodigoPrestacion");
					int posPrestacion = drd.GetOrdinal("Prestacion");

					listaProduccion = new List<beProduccionVista>();
					beProduccionVista obeProduccionVista;
					while (drd.Read())
					{
						obeProduccionVista = new beProduccionVista();
						obeProduccionVista.PersonaId = drd.GetInt32(posPersonaId);
						obeProduccionVista.Medico = drd.GetString(posMedico);

						obeProduccionVista.IndicadorVinculada = drd.GetString(posIndicadorVinculada);
						obeProduccionVista.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion);
						obeProduccionVista.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion);
						obeProduccionVista.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
						obeProduccionVista.TipoAdmision = drd.GetString(posTipoAdmision);
						obeProduccionVista.ServicioId = drd.GetInt32(posServicioId);
						obeProduccionVista.Servicio = drd.GetString(posServicio);
						obeProduccionVista.EspecialidadId = drd.GetInt32(posEspecialidadId);
						obeProduccionVista.Especialidad = drd.GetString(posEspecialidad);
						obeProduccionVista.ClasificadorMovimientoId = drd.GetString(posClasificadorMovimientoId);
						obeProduccionVista.ClasificadorMovimiento = drd.GetString(posClasificadorMovimiento);
						obeProduccionVista.CodigoPrestacion = drd.GetString(posCodigoPrestacion);
						obeProduccionVista.Prestacion = drd.GetString(posPrestacion);
						listaProduccion.Add(obeProduccionVista);
					}
					obeMedicoAsientoProvisionListas.listaProduccion = listaProduccion;
				}
				if (drd.NextResult())
				{
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posMedico = drd.GetOrdinal("Medico");
					int posIndicadorVinculada = drd.GetOrdinal("IndicadorVinculada");
					int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
					int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
					int posConceptoMontoFijoId = drd.GetOrdinal("ConceptoMontoFijoId");
					int posConceptoMontoFijo = drd.GetOrdinal("ConceptoMontoFijo");

					listaMontofijo = new List<beMontoFijoVista>();
					beMontoFijoVista obeMontoFijoVista;
					while (drd.Read())
					{
						obeMontoFijoVista = new beMontoFijoVista();
						obeMontoFijoVista.PersonaId = drd.GetInt32(posPersonaId);
						obeMontoFijoVista.Medico = drd.GetString(posMedico);
						obeMontoFijoVista.IndicadorVinculada = drd.GetString(posIndicadorVinculada);
						obeMontoFijoVista.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
						obeMontoFijoVista.TipoAdmision = drd.GetString(posTipoAdmision);
						obeMontoFijoVista.ConceptoMontoFijoId = drd.GetInt32(posConceptoMontoFijoId);
						obeMontoFijoVista.ConceptoMontoFijo = drd.GetString(posConceptoMontoFijo);
						listaMontofijo.Add(obeMontoFijoVista);
					}
					obeMedicoAsientoProvisionListas.listaMontofijo = listaMontofijo;
				}
				if (drd.NextResult())
				{
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posMedico = drd.GetOrdinal("Medico");
					int posIndicadorVinculada = drd.GetOrdinal("IndicadorVinculada");
					int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
					int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
					int posUnidadMedicaId = drd.GetOrdinal("UnidadMedicaId");
					int posUnidadMedica = drd.GetOrdinal("UnidadMedica");

					listaHorario = new List<beHorarioVista>();
					beHorarioVista obeHorarioVista;
					while (drd.Read())
					{
						obeHorarioVista = new beHorarioVista();
						obeHorarioVista.PersonaId = drd.GetInt32(posPersonaId);
						obeHorarioVista.Medico = drd.GetString(posMedico);
						obeHorarioVista.IndicadorVinculada = drd.GetString(posIndicadorVinculada);
						obeHorarioVista.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
						obeHorarioVista.TipoAdmision = drd.GetString(posTipoAdmision);
						obeHorarioVista.UnidadMedicaId = drd.GetInt32(posUnidadMedicaId);
						obeHorarioVista.UnidadMedica = drd.GetString(posUnidadMedica);
						listaHorario.Add(obeHorarioVista);
					}
					obeMedicoAsientoProvisionListas.listaHorario = listaHorario;
				}
				if (drd.NextResult())
				{
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posMedico = drd.GetOrdinal("Medico");
					int posIndicadorVinculada = drd.GetOrdinal("IndicadorVinculada");
					int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
					int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
					int posUnidadMedicaId = drd.GetOrdinal("UnidadMedicaId");
					int posUnidadMedica = drd.GetOrdinal("UnidadMedica");

					listaturno = new List<beHorarioVista>();
					beHorarioVista obeTurnoVista;
					while (drd.Read())
					{
						obeTurnoVista = new beHorarioVista();
						obeTurnoVista.PersonaId = drd.GetInt32(posPersonaId);
						obeTurnoVista.Medico = drd.GetString(posMedico);
						obeTurnoVista.IndicadorVinculada = drd.GetString(posIndicadorVinculada);
						obeTurnoVista.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
						obeTurnoVista.TipoAdmision = drd.GetString(posTipoAdmision);
						obeTurnoVista.UnidadMedicaId = drd.GetInt32(posUnidadMedicaId);
						obeTurnoVista.UnidadMedica = drd.GetString(posUnidadMedica);
						listaturno.Add(obeTurnoVista);
					}
					obeMedicoAsientoProvisionListas.listaturno = listaturno;
				}
				drd.Close();
			}

			return (obeMedicoAsientoProvisionListas);
		}

		//---------------------
		public bePlanillasListas obtenerListas(SqlConnection con, string SucursalId,int indoa)
		{
			bePlanillasListas obePlanillasListas = new bePlanillasListas();
			List<beCampoEntero> ListaTipoAdmision = null;
			List<bePlanillaPeriodo> ListaPeriodos = null;
			List<bePlanillaMedico> ListaPlanillaMedico = null;
			List<beCampoEntero> ListaAnio = null;

			SqlCommand cmd = new SqlCommand("uspPlanillaCreacionListarV1", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalID", SucursalId);
			cmd.Parameters.AddWithValue("@IndicadorNoOA", indoa);
			cmd.CommandTimeout = 0;
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				ListaTipoAdmision = new List<beCampoEntero>();

				int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
				int posDescripcion = drd.GetOrdinal("Descripcion");
				beCampoEntero obeCampoEntero;
				while (drd.Read())
				{
					obeCampoEntero = new beCampoEntero();
					obeCampoEntero.campo1 = drd.GetInt32(posTipoAdmisionId);
					obeCampoEntero.campo2 = drd.GetString(posDescripcion);
					ListaTipoAdmision.Add(obeCampoEntero);
				}
				obePlanillasListas.ListaTipoAdmision = ListaTipoAdmision;

				if (drd.NextResult())
				{
					ListaPeriodos = new List<bePlanillaPeriodo>();
					int posProcesoId = drd.GetOrdinal("ProcesoId");
					int posPeriodoNombre = drd.GetOrdinal("PeriodoNombre");
					int posTipoAdmisionId1 = drd.GetOrdinal("TipoAdmisionId");
					int posTotalProvision = drd.GetOrdinal("TotalProvision");
					int posTotalPlanilla = drd.GetOrdinal("TotalPlanilla");
					int posSaldoProcesar = drd.GetOrdinal("SaldoProcesar");
					int posPeriodoId = drd.GetOrdinal("PeriodoId");

					bePlanillaPeriodo obePlanillaPeriodo;
					while (drd.Read())
					{
						obePlanillaPeriodo = new bePlanillaPeriodo();
						obePlanillaPeriodo.ProcesoId = drd.GetInt32(posProcesoId);
						obePlanillaPeriodo.PeriodoNombre = drd.GetString(posPeriodoNombre);
						obePlanillaPeriodo.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId1);
						obePlanillaPeriodo.TotalProvision = drd.GetDecimal(posTotalProvision);
						obePlanillaPeriodo.TotalPlanilla = drd.GetDecimal(posTotalPlanilla);
						obePlanillaPeriodo.SaldoProcesar = drd.GetDecimal(posSaldoProcesar);
						obePlanillaPeriodo.PeriodoId = drd.GetInt32(posPeriodoId);
						ListaPeriodos.Add(obePlanillaPeriodo);
					}
					obePlanillasListas.ListaPeriodos = ListaPeriodos;
				}
				if (drd.NextResult())
				{
					ListaPlanillaMedico = new List<bePlanillaMedico>();
					int posProcesoId1 = drd.GetOrdinal("ProcesoId");
					int posMedicoEmpresa = drd.GetOrdinal("MedicoEmpresa");
					int posImporte = drd.GetOrdinal("Importe");
					int posDescuento = drd.GetOrdinal("Descuento");
					int posBonificacion = drd.GetOrdinal("Bonificacion");
					int posAjuste = drd.GetOrdinal("Ajuste");
					int posTotal = drd.GetOrdinal("Total");
					int posMedicoId = drd.GetOrdinal("MedicoId");
					int posTipoAdmisionId2 = drd.GetOrdinal("TipoAdmisionId");

					bePlanillaMedico obePlanillaMedico;
					while (drd.Read())
					{
						obePlanillaMedico = new bePlanillaMedico();
						obePlanillaMedico.ProcesoId = drd.GetInt32(posProcesoId1);
						obePlanillaMedico.MedicoEmpresa = drd.GetString(posMedicoEmpresa);
						obePlanillaMedico.Importe = drd.GetDecimal(posImporte);
						obePlanillaMedico.Descuento = drd.GetDecimal(posDescuento);
						obePlanillaMedico.Bonificacion = drd.GetDecimal(posBonificacion);
						obePlanillaMedico.Ajuste = drd.GetDecimal(posAjuste);
						obePlanillaMedico.Total = drd.GetDecimal(posTotal);
						obePlanillaMedico.MedicoId = drd.GetInt32(posMedicoId);
						obePlanillaMedico.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId2);
						ListaPlanillaMedico.Add(obePlanillaMedico);
					}
					obePlanillasListas.ListaPlanillaMedico = ListaPlanillaMedico;
				}
				if (drd.NextResult())
				{
					ListaAnio = new List<beCampoEntero>();

					int posPeriodoId = drd.GetOrdinal("PeriodoId");
					int posPeriodo = drd.GetOrdinal("Periodo");
					beCampoEntero obeAnio;
					while (drd.Read())
					{
						obeAnio = new beCampoEntero();
						obeAnio.campo1 = drd.GetInt32(posPeriodoId);
						obeAnio.campo2 = drd.GetString(posPeriodo);
						ListaAnio.Add(obeAnio);
					}
					obePlanillasListas.ListaAnio = ListaAnio;

				}
				drd.Close();
			}
			return (obePlanillasListas);
		}

		public bePlanillaDetalleListas obtenerDetalleListas(SqlConnection con, string lista,int indNoOA)
		{
			bePlanillaDetalleListas obePlanillaDetalleListas = new bePlanillaDetalleListas();
			List<bePlanillaDetalleProduccion> lbePlanillaDetalleProduccion = null;
			List<bePlanillaDetalleBonificacion> lbePlanillaDetalleBonificacion = null;
			List<bePlanillaDetalleMontoFijo> lbePlanillaDetalleMontoFijo = null;

			SqlCommand cmd = new SqlCommand("uspPlanillaCreacionListarDetalleV4", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@Lista", lista);
			cmd.Parameters.AddWithValue("@IndicadorNoOA", indNoOA);
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				lbePlanillaDetalleProduccion = new List<bePlanillaDetalleProduccion>();

				int posMedico = drd.GetOrdinal("Medico");
				int posCodigoOA = drd.GetOrdinal("CodigoOA");
				int posPaciente = drd.GetOrdinal("Paciente");
				int posIdExpediente = drd.GetOrdinal("IdExpediente");
				int posPrestacion = drd.GetOrdinal("Prestacion");
				int posFechaAtencionPrestacion = drd.GetOrdinal("FechaAtencionPrestacion");
				int posFechaAtendido = drd.GetOrdinal("FechaAtendido");
				int posFechaTerminado = drd.GetOrdinal("FechaTerminado");
				int posPrecioUnitarioPrestacion = drd.GetOrdinal("PrecioUnitarioPrestacion");
				int posCantidad = drd.GetOrdinal("Cantidad");
				int posMontoImponiblePrestacion = drd.GetOrdinal("MontoImponiblePrestacion");
				int posValorMedida = drd.GetOrdinal("ValorMedida");
				int posTipoValor = drd.GetOrdinal("TipoValor");
				int posValor = drd.GetOrdinal("Valor");
				int posPorcentaje = drd.GetOrdinal("Porcentaje");
				int posParteClinica = drd.GetOrdinal("ParteClinica");
				int posImporte = drd.GetOrdinal("Importe");
				int posBonificacion = drd.GetOrdinal("Bonificacion");
				int posAjuste = drd.GetOrdinal("Ajuste");
				int posTotal = drd.GetOrdinal("Total");
				int posFechaInicioOA = drd.GetOrdinal("FechaInicioOA");
				int posTipoPaciente = drd.GetOrdinal("TipoPaciente");
				int posTipoAtencion = drd.GetOrdinal("TipoAtencion");
				int posAseguradora = drd.GetOrdinal("Aseguradora");
				int posServicio = drd.GetOrdinal("Servicio");
				int posModFacturacion = drd.GetOrdinal("ModFacturacion");
				int posEspecialidad = drd.GetOrdinal("Especialidad");
				int posDescripcionEstadoPrestacion = drd.GetOrdinal("DescripcionEstadoPrestacion");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posProcesoOrdenAtencionId = drd.GetOrdinal("ProcesoOrdenAtencionId");
				int posPeriodoProduccion = drd.GetOrdinal("PeriodoProduccion");
				int posIdOrdenAtencion = drd.GetOrdinal("IdOrdenAtencion");
				int posLineaOrdenAtencion = drd.GetOrdinal("LineaOrdenAtencion");
				

				bePlanillaDetalleProduccion obePlanillaDetalleProduccion;
				while (drd.Read())
				{
					obePlanillaDetalleProduccion = new bePlanillaDetalleProduccion();
					obePlanillaDetalleProduccion.Medico = drd.GetString(posMedico);
					obePlanillaDetalleProduccion.CodigoOA = drd.GetString(posCodigoOA);

					obePlanillaDetalleProduccion.Paciente = drd.GetString(posPaciente);
					obePlanillaDetalleProduccion.IdExpediente = drd.GetInt32(posIdExpediente);
					obePlanillaDetalleProduccion.Prestacion = drd.GetString(posPrestacion);
					obePlanillaDetalleProduccion.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion);
					obePlanillaDetalleProduccion.FechaAtendido = drd.GetDateTime(posFechaAtendido);
					obePlanillaDetalleProduccion.FechaTerminado = drd.GetDateTime(posFechaTerminado);
					obePlanillaDetalleProduccion.PrecioUnitarioPrestacion = drd.GetDecimal(posPrecioUnitarioPrestacion);
					obePlanillaDetalleProduccion.Cantidad = drd.GetDecimal(posCantidad);
					obePlanillaDetalleProduccion.MontoImponiblePrestacion = drd.GetDecimal(posMontoImponiblePrestacion);
					obePlanillaDetalleProduccion.ValorMedida = drd.GetDecimal(posValorMedida);

					obePlanillaDetalleProduccion.TipoValor = drd.GetString(posTipoValor);
					obePlanillaDetalleProduccion.Valor = drd.GetDecimal(posValor);
					obePlanillaDetalleProduccion.Porcentaje = drd.GetDecimal(posPorcentaje);
					obePlanillaDetalleProduccion.ParteClinica = drd.GetDecimal(posParteClinica);
					obePlanillaDetalleProduccion.Importe = drd.GetDecimal(posImporte);
					obePlanillaDetalleProduccion.Bonificacion = drd.GetDecimal(posBonificacion);
					obePlanillaDetalleProduccion.Ajuste = drd.GetDecimal(posAjuste);
					obePlanillaDetalleProduccion.Total = drd.GetDecimal(posTotal);
					obePlanillaDetalleProduccion.FechaInicioOA = drd.GetDateTime(posFechaInicioOA);
					obePlanillaDetalleProduccion.TipoPaciente = drd.GetString(posTipoPaciente);
					obePlanillaDetalleProduccion.TipoAtencion = drd.GetString(posTipoAtencion);
					obePlanillaDetalleProduccion.Aseguradora = drd.GetString(posAseguradora);
					obePlanillaDetalleProduccion.Servicio = drd.GetString(posServicio);

					obePlanillaDetalleProduccion.ModFacturacion = drd.GetString(posModFacturacion);

					obePlanillaDetalleProduccion.Especialidad = drd.GetString(posEspecialidad);
					obePlanillaDetalleProduccion.DescripcionEstadoPrestacion = drd.GetString(posDescripcionEstadoPrestacion);
					obePlanillaDetalleProduccion.EstadoRegistro = drd.GetString(posEstadoRegistro);
					obePlanillaDetalleProduccion.ProcesoOrdenAtencionId = drd.GetInt32(posProcesoOrdenAtencionId);
					obePlanillaDetalleProduccion.PeriodoProduccion = drd.GetString(posPeriodoProduccion);

					obePlanillaDetalleProduccion.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion);
					obePlanillaDetalleProduccion.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion);
					lbePlanillaDetalleProduccion.Add(obePlanillaDetalleProduccion);
				}
				obePlanillaDetalleListas.ListaProduccion = lbePlanillaDetalleProduccion;

				if (drd.NextResult())
				{
					lbePlanillaDetalleBonificacion = new List<bePlanillaDetalleBonificacion>();
					int posMedicob = drd.GetOrdinal("Medico");
					int posFecha = drd.GetOrdinal("Fecha");
					int posHoraInicio = drd.GetOrdinal("HoraInicio");
					int posHoraFin = drd.GetOrdinal("HoraFin");
					int posHorasProgramadas = drd.GetOrdinal("HorasProgramadas");
					int posDia = drd.GetOrdinal("Dia");
					int posIndicadorFeriado = drd.GetOrdinal("IndicadorFeriado");
					int posValorContrato = drd.GetOrdinal("ValorContrato");
					int posImporteb = drd.GetOrdinal("Importe");
					int posBonificacionb = drd.GetOrdinal("Bonificacion");
					int posTotalb = drd.GetOrdinal("Total");
					int posEspecialidadb = drd.GetOrdinal("Especialidad");
					int posTipoAtencionb = drd.GetOrdinal("TipoAtencion");
					int posEstadoRegistrob = drd.GetOrdinal("EstadoRegistro");
					int posProcesoMedicoHorarioId = drd.GetOrdinal("ProcesoMedicoHorarioId");

					bePlanillaDetalleBonificacion obePlanillaDetalleBonificacion;
					while (drd.Read())
					{
						obePlanillaDetalleBonificacion = new bePlanillaDetalleBonificacion();
						obePlanillaDetalleBonificacion.Medico = drd.GetString(posMedicob);
						obePlanillaDetalleBonificacion.Fecha = drd.GetString(posFecha);
						obePlanillaDetalleBonificacion.HoraInicio = drd.GetString(posHoraInicio);
						obePlanillaDetalleBonificacion.HoraFin = drd.GetString(posHoraFin);
						obePlanillaDetalleBonificacion.HorasProgramadas = drd.GetDecimal(posHorasProgramadas);
						obePlanillaDetalleBonificacion.Dia = drd.GetString(posDia);
						obePlanillaDetalleBonificacion.IndicadorFeriado = drd.GetBoolean(posIndicadorFeriado);
						obePlanillaDetalleBonificacion.ValorContrato = drd.GetDecimal(posValorContrato);
						obePlanillaDetalleBonificacion.Importe = drd.GetDecimal(posImporteb);
						obePlanillaDetalleBonificacion.Bonificacion = drd.GetDecimal(posBonificacionb);
						obePlanillaDetalleBonificacion.Total = drd.GetDecimal(posTotalb);
						obePlanillaDetalleBonificacion.Especialidad = drd.GetString(posEspecialidadb);
						obePlanillaDetalleBonificacion.TipoAtencion = drd.GetString(posTipoAtencionb);
						obePlanillaDetalleBonificacion.EstadoRegistro = drd.GetString(posEstadoRegistrob);
						obePlanillaDetalleBonificacion.ProcesoMedicoHorarioId = drd.GetInt32(posProcesoMedicoHorarioId);
						lbePlanillaDetalleBonificacion.Add(obePlanillaDetalleBonificacion);
					}
					obePlanillaDetalleListas.ListaBonificacion = lbePlanillaDetalleBonificacion;
				}
				if (drd.NextResult())
				{
					lbePlanillaDetalleMontoFijo = new List<bePlanillaDetalleMontoFijo>();
					int posPersonaId3 = drd.GetOrdinal("PersonaId");
					int posDescripcion3 = drd.GetOrdinal("Descripcion");
					int posImporte3 = drd.GetOrdinal("Importe");
					int posConceptoMontoFijoId3 = drd.GetOrdinal("ConceptoMontoFijoId");
					int posConceptoMontoFijo3 = drd.GetOrdinal("ConceptMontoFijo");
					int posIndicadorAdministrativo3 = drd.GetOrdinal("IndicadorAdministrativo");
					int posPeriodo3 = drd.GetOrdinal("Periodo");
					int posProcesoMedicoConceptoId = drd.GetOrdinal("ProcesoMedicoConceptoId");
					int posMedico3 = drd.GetOrdinal("Medico");
					bePlanillaDetalleMontoFijo obePlanillaDetalleMontoFijo;
					while (drd.Read())
					{
						obePlanillaDetalleMontoFijo = new bePlanillaDetalleMontoFijo();
						obePlanillaDetalleMontoFijo.PersonaId = drd.GetInt32(posPersonaId3);
						obePlanillaDetalleMontoFijo.Descripcion = drd.GetString(posDescripcion3);
						obePlanillaDetalleMontoFijo.Importe = drd.GetDecimal(posImporte3);
						obePlanillaDetalleMontoFijo.ConceptoMontoFijoId = drd.GetInt32(posConceptoMontoFijoId3);
						obePlanillaDetalleMontoFijo.ConceptoMontoFijo = drd.GetString(posConceptoMontoFijo3);
						obePlanillaDetalleMontoFijo.IndicadorAdministrativo = drd.GetBoolean(posIndicadorAdministrativo3);
						obePlanillaDetalleMontoFijo.Periodo = drd.GetString(posPeriodo3);
						obePlanillaDetalleMontoFijo.ProcesoMedicoConceptoId = drd.GetInt32(posProcesoMedicoConceptoId);
						obePlanillaDetalleMontoFijo.Persona = drd.GetString(posMedico3);
						lbePlanillaDetalleMontoFijo.Add(obePlanillaDetalleMontoFijo);
					}
					obePlanillaDetalleListas.ListaMontoFijo = lbePlanillaDetalleMontoFijo;
				}
				drd.Close();
			}
			return (obePlanillaDetalleListas);
		}
		public string grabarPlanilla(SqlConnection con, string lista, string listadetalle, int anio, string su, int usuario, string descripcion,string TipoProceso,int idProcesoPlanilla, SqlTransaction Sqltx, bool indicadorSeparar, bool indDescuento)
		{
			string rpta = "";
			SqlCommand cmd = new SqlCommand("uspPlanillaAdicionarV3", con, Sqltx);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;

			SqlParameter par1 = cmd.Parameters.Add("@ListaTotales", SqlDbType.VarChar, -1);
			par1.Direction = ParameterDirection.Input;
			par1.Value = lista;

			SqlParameter par2 = cmd.Parameters.Add("@ListaDetalle", SqlDbType.VarChar, -1);
			par2.Direction = ParameterDirection.Input;
			par2.Value = listadetalle;

			SqlParameter par3 = cmd.Parameters.Add("@PeriodoId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = anio;

			SqlParameter par5 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par5.Direction = ParameterDirection.Input;
			par5.Value = su;

			SqlParameter par6 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par6.Direction = ParameterDirection.Input;
			par6.Value = usuario;

			SqlParameter par7 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar, 200);
			par7.Direction = ParameterDirection.Input;
			par7.Value = descripcion;

			SqlParameter par8 = cmd.Parameters.Add("@TipoProceso", SqlDbType.Char, 1);
			par8.Direction = ParameterDirection.Input;
			par8.Value = TipoProceso;

			SqlParameter par9 = cmd.Parameters.Add("@ProcesoPlanillaIdEditar", SqlDbType.Int);
			par9.Direction = ParameterDirection.Input;
			par9.Value = idProcesoPlanilla;

			SqlParameter par10 = cmd.Parameters.Add("@IndicadorSeparar", SqlDbType.Bit);
			par10.Direction = ParameterDirection.Input;
			par10.Value = indicadorSeparar;

			SqlParameter par11 = cmd.Parameters.Add("@IndDescuento", SqlDbType.Bit);
			par11.Direction = ParameterDirection.Input;
			par11.Value = indDescuento;

			object valor = cmd.ExecuteScalar();
			rpta = valor.ToString();
			return (rpta);
		}


		public string grabarPlanillaCarga(SqlConnection con, string lista, string descripcion, int anio, string su, int usuario, int tipo, SqlTransaction Sqltx, bool indicadorSeparar)
		{
			string rpta = "";
			SqlCommand cmd = new SqlCommand("uspPlanillaExcelGrabarV2", con, Sqltx);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;

			SqlParameter par1 = cmd.Parameters.Add("@ListaOAs", SqlDbType.VarChar, -1);
			par1.Direction = ParameterDirection.Input;
			par1.Value = lista;

			SqlParameter par2 = cmd.Parameters.Add("@PeriodoId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = anio;

			SqlParameter par3 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par3.Direction = ParameterDirection.Input;
			par3.Value = su;

			SqlParameter par4 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par4.Direction = ParameterDirection.Input;
			par4.Value = usuario;

			SqlParameter par5 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar, 200);
			par5.Direction = ParameterDirection.Input;
			par5.Value = descripcion;

			SqlParameter par6 = cmd.Parameters.Add("@TipoPlanilla", SqlDbType.Int);
			par6.Direction = ParameterDirection.Input;
			par6.Value = tipo;

			SqlParameter par7 = cmd.Parameters.Add("@IndicadorSeparar", SqlDbType.Bit);
			par7.Direction = ParameterDirection.Input;
			par7.Value = indicadorSeparar;

			object valor = cmd.ExecuteScalar();
			rpta = valor.ToString();
			return (rpta);
		}

		public List<bePlanillaUnificacion> listarUnificacionPlanilla(SqlConnection con, int id)
		{
			List<bePlanillaUnificacion> lbePlanillaUnificacion = null;
			SqlCommand cmd = null;

			cmd = new SqlCommand("uspPlanillaUnificaListar", con);

			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@PlanillaIdUnificada", id);

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				lbePlanillaUnificacion = new List<bePlanillaUnificacion>();
				int posPlanillaId = drd.GetOrdinal("PlanillaId");
				int posMedico = drd.GetOrdinal("NombreCompleto");
				int posImporte = drd.GetOrdinal("Importe");
				int posBonificacion = drd.GetOrdinal("Bonificacion");
				int posDescuento = drd.GetOrdinal("Descuento");
				int posAjuste = drd.GetOrdinal("Ajuste");
				int posTotal = drd.GetOrdinal("Total");
				int posEstadoRegistro = drd.GetOrdinal("Estado");
				bePlanillaUnificacion obePlanillaUnificacion;
				while (drd.Read())
				{
					obePlanillaUnificacion = new bePlanillaUnificacion();
					obePlanillaUnificacion.PlanillaId = drd.GetInt32(posPlanillaId);
					obePlanillaUnificacion.Medico = drd.GetString(posMedico);
					obePlanillaUnificacion.Importe = drd.GetDecimal(posImporte);
					obePlanillaUnificacion.Bonificacion = drd.GetDecimal(posBonificacion);
					obePlanillaUnificacion.Descuento = drd.GetDecimal(posDescuento);
					obePlanillaUnificacion.Ajuste = drd.GetDecimal(posAjuste);
					obePlanillaUnificacion.Total = drd.GetDecimal(posTotal);
					obePlanillaUnificacion.Estado = drd.GetString(posEstadoRegistro);
					lbePlanillaUnificacion.Add(obePlanillaUnificacion);
				}
				drd.Close();
			}
			return lbePlanillaUnificacion;
		}

		public string unificarPlanillas(SqlConnection con, int idPlanillaUnificada, string lstIdPlanillas, string motivo, int idUsuario)
		{
			SqlCommand cmd = new SqlCommand("uspPlanillaUnificaGrabar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@PlanillaIdUnificada", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = idPlanillaUnificada;
			SqlParameter par2 = cmd.Parameters.Add("@LstPlanillaId", SqlDbType.VarChar);
			par2.Direction = ParameterDirection.Input;
			par2.Value = lstIdPlanillas;
			SqlParameter par3 = cmd.Parameters.Add("@Motivo", SqlDbType.VarChar);
			par3.Direction = ParameterDirection.Input;
			par3.Value = motivo;
			SqlParameter par4 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par4.Direction = ParameterDirection.Input;
			par4.Value = idUsuario;

			object n = cmd.ExecuteScalar();
			string resultado = n.ToString();
			return (resultado);

		}

		public beAprobacionPagoListas AprobacionPago_Listas(SqlConnection con, string idSucursal)
		{
			beAprobacionPagoListas obeAprobacionPagoListas = null;
			SqlCommand cmd = new SqlCommand("uspPlanillaAprobarListas", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar);
			par1.Direction = ParameterDirection.Input;
			par1.Value = idSucursal;

			SqlDataReader drd = cmd.ExecuteReader();

			if (drd != null)
			{
				obeAprobacionPagoListas = new beAprobacionPagoListas();
				obeAprobacionPagoListas.ListaServicio = new List<beCampoEntero>();
				int posServicioId = drd.GetOrdinal("ServicioId");
				int posDescripcion = drd.GetOrdinal("Descripcion");
				beCampoEntero obeServicio;
				while (drd.Read())
				{
					obeServicio = new beCampoEntero();
					obeServicio.campo1 = drd.GetInt32(posServicioId);
					obeServicio.campo2 = drd.GetString(posDescripcion).Trim();
					obeAprobacionPagoListas.ListaServicio.Add(obeServicio);
				}
				if (drd.NextResult())
				{
					obeAprobacionPagoListas.ListaPeriodo = new List<beCampoEntero>();
					beCampoEntero obePeriodo;
					int posPeriodoId = drd.GetOrdinal("PeriodoId");
					int posPeriodo = drd.GetOrdinal("Periodo");
					while (drd.Read())
					{
						obePeriodo = new beCampoEntero();
						obePeriodo.campo1 = drd.GetInt32(posPeriodoId);
						obePeriodo.campo2 = drd.GetString(posPeriodo).Trim();
						obeAprobacionPagoListas.ListaPeriodo.Add(obePeriodo);
					}
				}
				if (drd.NextResult())
                {
					obeAprobacionPagoListas.ListaTipoAdmision = new List<beCampoEntero>();
					beCampoEntero obeTipoAdmision;
					int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
					posDescripcion = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeTipoAdmision = new beCampoEntero();
						obeTipoAdmision.campo1 = drd.GetInt32(posTipoAdmisionId);
						obeTipoAdmision.campo2 = drd.GetString(posDescripcion).Trim();
						obeAprobacionPagoListas.ListaTipoAdmision.Add(obeTipoAdmision);
					}
				}
				if (drd.NextResult())
				{
					obeAprobacionPagoListas.ListaEstado = new List<beCampoCadenaCorto>();
					beCampoCadenaCorto obeEstado;
					int posEstadoId = drd.GetOrdinal("EstadoId");
					posDescripcion = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeEstado = new beCampoCadenaCorto();
						obeEstado.Campo1 = drd.GetString(posEstadoId);
						obeEstado.Campo2 = drd.GetString(posDescripcion).Trim();
						obeAprobacionPagoListas.ListaEstado.Add(obeEstado);
					}
				}
				drd.Close();
			}

			return obeAprobacionPagoListas;

		}

		public List<bePlanillaUnificacion> AprobacionPago_Listar(SqlConnection con, int id)
		{
			List<bePlanillaUnificacion> lbePlanillaUnificacion = null;
			SqlCommand cmd = null;

			cmd = new SqlCommand("uspPlanillaUnificaListar", con);

			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@PlanillaIdUnificada", id);

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				lbePlanillaUnificacion = new List<bePlanillaUnificacion>();
				int posPlanillaId = drd.GetOrdinal("PlanillaId");
				int posMedico = drd.GetOrdinal("NombreCompleto");
				int posImporte = drd.GetOrdinal("Importe");
				int posBonificacion = drd.GetOrdinal("Bonificacion");
				int posDescuento = drd.GetOrdinal("Descuento");
				int posAjuste = drd.GetOrdinal("Ajuste");
				int posTotal = drd.GetOrdinal("Total");
				int posEstadoRegistro = drd.GetOrdinal("Estado");
				bePlanillaUnificacion obePlanillaUnificacion;
				while (drd.Read())
				{
					obePlanillaUnificacion = new bePlanillaUnificacion();
					obePlanillaUnificacion.PlanillaId = drd.GetInt32(posPlanillaId);
					obePlanillaUnificacion.Medico = drd.GetString(posMedico);
					obePlanillaUnificacion.Importe = drd.GetDecimal(posImporte);
					obePlanillaUnificacion.Bonificacion = drd.GetDecimal(posBonificacion);
					obePlanillaUnificacion.Descuento = drd.GetDecimal(posDescuento);
					obePlanillaUnificacion.Ajuste = drd.GetDecimal(posAjuste);
					obePlanillaUnificacion.Total = drd.GetDecimal(posTotal);
					obePlanillaUnificacion.Estado = drd.GetString(posEstadoRegistro);
					lbePlanillaUnificacion.Add(obePlanillaUnificacion);
				}
				drd.Close();
			}
			return lbePlanillaUnificacion;
		}

		public string AprobacionPago_Grabar(SqlConnection con, string idSucursal, string lstIdPlanillas, int idUsuario)
		{
			SqlCommand cmd = new SqlCommand("uspPlanillaAprobarGrabar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar);
			par1.Direction = ParameterDirection.Input;
			par1.Value = idSucursal;
			SqlParameter par2 = cmd.Parameters.Add("@LstPlanillaId", SqlDbType.VarChar);
			par2.Direction = ParameterDirection.Input;
			par2.Value = lstIdPlanillas;
			SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = idUsuario;

			object n = cmd.ExecuteScalar();
			string resultado = n.ToString();
			return (resultado);

		}
	}
}
