using General.Librerias.EntidadesNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beArchivoDigitalListasPdf
	{
		public  beCampoCadena3 CabeceraPdf{get;set;}
		public List<beCampoEntero> ListaTipoAtencion{get;set;}
		public List<beCampoEntero> ListaServicio { get; set; }
		public List<beCampoCadenaCorto>ListaComponente{get;set;}
	}
}
