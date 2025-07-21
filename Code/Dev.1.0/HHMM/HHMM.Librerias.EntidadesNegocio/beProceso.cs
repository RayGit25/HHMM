using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beProceso
    {

        public int ProcesoId { get; set; }
        public string SucursalId { get; set; }
        public string Sucursal { get; set; }
        public string Periodo { get; set; }
        public DateTime PeriodoFechaInicio { get; set; }
        public DateTime PeriodoFechaFin { get; set; }
        public string TipoAdmision { get; set; }
        public string Descripcion { get; set; }
        public int Cantidad { get; set; }
        public decimal TotalProvision { get; set; }
        public decimal TotalPlanilla { get; set; }
        public decimal SaldoProcesar { get; set; }
        public string EstadoProvision { get; set; }
        public DateTime FechaHoraCreacion { get; set; }
        public int UsuarioCreadorId { get; set; }
        public DateTime FechaHoraModificacion { get; set; }
        public int UsuarioModificacionId { get; set; }
        public int Mes { get; set; }
        public int Anio { get; set; }
        public int OrdenAtencion { get; set; }
        public int MedicoId { get; set; }
        public int PacienteId { get; set; }
        public int PeriodoId { get; set; }
        public int TipoAdmisionId { get; set; }
        public string ListaPago { get; set; }
		public string EstadoPeriodo { get; set; }
		public string DescripcionProceso { get; set; }
		public bool IndicadorDescuadre { get; set; }
        public bool IndicadorRangoDias { get; set; }
    }
}
