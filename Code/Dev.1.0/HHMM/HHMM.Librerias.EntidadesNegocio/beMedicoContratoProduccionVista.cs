using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beMedicoContratoProduccionVista
    {
        public int MedicoContratoDetalleId { get; set; }
        public int Secuencia { get; set; }
        public string TipoRegistro { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string Condicion { get; set; }
        public string TipoValor { get; set; }
        public decimal Valor1 { get; set; }
        public string AlcancePrestacion { get; set; }

        public string AplicacionId { get; set; }
        public string EstadoRegistro { get; set; }
    }
}
