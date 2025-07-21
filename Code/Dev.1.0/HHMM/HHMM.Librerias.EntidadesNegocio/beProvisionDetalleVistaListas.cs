using System;
using System.Collections.Generic;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beProvisionDetalleVistaListas
	{
		public List<beCampoEntero> ListaMedico { get; set; }
		public List<beCampoEntero> ListaEspecialidad { get; set; }
		public List<beProvisionDetalleVista> ListaProvision { get; set; }
		public List<beCampoEntero> ListaConfiguracion { get; set; }
	}
}
