using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beProcesoOrdenAtencionCSFRPdf
    {
		public int Item { get; set; }
		public DateTime Fecha { get; set; }
		public string Prefactura { get; set; }
		public string Entidad { get; set; }
		public string Paciente { get; set; }
		public string Descripcion { get; set; }
		public string Origen { get; set; }
		public string Concepto { get; set; }
		public decimal Total { get; set; }
		public decimal Clinica { get; set; }
		public decimal Medico { get; set; }
		public string Sucursal { get; set; }
	}
}
