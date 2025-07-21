using System.Collections.Generic;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beArchivoDigitalMedicoCSFRListas
    {
		public beArchivoDigitalMedicoCabeceraPrincipalPdf ArchivoDigitalMedicoCabeceraPrincipal { get; set; }
		public beArchivoDigitalMedicoCabeceraPdf ArchivoDigitalMedicoCabeceraPdf { get; set; }
		public beArchivoDigitalMedicoFacturacion MedicoEmpresaFacturar { get; set; }
		public List<beReporteLiquidacionVista4> ListaMedicos { get; set; }
		public List<beProcesoOrdenAtencionCSFRPdf> ListaProcesoOrden { get; set; }
		public List<beCampoEntero> ListaTipoAtencion { get; set; }
		public List<beCampoEntero> ListaServicio { get; set; }
		public List<beCampoCadenaCorto> ListaPrestacion { get; set; }
		public List<beProcesoMedicoHorarioPdf2> listaProcesoMedico { get; set; }
		public List<beCampoCadenaCorto> ListaArticulo { get; set; }
		public List<beProcesoMedicoHorarioPdf3> listaProcesoMedico2 { get; set; }
		public List<bePlanillaMedicoDescuento> ListaPlanillaMedicoDescuentos { get; set; }
		public List<beCampoCadena3> ListaResumenAtenciones { get; set; }
		public List<beCampoCadenaCorto> ListaResumenEmpresa { get; set; }
		public List<bePlanillaMedicoConsolidado> listaPlanillaMedicoConsolidado { get; set; }
		public List<bePlanillaMedicoConsolidadoResumen> listaPlanillaMedicoConsolidadoResumen { get; set; }
		public List<bePlanillaMedicoConsolidadoResumenTipo> listaPlanillaMedicoConsolidadoResumenTipo { get; set; }
		public List<bePlanillaMedicoConsolidadoResumenTipo> listaPlanillaMedicoConsolidadoResumenTipoResumen { get; set; }
		public List<beCampoCadenaCorto> ListaResumenServicios { get; set; }
		public List<beCampoCadenaCorto> ListaResumenEquipos { get; set; }
		public List<beCampoCadenaCorto> ListaResumenClinica { get; set; }
		public List<beCampoCadenaCorto> ListaResumenMedico { get; set; }
		public List<beCampoCadenaCorto> ListaResumenDetraccion { get; set; }
	}
}
