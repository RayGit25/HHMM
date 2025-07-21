using System;
using System.Collections.Generic;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beMontoPorId
    {
        public List<beMonto> ListaMonto { get; set; }
        public List<beCampoCadenaSolo> Componente { get; set; }
		public List<beCampoCadenaCorto> lArchivos { get; set; }
		public List<beMontoFijoDetalleImportar> lDetalleOAs { get; set; }
    }
}
