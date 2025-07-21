using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daReporteDetalladoProvision
	{
		public beReporteDetalladoProvicionListas listas(SqlConnection con,string SucursalId)
		{
			beReporteDetalladoProvicionListas obeReporteDetalladoProvicionListas = new beReporteDetalladoProvicionListas();

			List<beCampoEntero> listaPeriodo = null;
			List<beCampoEntero> listaTipoAdmision = null;
			List<beCampoEntero> listaEspecialidad = null;
			SqlCommand cmd = new SqlCommand("uspReporteDetalladoListas", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", SucursalId);
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				int posPeriodoId = drd.GetOrdinal("PeriodoId");
				int posPeriodo = drd.GetOrdinal("Periodo");
				listaPeriodo = new List<beCampoEntero>();
				beCampoEntero obePeriodo;
				while (drd.Read())
				{
					obePeriodo = new beCampoEntero();
					obePeriodo.campo1 = drd.GetInt32(posPeriodoId);
					obePeriodo.campo2 = drd.GetString(posPeriodo);
					listaPeriodo.Add(obePeriodo);
				}
				obeReporteDetalladoProvicionListas.ListaPeriodo = listaPeriodo;
				if (drd.NextResult())
				{
					listaTipoAdmision = new List<beCampoEntero>();

					int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
					int posDescripcion = drd.GetOrdinal("Descripcion");
					beCampoEntero obeTipoadmision;
					while (drd.Read())
					{
						obeTipoadmision = new beCampoEntero();
						obeTipoadmision.campo1 = drd.GetInt32(posTipoAdmisionId);
						obeTipoadmision.campo2 = drd.GetString(posDescripcion);
						listaTipoAdmision.Add(obeTipoadmision);
					}
					obeReporteDetalladoProvicionListas.ListaTipoAdmision = listaTipoAdmision;
				}
				if (drd.NextResult())
				{
					listaEspecialidad = new List<beCampoEntero>();
					beCampoEntero obeEspecialidad;
					int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
					int posDescripcion = drd.GetOrdinal("Descripcion");

					while (drd.Read())
					{
						obeEspecialidad = new beCampoEntero();
						obeEspecialidad.campo1 = drd.GetInt32(posEspecialidadId);
						obeEspecialidad.campo2 = drd.GetString(posDescripcion);
						listaEspecialidad.Add(obeEspecialidad);
					}
					obeReporteDetalladoProvicionListas.ListaEspacialidad = listaEspecialidad;
				}
				drd.Close();
			}
			return (obeReporteDetalladoProvicionListas);
		}
		public beReporteDetalladoProvisionVista listar(SqlConnection con,string tipo,string SucursalId, int PeriodoId, int TipoAdmisionId, int EspecialidadId, int PersonaId, int EmpresaId)
		{
			beReporteDetalladoProvisionVista obeReporteDetalladoProvisionVista = new beReporteDetalladoProvisionVista();

			List<beReporteDetalladoProvisionProduccion> listaProduccion = null;
			List<beReporteDetalladoProvisionHorario> listaHorario = null;
			List<beReporteDetalladoProvisionPeriodo> listaPeriodo = null;

			SqlCommand cmd = new SqlCommand("uspReporteDetalladoListarV4", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@TipoReporte", tipo);
			cmd.Parameters.AddWithValue("@SucursalId", SucursalId);
			cmd.Parameters.AddWithValue("@PeriodoId", PeriodoId);
			cmd.Parameters.AddWithValue("@TipoAdmisionId", TipoAdmisionId);
			cmd.Parameters.AddWithValue("@EspecialidadId", EspecialidadId);
			cmd.Parameters.AddWithValue("@PersonaId", PersonaId);
			cmd.Parameters.AddWithValue("@EmpresaId", EmpresaId);
			cmd.CommandTimeout = 0;

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				int posPeriodo =drd.GetOrdinal("Periodo");
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


		public beReporteDetalladoProvisionVista2 listar2(SqlConnection con, string tipo, string SucursalId, int PeriodoId, int TipoAdmisionId, int EspecialidadId, int PersonaId, int EmpresaId)
		{
			beReporteDetalladoProvisionVista2 obeReporteDetalladoProvisionVista = new beReporteDetalladoProvisionVista2();

			List<beReporteDetalladoProvisionProduccion2> listaProduccion = null;
			List<beReporteDetalladoProvisionHorario2> listaHorario = null;
			List<beReporteDetalladoProvisionPeriodo2> listaPeriodo = null;

			SqlCommand cmd = new SqlCommand("uspReporteDetalladoListarV3", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@TipoReporte", tipo);
			cmd.Parameters.AddWithValue("@SucursalId", SucursalId);
			cmd.Parameters.AddWithValue("@PeriodoId", PeriodoId);
			cmd.Parameters.AddWithValue("@TipoAdmisionId", TipoAdmisionId);
			cmd.Parameters.AddWithValue("@EspecialidadId", EspecialidadId);
			cmd.Parameters.AddWithValue("@PersonaId", PersonaId);
			cmd.Parameters.AddWithValue("@EmpresaId", EmpresaId);
			cmd.CommandTimeout = 0;
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				int posPeriodoPlanilla1 = drd.GetOrdinal("PeriodoPlanilla");
				int posPeriodoProvision1 = drd.GetOrdinal("PeriodoProvision");
				int posSucursalId1 = drd.GetOrdinal("SucursalId");
				int posSucursal1 = drd.GetOrdinal("Sucursal");
				int posMedicoEmpresaId1 = drd.GetOrdinal("MedicoEmpresaId");
				int posEmpresa1 = drd.GetOrdinal("Empresa");
				int posIdMedico1 = drd.GetOrdinal("IdMedico");
				int posMedico1 = drd.GetOrdinal("Medico");
				int posTipoAdmision1 = drd.GetOrdinal("TipoAdmision");
				int posCodigoOA1 = drd.GetOrdinal("CodigoOA");
				int posIdOrdenAtencion1 = drd.GetOrdinal("IdOrdenAtencion");
				int posLineaOrdenAtencion1 = drd.GetOrdinal("LineaOrdenAtencion");
				int posIdExpediente1 = drd.GetOrdinal("IdExpediente");
				int posCodigoPrestacion1 = drd.GetOrdinal("CodigoPrestacion");
				int posPrestacion1 = drd.GetOrdinal("Prestacion");
				int posPeriodoProduccion1 = drd.GetOrdinal("PeriodoProduccion");
				int posTipoRegistro1 = drd.GetOrdinal("TipoRegistro");
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
				int posParteMedico1 = drd.GetOrdinal("ParteMedico");
				int posBonificacion1 = drd.GetOrdinal("Bonificacion");
				int posFechaInicioOA1 = drd.GetOrdinal("FechaInicioOA");
				int posTipoPaciente1 = drd.GetOrdinal("TipoPaciente");
				int posTipoAtencion1 = drd.GetOrdinal("TipoAtencion");
				int posAseguradora1 = drd.GetOrdinal("Aseguradora");
				int posServicio1 = drd.GetOrdinal("Servicio");
				int posModFacturacion1 = drd.GetOrdinal("ModFacturacion");
				int posEspecialidad1 = drd.GetOrdinal("Especialidad");
				int posDescripcionEstadoPrestacion1 = drd.GetOrdinal("DescripcionEstadoPrestacion");
				int posEstadoRegistro1 = drd.GetOrdinal("EstadoRegistro");
				int posAjuste1 = drd.GetOrdinal("Ajuste");
				int posTotalProvision1 = drd.GetOrdinal("TotalProvision");
				int posPaciente1 = drd.GetOrdinal("Paciente");
				int posAjusteProcesoId1 = drd.GetOrdinal("AjusteProcesoId");
				int posIdplanilla1 = drd.GetOrdinal("Idplanilla");
				int posIdEstadoPlanilla1 = drd.GetOrdinal("IdEstadoPlanilla");
				int posIndicadorHonorario1 = drd.GetOrdinal("IndicadorHonorario");

				int posEstadoHospitalizacion1 = drd.GetOrdinal("EstadoHospitalizacion");
				int posSituacionDetalleHospitalizacion1 = drd.GetOrdinal("SituacionDetalleHospitalizacion");
				int posIndicadorEliminado1 = drd.GetOrdinal("IndicadorEliminado");
				int posSituacionDetalleExpediente1 = drd.GetOrdinal("SituacionDetalleExpediente");

				int posEstadoPlanilla1 = drd.GetOrdinal("EstadoPlanilla");
				int posFechaHoraCreacion1 = drd.GetOrdinal("FechaHoraCreacion");
				int posEstadoProvision1 = drd.GetOrdinal("EstadoProvision");
				int posPlanillaIdWeb1 = drd.GetOrdinal("PlanillaIdWeb");
				int posEstadoPlanillaWeb1 = drd.GetOrdinal("EstadoPlanillaWeb");
				int posTipoDocumentoPagoId1 = drd.GetOrdinal("TipoDocumentoPagoId");
				int posNumeroDocumento1 = drd.GetOrdinal("NumeroDocumento");
				int posFechaEmision1 = drd.GetOrdinal("FechaEmision");
				int posCuentaProvision1 = drd.GetOrdinal("CuentaProvision");
				int posCuentaPago1 = drd.GetOrdinal("CuentaPago");
				int posIdDocContable1 = drd.GetOrdinal("IdDocContable");

				int posIndicadorIncluidoPlanilla1 = drd.GetOrdinal("IndicadorIncluidoPlanilla");

				listaProduccion = new List<beReporteDetalladoProvisionProduccion2>();
				beReporteDetalladoProvisionProduccion2 obeReporteDetalladoProvisionProduccion;
				while (drd.Read())
				{
					obeReporteDetalladoProvisionProduccion = new beReporteDetalladoProvisionProduccion2();
					obeReporteDetalladoProvisionProduccion.PeriodoPlanilla = drd.GetString(posPeriodoPlanilla1);
					obeReporteDetalladoProvisionProduccion.PeriodoProvision = drd.GetString(posPeriodoProvision1);
					obeReporteDetalladoProvisionProduccion.SucursalId = drd.GetString(posSucursalId1);
					obeReporteDetalladoProvisionProduccion.Sucursal = drd.GetString(posSucursal1);
					obeReporteDetalladoProvisionProduccion.MedicoEmpresaId = drd.GetInt32(posMedicoEmpresaId1);
					obeReporteDetalladoProvisionProduccion.Empresa = drd.GetString(posEmpresa1);
					obeReporteDetalladoProvisionProduccion.IdMedico = drd.GetInt32(posIdMedico1);
					obeReporteDetalladoProvisionProduccion.Medico = drd.GetString(posMedico1);
					obeReporteDetalladoProvisionProduccion.TipoAdmision = drd.GetString(posTipoAdmision1);
					obeReporteDetalladoProvisionProduccion.CodigoOA = drd.GetString(posCodigoOA1);
					obeReporteDetalladoProvisionProduccion.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion1);
					obeReporteDetalladoProvisionProduccion.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion1);
					obeReporteDetalladoProvisionProduccion.IdExpediente = drd.GetInt32(posIdExpediente1);
					obeReporteDetalladoProvisionProduccion.CodigoPrestacion = drd.GetString(posCodigoPrestacion1);
					obeReporteDetalladoProvisionProduccion.Prestacion = drd.GetString(posPrestacion1);
					obeReporteDetalladoProvisionProduccion.PeriodoProduccion = drd.GetString(posPeriodoProduccion1);
					obeReporteDetalladoProvisionProduccion.TipoRegistro = drd.GetString(posTipoRegistro1);
					obeReporteDetalladoProvisionProduccion.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion1);
					obeReporteDetalladoProvisionProduccion.FechaAtendido = drd.GetDateTime(posFechaAtendido1);
					obeReporteDetalladoProvisionProduccion.FechaTerminado = drd.GetDateTime(posFechaTerminado1);
					obeReporteDetalladoProvisionProduccion.PrecioUnitarioPrestacion = drd.GetDecimal(posPrecioUnitarioPrestacion1);
					obeReporteDetalladoProvisionProduccion.CostoPrestacion = drd.GetDecimal(posCostoPrestacion1);
					obeReporteDetalladoProvisionProduccion.Cantidad = drd.GetDecimal(posCantidad1);
					obeReporteDetalladoProvisionProduccion.MontoImponiblePrestacion = drd.GetDecimal(posMontoImponiblePrestacion1);
					obeReporteDetalladoProvisionProduccion.ValorMedida = drd.GetDecimal(posValorMedida1);
					obeReporteDetalladoProvisionProduccion.TipoValor = drd.GetString(posTipoValor1);
					obeReporteDetalladoProvisionProduccion.Valor = drd.GetDecimal(posValor1);
					obeReporteDetalladoProvisionProduccion.Porcentaje = drd.GetDecimal(posPorcentaje1);
					obeReporteDetalladoProvisionProduccion.ParteMedico = drd.GetDecimal(posParteMedico1);
					obeReporteDetalladoProvisionProduccion.Bonificacion = drd.GetDecimal(posBonificacion1);
					obeReporteDetalladoProvisionProduccion.FechaInicioOA = drd.GetDateTime(posFechaInicioOA1);
					obeReporteDetalladoProvisionProduccion.TipoPaciente = drd.GetString(posTipoPaciente1);
					obeReporteDetalladoProvisionProduccion.TipoAtencion = drd.GetString(posTipoAtencion1);
					obeReporteDetalladoProvisionProduccion.Aseguradora = drd.GetString(posAseguradora1);
					obeReporteDetalladoProvisionProduccion.Servicio = drd.GetString(posServicio1);
					obeReporteDetalladoProvisionProduccion.ModFacturacion = drd.GetString(posModFacturacion1);
					obeReporteDetalladoProvisionProduccion.Especialidad = drd.GetString(posEspecialidad1);
					obeReporteDetalladoProvisionProduccion.DescripcionEstadoPrestacion = drd.GetString(posDescripcionEstadoPrestacion1);
					obeReporteDetalladoProvisionProduccion.EstadoRegistro = drd.GetString(posEstadoRegistro1);
					obeReporteDetalladoProvisionProduccion.Ajuste = drd.GetDecimal(posAjuste1);
					obeReporteDetalladoProvisionProduccion.TotalProvision = drd.GetDecimal(posTotalProvision1);
					obeReporteDetalladoProvisionProduccion.Paciente = drd.GetString(posPaciente1);
					obeReporteDetalladoProvisionProduccion.AjusteProcesoId = drd.GetInt32(posAjusteProcesoId1);
					//obeReporteDetalladoProvisionProduccion.AjusteTipoRegistro = drd.GetString(posAjusteTipoRegistro);
					obeReporteDetalladoProvisionProduccion.IdPlanilla = drd.GetInt32(posIdplanilla1);
					obeReporteDetalladoProvisionProduccion.IdEstadoPlanilla = drd.GetInt32(posIdEstadoPlanilla1);
					obeReporteDetalladoProvisionProduccion.IndicadorHonorario = drd.GetString(posIndicadorHonorario1);

					obeReporteDetalladoProvisionProduccion.EstadoHospitalizacion = drd.GetString(posEstadoHospitalizacion1);
					obeReporteDetalladoProvisionProduccion.SituacionDetalleHospitalizacion = drd.GetString(posSituacionDetalleHospitalizacion1);
					obeReporteDetalladoProvisionProduccion.IndicadorEliminado = drd.GetString(posIndicadorEliminado1);
					obeReporteDetalladoProvisionProduccion.SituacionDetalleExpediente = drd.GetString(posSituacionDetalleExpediente1);

					obeReporteDetalladoProvisionProduccion.EstadoPlanilla = drd.GetString(posEstadoPlanilla1);
					obeReporteDetalladoProvisionProduccion.FechaHoraCreacion = drd.GetDateTime(posFechaHoraCreacion1);
					obeReporteDetalladoProvisionProduccion.EstadoProvision = drd.GetString(posEstadoProvision1);
					obeReporteDetalladoProvisionProduccion.PlanillaWebId = drd.GetInt32(posPlanillaIdWeb1);
					obeReporteDetalladoProvisionProduccion.EstadoPlanillaWeb = drd.GetString(posEstadoPlanillaWeb1);
					obeReporteDetalladoProvisionProduccion.TipoDocumentoPagoId = drd.GetString(posTipoDocumentoPagoId1);
					obeReporteDetalladoProvisionProduccion.NumeroDocumento = drd.GetString(posNumeroDocumento1);
					obeReporteDetalladoProvisionProduccion.FechaEmision = drd.GetDateTime(posFechaEmision1);
;					obeReporteDetalladoProvisionProduccion.CuentaProvision = drd.GetString(posCuentaProvision1);
					obeReporteDetalladoProvisionProduccion.CuentaPago = drd.GetString(posCuentaPago1);
					obeReporteDetalladoProvisionProduccion.IdDocContable = drd.GetString(posIdDocContable1);

					obeReporteDetalladoProvisionProduccion.IndicadorIncluidoPlanilla = drd.GetBoolean(posIndicadorIncluidoPlanilla1);

					listaProduccion.Add(obeReporteDetalladoProvisionProduccion);
				}
				obeReporteDetalladoProvisionVista.listaProduccion = listaProduccion;
				if (drd.NextResult())
				{
					listaHorario = new List<beReporteDetalladoProvisionHorario2>();

					int posSucursalId2 = drd.GetOrdinal("SucursalId");
					int posSucursal2 = drd.GetOrdinal("Sucursal");
					int posPeriodoPlanilla2 = drd.GetOrdinal("PeriodoPlanilla");
					int posPeriodoProvision2 = drd.GetOrdinal("PeriodoProvision");
					int posMedicoEmpresaId2 = drd.GetOrdinal("MedicoEmpresaId");
					int posEmpresa2 = drd.GetOrdinal("Empresa");
					int posIdMedico2 = drd.GetOrdinal("IdMedico");
					int posMedico2 = drd.GetOrdinal("Medico");
					int posFecha2 = drd.GetOrdinal("Fecha");
					int posHoraInicio2 = drd.GetOrdinal("HoraInicio");
					int posHoraFin2 = drd.GetOrdinal("HoraFin");
					int posHorasProgramadas2 = drd.GetOrdinal("HorasProgramadas");
					int posDia2 = drd.GetOrdinal("Dia");
					int posIndicadorFeriado2 = drd.GetOrdinal("IndicadorFeriado");
					int posValorContrato2 = drd.GetOrdinal("ValorContrato");
					int posParteMedico2 = drd.GetOrdinal("ParteMedico");
					int posBonificacion2 = drd.GetOrdinal("Bonificacion");
					int posTotal2 = drd.GetOrdinal("Total");
					int posEspecialidad2 = drd.GetOrdinal("Especialidad");
					int posTipoAtencion2 = drd.GetOrdinal("TipoAtencion");
					int posEstadoRegistro2 = drd.GetOrdinal("EstadoRegistro");
					int posUnidadMedicaId2 = drd.GetOrdinal("UnidadMedicaId");
					int posUnidadMedica2 = drd.GetOrdinal("UnidadMedica");
					int posPlanillaIdWeb2 = drd.GetOrdinal("PlanillaIdWeb");
					int posEstadoPlanillaWeb2 = drd.GetOrdinal("EstadoPlanillaWeb");
					int posTipoDocumentoPagoId2 = drd.GetOrdinal("TipoDocumentoPagoId");
					int posNumeroDocumento2 = drd.GetOrdinal("NumeroDocumento");
					int posFechaEmision2 = drd.GetOrdinal("FechaEmision");
					int posCuentaProvision2 = drd.GetOrdinal("CuentaProvision");
					int posCuentaPago2 = drd.GetOrdinal("CuentaPago");

					beReporteDetalladoProvisionHorario2 obeReporteDetalladoProvisionHorario;
					while (drd.Read())
					{
						obeReporteDetalladoProvisionHorario = new beReporteDetalladoProvisionHorario2();
						obeReporteDetalladoProvisionHorario.SucursalId = drd.GetString(posSucursal2);
						obeReporteDetalladoProvisionHorario.Sucursal = drd.GetString(posSucursal2);
						obeReporteDetalladoProvisionHorario.PeriodoPlanilla = drd.GetString(posPeriodoPlanilla2);
						obeReporteDetalladoProvisionHorario.PeriodoProvision = drd.GetString(posPeriodoProvision2);
						obeReporteDetalladoProvisionHorario.MedicoEmpresaId = drd.GetInt32(posMedicoEmpresaId2);
						obeReporteDetalladoProvisionHorario.Empresa = drd.GetString(posEmpresa2);
						obeReporteDetalladoProvisionHorario.IdMedico = drd.GetInt32(posIdMedico2);
						obeReporteDetalladoProvisionHorario.Medico = drd.GetString(posMedico2);
						obeReporteDetalladoProvisionHorario.Fecha = drd.GetString(posFecha2);
						obeReporteDetalladoProvisionHorario.HoraInicio = drd.GetString(posHoraInicio2);
						obeReporteDetalladoProvisionHorario.HoraFin = drd.GetString(posHoraFin2);
						obeReporteDetalladoProvisionHorario.HorasProgramadas = drd.GetDecimal(posHorasProgramadas2);
						obeReporteDetalladoProvisionHorario.Dia = drd.GetString(posDia2);
						obeReporteDetalladoProvisionHorario.IndicadorFeriado = drd.GetBoolean(posIndicadorFeriado2);
						obeReporteDetalladoProvisionHorario.ValorContrato = drd.GetDecimal(posValorContrato2);
						obeReporteDetalladoProvisionHorario.ParteMedico = drd.GetDecimal(posParteMedico2);
						obeReporteDetalladoProvisionHorario.Bonificacion = drd.GetDecimal(posBonificacion2);
						obeReporteDetalladoProvisionHorario.Total = drd.GetDecimal(posTotal2);
						obeReporteDetalladoProvisionHorario.Especialidad = drd.GetString(posEspecialidad2);
						obeReporteDetalladoProvisionHorario.TipoAtencion = drd.GetString(posTipoAtencion2);
						obeReporteDetalladoProvisionHorario.EstadoRegistro = drd.GetString(posEstadoRegistro2);
						obeReporteDetalladoProvisionHorario.UnidadMedicaId = drd.GetInt32(posUnidadMedicaId2);
						obeReporteDetalladoProvisionHorario.UnidadMedica = drd.GetString(posUnidadMedica2);
						obeReporteDetalladoProvisionHorario.PlanillaWebId = drd.GetInt32(posPlanillaIdWeb2);
						obeReporteDetalladoProvisionHorario.EstadoPlanillaWeb = drd.GetString(posEstadoPlanillaWeb2);
						obeReporteDetalladoProvisionHorario.TipoDocumentoPagoId = drd.GetString(posTipoDocumentoPagoId2);
						obeReporteDetalladoProvisionHorario.NumeroDocumento = drd.GetString(posNumeroDocumento2);
						obeReporteDetalladoProvisionHorario.FechaEmision = drd.GetDateTime(posFechaEmision2);
						obeReporteDetalladoProvisionHorario.CuentaProvision = drd.GetString(posCuentaProvision2);
						obeReporteDetalladoProvisionHorario.CuentaPago = drd.GetString(posCuentaPago2);

						listaHorario.Add(obeReporteDetalladoProvisionHorario);
					}
					obeReporteDetalladoProvisionVista.listaHorario = listaHorario;
				}
				if (drd.NextResult())
				{
					listaPeriodo = new List<beReporteDetalladoProvisionPeriodo2>();

					int posSucursalId3 = drd.GetOrdinal("SucursalId");
					int posSucursal3 = drd.GetOrdinal("Sucursal");
					int posPeriodoPlanilla3 = drd.GetOrdinal("PeriodoPlanilla");
					int posPeriodoProvision3 = drd.GetOrdinal("PeriodoProvision");
					int posMedicoEmpresaId3 = drd.GetOrdinal("MedicoEmpresaId");
					int posEmpresa3 = drd.GetOrdinal("Empresa");
					int posIdMedico3 = drd.GetOrdinal("IdMedico");
					int posMedico3 = drd.GetOrdinal("Medico");
					int posDescripcion3 = drd.GetOrdinal("Descripcion");
					int posImporte3 = drd.GetOrdinal("Importe");
					int posConceptoMontoFijoId3 = drd.GetOrdinal("ConceptoMontoFijoId");
					int posConcepto3 = drd.GetOrdinal("Concepto");
					int posPlanillaIdWeb3 = drd.GetOrdinal("PlanillaIdWeb");
					int posEstadoPlanillaWeb3 = drd.GetOrdinal("EstadoPlanillaWeb");
					int posTipoDocumentoPagoId3 = drd.GetOrdinal("TipoDocumentoPagoId");
					int posNumeroDocumento3 = drd.GetOrdinal("NumeroDocumento");
					int posFechaEmision3 = drd.GetOrdinal("FechaEmision");
					int posCuentaProvision3 = drd.GetOrdinal("CuentaProvision");
					int posCuentaPago3 = drd.GetOrdinal("CuentaPago");

					beReporteDetalladoProvisionPeriodo2 obeReporteDetalladoProvisionPeriodo;

					while (drd.Read())
					{
						obeReporteDetalladoProvisionPeriodo = new beReporteDetalladoProvisionPeriodo2();
						obeReporteDetalladoProvisionPeriodo.SucursalId = drd.GetString(posSucursalId3);
						obeReporteDetalladoProvisionPeriodo.Sucursal = drd.GetString(posSucursal3);
						obeReporteDetalladoProvisionPeriodo.PeriodoPlanilla = drd.GetString(posPeriodoPlanilla3);
						obeReporteDetalladoProvisionPeriodo.MedicoEmpresaId = drd.GetInt32(posMedicoEmpresaId3);
						obeReporteDetalladoProvisionPeriodo.Empresa = drd.GetString(posEmpresa3);
						obeReporteDetalladoProvisionPeriodo.IdMedico = drd.GetInt32(posIdMedico3);
						obeReporteDetalladoProvisionPeriodo.Medico = drd.GetString(posMedico3);
						obeReporteDetalladoProvisionPeriodo.Descripcion = drd.GetString(posDescripcion3);
						obeReporteDetalladoProvisionPeriodo.Importe = drd.GetDecimal(posImporte3);
						obeReporteDetalladoProvisionPeriodo.ConceptoMontoFijoId = drd.GetInt32(posConceptoMontoFijoId3);
						obeReporteDetalladoProvisionPeriodo.Concepto = drd.GetString(posConcepto3);
						obeReporteDetalladoProvisionPeriodo.PlanillaWebid = drd.GetInt32(posPlanillaIdWeb3);
						obeReporteDetalladoProvisionPeriodo.EstadoPlanillaWeb = drd.GetString(posEstadoPlanillaWeb3);
						obeReporteDetalladoProvisionPeriodo.TipoDocumentoPagoId = drd.GetString(posTipoDocumentoPagoId3);
						obeReporteDetalladoProvisionPeriodo.NumeroDocumento = drd.GetString(posNumeroDocumento3);
						obeReporteDetalladoProvisionPeriodo.FechaEmision = drd.GetDateTime(posFechaEmision3);
						obeReporteDetalladoProvisionPeriodo.CuentaProvision = drd.GetString(posCuentaProvision3);
						obeReporteDetalladoProvisionPeriodo.CuentaPago = drd.GetString(posCuentaPago3);
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
