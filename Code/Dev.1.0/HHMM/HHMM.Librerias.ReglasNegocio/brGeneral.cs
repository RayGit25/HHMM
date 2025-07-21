using General.Librerias.CodigoUsuario;
using System;
using System.Configuration;
using System.Web;

namespace HHMM.Librerias.ReglasNegocio
{
  public  class brGeneral
    {
        public string Conexion { get; set; }
        public string Archivo { get; set; }
        private string rutaLog;

        public brGeneral()
        {

             HttpContext httpContext = HttpContext.Current;
            string bd = "";
            if (httpContext.ApplicationInstance.Session.Count > 0) {
                bd = httpContext.Session["BDUtilizar"]!=null? httpContext.Session["BDUtilizar"].ToString():"";
            }

            string con = "_ConexionBD_" + bd;
            Conexion = ConfigurationManager.ConnectionStrings[con].ConnectionString;

            //if (String.IsNullOrEmpty(bd))
            //{
            //    Conexion = ConfigurationManager.ConnectionStrings["conHTE"].ConnectionString;
            //    ConexionCSB = ConfigurationManager.ConnectionStrings["_conexionHHMMCSB"].ConnectionString;
            //}
            //else {
            //    Conexion = ConfigurationManager.ConnectionStrings[bd].ConnectionString;
            //    ConexionCSB = ConfigurationManager.ConnectionStrings[bd].ConnectionString;
            //}

            rutaLog = ConfigurationManager.AppSettings["rutaLog"];
            Archivo = String.Format("{0}{1}", rutaLog, ucCadena.fomatoAMD("LogError", ".txt"));
        }
    }
}
