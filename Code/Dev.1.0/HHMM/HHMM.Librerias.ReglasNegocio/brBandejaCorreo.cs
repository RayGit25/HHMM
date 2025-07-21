using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
    public class brBandejaCorreo : brGeneral
    {
        beBandejaCorreoListar obeBandejaCorreoListar = null;
        List<beBandejaCorreo> lbeBandejaCorreo = null;
        List<beTipoAdmision> lbeTipoAdmision = null;

        public List<beBandejaCorreo> listar(beBandejaCorreo obeBandejaCorreo)
        {
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daBandejaCorreo odaBandejaCorreo = new daBandejaCorreo();
                    lbeBandejaCorreo = odaBandejaCorreo.listar(con, obeBandejaCorreo);
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
            return (lbeBandejaCorreo);
        }


        public beBandejaCorreoListar listarPorId(beBandejaCorreo obeBandejaCorreo)
        {
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daBandejaCorreo odaBandejaCorreo = new daBandejaCorreo();
                    obeBandejaCorreoListar = odaBandejaCorreo.listarPorId(con, obeBandejaCorreo);
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
            return (obeBandejaCorreoListar);
        }

        public List<beTipoAdmision> listar()
        {
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daBandejaCorreo odaBandejaCorreo = new daBandejaCorreo();
                    lbeTipoAdmision = odaBandejaCorreo.listar(con);
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
            return (lbeTipoAdmision);
        }



    }
}
