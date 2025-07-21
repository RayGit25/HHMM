using System;
using System.Collections.Generic;
namespace HHMM.Librerias.EntidadesNegocio
{
    public class beMenuPerfilListas
    {
        public List<bePerfil> ListaPerfil { get; set; }
        public List<beMenu> ListaMenu { get; set; }
        public List<beMenuPerfil> ListaMenuPerfil { get; set; }
		public List<beMenuAccion> ListaMenuPrivilegio { get; set; }
		public List<beMenuAccionPerfilVista> ListaMenuAccionPerfil { get; set; }
    }
}
