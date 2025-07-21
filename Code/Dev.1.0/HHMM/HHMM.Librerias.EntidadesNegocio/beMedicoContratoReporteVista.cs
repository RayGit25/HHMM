using System;
using System.Collections.Generic;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beMedicoContratoReporteVista
	{
		public List<beMedicoContratoReporte> ListaMedicoContratoReporte { get; set; }
		public List<beCampoCadenaCorto> ListaTipoMedico { get; set; }
		public List<beMedicoContratoComponenteReporte> ListaComponente { get; set; }
		public List<beCampoEntero> ListaServicio { get; set; }
	}
}
