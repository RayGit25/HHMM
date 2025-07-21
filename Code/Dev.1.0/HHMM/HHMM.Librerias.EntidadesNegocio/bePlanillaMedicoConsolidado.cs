using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class bePlanillaMedicoConsolidado
    {
		public string Item { get; set; }
		public string IdPlanilla { get; set; }
		public string Periodo { get; set; }
		public DateTime FechaInicio { get; set; }
		public DateTime FechaFin { get; set; }
		public string TipoAdmision { get; set; }
		public string TipoServicio { get; set; }
		public decimal MontoTotal { get; set; }
		public decimal MontoMedico { get; set; }
		public decimal MontoClinica { get; set; }

	}
}
