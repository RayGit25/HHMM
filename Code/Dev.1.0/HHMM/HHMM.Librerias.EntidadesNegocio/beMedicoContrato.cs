using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beMedicoContrato
    {
        public string SucursalId { get; set; }
        public int MedicoContratoId { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string IndicadorVencimiento { get; set; }
        public int PersonaId { get; set; }
        public string NombreCompleto { get; set; }
        public string Observacion { get; set; }
        public string EstadoRegistro { get; set; }
    }
}
