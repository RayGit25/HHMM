using General.Librerias.EntidadesNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beOrdenAtencionListas
	{
		public List<beCampoEntero>ListaTipoAtencion{get;set;}
		public List<beCampoEntero> ListaServicio { get; set; }
		public List<beCampoEntero> ListaEspecialidad { get; set; }
		public List<beCampoEntero> ListaEstado1 { get; set; }
		public List<beCampoEntero> ListaEstado2 { get; set; }
		public List<beCampoCadenaCorto> ListaMensajes { get; set; }
	}
}
