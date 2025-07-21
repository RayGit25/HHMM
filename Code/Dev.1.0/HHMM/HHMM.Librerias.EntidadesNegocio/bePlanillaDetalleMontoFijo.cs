using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class bePlanillaDetalleMontoFijo
	{
		public int PersonaId { get; set; }
		public string Descripcion { get; set; }
		public decimal Importe { get; set; }
		public int ConceptoMontoFijoId { get; set; }
		public string ConceptoMontoFijo { get; set; }
		public bool IndicadorAdministrativo { get; set; }
		public string Periodo { get; set; }
		public int ProcesoMedicoConceptoId { get; set; }
		public string Persona { get; set; }
	}
}
