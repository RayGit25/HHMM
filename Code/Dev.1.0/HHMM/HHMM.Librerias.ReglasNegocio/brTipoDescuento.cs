using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
    public class brTipoDescuento : brGeneral
    {
        public beTipoDescuentoLista listar()
        {
            beTipoDescuentoLista obeTipoDescuentoLista = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daTipoDescuento odaTipoDescuento = new daTipoDescuento();
                    obeTipoDescuentoLista = odaTipoDescuento.listar(con);
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
            return (obeTipoDescuentoLista);
        }

        public int adicionar(beTipoDescuento obeTipoDescuento)
        {
            int idTipoDescuento = -1;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daTipoDescuento odaTipoDescuento = new daTipoDescuento();
                    idTipoDescuento = odaTipoDescuento.adicionar(con, obeTipoDescuento);
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
            return (idTipoDescuento);
        }

        public bool actualizar(beTipoDescuento obeTipoDescuento)
        {
            bool exito = false;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daTipoDescuento odaTipoDescuento = new daTipoDescuento();
                    exito = odaTipoDescuento.actualizar(con, obeTipoDescuento);
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

        public bool actualizarEstado(int TipoDescuentoId, string EstadoRegistro, int UsuarioId)
        {
            bool exito = false;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daTipoDescuento odaTipoDescuento = new daTipoDescuento();
                    exito = odaTipoDescuento.actualizarEstado(con, TipoDescuentoId, EstadoRegistro, UsuarioId);
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
