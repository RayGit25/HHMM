using System;
using System.Collections.Generic;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beMedicoContratoListas
    {
        public List<beCampoEntero> ListaConfiguracionPago { get; set; }
        public List<beCampoEntero> ListaTipoAtencion { get; set; }
        public List<beCampoEntero> ListaTipoAdmision { get; set; }
        public List<beCampoEnteroLargo> ListaTipoPaciente { get; set; }
        public List<beCampoEntero> ListaTipoAseguradora { get; set; }
        public List<beCampoEntero> ListaEspecialidad { get; set; }
        public List<beCampoEntero> ListaTurno { get; set; }
        public List<beCampoEntero> ListaTiempoPago { get; set; }
        public List<beCampoEntero> ListaServicio { get; set; }
		public List<beCampoEnteroLargo> ListaContrato { get; set; }
		public List<beCampoEntero> ListaTipoBonificacion { get; set; }

		public List<beCampoEntero> ListaTipoAdmisionProveedor { get; set; }
		public List<beCampoCadenaCorto> ListaTipoDocumento { get; set; }
		public List<beCampoCadenaCorto> ListaTipoServicioImpuesto { get; set; }
		public List<beCampoCadena3> ListaConceptoMonto { get; set; }
		public List<beCampoEntero> ListaModalidad { get; set; }
        public List<beCampoCadenaCorto> ListaAplicacion { get; set; }

        public List<beCampoCadenaCorto> ListaAplica { get; set; }
        public List<beCampoCadena4> ListaDescuento { get; set; }
        public List<beCampoCadenaCorto> ListaTipoDescuento { get; set; }

    }
}


