using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beArchivoDigitalMedicoFacturacion
	{
		public int ProcesoId { get; set; }
		public string Facturar { get; set; }
		public string NumeroDocumento { get; set; }
		public string CodigoUsuario { get; set; }
		public DateTime FechaHoraCierre { get; set; }
		public string NombrePDF { get; set; }
		public string PeriodoProvision { get; set; }
	}
}
