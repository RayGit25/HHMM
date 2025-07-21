using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beMedicoContratoEscalonadoVista
    {
        public int MedicoContratoDetalleId { get; set; }
        public int Secuencia { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string Servicio { get; set; }
        public string TipoRango { get; set; }
        public string Rango { get; set; }
        public string TipoValor { get; set; }
        public decimal Valor1 { get; set; }
        public string EstadoRegistro { get; set; }
    }
}
