using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReporteDetalladoProvisionHorario2
	{
		public string SucursalId { get; set; }
		public string Sucursal { get; set; }
		public string PeriodoPlanilla { get; set; }
		public string PeriodoProvision { get; set; }
		public int MedicoEmpresaId { get; set; }
		public string Empresa { get; set; }
		public int IdMedico { get; set; }
		public string Medico { get; set; }
		public string Fecha { get; set; }
		public string HoraInicio { get; set; }
		public string HoraFin { get; set; }
		public decimal HorasProgramadas { get; set; }
		public string Dia { get; set; }
		public Boolean IndicadorFeriado { get; set; }
		public decimal ValorContrato { get; set; }
		public decimal ParteMedico { get; set; }
		public decimal Bonificacion { get; set; }
		public decimal Total { get; set; }
		public string Especialidad { get; set; }
		public string TipoAtencion { get; set; }
		public string EstadoRegistro { get; set; }
		public int UnidadMedicaId { get; set; }
		public string UnidadMedica { get; set; }
		public int PlanillaWebId { get; set; }
		public string EstadoPlanillaWeb { get; set; }
		public string TipoDocumentoPagoId { get; set; }
		public string NumeroDocumento { get; set; }
		public DateTime FechaEmision { get; set; }
		public string CuentaProvision { get; set; }
		public string CuentaPago { get; set; }
	}
}
