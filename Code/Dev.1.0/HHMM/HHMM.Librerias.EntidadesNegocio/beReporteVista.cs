using System;
using System.Collections.Generic;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beReporteVista
    {
        public List<beCampoEntero> ListaTipoAtencion { get; set; }
        public List<beCampoEntero> ListaServicio { get; set; }
		public DateTime FechaActualizacion { get; set; }
        public List<beReporte> ListaReporte { get; set; }
    }
}
