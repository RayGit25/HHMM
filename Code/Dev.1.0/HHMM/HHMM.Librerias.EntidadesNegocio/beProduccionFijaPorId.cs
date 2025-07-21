using System;
using System.Collections.Generic;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beProduccionFijaPorId
    {
        public List<beProduccionFija> ListaProduccionFija { get; set; }
        public List<beCampoCadenaSolo> Componente { get; set; }
    }
}
