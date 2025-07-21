using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beFeriadoVista
    {
        public int FeriadoId { get; set; }
        public string Descripcion { get; set; }
        public DateTime Fecha { get; set; }
        public int Anio { get; set; }
        public string EstadoRegistro { get; set; }
    }
}
