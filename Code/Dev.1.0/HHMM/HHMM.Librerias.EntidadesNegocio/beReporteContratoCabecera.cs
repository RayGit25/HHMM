using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReporteContratoCabecera
	{
		public int MedicoContratoId { get; set; }
		public int PersonaId { get; set; }
		public string NombreCompleto { get; set; }
		public DateTime FechaInicio { get; set; }
		public DateTime FechaFin { get; set; }
	}
}
