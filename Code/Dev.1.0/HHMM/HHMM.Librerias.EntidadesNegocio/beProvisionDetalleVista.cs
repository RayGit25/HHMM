using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beProvisionDetalleVista
    {
        public int PersonaId { get; set; }
        public string NombreCompleto { get; set; }
        public decimal Importe { get; set; }
		public decimal Bonificacion { get; set; }
        public decimal Descuento { get; set; }
        public decimal Ajuste { get; set; }
        public decimal Total { get; set; }
        public bool IndicadorError { get; set; }
        public string EstadoProvision { get; set; }
        public string Observacion { get; set; }
        public DateTime FechaHoraCalculo { get; set; }
        public DateTime FechaHoraAutorizado { get; set; }
        public DateTime FechaHoraProvision { get; set; }
		public int EspecialidadId { get; set; }
		public int MedicoEmpresaId { get; set; }
        public int ProcesoMedicoId { get; set; }
		public int ConfiguracionPagoId { get; set; }
    }
}
