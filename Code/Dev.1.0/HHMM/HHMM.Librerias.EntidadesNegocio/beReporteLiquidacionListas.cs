using General.Librerias.EntidadesNegocio;
using System;
using System.Collections.Generic;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReporteLiquidacionListas
	{
		public List<beReporteLiquidacionVista1> ListaReporteLiquidacionVista1 { get; set; }
		public List<beReporteLiquidacionVista2> ListaReporteLiquidacionVista2 { get; set; }
		public List<beReporteLiquidacionVista3> ListaReporteLiquidacionVista3 { get; set; }
		public List<beReporteLiquidacionVista4> ListaReporteLiquidacionVista4 { get; set; }
		public List<beReporteLiquidacionVista5> ListaReporteLiquidacionVista5 { get; set; }
		public List<beCampoCadenaCorto> ListaReporteTipoAtencion{get;set;}
		public List<beCampoCadenaCorto> ListaReporteTipoOrden { get; set; }
		public List<beCampoCadenaCorto> ListaReporteConcepto { get; set; }
		public List<beReporteProvicionHorarioMedico>listaHorarioMedico {get;set;}
		public List<beCampoCadenaCorto> ListaReporteArticulo { get; set; }
		public List<beReporteLiquidacionVista11> ListaReporteLiquidacionVista11 { get; set; }
	}
}
