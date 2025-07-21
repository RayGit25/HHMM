using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReporteControlMontoFijo
	{
		public int IdMedico { get; set; }
		public string Medico { get; set; }
		public string Descripcion { get; set; }
		public DateTime FechaInicio { get; set; }
		public DateTime FechaFin { get; set; }
		public decimal Valor { get; set; }
		public int ConceptoMontoFijoId { get; set; }
		public string Concepto { get; set; }
		public string EstadoRegistro { get; set; }
	}
}
