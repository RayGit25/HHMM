using System;
using System.Collections.Generic;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beCuentaCorrienteReporteListas
	{
		public List<beCampoEntero> ListaPeriodo { get; set; }
		public List<beCampoEntero> ListaEspecialidad { get; set; }
		public List<beCampoCadenaCorto> ListaEstado { get; set; }
	}
}
