using System;
namespace HHMM.Librerias.EntidadesNegocio
{
	public class beMedicoContratoDescuento
	{
		public int MedicoContratoDetalleId { get; set; }
		public int TipoDescuentoId { get; set; }
		public int DescuentoId { get; set; }
		public decimal Monto { get; set; }
		public bool IndicadorDocumentoPago { get; set; }
		public string TipoMonto { get; set; }
		public DateTime FechaInicio { get; set; }
		public DateTime FechaFin { get; set; }		
		public string Descripcion { get; set; }
        public string EstadoRegistro { get; set; }
	}
}
