namespace HHMM.Librerias.EntidadesNegocio
{
   public class beMenu
    {
        public int MenuId { get; set; }
        public string NombreMenu { get; set; }
        public string URLPagina { get; set; }
        public int MenuPadreId { get; set; }
        public bool IndicadorBarraTareas { get; set; }
        public string EstadoRegistro { get; set; }
    }
}
