using System;
namespace HHMM.Librerias.EntidadesNegocio
{
	public class bePeriodo
	{
		public int PeriodoId { get; set; }
		public string SucursalId { get; set; }
		public string Descripcion { get; set; }
		public DateTime FechaInicio { get; set; }
		public DateTime FechaFin { get; set; }
		public int Anio { get; set; }
		public int Mes { get; set; }
		public string Periodo { get; set; }
		public string EstadoRegistro { get; set; }
		public DateTime FechaHoraCreacion { get; set; }
		public int UsuarioCreadorId { get; set; }
		public DateTime FechaHoraModificacion { get; set; }
		public int UsuarioModificacionId { get; set; }
		public string EstadoProvision{get;set;}
		public DateTime FechaCierre{get;set;}
		public string EstadoProvisionFec { get; set; }
	}
}
