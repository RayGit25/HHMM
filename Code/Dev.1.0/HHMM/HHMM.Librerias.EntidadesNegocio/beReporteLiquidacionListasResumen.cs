using General.Librerias.EntidadesNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReporteLiquidacionListasResumen
	{
		public List<beCampoCadenaCorto> ListaEspecialidad { get; set; }
		public List<beCampoCadenaCorto> ListaMedicos { get; set; }
		public List<beReporteProvisionResumen> ListaResumen { get; set; }
	}
}
