using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class bePerfil
    {
        public int PerfilId { get; set; }
        public string NombrePerfil { get; set; }
        public string EstadoRegistro { get; set; }
        public int UsuarioCreadorId { get; set; }
    }
}
