using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beTipoDescuento
    {
        public int TipoDescuentoId { get; set; }
        public string Descripcion { get; set; }
        public string EstadoRegistro { get; set; }
        public int UsuarioCreadorId { get; set; }
        public int UsuarioModificadorId { get; set; }
    }
}
