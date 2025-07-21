using General.Librerias.EntidadesNegocio;
using System.Collections.Generic;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beProcesoListar
    {
        public string Rpta { get; set; }
        public List<beProceso> ListaProceso { get; set; }
        public List<bePeriodo> ListaPeriodo { get; set; }
        public List<beTipoAdmision> ListaTipoAdmision { get; set; }
        public List<beCampoEntero> ListaConfiguracionPagos { get; set; }
        public List<beCampoCadenaCorto> ListaMensajesProvision { get; set; }
        public List<beCampoCadenaCorto> ListaMensajesPlanilla { get; set; }
    }
}
