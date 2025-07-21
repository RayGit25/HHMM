using System;


namespace HHMM.Librerias.EntidadesNegocio
{
    public class beMedicoContratoHorarioConfiguracionVista
    {
        public int MedicoContratoDetalleId { get; set; }
        public int Secuencia { get; set; }
        public string TipoRegistro { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string Condicion { get; set; }
        public string TipoDia { get; set; }
        public string Dia { get; set; }
        public int TurnoId { get; set; }
        public decimal Valor { get; set; }
        public string EstadoRegistro { get; set; }
    }
}
