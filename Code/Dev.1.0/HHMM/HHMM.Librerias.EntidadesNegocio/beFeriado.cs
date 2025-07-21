using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beFeriado
    {
        public int FeriadoId { get; set; }
        public string SucursalId { get; set; }
        public string Descripcion { get; set; }
        public DateTime Fecha { get; set; }
        public int Anio { get; set; }
        public string EstadoRegistro { get; set; }
        public int UsuarioCreadorId { get; set; }
        public int UsuarioModificadorId { get; set; }
    }
}
