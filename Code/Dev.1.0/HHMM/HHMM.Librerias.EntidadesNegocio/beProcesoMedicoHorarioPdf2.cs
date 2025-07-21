using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beProcesoMedicoHorarioPdf2
	{
		public int PersonaId { get; set; }
		public string Fecha { get; set; }
		public string HoraInicio { get; set; }
		public string HoraFin { get; set; }
		public int HorasProgramadas { get; set; }
		public decimal ValorContrato { get; set; }
		public decimal Importe { get; set; }
		public decimal Bonificacion { get; set; }
		public decimal Total { get; set; }
		public string Dia { get; set; }
		public bool IndicadorFeriado { get; set; }
		public string Especialidad { get; set; }
		public string TipoAtencion { get; set; }
		public decimal Impuesto { get; set; }
		public decimal TotalGeneral { get; set; }
		public string DocumentoEmitido { get; set; }
	}
}
