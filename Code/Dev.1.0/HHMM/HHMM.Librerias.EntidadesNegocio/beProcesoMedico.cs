using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beProcesoMedico
    {
        public int ProcesoMedicoId { get; set; }
        public int ProcesoId { get; set; }
        public int PersonaId { get; set; }
        public string NombreCompleto { get; set; }
        public decimal ImportePlanilla { get; set; }
        public decimal DescuentoPlanilla { get; set; }
        public decimal AjustePlanilla { get; set; }
        public decimal TotalPlanilla { get; set; }
        public string TiempoPago { get; set; }
    }
}
