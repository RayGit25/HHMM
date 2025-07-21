using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beProcesoMedicoDetalle2
	{
		public int ConfiguracionPagoId { get; set; }
		public string TipoRegistro { get; set; }
		public string Periodo { get; set; }
		public decimal Importe { get; set; }
		public decimal Bonificacion { get; set; }
		public decimal Descuento { get; set; }
		public decimal Ajuste { get; set; }
		public decimal Total { get; set; }
	}
}
