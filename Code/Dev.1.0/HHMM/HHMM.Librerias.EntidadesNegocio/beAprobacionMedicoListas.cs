using General.Librerias.EntidadesNegocio;
using System;
using System.Collections.Generic;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beAprobacionMedicoListas
	{
		public List<beHorarioMedicoConsulta> lista { get; set; }
		public List<DateTime> listaFeriado { get; set; }
		public List<beAprobacionMedico> listaTabla { get; set; }
	}
}
