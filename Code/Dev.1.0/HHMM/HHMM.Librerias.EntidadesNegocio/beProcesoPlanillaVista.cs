using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beProcesoPlanillaVista
	{
		public int PlanillaId { get; set; }
		public string Medico { get; set; }
		public decimal Importe { get; set; }
		public decimal Bonificacion { get; set; }
		public decimal Descuento { get; set; }
		public decimal Ajuste { get; set; }
		public decimal Total { get; set; }
		public string Estado { get; set; }
		public string TipoDocumentoPagoId { get; set; }
		public string Documento { get; set; }
		public DateTime FechaEmision { get; set; }
		public int PersonaId { get; set; }
		public string CMP { get; set; }
	}
}
