using System;
using System.Reflection;
using System.Text;
using System.IO;

namespace Softvan.Core
{
    public class ArchivoTexto<T>
    {
        public static void GenerarArchivo(T obj, string rutaArchivo = null, string nombreArchivo = "")
        {
            if (ReferenceEquals(rutaArchivo, null))
            {
                rutaArchivo = $"{AppSettings.Get("_RutaLog")}{FormatoTexto.AnioMesDia(AppSettings.Get("_NombreLog"), ".txt")}";
            }
            PropertyInfo[] properties = obj.GetType().GetProperties();
            using (FileStream stream = new FileStream(rutaArchivo + nombreArchivo, FileMode.Append, FileAccess.Write, FileShare.Write))
            {
                using (StreamWriter writer = new StreamWriter(stream, Encoding.Default))
                {
                    writer.WriteLine("Fecha y Hora = " + DateTime.Now);
                    PropertyInfo[] infoArray2 = properties;
                    int index = 0;
                    while (true)
                    {
                        if (index >= infoArray2.Length)
                        {
                            writer.WriteLine(new string('_', 50));
                            break;
                        }
                        PropertyInfo info = infoArray2[index];
                        writer.Write(info.Name);
                        writer.Write(" = ");
                        writer.WriteLine((info.GetValue(obj, null) == null) ? "" : info.GetValue(obj, null).ToString());
                        index++;
                    }
                }
            }
        }

        public static void GenerarArchivoTexto(string contenido, string rutaArchivo = null, string nombreArchivo = "")
        {
            if (ReferenceEquals(rutaArchivo, null))
            {
                rutaArchivo = $"{AppSettings.Get("_RutaLog")}{FormatoTexto.AnioMesDia(AppSettings.Get("_NombreLog"), ".txt")}";
            }
            using (FileStream stream = new FileStream(rutaArchivo + nombreArchivo, FileMode.Append, FileAccess.Write, FileShare.Write))
            {
                using (StreamWriter writer = new StreamWriter(stream, Encoding.Default))
                {
                    writer.WriteLine(contenido);
                    writer.WriteLine(new string('_', 50));
                }
            }
        }
    }
}
