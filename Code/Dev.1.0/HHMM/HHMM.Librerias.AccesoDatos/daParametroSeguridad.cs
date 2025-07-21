using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
   public class daParametroSeguridad
    {
       public beParametroSeguridadReglas obtenerReglas(SqlConnection con)
       {
           beParametroSeguridadReglas obeParametroSeguridad = null;
           SqlCommand cmd = new SqlCommand("uspParametroSeguridadObtenerReglas", con);
           cmd.CommandType = CommandType.StoredProcedure;

           SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleRow);
           if (drd != null)
           {
               int posLongitudMinimaContrasena = drd.GetOrdinal("LongitudMinimaContrasena");
               int posLongitudMaximaContrasena = drd.GetOrdinal("LongitudMaximaContrasena");
               int posIndicadorMinusculas = drd.GetOrdinal("IndicadorMinusculas");
               int posIndicadorNumeros = drd.GetOrdinal("IndicadorNumeros");
               int posIndicadorMayusculas = drd.GetOrdinal("IndicadorMayusculas");
               int posIndicadorCaracteresEspeciales = drd.GetOrdinal("IndicadorCaracteresEspeciales");
               drd.Read();
               obeParametroSeguridad = new beParametroSeguridadReglas();
               obeParametroSeguridad.LongitudMinimaContrasena = drd.GetInt16(posLongitudMinimaContrasena);
               obeParametroSeguridad.LongitudMaximaContrasena = drd.GetInt16(posLongitudMaximaContrasena);
               obeParametroSeguridad.IndicadorMinusculas = drd.GetBoolean(posIndicadorMinusculas);
               obeParametroSeguridad.IndicadorNumeros = drd.GetBoolean(posIndicadorNumeros);
               obeParametroSeguridad.IndicadorMayusculas = drd.GetBoolean(posIndicadorMayusculas);
               obeParametroSeguridad.IndicadorCaracteresEspeciales = drd.GetBoolean(posIndicadorCaracteresEspeciales);
               drd.Close();
           }
           return (obeParametroSeguridad);
       }
    }
}
