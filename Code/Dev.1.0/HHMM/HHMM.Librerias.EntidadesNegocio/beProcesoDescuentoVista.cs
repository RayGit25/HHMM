using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beProcesoDescuentoVista
	{
		public int MedicoEmpresaId { get; set; }
		public string MedicoEmpresa { get; set; }
		public string Tipo { get; set; }
		public string TipoDescuento { get; set; }
		public string NombreDescuento { get; set; }
		public decimal Importe { get; set; }
		public string Estado { get; set; }
		public string Periodo { get; set; }
	}
}
