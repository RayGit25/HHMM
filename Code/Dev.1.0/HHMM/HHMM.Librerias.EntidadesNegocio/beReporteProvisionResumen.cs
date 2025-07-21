using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReporteProvisionResumen
	{
		public int PersonaId { get; set; }
		public string NombreCompleto { get; set; }
		public decimal Importe { get; set; }
		public decimal Bonificacion { get; set; }
		public decimal Descuento { get; set; }
		public decimal Ajuste { get; set; }
		public decimal Total { get; set; }
		public string EstadoProvicion { get; set; }
		public int EspecialidadId { get; set; }
		public int MedicoEmpresaId { get; set; }
	}
}
