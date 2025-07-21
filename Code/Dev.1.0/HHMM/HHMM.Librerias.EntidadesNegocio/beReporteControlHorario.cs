using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReporteControlHorario
	{
		public int IdMedico { get; set; }
		public string Medico { get; set; }
		public DateTime Fecha { get; set; }
		public DateTime HoraInicio { get; set; }
		public DateTime HoraFin { get; set; }
		public string Dia { get; set; }
		public bool IndicadorFeriado { get; set; }
		public string Especialidad { get; set; }
		public string TipoAtencion { get; set; }
		public string EstadoRegistro { get; set; }
		public int UnidadMedicaId { get; set; }
		public string UnidadMedica { get; set; }
	}
}
