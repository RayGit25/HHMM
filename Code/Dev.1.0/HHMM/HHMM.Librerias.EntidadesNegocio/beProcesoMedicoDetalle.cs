using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beProcesoMedicoDetalle
    {
        public int ProcesoId { get; set; }
        public int PersonaId { get; set; }
		public int ConfiguracionPagoId { get; set; }
        public string Concepto { get; set; }
        public decimal Importe { get; set; }
		public decimal Bonificacion { get; set; }
        public decimal Descuento { get; set; }
        public decimal Ajuste { get; set; }
        public decimal Total { get; set; }
		public string IndicadorNoPago { get; set; }
		public string ObservacionNoPago { get; set; }
    }
}
