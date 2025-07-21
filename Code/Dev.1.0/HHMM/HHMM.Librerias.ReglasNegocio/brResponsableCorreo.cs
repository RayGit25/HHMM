using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brResponsableCorreo:brGeneral
	{
        beResponsableCorreo obeResponsableCorreo = null;
        beResponsableCorreoListar obeResponsableCorreoListar = null;

        public beResponsableCorreoListar listar(string idSucursal)
        {
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daResponsableCorreo odaResponsableCorreo = new daResponsableCorreo();
                    obeResponsableCorreoListar = odaResponsableCorreo.listar(con, idSucursal);
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
            return (obeResponsableCorreoListar);
        }

        public beResponsableCorreo listarPorId(string idResponsable)
        {
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daResponsableCorreo odaResponsableCorreo = new daResponsableCorreo();
                    obeResponsableCorreo = odaResponsableCorreo.listarPorId(con, idResponsable);
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
            return (obeResponsableCorreo);
        }


        public beResponsableCorreoListar Adicionar(beResponsableCorreo obeResponsableCorreo)
        {
            beResponsableCorreoListar obeResponsableCorreoListar = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daResponsableCorreo odaResponsableCorreo = new daResponsableCorreo();
                    obeResponsableCorreoListar = odaResponsableCorreo.Adicionar(con, obeResponsableCorreo);
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
            return obeResponsableCorreoListar;
        }

        public beResponsableCorreoListar Actualizar(beResponsableCorreo obeResponsableCorreo)
        {
            beResponsableCorreoListar obeResponsableCorreoListar = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daResponsableCorreo odaResponsableCorreo = new daResponsableCorreo();
                    obeResponsableCorreoListar = odaResponsableCorreo.Actualizar(con, obeResponsableCorreo);
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
            return obeResponsableCorreoListar;
        }

        public beResponsableCorreoListar ActualizarEstado(beResponsableCorreo obeResponsableCorreo)
        {
            beResponsableCorreoListar obeResponsableCorreoListar = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daResponsableCorreo odaResponsableCorreo = new daResponsableCorreo();
                    obeResponsableCorreoListar = odaResponsableCorreo.ActualizarEstado(con, obeResponsableCorreo);
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
            return obeResponsableCorreoListar;
        }
	}
}
