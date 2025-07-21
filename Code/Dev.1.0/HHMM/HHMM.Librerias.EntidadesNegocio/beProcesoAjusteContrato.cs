
using System;
namespace HHMM.Librerias.EntidadesNegocio
{
	public class beProcesoAjusteContrato
	{
		public int ProcesoAjusteContratoId {get;set;}
		public string Descripcion{get;set;}
		public string EstadoRegistro{get;set;}
		public DateTime FechaHoraProceso{get;set;}
		public string CodigoUsuario{get;set;}
		public int TotalRegistros{get;set;}
		public int CantidadAjustes{get;set;}
		public decimal TotalAjuste { get; set; }
	}
}
