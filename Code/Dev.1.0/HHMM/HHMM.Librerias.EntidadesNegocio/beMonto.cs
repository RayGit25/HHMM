using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beMonto
    {
        public int MontoId { get; set; }
        public int UsuarioId { get; set; }
        public int MedicoContratoId { get; set; }
        public int ConfiguracionPagoId { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public decimal Valor1 { get; set; }
        public string Periodo { get; set; }
        public string AlcancePrestacion { get; set; }
        public int TiempoPagoId { get; set; }
        public string ListaPrestacion { get; set; }
		public int TurnoId { get; set; }
		public string HoraInicio { get; set; }
		public string HoraFin { get; set; }
		public int ConceptoMontoFijoId { get; set; }
        public string EstadoRegistro { get; set; }
		public string TipoRegistro { get; set; }
		public int AnioProduccionMF { get; set; }
		public int MesProduccionMF { get; set; }
    }
}
