using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReplicaProcesoVista
	{
		public int ReplicaProcesoId { get; set; }
		public string Descripcion { get; set; }
		public DateTime FechaInicio { get; set; }
		public DateTime FechaFin { get; set; }
		public string EstadoRegistro { get; set; }
		public string CodigoUsuario { get; set; }
		public string Usuario { get; set; }
		public DateTime FechaHoraCreacion { get; set; }
		public string Periodo { get; set; }
		public int OAAnterior { get; set; }
		public int ExpAnterior { get; set; }
		public string UsuarioModificacion { get; set; }
		public DateTime FechaHoraCrecionUsuarioMod { get; set; }
        public int OAActual { get; set; }
        public int ExpActual { get; set; }
        public int OAUltimo { get; set; }
        public int ExpUltimo { get; set; }
    }
}
