using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;
namespace HHMM.Librerias.AccesoDatos
{
	public class daReporte
	{
		public beReporteVista listarReporte(SqlConnection con, int ti, string su, DateTime fecini, DateTime fecfin, int mes, int anio)
		{
			beReporteVista obeReporteVista = null;
			List<beCampoEntero> lbeTipoAtencion = null;
			SqlCommand cmd = new SqlCommand("uspReporteControl", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@TipoReporte", ti);
			cmd.Parameters.AddWithValue("@SucursalId", su);
			cmd.Parameters.AddWithValue("@FechaInicioOA", fecini);
			cmd.Parameters.AddWithValue("@FechaFinOA", fecfin);
			cmd.Parameters.AddWithValue("@Mes", mes);
			cmd.Parameters.AddWithValue("@Anio", anio);
			cmd.CommandTimeout = 0;
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeReporteVista = new beReporteVista();
				lbeTipoAtencion = new List<beCampoEntero>();
				int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
				int posDescripcionCorta = drd.GetOrdinal("DescripcionCorta");
				beCampoEntero obeTipoAtencion;
				while (drd.Read())
				{
					obeTipoAtencion = new beCampoEntero();
					obeTipoAtencion.campo1 = drd.GetInt32(posTipoAtencionId);
					obeTipoAtencion.campo2 = drd.GetString(posDescripcionCorta).Trim();
					lbeTipoAtencion.Add(obeTipoAtencion);
				}
				obeReporteVista.ListaTipoAtencion = lbeTipoAtencion;
				List<beCampoEntero> lbeTipoServicio = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeTipoServicio;
					int posServicioId = drd.GetOrdinal("ServicioId");
					int posDescripcion = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeTipoServicio = new beCampoEntero();
						obeTipoServicio.campo1 = drd.GetInt32(posServicioId);
						obeTipoServicio.campo2 = drd.GetString(posDescripcion).Trim();
						lbeTipoServicio.Add(obeTipoServicio);
					}
					obeReporteVista.ListaServicio = lbeTipoServicio;
				}
				if (drd.NextResult())
				{
					int posFechaActualizacion = drd.GetOrdinal("FechaActualizacion");
					while (drd.Read())
					{
						obeReporteVista.FechaActualizacion = drd.GetDateTime(posFechaActualizacion);
					}
				}
				List<beReporte> lbeReporte = new List<beReporte>();
				if (drd.NextResult())
				{
					beReporte obeReporte;
					int posTipoRegistro = drd.GetOrdinal("TipoRegistro");
					int posTipoAtencion = drd.GetOrdinal("TipoAtencion");
					int posCodigoOA = drd.GetOrdinal("CodigoOA");
					int posFechaInicioOA = drd.GetOrdinal("FechaInicioOA");
					int posPeriodoProduccion = drd.GetOrdinal("PeriodoProduccion");
					int posFechaAtencionPrestacion = drd.GetOrdinal("FechaAtencionPrestacion");
					int posTipoServicio = drd.GetOrdinal("TipoServicio");
					int posCodigoPrestacion = drd.GetOrdinal("CodigoPrestacion");
					int posPrestacion = drd.GetOrdinal("Prestacion");
					int posCantidad = drd.GetOrdinal("Cantidad");
					int posPrecioUnitarioPrestacion = drd.GetOrdinal("PrecioUnitarioPrestacion");
					int posMontoImponiblePrestacion = drd.GetOrdinal("MontoImponiblePrestacion");
					int posEstadoPrestacion = drd.GetOrdinal("EstadoPrestacion");
					int posEstadoOA = drd.GetOrdinal("EstadoOA");
					int posidOrdenAtencion = drd.GetOrdinal("IdOrdenAtencion");
					int posLineaOrdenAtencion = drd.GetOrdinal("LineaOrdenAtencion");
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posMedico = drd.GetOrdinal("Medico");
					int posMedicoSecundarioId = drd.GetOrdinal("MedicoSecundarioId");
					int posMedicoSecundario = drd.GetOrdinal("MedicoSecundario");
					int posEspecialidad = drd.GetOrdinal("Especialidad");
					int posNombrePaciente = drd.GetOrdinal("NombrePaciente");
					int posTipoPaciente = drd.GetOrdinal("TipoPaciente");
					int posAseguradora = drd.GetOrdinal("Aseguradora");
					int posModFacturacion = drd.GetOrdinal("ModFacturacion");
					int posFechaHoraCreacion = drd.GetOrdinal("FechaHoraCreacion");
					int posFechaHoraModificacion = drd.GetOrdinal("FechaHoraModificacion");
					int posFechaHoraAtendido = drd.GetOrdinal("FechaHoraAtendido");
					int posFechaHoraTerminado = drd.GetOrdinal("FechaHoraTerminado");
					int posIndInforme = drd.GetOrdinal("IndicadorRequiereInforme");
					int posIndAnamnesis = drd.GetOrdinal("IndicadorTieneAnamnesis");
					int posIndCierreEME = drd.GetOrdinal("IndicadorCierreEmergencia");
					int posIndHonorario = drd.GetOrdinal("IndHonorario");
					int posIdTransaccion = drd.GetOrdinal("IdTransaccion");
					int posTransaccionCaja = drd.GetOrdinal("TransaccionCaja");
					int posEstadoHospitalizacion = drd.GetOrdinal("EstadoHospitalizacion");
					int posSituacionDetalleHospitalizacion = drd.GetOrdinal("SituacionDetalleHospitalizacion");
					int posIndicadorEliminado = drd.GetOrdinal("IndicadorEliminado");
					int posSituacionDetalleExpediente = drd.GetOrdinal("SituacionDetalleExpediente");
					int posIdPlanilla = drd.GetOrdinal("IdPlanilla");
					int posEstadoPlanilla = drd.GetOrdinal("EstadoPlanilla");
					int posIndicadorProvisionado = drd.GetOrdinal("IndicadorProvisionado");
					int posProcesoId = drd.GetOrdinal("ProcesoId");
					int posTipoObservacion = drd.GetOrdinal("TipoObservacion");
					int posPatron = drd.GetOrdinal("Patron");
					int posObservacion = drd.GetOrdinal("Observacion");
					int posValidacionId = drd.GetOrdinal("ValidacionId");
					int posDescripcionValidacion = drd.GetOrdinal("DescripcionValidacion");
					while (drd.Read())
					{
						obeReporte = new beReporte();
						obeReporte.TipoRegistro = drd.GetString(posTipoRegistro);
						obeReporte.TipoAtencion = drd.GetInt32(posTipoAtencion);
						obeReporte.CodigoOA = drd.GetString(posCodigoOA).Trim();
						obeReporte.FechaInicioOA = drd.GetDateTime(posFechaInicioOA);
						obeReporte.PeriodoProduccion = drd.GetString(posPeriodoProduccion);
						obeReporte.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion);
						obeReporte.TipoServicio = drd.GetInt32(posTipoServicio);
						obeReporte.CodigoPrestacion = drd.GetString(posCodigoPrestacion).Trim();
						obeReporte.Prestacion = drd.GetString(posPrestacion).Trim();
						obeReporte.Cantidad = drd.GetDecimal(posCantidad);
						obeReporte.PrecioUnitarioPrestacion = drd.GetDecimal(posPrecioUnitarioPrestacion);
						obeReporte.MontoImponiblePrestacion = drd.GetDecimal(posMontoImponiblePrestacion);
						obeReporte.EstadoPrestacion = drd.GetString(posEstadoPrestacion).Trim();
						obeReporte.EstadoOA = drd.GetString(posEstadoOA).Trim();
						obeReporte.IdOrdenAtencion = drd.GetInt32(posidOrdenAtencion);
						obeReporte.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion);
						obeReporte.PersonaId = drd.GetInt32(posPersonaId);
						obeReporte.Medico = drd.GetString(posMedico).Trim();
						obeReporte.MedicoSecundarioId = drd.GetInt32(posMedicoSecundarioId);
						obeReporte.MedicoSecundario = drd.GetString(posMedicoSecundario).Trim();
						obeReporte.Especialidad = drd.GetString(posEspecialidad).Trim();
						obeReporte.NombrePaciente = drd.GetString(posNombrePaciente);
						obeReporte.TipoPaciente = drd.GetString(posTipoPaciente);
						obeReporte.Aseguradora = drd.GetString(posAseguradora);
						obeReporte.ModFacturacion = drd.GetString(posModFacturacion);
						obeReporte.FechaHoraCreacion = drd.GetDateTime(posFechaHoraCreacion);
						obeReporte.FechaHoraModificacion = drd.GetDateTime(posFechaHoraModificacion);
						obeReporte.FechaHoraAtendido = drd.GetDateTime(posFechaHoraAtendido);
						obeReporte.FechaHoraTerminado = drd.GetDateTime(posFechaHoraTerminado);
						obeReporte.IndInforme = drd.GetString(posIndInforme).Trim();
						obeReporte.IndAnamnesis = drd.GetString(posIndAnamnesis).Trim();
						obeReporte.IndCierreEME = drd.GetString(posIndCierreEME).Trim();
						obeReporte.IndHonorario = drd.GetString(posIndHonorario).Trim();
						obeReporte.IdTransaccion = drd.GetInt32(posIdTransaccion);
						obeReporte.TransaccionCaja = drd.GetString(posTransaccionCaja);
						obeReporte.EstadoHospitalizacion = drd.GetString(posEstadoHospitalizacion).Trim();
						obeReporte.SituacionDetalleHospitalizacion = drd.GetString(posSituacionDetalleHospitalizacion).Trim();
						obeReporte.IndicadorEliminado = drd.GetString(posIndicadorEliminado);
						obeReporte.SituacionDetalleExpediente = drd.GetString(posSituacionDetalleExpediente).Trim();
						obeReporte.IdPlanilla = drd.GetInt32(posIdPlanilla);
						obeReporte.EstadoPlanilla = drd.GetString(posEstadoPlanilla);
						obeReporte.IndicadorProvisionado = drd.GetString(posIndicadorProvisionado);
						obeReporte.ProcesoId = drd.GetInt32(posProcesoId);
						obeReporte.TipoObservacion = drd.GetString(posTipoObservacion);
						obeReporte.Patron = drd.GetString(posPatron);
						obeReporte.Observacion = drd.GetString(posObservacion);
						obeReporte.ValidacionId = drd.GetString(posValidacionId);
						obeReporte.DescripcionValidacion = drd.GetString(posDescripcionValidacion);
						lbeReporte.Add(obeReporte);
					}
					obeReporteVista.ListaReporte = lbeReporte;
				}
				drd.Close();
			}
			return (obeReporteVista);
		}

		public beReporteVista2 listarReporte2(SqlConnection con, int ti, string su, DateTime fecini, DateTime fecfin, int mes, int anio)
		{
			beReporteVista2 obeReporteVista = null;
			List<beCampoEntero> lbeTipoAtencion = null;
			SqlCommand cmd = new SqlCommand("uspReporteControl", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@TipoReporte", ti);
			cmd.Parameters.AddWithValue("@SucursalId", su);
			cmd.Parameters.AddWithValue("@FechaInicioOA", fecini);
			cmd.Parameters.AddWithValue("@FechaFinOA", fecfin);
			cmd.Parameters.AddWithValue("@Mes", mes);
			cmd.Parameters.AddWithValue("@Anio", anio);
			cmd.CommandTimeout = 0;
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeReporteVista = new beReporteVista2();
				lbeTipoAtencion = new List<beCampoEntero>();
				int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
				int posDescripcionCorta = drd.GetOrdinal("DescripcionCorta");
				beCampoEntero obeTipoAtencion;
				while (drd.Read())
				{
					obeTipoAtencion = new beCampoEntero();
					obeTipoAtencion.campo1 = drd.GetInt32(posTipoAtencionId);
					obeTipoAtencion.campo2 = drd.GetString(posDescripcionCorta).Trim();
					lbeTipoAtencion.Add(obeTipoAtencion);
				}
				obeReporteVista.ListaTipoAtencion = lbeTipoAtencion;
				List<beCampoEntero> lbeTipoServicio = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeTipoServicio;
					int posServicioId = drd.GetOrdinal("ServicioId");
					int posDescripcion = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeTipoServicio = new beCampoEntero();
						obeTipoServicio.campo1 = drd.GetInt32(posServicioId);
						obeTipoServicio.campo2 = drd.GetString(posDescripcion).Trim();
						lbeTipoServicio.Add(obeTipoServicio);
					}
					obeReporteVista.ListaServicio = lbeTipoServicio;
				}
				if (drd.NextResult())
				{
					int posFechaActualizacion = drd.GetOrdinal("FechaActualizacion");
					while (drd.Read())
					{
						obeReporteVista.FechaActualizacion = drd.GetDateTime(posFechaActualizacion);
					}
				}
				
				List<beReporteControlHorario> lbeReporteControlHorario = new List<beReporteControlHorario>();
				if (drd.NextResult())
				{
					beReporteControlHorario obeReporteControlHorario;
					int posIdMedico2 = drd.GetOrdinal("IdMedico");
					int posMedico2 = drd.GetOrdinal("Medico");
					int posFecha2 = drd.GetOrdinal("Fecha");
					int posHoraInicio2 = drd.GetOrdinal("HoraInicio");
					int posHoraFin2 = drd.GetOrdinal("HoraFin");
					int posDia2 = drd.GetOrdinal("Dia");
					int posIndicadorFeriado2 = drd.GetOrdinal("IndicadorFeriado");
					int posEspecialidad2 = drd.GetOrdinal("Especialidad");
					int posTipoAtencion2 = drd.GetOrdinal("TipoAtencion");
					int posEstadoRegistro2 = drd.GetOrdinal("EstadoRegistro");
					int posUnidadMedicaId2 = drd.GetOrdinal("UnidadMedicaId");
					int posUnidadMedica2 = drd.GetOrdinal("UnidadMedica");
					while (drd.Read())
					{
						obeReporteControlHorario = new beReporteControlHorario();
						obeReporteControlHorario.IdMedico = drd.GetInt32(posIdMedico2);
						obeReporteControlHorario.Medico = drd.GetString(posMedico2);
						obeReporteControlHorario.Fecha = drd.GetDateTime(posFecha2);
						obeReporteControlHorario.HoraInicio = drd.GetDateTime(posHoraInicio2);
						obeReporteControlHorario.HoraFin = drd.GetDateTime(posHoraFin2);
						obeReporteControlHorario.Dia = drd.GetString(posDia2);
						obeReporteControlHorario.IndicadorFeriado = drd.GetBoolean(posIndicadorFeriado2);
						obeReporteControlHorario.Especialidad = drd.GetString(posEspecialidad2);
						obeReporteControlHorario.TipoAtencion = drd.GetString(posTipoAtencion2);
						obeReporteControlHorario.EstadoRegistro = drd.GetString(posEstadoRegistro2);
						obeReporteControlHorario.UnidadMedicaId = drd.GetInt32(posUnidadMedicaId2);
						obeReporteControlHorario.UnidadMedica = drd.GetString(posUnidadMedica2);
						lbeReporteControlHorario.Add(obeReporteControlHorario);
					}
					obeReporteVista.ListaReporte2 = lbeReporteControlHorario;
				}
				List<beReporteControlMontoFijo> lbeReporteControlMontoFijo = new List<beReporteControlMontoFijo>();
				if (drd.NextResult())
				{
					beReporteControlMontoFijo obeReporteControlMontoFijo;
					int posIdMedico3 = drd.GetOrdinal("IdMedico");
					int posMedico3 = drd.GetOrdinal("Medico");
					int posDescripcion3 = drd.GetOrdinal("Descripcion");
					int posFechaInicio3 = drd.GetOrdinal("FechaInicio");
					int posFechaFin3 = drd.GetOrdinal("FechaFin");
					int posValor3 = drd.GetOrdinal("Valor");
					int posConceptoMontoFijoId3 = drd.GetOrdinal("ConceptoMontoFijoId");
					int posConcepto3 = drd.GetOrdinal("Concepto");
					int posEstadoRegistro3 = drd.GetOrdinal("EstadoRegistro");
					while (drd.Read())
					{
						obeReporteControlMontoFijo = new beReporteControlMontoFijo();
						obeReporteControlMontoFijo.IdMedico = drd.GetInt32(posIdMedico3);
						obeReporteControlMontoFijo.Medico = drd.GetString(posMedico3);
						obeReporteControlMontoFijo.Descripcion = drd.GetString(posDescripcion3);
						obeReporteControlMontoFijo.FechaInicio = drd.GetDateTime(posFechaInicio3);
						obeReporteControlMontoFijo.FechaFin = drd.GetDateTime(posFechaFin3);
						obeReporteControlMontoFijo.Valor = drd.GetDecimal(posValor3);
						obeReporteControlMontoFijo.ConceptoMontoFijoId = drd.GetInt32(posConceptoMontoFijoId3);
						obeReporteControlMontoFijo.Concepto = drd.GetString(posConcepto3);
						obeReporteControlMontoFijo.EstadoRegistro = drd.GetString(posEstadoRegistro3);
						lbeReporteControlMontoFijo.Add(obeReporteControlMontoFijo);
					}
					obeReporteVista.ListaReporte3 = lbeReporteControlMontoFijo;
				}
				List<beReporteControlProduccion> lbeReporteControlProduccion = new List<beReporteControlProduccion>();
				if (drd.NextResult())
				{
					beReporteControlProduccion obeReporteControlProduccion;
					int posTipoRegistro = drd.GetOrdinal("TipoRegistro");
					int posTipoAtencion = drd.GetOrdinal("TipoAtencion");
					int posCodigoOA = drd.GetOrdinal("CodigoOA");
					int posFechaInicioOA = drd.GetOrdinal("FechaInicioOA");
					int posPeriodoProduccion = drd.GetOrdinal("PeriodoProduccion");
					int posFechaAtencionPrestacion = drd.GetOrdinal("FechaAtencionPrestacion");
					int posTipoServicio = drd.GetOrdinal("TipoServicio");
					int posCodigoPrestacion = drd.GetOrdinal("CodigoPrestacion");
					int posPrestacion = drd.GetOrdinal("Prestacion");
					int posCantidad = drd.GetOrdinal("Cantidad");
					int posPrecioUnitarioPrestacion = drd.GetOrdinal("PrecioUnitarioPrestacion");
					int posMontoImponiblePrestacion = drd.GetOrdinal("MontoImponiblePrestacion");
					int posEstadoPrestacion = drd.GetOrdinal("EstadoPrestacion");
					int posEstadoOA = drd.GetOrdinal("EstadoOA");
					int posidOrdenAtencion = drd.GetOrdinal("IdOrdenAtencion");
					int posLineaOrdenAtencion = drd.GetOrdinal("LineaOrdenAtencion");
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posMedico = drd.GetOrdinal("Medico");
					int posMedicoSecundarioId = drd.GetOrdinal("MedicoSecundarioId");
					int posMedicoSecundario = drd.GetOrdinal("MedicoSecundario");
					int posEspecialidad = drd.GetOrdinal("Especialidad");
					int posNombrePaciente = drd.GetOrdinal("NombrePaciente");
					int posTipoPaciente = drd.GetOrdinal("TipoPaciente");
					int posAseguradora = drd.GetOrdinal("Aseguradora");

					int posModFacturacion = drd.GetOrdinal("ModFacturacion");

					int posFechaHoraCreacion = drd.GetOrdinal("FechaHoraCreacion");
					int posFechaHoraModificacion = drd.GetOrdinal("FechaHoraModificacion");
					int posFechaHoraAtendido = drd.GetOrdinal("FechaHoraAtendido");
					int posFechaHoraTerminado = drd.GetOrdinal("FechaHoraTerminado");
					int posIndInforme = drd.GetOrdinal("IndicadorRequiereInforme");
					int posIndAnamnesis = drd.GetOrdinal("IndicadorTieneAnamnesis");
					int posIndCierreEME = drd.GetOrdinal("IndicadorCierreEmergencia");
					int posIndHonorario = drd.GetOrdinal("IndHonorario");
					int posIdTransaccion = drd.GetOrdinal("IdTransaccion");
					int posTransaccionCaja = drd.GetOrdinal("TransaccionCaja");
					int posEstadoHospitalizacion = drd.GetOrdinal("EstadoHospitalizacion");
					int posSituacionDetalleHospitalizacion = drd.GetOrdinal("SituacionDetalleHospitalizacion");
					int posIndicadorEliminado = drd.GetOrdinal("IndicadorEliminado");
					int posSituacionDetalleExpediente = drd.GetOrdinal("SituacionDetalleExpediente");
					int posIdPlanilla = drd.GetOrdinal("IdPlanilla");
					int posEstadoPlanilla = drd.GetOrdinal("EstadoPlanilla");
					int posIndicadorProvisionado = drd.GetOrdinal("IndicadorProvisionado");
					int posProcesoId = drd.GetOrdinal("ProcesoId");
					int posTipoObservacion = drd.GetOrdinal("TipoObservacion");
					int posPatron = drd.GetOrdinal("Patron");
					int posObservacion = drd.GetOrdinal("Observacion");
					int posValidacionId = drd.GetOrdinal("ValidacionId");
					int posDescripcionValidacion = drd.GetOrdinal("DescripcionValidacion");

					while (drd.Read())
					{
						obeReporteControlProduccion = new beReporteControlProduccion();
						obeReporteControlProduccion.TipoRegistro = drd.GetString(posTipoRegistro);
						obeReporteControlProduccion.TipoAtencion = drd.GetInt32(posTipoAtencion);
						obeReporteControlProduccion.CodigoOA = drd.GetString(posCodigoOA).Trim();
						obeReporteControlProduccion.FechaInicioOA = drd.GetDateTime(posFechaInicioOA);
						obeReporteControlProduccion.PeriodoProduccion = drd.GetString(posPeriodoProduccion);
						obeReporteControlProduccion.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion);
						obeReporteControlProduccion.TipoServicio = drd.GetInt32(posTipoServicio);
						obeReporteControlProduccion.CodigoPrestacion = drd.GetString(posCodigoPrestacion).Trim();
						obeReporteControlProduccion.Prestacion = drd.GetString(posPrestacion).Trim();
						obeReporteControlProduccion.Cantidad = drd.GetDecimal(posCantidad);
						obeReporteControlProduccion.PrecioUnitarioPrestacion = drd.GetDecimal(posPrecioUnitarioPrestacion);
						obeReporteControlProduccion.MontoImponiblePrestacion = drd.GetDecimal(posMontoImponiblePrestacion);
						obeReporteControlProduccion.EstadoPrestacion = drd.GetString(posEstadoPrestacion).Trim();
						obeReporteControlProduccion.EstadoOA = drd.GetString(posEstadoOA).Trim();
						obeReporteControlProduccion.IdOrdenAtencion = drd.GetInt32(posidOrdenAtencion);
						obeReporteControlProduccion.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion);
						obeReporteControlProduccion.PersonaId = drd.GetInt32(posPersonaId);
						obeReporteControlProduccion.Medico = drd.GetString(posMedico).Trim();
						obeReporteControlProduccion.MedicoSecundarioId = drd.GetInt32(posMedicoSecundarioId);
						obeReporteControlProduccion.MedicoSecundario = drd.GetString(posMedicoSecundario).Trim();
						obeReporteControlProduccion.Especialidad = drd.GetString(posEspecialidad).Trim();
						obeReporteControlProduccion.NombrePaciente = drd.GetString(posNombrePaciente);
						obeReporteControlProduccion.TipoPaciente = drd.GetString(posTipoPaciente);
						obeReporteControlProduccion.Aseguradora = drd.GetString(posAseguradora);

						obeReporteControlProduccion.ModFacturacion = drd.GetString(posModFacturacion);

						obeReporteControlProduccion.FechaHoraCreacion = drd.GetDateTime(posFechaHoraCreacion);
						obeReporteControlProduccion.FechaHoraModificacion = drd.GetDateTime(posFechaHoraModificacion);
						obeReporteControlProduccion.FechaHoraAtendido = drd.GetDateTime(posFechaHoraAtendido);
						obeReporteControlProduccion.FechaHoraTerminado = drd.GetDateTime(posFechaHoraTerminado);
						obeReporteControlProduccion.IndInforme = drd.GetString(posIndInforme).Trim();
						obeReporteControlProduccion.IndAnamnesis = drd.GetString(posIndAnamnesis).Trim();
						obeReporteControlProduccion.IndCierreEME = drd.GetString(posIndCierreEME).Trim();
						obeReporteControlProduccion.IndHonorario = drd.GetString(posIndHonorario).Trim();
						obeReporteControlProduccion.IdTransaccion = drd.GetInt32(posIdTransaccion);
						obeReporteControlProduccion.TransaccionCaja = drd.GetString(posTransaccionCaja);
						obeReporteControlProduccion.EstadoHospitalizacion = drd.GetString(posEstadoHospitalizacion).Trim();
						obeReporteControlProduccion.SituacionDetalleHospitalizacion = drd.GetString(posSituacionDetalleHospitalizacion).Trim();
						obeReporteControlProduccion.IndicadorEliminado = drd.GetString(posIndicadorEliminado);
						obeReporteControlProduccion.SituacionDetalleExpediente = drd.GetString(posSituacionDetalleExpediente).Trim();
						obeReporteControlProduccion.IdPlanilla = drd.GetInt32(posIdPlanilla);
						obeReporteControlProduccion.EstadoPlanilla = drd.GetString(posEstadoPlanilla);
						obeReporteControlProduccion.IndicadorProvisionado = drd.GetString(posIndicadorProvisionado);
						obeReporteControlProduccion.ProcesoId = drd.GetInt32(posProcesoId);
						obeReporteControlProduccion.TipoObservacion = drd.GetString(posTipoObservacion);
						obeReporteControlProduccion.Patron = drd.GetString(posPatron);
						obeReporteControlProduccion.Observacion = drd.GetString(posObservacion);
						obeReporteControlProduccion.ValidacionId = drd.GetString(posValidacionId);
						obeReporteControlProduccion.DescripcionValidacion = drd.GetString(posDescripcionValidacion);
						lbeReporteControlProduccion.Add(obeReporteControlProduccion);
					}
					obeReporteVista.ListaReporte1 = lbeReporteControlProduccion;
				}
				drd.Close();
			}
			return (obeReporteVista);
		}
	}
}
