using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beInterfaseMaestroVista
	{
		public int InterfaseMaestroID { get; set; }
		public string Descripcion { get; set; }
		public string EstadoRegistro { get; set; }
		public string Usuario { get; set; }
		public DateTime FechaHoraCreacion { get; set; }
		public string UsuarioModificador { get; set; }
		public DateTime FechaHoraCreacionModificador { get; set; }
		public int PeriodoId { get; set; }
	}
}
