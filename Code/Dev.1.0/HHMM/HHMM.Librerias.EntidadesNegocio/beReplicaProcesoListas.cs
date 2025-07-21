using System;
using System.Collections.Generic;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beReplicaProcesoListas
	{
		public List<beReplicaProcesoPeriodo> ListaPeriodo { get; set; }
		public List<beCampoEntero> ListaEspecialidad { get; set; }
		public List<beCampoCadenaCorto> ListaSucursal { get; set; }
		public List<beCampoCadenaCorto> ListaMensajes { get; set; }
		public List<beCampoCadenaCorto> ListaMensajes2 { get; set; }
	}
}
