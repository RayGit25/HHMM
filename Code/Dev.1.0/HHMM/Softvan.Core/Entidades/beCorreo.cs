
namespace Softvan.Core.Entidades
{
    public class beCorreo
    {
        public string De { get; set; }
        public string Clave { get; set; }
        public string AliasNombre { get; set; }
        public string AliasCuenta { get; set; }
        public string[] Para { get; set; }
        public string[] CC { get; set; }
        public string[] CCO { get; set; }
        public string Asunto { get; set; }
        public string Contenido { get; set; }
        public string[] Archivo { get; set; }
        public string Servidor { get; set; }
        public string Puerto { get; set; }
        public bool? EsHTML { get; set; }
        public bool? EsSSL { get; set; }
    }
}
