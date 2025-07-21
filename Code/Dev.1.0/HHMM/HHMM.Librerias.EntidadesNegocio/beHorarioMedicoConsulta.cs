using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beHorarioMedicoConsulta
	{
		public DateTime Fecha { get; set; }
		public int Dia { get; set; }
		public int PersonaId { get; set; }
		public DateTime HoraInicio { get; set; }
		public DateTime HoraFin { get; set; }
		public decimal HorasAsignadas { get; set; }
		public string Persona { get; set; }
		public string ApellidoPaterno { get; set; }
	}

	public class beFrHorarioMedicoConsulta
	{
		public string Sucursal { get; set; }
		public int Medico { get; set; }
		public int Periodo { get; set; }
		public int Anio { get; set; }
		public int Empresa { get; set; }
		public int Turno { get; set; }
		public int UnidadMedica { get; set; }
	}
}
