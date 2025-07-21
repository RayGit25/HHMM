using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beMedicoContratoProduccionB
    {
        public string Operador { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public int TipoAtencionId { get; set; }
        public int TipoAdmisionId { get; set; }
        public int TipoPacienteId { get; set; }
        public int AseguradoraId { get; set; }
        public int EspecialidadId { get; set; }
        public string TipoDia { get; set; }
        public int TurnoId { get; set; }
        public string TipoFeriado { get; set; }
        public DateTime FechaFeriado { get; set; }
        public string TipoValor { get; set; }
        public decimal Valor1 { get; set; }
        public string AlcancePrestacion { get; set; }
        public string EstadoRegistro { get; set; }
    }
}
