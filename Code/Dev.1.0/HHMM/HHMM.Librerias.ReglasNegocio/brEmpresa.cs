using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using General.Librerias.EntidadesNegocio;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brEmpresa:brGeneral
	{
		public List<beCampoCadena> listar(string sucursal)
		{
			List<beCampoCadena> lbeEmpresa = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daEmpresa odaEmpresa = new daEmpresa();
					lbeEmpresa = odaEmpresa.listar(con, sucursal);
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
			return (lbeEmpresa);
		}
	}
}
