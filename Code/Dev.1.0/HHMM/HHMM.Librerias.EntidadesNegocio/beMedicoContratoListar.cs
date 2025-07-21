using System;
using System.Collections.Generic;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beMedicoContratoListar
    {
        public List<beCampoCadenaCorto> ListaAdjuntos { get; set; }
        public List<beCampoEnteroSolo> ListaConfiguracionPago { get; set; }
        public List<beMedicoContratoProduccionVista> ListaProduccionConfiguracion { get; set; }
        public List<beMedicoContratoProduccionVista> ListaProduccionBonificacion { get; set; }
        public List<beMedicoContratoEscalonadoVista> ListaProduccionEscalonada { get; set; }
        public List<beMedicoContratoMontoVista> ListaMonto { get; set; }
        public List<beMedicoContratoHorarioConfiguracionVista> ListaHorarioCalculo { get; set; }
        public List<beMedicoContratoHorarioBonificacionVista> ListaHorarioBonificacion { get; set; }
        public List<beMedicoContratoTurnoConfiguracionVista> ListaTurnoCalculo { get; set; }
        public List<beMedicoContratoTurnoBonificacionVista> ListaTurnoBonificacion { get; set; }
        public List<beMedicoContratoCompartidoVista> ListaCompartido { get; set; }
        public List<beMedicoContratoVacunaVista> ListaVacuna { get; set; }
        public List<beCampoFecha> ListaFeriado { get; set; }
		public List<beCampoCadenaSolo> ListaObservacion { get; set; }
		public beCampoCadenaCorto ListaCorreoProveedor { get; set; }
    }
}
