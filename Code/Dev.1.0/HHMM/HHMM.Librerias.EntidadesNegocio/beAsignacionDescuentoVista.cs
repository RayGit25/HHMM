using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beAsignacionDescuentoVista
    {
        public string SucursalId { get; set; }
        public int MedicoContratoId { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string IndicadorVencimiento { get; set; }
        public string IndicadorAplicacion { get; set; }
        public int PersonaId { get; set; }
        public string NombreCompleto { get; set; }
        public string Especialidad { get; set; }
		public string Empresa { get; set; }
        public string EstadoRegistro { get; set; }
		public string EstadoRegistroWeb { get; set; }
		public int IndicadorSucursal { get; set; }
		public string DatosMedicoDetalle { get; set; }
    }
}
