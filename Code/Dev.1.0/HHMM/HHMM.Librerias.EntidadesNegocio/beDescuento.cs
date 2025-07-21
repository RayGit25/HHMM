using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beDescuento
    {
        public int DescuentoId { get; set; }
        public string Descripcion { get; set; }
        public int TipoDescuentoId { get; set; }
        public string TipoMonto { get; set; }
        public bool IndicadorFacturable { get; set; }
        public string ComponenteId { get; set; }
        public string PlanCuentaContableId { get; set; }
        public string CentroCostoId { get; set; }
        public string ClasificadorMovimientoId { get; set; }
        public string EstadoRegistro { get; set; }
    }
}
