using System;

namespace HHMM.Librerias.EntidadesNegocio
{
    public class beParametroSeguridadReglas
    {
        public short LongitudMinimaContrasena { get; set; }
        public short LongitudMaximaContrasena { get; set; }
        public bool IndicadorMinusculas { get; set; }
        public bool IndicadorNumeros { get; set; }
        public bool IndicadorMayusculas { get; set; }
        public bool IndicadorCaracteresEspeciales { get; set; }
    }
}
