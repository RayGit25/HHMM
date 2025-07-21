using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beArchivoDigitalMedico
	{
		public string Periodo{get;set;}
		public string Medico{get;set;}
		public int TipoAdmisionId{get;set;}
		public string EstadoDifundir{get;set;}
		public int PersonaId { get; set; }
		public int PlanillaId{get;set;}

		public string Periodo2{get;set;}
		public DateTime FechaUltimoEnvio { get; set; }
		public string NombrePDF { get; set; }
		public string ElementosCorreo { get; set; }
		public decimal Total { get; set; }
		public string PeriodoProvision { get; set; }
		public int TipoPlanilla { get; set; }
	}
}
