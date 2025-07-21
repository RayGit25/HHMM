using System;
using System.Collections.Generic;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beAprobacionMedico
	{
		public int PersonaId{get;set;}
		public string Medico{get;set;}
		public int Horas{get;set;}
		public string CodigoUsuario{get;set;}
		public DateTime FechaHoraAprobacion{get;set;}
		public string EstadoRegistro { get; set; }
	}
}
