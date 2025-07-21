using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class bePlanillaMedico
	{
		public int ProcesoId{get;set;}
		public string  MedicoEmpresa{get;set;}
		public decimal Importe { get; set; }
		public decimal Descuento { get; set; }
		public decimal Bonificacion { get; set; }
		public decimal Ajuste { get; set; }
		public decimal Total { get; set; }
		public int MedicoId{get;set;}
		public int TipoAdmisionId { get; set; }
	}
}
