using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
    public class brDescuento : brGeneral
    {
        public List<beCampoEntero> listas()
        {
            List<beCampoEntero> obeCampoEntero = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daDescuento odaDescuento = new daDescuento();
                    obeCampoEntero = odaDescuento.listas(con);
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
            return (obeCampoEntero);
        }

        public beDescuentoVista listar(int dex, string des, int tip)
        {
            beDescuentoVista obeDescuentoVista = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daDescuento odaDescuento = new daDescuento();
                    obeDescuentoVista = odaDescuento.listar(con,dex,des,tip);
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
            return (obeDescuentoVista);
        }

        public int adicionar(beDescuento obeDescuento,int usuario)
        {
            int idDescuento = -1;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daDescuento odaDescuento = new daDescuento();
                    idDescuento = odaDescuento.adicionar(con, obeDescuento,usuario);
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
            return (idDescuento);
        }

        public bool actualizar(beDescuento obeDescuento,int usuario)
        {
            bool exito = false;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daDescuento odaDescuento = new daDescuento();
                    exito = odaDescuento.actualizar(con, obeDescuento,usuario);
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
            return (exito);
        }

        public bool actualizarEstado(int DescuentoId, string EstadoRegistro, int UsuarioId)
        {
            bool exito = false;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daDescuento odaDescuento = new daDescuento();
                    exito = odaDescuento.actualizarEstado(con, DescuentoId, EstadoRegistro, UsuarioId);
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
            return (exito);
        }
    }
}
