using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beProcesoAjusteContratoDetalle2
	{
		
		public int ReplicaOrdenAtencionId { get; set; }
		public string CodigoOA { get; set; }		
		public DateTime FechaAtencionPrestacion { get; set; }
		public string CodigoPrestacion { get; set; }
		public int IdOrdenAtencion { get; set; }
		public int LineaOrdenAtencion { get; set; }
		public string Componente { get; set; }
		public decimal ImporteProvisionado { get; set; }
		public decimal Calculado { get; set; }
		public decimal Diferencia { get; set; }
		public string Medico { get; set; }
		public string Empresa { get; set; }
		public string Servicio { get; set; }
		public string Especialidad { get; set; }
		public string Observacion { get; set; }
		public string TipoEntidad { get; set; }
	}
}
