using General.Librerias.EntidadesNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class bePlanillasListas
	{
		public List<beCampoEntero>ListaTipoAdmision {get;set;}
		public List<bePlanillaPeriodo>ListaPeriodos {get;set;}
		public List<bePlanillaMedico>ListaPlanillaMedico{get;set;}
		public List<beCampoEntero> ListaAnio { get; set; }
	}
}
