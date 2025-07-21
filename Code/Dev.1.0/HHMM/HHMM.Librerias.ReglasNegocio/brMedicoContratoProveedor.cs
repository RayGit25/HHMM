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
	public class brMedicoContratoProveedor:brGeneral
	{
		public List<beMedicoContratoProveedor> listar(int MedicoContratoId)
		{
			List<beMedicoContratoProveedor> lbeMedicoContratoProveedor = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContratoProveedor odaMedicoContratoProveedor = new daMedicoContratoProveedor();
					lbeMedicoContratoProveedor = odaMedicoContratoProveedor.listar(con, MedicoContratoId);
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
			return (lbeMedicoContratoProveedor);
		}

		public int grabar(beMedicoContratoProveedor obeMedicoContratoProveedor, int usuarioId)
		{
			int id = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContratoProveedor odaMedicoContratoProveedor = new daMedicoContratoProveedor();
					id = odaMedicoContratoProveedor.grabar(con, obeMedicoContratoProveedor, usuarioId);
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
			return (id);
		}

		public int actualizar(beMedicoContratoProveedor obeMedicoContratoProveedor, int usuarioId)
		{
			int id = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContratoProveedor odaMedicoContratoProveedor = new daMedicoContratoProveedor();
					id = odaMedicoContratoProveedor.actualizar(con, obeMedicoContratoProveedor, usuarioId);
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
			return (id);
		}

		public int actualizarEstado(int usuarioId, int MedicoContratoProveedorId, string estado)
		{
			int id = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContratoProveedor odaMedicoContratoProveedor = new daMedicoContratoProveedor();
					id = odaMedicoContratoProveedor.actualizarEstado(con, usuarioId, MedicoContratoProveedorId, estado);
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
			return (id);
		}

		public string ObtenerDatosAdicionales(int id)
		{
			string rpta="";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContratoProveedor odaMedicoContratoProveedor = new daMedicoContratoProveedor();
					rpta = odaMedicoContratoProveedor.ObtenerDatosAdicionales(con, id);
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
