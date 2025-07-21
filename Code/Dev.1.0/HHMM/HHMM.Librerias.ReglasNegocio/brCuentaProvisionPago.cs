using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
    public class brCuentaProvisionPago : brGeneral
    {
        public beCuentaProvisionPagoVistaLista listarVista(string sup, int se, int tad, string tap, string cu, string Pa, string Pe)
        {
            beCuentaProvisionPagoVistaLista obeCuentaProvisionPagoVistaLista = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daCuentaProvisionPago odaCuentaProvisionPago = new daCuentaProvisionPago();
                    obeCuentaProvisionPagoVistaLista = odaCuentaProvisionPago.listarVista(con, sup, se, tad, tap,cu,Pa, Pe);
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
            return (obeCuentaProvisionPagoVistaLista);
        }
        public beCuentaProvisionPagoListas listarListas()
        {
            beCuentaProvisionPagoListas obeCuentaProvisionPagoListas = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daCuentaProvisionPago odaCuentaProvisionPago = new daCuentaProvisionPago();
                    obeCuentaProvisionPagoListas = odaCuentaProvisionPago.listarListas(con);
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
            return (obeCuentaProvisionPagoListas);
        }

        public int adicionar(beCuentaProvisionPago obeCuentaProvisionPago, int usuario)
        {
            int idCuentaProvisionPago = -1;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daCuentaProvisionPago odaCuentaProvisionPago = new daCuentaProvisionPago();
                    idCuentaProvisionPago = odaCuentaProvisionPago.adicionar(con, obeCuentaProvisionPago, usuario);
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
            return (idCuentaProvisionPago);
        }

        public bool actualizar(beCuentaProvisionPago obeCuentaProvisionPago, int usuario)
        {
            bool exito = false;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daCuentaProvisionPago odaCuentaProvisionPago = new daCuentaProvisionPago();
                    exito = odaCuentaProvisionPago.actualizar(con, obeCuentaProvisionPago, usuario);
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

        public bool actualizarEstado(string CuentaProvisionPagoId, string EstadoRegistro, int UsuarioId)
        {
            bool exito = false;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daCuentaProvisionPago odaCuentaProvisionPago = new daCuentaProvisionPago();
                    exito = odaCuentaProvisionPago.actualizarEstado(con, CuentaProvisionPagoId, EstadoRegistro, UsuarioId);
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
