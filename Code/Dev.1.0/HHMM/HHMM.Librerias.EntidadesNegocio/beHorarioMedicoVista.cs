using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beHorarioMedicoVista
    {
        public int PersonaId { get; set; }
        public string NombreCompleto { get; set; }
        public string CMP { get; set; }
        public string EstadoRegistro { get; set; }
        public string SucursalId { get; set; }
		public string Especialidad{get;set;}
    }
}
