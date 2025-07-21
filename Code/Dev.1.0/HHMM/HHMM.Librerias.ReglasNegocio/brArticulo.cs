using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
    public class brArticulo : brGeneral
    {
        public List<beCampoCadenaCorto> listar()
        {
            List<beCampoCadenaCorto> lbeArticulo = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daArticulo odaArticulo = new daArticulo();
                    lbeArticulo = odaArticulo.listar(con);
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
            return (lbeArticulo);
        }
    }
}
