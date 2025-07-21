
using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beBandejaCorreo
    {
        public int BandejaCorreoId { get; set; }
        public string Remitente { get; set; }
        public string Destinatarios { get; set; }
        public int PersonaId { get; set; }
        public string NombreCompleto { get; set; }
        public int TipoAdmisionId { get; set; }
        public string  TipoAdmision { get; set; }
        public int AnioPeriodo { get; set; }
        public int MesPeriodo { get; set; }
        public string Periodo { get; set; }
        public int PlanillaId { get; set; }
        public string CuerpoCorreo { get; set; }
        public string SucursalId { get; set; }
        public DateTime FechaHoraCreacion { get; set; }
        public int UsuarioCreadorId { get; set; }
        public int OrdenAtencionId { get; set; }
        public int ExpedienteId { get; set; }


    }
}
