using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReporteLiquidacionVista11
	{
		public int PersonaId{get;set;}
		public string Descripcion{get;set;}
		public int ConceptoMontoFijoId{get;set;}
		public string ConceptMontoFijo{get;set;}
		public bool IndicadorAdministrativo{get;set;}
		public string Periodo{get;set;}
		public decimal Importe { get; set; }
		public decimal Impuesto{get;set;}
		public decimal TotalGeneral{get;set;}
		public string DocumentoEmitido{get;set;}
	}
}
