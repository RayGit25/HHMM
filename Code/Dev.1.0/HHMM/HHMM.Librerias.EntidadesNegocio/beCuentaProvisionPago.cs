using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beCuentaProvisionPago
    {
        public int CuentaProvisionPagoId { get; set; }
        public string SucursalId { get; set; }
        public string TipoAsiento { get; set; }
        public int ServicioId { get; set; }
        public string MonedaId { get; set; }
        public int EspecialidadId { get; set; }
       // public bool IndicadorVinculada { get; set; }
        public int TipoAdmisionId { get; set; }
        public string ClasificadorMovimientoId { get; set; }
        public string TipoComponente { get; set; }
        public string ComponenteId { get; set; }
        public string ArticuloId { get; set; }
		public string PlanCuentaNVCostoId { get; set; }
		public string PlanCuentaNVProveedorId { get; set; }
		public string PlanCuentaNVClienteId { get; set; }
		public string PlanCuentaSVCostoId { get; set; }
		public string PlanCuentaSVProveedorId { get; set; }
		public string PlanCuentaSVClienteId { get; set; }
        public int TipoPacienteId { get; set; }
        public string TipoPersona { get; set; }

        public bool IndicadorProduccion{ get; set; }
		public bool IndicadorEscalonado{ get; set; }
		public bool IndicadorMontoFijo{ get; set; }
		public bool IndicadorHorario{ get; set; }
		public bool IndicadorTurno{ get; set; }
		public bool IndicadorCompartido{ get; set; }
		public bool IndicadorVacuna { get; set; }

		public int ConceptoMontoFijoId{get;set;}
		public int UnidadMedicaId{get;set;}

        public string EstadoRegistro { get; set; }

    }
}
