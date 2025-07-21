using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beConciliacionOAVista
	{
		public int ConciliacionId { get; set; }
		public string Medico { get; set; }
		public string Descripcion { get; set; }
		public string EstadoRegistro { get; set; }
		public DateTime FechaHoraConciliacion { get; set; }
		public string CodigoUsuario { get; set; }
		public int TotalRegistros { get; set; }
		public int TotalObservados { get; set; }
	}
}
