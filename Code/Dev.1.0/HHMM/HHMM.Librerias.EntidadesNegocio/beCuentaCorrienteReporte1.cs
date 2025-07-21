using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beCuentaCorrienteReporte1
	{
		public int MedicoEmpresaId { get; set; }
		public string MedicoEmpresa { get; set; }
		public int MedicoId { get; set; }
		public string Medico { get; set; }
		public decimal TotalProvision { get; set; }
		public decimal SaldoProvision { get; set; }
		public decimal TotalLiquidado { get; set; }
		public decimal TotalProcesoPago { get; set; }
	}
}
