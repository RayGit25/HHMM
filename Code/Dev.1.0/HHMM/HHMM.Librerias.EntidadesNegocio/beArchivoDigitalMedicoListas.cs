using General.Librerias.EntidadesNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beArchivoDigitalMedicoListas
	{
		public beArchivoDigitalMedicoCabeceraPrincipalPdf ArchivoDigitalMedicoCabeceraPrincipal { get; set; }
		public beArchivoDigitalMedicoCabeceraPdf ArchivoDigitalMedicoCabeceraPdf{get;set;}
		public beArchivoDigitalMedicoFacturacion MedicoEmpresaFacturar { get; set; }
		public List<beReporteLiquidacionVista4> ListaMedicos { get; set; }
		public List<beProcesoOrdenAtencionPdf>ListaProcesoOrden{get;set;}
		public List<beCampoEntero> ListaTipoAtencion { get; set; }
		public List<beCampoEntero> ListaServicio { get; set; }
		public List<beCampoCadenaCorto> ListaPrestacion { get; set; }
		public List<beProcesoMedicoHorarioPdf2>listaProcesoMedico{get;set;}
		public List<beCampoCadenaCorto> ListaArticulo { get; set; }
		public List<beProcesoMedicoHorarioPdf3> listaProcesoMedico2 { get; set; }
		public List<bePlanillaMedicoDescuento> ListaPlanillaMedicoDescuentos { get; set; }

	}
}
