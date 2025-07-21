using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beProcesoOrdenAtencionPdf
	{
		public int IdTipoAtencion{get;set;}
		public int ServicioId {get;set;}
		public int PersonaId{get;set;}
		public string CodigoPrestacion{get;set;}
		public int EspecialidadId { get; set; }
		public DateTime FechaAtencionPrestacion{get;set;}
		public string CodigoOA{get;set;}
		public string EstadoPrestacion{get;set;}
		public int IdExpediente{get;set;}
		public string EstadoExpediente{get;set;}
		public int IdPaciente{get;set;}
		public string Paciente{get;set;}
		public string CodigoTipoPaciente{get;set;}
		public decimal Cantidad{get;set;}
		public decimal MontoImponiblePrestacion{get;set;}
		public decimal Bonificacion{get;set;}
		public decimal ValorMedida{get;set;}
		public string TipoValor{get;set;}
		public decimal Valor{get;set;}
		public decimal Porcentaje{get;set;}
		public decimal Importe{get;set;}
		public decimal ParteClinica{get;set;}
		public decimal Impuesto{get;set;}
		public decimal Total{get;set;}
		public string DocumentoEmitido{get;set;}
		public decimal MontoFacturar { get; set; }
		/*--PROPIEDADES NUEVAS*/
		public string TipoComponente { get; set; }
		public string TipoAjuste { get; set; }

		public decimal MontoImponiblePrestacionResumen { get; set; }
		public decimal ImporteResumen { get; set; }
		public decimal ParteClinicaResumen { get; set; }
		public decimal MontoFacturarResumen { get; set; }

		public decimal BonificacionResumen { get; set; }
		public decimal TotalResumen { get; set; }
		public decimal MontoImponiblePrestacionResumenMed { get; set; }
		public decimal ImporteResumenMed { get; set; }
		public decimal ParteClinicaResumenMed { get; set; }
		public decimal MontoFacturarResumenMed { get; set; }
		public decimal BonificacionResumenMed { get; set; }
		public decimal TotalResumenMed { get; set; }
        public decimal ImporteTotal { get; set; }
		public decimal ImporteTotalResumen { get; set; }

		/*--------------------*/
	}
}
