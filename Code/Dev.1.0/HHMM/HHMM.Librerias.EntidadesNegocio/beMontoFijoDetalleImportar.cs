using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beMontoFijoDetalleImportar
	{
		public string Sucursal{get;set;}
		public int IdOrdenAtencion{get;set;}
		public int LineaOrdenAtencion{get;set;}
		public string CodigoOA{get;set;}
		public DateTime FechaAtencion{get;set;}
		public string ComponenteId{get;set;}
		public decimal Cantidad{get;set;}
		public decimal Monto { get; set; }
	}
}
