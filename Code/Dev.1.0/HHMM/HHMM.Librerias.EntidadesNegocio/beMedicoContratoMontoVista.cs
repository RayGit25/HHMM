using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beMedicoContratoMontoVista
    {
        public int MedicoContratoDetalleId { get; set; }
        public int Secuencia { get; set; }
        public string Descripcion { get; set; }
        public decimal Valor { get; set; }
        public string Periodo { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string EstadoRegistro { get; set; }
    }
}
