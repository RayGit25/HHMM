using System;
namespace HHMM.Librerias.EntidadesNegocio
{
	public class beHistorialCambio
	{
		public int HistorialCambioId	{get;set;}
		public string Tabla{get;set;}
		public string RegistroId{get;set;}
		public string Accion{get;set;}
		public string Campo{get;set;}
		public string ValorInicial{get;set;}
		public string ValorFinal {get;set;}
		public string NombreCompleto {get;set;}
		public DateTime FechaHoraCreacion { get; set; }
	}
}
