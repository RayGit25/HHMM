using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;
using System.Threading.Tasks;
using System.IO;
using System.Text;
using System.Configuration;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brTruno:brGeneral
	{
		public List<beTurno> listar(string sucursal)
		{
			List<beTurno> lbeTurno = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daTurno odaTurno = new daTurno();
					lbeTurno = odaTurno.listar(con, sucursal);
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
			return (lbeTurno);
		}

		public int adicionar(beTurno obeTurno, string SucursalId, int UsuarioId)
		{
			int idTurno = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daTurno odaTurno = new daTurno();
					idTurno = odaTurno.adicionar(con, obeTurno, SucursalId, UsuarioId);
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
			return (idTurno);
		}

		public bool actualizar(beTurno obeTurno, int UsuarioId)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daTurno odaTurno = new daTurno();
					exito = odaTurno.actualizar(con, obeTurno, UsuarioId);
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

		public bool actualizarEstado(int TurnoId, string EstadoRegistro, int UsuarioId)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daTurno odaTurno = new daTurno();
					exito = odaTurno.actualizarEstado(con, TurnoId, EstadoRegistro, UsuarioId);
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
