using System;

namespace General.Librerias.CodigoUsuario
{
   public class ucCadena
    {
        public static string fomatoAMD(string texto, string extension = "")
        {
            DateTime fechaActual = DateTime.Now;
            string formato = String.Format("{0}_{1}_{2}_{3}{4}", texto, fechaActual.Year,
                fechaActual.Month.ToString().PadLeft(2, '0'),
                fechaActual.Day.ToString().PadLeft(2, '0'),
                extension);
            return (formato);
        }
    }
}
