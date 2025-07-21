using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReportePlanillaObligacionVista
	{
		public int MedicoEmpresaId { get; set; }
		public string MedicoEmpresa { get; set; }
		public int PlanillaId { get; set; }
		public string Proceso { get; set; }
		public int Periodo { get; set; }
		public string TipoAdmision { get; set; }
		public string TipoServicio { get; set; }
		public string TipoDocumentoPagoId { get; set; }
		public string Documento { get; set; }
		public decimal SubTotal { get; set; }
		public decimal IGV { get; set; }
		public decimal MontoObligacion { get; set; }
		public DateTime FechaEnvio { get; set; }
		public string UsuarioEnvio { get; set; }
	}
}
