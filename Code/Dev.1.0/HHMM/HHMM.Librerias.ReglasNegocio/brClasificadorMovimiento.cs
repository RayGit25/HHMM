using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
    public class brClasificadorMovimiento: brGeneral
    {
        public List<beCampoCadenaCorto> listar()
        {
            List<beCampoCadenaCorto> lbeClasificadorMovimiento = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daClasificadorMovimiento odaClasificadorMovimiento = new daClasificadorMovimiento();
                    lbeClasificadorMovimiento = odaClasificadorMovimiento.listar(con);
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
            return (lbeClasificadorMovimiento);
        }
    }
}
