using System;


namespace HHMM.Librerias.EntidadesNegocio
{
    public class beMedicoContratoTurnoConfiguracionVista
    {
        public int MedicoContratoDetalleId { get; set; }
        public int Secuencia { get; set; }
        public string TipoRegistro { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string Condicion { get; set; }
        public string TipoValor { get; set; }
        public int CantidadHora { get; set; }
        public decimal Valor { get; set; }
        public string EstadoRegistro { get; set; }
    }
}
