using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beMedicoContratoReporte
	{
		public int Id { get; set; }
		public string Medico { get; set; }
		public string TipoPersona { get; set; }
		public string NumeroDocumento { get; set; }
		public string DocumentoFiscal { get; set; }
		public string EstadoMedico { get; set; }
		public int ContratoId { get; set; }
		public DateTime FechaInicio { get; set; }
		public DateTime FechaFin { get; set; }
		public string EstadoContrato { get; set; }
		public string IndicadorAdjunto { get; set; }
		public string NombreArchivo { get; set; }
		public string NombreRepositorio { get; set; }
		public string IndicadorContrato { get; set; }
		public string Especialidad { get; set; }
		public string Empresa { get; set; }
		public string TipoMedico { get; set; }
	}
}
