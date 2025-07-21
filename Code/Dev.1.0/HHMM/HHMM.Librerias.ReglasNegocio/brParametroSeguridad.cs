using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
   public class brParametroSeguridad:brGeneral
    {
       public beParametroSeguridadReglas obtenerReglas()
       {
           beParametroSeguridadReglas obeParametroSeguridad = null;
           using (SqlConnection con = new SqlConnection(Conexion))
           {
               try
               {
                   con.Open();
                   daParametroSeguridad odaParametroSeguridad = new daParametroSeguridad();
                   obeParametroSeguridad = odaParametroSeguridad.obtenerReglas(con);
               }
               catch (SqlException ex)
               {
                   foreach (SqlError err in ex.Errors)
                   {
                       ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
                   }
               }
               catch (Exception ex)
               {
                   ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
               }
           }
           return (obeParametroSeguridad);
       }
    }
}
