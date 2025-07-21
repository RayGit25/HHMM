using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReporteDetalladoProvisionPeriodo
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
		public string CuentaCosto { get; set; }
		public string CuentaProveedor { get; set; }

		public string IdDocContable { get; set; }
		public int PlanillaId { get; set; }
		public string EstadoPlanilla { get; set; }
		public string TipoDocumentoPagoId { get; set; }
		public string NumeroDocumento { get; set; }
		public DateTime FechaEmision { get; set; }
	}
}
