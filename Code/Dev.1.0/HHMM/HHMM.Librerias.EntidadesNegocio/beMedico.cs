using System;

namespace HHMM.Librerias.EntidadesNegocio
{
   public class beMedico
    {
       public int PersonaId { get; set; }
       public string ApellidoPaterno { get; set; }
       public string ApellidoMaterno { get; set; }
       public string Nombre { get; set; }
       public string CMP { get; set; }
	   public string TipoPersona{get;set;}
	   public string NumeroDocumento{get;set;}
	   public string DocumentoFiscal{get;set;}
       public string Estado { get; set; }
    }
}
