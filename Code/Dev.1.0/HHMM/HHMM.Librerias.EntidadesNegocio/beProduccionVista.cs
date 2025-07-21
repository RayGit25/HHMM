using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beProduccionVista
	{
	public int PersonaId{get;set;}
	public string Medico{get;set;}
	public string IndicadorVinculada{get;set;}
	public int IdOrdenAtencion{get;set;}
	public int LineaOrdenAtencion{get;set;}
	public int TipoAdmisionId{get;set;}
	public string TipoAdmision{get;set;}
	public int ServicioId{get;set;}
	public string Servicio{get;set;}
	public int EspecialidadId{get;set;}
	public string Especialidad{get;set;}
	public string ClasificadorMovimientoId{get;set;}
	public string ClasificadorMovimiento{get;set;}
	public string CodigoPrestacion{get;set;}
	public string Prestacion{get;set;}

	}
}
