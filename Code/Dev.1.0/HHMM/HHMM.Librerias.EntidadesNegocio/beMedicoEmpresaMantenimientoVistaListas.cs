using System;
using System.Collections.Generic;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beMedicoEmpresaMantenimientoVistaListas
	{
		public List<beMedicoEmpresaMantenimientoVista> ListaMedicos { get; set; }
		public List<beCampoCadenaCorto> ListaTipoServicioImpuesto { get; set; }
		public List<beCampoCadenaCorto> ListaTipoMedico { get; set; }
		public List<beCampoCadenaCorto> ListaSucursal { get; set; }
		public List<beCampoCadenaCorto> ListaMedicoSucursal { get; set; }
		public List<beCampoCadenaCorto> ListaMensajes { get; set; }
	}

}
