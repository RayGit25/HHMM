using System;
using System.Collections.Generic;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beResponsableCorreoListar
	{
		public string Rpta { get; set; }
		public List<beResponsableCorreo> ListaResponsableCorreo { get; set; }
		public List<beUsuario> ListaUsuario { get; set; }
		public List<beVariableCorreo> ListaVariableCorreo { get; set; }
	}
}
