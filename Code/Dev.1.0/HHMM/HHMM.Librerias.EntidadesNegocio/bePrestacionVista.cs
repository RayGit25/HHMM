using System;
namespace HHMM.Librerias.EntidadesNegocio
{
	public class bePrestacionVista
	{
		public string ComponenteId { get; set; }
		public string Descripcion { get; set; }
		public decimal ValorMedida { get; set; }
		public string Servicio { get; set; }
		public bool IndicadorVisible { get; set; }
	}
}
