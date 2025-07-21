using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beHorarioVista
	{
		public int PersonaId { get; set; }
		public string Medico { get; set; }
		public string IndicadorVinculada { get; set; }
		public int TipoAdmisionId { get; set; }
		public string TipoAdmision { get; set; }
		public int UnidadMedicaId{get;set;}
		public string UnidadMedica{get;set;}
	}
}
