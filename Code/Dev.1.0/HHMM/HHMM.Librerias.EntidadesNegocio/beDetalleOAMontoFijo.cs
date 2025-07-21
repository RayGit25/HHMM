using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beDetalleOAMontoFijo
	{
		public string SucursalId { get; set; }
		public string Sucursal { get; set; }
		public string Periodo { get; set; }
		public int MedicoEmpresaId { get; set; }
		public string Empresa { get; set; }
		public int IdMedico { get; set; }
		public string Medico { get; set; }
		public string Descripcion { get; set; }
		public decimal Importe { get; set; }
		public int ConceptoMontoFijoId { get; set; }
		public string Concepto { get; set; }
	}
}
