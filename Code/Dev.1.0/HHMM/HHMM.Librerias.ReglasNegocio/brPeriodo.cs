using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brPeriodo:brGeneral
	{
		List<bePeriodo> lbePeriodo = null;

		public List<bePeriodo> listar(string idSucursal, int anio)
		{
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPeriodo odaPeriodo = new daPeriodo();
					lbePeriodo = odaPeriodo.listar(con, idSucursal, anio);
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
			return (lbePeriodo);
		}

		public bePeriodoListar Adicionar(bePeriodo obePeriodo)
		{
			bePeriodoListar obePeriodoListar = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPeriodo odaPeriodo = new daPeriodo();
					obePeriodoListar = odaPeriodo.Adicionar(con, obePeriodo);
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
			return obePeriodoListar;
		}

		public bePeriodoListar Actualizar(bePeriodo obePeriodo)
		{
			bePeriodoListar obePeriodoListar = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPeriodo odaPeriodo = new daPeriodo();
					obePeriodoListar = odaPeriodo.Actualizar(con, obePeriodo);
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
			return obePeriodoListar;
		}

		public bePeriodoListar ActualizarEstado(bePeriodo obePeriodo)
		{
			bePeriodoListar obePeriodoListar = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPeriodo odaPeriodo = new daPeriodo();
					obePeriodoListar = odaPeriodo.ActualizarEstado(con, obePeriodo);
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
			return obePeriodoListar;
		}
		public bePeriodoListar ActualizarEstadocierre(bePeriodo obePeriodoParametro)
		{
			bePeriodoListar obePeriodoListar = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPeriodo odaPeriodo = new daPeriodo();
					obePeriodoListar = odaPeriodo.ActualizarEstadocierre(con, obePeriodoParametro);
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
			return obePeriodoListar;
		}

	}
}
