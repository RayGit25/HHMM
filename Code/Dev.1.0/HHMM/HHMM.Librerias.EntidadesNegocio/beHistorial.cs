using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beHistorial
    {
        public string Accion { get; set; }
        public string Campo { get; set; }
        public string ValorInicial { get; set; }
        public string ValorFinal { get; set; }
        public int UsuarioId { get; set; }
        public DateTime FechaHoraCreacion { get; set; }
    }
}
