using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brInterfaseMaestro : brGeneral
	{
		public List<beInterfaseMaestroVista> listar(int anio, string estado)
		{
			List<beInterfaseMaestroVista> lbeInterfaseMaestroVista = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daInterfaseMaestro odaInterfaseMaestro = new daInterfaseMaestro();
					lbeInterfaseMaestroVista = odaInterfaseMaestro.listar(con, anio, estado);
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
			return (lbeInterfaseMaestroVista);
		}

		public int adicionar(string Descripcion, int Periodo, int UsuarioId)
		{
			int rpta = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daInterfaseMaestro odaInterfaseMaestro = new daInterfaseMaestro();
					rpta = odaInterfaseMaestro.adicionar(con, Descripcion, Periodo, UsuarioId);
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

		public int actualizar(string Descripcion, int UsuarioId, int PeriodoId, int InterfaseId)
		{
			int rpta = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daInterfaseMaestro odaInterfaseMaestro = new daInterfaseMaestro();
					rpta = odaInterfaseMaestro.actualizar(con, Descripcion, UsuarioId, PeriodoId, InterfaseId);
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

		public int actualizarEstado(int id, string EstadoRegistro, int UsuarioId)
		{
			int rpta = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daInterfaseMaestro odaInterfaseMaestro = new daInterfaseMaestro();
					rpta = odaInterfaseMaestro.actualizarEstado(con, id, EstadoRegistro, UsuarioId);
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
	}
}

