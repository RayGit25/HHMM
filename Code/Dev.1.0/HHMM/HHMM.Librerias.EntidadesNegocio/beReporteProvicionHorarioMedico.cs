using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReporteProvicionHorarioMedico
	{
		public int PersonaId { get; set; }
		public string Fecha {get ;set;}
		public string HoraInicio {get;set;}
		public string HoraFin {get;set;}
		public int HorasProgramadas {get;set;}
		public decimal ValorContrato {get;set;}
		public decimal Importe {get;set;}
		public decimal Bonificacion{get;set;}
		public decimal Total {get;set;}
		public string Dia{ get;set;}
		public bool IndicadorFeriado {get;set;}
		public string Especialidad {get;set;}
		public string TipoAtencion{get;set;}
		public decimal Impuesto { get; set; }
		public decimal TotalGeneral { get; set; }
	}
}
