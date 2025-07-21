using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
    public class brProcesoPlanilla : brGeneral
    {
        public List<beProcesoPlanilla> listar(beProcesoPlanilla obeProcesoPlanilla, string or)
        {
            List<beProcesoPlanilla> lbeProcesoPlanilla = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daProcesoPlanilla odaProcesoPlanilla = new daProcesoPlanilla();
                    lbeProcesoPlanilla = odaProcesoPlanilla.listar(con, obeProcesoPlanilla, or);
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
            return (lbeProcesoPlanilla);
        }

        public beProcesoPlanillaVistaListas listarProvisionPlanilla(string su, int periodo, string oa, int me, int pa, int pro, string ip, string bd)
        {
            beProcesoPlanillaVistaListas obeProcesoPlanillaVistaListas = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daProcesoPlanilla odaProcesoPlanilla = new daProcesoPlanilla();
                    obeProcesoPlanillaVistaListas = odaProcesoPlanilla.listarProvisionPlanilla(con, su, periodo, oa, me, pa, pro, ip, bd);
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
            return (obeProcesoPlanillaVistaListas);
        }

        public string ProvisionPlanillaActualizarEstado(string lista, string estado, int id)
        {
            string resultado = "";
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daProcesoPlanilla odaProcesoPlanilla = new daProcesoPlanilla();
                    resultado = odaProcesoPlanilla.ProvisionPlanillaActualizarEstado(con, lista, estado, id);
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
            return (resultado);
        }

        public int ProvisionPlanillaObligacionRevertir(int id, string lista, string su, int usu, string ip, string bd)
        {
            int resultado = -1;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daProcesoPlanilla odaProcesoPlanilla = new daProcesoPlanilla();
                    resultado = odaProcesoPlanilla.ProvisionPlanillaObligacionRevertir(con, id, lista, su, usu, ip, bd);
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
            return (resultado);
        }
        public int ProvisionPlanillaObligacionRevertirCSFR(int id, string lista, string su, int usu, string ip, string bd)
        {
            int resultado = -1;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daProcesoPlanilla odaProcesoPlanilla = new daProcesoPlanilla();
                    resultado = odaProcesoPlanilla.ProvisionPlanillaObligacionRevertirCSFR(con, id, lista, su, usu, ip, bd);
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
            return (resultado);
        }

        public int ProvisionPlanillaObligacionRevertirPagado(int id, string lista, string su, int usu, string ip, string bd)
        {
            int resultado = -1;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daProcesoPlanilla odaProcesoPlanilla = new daProcesoPlanilla();
                    resultado = odaProcesoPlanilla.ProvisionPlanillaObligacionRevertirPagado(con, id, lista, su, usu, ip, bd);
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
            return (resultado);
        }

        public beDetalleOAListas listarDetalledeConceptosOA(int id)
        {
            beDetalleOAListas obeDetalleOAListas = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daProcesoPlanilla odaProcesoPlanilla = new daProcesoPlanilla();
                    obeDetalleOAListas = odaProcesoPlanilla.listarDetalledeConceptosOA(con, id);
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
            return (obeDetalleOAListas);
        }

        public string CargarPlanillaExcel(string su, string lista, int id, int tipo)
        {
            string rpta = "";
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daProcesoPlanilla odaProcesoPlanilla = new daProcesoPlanilla();
                    rpta = odaProcesoPlanilla.CargarPlanillaExcel(con, su, lista, id, tipo);
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
            return (rpta);
        }

        public string AnularPlanilla(int id, int usuario, string idCompania)
        {
            string exito = "";
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daProcesoPlanilla odaProcesoPlanilla = new daProcesoPlanilla();
                    exito = odaProcesoPlanilla.AnularPlanilla(con, id, usuario, idCompania);
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

        public string AnularProcesoPlanilla(int id, int usuario, string idCompania)
        {
            string exito = "";
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daProcesoPlanilla odaProcesoPlanilla = new daProcesoPlanilla();
                    exito = odaProcesoPlanilla.AnularProcesoPlanilla(con, id, usuario, idCompania);
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

        public string ActualizarDesProcesoPlanilla(string descripcion, int id, int usuario)
        {
            string exito = "";
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daProcesoPlanilla odaProcesoPlanilla = new daProcesoPlanilla();
                    exito = odaProcesoPlanilla.ActualizarDesProcesoPlanilla(con, descripcion, id, usuario);
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
