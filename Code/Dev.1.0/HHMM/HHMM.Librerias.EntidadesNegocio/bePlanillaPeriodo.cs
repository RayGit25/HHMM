using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class bePlanillaPeriodo
	{
	public int ProcesoId{get;set;} 
	public string  PeriodoNombre{get;set;} 
	public int TipoAdmisionId{get;set;} 
	public decimal TotalProvision{get;set;}
	public decimal TotalPlanilla{get;set;}
	public decimal SaldoProcesar { get; set; } 
	public int PeriodoId {get;set;}
	}
}
