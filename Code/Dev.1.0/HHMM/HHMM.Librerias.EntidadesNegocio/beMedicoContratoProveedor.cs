using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beMedicoContratoProveedor
    {
        public int MedicoContratoProveedorId { get; set; }
        public int MedicoContratoId { get; set; }
        public int EspecialidadId { get; set; }
        public DateTime FechaInicioVigencia { get; set; }
        public DateTime FechaFinVigencia { get; set; }
        public int TipoAdmisionId { get; set; }
        public string TipoPersona { get; set; }
        public int MedicoEmpresaId { get; set; }
        public int TiempoPagoId { get; set; }
        public string TipoDocumentoPagoId { get; set; }
        public string CodigoImpuesto { get; set; }
        public string EstadoRegistro { get; set; }
        public string MedicoEmpresa { get; set; }
        public string Ruc { get; set; }
        public string CorreoElectronico { get; set; }
        public string TipoMedico { get; set; }
        public string CorreoElectronicoAlterno { get; set; }
        public string TipoPrestaciones { get; set; }
        public string ListaPrestaciones { get; set; }
        public string ComponenteId { get; set; }
    }
}
