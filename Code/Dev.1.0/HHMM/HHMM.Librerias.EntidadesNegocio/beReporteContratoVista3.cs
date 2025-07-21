using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReporteContratoVista3
	{
		public int MedicoContratoDetalleId { get; set; }
		public int MedicoContratoId { get; set; }
		public int MedicoContratoPagoId { get; set; }
		public int Secuencia { get; set; }
		public string TipoRegistro { get; set; }
		public string TipoValor { get; set; }
		public decimal Valor1 { get; set; }
		public string AlcancePrestacion { get; set; }
		public string EstadoRegistro { get; set; }
		public string Condicion { get; set; }
		public decimal Valor2 { get; set; }
		public DateTime FechaInicio { get; set; }
		public DateTime FechaFin { get; set; }
	}
}
