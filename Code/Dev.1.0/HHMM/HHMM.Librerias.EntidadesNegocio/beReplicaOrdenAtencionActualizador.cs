using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReplicaOrdenAtencionActualizador
	{
		public string TipoTab { get; set; }
		public string ListaId { get; set; }
		public int PersonaId { get; set; }
		public int EspecialidadId { get; set; }
		public decimal CostoPrestacion { get; set; }
		public DateTime FechaHoraPrestacion { get; set; }
		public int PersonaSecundariaId { get; set; }
		public string TipoProceso { get; set; }
		public int EstadoProcedimiento { get; set; }
		public int EstadoConsultaExterna { get; set; }
		public int IndicadorHorario { get; set; }
	}
}
