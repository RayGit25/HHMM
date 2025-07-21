using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.ReglasNegocio
{
   public class brParametros: brGeneral
	{

		public string listar()
		{
			string rpta = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daParametros odaParametros = new daParametros();
					rpta = odaParametros.listar(con);
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

		public string listarPorId(string parametroId)
		{
			string rpta = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daParametros odaParametros = new daParametros();
					rpta = odaParametros.listarPorId(con, parametroId);
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

		public bool actualizar(string parametroId, string codigo, string descripcion, string valor)
		{
			bool rpta = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daParametros odaParametros = new daParametros();
					rpta = odaParametros.actualizar(con, parametroId,  codigo,  descripcion,  valor);
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

		public string validar(string nombre)
		{
			string rpta = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daParametros odaParametros = new daParametros();
					rpta = odaParametros.validar(con, nombre);
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
