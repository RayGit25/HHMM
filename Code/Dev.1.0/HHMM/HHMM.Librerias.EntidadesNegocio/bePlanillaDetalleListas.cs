using System;
using System.Collections.Generic;
namespace HHMM.Librerias.EntidadesNegocio
{
	public class bePlanillaDetalleListas
	{
		public List<bePlanillaDetalleProduccion> ListaProduccion { get; set; }
		public List<bePlanillaDetalleBonificacion>ListaBonificacion{get;set;}
		public List<bePlanillaDetalleMontoFijo> ListaMontoFijo { get; set; }
	}
}
