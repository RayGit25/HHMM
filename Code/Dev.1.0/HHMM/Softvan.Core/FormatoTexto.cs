using System;

namespace Softvan.Core
{
    public class FormatoTexto
    {
        public static string AnioMesDia(string texto, string extension = "")
        {
            DateTime now = DateTime.Now;
            return $"{texto}_{now.Year}_{now.Month.ToString().PadLeft(2, '0')}_{now.Day.ToString().PadLeft(2, '0')}{extension}";
        }
    }
}
