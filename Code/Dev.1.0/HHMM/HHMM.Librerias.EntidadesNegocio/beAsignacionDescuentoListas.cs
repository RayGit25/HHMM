using System;
using System.Collections.Generic;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beAsignacionDescuentoListas
    {
        public List<beCampoEntero> ListaTipoDescuento { get; set; }
        public List<beCampoEnteroLargo> ListaDescuento { get; set; }
        public List<beCampoCadenaCorto> ListaTipoDocumento { get; set; }
		public List<beCampoEntero> ListaEspecialidad { get; set; }
    }
}
