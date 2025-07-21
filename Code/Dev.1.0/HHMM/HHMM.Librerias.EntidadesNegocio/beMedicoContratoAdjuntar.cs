using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beMedicoContratoAdjuntar
    {
        public int MedicoContratoAdjuntoId { get; set; }
        public int MedicoContratoId { get; set; }
        public string NombreArchivo { get; set; }
        public string NombreRepositorio { get; set; }
        public int UsuarioCreadorId { get; set; }
    }
}
