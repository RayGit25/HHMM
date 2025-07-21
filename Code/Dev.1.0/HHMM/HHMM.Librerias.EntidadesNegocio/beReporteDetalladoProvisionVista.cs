using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReporteDetalladoProvisionVista
	{
		public List<beReporteDetalladoProvisionProduccion>listaProduccion{get;set;}
		public List<beReporteDetalladoProvisionHorario>listaHorario{get;set;}
		public List<beReporteDetalladoProvisionPeriodo> listaPeriodo { get; set; }
	}
}
