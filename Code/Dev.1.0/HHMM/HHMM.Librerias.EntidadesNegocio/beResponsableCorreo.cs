using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beResponsableCorreo
	{
        public int ResponsableCorreoId { get; set; }
        public string SucursalId { get; set; }
        public string Sucursal { get; set; }
        public int UsuarioId { get; set; }
        public string UsuarioNombre { get; set; }
        public string Responsable { get; set; }
        public string CorreoElectronico { get; set; }
        public string Asunto { get; set; }
        public string Cuerpo { get; set; }
        public string EstadoRegistro { get; set; }
        public DateTime FechaHoraCreacion { get; set; }
        public int UsuarioCreadorId { get; set; }
        public DateTime FechaHoraModificacion { get; set; }
        public int UsuarioModificacionId { get; set; }
	}
}
