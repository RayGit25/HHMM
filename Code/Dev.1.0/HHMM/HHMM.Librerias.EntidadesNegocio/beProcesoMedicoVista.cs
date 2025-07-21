using System;
using System.Collections.Generic;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beProcesoMedicoVista
    {
        public string Periodo { get; set; }
        public string NombreCompleto { get; set; }
        public int TipoAdmisionId { get; set; }
		public string Especialidad { get; set; }
        public List<beProcesoMedicoDetalle> ListaDetalle { get; set; }
		public List<beProcesoMedicoDetalle2> ListaDetalle2 { get; set; }
    }
}
