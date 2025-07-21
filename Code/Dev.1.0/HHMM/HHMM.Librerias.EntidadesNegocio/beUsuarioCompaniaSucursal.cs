using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beUsuarioCompaniaSucursal
    {
        public int UsuarioId { get; set; }
        public string CodigoUsuario { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public int PerfilId { get; set; }
        public int CantidadSucursal { get; set; }
        public string Compania { get; set; }
        public string Sucursal { get; set; }
        public bool IndicadorAD { get; set; }
        public string EstadoRegistro { get; set; }
		public DateTime FechaNacimiento { get; set; }
		public string TipoDocumentoId { get; set; }
		public string NumeroDocumento { get; set; }
		public string CorreoElectronico { get; set; }
    }
}
