using System;


namespace HHMM.Librerias.EntidadesNegocio
{
    public class beMedicoVacuna
    {
        public int MedicoVacunaId { get; set; }
        public int UsuarioId { get; set; }
        public int MedicoContratoId { get; set; }
        public int ConfiguracionPagoId { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public int TipoAtencionId { get; set; }
        public int TipoAdmisionId { get; set; }
        public int TipoPacienteId { get; set; }
        public int AseguradoraId { get; set; }
        public int EspecialidadId { get; set; }
        public int TurnoId { get; set; }
        public string TipoValor { get; set; }
        public decimal Valor1 { get; set; }
        public decimal Valor2 { get; set; }
        public string AlcanceArticulo { get; set; }
        public int TiempoPagoId { get; set; }
        public string ListaPrestaciones { get; set; }
        public string EstadoRegistro { get; set; }
    }
}
