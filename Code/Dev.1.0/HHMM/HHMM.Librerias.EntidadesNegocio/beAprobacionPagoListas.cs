using System.Collections.Generic;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beAprobacionPagoListas
    {
        public List<beCampoEntero> ListaServicio { get; set; }
        public List<beCampoEntero> ListaPeriodo { get; set; }
        public List<beCampoEntero> ListaTipoAdmision { get; set; }
        public List<beCampoCadenaCorto> ListaEstado { get; set; }
    }
}
