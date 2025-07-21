using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beArchivoDigitalMedicoCabeceraPdf
	{
		public string Descripcion{get;set;}
		public string TipoAdmisionId{get;set;}
		public string Anio{get;set;}
		public string Mes {get;set;}
		public string TipoAdmision{get;set;}
		public DateTime FechaInicio { get; set; }
		public DateTime FechaFin { get; set; }
	}
}
