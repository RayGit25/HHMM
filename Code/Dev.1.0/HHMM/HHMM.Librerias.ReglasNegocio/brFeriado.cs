using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
    public class brFeriado : brGeneral
    {
        public beFeriadoVistaLista listar(string sucursal)
        {
            beFeriadoVistaLista obeFeriadoVistaLista = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daFeriado odaFeriado = new daFeriado();
                    obeFeriadoVistaLista = odaFeriado.listar(con, sucursal);
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
            return (obeFeriadoVistaLista);
        }

        public int adicionar(beFeriado obeFeriado)
        {
            int idFeriado = -1;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daFeriado odaFeriado = new daFeriado();
                    idFeriado = odaFeriado.adicionar(con, obeFeriado);
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
            return (idFeriado);
        }

        public bool actualizar(beFeriado obeFeriado)
        {
            bool exito = false;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daFeriado odaFeriado = new daFeriado();
                    exito = odaFeriado.actualizar(con, obeFeriado);
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

        public bool actualizarEstado(int FeriadoId, string EstadoRegistro, int UsuarioId)
        {
            bool exito = false;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daFeriado odaFeriado = new daFeriado();
                    exito = odaFeriado.actualizarEstado(con, FeriadoId,EstadoRegistro,UsuarioId);
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

        public bool copiarFeriado(int AnioInicio, int AnioFin, int UsuarioId,string sucursal)
        {
            bool exito = false;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daFeriado odaFeriado = new daFeriado();
					exito = odaFeriado.copiarFeriado(con, AnioInicio, AnioFin, UsuarioId, sucursal);
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
