using System;


namespace HHMM.Librerias.EntidadesNegocio
{
	public class beCuentaCorrienteReporte3
	{
		public int TipoAdmisionId { get; set; }
		public string TipoAdmision { get; set; }
		public string DatoId { get; set; }
		public string Dato { get; set; }
		public int PeriodoId { get; set; }
		public int Periodo { get; set; }
		public string IdProvision { get; set; }
		public int PeriodoProduccion { get; set; }
		public string Moneda { get; set; }
		public decimal Total { get; set; }
		public decimal TotalLiquidado { get; set; }
		public decimal TotalPagado { get; set; }
		public decimal SaldoxLiquidar { get; set; }
		public decimal SaldoxPagar { get; set; }
		public string Documento { get; set; }
		public DateTime FechaEmision { get; set; }
	}
}
