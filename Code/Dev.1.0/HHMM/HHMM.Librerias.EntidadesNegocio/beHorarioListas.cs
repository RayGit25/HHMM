using System;
using System.Collections.Generic;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beHorarioListas
    {
        public List<beCampoCadena> ListaConsultorio { get; set; }
       public List<beCampoEntero> ListaTipoAtencion { get; set; }
       public List<beCampoEntero> ListaEspecialidad { get; set; }
	   public List<beCampoCadena> ListaTurno { get; set; }
	   public List<beCampoCadenaCorto> ListaSucursal { get; set; }
	   public List<beHorarioMedicoVista> ListaMedico { get; set; }
	   public List<beCampoEntero> ListaUnidadMedica { get; set; }
	   public List<beCampoEntero> ListaMedicoEmpresaSucursal { get; set; }
    }
}
