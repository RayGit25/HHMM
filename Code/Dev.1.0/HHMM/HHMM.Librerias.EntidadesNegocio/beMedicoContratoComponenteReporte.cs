using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beMedicoContratoComponenteReporte
	{
		public string ComponenteId { get; set; }
		public string Descripcion { get; set; }
		public decimal ValorMedida { get; set; }
		public int ServicioId { get; set; }
		public string EstadoComponente { get; set; }
		public string EstadoPrestacion { get; set; }
	}
}
