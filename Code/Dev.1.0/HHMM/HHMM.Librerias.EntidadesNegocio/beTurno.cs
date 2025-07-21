using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beTurno
	{
		public int TurnoId	{get;set;}
		public string Descripcion	{get;set;}
		public string HoraInicio { get; set; }
		public string HoraFin { get; set; }
		public string EstadoRegistro { get; set; }
	}
}
