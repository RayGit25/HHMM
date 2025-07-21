using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class bePlanillaVistaResumen
    {
        public int ProcesoId { get; set; }
        public string Periodo { get; set; }
        public int TipoAdmisionId { get; set; }
        public decimal TotalPlanilla { get; set; }
        public decimal SaldoProcesar { get; set; }
    }
}
