using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReporteControlProduccion
	{
		//public int TipoAtencion { get; set; }
		//public string CodigoOA { get; set; }
		//public DateTime FechaInicioOA { get; set; }
		//public DateTime FechaAtencionPrestacion { get; set; }
		//public int TipoServicio { get; set; }
		//public string CodigoPrestacion { get; set; }
		//public string Prestacion { get; set; }
		//public decimal Cantidad { get; set; }
		//public decimal PrecioUnitarioPrestacion { get; set; }
		//public decimal MontoImponiblePrestacion { get; set; }
		//public string EstadoPrestacion { get; set; }
		//public string EstadoOA { get; set; }
		//public int IdOrdenAtencion { get; set; }
		//public int LineaOrdenAtencion { get; set; }
		//public int PersonaId { get; set; }
		//public string Medico { get; set; }
		//public string Especialidad { get; set; }
		//public string NombrePaciente { get; set; }
		//public string TipoPaciente { get; set; }
		//public string Aseguradora { get; set; }
		//public DateTime FechaHoraCreacion { get; set; }
		//public DateTime FechaHoraModificacion { get; set; }
		//public DateTime FechaHoraAtendido { get; set; }
		//public DateTime FechaHoraTerminado { get; set; }
		//public string IndicadorRequiereInforme { get; set; }
		//public string IndicadorTieneAnamnesis { get; set; }
		//public string IndicadorCierreEmergencia { get; set; }
		//public string IndHorario { get; set; }
		//public int IdTransaccion { get; set; }
		//public string TransaccionCaja { get; set; }
		//public string EstadoHospitalizacion { get; set; }
		//public string SituacionDetalleHospitalizacion { get; set; }
		//public int IdPlanilla { get; set; }
		//public string EstadoPlanilla { get; set; }
		//public string TipoObservacion { get; set; }
		//public string Patron { get; set; }
		//public string Observacion { get; set; }
		public string TipoRegistro { get; set; }
		public int TipoAtencion { get; set; }
		public string CodigoOA { get; set; }
		public DateTime FechaInicioOA { get; set; }
		public string PeriodoProduccion { get; set; }
		public DateTime FechaAtencionPrestacion { get; set; }
		public int TipoServicio { get; set; }
		public string CodigoPrestacion { get; set; }
		public string Prestacion { get; set; }
		public decimal Cantidad { get; set; }
		public decimal PrecioUnitarioPrestacion { get; set; }
		public decimal MontoImponiblePrestacion { get; set; }
		public string EstadoPrestacion { get; set; }
		public string EstadoOA { get; set; }
		public int IdOrdenAtencion { get; set; }
		public int LineaOrdenAtencion { get; set; }
		public int PersonaId { get; set; }
		public string Medico { get; set; }
		public int MedicoSecundarioId { get; set; }
		public string MedicoSecundario { get; set; }
		public string Especialidad { get; set; }
		public string NombrePaciente { get; set; }
		public string TipoPaciente { get; set; }
		public string Aseguradora { get; set; }

		public string ModFacturacion { get; set; }

		public DateTime FechaHoraCreacion { get; set; }
		public DateTime FechaHoraModificacion { get; set; }
		public DateTime FechaHoraAtendido { get; set; }
		public DateTime FechaHoraTerminado { get; set; }
		public string IndInforme { get; set; }
		public string IndAnamnesis { get; set; }
		public string IndCierreEME { get; set; }
		public string IndHonorario { get; set; }
		public int IdTransaccion { get; set; }
		public string TransaccionCaja { get; set; }
		public string EstadoHospitalizacion { get; set; }
		public string SituacionDetalleHospitalizacion { get; set; }
		public string IndicadorEliminado { get; set; }
		public string SituacionDetalleExpediente { get; set; }
		public int IdPlanilla { get; set; }
		public string EstadoPlanilla { get; set; }
		public string IndicadorProvisionado { get;set; }
		public int ProcesoId { get; set; }
		public string TipoObservacion { get; set; }
		public string Patron { get; set; }
		public string Observacion { get; set; }
		public string ValidacionId { get; set; }
		public string DescripcionValidacion { get; set; }
	}
}
