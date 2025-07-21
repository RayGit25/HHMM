using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beDetalleObservadoLista
	{
		public string CodigoOA { get; set; }
		public DateTime FechaInicioOA { get; set; }
		public int IdOrdenAtencion { get; set; }
		public int LineaOrdenAtencion { get; set; }
		public string Prestacion { get; set; }
		public DateTime FechaAtencionPrestacion { get; set; }
		public decimal Cantidad { get; set; }
		public decimal PrecioUnitarioPrestacion { get; set; }
		public decimal MontoImponiblePrestacion { get; set; }
		public string Servicio { get; set; }
		public string TipoPaciente { get; set; }
		public string TipoAtencion { get; set; }
		public string Aseguradora { get; set; }
		public string Contrato { get; set; }
		public int IdExpediente { get; set; }
		public int LineaExpediente { get; set; }
		public string Observacion { get; set; }
		
		
	}
}
