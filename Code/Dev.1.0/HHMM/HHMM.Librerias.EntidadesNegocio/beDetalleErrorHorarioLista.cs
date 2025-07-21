using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beDetalleErrorHorarioLista
	{
		public string Fecha { get; set; }
		public string HoraInicio { get; set; }
		public string HoraFin { get; set; }
		public decimal HorasProgramadas { get; set; }
		public string Dia { get; set; }
		public bool IndicadorFeriado { get; set; }
		public string Especialidad { get; set; }
		public string TipoAtencion { get; set; }
	}
}
