using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class bePlanillaUnificacion
    {
		public int PlanillaId { get; set; }
		public string Medico { get; set; }
		public decimal Importe { get; set; }
		public decimal Bonificacion { get; set; }
		public decimal Descuento { get; set; }
		public decimal Ajuste { get; set; }
		public decimal Total { get; set; }
		public string Estado { get; set; }
		//public string TipoDocumentoPagoId { get; set; }
		//public string Documento { get; set; }
		//public DateTime FechaEmision { get; set; }
	}
}
