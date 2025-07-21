using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;


namespace HHMM.Librerias.ReglasNegocio
{
   public  class brProceso : brGeneral
    {
        List<beProceso> lbeProceso = null;
        beProcesoListar obeProcesoListar = null;

        public List<beProceso> listar(beProceso obeProceso,string or)
        {
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daProceso odaProceso = new daProceso();
                    lbeProceso = odaProceso.listar(con, obeProceso,or);
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
            return (lbeProceso);
        }

        public beProcesoListar listarProcesoListas(beProceso obeProceso)
        {
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daProceso odaProceso = new daProceso();
                    obeProcesoListar = odaProceso.listarProcesoListas(con, obeProceso);
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
            return (obeProcesoListar);
        }

		public int Adicionar(beProceso obeProceso, bool indicador1, bool indicador2, bool indicador3, bool indicador4, bool indicador5, bool indicador6, bool indicador7, bool indicador8, bool indicador9, DateTime indicador10, DateTime indicador11, bool indicador12)
        {
            int resultado = 0;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daProceso odaProceso = new daProceso();
					resultado = odaProceso.Adicionar(con, obeProceso, indicador1, indicador2, indicador3, indicador4, indicador5, indicador6, indicador7, indicador8, indicador9, indicador10, indicador11,indicador12);
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
            return resultado;
        }

		public int Actualizar(beProceso obeProceso, bool indicador1, bool indicador2, bool indicador3, bool indicador4, bool indicador5, bool indicador6, bool indicador7, bool indicador8, bool indicador9, DateTime indicador10, DateTime indicador11, bool indicador12)
        {
            int resultado = 0;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daProceso odaProceso = new daProceso();
					resultado = odaProceso.Actualizar(con, obeProceso, indicador1, indicador2, indicador3, indicador4, indicador5, indicador6, indicador7, indicador8, indicador9, indicador10, indicador11, indicador12);
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
            return resultado;
        }

        public int ActualizarEstado(beProceso obeProceso)
        {
            int resultado = 0;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daProceso odaProceso = new daProceso();
                    resultado = odaProceso.ActualizarEstado(con, obeProceso);
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
            return resultado;
        }

		public int SeleccionMedicoProvisionActualizacion(int id, string lista, int usuario, int configuracionpago)
		{
			int resultado = 0;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProceso odaProceso = new daProceso();
					resultado = odaProceso.SeleccionMedicoProvisionActualizacion(con, id, lista, usuario, configuracionpago);
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
			return resultado;
		}
    }
}
