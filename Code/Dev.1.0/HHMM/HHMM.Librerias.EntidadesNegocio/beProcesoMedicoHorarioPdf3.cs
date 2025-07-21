using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beProcesoMedicoHorarioPdf3
	{
		public int PersonaId { get; set; }
		public string Descripcion { get; set; }
		public decimal Importe { get; set; }
		public int ConceptoMontoFijoId { get; set; }
		public string ConceptoMontoFijo { get; set; }
		public bool IndicadorAdministrativo { get; set; }
		public string Periodo { get; set; }
		public decimal Impuesto { get; set; }
		public decimal TotalGeneral { get; set; }
		public string DocumentoEmitido { get; set; }
	}
}
