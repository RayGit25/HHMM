using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beUsuarioMantenimiento
	{
		public int UsuarioId { get; set; }
		public string CodigoUsuario { get; set; }
		public string Nombre { get; set; }
		public string ApellidoPaterno { get; set; }
		public string ApellidoMaterno { get; set; }
		public DateTime FechaNacimiento { get; set; }
		public string TipoDocumentoId { get; set; }
		public string NumeroDocumento { get; set; }
		public bool IndicadorAD { get; set; }
		public string CorreoElectronico { get; set; }
		public int PerfilId { get; set; }
		public int UsuarioCreadorId { get; set; }
		public string Contrasena { get; set; }
		public string ListaCompania { get; set; }
		public string ListaSucursal { get; set; }
	}
}
