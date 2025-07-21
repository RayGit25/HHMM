using System;
using System.Collections.Generic;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReporteVista2
	{
		public List<beCampoEntero> ListaTipoAtencion { get; set; }
		public List<beCampoEntero> ListaServicio { get; set; }
		public DateTime FechaActualizacion { get; set; }		
		public List<beReporteControlHorario> ListaReporte2 { get; set; }
		public List<beReporteControlMontoFijo> ListaReporte3 { get; set; }
		public List<beReporteControlProduccion> ListaReporte1 { get; set; }
	}
}
