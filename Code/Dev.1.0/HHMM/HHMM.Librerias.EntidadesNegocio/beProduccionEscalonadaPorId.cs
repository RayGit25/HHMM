using System;
using System.Collections.Generic;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beProduccionEscalonadaPorId
    {
        public List<beProduccionEscalonada> ListaProduccionEscalonada { get; set; }
        public List<beCampoCadenaSolo> Componente { get; set; }
    }
}
