using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beMedicoContratoVencer
    {
		public int MedicoContratoId { get; set; }
		public string SucursalId { get; set; }
		public DateTime FechaInicio { get; set; }
		public DateTime FechaFin { get; set; }
		public string Observacion { get; set; }
		public string EstadoRegistro { get; set; }
		public short UsuarioCreadorId { get; set; }
		public string FechaHoraCreacion { get; set; }
		public short UsuarioModificacionId { get; set; }
		public string FechaHoraModificacion { get; set; }
		public string Medico { get; set; }
    }
}
