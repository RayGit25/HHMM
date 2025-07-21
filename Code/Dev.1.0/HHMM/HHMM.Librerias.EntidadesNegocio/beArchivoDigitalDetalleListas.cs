using General.Librerias.EntidadesNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beArchivoDigitalDetalleListas
	{
		public List<beCampoEntero> ListaPeriodo { get; set; }
		public List<beArchivoDigitalMedico>ListaMedico{get;set;}
		public List<beCampoCadenaCorto> ListaDescripcionCorreo { get; set; }
	}
}
