using General.Librerias.EntidadesNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReporteDetalladoProvicionListas
	{
		public List<beCampoEntero>ListaPeriodo{get;set;}
		public List<beCampoEntero> ListaTipoAdmision { get; set; }
		public List<beCampoEntero> ListaEspacialidad { get; set; }
	}
}
