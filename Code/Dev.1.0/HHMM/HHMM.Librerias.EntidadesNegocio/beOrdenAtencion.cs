using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beOrdenAtencion
	{
		public int IdTabla{get;set;}
		public int IdOrdenAtencion{get;set;}
		public int LineaOrdenAtencion{get;set;}
		public string CodigoOA{get;set;}
		public string TipoComponente{get;set;}
		public string Prestacion{get;set;}
		public int IdEspecialidad{get;set;}
		public int ServicioId{get;set;}
		public int TipoAtencionId{get;set;}
		public string Medico{get;set;}
		public string MedicoSecundario { get; set; }
		public DateTime FechaAtencionPrestacion{get;set;}
		public DateTime  FechaInicioOA{get;set;}
		public decimal Cantidad{get;set;}
		public decimal PrecioUnitarioPrestacion{get;set;}
		public decimal MontoImponiblePrestacion{get;set;}
		public decimal CostoPrestacion { get; set; }
		public string TipoProceso { get; set; }
		public string DescripcionEstadoPrestacion { get; set; }

		//cambios
		public string ObservacionTX{get;set;}
		public int IdTransaccion{get;set;}
		public string DescripcionEstadoTX{get;set;}
		public string AlmacenDestino{get;set;}
		public string LineaFamilia{get;set;}
		public string Familia{get;set;}

		public DateTime FechaHoraMigracion{get;set;}
		//cambios
		public DateTime FechaHoraCreacion{get;set;}
		public string UsuarioCreacion{get;set;}


		public DateTime FechaHoraModificacion{get;set;}
		public string UsuarioModificacion{get;set;}
		public int ProcesoId { get; set; }
		public bool IndicadorModificado { get; set; }
	}
}
