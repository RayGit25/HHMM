using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReporteDetalladoProvisionHorario
	{
		public string SucursalId { get; set; }
		public string Sucursal { get; set; }
		public string Periodo { get; set; }
		public int MedicoEmpresaId { get; set; }
		public string Empresa { get; set; }
		public int IdMedico { get; set; }
		public string Medico { get; set; }
		public string Fecha { get; set; }
		public string HoraInicio { get; set; }
		public string HoraFin { get; set; }
		public decimal HorasProgramadas { get; set; }
		public string Dia { get; set; }
		public Boolean IndicadorFeriado { get; set; }
		public decimal ValorContrato { get; set; }
		public decimal ParteMedico { get; set; }
		public decimal Bonificacion { get; set; }
		public decimal Total { get; set; }
		public string Especialidad { get; set; }
		public string TipoAtencion { get; set; }
		public string EstadoRegistro { get; set; }
		public int UnidadMedicaId { get; set; }
		public string UnidadMedica { get; set; }
		public string CuentaCosto { get; set; }
		public string CuentaProveedor { get; set; }

		public string IdDocContable { get; set; }
		public int PlanillaId { get; set; }
		public string EstadoPlanilla { get; set; }
		public string TipoDocumentoPagoId { get; set; }
		public string NumeroDocumento { get; set; }
		public DateTime FechaEmision { get; set; }
	}
	}

