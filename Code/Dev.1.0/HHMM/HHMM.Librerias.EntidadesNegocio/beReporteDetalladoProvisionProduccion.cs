using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beReporteDetalladoProvisionProduccion
    {
        public string Periodo { get; set; }
        public string SucursalId { get; set; }
        public string Sucursal { get; set; }
        public int MedicoEmpresaId { get; set; }
        public string Empresa { get; set; }
        public int IdMedico { get; set; }
        public string Medico { get; set; }
        public string TipoAdmision { get; set; }
        public string CodigoOA { get; set; }
        public int IdOrdenAtencion { get; set; }
        public int LineaOrdenAtencion { get; set; }
        public int IdExpediente { get; set; }
        public string CodigoPrestacion { get; set; }
        public string Prestacion { get; set; }
        public string PeriodoProduccion { get; set; }
        public string TipoRegistro { get; set; }

        public bool IndicadorIncluidoPlanilla { get; set; }
        //public bool IndicadorIncluidoPlanilla { get; set; }

        public DateTime FechaAtencionPrestacion { get; set; }
        public DateTime FechaAtendido { get; set; }
        public DateTime FechaTerminado { get; set; }
        public decimal PrecioUnitarioPrestacion { get; set; }
        public decimal CostoPrestacion { get; set; }
        public decimal Cantidad { get; set; }
        public decimal MontoImponiblePrestacion { get; set; }
        public decimal ValorMedida { get; set; }
        public string TipoValor { get; set; }
        public decimal Valor { get; set; }
        public decimal Porcentaje { get; set; }
        public decimal ParteMedico { get; set; }
        public decimal Bonificacion { get; set; }
        public DateTime FechaInicioOA { get; set; }
        public string TipoPaciente { get; set; }
        public string TipoAtencion { get; set; }
        public string Aseguradora { get; set; }
        public string Servicio { get; set; }
        public string ModFacturacion { get; set; }
        public string Especialidad { get; set; }
        public string DescripcionEstadoPrestacion { get; set; }
        public string EstadoRegistro { get; set; }
        public decimal Ajuste { get; set; }
        public decimal TotalProvision { get; set; }
        public string Paciente { get; set; }
        public int AjusteProcesoId { get; set; }
        //public string AjusteTipoRegistro { get; set; }
        public int IdPlanilla { get; set; }
        public int IdEstadoPlanilla { get; set; }
        public string IndicadorHonorario { get; set; }

        public string EstadoHospitalizacion { get; set; }
        public string SituacionDetalleHospitalizacion { get; set; }
        public string IndicadorEliminado { get; set; }
        public string SituacionDetalleExpediente { get; set; }

        public string EstadoPlanillaSPRING { get; set; }
        public DateTime FechaHoraCreacion { get; set; }
        public string EstadoProvision { get; set; }
        public string CuentaCosto { get; set; }
        public string CuentaProvedor { get; set; }
        public string IdDocContable { get; set; }

        public int PlanillaId { get; set; }
        public string EstadoPlanilla { get; set; }
        public string TipoDocumentoPagoId { get; set; }
        public string NumeroDocumento { get; set; }
        public DateTime FechaEmision { get; set; }
        public string IndicadorNoVisiblePlanilla { get; set; }

        

        public string IndicadorExcluido { get; set; }
    }
}

