using System;

namespace HHMM.Librerias.EntidadesNegocio
{
   public class beUsuarioLogin
    {
        public int UsuarioId { get; set; }
        public string CodigoUsuario { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public int PerfilId { get; set; }
        public string EstadoRegistro { get; set; }
        public string NombrePerfil { get; set; }
        public DateTime FechaActual { get; set; }
        public int UsuarioAdministrador { get; set; }
        public bool IndicadorAD { get; set; }
        public string IdCompania { get; set; }
    }
}
