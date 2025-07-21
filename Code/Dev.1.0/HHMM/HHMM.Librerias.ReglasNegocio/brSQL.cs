using System;
using System.Data;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;

namespace HHMM.Librerias.ReglasNegocio
{
    public class brSQL : brGeneral
    {
        public string EjecutarComando(string nombreProcedimiento,
            string nombreParametro = null, string valorParametro = null)
        {
            String response = "";
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daSQL odaPlanilla = new daSQL();
                    response = odaPlanilla.EjecutarComando(con, nombreProcedimiento, nombreParametro, valorParametro);
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
            return response;
        }
        public DataSet EjecutarComandoDst(string NombreSP, string parametroNombre = "", string parametroValor = "")
        {
            var result = new DataSet();
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daSQL odaSQL = new daSQL();
                    result = odaSQL.EjecutarComandoDst(con, NombreSP, parametroNombre, parametroValor);
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
            return result;
        }
    }
}
