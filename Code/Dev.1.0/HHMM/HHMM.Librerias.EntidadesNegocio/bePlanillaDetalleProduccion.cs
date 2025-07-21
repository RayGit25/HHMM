using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class bePlanillaDetalleProduccion
	{
		public string Medico { get; set; }
		public string CodigoOA { get; set; }
		public string Paciente { get; set; }
		public int IdExpediente { get; set; }
		public string Prestacion { get; set; }
		public DateTime FechaAtencionPrestacion { get; set; }
		public DateTime FechaAtendido { get; set; }
		public DateTime FechaTerminado { get; set; }
		public decimal PrecioUnitarioPrestacion { get; set; }
		public decimal Cantidad { get; set; }
		public decimal MontoImponiblePrestacion { get; set; }
		public decimal ValorMedida { get; set; }
		public string TipoValor { get; set; }
		public decimal Valor { get; set; }
		public decimal Porcentaje { get; set; }
		public decimal ParteClinica { get; set; }
		public decimal Importe { get; set; }
		public decimal Bonificacion { get; set; }
		public decimal Ajuste{get;set;}
		public decimal Total{get;set;}
		public DateTime FechaInicioOA { get; set; }
		public string TipoPaciente { get; set; }
		public string TipoAtencion { get; set; }
		public string Aseguradora { get; set; }
		public string Servicio { get; set; }
		public string ModFacturacion { get; set; }
		public string Especialidad { get; set; }
		public string DescripcionEstadoPrestacion { get; set; }
		public string EstadoRegistro { get; set; }
		public int ProcesoOrdenAtencionId{get;set;}
		public string PeriodoProduccion { get; set; }
		public int IdOrdenAtencion { get; set; }
		public int LineaOrdenAtencion { get; set; }
	}
}
