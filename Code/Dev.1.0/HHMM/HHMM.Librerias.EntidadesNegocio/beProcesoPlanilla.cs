using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beProcesoPlanilla
	{
		public int PeriodoId { get; set; }
		public string SucursalId { get; set; }
		public string Sucursal { get; set; }
		public int ProcesoPlanillaId { get; set; }
		public string Descripcion { get; set; }
		public string Periodo { get; set; }
		public DateTime PeriodoFechaInicio { get; set; }
		public DateTime PeriodoFechaFin { get; set; }
		public int Cantidad { get; set; }
		public decimal Total { get; set; }
		public string Estado { get; set; }
		public int Mes { get; set; }
		public int Anio { get; set; }
		public int MedicoId { get; set; }
		public int PacienteId { get; set; }
		public int TipoProceso { get; set; }

		public int PlanillaId{get;set;}
	}
}
