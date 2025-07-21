using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReporteContratoDetalle
	{
		public int MedicoContratoPagoId { get; set; }
		public int Secuencia { get; set; }
		public string TipoRegistro { get; set; }
		public string TipoValor { get; set; }
		public decimal Valor1 { get; set; }
		public string AlcancePrestacion { get; set; }
		public string EstadoRegistro { get; set; }
	}
}
