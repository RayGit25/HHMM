using System;


namespace HHMM.Librerias.EntidadesNegocio
{
    public class beHorarioMedicoHorario
    {
        public int MedicoHorarioId { get; set; }
        public int PersonaId { get; set; }
        public string TipoRegistroHorario { get; set; }
        public int EspecialidadId { get; set; }
        public int ConsultorioId { get; set; }
        public int TurnoId { get; set; }
        public int TipoAtencionId { get; set; }
        public DateTime FechaHoraInicio { get; set; }
        public DateTime FechaHoraFin { get; set; }
        public string EstadoRegistro { get; set; }
        public string ListaDia { get; set; }
		public string SucursalId { get; set; }
		public int UnidadMedicaId {get;set;}
    }
}
