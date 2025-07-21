using System.Collections.Generic;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beUsuarioListar
    {
        public List<beUsuarioCompaniaSucursal> lbeUsuarioCompaniaSucursal { get; set; }
        public List<beCompaniaSucursal> lbeCompaniaSucursal { get; set; }
        public List<bePerfilNombre> lbePerfilNombre { get; set; }
        public List<beCompania> lbeCompania { get; set; }
        public List<beSucursalCompania> lbeSucursalCompania { get; set; }
		public List<beTipoDocumento> lbeTipoDocumento { get; set; }

    }
}
