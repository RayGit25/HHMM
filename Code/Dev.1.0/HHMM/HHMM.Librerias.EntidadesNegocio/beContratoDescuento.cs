using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
   public class beContratoDescuento
    {
        public int MedicoContratoDetalleId { get; set; }
        public int MedicoContratoId { get; set; }
        public int AplicaId { get; set; }
        public int DescuentoId { get; set; }
        public int TipoDescuentoId { get; set; }
        public string TipoMontoId { get; set; }

        public decimal Importe { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }

        public int UsuarioId { get; set; }



    }
}
