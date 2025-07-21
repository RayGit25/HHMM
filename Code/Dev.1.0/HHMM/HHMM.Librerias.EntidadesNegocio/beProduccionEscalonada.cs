using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beProduccionEscalonada
    {
        public int ProduccionEscalonadaId { get; set; }
        public int UsuarioId { get; set; }
        public int MedicoContratoId { get; set; }
        public int ConfiguracionPagoId { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string TipoRango { get; set; }
        public decimal Rango1 { get; set; }
        public decimal Rango2 { get; set; }
        public int ServicioId { get; set; }
        public int TipoAtencionId { get; set; }
        public int TipoAdmisionId { get; set; }
        public int TipoPacienteId { get; set; }
        public int AseguradoraId { get; set; }
        public int EspecialidadId { get; set; }
        public int TurnoId { get; set; }
        public string TipoValor { get; set; }
        public decimal Valor1 { get; set; }
        public decimal Valor2 { get; set; }
        public string Aplicacion { get; set; }
        public string TipoCalculo { get; set; }
        public string AlcancePrestacion { get; set; }
        public int TiempoPagoId { get; set; }
        public string ListaPrestaciones { get; set; }
        public string EstadoRegistro { get; set; }
    }
}
