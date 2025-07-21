using System;
using System.Collections.Generic;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beCuentaProvisionPagoListas
    {
        public List<beCampoEntero> ListaServicio { get; set; }
        public List<beCampoEntero> ListaTipoAdmision { get; set; }
        public List<beCampoCadenaCorto> ListaMoneda { get; set; }
        public List<beCampoEntero> ListaEspecialidad { get; set; }
        public List<beCampoCadenaCorto> ListaClasificadorMovimiento { get; set; }
		public List<beCampoEntero> ListaConfiguracionPago { get; set; }

		public List<beCampoEntero> ListaUnidadMedica { get; set; }
		public List<beCampoEntero> ListaConcepto { get; set; }
        public List<beCampoEntero> listaTipoPaciente { get; set; }
    }
}
