using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beContratoProduccionDescuentoVista
    {
        public string medicoContratoDetalleId { get; set; }
        public string secuencia { get; set; }
        public string descripcion { get; set; }
        public string tipoDescuentoId { get; set; }
        public string tipoMontoId { get; set; }
        public string importe { get; set; }
        public string estadoRegistro { get; set; }
        public string descuentoId { get; set; }
        public string AplicaId { get; set; }
    }
}
