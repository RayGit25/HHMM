using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class bePlanillaMedicoConsolidadoResumenTipo
    {
        public string Descripcion { get; set; }
        public decimal Medico { get; set; }
        public decimal Clinica { get; set; }
        public decimal Total { get; set; }
        public decimal IGV { get; set; }
        public decimal Neto { get; set; }
    }
}
